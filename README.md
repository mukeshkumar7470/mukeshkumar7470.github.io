# Mukesh Kumar Patel — Portfolio

Modern single-page portfolio for a Mobile App Developer (Android & Flutter), hosted on GitHub Pages.

**Live site:** [https://mukeshkumar7470.github.io/](https://mukeshkumar7470.github.io/)

## Features

- **Interview Prep** — `interview.html` with 193 Q&A including **Behavioral & HR** (What / Why / How, lazy load, TTS) and an interactive **Study Plan** flowchart (5-day / 1-month / 3-month / working pro). Edit **`js/interview-qa.js`**, then `node js/build-interview.js`.

### Interview content

| Command | Purpose |
|---------|---------|
| `node js/build-interview.js` | Regenerate `interview-data.js` |
| `node js/build-interview.js --check` | Validate structure + duplicates |
| `node js/build-interview.js --audit` | Build + validate |

Manual edit guide: **`AGENTS.md`**

## Stack

- HTML5, CSS3 (custom properties, grid, glassmorphism)
- Vanilla JavaScript (typed headline, scroll reveal, mobile nav, interview accordions)
- [Font Awesome](https://fontawesome.com/) icons
- [Google Fonts](https://fonts.google.com/) — Outfit & JetBrains Mono

## Local preview

Open `index.html` in a browser, or run a simple server:

```bash
npx serve .
```

## CV

Place your resume PDF at `assets/Mukesh-Kumar-Patel-CV.pdf` for the download button to work.

## Deploy

Push to the `master` branch of `mukeshkumar7470.github.io` — GitHub Pages serves the site automatically.
