/* ===========================================================
   main.js – عناصر مشتركة: الهيدر، شريط التنقل السفلي،
   الإشعارات (toast)، نوافذ التأكيد، الأيقونات، وحارس الصفحات
   =========================================================== */

const ICONS = {
  home:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
  users:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="3"/><path d="M22 19v-1a4 4 0 0 0-3-3.85"/><path d="M16 4.15A4 4 0 0 1 16 11"/></svg>',
  archive:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12h4"/></svg>',
  translate:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',
  info:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
  phone:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.13c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  trash:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6M14 11v6"/></svg>',
  copy:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
  save:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
  check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  alert:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  stethoscope:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v6a4 4 0 0 0 8 0V2"/><path d="M8 12v3a6 6 0 0 0 12 0v-2"/><circle cx="20" cy="11" r="2"/></svg>',
  key:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.5 12.5 8-8M16 6l3 3"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>',
  plus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>'
};

const NAV_ITEMS = [
  { id: "home",       href: "index.html",      label: "الرئيسية", icon: "home" },
  { id: "residents",  href: "residents.html",  label: "المقيمون", icon: "users" },
  { id: "archive",    href: "archive.html",    label: "الأرشيف",  icon: "archive" },
  { id: "translator", href: "translator.html", label: "المترجم",  icon: "translate" },
  { id: "about",      href: "about.html",       label: "حول",      icon: "info" }
];

const GSUI = {
  /* حارس + بناء الواجهة المشتركة */
  initPage(opts) {
    opts = opts || {};
    // الصفحات (عدا index) تتطلب فتح البوابة وتسجيل الدخول
    if (opts.id !== "home") {
      if (!GS.isGateOpen() || !GS.isLoggedIn()) { window.location.replace("index.html"); return false; }
    }
    if (opts.admin && !GS.isAdmin()) { window.location.replace("index.html"); return false; }

    this.buildHeader(opts);
    if (opts.nav !== false) this.buildNav(opts.id);
    this.ensureToastWrap();
    this.ensureModal();
    return true;
  },

  buildHeader(opts) {
    const host = document.getElementById("app-header");
    if (!host) return;
    const session = GS.getSession();
    const showLogout = !!session;
    host.className = "app-header";
    host.innerHTML = `
      <div class="header-inner">
        <div style="width:96px; display:flex; justify-content:flex-start;">
          ${showLogout ? `<button class="logout-link" id="logoutBtn">${ICONS.logout}<span>خروج</span></button>` : `<span style="width:44px"></span>`}
        </div>
        <div class="title-block">
          <h1>${opts.title || "نظام مساعدة الجراح"}</h1>
          <div class="subtitle">GS HELPER</div>
        </div>
        <div style="width:96px; display:flex; justify-content:flex-end;">
          ${session && session.role === "admin" ? `<button class="header-btn" id="adminBtn" title="لوحة التحكم" aria-label="لوحة التحكم">${ICONS.shield}</button>` : `<span style="width:44px"></span>`}
        </div>
      </div>`;
    const lb = document.getElementById("logoutBtn");
    if (lb) lb.addEventListener("click", () => GS.logout());
    const ab = document.getElementById("adminBtn");
    if (ab) ab.addEventListener("click", () => window.location.href = "admin.html");
  },

  buildNav(activeId) {
    const host = document.getElementById("bottom-nav");
    if (!host) return;
    host.className = "bottom-nav";
    host.innerHTML = `<nav class="nav-inner" aria-label="التنقل الرئيسي">
      ${NAV_ITEMS.map(i => `
        <a href="${i.href}" class="${i.id === activeId ? "active" : ""}" ${i.id === activeId ? 'aria-current="page"' : ""}>
          ${ICONS[i.icon]}<span>${i.label}</span>
        </a>`).join("")}
    </nav>`;
  },

  /* ---------- Toast ---------- */
  ensureToastWrap() {
    if (!document.getElementById("toast-wrap")) {
      const d = document.createElement("div");
      d.id = "toast-wrap"; d.className = "toast-wrap";
      document.body.appendChild(d);
    }
  },
  toast(msg, type) {
    this.ensureToastWrap();
    const wrap = document.getElementById("toast-wrap");
    const t = document.createElement("div");
    t.className = "toast" + (type ? " " + type : "");
    const icon = type === "error" ? ICONS.alert : ICONS.check;
    t.innerHTML = `${icon}<span>${msg}</span>`;
    wrap.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(() => t.remove(), 300); }, 2800);
  },

  /* ---------- Confirm modal ---------- */
  ensureModal() {
    if (document.getElementById("gs-modal")) return;
    const o = document.createElement("div");
    o.id = "gs-modal"; o.className = "modal-overlay";
    o.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <div class="m-icon">${ICONS.alert}</div>
        <h3 id="gs-modal-title">تأكيد</h3>
        <p id="gs-modal-text"></p>
        <div class="m-actions">
          <button class="btn btn-ghost" id="gs-modal-cancel">إلغاء</button>
          <button class="btn btn-danger" id="gs-modal-ok">تأكيد</button>
        </div>
      </div>`;
    document.body.appendChild(o);
  },
  confirm(text, onOk, opts) {
    opts = opts || {};
    this.ensureModal();
    const o = document.getElementById("gs-modal");
    document.getElementById("gs-modal-title").textContent = opts.title || "تأكيد العملية";
    document.getElementById("gs-modal-text").textContent = text;
    const ok = document.getElementById("gs-modal-ok");
    const cancel = document.getElementById("gs-modal-cancel");
    ok.textContent = opts.okText || "تأكيد";
    o.classList.add("show");
    const close = () => { o.classList.remove("show"); ok.onclick = null; cancel.onclick = null; };
    ok.onclick = () => { close(); onOk && onOk(); };
    cancel.onclick = close;
    o.onclick = (e) => { if (e.target === o) close(); };
  },

  esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }
};

if (typeof window !== "undefined") { window.GSUI = GSUI; window.ICONS = ICONS; }
