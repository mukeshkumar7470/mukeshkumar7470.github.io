/**
 * Mobile background playback (JioSaavn-style): real <audio> + Media Session.
 * Tries: custom proxy → fetch blob → direct URL → fails (caller uses Web Speech).
 */
(function (global) {
  "use strict";

  const MAX_TTS_CHARS = 160;
  const ARTWORK_URL = "https://avatars.githubusercontent.com/u/48297190?v=4";
  const SILENT_MP3 =
    "data:audio/mp3;base64,//uQxAAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

  let musicAudio = null;
  let keepaliveActive = false;
  let streamFailed = false;

  function proxyBase() {
    if (typeof global.INTERVIEW_TTS_PROXY === "string" && global.INTERVIEW_TTS_PROXY) {
      return global.INTERVIEW_TTS_PROXY.replace(/\/$/, "");
    }
    const saved = localStorage.getItem("interview-tts-proxy");
    return saved ? saved.replace(/\/$/, "") : "";
  }

  function isMobileDevice() {
    if (typeof window === "undefined") return false;
    const ua = navigator.userAgent || "";
    if (/Android|iPhone|iPad|iPod|Mobile|Silk/i.test(ua)) return true;
    return navigator.maxTouchPoints > 0 && window.matchMedia("(max-width: 900px)").matches;
  }

  function shouldUseMusicAudio() {
    return isMobileDevice() && typeof HTMLAudioElement !== "undefined" && !streamFailed;
  }

  function markStreamFailed() {
    streamFailed = true;
  }

  function resetStreamFailed() {
    streamFailed = false;
  }

  function getAudio() {
    if (musicAudio) return musicAudio;
    musicAudio = document.getElementById("interviewPlayerMusic");
    if (!musicAudio) return null;
    musicAudio.setAttribute("playsinline", "");
    musicAudio.setAttribute("webkit-playsinline", "");
    musicAudio.preload = "auto";
    return musicAudio;
  }

  function buildGoogleUrls(text, lang) {
    const tl = lang === "hi" ? "hi" : "en";
    const q = encodeURIComponent(text.slice(0, MAX_TTS_CHARS));
    return [
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${q}`,
      `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${tl}&q=${q}`,
    ];
  }

  function buildSourceList(text, lang) {
    const list = [];
    const base = proxyBase();
    const q = encodeURIComponent(text.slice(0, MAX_TTS_CHARS));
    if (base) {
      list.push(`${base}?lang=${lang}&text=${q}`);
    }
    buildGoogleUrls(text, lang).forEach((u) => {
      list.push(u);
      list.push(`https://corsproxy.io/?${encodeURIComponent(u)}`);
    });
    return list;
  }

  async function fetchAsBlobUrl(url) {
    try {
      const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });
      if (!res.ok) return null;
      const blob = await res.blob();
      if (!blob || blob.size < 80) return null;
      return URL.createObjectURL(blob);
    } catch (_) {
      return null;
    }
  }

  async function resolveChunkUrl(text, lang) {
    const sources = buildSourceList(text, lang);
    for (const url of sources) {
      const blobUrl = await fetchAsBlobUrl(url);
      if (blobUrl) return { url: blobUrl, revoke: true };
    }
    return null;
  }

  function playAudioSrc(audio, src, rate, hooks) {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        audio.oncanplaythrough = null;
        audio.onended = null;
        audio.onerror = null;
        resolve(ok);
      };

      audio.oncanplaythrough = () => {
        audio.playbackRate = rate;
        audio
          .play()
          .then(() => {
            hooks.onStart?.();
            if ("mediaSession" in navigator) {
              navigator.mediaSession.playbackState = "playing";
            }
          })
          .catch(() => finish(false));
      };
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);

      audio.pause();
      audio.src = src;
      audio.load();

      setTimeout(() => {
        if (!settled && audio.readyState >= 2 && !audio.paused && audio.currentTime > 0) {
          return;
        }
        if (!settled && audio.error) finish(false);
      }, 18000);

      setTimeout(() => {
        if (!settled && audio.paused && audio.currentTime === 0) finish(false);
      }, 20000);
    });
  }

  async function startKeepaliveLoop() {
    const audio = getAudio();
    if (!audio || keepaliveActive) return;
    keepaliveActive = true;
    if (!audio.src || audio.src.indexOf("data:audio") !== 0) {
      audio.src = SILENT_MP3;
    }
    audio.loop = true;
    audio.volume = 0.04;
    audio.playbackRate = 1;
    try {
      await audio.play();
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "playing";
      }
    } catch (_) {
      /* gesture required */
    }
  }

  function stopKeepaliveLoop() {
    keepaliveActive = false;
    const audio = getAudio();
    if (!audio) return;
    audio.loop = false;
    audio.pause();
    audio.removeAttribute("src");
    try {
      audio.load();
    } catch (_) {
      /* ignore */
    }
  }

  function stopChunk() {
    const audio = getAudio();
    if (!audio) return;
    audio.loop = false;
    audio.onended = null;
    audio.onerror = null;
    audio.oncanplaythrough = null;
    audio.pause();
  }

  function stop() {
    stopKeepaliveLoop();
    stopChunk();
    const audio = getAudio();
    if (!audio) return;
    audio.removeAttribute("src");
    try {
      audio.load();
    } catch (_) {
      /* ignore */
    }
  }

  function pause() {
    getAudio()?.pause();
  }

  function resume() {
    const audio = getAudio();
    if (!audio || !audio.src) return Promise.resolve(false);
    return audio.play().then(() => true).catch(() => false);
  }

  function isPlaying() {
    const audio = getAudio();
    return !!(audio && !audio.paused && audio.src);
  }

  async function playChunk(text, lang, hooks) {
    const audio = getAudio();
    if (!audio || !text) return false;

    const rate = hooks.getRate?.() || 1;
    let resolved = await resolveChunkUrl(text, lang);
    let revokeAfter = false;

    if (!resolved) {
      const direct = buildGoogleUrls(text, lang);
      for (const url of direct) {
        if (!hooks.isSessionActive()) return false;
        audio.loop = false;
        audio.volume = 1;
        const ok = await playAudioSrc(audio, url, rate, hooks);
        if (ok) return hooks.isSessionActive();
      }
      markStreamFailed();
      return false;
    }

    while (hooks.isPaused?.()) {
      await new Promise((r) => setTimeout(r, 150));
      if (!hooks.isSessionActive()) return false;
    }

    audio.loop = false;
    audio.volume = 1;
    revokeAfter = resolved.revoke;
    const ok = await playAudioSrc(audio, resolved.url, rate, hooks);
    if (revokeAfter) URL.revokeObjectURL(resolved.url);

    if (ok && hooks.isSessionActive()) {
      await startKeepaliveLoop();
      return true;
    }
    if (!ok) markStreamFailed();
    return false;
  }

  function setMediaArtwork(track) {
    if (!("mediaSession" in navigator) || !track) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.questionText || "Interview Prep",
      artist: `Interview Prep · ${track.label || "Listen"}`,
      album: "Mukesh Kumar Patel",
      artwork: [
        { src: ARTWORK_URL, sizes: "96x96", type: "image/png" },
        { src: ARTWORK_URL, sizes: "192x192", type: "image/png" },
        { src: ARTWORK_URL, sizes: "512x512", type: "image/png" },
      ],
    });
  }

  global.InterviewMusicAudio = {
    shouldUseMusicAudio,
    isMobileDevice,
    playChunk,
    stop,
    stopChunk,
    pause,
    resume,
    isPlaying,
    setMediaArtwork,
    startKeepaliveLoop,
    stopKeepaliveLoop,
    markStreamFailed,
    resetStreamFailed,
    maxChunkLen: MAX_TTS_CHARS,
    proxyBase,
  };
})(typeof window !== "undefined" ? window : global);
