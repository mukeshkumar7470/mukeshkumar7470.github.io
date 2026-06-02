/**
 * Cloudflare Worker — TTS proxy for mobile background playback.
 * Deploy: wrangler deploy (see README in this folder)
 * Then set in interview.html: window.INTERVIEW_TTS_PROXY = 'https://YOUR.workers.dev';
 */
export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders(),
      });
    }

    const url = new URL(request.url);
    const text = (url.searchParams.get("text") || "").slice(0, 200);
    const lang = url.searchParams.get("lang") === "hi" ? "hi" : "en";

    if (!text) {
      return new Response("Missing text", { status: 400, headers: corsHeaders() });
    }

    const tl = lang;
    const q = encodeURIComponent(text);
    const sources = [
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${q}`,
      `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${tl}&q=${q}`,
    ];

    for (const src of sources) {
      try {
        const upstream = await fetch(src, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
            Referer: "https://translate.google.com/",
          },
        });
        if (!upstream.ok) continue;
        const body = await upstream.arrayBuffer();
        if (body.byteLength < 64) continue;
        return new Response(body, {
          headers: {
            ...corsHeaders(),
            "Content-Type": upstream.headers.get("Content-Type") || "audio/mpeg",
            "Cache-Control": "public, max-age=86400",
          },
        });
      } catch (_) {
        /* try next */
      }
    }

    return new Response("TTS upstream failed", { status: 502, headers: corsHeaders() });
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
