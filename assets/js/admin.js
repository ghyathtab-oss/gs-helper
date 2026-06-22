/* ===========================================================
   admin.js – لوحة تحكم المشرف (role = admin فقط)
   =========================================================== */

(function () {
  // الحارس: يتطلب جلسة مشرف، وإلا يعيد للصفحة الرئيسية
  if (!GSUI.initPage({ id: "home", title: "لوحة التحكم", admin: true })) return;

  const residentsList = (typeof residents !== "undefined") ? residents : (window.residents || []);

  document.getElementById("refreshResidents").innerHTML = ICONS.refresh + "<span>تحديث بيانات المقيمين</span>";
  document.getElementById("exportJs").innerHTML = ICONS.download + "<span>تصدير أرشيف patients.js</span>";
  document.getElementById("logoutBtn2").innerHTML = ICONS.logout + "<span>تسجيل الخروج</span>";

  function renderStats() {
    document.getElementById("statPatients").textContent = PatientStore.count();
    document.getElementById("statResidents").textContent = residentsList.length;
  }

  function renderLatest() {
    const latest = PatientStore.latest(10);
    const host = document.getElementById("latestList");
    const empty = document.getElementById("latestEmpty");
    if (!latest.length) { host.innerHTML = ""; empty.style.display = "block"; return; }
    empty.style.display = "none";
    host.innerHTML = latest.map(p => `
      <article class="patient-card" data-id="${GSUI.esc(p.id)}">
        <div class="pc-head">
          <div>
            <h3>${GSUI.esc(p.name)}</h3>
            <div class="file-no">ملف: ${GSUI.esc(p.fileNo || "—")} · ${GSUI.esc(p.date || "")}</div>
          </div>
          <button class="btn btn-danger btn-sm del-btn">${ICONS.trash}<span>حذف</span></button>
        </div>
      </article>`).join("");
  }

  // حذف مريض من اللوحة
  document.getElementById("latestList").addEventListener("click", function (e) {
    const cardEl = e.target.closest(".patient-card");
    if (!cardEl || !e.target.closest(".del-btn")) return;
    const id = cardEl.getAttribute("data-id");
    GSUI.confirm(
      "هل أنت متأكد من حذف هذا المريض بشكل دائم؟",
      () => { PatientStore.remove(id); GSUI.toast("تم حذف المريض بنجاح", "success"); renderStats(); renderLatest(); },
      { title: "تأكيد الحذف", okText: "حذف نهائي" }
    );
  });

  // تغيير كلمة سر الدخول
  document.getElementById("saveGatePass").addEventListener("click", function () {
    const v = document.getElementById("newGatePass").value.trim();
    if (!v) { GSUI.toast("أدخل كلمة سر جديدة", "error"); return; }
    GS.setGatePass(v);
    document.getElementById("newGatePass").value = "";
    GSUI.toast("تم تغيير كلمة سر الدخول", "success");
  });

  // تغيير كلمة سر تحميل الأرشيف
  document.getElementById("saveArchivePass").addEventListener("click", function () {
    const v = document.getElementById("newArchivePass").value.trim();
    if (!v) { GSUI.toast("أدخل كلمة سر جديدة", "error"); return; }
    GS.setArchivePass(v);
    document.getElementById("newArchivePass").value = "";
    GSUI.toast("تم تغيير كلمة سر تحميل الأرشيف", "success");
  });

  // تحديث بيانات المقيمين (إعادة قراءة من residents.js)
  document.getElementById("refreshResidents").addEventListener("click", function () {
    GSUI.toast("بيانات المقيمين تُحدَّث بتعديل ملف data/residents.js", "success");
    renderStats();
  });

  // تصدير الأرشيف
  document.getElementById("exportJs").addEventListener("click", function () {
    PatientStore.exportJsFile();
    GSUI.toast("تم تصدير patients.js", "success");
  });

  // تسجيل الخروج
  document.getElementById("logoutBtn2").addEventListener("click", () => GS.logout());

  renderStats();
  renderLatest();
})();
