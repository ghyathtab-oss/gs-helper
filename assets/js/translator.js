/* ===========================================================
   translator.js – مترجم طبي هجين (قاموس محلي + بحث خارجي)
   =========================================================== */

(function () {
  if (!GSUI.initPage({ id: "translator", title: "المترجم الطبي" })) return;

  document.getElementById("searchIcon").insertAdjacentHTML("afterbegin", ICONS.search);

  const input = document.getElementById("termInput");
  const btn = document.getElementById("searchBtn");
  const result = document.getElementById("result");

  let TERMS = [];

  // تحميل قاعدة المصطلحات المحلية (تعمل على http/GitHub Pages)
  fetch("data/terms.json")
    .then(r => r.json())
    .then(data => { TERMS = Array.isArray(data) ? data : []; })
    .catch(() => { TERMS = []; });

  function findLocal(q) {
    q = q.trim().toLowerCase();
    if (!q) return null;
    return TERMS.find(t =>
      String(t.en).toLowerCase() === q ||
      String(t.ar).toLowerCase() === q ||
      String(t.en).toLowerCase().includes(q) ||
      String(t.ar).toLowerCase().includes(q)
    ) || null;
  }

  function localCard(t) {
    return `
      <div class="term-def">
        <div style="font-size:.8rem;color:var(--text-muted);font-weight:700">${GSUI.esc(t.en)}</div>
        <div class="ar">${GSUI.esc(t.ar)}</div>
        <div class="label">التعريف</div>
        <div>${GSUI.esc(t.definition)}</div>
        <div class="label">مثال سريري</div>
        <div>${GSUI.esc(t.example)}</div>
      </div>`;
  }

  function externalLinks(q) {
    const enc = encodeURIComponent(q);
    const links = [
      { name: "Mayo Clinic", url: "https://www.mayoclinic.org/search/search-results?q=" + enc },
      { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=" + enc },
      { name: "Google Medical Search", url: "https://www.google.com/search?q=" + enc + "+medical" },
      { name: "ICD-10 Lookup", url: "https://icd.who.int/browse10/2019/en#/search?q=" + enc }
    ];
    return `
      <div class="empty" style="padding:16px 0 4px">لم يتم العثور على المصطلح في القاموس المحلي.</div>
      <button class="btn btn-ghost" id="extToggle">إظهار البحث الطبي الخارجي</button>
      <div class="ext-links" id="extLinks" style="display:none;">
        ${links.map(l => `<a class="ext-link" href="${l.url}" target="_blank" rel="noopener"><span class="dot"></span><span>${l.name}</span></a>`).join("")}
      </div>`;
  }

  function doSearch() {
    const q = input.value.trim();
    if (!q) { result.innerHTML = '<div class="empty">اكتب مصطلحاً للبحث.</div>'; return; }
    const local = findLocal(q);
    if (local) {
      result.innerHTML = localCard(local);
    } else {
      result.innerHTML = externalLinks(q);
      const toggle = document.getElementById("extToggle");
      const box = document.getElementById("extLinks");
      toggle.addEventListener("click", () => {
        const open = box.style.display !== "none";
        box.style.display = open ? "none" : "grid";
        toggle.textContent = open ? "إظهار البحث الطبي الخارجي" : "إخفاء البحث الطبي الخارجي";
      });
    }
  }

  btn.addEventListener("click", doSearch);
  input.addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });
})();
