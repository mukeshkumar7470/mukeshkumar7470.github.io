/**
 * Text-to-speech for Interview Prep (Web Speech API).
 * One question at a time; switching always cancels previous and starts fresh.
 */
(function (global) {
  "use strict";

  const RATE_KEY = "interview-tts-rate";
  const VOICE_EN_KEY = "interview-tts-voice-en";
  const VOICE_HI_KEY = "interview-tts-voice-hi";
  const DEFAULT_RATE = 0.95;
  const INDIAN_PITCH = 0.92;
  const CHUNK_GAP_MS = 60;
  const IDLE_WAIT_MS = 120;

  const INDIAN_EN_PATTERN =
    /ravi|heera|neerja|prabhat|kundan|geeta|india|indian|bharat|en-in|english \(india\)/i;
  const INDIAN_HI_PATTERN =
    /hemant|kalpana|swara|heera|hindi|madhur|sapna|neerja|meera|kavya|aditi|priya/i;

  /** Incremented on every cancel; only matching session may speak */
  let generation = 0;
  let activeBtn = null;
  let activeItem = null;
  let voicesCache = [];
  let startChain = Promise.resolve();
  let fallbackTimer = null;
  let highlightRoot = null;
  const htmlBackup = new WeakMap();

  const player = {
    tracks: [],
    index: 0,
    mode: "en",
    paused: false,
    active: false,
  };

  /** Minimal silent MP3 — keeps iOS/Android audio session alive in background */
  const SILENT_MP3 =
    "data:audio/mp3;base64,//uQxAAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

  let keepaliveAudio = null;
  let wakeLock = null;
  let voiceKeepaliveTimer = null;
  let stallWatchTimer = null;
  let trackInProgress = false;
  let backgroundBound = false;
  let lastSpokeAt = 0;

  function useMusicAudio() {
    return (
      typeof InterviewMusicAudio !== "undefined" &&
      InterviewMusicAudio.shouldUseMusicAudio()
    );
  }

  function supported() {
    if (typeof window === "undefined") return false;
    if (useMusicAudio()) return true;
    return "speechSynthesis" in window;
  }

  function synth() {
    return window.speechSynthesis;
  }

  function getRate() {
    const v = parseFloat(localStorage.getItem(RATE_KEY));
    return Number.isFinite(v) && v >= 0.5 && v <= 1.5 ? v : DEFAULT_RATE;
  }

  function setRate(rate) {
    localStorage.setItem(RATE_KEY, String(rate));
  }

  function isSessionActive(session) {
    return session === generation;
  }

  function hardCancelSpeech() {
    if (useMusicAudio()) InterviewMusicAudio.stop();
    if (!("speechSynthesis" in window)) return;
    const syn = synth();
    syn.cancel();
    if (syn.speaking || syn.pending) {
      syn.pause();
      syn.cancel();
    }
  }

  /** Wait until browser speech queue is clear (Chrome fix after cancel) */
  function waitSynthIdle() {
    if (useMusicAudio()) {
      InterviewMusicAudio.stop();
      return new Promise((resolve) => setTimeout(resolve, IDLE_WAIT_MS));
    }
    return new Promise((resolve) => {
      hardCancelSpeech();
      let tries = 0;
      const check = () => {
        const syn = synth();
        refreshVoices();
        syn.getVoices();
        if (!syn.speaking && !syn.pending) {
          setTimeout(resolve, IDLE_WAIT_MS);
          return;
        }
        tries += 1;
        if (tries > 40) {
          hardCancelSpeech();
          setTimeout(resolve, IDLE_WAIT_MS);
          return;
        }
        setTimeout(check, 40);
      };
      check();
    });
  }

  function clearFallbackTimer() {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
  }

  function tokenizeWords(text) {
    const tokens = [];
    const re = /\S+/g;
    let match = re.exec(text);
    while (match) {
      tokens.push({
        word: match[0],
        start: match.index,
        end: match.index + match[0].length,
      });
      match = re.exec(text);
    }
    return tokens;
  }

  function getHighlightTarget(itemEl, target) {
    if (!itemEl) return null;
    if (target === "question") return itemEl.querySelector(".iqa-title");
    if (target === "hi") return itemEl.querySelector(".iqa-answer-content.iqa-hi");
    return itemEl.querySelector(".iqa-answer-content.iqa-en");
  }

  function wrapWordsInElement(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest(".iqa-live-word")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    let offset = 0;
    nodes.forEach((textNode) => {
      const parts = textNode.nodeValue.split(/(\s+)/);
      const frag = document.createDocumentFragment();

      parts.forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          offset += part.length;
        } else {
          const span = document.createElement("span");
          span.className = "iqa-live-word";
          span.dataset.start = String(offset);
          span.dataset.end = String(offset + part.length);
          span.textContent = part;
          frag.appendChild(span);
          offset += part.length;
        }
      });

      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function restoreHighlightEl(el) {
    if (!el || !htmlBackup.has(el)) return;
    el.innerHTML = htmlBackup.get(el);
    htmlBackup.delete(el);
    el.classList.remove("iqa-tts-highlight-root");
  }

  function restoreAllHighlights(itemEl) {
    if (!itemEl) return;
    itemEl.querySelectorAll(".iqa-tts-highlight-root").forEach((el) => restoreHighlightEl(el));
    itemEl.classList.remove("iqa-tts-reading-active");
    highlightRoot = null;
  }

  function prepareInlineHighlight(itemEl, target) {
    const root = getHighlightTarget(itemEl, target);
    if (!root) return null;

    restoreAllHighlights(itemEl);

    if (!htmlBackup.has(root)) {
      htmlBackup.set(root, root.innerHTML);
    }

    wrapWordsInElement(root);
    highlightRoot = root;
    root.classList.add("iqa-tts-highlight-root");

    itemEl.classList.add("iqa-tts-reading-active");
    return root;
  }

  function setLiveHighlight(rootEl, charIndex) {
    if (!rootEl) return;

    const words = rootEl.querySelectorAll(".iqa-live-word");

    words.forEach((el) => {
      const start = parseInt(el.dataset.start, 10);
      const end = parseInt(el.dataset.end, 10);
      el.classList.remove("iqa-live-current", "iqa-live-done");

      if (charIndex >= end) {
        el.classList.add("iqa-live-done");
      } else if (charIndex >= start && charIndex < end) {
        el.classList.add("iqa-live-current");
      }
    });
  }

  function markLiveComplete(rootEl) {
    if (!rootEl) return;
    rootEl.querySelectorAll(".iqa-live-word").forEach((el) => {
      el.classList.remove("iqa-live-current");
      el.classList.add("iqa-live-done");
    });
  }

  function startFallbackHighlight(rootEl, text, session, chunkOffset) {
    clearFallbackTimer();
    const tokens = tokenizeWords(text);
    if (!tokens.length || !rootEl) return;

    let wordIdx = 0;

    const tick = () => {
      if (!isSessionActive(session) || highlightRoot !== rootEl) {
        clearFallbackTimer();
        return;
      }
      if (wordIdx >= tokens.length) {
        clearFallbackTimer();
        return;
      }
      setLiveHighlight(rootEl, chunkOffset + tokens[wordIdx].start);
      const delay = Math.max(85, (tokens[wordIdx].word.length * 52) / getRate());
      wordIdx += 1;
      fallbackTimer = setTimeout(tick, delay);
    };

    tick();
  }

  function partLabel(target) {
    if (target === "question") return "Question";
    if (target === "hi") return "Hindi";
    return "English";
  }

  function partToTtsMode(target) {
    if (target === "question") return "question";
    if (target === "hi") return "hi";
    return "en";
  }

  function getVisibleItemElements() {
    return Array.from(document.querySelectorAll("#interviewList .iqa-item"));
  }

  function buildPlaylist(startGlobalId, mode) {
    const tracks = [];
    let startIndex = 0;
    let foundStart = false;

    getVisibleItemElements().forEach((itemEl) => {
      const globalId = itemEl.dataset.id;
      const questionText = itemEl.querySelector(".iqa-title")?.textContent?.trim() || "";
      const item = resolveItem(globalId);
      if (!item) return;

      buildParts(mode, item, questionText).forEach((part) => {
        if (!part.text) return;
        if (globalId === startGlobalId && !foundStart) {
          startIndex = tracks.length;
          foundStart = true;
        }
        tracks.push({
          globalId,
          questionText,
          item,
          part,
          label: partLabel(part.target),
        });
      });
    });

    if (!foundStart && tracks.length) startIndex = 0;
    return { tracks, startIndex };
  }

  function getKeepaliveAudio() {
    if (keepaliveAudio) return keepaliveAudio;
    keepaliveAudio = document.getElementById("interviewPlayerKeepalive");
    if (!keepaliveAudio) return null;
    if (!keepaliveAudio.src) keepaliveAudio.src = SILENT_MP3;
    keepaliveAudio.volume = 0.02;
    keepaliveAudio.setAttribute("playsinline", "");
    keepaliveAudio.setAttribute("webkit-playsinline", "");
    return keepaliveAudio;
  }

  async function startKeepaliveAudio() {
    const audio = getKeepaliveAudio();
    if (!audio) return;
    try {
      if (audio.paused) await audio.play();
    } catch (_) {
      /* Needs user gesture — same tap that started Listen also unlocks this */
    }
  }

  function stopKeepaliveAudio() {
    const audio = getKeepaliveAudio();
    if (!audio) return;
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch (_) {
      /* ignore */
    }
  }

  async function requestWakeLock() {
    if (!("wakeLock" in navigator)) return;
    try {
      if (wakeLock) return;
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => {
        wakeLock = null;
      });
    } catch (_) {
      wakeLock = null;
    }
  }

  async function releaseWakeLock() {
    if (!wakeLock) return;
    try {
      await wakeLock.release();
    } catch (_) {
      /* ignore */
    }
    wakeLock = null;
  }

  function startVoiceKeepalive() {
    stopVoiceKeepalive();
    voiceKeepaliveTimer = setInterval(() => {
      if (!player.active || player.paused) return;
      refreshVoices();
      synth().getVoices();
    }, 8000);
  }

  function stopVoiceKeepalive() {
    if (voiceKeepaliveTimer) {
      clearInterval(voiceKeepaliveTimer);
      voiceKeepaliveTimer = null;
    }
  }

  function startStallWatch() {
    stopStallWatch();
    stallWatchTimer = setInterval(() => {
      if (!player.active || player.paused || trackInProgress) return;
      if (Date.now() - lastSpokeAt < 4500) return;
      const syn = synth();
      if (!syn.speaking && !syn.pending) {
        recoverStalledPlayback();
      }
    }, 3200);
  }

  function stopStallWatch() {
    if (stallWatchTimer) {
      clearInterval(stallWatchTimer);
      stallWatchTimer = null;
    }
  }

  function recoverStalledPlayback() {
    if (!player.active || player.paused) return;
    if (useMusicAudio() && InterviewMusicAudio.isPlaying()) return;
    const syn = synth();
    if (syn.speaking || syn.pending || trackInProgress) return;
    startKeepaliveAudio();
    if (syn.paused) {
      resumePlayback();
      return;
    }
    playCurrentTrack();
  }

  async function startBackgroundSession() {
    if (!useMusicAudio()) await startKeepaliveAudio();
    await requestWakeLock();
    startVoiceKeepalive();
    startStallWatch();
    if ("mediaSession" in navigator && player.active) {
      navigator.mediaSession.playbackState = player.paused ? "paused" : "playing";
    }
  }

  function stopBackgroundSession() {
    stopKeepaliveAudio();
    releaseWakeLock();
    stopVoiceKeepalive();
    stopStallWatch();
  }

  function handleVisibilityChange() {
    if (!player.active) return;
    if (document.visibilityState === "hidden") {
      startKeepaliveAudio();
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = player.paused ? "paused" : "playing";
      }
      return;
    }
    requestWakeLock();
    startKeepaliveAudio();
    if (player.paused) return;
    const syn = synth();
    if (syn.paused) {
      resumePlayback();
      return;
    }
    if (!syn.speaking && !syn.pending && !trackInProgress) {
      recoverStalledPlayback();
    }
  }

  function bindBackgroundPlayback() {
    if (backgroundBound) return;
    backgroundBound = true;
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", () => {
      if (player.active) startKeepaliveAudio();
    });
    window.addEventListener("pageshow", () => {
      if (player.active && !player.paused) recoverStalledPlayback();
    });
  }

  function showPlayerBar() {
    const el = document.getElementById("interviewPlayer");
    if (el) el.hidden = false;
    document.body.classList.add("player-active");
    player.active = true;
    startBackgroundSession();
  }

  function hidePlayerBar() {
    const el = document.getElementById("interviewPlayer");
    if (el) el.hidden = true;
    document.body.classList.remove("player-active");
    player.active = false;
    updatePlayPauseIcon(false, false);
    clearMediaSession();
    stopBackgroundSession();
  }

  function updatePlayPauseIcon(playing, paused) {
    const icon = document.getElementById("interviewPlayerPlayPauseIcon");
    const btn = document.getElementById("interviewPlayerPlayPause");
    if (!icon || !btn) return;
    icon.className = playing && !paused ? "fa-solid fa-pause" : "fa-solid fa-play";
    btn.classList.toggle("is-paused", paused);
    btn.setAttribute("aria-label", playing && !paused ? "Pause" : "Play");
  }

  function updatePlayerUI(track) {
    const title = document.getElementById("interviewPlayerTitle");
    const part = document.getElementById("interviewPlayerPart");
    const idx = document.getElementById("interviewPlayerIndex");
    if (title) title.textContent = track?.questionText || "—";
    if (part) part.textContent = track?.label || "—";
    if (idx) {
      idx.textContent = `${player.tracks.length ? player.index + 1 : 0} / ${player.tracks.length}`;
    }
    updatePlayPauseIcon(true, player.paused);
    setMediaSession(track);

    const prevBtn = document.getElementById("interviewPlayerPrev");
    const nextBtn = document.getElementById("interviewPlayerNext");
    if (prevBtn) prevBtn.disabled = player.index <= 0;
    if (nextBtn) nextBtn.disabled = player.index >= player.tracks.length - 1;
  }

  function setMediaSession(track) {
    if (!("mediaSession" in navigator) || !track) return;
    if (useMusicAudio() && InterviewMusicAudio.setMediaArtwork) {
      InterviewMusicAudio.setMediaArtwork(track);
    } else {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.questionText,
        artist: `Interview Prep · ${track.label}`,
        album: "Mukesh Kumar Patel",
      });
    }
    navigator.mediaSession.playbackState = player.paused ? "paused" : "playing";
  }

  function clearMediaSession() {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.playbackState = "none";
    navigator.mediaSession.metadata = null;
  }

  function bindMediaSession() {
    if (!("mediaSession" in navigator)) return;
    try {
      navigator.mediaSession.setActionHandler("play", () => resumePlayback());
      navigator.mediaSession.setActionHandler("pause", () => pausePlayback());
      navigator.mediaSession.setActionHandler("previoustrack", () => playerPrev());
      navigator.mediaSession.setActionHandler("nexttrack", () => playerNext());
      navigator.mediaSession.setActionHandler("stop", () => stopPlayer());
    } catch (_) {
      /* Some browsers reject handlers */
    }
  }

  /** Cancel speech; return new session id */
  function abortPlayback() {
    generation += 1;
    hardCancelSpeech();
    clearFallbackTimer();
    if (activeItem) restoreAllHighlights(activeItem);
    clearActiveUi();
    return generation;
  }

  function stopPlayer() {
    player.tracks = [];
    player.index = 0;
    player.paused = false;
    abortPlayback();
    hidePlayerBar();
  }

  function pausePlayback() {
    if (!player.active) return;
    if (useMusicAudio() && InterviewMusicAudio.isPlaying()) {
      InterviewMusicAudio.pause();
      player.paused = true;
      clearFallbackTimer();
      updatePlayPauseIcon(true, true);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
      return;
    }
    const syn = synth();
    if (syn.speaking && !syn.paused) {
      syn.pause();
      player.paused = true;
      clearFallbackTimer();
      updatePlayPauseIcon(true, true);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    } else if (!syn.speaking && !syn.pending) {
      player.paused = true;
      updatePlayPauseIcon(true, true);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    }
  }

  function resumePlayback() {
    if (!player.active) return;
    player.paused = false;
    if (useMusicAudio()) {
      InterviewMusicAudio.resume().then((ok) => {
        if (!ok) playCurrentTrack();
      });
      updatePlayPauseIcon(true, false);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
      return;
    }
    const syn = synth();
    startKeepaliveAudio();
    if (syn.paused) {
      syn.resume();
      updatePlayPauseIcon(true, false);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
      return;
    }
    if (!syn.speaking && !syn.pending) {
      playCurrentTrack();
    }
  }

  function togglePlayPause() {
    if (useMusicAudio()) {
      if (player.paused || !InterviewMusicAudio.isPlaying()) resumePlayback();
      else pausePlayback();
      return;
    }
    const syn = synth();
    if (player.paused || syn.paused) resumePlayback();
    else if (syn.speaking || syn.pending || activeBtn) pausePlayback();
    else playCurrentTrack();
  }

  function playerPrev() {
    if (!player.tracks.length) return;
    player.index = Math.max(0, player.index - 1);
    player.paused = false;
    playCurrentTrack();
  }

  function playerNext() {
    if (!player.tracks.length) return;
    if (player.index >= player.tracks.length - 1) {
      stopPlayer();
      return;
    }
    player.index += 1;
    player.paused = false;
    playCurrentTrack();
  }

  async function waitWhilePaused(session) {
    while (player.paused && isSessionActive(session)) {
      await new Promise((r) => setTimeout(r, 150));
    }
  }

  function resolveItem(globalId) {
    if (typeof INTERVIEW_QA === "undefined" || !globalId) return null;
    const dash = globalId.lastIndexOf("-");
    if (dash < 0) return null;
    const catId = globalId.slice(0, dash);
    const num = parseInt(globalId.slice(dash + 1), 10);
    const cat = INTERVIEW_QA.find((c) => c.id === catId);
    if (!cat || !num) return null;
    return cat.items[num - 1] || null;
  }

  function stripForSpeech(text) {
    if (!text) return "";
    return text
      .replace(/\bWhat\?\s*/gi, "What. ")
      .replace(/\bWhy\?\s*/gi, "Why. ")
      .replace(/\bHow\?\s*/gi, "How. ")
      .replace(/→/g, " then ")
      .replace(/->/g, " then ")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]+`/g, "")
      .replace(/^[-•]\s+/gm, "")
      .replace(/\n\n+/g, ". ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function refreshVoices() {
    voicesCache = synth().getVoices().slice();
    return voicesCache;
  }

  function scoreIndianVoice(voice, lang) {
    let score = 0;
    const langCode = (voice.lang || "").toLowerCase();
    const name = voice.name || "";

    if (lang === "hi") {
      if (langCode === "hi-in") score += 120;
      else if (langCode.startsWith("hi")) score += 70;
      if (INDIAN_HI_PATTERN.test(name)) score += 55;
      if (voice.localService) score += 12;
    } else {
      if (langCode === "en-in") score += 120;
      else if (INDIAN_EN_PATTERN.test(name)) score += 65;
      else if (langCode.startsWith("en")) score += 25;
      if (voice.localService) score += 15;
      if (langCode === "en-us") score -= 35;
      if (/us english|united states/i.test(name)) score -= 40;
    }

    return score;
  }

  function voicesForLang(lang) {
    const voices = voicesCache.length ? voicesCache : refreshVoices();
    const pool = voices.filter((v) =>
      lang === "hi" ? (v.lang || "").toLowerCase().startsWith("hi") : (v.lang || "").toLowerCase().startsWith("en")
    );
    return pool.sort((a, b) => scoreIndianVoice(b, lang) - scoreIndianVoice(a, lang));
  }

  function getSavedVoiceUri(lang) {
    return lang === "hi" ? localStorage.getItem(VOICE_HI_KEY) : localStorage.getItem(VOICE_EN_KEY);
  }

  function saveVoiceUri(lang, uri) {
    if (lang === "hi") localStorage.setItem(VOICE_HI_KEY, uri);
    else localStorage.setItem(VOICE_EN_KEY, uri);
  }

  function pickVoice(lang) {
    const voices = voicesCache.length ? voicesCache : refreshVoices();
    if (!voices.length) return null;

    const savedUri = getSavedVoiceUri(lang);
    if (savedUri && savedUri !== "auto") {
      const saved = voices.find((v) => v.voiceURI === savedUri);
      if (saved) return saved;
    }

    const ranked = voicesForLang(lang);
    return ranked[0] || null;
  }

  function utteranceLang(lang) {
    return lang === "hi" ? "hi-IN" : "en-IN";
  }

  function chunkText(text, maxLen) {
    if (text.length <= maxLen) return [text];
    const chunks = [];
    const sentences = text.split(/(?<=[.!?])\s+/);
    let buf = "";
    sentences.forEach((s) => {
      if ((buf + " " + s).trim().length > maxLen && buf) {
        chunks.push(buf.trim());
        buf = s;
      } else {
        buf = buf ? `${buf} ${s}` : s;
      }
    });
    if (buf.trim()) chunks.push(buf.trim());
    if (!chunks.length) chunks.push(text.slice(0, maxLen));
    return chunks;
  }

  function clearActiveUi() {
    if (activeBtn) {
      activeBtn.classList.remove("iqa-tts-active");
      activeBtn.setAttribute("aria-pressed", "false");
      const icon = activeBtn.querySelector("i");
      if (icon) {
        icon.className = activeBtn.dataset.ttsIcon || "fa-solid fa-volume-high";
      }
      activeBtn = null;
    }
    if (activeItem) {
      activeItem.classList.remove("iqa-tts-item-active");
      activeItem = null;
    }
  }

  function setActiveUi(btn, itemEl) {
    clearActiveUi();
    activeBtn = btn;
    activeItem = itemEl;
    if (btn) {
      btn.classList.add("iqa-tts-active");
      btn.setAttribute("aria-pressed", "true");
      const icon = btn.querySelector("i");
      if (icon) icon.className = "fa-solid fa-stop";
    }
    if (itemEl) itemEl.classList.add("iqa-tts-item-active");
  }

  function finishTrack(session) {
    if (!isSessionActive(session)) return;
    if (highlightRoot) markLiveComplete(highlightRoot);
    if (activeItem) restoreAllHighlights(activeItem);
    clearFallbackTimer();
    clearActiveUi();
  }

  function stop() {
    stopPlayer();
  }

  function isPlaying() {
    if (useMusicAudio() && InterviewMusicAudio.isPlaying()) return true;
    const syn = synth();
    return !!(player.active || activeBtn || syn.speaking || syn.pending);
  }

  async function speakOneChunkMusic(text, lang, session, rootEl, chunkOffset, fullPartText) {
    const ok = await InterviewMusicAudio.playChunk(text, lang, {
      isSessionActive: () => isSessionActive(session),
      isPaused: () => player.paused,
      getRate: getRate,
      onStart: () => {
        lastSpokeAt = Date.now();
        if (!isSessionActive(session) || highlightRoot !== rootEl) return;
        setLiveHighlight(rootEl, chunkOffset);
        startFallbackHighlight(rootEl, fullPartText || text, session, chunkOffset);
      },
    });
    lastSpokeAt = Date.now();
    return ok && isSessionActive(session);
  }

  function speakOneChunkSpeech(text, lang, session, rootEl, chunkOffset, fullPartText) {
    return new Promise((resolve) => {
      if (!isSessionActive(session) || !text) {
        resolve(false);
        return;
      }

      refreshVoices();
      const voice = pickVoice(lang);
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice?.lang || utteranceLang(lang);
      u.rate = getRate();
      u.pitch = INDIAN_PITCH;
      if (voice) u.voice = voice;

      let gotBoundary = false;
      let settled = false;

      const finish = (ok) => {
        if (settled) return;
        settled = true;
        clearFallbackTimer();
        resolve(ok && isSessionActive(session));
      };

      u.onboundary = (e) => {
        if (!isSessionActive(session) || highlightRoot !== rootEl) return;
        gotBoundary = true;
        const idx =
          typeof e.charIndex === "number" ? e.charIndex : e.elapsedTime ? 0 : 0;
        if (e.name === "word" || e.charLength > 0 || idx >= 0) {
          setLiveHighlight(rootEl, chunkOffset + idx);
        }
      };

      u.onstart = () => {
        lastSpokeAt = Date.now();
        if (!isSessionActive(session) || highlightRoot !== rootEl) return;
        setLiveHighlight(rootEl, chunkOffset);
        setTimeout(() => {
          if (!gotBoundary && isSessionActive(session) && highlightRoot === rootEl) {
            startFallbackHighlight(rootEl, fullPartText || text, session, chunkOffset);
          }
        }, 450);
      };

      u.onend = () => {
        lastSpokeAt = Date.now();
        finish(true);
      };
      u.onerror = () => finish(false);

      speakWhenReady(u, session);

      setTimeout(() => {
        if (!settled && isSessionActive(session) && !synth().speaking && !synth().pending) {
          finish(false);
        }
      }, 60000);
    });
  }

  function speakOneChunk(text, lang, session, rootEl, chunkOffset, fullPartText, forceSpeech) {
    if (useMusicAudio() && !forceSpeech) {
      return speakOneChunkMusic(text, lang, session, rootEl, chunkOffset, fullPartText);
    }
    return speakOneChunkSpeech(text, lang, session, rootEl, chunkOffset, fullPartText);
  }

  function chunkStartOffsets(fullText, chunks) {
    const offsets = [];
    let searchFrom = 0;
    chunks.forEach((chunk) => {
      const idx = fullText.indexOf(chunk, searchFrom);
      offsets.push(idx >= 0 ? idx : searchFrom);
      searchFrom = (idx >= 0 ? idx : searchFrom) + chunk.length;
    });
    return offsets;
  }

  function speakWhenReady(utterance, session) {
    const trySpeak = () => {
      if (!isSessionActive(session) || !player.active) return;
      if (player.paused) {
        setTimeout(trySpeak, 200);
        return;
      }
      startKeepaliveAudio();
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "playing";
      }
      synth().speak(utterance);
    };
    trySpeak();
  }

  async function speakChunks(chunks, lang, session, rootEl, part, forceSpeech) {
    const offsets = chunkStartOffsets(part.text, chunks);

    for (let i = 0; i < chunks.length; i += 1) {
      if (!isSessionActive(session)) return false;
      await waitWhilePaused(session);
      if (!isSessionActive(session)) return false;
      const ok = await speakOneChunk(
        chunks[i],
        lang,
        session,
        rootEl,
        offsets[i] || 0,
        part.text,
        forceSpeech
      );
      if (!ok || !isSessionActive(session)) return false;
      if (i < chunks.length - 1) {
        await new Promise((r) => setTimeout(r, CHUNK_GAP_MS));
      }
    }
    return isSessionActive(session);
  }

  async function runSingleTrack(track, itemEl, session, btn) {
    if (!isSessionActive(session) || !track) return;

    trackInProgress = true;
    try {
      const part = track.part;
      const rootEl = getHighlightTarget(itemEl, part.target);
      if (!rootEl) return;

      setActiveUi(btn, itemEl);
      updatePlayerUI(track);

      const spokenText = stripForSpeech(rootEl.innerText) || part.text;
      part.text = spokenText;
      prepareInlineHighlight(itemEl, part.target);
      const maxChunk = useMusicAudio() ? InterviewMusicAudio.maxChunkLen : 280;
      const chunks = chunkText(spokenText, maxChunk);
      let ok = await speakChunks(chunks, part.lang, session, rootEl, part, false);
      if (!ok && useMusicAudio() && "speechSynthesis" in window) {
        await waitSynthIdle();
        ok = await speakChunks(
          chunkText(spokenText, 280),
          part.lang,
          session,
          rootEl,
          part,
          true
        );
      }
      if (!ok || !isSessionActive(session)) return;

      markLiveComplete(rootEl);
      finishTrack(session);

      if (!player.active || player.paused) return;

      if (player.index < player.tracks.length - 1) {
        player.index += 1;
        await waitSynthIdle();
        if (player.active) playCurrentTrack();
      } else {
        stopPlayer();
      }
    } finally {
      trackInProgress = false;
    }
  }

  function queryItemEl(globalId) {
    const safe = String(globalId).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return document.querySelector(`.iqa-item[data-id="${safe}"]`);
  }

  function playCurrentTrack() {
    const track = player.tracks[player.index];
    if (!track) {
      stopPlayer();
      return;
    }

    lastSpokeAt = Date.now();
    const itemEl = queryItemEl(track.globalId);
    if (itemEl) itemEl.open = true;

    const session = abortPlayback();
    player.paused = false;
    showPlayerBar();
    updatePlayerUI(track);

    const btn = itemEl?.querySelector(
      `.iqa-tts-btn[data-tts="${partToTtsMode(track.part.target)}"]`
    );

    startChain = startChain
      .then(() => waitSynthIdle())
      .then(() => {
        if (!player.active) return;
        return runSingleTrack(track, itemEl, session, btn || null);
      })
      .catch(() => {
        trackInProgress = false;
        if (player.active) stopPlayer();
      });
  }

  function buildParts(mode, item, questionText) {
    const parts = [];
    if (mode === "question" || mode === "all") {
      parts.push({
        lang: "en",
        target: "question",
        text: stripForSpeech(questionText),
      });
    }
    if (mode === "en" || mode === "all") {
      parts.push({
        lang: "en",
        target: "en",
        text: stripForSpeech(item.en),
      });
    }
    if (mode === "hi" || mode === "all") {
      parts.push({
        lang: "hi",
        target: "hi",
        text: stripForSpeech(item.hi),
      });
    }
    return parts;
  }

  function play(mode, globalId, questionText, btn, itemEl) {
    if (!supported()) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    const sameTrack =
      player.active &&
      player.tracks[player.index]?.globalId === globalId &&
      player.mode === mode;

    if (btn?.classList.contains("iqa-tts-active") || (sameTrack && isPlaying())) {
      togglePlayPause();
      return;
    }

    const item = resolveItem(globalId);
    if (!item) return;

    const { tracks, startIndex } = buildPlaylist(globalId, mode);
    if (!tracks.length) return;

    player.tracks = tracks;
    player.index = startIndex;
    player.mode = mode;
    player.paused = false;
    player.active = true;

    if (itemEl && !itemEl.open) itemEl.open = true;

    startBackgroundSession();
    playCurrentTrack();
  }

  function fillVoiceSelect(selectEl, lang) {
    if (!selectEl) return;
    const ranked = voicesForLang(lang);
    const saved = getSavedVoiceUri(lang) || "auto";
    const autoLabel =
      lang === "hi" ? "Auto — Hindi (India)" : "Auto — Indian English";

    let html = `<option value="auto">${autoLabel}</option>`;
    ranked.forEach((v) => {
      const tag = v.lang === "en-IN" || v.lang === "hi-IN" ? " ★" : "";
      const label = `${v.name} (${v.lang})${tag}`;
      html += `<option value="${escapeAttr(v.voiceURI)}">${escapeAttr(label)}</option>`;
    });

    selectEl.innerHTML = html;
    const hasSaved = Array.from(selectEl.options).some((o) => o.value === saved);
    selectEl.value = hasSaved ? saved : "auto";
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function populateVoiceDropdowns() {
    refreshVoices();
    fillVoiceSelect(document.getElementById("interviewTtsVoiceEn"), "en");
    fillVoiceSelect(document.getElementById("interviewTtsVoiceHi"), "hi");

    const hint = document.getElementById("interviewTtsVoiceHint");
    const enRanked = voicesForLang("en");
    const hiRanked = voicesForLang("hi");
    if (hint) {
      if (useMusicAudio()) {
        hint.textContent =
          "Mobile music mode: plays in background with lock-screen controls (like JioSaavn). Use bottom player or notification.";
      } else {
        const enName = enRanked[0]?.name || "none detected";
        const hiName = hiRanked[0]?.name || "none detected";
        hint.textContent = `Indian tone: ${enName} · ${hiName}`;
      }
    }
  }

  function initVoices() {
    if (!supported()) return;
    const load = () => populateVoiceDropdowns();
    load();
    synth().onvoiceschanged = load;
    setTimeout(load, 250);
    setTimeout(load, 800);
  }

  function bindToolbar() {
    const toolbar = document.getElementById("interviewTtsToolbar");
    const rateEl = document.getElementById("interviewTtsRate");
    const warn = document.getElementById("interviewTtsWarn");

    if (!supported()) {
      if (warn) warn.hidden = false;
      if (toolbar) toolbar.hidden = true;
      return;
    }

    if (rateEl) {
      const rate = getRate();
      const match = Array.from(rateEl.options).some((o) => o.value === String(rate));
      rateEl.value = match ? String(rate) : String(DEFAULT_RATE);
      rateEl.addEventListener("change", () => {
        setRate(parseFloat(rateEl.value));
      });
    }

    const voiceEnEl = document.getElementById("interviewTtsVoiceEn");
    const voiceHiEl = document.getElementById("interviewTtsVoiceHi");
    if (voiceEnEl) {
      voiceEnEl.addEventListener("change", () => {
        saveVoiceUri("en", voiceEnEl.value);
      });
    }
    if (voiceHiEl) {
      voiceHiEl.addEventListener("change", () => {
        saveVoiceUri("hi", voiceHiEl.value);
      });
    }

    populateVoiceDropdowns();
    bindPlayerControls();
    bindMediaSession();
    bindBackgroundPlayback();
  }

  function bindPlayerControls() {
    const prev = document.getElementById("interviewPlayerPrev");
    const next = document.getElementById("interviewPlayerNext");
    const playPause = document.getElementById("interviewPlayerPlayPause");
    const stopBtn = document.getElementById("interviewPlayerStop");

    if (prev) prev.addEventListener("click", playerPrev);
    if (next) next.addEventListener("click", playerNext);
    if (playPause) playPause.addEventListener("click", togglePlayPause);
    if (stopBtn) stopBtn.addEventListener("click", stopPlayer);
  }

  function bindList(root) {
    if (!root || !supported()) return;

    root.addEventListener("click", (e) => {
      const btn = e.target.closest(".iqa-tts-btn");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const itemEl = btn.closest(".iqa-item");
      if (!itemEl) return;

      const globalId = itemEl.dataset.id;
      const questionText = itemEl.querySelector(".iqa-title")?.textContent?.trim() || "";
      const mode = btn.dataset.tts || "en";

      if (!itemEl.open) {
        itemEl.open = true;
      }

      play(mode, globalId, questionText, btn, itemEl);
    });

    root.addEventListener("toggle", (e) => {
      const details = e.target;
      if (details.tagName !== "DETAILS") return;
      if (!details.open && activeItem === details && player.active) {
        stopPlayer();
      }
    }, true);
  }

  function ttsButton(mode, label, icon) {
    return `<button type="button" class="iqa-tts-btn" data-tts="${mode}" data-tts-icon="${icon}" aria-label="${label}" title="${label}">
      <i class="${icon}" aria-hidden="true"></i>
      <span class="iqa-tts-label">${label}</span>
    </button>`;
  }

  global.InterviewTTS = {
    supported,
    stop: stopPlayer,
    isPlaying,
    bindToolbar,
    bindList,
    ttsButton,
    initVoices,
    pause: pausePlayback,
    resume: resumePlayback,
    next: playerNext,
    prev: playerPrev,
  };

  initVoices();
})(typeof window !== "undefined" ? window : global);
