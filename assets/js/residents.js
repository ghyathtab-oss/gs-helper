/* ===========================================================
   residents.js – عرض المقيمين في كروت + بحث + اتصال + واتساب
   =========================================================== */

(function () {
  if (!GSUI.initPage({ id: "residents", title: "المقيمون" })) return;

  document.getElementById("searchIcon").insertAdjacentHTML("afterbegin", ICONS.search);

  const list = (typeof residents !== "undefined") ? residents : (window.residents || []);
  const grid = document.getElementById("residentsGrid");
  const empty = document.getElementById("emptyState");
  const countHint = document.getElementById("countHint");
  const input = document.getElementById("searchInput");

  function waNumber(phone) {
    return String(phone || "").replace(/[^\d]/g, "").replace(/^00/, "");
  }

  function card(r) {
    const avatar = r.Gender === "F" ? "assets/img/avatar_female.png" : "assets/img/avatar_male.png";
    const wa = waNumber(r.Phone);
    return `
      <article class="person-card">
        <img class="avatar" src="${avatar}" alt="صورة ${GSUI.esc(r.arabicname)}" />
        <div class="info">
          <h3>${GSUI.esc(r.arabicname)}</h3>
          <div class="en">${GSUI.esc(r.EnglishName)}</div>
          <span class="badge">${GSUI.esc(r.PGY)}</span>
        </div>
        <div class="actions">
          <a class="icon-btn icon-call" href="tel:${GSUI.esc(r.Phone)}" title="اتصال" aria-label="اتصال بـ ${GSUI.esc(r.arabicname)}">${ICONS.phone}</a>
          <a class="icon-btn icon-wa" href="https://wa.me/${wa}" target="_blank" rel="noopener" title="واتساب" aria-label="واتساب ${GSUI.esc(r.arabicname)}">${ICONS.whatsapp}</a>
        </div>
      </article>`;
  }

  function render(items) {
    countHint.textContent = "عدد المقيمين: " + items.length;
    if (!items.length) { grid.innerHTML = ""; empty.style.display = "block"; return; }
    empty.style.display = "none";
    grid.innerHTML = items.map(card).join("");
  }

  function filter(q) {
    q = q.trim().toLowerCase();
    if (!q) return list;
    return list.filter(r =>
      [r.arabicname, r.EnglishName, r.PGY, r.Phone].some(v => String(v).toLowerCase().includes(q))
    );
  }

  input.addEventListener("input", () => render(filter(input.value)));
  render(list);
})();
