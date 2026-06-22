/* ===========================================================
   users.js – حسابات تسجيل دخول المقيمين والمشرف
   (يُستخدم بدلاً من users.json ليعمل محلياً وعلى GitHub Pages
    دون مشاكل CORS/fetch. نفس البنية المطلوبة تماماً.)
   =========================================================== */

const USERS = [
  { username: "pgy1",  password: "1234",  role: "resident", name: "مقيم PGY-1" },
  { username: "pgy2",  password: "1234",  role: "resident", name: "مقيم PGY-2" },
  { username: "admin", password: "ghyath", role: "admin",   name: "المشرف" }
];

if (typeof window !== "undefined") window.USERS = USERS;
