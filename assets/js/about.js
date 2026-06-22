/* ===========================================================
   about.js – صفحة "حول" الثابتة: تجميع المقيمين حسب PGY
   =========================================================== */

(function () {
  if (!GSUI.initPage({ id: "about", title: "حول النظام" })) return;

  const list = (typeof residents !== "undefined") ? residents : (window.residents || []);
  const host = document.getElementById("pgyGroups");

  // تجميع حسب السنة مع الحفاظ على ترتيب الظهور
  const groups = {};
  const order = [];
  list.forEach(r => {
    const key = r.PGY || "غير محدد";
    if (!groups[key]) { groups[key] = []; order.push(key); }
    groups[key].push(r);
  });

  if (!order.length) { host.innerHTML = '<div class="empty">لا توجد بيانات مقيمين</div>'; return; }

  host.innerHTML = order.map(key => `
    <div class="pgy-group">
      <h4>${ICONS.users}<span>${GSUI.esc(key)} <span style="color:var(--text-muted);font-weight:600">(${groups[key].length})</span></span></h4>
      <ul>
        ${groups[key].map(r => `<li>${GSUI.esc(r.arabicname)} — <span style="color:var(--text-muted)">${GSUI.esc(r.EnglishName)}</span></li>`).join("")}
      </ul>
    </div>`).join("");
})();
