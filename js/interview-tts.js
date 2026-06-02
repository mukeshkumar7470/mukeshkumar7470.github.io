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

  function supported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
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
    const syn = synth();
    syn.cancel();
    if (syn.speaking || syn.pending) {
      syn.pause();
      syn.cancel();
    }
  }

  /** Wait until browser speech queue is clear (Chrome fix after cancel) */
  function waitSynthIdle() {
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

  /** Cancel current speech and return new session id */
  function abortPlayback() {
    generation += 1;
    hardCancelSpeech();
    clearFallbackTimer();
    if (activeItem) restoreAllHighlights(activeItem);
    clearActiveUi();
    updateGlobalStop(false);
    return generation;
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

  function finishPlayback(session) {
    if (!isSessionActive(session)) return;
    if (highlightRoot) markLiveComplete(highlightRoot);
    if (activeItem) restoreAllHighlights(activeItem);
    clearFallbackTimer();
    clearActiveUi();
    updateGlobalStop(false);
  }

  function stop() {
    abortPlayback();
  }

  function isPlaying() {
    const syn = synth();
    return !!(activeBtn || syn.speaking || syn.pending);
  }

  function updateGlobalStop(visible) {
    const bar = document.getElementById("interviewTtsBar");
    if (bar) bar.hidden = !visible;
  }

  function speakOneChunk(text, lang, session, rootEl, chunkOffset, fullPartText) {
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
        if (!isSessionActive(session) || highlightRoot !== rootEl) return;
        setLiveHighlight(rootEl, chunkOffset);
        setTimeout(() => {
          if (!gotBoundary && isSessionActive(session) && highlightRoot === rootEl) {
            startFallbackHighlight(rootEl, fullPartText || text, session, chunkOffset);
          }
        }, 450);
      };

      u.onend = () => finish(true);
      u.onerror = () => finish(false);

      synth().speak(u);

      setTimeout(() => {
        if (!settled && isSessionActive(session) && !synth().speaking && !synth().pending) {
          finish(false);
        }
      }, 60000);
    });
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

  async function speakChunks(chunks, lang, session, rootEl, part) {
    const offsets = chunkStartOffsets(part.text, chunks);

    for (let i = 0; i < chunks.length; i += 1) {
      if (!isSessionActive(session)) return false;
      const ok = await speakOneChunk(
        chunks[i],
        lang,
        session,
        rootEl,
        offsets[i] || 0,
        part.text
      );
      if (!ok || !isSessionActive(session)) return false;
      if (i < chunks.length - 1) {
        await new Promise((r) => setTimeout(r, CHUNK_GAP_MS));
      }
    }
    return isSessionActive(session);
  }

  async function runPlayback(parts, btn, itemEl, session) {
    if (!isSessionActive(session)) return;

    const queue = parts.filter((p) => p.text);
    setActiveUi(btn, itemEl);
    updateGlobalStop(true);

    for (let i = 0; i < queue.length; i += 1) {
      if (!isSessionActive(session)) return;

      const part = queue[i];
      const rootEl = getHighlightTarget(itemEl, part.target);
      if (!rootEl) continue;

      const spokenText = stripForSpeech(rootEl.innerText) || part.text;
      part.text = spokenText;
      prepareInlineHighlight(itemEl, part.target);
      const chunks = chunkText(spokenText, 280);
      const ok = await speakChunks(chunks, part.lang, session, rootEl, part);
      if (!ok) return;

      if (isSessionActive(session)) markLiveComplete(rootEl);

      if (i < queue.length - 1) {
        await new Promise((r) => setTimeout(r, CHUNK_GAP_MS));
      }
    }

    finishPlayback(session);
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

    if (btn?.classList.contains("iqa-tts-active")) {
      abortPlayback();
      return;
    }

    const item = resolveItem(globalId);
    if (!item) return;

    const parts = buildParts(mode, item, questionText);
    if (!parts.some((p) => p.text)) return;

    const session = abortPlayback();

    startChain = startChain
      .then(() => waitSynthIdle())
      .then(() => {
        if (!isSessionActive(session)) return;
        return runPlayback(parts, btn, itemEl, session);
      })
      .catch(() => {
        if (isSessionActive(session)) finishPlayback(session);
      });
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
      const enName = enRanked[0]?.name || "none detected";
      const hiName = hiRanked[0]?.name || "none detected";
      hint.textContent = `Indian tone: ${enName} · ${hiName}`;
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

    const stopBtn = document.getElementById("interviewTtsStop");
    if (stopBtn) stopBtn.addEventListener("click", stop);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && isPlaying()) stop();
    });
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
      if (!details.open && activeItem === details) {
        abortPlayback();
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
    stop,
    isPlaying,
    bindToolbar,
    bindList,
    ttsButton,
    initVoices,
  };

  initVoices();
})(typeof window !== "undefined" ? window : global);
