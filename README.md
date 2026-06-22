# GS Helper – نظام مساعدة الجراح

موقع ثابت (HTML + CSS + JavaScript فقط) يعمل على GitHub Pages، بتصميم مطابق لهوية
موقع جراحة AUH (خلفية متدرجة – Glassmorphism – Header شفاف – Bottom Navigation – خط Cairo العربي).

## الصفحات
- `index.html` — شاشة دخول الموقع (كلمة السر: `gs`) + تسجيل دخول المقيمين + الصفحة الرئيسية
- `residents.html` — كروت المقيمين (اتصال + واتساب + بحث)
- `archive.html` — أرشيف المرضى (إضافة / بحث / حذف / تصدير / Excel)
- `translator.html` — المترجم الطبي الهجين (قاعدة محلية + بحث خارجي)
- `about.html` — صفحة حول (ثابتة، أسماء المقيمين حسب PGY)
- `admin.html` — لوحة التحكم (للمشرف فقط)

## تسجيل الدخول
شاشة الموقع تطلب كلمة المرور `gs`.
بعدها تسجيل دخول المقيمين عبر `users.json`:
- `pgy1 / 1234` (مقيم)
- `pgy2 / 1234` (مقيم)
- `admin / ghyath` (مشرف — يدخل لوحة التحكم)

## ملاحظة مهمة حول "الحفظ الدائم"
المواقع الثابتة على GitHub Pages **لا تستطيع الكتابة في ملفاتها على الخادم** (قيود أمان المتصفح).
لذلك يعمل النظام بالشكل الصحيح الوحيد الممكن لموقع ثابت:

1. تُحمَّل البيانات الأولية من `data/patients.js`.
2. كل إضافة/حذف يُحفظ **بشكل دائم في LocalStorage** (يبقى بعد إغلاق المتصفح وإعادة فتحه على نفس الجهاز).
3. زر **«تصدير patients.js»** يولّد ملفاً محدّثاً يمكنك وضعه في المستودع لتظهر التعديلات لكل المستخدمين.
4. زر **«تحميل الأرشيف»** (كلمة السر `ghyath021`) يولّد ملف Excel محلياً بدون أي اتصال خارجي.

## كلمات السر
- دخول الموقع: `gs`
- تحميل الأرشيف (Excel): `ghyath021`
- مشرف: `admin / ghyath`

> يمكن للمشرف تغيير كلمتي سر الدخول والأرشيف من لوحة التحكم (تُخزَّن في LocalStorage).

## النشر على GitHub Pages
1. ارفع محتويات مجلد `gs-helper/` إلى المستودع.
2. فعّل GitHub Pages من إعدادات المستودع (Branch: main / root).
3. افتح الرابط الناتج.

## هيكل المشروع
\`\`\`
gs-helper/
├── index.html
├── residents.html
├── archive.html
├── translator.html
├── about.html
├── admin.html
├── users.json
├── README.md
├── assets/
│   ├── css/style.css
│   ├── js/{auth,users,main,store,residents,archive,translator,admin,about}.js
│   └── img/{avatar_male,avatar_female}.png
└── data/{residents.js,patients.js,terms.json}
\`\`\`
