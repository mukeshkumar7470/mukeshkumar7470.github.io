(function () {
  "use strict";

  if (typeof INTERVIEW_QA === "undefined") return;

  const listEl = document.getElementById("interviewList");
  const searchEl = document.getElementById("interviewSearch");
  const countEl = document.getElementById("interviewCount");
  const tabsEl = document.getElementById("interviewTabs");
  const expandAllBtn = document.getElementById("interviewExpandAll");
  const collapseAllBtn = document.getElementById("interviewCollapseAll");

  if (!listEl) return;

  let activeCategory = "all";
  let expandAll = false;

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function formatAnswer(text, lang) {
    if (typeof InterviewAnswerFormat !== "undefined") {
      return InterviewAnswerFormat.formatAnswer(text, lang);
    }
    if (!text) return "";
    return text
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  function getAllItems() {
    const items = [];
    INTERVIEW_QA.forEach((cat) => {
      cat.items.forEach((item, index) => {
        items.push({
          ...item,
          categoryId: cat.id,
          categoryLabel: cat.label,
          categoryIcon: cat.icon,
          num: index + 1,
          globalId: `${cat.id}-${index + 1}`,
        });
      });
    });
    return items;
  }

  function matchesQuery(item, query) {
    if (!query) return true;
    const hay = `${item.q} ${item.en} ${item.hi} ${item.categoryLabel}`.toLowerCase();
    return hay.includes(query);
  }

  function renderVisualBlock(item) {
    if (typeof InterviewVisuals !== "undefined") {
      return InterviewVisuals.renderVisual(item.q, item.categoryId);
    }
    return "";
  }

  function ttsBtn(mode, label, icon) {
    if (typeof InterviewTTS !== "undefined") {
      return InterviewTTS.ttsButton(mode, label, icon);
    }
    return "";
  }

  function renderAccordion(item) {
    const openAttr = expandAll ? " open" : "";
    const visual = renderVisualBlock(item);
    const ttsSupported = typeof InterviewTTS !== "undefined" && InterviewTTS.supported();
    const ttsBlock = ttsSupported
      ? `
          <div class="iqa-tts-row" role="group" aria-label="Listen to this question">
            <span class="iqa-tts-row-label"><i class="fa-solid fa-headphones"></i> Listen</span>
            ${ttsBtn("question", "Question", "fa-solid fa-circle-question")}
            ${ttsBtn("en", "English", "fa-solid fa-volume-high")}
            ${ttsBtn("hi", "Hindi", "fa-solid fa-language")}
            ${ttsBtn("all", "All", "fa-solid fa-play")}
          </div>`
      : "";

    return `
      <details class="iqa-item" data-category="${item.categoryId}" data-id="${item.globalId}"${openAttr}>
        <summary class="iqa-summary">
          <span class="iqa-num">${item.num}</span>
          <span class="iqa-title">${escapeHtml(item.q)}</span>
          <span class="iqa-cat-badge">${escapeHtml(item.categoryLabel)}</span>
          ${
            ttsSupported
              ? `<span class="iqa-summary-tts">${ttsBtn("question", "Listen question", "fa-solid fa-volume-high")}</span>`
              : ""
          }
          <i class="fa-solid fa-chevron-down iqa-chevron" aria-hidden="true"></i>
        </summary>
        <div class="iqa-body">
          ${visual}
          ${ttsBlock}
          <div class="iqa-body-layout">
            <section class="iqa-answer-panel">
              <div class="iqa-answer-head iqa-en">
                <h4><i class="fa-solid fa-microphone"></i> Interview answer</h4>
                <div class="iqa-answer-head-actions">
                  ${ttsSupported ? ttsBtn("en", "Listen English", "fa-solid fa-volume-high") : ""}
                  <span class="iqa-answer-badge">English · What → Why → How</span>
                </div>
              </div>
              <div class="iqa-answer-content iqa-en">${formatAnswer(item.en, "en")}</div>
            </section>
            <section class="iqa-answer-panel">
              <div class="iqa-answer-head iqa-hi">
                <h4><i class="fa-solid fa-book-open"></i> Deep explanation</h4>
                <div class="iqa-answer-head-actions">
                  ${ttsSupported ? ttsBtn("hi", "Listen Hindi", "fa-solid fa-language") : ""}
                  <span class="iqa-answer-badge">Hindi · क्या → क्यों → कैसे</span>
                </div>
              </div>
              <div class="iqa-answer-content iqa-hi">${formatAnswer(item.hi, "hi")}</div>
            </section>
          </div>
        </div>
      </details>
    `;
  }

  function renderGrouped(categories, query) {
    if (typeof InterviewTTS !== "undefined" && InterviewTTS.isPlaying()) {
      InterviewTTS.stop();
    }

    let total = 0;
    let html = "";

    categories.forEach((cat) => {
      const filtered = cat.items
        .map((item, index) => ({
          ...item,
          categoryId: cat.id,
          categoryLabel: cat.label,
          categoryIcon: cat.icon,
          num: index + 1,
          globalId: `${cat.id}-${index + 1}`,
        }))
        .filter((item) => matchesQuery(item, query));

      if (!filtered.length) return;

      total += filtered.length;
      html += `
        <div class="iqa-group" data-group="${cat.id}">
          <h3 class="iqa-group-title">
            <i class="${cat.icon}"></i> ${escapeHtml(cat.label)}
            <span class="iqa-group-count">${filtered.length}</span>
          </h3>
          <div class="iqa-group-list">
            ${filtered.map(renderAccordion).join("")}
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html || `<p class="iqa-empty">No questions match your search. Try another keyword.</p>`;
    listEl.dataset.allCategories = activeCategory === "all" ? "true" : "false";
    if (countEl) {
      countEl.textContent = total
        ? `${total} question${total === 1 ? "" : "s"} shown`
        : "0 questions";
    }

    if (typeof InterviewVisuals !== "undefined") {
      InterviewVisuals.bindVisualAnimations(listEl);
      if (expandAll) {
        listEl.querySelectorAll(".iqa-item[open]").forEach((d) => {
          InterviewVisuals.playItemAnimation(d);
        });
      }
    }
    if (typeof InterviewAnswerFormat !== "undefined") {
      InterviewAnswerFormat.bindScrollChips(listEl);
    }
    if (typeof InterviewTTS !== "undefined") {
      InterviewTTS.bindList(listEl);
    }
  }

  function render() {
    const query = (searchEl?.value || "").trim().toLowerCase();
    const cats =
      activeCategory === "all"
        ? INTERVIEW_QA
        : INTERVIEW_QA.filter((c) => c.id === activeCategory);
    renderGrouped(cats, query);
  }

  function buildTabs() {
    if (!tabsEl) return;
    const total = getAllItems().length;
    let html = `<button type="button" class="interview-tab active" data-cat="all">All <span>${total}</span></button>`;
    INTERVIEW_QA.forEach((cat) => {
      html += `<button type="button" class="interview-tab" data-cat="${cat.id}">
        <i class="${cat.icon}"></i> ${cat.label} <span>${cat.items.length}</span>
      </button>`;
    });
    tabsEl.innerHTML = html;

    tabsEl.querySelectorAll(".interview-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        tabsEl.querySelectorAll(".interview-tab").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.cat;
        render();
      });
    });
  }

  if (searchEl) {
    let debounce;
    searchEl.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(render, 200);
    });
  }

  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", () => {
      if (typeof InterviewTTS !== "undefined") InterviewTTS.stop();
      expandAll = true;
      render();
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", () => {
      if (typeof InterviewTTS !== "undefined") InterviewTTS.stop();
      expandAll = false;
      render();
    });
  }

  if (typeof InterviewTTS !== "undefined") {
    InterviewTTS.bindToolbar();
  }

  buildTabs();
  render();
})();
