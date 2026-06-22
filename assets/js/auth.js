/* ===========================================================
   auth.js – بوابة الدخول + تسجيل دخول المقيمين + الجلسة
   =========================================================== */

const GS = {
  // مفاتيح التخزين
  K_GATE: "gs_gate_ok",
  K_SESSION: "gs_session",
  K_GATE_PASS: "gs_gate_pass",     // كلمة سر الدخول للموقع (قابلة للتغيير من اللوحة)
  K_ARCHIVE_PASS: "gs_archive_pass", // كلمة سر تحميل الأرشيف

  DEFAULT_GATE_PASS: "gs",
  DEFAULT_ARCHIVE_PASS: "ghyath021",

  gatePass() { return localStorage.getItem(this.K_GATE_PASS) || this.DEFAULT_GATE_PASS; },
  archivePass() { return localStorage.getItem(this.K_ARCHIVE_PASS) || this.DEFAULT_ARCHIVE_PASS; },
  setGatePass(p) { localStorage.setItem(this.K_GATE_PASS, p); },
  setArchivePass(p) { localStorage.setItem(this.K_ARCHIVE_PASS, p); },

  // بوابة الموقع (كلمة السر العامة gs)
  isGateOpen() { return localStorage.getItem(this.K_GATE) === "1"; },
  openGate(pass) {
    if (pass === this.gatePass()) { localStorage.setItem(this.K_GATE, "1"); return true; }
    return false;
  },

  // جلسة المستخدم (المقيم/المشرف)
  getSession() {
    try { return JSON.parse(localStorage.getItem(this.K_SESSION) || "null"); }
    catch (e) { return null; }
  },
  login(username, password) {
    const list = (typeof USERS !== "undefined") ? USERS : (window.USERS || []);
    const u = list.find(x => x.username === String(username).trim() && x.password === String(password));
    if (!u) return null;
    const session = { username: u.username, role: u.role, name: u.name || u.username, at: Date.now() };
    localStorage.setItem(this.K_SESSION, JSON.stringify(session));
    return session;
  },
  isLoggedIn() { return !!this.getSession(); },
  isAdmin() { const s = this.getSession(); return !!s && s.role === "admin"; },
  logout() {
    localStorage.removeItem(this.K_SESSION);
    // تبقى البوابة مفتوحة؛ نعيد للصفحة الرئيسية
    window.location.href = "index.html";
  },

  // حارس الصفحات: يستدعى أعلى كل صفحة محمية
  requirePage(opts) {
    opts = opts || {};
    if (!this.isGateOpen()) { /* ستظهر شاشة البوابة في index */ }
    if (opts.admin && !this.isAdmin()) {
      window.location.replace("index.html");
    }
  }
};

if (typeof window !== "undefined") window.GS = GS;
