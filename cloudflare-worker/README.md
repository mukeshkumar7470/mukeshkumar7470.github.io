# TTS proxy for mobile background playback

GitHub Pages cannot call Google TTS directly from the phone. This **free Cloudflare Worker** proxies audio so Interview Prep plays in the background (like JioSaavn).

## Deploy (one time, ~5 minutes)

1. Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/): `npm i -g wrangler`
2. Login: `wrangler login`
3. From this folder:

```bash
cd cloudflare-worker
wrangler deploy tts-proxy.js
```

4. Copy the URL Wrangler prints (e.g. `https://interview-tts-proxy.yourname.workers.dev`).

5. In `interview.html`, set:

```html
<script>
  window.INTERVIEW_TTS_PROXY = "https://interview-tts-proxy.yourname.workers.dev";
</script>
```

6. Push to GitHub. On mobile, open Interview Prep → Listen → lock the screen; playback should continue with notification controls.

## Without proxy

The site still tries device **Web Speech** with a silent audio keepalive on mobile, but **iOS/Android may pause** when you leave the browser. The proxy is the reliable fix.
