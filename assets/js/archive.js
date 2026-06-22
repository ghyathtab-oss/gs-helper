/* ===========================================================
   archive.js – أرشيف المرضى: إضافة/بحث/حذف/تصدير/تحميل Excel
   =========================================================== */

(function () {
  if (!GSUI.initPage({ id: "archive", title: "أرشيف المرضى" })) return;

  document.getElementById("searchIcon").insertAdjacentHTML("afterbegin", ICONS.search);
  document.getElementById("saveBtn").innerHTML = ICONS.save + "<span>حفظ المريض</span>";
  document.getElementById("exportJsBtn").innerHTML = ICONS.download + "<span>تصدير patients.js</span>";
  document.getElementById("downloadBtn").innerHTML = ICONS.download + "<span>تحميل الأرشيف (Excel)</span>";

  const form = document.getElementById("patientForm");
  const listEl = document.getElementById("patientsList");
  const empty = document.getElementById("emptyState");
  const countHint = document.getElementById("countHint");
  const searchInput = document.getElementById("searchInput");

  // تاريخ اليوم افتراضياً
  document.getElementById("date").value = new Date().toISOString().slice(0, 10);

  function patientCard(p) {
    const rows = [
      ["رقم الملف", p.fileNo],
      ["الهاتف", p.phone],
      ["العمر", p.age],
      ["الشكاية", p.complaint],
      ["التشخيص", p.diagnosis],
      ["الأخصائي", p.specialist],
      ["التاريخ", p.date]
    ].filter(r => r[1]);
    return `
      <article class="patient-card" data-id="${GSUI.esc(p.id)}">
        <div class="pc-head">
          <div>
            <h3>${GSUI.esc(p.name)}</h3>
            <div class="file-no">ملف رقم: ${GSUI.esc(p.fileNo || "—")}</div>
          </div>
        </div>
        <div class="rows">
          ${rows.map(r => `<div class="row"><span class="k">${r[0]}</span><span class="v">${GSUI.esc(r[1])}</span></div>`).join("")}
        </div>
        <div class="pc-actions">
          <button class="btn btn-ghost btn-sm copy-btn">${ICONS.copy}<span>نسخ البيانات</span></button>
          <button class="btn btn-danger btn-sm del-btn">${ICONS.trash}<span>حذف</span></button>
        </div>
      </article>`;
  }

  function render(items) {
    countHint.textContent = "عدد المرضى في الأرشيف: " + PatientStore.count() +
      (searchInput.value.trim() ? " — النتائج: " + items.length : "");
    if (!items.length) { listEl.innerHTML = ""; empty.style.display = "block"; return; }
    empty.style.display = "none";
    listEl.innerHTML = items.map(patientCard).join("");
  }

  function refresh() {
    const q = searchInput.value.trim();
    render(q ? PatientStore.search(q) : PatientStore.all());
  }

  // إضافة مريض
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const p = {
      name: document.getElementById("name").value.trim(),
      fileNo: document.getElementById("fileNo").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      age: document.getElementById("age").value.trim(),
      complaint: document.getElementById("complaint").value.trim(),
      diagnosis: document.getElementById("diagnosis").value.trim(),
      specialist: document.getElementById("specialist").value.trim(),
      date: document.getElementById("date").value
    };
    if (!p.name || !p.fileNo) { GSUI.toast("الرجاء إدخال اسم المريض ورقم الملف", "error"); return; }
    PatientStore.add(p);
    form.reset();
    document.getElementById("date").value = new Date().toISOString().slice(0, 10);
    GSUI.toast("تم حفظ بيانات المريض بشكل دائم", "success");
    searchInput.value = "";
    refresh();
  });

  // البحث
  searchInput.addEventListener("input", refresh);

  // النسخ والحذف (تفويض الأحداث)
  listEl.addEventListener("click", function (e) {
    const cardEl = e.target.closest(".patient-card");
    if (!cardEl) return;
    const id = cardEl.getAttribute("data-id");
    const p = PatientStore.all().find(x => x.id === id);
    if (!p) return;

    if (e.target.closest(".copy-btn")) {
      const text =
        `اسم المريض: ${p.name}\nرقم الملف: ${p.fileNo}\nالهاتف: ${p.phone}\n` +
        `العمر: ${p.age}\nالشكاية: ${p.complaint}\nالتشخيص: ${p.diagnosis}\n` +
        `الأخصائي: ${p.specialist}\nالتاريخ: ${p.date}`;
      const done = () => GSUI.toast("تم نسخ بيانات المريض", "success");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else { fallbackCopy(text, done); }
    }

    if (e.target.closest(".del-btn")) {
      GSUI.confirm(
        "هل أنت متأكد من حذف هذا المريض بشكل دائم؟",
        () => { PatientStore.remove(id); GSUI.toast("تم حذف المريض بنجاح", "success"); refresh(); },
        { title: "تأكيد الحذف", okText: "حذف نهائي" }
      );
    }
  });

  function fallbackCopy(text, cb) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); cb(); } catch (e) { GSUI.toast("تعذّر النسخ", "error"); }
    document.body.removeChild(ta);
  }

  // تصدير patients.js (لجعل التغييرات دائمة للجميع على المستودع)
  document.getElementById("exportJsBtn").addEventListener("click", function () {
    PatientStore.exportJsFile();
    GSUI.toast("تم تصدير patients.js — ضعه في مجلد data/ بالمستودع", "success");
  });

  // تحميل الأرشيف (Excel) بكلمة سر
  document.getElementById("downloadBtn").addEventListener("click", function () {
    const pass = window.prompt("أدخل كلمة سر تحميل الأرشيف:");
    if (pass === null) return;
    if (pass === GS.archivePass()) {
      PatientStore.exportExcel();
      GSUI.toast("تم تحميل ملف الأرشيف", "success");
    } else {
      GSUI.toast("كلمة سر التحميل غير صحيحة", "error");
    }
  });

  refresh();
})();
