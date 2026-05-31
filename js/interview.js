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

  function formatAnswer(text) {
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

  function renderAccordion(item) {
    const openAttr = expandAll ? " open" : "";
    const visual = renderVisualBlock(item);
    return `
      <details class="iqa-item" data-category="${item.categoryId}" data-id="${item.globalId}"${openAttr}>
        <summary class="iqa-summary">
          <span class="iqa-num">${item.num}</span>
          <span class="iqa-title">${escapeHtml(item.q)}</span>
          <span class="iqa-cat-badge">${escapeHtml(item.categoryLabel)}</span>
          <i class="fa-solid fa-chevron-down iqa-chevron" aria-hidden="true"></i>
        </summary>
        <div class="iqa-body">
          ${visual}
          <div class="iqa-block iqa-en">
            <h4><i class="fa-solid fa-microphone"></i> Interview answer (English)</h4>
            <div class="iqa-text">${formatAnswer(item.en)}</div>
          </div>
          <div class="iqa-block iqa-hi">
            <h4><i class="fa-solid fa-book-open"></i> Deep explanation (Hindi)</h4>
            <div class="iqa-text">${formatAnswer(item.hi)}</div>
          </div>
        </div>
      </details>
    `;
  }

  function renderGrouped(categories, query) {
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
      expandAll = true;
      render();
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", () => {
      expandAll = false;
      render();
    });
  }

  buildTabs();
  render();
})();
