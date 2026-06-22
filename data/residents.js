/* ===========================================================
   data/residents.js – بيانات المقيمين (ثابتة داخل الكود)
   لتعديل القائمة: عدّل هذه المصفوفة فقط ثم احفظ الملف.
   الحقول: arabicname / EnglishName / PGY / Phone / Gender (M|F)
   =========================================================== */

const residents = [
  { arabicname: "غياث دحدوح", EnglishName: "Dr. Ghyath Dahdouh", PGY: "PGY - 1", Phone: "00963956653029", Gender: "M" },
  { arabicname: "جمعة عبدالله", EnglishName: "Dr. Jomaa Abdullah", PGY: "PGY - 1", Phone: "00963947144725", Gender: "M" },
  { arabicname: "فاطمة كادك", EnglishName: "Dr. Fatima Kadak", PGY: "PGY - 1", Phone: "00963956603174", Gender: "F" },
  { arabicname: "يحيى أبوبكر", EnglishName: "Dr. Yahya Abubakr", PGY: "PGY - 1", Phone: "00963945767534", Gender: "M" },
  { arabicname: "عماد السيد عمر", EnglishName: "Dr. Imad Al-Sayed Omar", PGY: "PGY - 1", Phone: "00963936006179", Gender: "M" },
  { arabicname: "شهلا الملا", EnglishName: "Dr. Shahla Al-Mulla", PGY: "PGY - 1", Phone: "00963998208238", Gender: "F" },
  { arabicname: "عمر شيخ أمين", EnglishName: "Dr. Omar Sheikh Amin", PGY: "PGY - 1", Phone: "00963968716128", Gender: "M" },
  { arabicname: "محمد رؤوف بصمه جي", EnglishName: "Dr. Mohammad Raouf Basmaji", PGY: "PGY - 1", Phone: "00963959962383", Gender: "M" },
  { arabicname: "عبدالله غالب قوجة", EnglishName: "Dr. Abdullah Ghaleb Qoja", PGY: "PGY - 1", Phone: "00963945935921", Gender: "M" },
  { arabicname: "ريان الافندي", EnglishName: "Dr. Rayan Al-Afandi", PGY: "PGY - 1", Phone: "00963984298874", Gender: "F" },
  { arabicname: "محمد ياسر طنب", EnglishName: "Dr. Mohammad Yasser Tanb", PGY: "PGY - 1", Phone: "00963995710076", Gender: "M" },
  { arabicname: "محمد شاكر دباغ", EnglishName: "Dr. Mohammad Shaker Dabbagh", PGY: "PGY - 1", Phone: "0096398495187", Gender: "M" },
  { arabicname: "محمد حكمت كلارجي", EnglishName: "Dr. Mohammad Hikmat Klarji", PGY: "PGY - 1", Phone: "00963996361819", Gender: "M" },
  { arabicname: "محمد مكين كورج", EnglishName: "Dr. Mohammad Makin Korj", PGY: "PGY - 1", Phone: "00963956942019", Gender: "M" },
  { arabicname: "بشير المحمد الجاسم", EnglishName: "Dr. Bashir Al-Mohammad Al-Jassem", PGY: "PGY - 1", Phone: "00963992741235", Gender: "M" },
  { arabicname: "حسين شعبان الخلف", EnglishName: "Dr. Hussein Shaban Al-Khalaf", PGY: "PGY - 1", Phone: "00963934592296", Gender: "M" },
  { arabicname: "أحمد صلاح حفار", EnglishName: "Dr. Ahmad Salah Haffar", PGY: "PGY - 1", Phone: "00963956126654", Gender: "M" },
  { arabicname: "محمد الشيخ ابراهيم", EnglishName: "Dr. Mohammad Al-Sheikh Ibrahim", PGY: "PGY - 1", Phone: "00963969041521", Gender: "M" },
  { arabicname: "عبد الرحمن قصاب", EnglishName: "Dr. Abdulrahman Kassab", PGY: "PGY - 1", Phone: "00963967193401", Gender: "M" },
  { arabicname: "زين عاصي", EnglishName: "Dr. Zain Assi", PGY: "PGY - 1", Phone: "00963934111682", Gender: "M" },
  { arabicname: "عمار غسان نعسان", EnglishName: "Dr. Ammar Ghassan Naasan", PGY: "PGY - 1", Phone: "0096395786442", Gender: "M" },
  { arabicname: "هيزا خليل", EnglishName: "Dr. Heza Khalil", PGY: "PGY - 1", Phone: "00963993549142", Gender: "F" },
  { arabicname: "أحمد قسوم", EnglishName: "Dr. Ahmad Qassoum", PGY: "PGY - 1", Phone: "00963962184321", Gender: "M" },
  { arabicname: "مصطفى الشب", EnglishName: "Dr. Mustafa Al-Shabb", PGY: "PGY - 1", Phone: "00963946638151", Gender: "M" },
  { arabicname: "بشار قاضي", EnglishName: "Dr. Bashar Qadi", PGY: "PGY - 1", Phone: "00963935920657", Gender: "M" },
  { arabicname: "توفيق بنا", EnglishName: "Dr. Tawfiq Banna", PGY: "PGY - 1", Phone: "00963968584357", Gender: "M" },
  { arabicname: "الأمير حسن الراشد", EnglishName: "Dr. Al-Ameer Hassan Al-Rashid", PGY: "PGY - 1", Phone: "00963945818039", Gender: "M" },
  { arabicname: "عمر أقرع", EnglishName: "Dr. Omar Aqra", PGY: "PGY - 1", Phone: "00963998301361", Gender: "M" },
  { arabicname: "أسامة عبد الباقي", EnglishName: "Dr. Osama Abdulbaqi", PGY: "PGY - 1", Phone: "00963937845869", Gender: "M" },
  { arabicname: "محمد دهان", EnglishName: "Dr. Mohammad Dahan", PGY: "PGY - 1", Phone: "00963992812098", Gender: "M" },
  { arabicname: "ليسا مهمندار", EnglishName: "Dr. Lisa Mehmendar", PGY: "PGY - 1", Phone: "00963948855045", Gender: "F" },
  { arabicname: "احمد مياس وفائي", EnglishName: "Dr. Ahmad Mayas Wafai", PGY: "PGY - 1", Phone: "00963956780791", Gender: "M" },
  { arabicname: "احمد قطو", EnglishName: "Dr. Ahmad Qatto", PGY: "PGY - 1", Phone: "00963994470822", Gender: "M" },
  { arabicname: "راما حمشو", EnglishName: "Dr. Rama Hamsho", PGY: "PGY - 1", Phone: "00963949220258", Gender: "F" }
];

if (typeof window !== "undefined") window.residents = residents;
