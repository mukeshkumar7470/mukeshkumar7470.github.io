/**
 * Makes Hindi (hi) interview answers more readable: full sentences, clear punctuation.
 * Used by apply-hindi-polish.js — Roman Hindi + English technical terms.
 */

function capitalizeFirst(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ensureEndPunctuation(s) {
  const t = s.trim();
  if (!t) return t;
  if (/[.!?।:]$/.test(t)) return t;
  if (isCodeLikeLine(t)) return t;
  return `${t}.`;
}

function isSectionHeader(line) {
  const t = line.trim();
  return /^(What|Why|How)\?$/i.test(t) || /^(Example|Other problems):?\s*$/i.test(t);
}

/** Semicolon or em-dash between clauses → separate sentences */
function splitClauses(text) {
  return text
    .replace(/\s*—\s*/g, "; ")
    .split(/\s*;\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Turn em-dash / semicolon fragment chains into separate sentences */
function expandDashes(text) {
  return splitClauses(text)
    .map((part) => ensureEndPunctuation(capitalizeFirst(part)))
    .join(" ");
}

function polishInline(text) {
  let t = text.trim();
  if (!t) return t;

  if (isSectionHeader(t) || isCodeLikeLine(t) || /→|->/.test(t)) return t;

  t = t.replace(/\s*\+\s*/g, " aur ");
  t = t.replace(/\bmat\s+karo\b/gi, "mat karein");
  t = t.replace(/\bzyada tar\b/gi, "zyadatar");
  t = t.replace(/\s{2,}/g, " ");
  t = t.replace(/:\./g, ":");

  return expandDashes(t);
}

function isCodeLikeLine(line) {
  return /^(val |var |fun |class |import |@|if |for )/.test(line) || /=\s*["'`]/.test(line);
}

function polishStructuredBlock(block) {
  const lines = block.split("\n");
  const header = lines[0].trim();
  const rest = lines.slice(1).join("\n").trim();

  if (/^(What|Why|How)\?$/i.test(header)) {
    const body = rest ? polishInline(rest) : "";
    return body ? `${header}\n\n${body}` : header;
  }

  if (/^(Example|Other problems):?\s*$/i.test(header)) {
    const bodyLines = lines.slice(1);
    const body = bodyLines
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (trimmed.startsWith("- ")) {
          return `- ${completeBulletItem(trimmed.slice(2))}`;
        }
        if (isCodeLikeLine(trimmed)) return trimmed;
        return polishInline(trimmed);
      })
      .filter(Boolean)
      .join("\n");
    return body ? `${header}\n\n${body}` : header;
  }

  if (/^[^:]+:\s*$/i.test(header) && header.endsWith(":")) {
    const body = rest ? polishBodyLines(rest) : "";
    return body ? `${header}\n\n${body}` : header;
  }

  return polishInline(block);
}

function completeBulletItem(text) {
  let t = polishInline(text);
  if (!t) return t;
  if (/[.!?]$/.test(t)) return t;
  if (/\b(hai|hain|ho|hota|hoti|hot|thi|the|dena|karta|karti|sakta|sakti)\b/i.test(t)) {
    return ensureEndPunctuation(capitalizeFirst(t));
  }
  if (/\b(nahi|weak|native|verbose)\b/i.test(t)) {
    return ensureEndPunctuation(capitalizeFirst(t));
  }
  if (/\bslow\b/i.test(t)) {
    return ensureEndPunctuation(capitalizeFirst(`${t} ho jata tha`));
  }
  return ensureEndPunctuation(capitalizeFirst(`${t} hota hai`));
}

function polishBodyLines(text) {
  return text
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("- ")) {
        return `- ${completeBulletItem(trimmed.slice(2))}`;
      }
      if (isCodeLikeLine(trimmed)) return trimmed;
      if (isSectionHeader(trimmed)) return trimmed;
      return polishInline(trimmed);
    })
    .join("\n");
}

function ensureParagraphBreaks(text) {
  return text.replace(
    /([.!?।])\n([A-Za-z])/g,
    (_, end, start) => `${end}\n\n${start}`
  );
}

function polishParagraph(para) {
  const p = para.trim();
  if (!p) return p;

  if (/^(What|Why|How)\?/im.test(p) && p.includes("\n")) {
    return polishStructuredBlock(p);
  }

  if (p.includes("\n- ") || p.startsWith("- ")) {
    const headerMatch = p.match(/^([^:\n]+:)\s*\n/i);
    if (headerMatch && !p.trim().startsWith("- ")) {
      const header = headerMatch[1].trim();
      const body = p.slice(headerMatch[0].length);
      return `${header}\n\n${polishBodyLines(body)}`;
    }
    return polishBodyLines(p);
  }

  return polishInline(p);
}

/**
 * @param {string} hi - original Hindi answer
 * @param {string} [en] - English answer (optional, for future alignment)
 */
function toReadableHindi(hi, en) {
  if (!hi || typeof hi !== "string") return hi;

  const paragraphs = hi.split(/\n\n+/);
  const polished = paragraphs.map((para) => polishParagraph(para));

  let result = polished.join("\n\n");
  result = ensureParagraphBreaks(result);

  result = result.replace(/:\./g, ":");
  result = result.replace(/\.\s*\./g, ".");
  result = result.replace(/\n{3,}/g, "\n\n");
  result = result.replace(/(val |var )([^.\n]+)\.\s*$/gm, "$1$2");

  return result.trim();
}

module.exports = { toReadableHindi, polishParagraph, polishInline };
