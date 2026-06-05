# Interview Q&A — manual edit guide

**One file to edit:** `js/interview-qa.js`

**Never edit:** `js/interview-data.js` (auto-generated)

## Add or change a question

Open `js/interview-qa.js`, find the category (`java`, `oops`, `kotlin`, …), and add or edit a block:

```javascript
{
  q: "Interface vs Abstract class",
  en: `What?

Your English answer here.

Why?

Why interviewers ask this.

How?

Key points or steps.

\`\`\`kotlin
interface Clickable {
    fun onClick()
}
\`\`\`

One-line interview closing.`,
  hi: `What?

Roman Hindi answer.

Why?

Roman Hindi reason.

How?

Roman Hindi steps.

\`\`\`kotlin
interface Clickable {
    fun onClick()
}
\`\`\`

Interview one-liner Hindi mein.`
},
```

Rules:
- Use **template strings** (backticks) for `en` and `hi` — write real line breaks, not `\n\n`.
- Every answer needs **What?**, **Why?**, **How?** sections.
- Code blocks: `\`\`\`kotlin` … `\`\`\`` inside the template string.
- Escape backticks in prose as `\`` if needed.

## Build and validate

```bash
node js/build-interview.js          # rebuild interview-data.js
node js/build-interview.js --check  # validate only
node js/build-interview.js --audit  # build + validate
```

If you add or remove questions, update the count in `interview.html` and `README.md`.

## Preview

Open `interview.html` in a browser and search for your question title.
