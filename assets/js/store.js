/* ===========================================================
   store.js – مخزن أرشيف المرضى (دائم عبر LocalStorage)
   ------------------------------------------------------------
   - يُبذَر من data/patients.js عند أول تشغيل.
   - كل إضافة/حذف تُحفظ فوراً وبشكل دائم على هذا الجهاز.
   - تصدير patients.js يولّد ملفاً جاهزاً للوضع في المستودع
     ليصبح التغيير دائماً للجميع على GitHub Pages.
   =========================================================== */

const PatientStore = {
  KEY: "gs_patients",
  SEEDED: "gs_patients_seeded",

  _seed() {
    // البذر مرة واحدة من الملف الثابت، ثم يعتمد على LocalStorage
    if (localStorage.getItem(this.SEEDED) === "1") return;
    const base = (typeof patients !== "undefined") ? patients : (window.patients || []);
    localStorage.setItem(this.KEY, JSON.stringify(base));
    localStorage.setItem(this.SEEDED, "1");
  },

  all() {
    this._seed();
    try { return JSON.parse(localStorage.getItem(this.KEY) || "[]"); }
    catch (e) { return []; }
  },

  _save(list) { localStorage.setItem(this.KEY, JSON.stringify(list)); },

  add(p) {
    const list = this.all();
    p.id = p.id || ("p-" + Date.now());
    list.unshift(p);
    this._save(list);
    return p;
  },

  remove(id) {
    const list = this.all().filter(p => p.id !== id);
    this._save(list);
    return list;
  },

  count() { return this.all().length; },

  latest(n) { return this.all().slice(0, n || 10); },

  search(q) {
    q = String(q || "").trim().toLowerCase();
    if (!q) return this.all();
    return this.all().filter(p =>
      Object.values(p).some(v => String(v).toLowerCase().includes(q))
    );
  },

  /* إعادة الضبط إلى الملف الثابت (للوحة التحكم) */
  resetToSeed() {
    const base = (typeof patients !== "undefined") ? patients : (window.patients || []);
    this._save(base);
    localStorage.setItem(this.SEEDED, "1");
  },

  /* توليد محتوى ملف data/patients.js من الحالة الحالية */
  buildFileContent() {
    const list = this.all();
    const body = list.map(p =>
      "  " + JSON.stringify(p)
    ).join(",\n");
    return (
      "/* data/patients.js – تم توليده تلقائياً من GS Helper بتاريخ " +
      new Date().toLocaleString("ar-EG") + " */\n\n" +
      "const patients = [\n" + body + "\n];\n\n" +
      'if (typeof window !== "undefined") window.patients = patients;\n'
    );
  },

  /* تنزيل ملف نصي */
  download(filename, content, mime) {
    const blob = new Blob([content], { type: mime || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  },

  exportJsFile() {
    this.download("patients.js", this.buildFileContent());
  },

  /* تصدير Excel (صيغة .xls عبر جدول HTML – تعمل بالكامل دون إنترنت) */
  exportExcel() {
    const list = this.all();
    const headers = ["#", "اسم المريض", "رقم الملف", "الهاتف", "العمر", "الشكاية", "التشخيص", "الأخصائي", "التاريخ"];
    const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let rows = list.map((p, i) =>
      "<tr>" +
      [i + 1, p.name, p.fileNo, p.phone, p.age, p.complaint, p.diagnosis, p.specialist, p.date]
        .map(c => `<td>${esc(c)}</td>`).join("") +
      "</tr>"
    ).join("");
    const html =
      '<html dir="rtl"><head><meta charset="UTF-8"></head><body>' +
      '<table border="1"><thead><tr>' +
      headers.map(h => `<th style="background:#0b1f3a;color:#fff">${h}</th>`).join("") +
      "</tr></thead><tbody>" + rows + "</tbody></table></body></html>";
    this.download("archive_patients.xls", "\ufeff" + html, "application/vnd.ms-excel;charset=utf-8");
  }
};

if (typeof window !== "undefined") window.PatientStore = PatientStore;
