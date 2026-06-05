/**
 * Rich answer formatting: What / Why / How cards + readable paragraphs.
 */
(function (global) {
  "use strict";

  const SECTION_DEFS = [
    {
      key: "what",
      markers: /^what\?$/i,
      labelEn: "What",
      labelHi: "क्या",
      subEn: "Definition & concept",
      subHi: "परिभाषा और concept",
      icon: "fa-circle-question",
      css: "iqa-wwh-what",
    },
    {
      key: "why",
      markers: /^why\?$/i,
      labelEn: "Why",
      labelHi: "क्यों",
      subEn: "Reason & context",
      subHi: "कारण और context",
      icon: "fa-lightbulb",
      css: "iqa-wwh-why",
    },
    {
      key: "how",
      markers: /^how\?$/i,
      labelEn: "How",
      labelHi: "कैसे",
      subEn: "How it works & practice",
      subHi: "कैसे काम करता है",
      icon: "fa-gears",
      css: "iqa-wwh-how",
    },
  ];

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  const wwh = () =>
    typeof WwhStructure !== "undefined"
      ? WwhStructure
      : { parseExplicitSections: () => null, inferSections: () => [] };

  function isCodeLine(line) {
    return /^\s*(val |var |fun |class |interface |object |import |package |@|if \(|for \(|try |catch |private |public |void |int |String|List<|Mutable|suspend |viewModelScope|data class)/.test(
      line
    );
  }

  function isFlowLine(line) {
    return /→|->/.test(line) && line.length < 220 && !/[`*]/.test(line);
  }

  function inlineMarkup(raw) {
    let s = escapeHtml(raw);
    s = s.replace(/`([^`]+)`/g, '<code class="iqa-code-inline">$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
    return s;
  }

  function renderCodeBlock(code, lang) {
    const trimmed = code.replace(/^\n+/, "").replace(/\s+$/, "");
    const label = lang
      ? `<span class="iqa-code-lang">${escapeHtml(lang)}</span>`
      : "";
    return `<div class="iqa-code-block">${label}<pre><code>${escapeHtml(trimmed)}</code></pre></div>`;
  }

  function formatFlow(line) {
    const steps = line
      .split(/\s*(?:→|->)\s*/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (steps.length < 2) return null;
    return `<div class="iqa-flow">${steps
      .map(
        (step, i) =>
          `<span class="iqa-flow-step">${escapeHtml(step)}</span>${i < steps.length - 1 ? '<span class="iqa-flow-arrow" aria-hidden="true">→</span>' : ""}`
      )
      .join("")}</div>`;
  }

  function formatLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return "";

    if (isFlowLine(trimmed)) {
      const flow = formatFlow(trimmed);
      if (flow) return flow;
    }

    const heading = trimmed.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      return `<p class="iqa-subhead"><strong>${inlineMarkup(heading[1])}</strong></p>`;
    }

    if (isCodeLine(trimmed) && !/[`*]/.test(trimmed)) {
      return `<pre class="iqa-inline-code"><code>${escapeHtml(trimmed)}</code></pre>`;
    }

    if (/^(Example|Output|Problems in|Other problems|Compared to|Order:|Memory:|Kotlin code)/i.test(trimmed)) {
      const colon = trimmed.indexOf(":");
      if (colon >= 0) {
        return `<p class="iqa-sublead"><strong>${escapeHtml(trimmed.slice(0, colon + 1))}</strong> ${inlineMarkup(trimmed.slice(colon + 1).trim())}</p>`;
      }
      return `<p class="iqa-sublead"><strong>${inlineMarkup(trimmed)}</strong></p>`;
    }

    if (/^[-•]\s+/.test(trimmed)) {
      return `<li>${inlineMarkup(trimmed.replace(/^[-•]\s+/, ""))}</li>`;
    }

    return `<p>${inlineMarkup(trimmed)}</p>`;
  }

  function formatTextBlock(text) {
    if (!text || !text.trim()) return "";
    const lines = text.split("\n");
    let html = "";
    let inList = false;

    lines.forEach((line) => {
      const piece = formatLine(line);
      if (!piece) return;
      if (piece.startsWith("<li>")) {
        if (!inList) {
          html += "<ul class=\"iqa-bullet-list\">";
          inList = true;
        }
        html += piece;
      } else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += piece;
      }
    });
    if (inList) html += "</ul>";
    return html;
  }

  function formatSectionBody(content) {
    const fenceRe = /```([a-zA-Z0-9]+)?\n?([\s\S]*?)```/g;
    let html = "";
    let lastIndex = 0;
    let match;

    while ((match = fenceRe.exec(content)) !== null) {
      html += formatTextBlock(content.slice(lastIndex, match.index));
      html += renderCodeBlock(match[2] || "", match[1] || "");
      lastIndex = fenceRe.lastIndex;
    }
    html += formatTextBlock(content.slice(lastIndex));
    return html;
  }

  function renderSectionCard(section, lang) {
    const def = SECTION_DEFS.find((d) => d.key === section.key) || SECTION_DEFS[0];
    const label = lang === "hi" ? def.labelHi : def.labelEn;
    const sub = lang === "hi" ? def.subHi : def.subEn;

    return `
      <article class="iqa-wwh-card ${def.css}" id="">
        <header class="iqa-wwh-card-head">
          <span class="iqa-wwh-icon" aria-hidden="true"><i class="fa-solid ${def.icon}"></i></span>
          <div class="iqa-wwh-titles">
            <h5 class="iqa-wwh-label">${escapeHtml(label)}</h5>
            <span class="iqa-wwh-sub">${escapeHtml(sub)}</span>
          </div>
        </header>
        <div class="iqa-wwh-body">${formatSectionBody(section.content)}</div>
      </article>
    `;
  }

  function renderNav(sections, lang) {
    const chips = sections
      .map((s) => {
        const def = SECTION_DEFS.find((d) => d.key === s.key);
        const label = lang === "hi" ? def.labelHi : def.labelEn;
        return `<a class="iqa-wwh-chip iqa-wwh-chip-${s.key}" href="#${s.key}" data-scroll="${s.key}">${escapeHtml(label)}</a>`;
      })
      .join("");
    return `<nav class="iqa-wwh-nav" aria-label="Answer sections">${chips}</nav>`;
  }

  function formatAnswer(text, lang) {
    if (!text) return "";

    const { parseExplicitSections, inferSections } = wwh();
    const explicit = parseExplicitSections(text);
    const sections = explicit || inferSections(text);

    if (!sections.length) return "";

    // Prefer full What → Why → How layout when all three sections exist
    const order = ["what", "why", "how"];
    const ordered = order
      .map((key) => sections.find((s) => s.key === key))
      .filter(Boolean);

    if (ordered.length === 1 && ordered[0].key === "what") {
      return `<div class="iqa-structured iqa-structured-single">${renderSectionCard(ordered[0], lang)}</div>`;
    }

    return `
      <div class="iqa-structured">
        ${renderNav(ordered, lang)}
        <div class="iqa-wwh-grid">
          ${ordered.map((s) => renderSectionCard(s, lang)).join("")}
        </div>
      </div>
    `;
  }

  function bindScrollChips(root) {
    if (!root) return;
    root.querySelectorAll(".iqa-wwh-chip[data-scroll]").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.preventDefault();
        const key = chip.dataset.scroll;
        const card = chip.closest(".iqa-structured")?.querySelector(`.iqa-wwh-${key}`);
        card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  }

  global.InterviewAnswerFormat = {
    formatAnswer,
    bindScrollChips,
  };
})(typeof window !== "undefined" ? window : global);
