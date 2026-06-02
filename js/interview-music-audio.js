/**
 * Mobile music-style playback: real <audio> streams (background + lock screen like JioSaavn).
 * Desktop keeps Web Speech API in interview-tts.js.
 */
(function (global) {
  "use strict";

  const MAX_TTS_CHARS = 180;
  const ARTWORK_URL = "https://avatars.githubusercontent.com/u/48297190?v=4";

  let musicAudio = null;
  let activeUrl = null;

  function isMobileDevice() {
    if (typeof window === "undefined") return false;
    const ua = navigator.userAgent || "";
    if (/Android|iPhone|iPad|iPod|Mobile|Silk/i.test(ua)) return true;
    return navigator.maxTouchPoints > 0 && window.matchMedia("(max-width: 900px)").matches;
  }

  function shouldUseMusicAudio() {
    return isMobileDevice() && typeof HTMLAudioElement !== "undefined";
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

  function revokeActiveUrl() {
    if (activeUrl) {
      URL.revokeObjectURL(activeUrl);
      activeUrl = null;
    }
  }

  function buildTtsUrls(text, lang) {
    const tl = lang === "hi" ? "hi" : "en";
    const q = encodeURIComponent(text.slice(0, MAX_TTS_CHARS));
    return [
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${q}`,
      `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${tl}&q=${q}`,
    ];
  }

  function stop() {
    const audio = getAudio();
    revokeActiveUrl();
    if (!audio) return;
    audio.onended = null;
    audio.onerror = null;
    audio.onplay = null;
    audio.ontimeupdate = null;
    audio.pause();
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

  function updatePositionState(audio) {
    if (!("mediaSession" in navigator) || !audio || !Number.isFinite(audio.duration)) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: audio.duration || 0,
        playbackRate: audio.playbackRate || 1,
        position: Math.min(audio.currentTime || 0, audio.duration || 0),
      });
    } catch (_) {
      /* unsupported on some browsers */
    }
  }

  function playUrlOnce(audio, url, rate, hooks) {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        audio.onended = null;
        audio.onerror = null;
        resolve(ok);
      };

      audio.onplay = () => {
        hooks.onStart?.();
        if ("mediaSession" in navigator) {
          navigator.mediaSession.playbackState = "playing";
        }
      };
      audio.ontimeupdate = () => {
        updatePositionState(audio);
        hooks.onTimeUpdate?.(audio.currentTime, audio.duration);
      };
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);

      audio.src = url;
      audio.playbackRate = rate;
      audio.play().catch(() => finish(false));

      setTimeout(() => {
        if (!settled && audio.error) finish(false);
      }, 14000);
    });
  }

  /**
   * @param {object} hooks
   * @param {() => boolean} hooks.isSessionActive
   * @param {() => boolean} hooks.isPaused
   * @param {() => number} [hooks.getRate]
   * @param {() => void} [hooks.onStart]
   */
  async function playChunk(text, lang, hooks) {
    const audio = getAudio();
    if (!audio || !text) return false;

    const rate = hooks.getRate?.() || 1;
    const urls = buildTtsUrls(text, lang);

    for (const url of urls) {
      if (!hooks.isSessionActive()) return false;
      while (hooks.isPaused?.()) {
        await new Promise((r) => setTimeout(r, 150));
        if (!hooks.isSessionActive()) return false;
      }

      const ok = await playUrlOnce(audio, url, rate, hooks);
      if (ok) return hooks.isSessionActive();
    }

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
    pause,
    resume,
    isPlaying,
    setMediaArtwork,
    maxChunkLen: MAX_TTS_CHARS,
  };
})(typeof window !== "undefined" ? window : global);
