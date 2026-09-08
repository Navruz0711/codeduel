const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '..', 'data', 'courses.json');
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));

// Helper to find course by id
function getCourse(id) {
  return courses.find(c => c.id === id);
}

// 1. Python Basics (py-24 to py-30)
const pyCourse = getCourse('python-basics');
const pyNewLessons = [
  {
    id: "py-24",
    order: 24,
    title: "while Sikli va break / continue",
    xpReward: 35,
    theory: "### `while` sikli qanday ishlaydi? 🔄\n\n`while` sikli berilgan shart `True` bo'lib turgunga qadar takrorlanadi.\n- `break` — siklni darhol to'xtatadi.\n- `continue` — siklning joriy qadamini o'tkazib yuborib, keyingisiga o'tadi.\n\n```python\ni = 1\nwhile i <= 5:\n    print(i)\n    i += 1\n```",
    task: "`i = 1` dan boshlab `while` sikli yordamida 1, 2, 3 sonlarini alohida qatorlarda chiqaring.",
    hints: [
      "i = 1 o'zgaruvchisini yarating.",
      "while i <= 3: siklini yozing va har qadamda print(i) hamda i += 1 bajaring."
    ],
    initialCode: "# while sikli bilan 1 dan 3 gacha sonlarni chiqaring:\ni = 1\n",
    expectedOutput: "1\n2\n3",
    tests: [
      {
        type: "output",
        expected: "1\n2\n3",
        label: "Konsolga 1, 2, 3 ketma-ket chiqishi kerak"
      }
    ],
    solution: "i = 1\nwhile i <= 3:\n    print(i)\n    i += 1\n"
  },
  {
    id: "py-25",
    order: 25,
    title: "math Moduli: sqrt va ceil",
    xpReward: 35,
    theory: "### Standart kutubxona: math 📐\n\nPythonda murakkab matematik hisoblar uchun `math` moduli ishlatiladi:\n- `math.sqrt(x)` — sonning kvadrat ildizi.\n- `math.ceil(x)` — sonni yuqoriga yaxlitlash.\n- `math.floor(x)` — sonni pastga yaxlitlash.\n\n```python\nimport math\nprint(math.sqrt(25)) # 5.0\n```",
    task: "`math` modulini import qiling, `64` ning ildizini (`math.sqrt(64)`) toping, uni `int()` ga o'tkazib konsolga chiqaring.",
    hints: [
      "import math qiling.",
      "print(int(math.sqrt(64))) deb yozing."
    ],
    initialCode: "# math modulini import qiling va 64 ning ildizini butun son sifatida chiqaring:\nimport math\n",
    expectedOutput: "8",
    tests: [
      {
        type: "output",
        expected: "8",
        label: "Natija 8 chiqishi kerak"
      }
    ],
    solution: "import math\nprint(int(math.sqrt(64)))\n"
  },
  {
    id: "py-26",
    order: 26,
    title: "Matn Slicing va Teskari Matn",
    xpReward: 35,
    theory: "### Qirqish (Slicing) ✂️\n\nSatr yoki ro'yxatdan qism ajratib olish sintaksisi:\n`satr[boshlash:tugash:qadam]`\n\nAgar qadam `-1` qilinsa, matn teskari tartibda qaytariladi!\n```python\nsoz = \"salom\"\nprint(soz[::-1]) # \"molas\"\n```",
    task: "`matn = \"kodchi\"` berilgan. Uni teskari qilib konsolga chiqaring.",
    hints: [
      "matn[::-1] ifodasidan foydalaning.",
      "print(matn[::-1])"
    ],
    initialCode: "matn = \"kodchi\"\n# matnni teskari qilib chiqaring:\n",
    expectedOutput: "ihckok",
    tests: [
      {
        type: "output",
        expected: "ihckok",
        label: "Konsolga 'ihckok' chiqishi kerak"
      }
    ],
    solution: "matn = \"kodchi\"\nprint(matn[::-1])\n"
  },
  {
    id: "py-27",
    order: 27,
    title: "enumerate() Bilan Indeks va Qiymat",
    xpReward: 40,
    theory: "### Qulay tsikl: enumerate() 🔢\n\nRo'yxat bo'ylab aylanganda har bir elementning indeksini ham bir vaqtda olish uchun `enumerate()` ishlatiladi:\n\n```python\nranglar = [\"qizil\", \"yashil\"]\nfor index, rang in enumerate(ranglar):\n    print(f\"{index}: {rang}\")\n```",
    task: "`mevalar = [\"olma\", \"anor\"]` berilgan. `enumerate()` orqali `0: olma` va `1: anor` qatorlarini chiqaring.",
    hints: [
      "for idx, m in enumerate(mevalar):",
      "print(f\"{idx}: {m}\")"
    ],
    initialCode: "mevalar = [\"olma\", \"anor\"]\n# enumerate() yordamida har bir mevani indeksi bilan chiqaring:\n",
    expectedOutput: "0: olma\n1: anor",
    tests: [
      {
        type: "output",
        expected: "0: olma\n1: anor",
        label: "Indekslar va mevalar to'g'ri chiqishi kerak"
      }
    ],
    solution: "mevalar = [\"olma\", \"anor\"]\nfor idx, m in enumerate(mevalar):\n    print(f\"{idx}: {m}\")\n"
  },
  {
    id: "py-28",
    order: 28,
    title: "min(), max() va sum() Funksiyalari",
    xpReward: 35,
    theory: "### Statistik funksiyalar 📊\n\nPythonda ro'yxatdagi eng kichik, eng katta qiymatni yoki umumiy yig'indini bitta funksiya bilan topish mumkin:\n- `min(royxat)`\n- `max(royxat)`\n- `sum(royxat)`\n\n```python\nsonlar = [10, 2, 8]\nprint(sum(sonlar)) # 20\n```",
    task: "`sonlar = [4, 9, 2]` ro'yxatining elementlari yig'indisini `sum()` yordamida ekranga chiqaring.",
    hints: [
      "sum(sonlar) dan foydalaning.",
      "print(sum(sonlar))"
    ],
    initialCode: "sonlar = [4, 9, 2]\n# Yig'indini ekranga chiqaring:\n",
    expectedOutput: "15",
    tests: [
      {
        type: "output",
        expected: "15",
        label: "Natija 15 chiqishi kerak"
      }
    ],
    solution: "sonlar = [4, 9, 2]\nprint(sum(sonlar))\n"
  },
  {
    id: "py-29",
    order: 29,
    title: "any() va all() Mantiqiy Funksiyalari",
    xpReward: 35,
    theory: "### Hammasi yoki kamida bittasi? 🚦\n\n- `all(royxat)` — agar hamma elementlar `True` (haqiqat) bo'lsa, `True` qaytaradi.\n- `any(royxat)` — agar kamida bitta element `True` bo'lsa, `True` qaytaradi.\n\n```python\nprint(all([True, True, False])) # False\nprint(any([True, False, False])) # True\n```",
    task: "`all([True, True, True])` ifodasining natijasini konsolga chiqaring.",
    hints: [
      "print(all([True, True, True]))"
    ],
    initialCode: "# all([True, True, True]) natijasini konsolga chiqaring:\n",
    expectedOutput: "True",
    tests: [
      {
        type: "output",
        expected: "True",
        label: "Konsolga True chiqishi kerak"
      }
    ],
    solution: "print(all([True, True, True]))\n"
  },
  {
    id: "py-30",
    order: 30,
    title: "Pythonda Xushxabar va Yakuniy Bosqich",
    xpReward: 50,
    theory: "### Tabriklaymiz! 🎓\n\nSiz Python asoslarini to'liq o'rganib chiqdingiz! O'zgaruvchilar, sikllar, funksiyalar, modullar va murakkab ma'lumot turlari endi sizga tanish.\n\n```python\nprint(\"Python Mutaxassisi\")\n```",
    task: "Konsolga aynan `Python Mutaxassisi 2026` matnini chiqaring.",
    hints: [
      "print(\"Python Mutaxassisi 2026\")"
    ],
    initialCode: "# Matnni ekranga chiqaring:\n",
    expectedOutput: "Python Mutaxassisi 2026",
    tests: [
      {
        type: "output",
        expected: "Python Mutaxassisi 2026",
        label: "Python Mutaxassisi 2026 chiqishi kerak"
      }
    ],
    solution: "print(\"Python Mutaxassisi 2026\")\n"
  }
];

// 2. JavaScript Mastery (js-23 to js-30)
const jsCourse = getCourse('javascript-mastery');
const jsNewLessons = [
  {
    id: "js-23",
    order: 23,
    title: "Array.find() va findIndex()",
    xpReward: 35,
    theory: "### Birinchi mos elementni topish 🔍\n\n`.find()` metodi shartga mos keluvchi **birinchi** elementning o'zini qaytaradi (topolmasa `undefined`).\n`.findIndex()` esa uning indeksini qaytaradi.\n\n```javascript\nconst sonlar = [5, 12, 8, 130];\nconst topilgan = sonlar.find(n => n > 10);\nconsole.log(topilgan); // 12\n```",
    task: "`[5, 12, 8, 130]` massividan 10 dan katta birinchi elementni `.find()` yordamida topib konsolga chiqaring.",
    hints: [
      "const arr = [5, 12, 8, 130];",
      "console.log(arr.find(n => n > 10));"
    ],
    initialCode: "const sonlar = [5, 12, 8, 130];\n// 10 dan katta birinchi sonni topib chiqaring:\n",
    expectedOutput: "12",
    tests: [
      {
        type: "output",
        expected: "12",
        label: "Konsolga 12 chiqishi kerak"
      }
    ],
    solution: "const sonlar = [5, 12, 8, 130];\nconsole.log(sonlar.find(n => n > 10));\n"
  },
  {
    id: "js-24",
    order: 24,
    title: "some() va every() Massiv Metodlari",
    xpReward: 35,
    theory: "### Mantiqiy tekshiruvlar: .some() va .every() 🚦\n\n- `.every(fn)` — massivdagi barcha elementlar shartni qanoatlantirsa `true` qaytaradi.\n- `.some(fn)` — kamida bitta element shartga mos kelsa `true` qaytaradi.\n\n```javascript\nconst sonlar = [2, 4, 6];\nconsole.log(sonlar.every(n => n % 2 === 0)); // true\n```",
    task: "`[2, 4, 6, 8]` massividagi hamma sonlar juftligini `.every(n => n % 2 === 0)` orqali tekshirib konsolga chiqaring.",
    hints: [
      "const arr = [2, 4, 6, 8];",
      "console.log(arr.every(n => n % 2 === 0));"
    ],
    initialCode: "const sonlar = [2, 4, 6, 8];\n// Barcha sonlar juftligini tekshiring:\n",
    expectedOutput: "true",
    tests: [
      {
        type: "output",
        expected: "true",
        label: "Konsolga true chiqishi kerak"
      }
    ],
    solution: "const sonlar = [2, 4, 6, 8];\nconsole.log(sonlar.every(n => n % 2 === 0));\n"
  },
  {
    id: "js-25",
    order: 25,
    title: "String repeat() va padStart()",
    xpReward: 35,
    theory: "### Satrlar bilan qo'shimcha amallar 🔡\n\n- `.repeat(n)` — satrni n marta takrorlaydi.\n- `.padStart(uzunlik, belgi)` — satr boshini to'ldiradi.\n\n```javascript\nconsole.log(\"*\".repeat(3)); // \"***\"\nconsole.log(\"5\".padStart(3, \"0\")); // \"005\"\n```",
    task: "`\"Coddy\"` so'zini `.repeat(3)` yordamida 3 marta takrorlab konsolga chiqaring.",
    hints: [
      "console.log(\"Coddy\".repeat(3));"
    ],
    initialCode: "// \"Coddy\" so'zini 3 marta takrorlab chiqaring:\n",
    expectedOutput: "CoddyCoddyCoddy",
    tests: [
      {
        type: "output",
        expected: "CoddyCoddyCoddy",
        label: "Konsolga CoddyCoddyCoddy chiqishi kerak"
      }
    ],
    solution: "console.log(\"Coddy\".repeat(3));\n"
  },
  {
    id: "js-26",
    order: 26,
    title: "Nullish Coalescing (??) va Optional Chaining (?.)",
    xpReward: 40,
    theory: "### Zamonaviy ES sintaksisi 🛡️\n\n- `?.` (Optional chaining) — agar obyekt mavjud bo'lmasa xatolik bermay `undefined` qaytaradi.\n- `??` (Nullish coalescing) — faqat `null` yoki `undefined` bo'lganda o'ng tarafdagi standart qiymatni oladi.\n\n```javascript\nconst user = {};\nconst ism = user?.ism ?? \"Mehmon\";\nconsole.log(ism); // \"Mehmon\"\n```",
    task: "`const user = {};` obyektidan `user?.ism ?? \"Mehmon\"` qiymatini konsolga chiqaring.",
    hints: [
      "const user = {};",
      "console.log(user?.ism ?? \"Mehmon\");"
    ],
    initialCode: "const user = {};\n// user?.ism ?? \"Mehmon\" qiymatini chiqaring:\n",
    expectedOutput: "Mehmon",
    tests: [
      {
        type: "output",
        expected: "Mehmon",
        label: "Konsolga Mehmon chiqishi kerak"
      }
    ],
    solution: "const user = {};\nconsole.log(user?.ism ?? \"Mehmon\");\n"
  },
  {
    id: "js-27",
    order: 27,
    title: "Math Obyekti: floor, ceil va round",
    xpReward: 35,
    theory: "### Raqamlarni yaxlitlash 🔢\n\n- `Math.floor(x)` — doimo pastga (kichik butun songa).\n- `Math.ceil(x)` — doimo yuqoriga.\n- `Math.round(x)` — eng yaqin butun songa yaxlitlaydi.\n\n```javascript\nconsole.log(Math.floor(4.9)); // 4\nconsole.log(Math.ceil(4.1)); // 5\n```",
    task: "`Math.floor(9.8)` natijasini konsolga chiqaring.",
    hints: [
      "console.log(Math.floor(9.8));"
    ],
    initialCode: "// Math.floor(9.8) natijasini chiqaring:\n",
    expectedOutput: "9",
    tests: [
      {
        type: "output",
        expected: "9",
        label: "Natija 9 chiqishi kerak"
      }
    ],
    solution: "console.log(Math.floor(9.8));\n"
  },
  {
    id: "js-28",
    order: 28,
    title: "Object.entries() Kalit va Qiymatlar",
    xpReward: 35,
    theory: "### Obyektni massivga aylantirish 🗝️\n\n`Object.entries(obj)` obyektning barcha `[kalit, qiymat]` juftliklarini 2 o'lchamli massiv ko'rinishida beradi:\n\n```javascript\nconst data = { role: \"admin\" };\nconsole.log(Object.entries(data)); // [[\"role\", \"admin\"]]\n```",
    task: "`const data = { role: \"admin\" };` berilgan. `Object.entries(data)[0][1]` qiymatini (ya'ni `\"admin\"`) konsolga chiqaring.",
    hints: [
      "const data = { role: \"admin\" };",
      "console.log(Object.entries(data)[0][1]);"
    ],
    initialCode: "const data = { role: \"admin\" };\n// admin qiymatini chiqaring:\n",
    expectedOutput: "admin",
    tests: [
      {
        type: "output",
        expected: "admin",
        label: "Konsolga admin chiqishi kerak"
      }
    ],
    solution: "const data = { role: \"admin\" };\nconsole.log(Object.entries(data)[0][1]);\n"
  },
  {
    id: "js-29",
    order: 29,
    title: "Array.flat() bilan Massivni Yassilash",
    xpReward: 40,
    theory: "### Ichma-ich massivlar 📦\n\n`.flat()` metodi ichma-ich joylashgan massivlarni bitta silliq massivga birlashtiradi:\n\n```javascript\nconst arr = [[1, 2], [3, 4]];\nconst flatArr = arr.flat(); // [1, 2, 3, 4]\n```",
    task: "`const arr = [[1, 2], [3, 4]];` massivini `.flat()` qilib, hosil bo'lgan massiv uzunligini (`.length`) konsolga chiqaring.",
    hints: [
      "const arr = [[1, 2], [3, 4]];",
      "console.log(arr.flat().length);"
    ],
    initialCode: "const arr = [[1, 2], [3, 4]];\n// .flat().length ni chiqaring:\n",
    expectedOutput: "4",
    tests: [
      {
        type: "output",
        expected: "4",
        label: "Konsolga 4 chiqishi kerak"
      }
    ],
    solution: "const arr = [[1, 2], [3, 4]];\nconsole.log(arr.flat().length);\n"
  },
  {
    id: "js-30",
    order: 30,
    title: "JavaScript Mastery Yakuniy Qadam",
    xpReward: 50,
    theory: "### Tabriklaymiz, JavaScript Ustasi! 🚀\n\nSiz JavaScript tilining eng chuqur va zamonaviy xususiyatlarini o'rganib chiqdingiz. Endi xohlagan murakkablikdagi loyihalarni bemalol yarata olasiz!",
    task: "Konsolga `JavaScript Daho 2026` matnini chiqaring.",
    hints: [
      "console.log(\"JavaScript Daho 2026\");"
    ],
    initialCode: "// Konsolga \"JavaScript Daho 2026\" matnini chiqaring:\n",
    expectedOutput: "JavaScript Daho 2026",
    tests: [
      {
        type: "output",
        expected: "JavaScript Daho 2026",
        label: "JavaScript Daho 2026 chiqishi kerak"
      }
    ],
    solution: "console.log(\"JavaScript Daho 2026\");\n"
  }
];

// 3. Web Dev Basics (web-17 to web-22)
const webCourse = getCourse('web-dev-basics');
const webNewLessons = [
  {
    id: "web-17",
    order: 17,
    title: "CSS Borders va Border-Radius",
    xpReward: 35,
    theory: "### Dumaloq burchaklar va hoshiyalar 🔘\n\nCSS da elementlarning burchaklarini yumaloqlash uchun `border-radius` ishlatiladi:\n- `border-radius: 8px;` — engil yumaloqlash.\n- `border-radius: 50%;` — mukammal doira hosil qilish.\n\n```css\n.avatar {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n}\n```",
    task: "`border-radius: 50%;` satrini konsolga chiqaring.",
    hints: [
      "console.log('border-radius: 50%;');"
    ],
    initialCode: "// border-radius: 50%; ni chiqaring:\n",
    expectedOutput: "border-radius: 50%;",
    tests: [
      {
        type: "output",
        expected: "border-radius: 50%;",
        label: "Konsolga border-radius: 50%; chiqishi kerak"
      }
    ],
    solution: "console.log('border-radius: 50%;');\n"
  },
  {
    id: "web-18",
    order: 18,
    title: "HTML Semantik Teglar: main, nav, footer",
    xpReward: 35,
    theory: "### Semantik HTML nima? 🏷️\n\nOddiy `<div>` o'rniga ma'noga ega teglardan foydalanish sahifaning qidiruv tizimlari (SEO) va qulaylik (a11y) darajasini oshiradi:\n- `<header>` — sahifa yoki bo'lim bosh qismi\n- `<nav>` — asosiy menyu navigatsiyasi\n- `<main>` — sahifaning asosiy kontenti\n- `<footer>` — sahifa ost qismi\n\n```html\n<main>\n  <p>Asosiy maqola</p>\n</main>\n```",
    task: "`<main>Asosiy qism</main>` tegini konsolga chiqaring.",
    hints: [
      "console.log('<main>Asosiy qism</main>');"
    ],
    initialCode: "// <main>Asosiy qism</main> tegini chiqaring:\n",
    expectedOutput: "<main>Asosiy qism</main>",
    tests: [
      {
        type: "output",
        expected: "<main>Asosiy qism</main>",
        label: "Konsolga <main>Asosiy qism</main> chiqishi kerak"
      }
    ],
    solution: "console.log('<main>Asosiy qism</main>');\n"
  },
  {
    id: "web-19",
    order: 19,
    title: "CSS Transition va Silliq Animatsiya",
    xpReward: 35,
    theory: "### Silliq o'zgarishlar: transition 🎬\n\nElement ustiga sichqoncha kelganda (hover) birdaniga emas, silliq o'zgarishi uchun `transition` xossasi qo'llaniladi:\n\n```css\n.btn {\n  transition: all 0.3s ease;\n}\n.btn:hover {\n  transform: translateY(-2px);\n}\n```",
    task: "`transition: all 0.3s ease;` satrini konsolga chiqaring.",
    hints: [
      "console.log('transition: all 0.3s ease;');"
    ],
    initialCode: "// transition: all 0.3s ease; ni chiqaring:\n",
    expectedOutput: "transition: all 0.3s ease;",
    tests: [
      {
        type: "output",
        expected: "transition: all 0.3s ease;",
        label: "Konsolga transition: all 0.3s ease; chiqishi kerak"
      }
    ],
    solution: "console.log('transition: all 0.3s ease;');\n"
  },
  {
    id: "web-20",
    order: 20,
    title: "CSS Overflow Xossasi",
    xpReward: 35,
    theory: "### Toshishni boshqarish: overflow 🌊\n\nAgar ichki kontent ota blok o'lchamidan katta bo'lib ketsa, nima sodir bo'lishini `overflow` belgilaydi:\n- `visible` — tashqariga chiqib turadi (standart).\n- `hidden` — ortiqcha qismini kesib tashlaydi.\n- `scroll` yoki `auto` — aylantirish (skroll) chizig'ini chiqaradi.\n\n```css\n.card {\n  overflow: hidden;\n}\n```",
    task: "`overflow: hidden;` satrini konsolga chiqaring.",
    hints: [
      "console.log('overflow: hidden;');"
    ],
    initialCode: "// overflow: hidden; ni chiqaring:\n",
    expectedOutput: "overflow: hidden;",
    tests: [
      {
        type: "output",
        expected: "overflow: hidden;",
        label: "Konsolga overflow: hidden; chiqishi kerak"
      }
    ],
    solution: "console.log('overflow: hidden;');\n"
  },
  {
    id: "web-21",
    order: 21,
    title: "HTML Audio va Video Teglari",
    xpReward: 40,
    theory: "### Multimedia integratsiyasi 🎵\n\nBrauzerda audio fayllarni o'ynatish uchun `<audio>` tegi ishlatiladi:\n\n```html\n<audio controls>\n  <source src=\"music.mp3\" type=\"audio/mpeg\">\n</audio>\n```",
    task: "`<audio controls></audio>` tegini konsolga chiqaring.",
    hints: [
      "console.log('<audio controls></audio>');"
    ],
    initialCode: "// <audio controls></audio> ni chiqaring:\n",
    expectedOutput: "<audio controls></audio>",
    tests: [
      {
        type: "output",
        expected: "<audio controls></audio>",
        label: "Konsolga <audio controls></audio> chiqishi kerak"
      }
    ],
    solution: "console.log('<audio controls></audio>');\n"
  },
  {
    id: "web-22",
    order: 22,
    title: "HTML details va summary (Akkordeon)",
    xpReward: 40,
    theory: "### JavaScript-siz ochiq/yopiq bloklar 📂\n\nKo'p so'raladigan savollar (FAQ) uchun maxsus HTML teglari mavjud:\n\n```html\n<details>\n  <summary>Savol nomi</summary>\n  <p>Javob matni shu yerda bo'ladi.</p>\n</details>\n```",
    task: "`<details><summary>FAQ</summary></details>` tegini konsolga chiqaring.",
    hints: [
      "console.log('<details><summary>FAQ</summary></details>');"
    ],
    initialCode: "// <details><summary>FAQ</summary></details> ni chiqaring:\n",
    expectedOutput: "<details><summary>FAQ</summary></details>",
    tests: [
      {
        type: "output",
        expected: "<details><summary>FAQ</summary></details>",
        label: "Konsolga <details><summary>FAQ</summary></details> chiqishi kerak"
      }
    ],
    solution: "console.log('<details><summary>FAQ</summary></details>');\n"
  }
];

// 4. Algorithms & DS (algo-17 to algo-22)
const algoCourse = getCourse('algorithms-ds');
const algoNewLessons = [
  {
    id: "algo-17",
    order: 17,
    title: "Selection Sort (Tanlab Saralash)",
    xpReward: 40,
    theory: "### Tanlab saralash algoritmi 📊\n\nHar bir qadamda saralanmagan qismdan eng kichik (minimal) element topiladi va saralangan qism oxiriga almashtirib qo'yiladi.\n- Vaqt murakkabligi: O(n²)\n- Xotira murakkabligi: O(1)\n\n```javascript\nfunction selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let min = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[min]) min = j;\n    }\n    [arr[i], arr[min]] = [arr[min], arr[i]];\n  }\n  return arr;\n}\n```",
    task: "`[3, 1, 2]` massivini o'sish tartibida saralab, `[1, 2, 3]` ko'rinishida konsolga chiqaring.",
    hints: [
      "console.log(JSON.stringify([1, 2, 3]));"
    ],
    initialCode: "// [1, 2, 3] massivini JSON qilib chiqaring:\n",
    expectedOutput: "[1,2,3]",
    tests: [
      {
        type: "output",
        expected: "[1,2,3]",
        label: "Konsolga [1,2,3] chiqishi kerak"
      }
    ],
    solution: "console.log(JSON.stringify([1, 2, 3]));\n"
  },
  {
    id: "algo-18",
    order: 18,
    title: "Prefix Sum (Prefiks Yig'indisi)",
    xpReward: 40,
    theory: "### Oraliq yig'indisini tez topish ⚡\n\nPrefiks yig'indisi massivida har bir `pref[i]` elementi 0 dan `i` gacha bo'lgan sonlar yig'indisini saqlaydi.\nShu orqali ixtiyoriy `[L, R]` oraliq yig'indisi O(1) da hisoblanadi!\n\n```javascript\n// [1, 2, 3, 4] -> [1, 3, 6, 10]\n```",
    task: "`[1, 2, 3, 4]` ning prefiks yig'indisi bo'lgan `[1, 3, 6, 10]` massivini konsolga chiqaring.",
    hints: [
      "console.log(JSON.stringify([1, 3, 6, 10]));"
    ],
    initialCode: "// JSON.stringify([1, 3, 6, 10]) ni chiqaring:\n",
    expectedOutput: "[1,3,6,10]",
    tests: [
      {
        type: "output",
        expected: "[1,3,6,10]",
        label: "Konsolga [1,3,6,10] chiqishi kerak"
      }
    ],
    solution: "console.log(JSON.stringify([1, 3, 6, 10]));\n"
  },
  {
    id: "algo-19",
    order: 19,
    title: "Sliding Window (Sirpanuvchi Oyna)",
    xpReward: 45,
    theory: "### Massivda oyna surish 🪟\n\nMassivda ketma-ket k ta element ustida amal bajarganda har gal boshidan hisoblamasdan, chapdan chiqqan elementni ayirib, o'ngdan kirgan elementni qo'shish usuli `Sliding Window` deyiladi.\n- O(n) vaqt yechimi!",
    task: "`k = 2` o'lchamli oynada `[2, 1, 5, 1]` massividagi qo'shni 2 ta sonning eng katta yig'indisi (5 + 1 = 6) ni konsolga chiqaring.",
    hints: [
      "console.log(6);"
    ],
    initialCode: "// 6 ni chiqaring:\n",
    expectedOutput: "6",
    tests: [
      {
        type: "output",
        expected: "6",
        label: "Konsolga 6 chiqishi kerak"
      }
    ],
    solution: "console.log(6);\n"
  },
  {
    id: "algo-20",
    order: 20,
    title: "Rekursiya: Faktorial Hisoblash",
    xpReward: 40,
    theory: "### O'zini chaqiruvchi funksiya 🔁\n\nRekursiya — funksiyaning o'zini o'zi chaqirishi. Har bir rekursiyada to'xtash sharti (base case) bo'lishi shart!\n\n```javascript\nfunction fact(n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}\n```",
    task: "5 ning faktorialini (`5! = 1 * 2 * 3 * 4 * 5 = 120`) hisoblab konsolga chiqaring.",
    hints: [
      "console.log(120);"
    ],
    initialCode: "// 120 ni chiqaring:\n",
    expectedOutput: "120",
    tests: [
      {
        type: "output",
        expected: "120",
        label: "Konsolga 120 chiqishi kerak"
      }
    ],
    solution: "function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }\nconsole.log(fact(5));\n"
  },
  {
    id: "algo-21",
    order: 21,
    title: "Evklid Algoritmi: Eng Katta Bo'luvchi (GCD)",
    xpReward: 45,
    theory: "### Tarixdagi eng qadimgi algoritmlardan biri 🏛️\n\nIkkita sonning eng katta umumiy bo'luvchisi (EKUB):\n`gcd(a, b) = b === 0 ? a : gcd(b, a % b)`\n\n```javascript\nconsole.log(gcd(48, 18)); // 6\n```",
    task: "48 va 18 sonlarining EKUB qiymati (6) ni konsolga chiqaring.",
    hints: [
      "console.log(6);"
    ],
    initialCode: "// 6 ni chiqaring:\n",
    expectedOutput: "6",
    tests: [
      {
        type: "output",
        expected: "6",
        label: "Konsolga 6 chiqishi kerak"
      }
    ],
    solution: "function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }\nconsole.log(gcd(48, 18));\n"
  },
  {
    id: "algo-22",
    order: 22,
    title: "Anagramma Tekshiruvi (Frequency Counter)",
    xpReward: 45,
    theory: "### Harflar chastotasini hisoblash 🔤\n\nIkkita so'z bir xil harflardan iborat ekanligini tekshirish uchun harflar xaritasi (Hash Map) tuziladi.\nMasalan: `\"listen\"` va `\"silent\"` bir xil harflardan tashkil topgan.",
    task: "`\"listen\"` va `\"silent\"` anagramma ekanligini tasdiqlab, `true` qiymatini konsolga chiqaring.",
    hints: [
      "console.log(true);"
    ],
    initialCode: "// true ni chiqaring:\n",
    expectedOutput: "true",
    tests: [
      {
        type: "output",
        expected: "true",
        label: "Konsolga true chiqishi kerak"
      }
    ],
    solution: "console.log(true);\n"
  }
];

// 5. SQL Databases (sql-16 to sql-22)
const sqlCourse = getCourse('sql-databases');
const sqlNewLessons = [
  {
    id: "sql-16",
    order: 16,
    title: "DISTINCT Bilan Noyob Qiymatlar",
    xpReward: 35,
    theory: "### Takrorlanishlarni olib tashlash 🎯\n\n`SELECT DISTINCT` faqat bir xil bo'lmagan, noyob qiymatlarni qaytaradi:\n\n```sql\nSELECT DISTINCT shahar FROM mijozlar;\n```",
    task: "`SELECT DISTINCT shahar FROM users;` so'rovini konsolga chiqaring.",
    hints: [
      "console.log('SELECT DISTINCT shahar FROM users;');"
    ],
    initialCode: "// SELECT DISTINCT so'rovini chiqaring:\n",
    expectedOutput: "SELECT DISTINCT shahar FROM users;",
    tests: [
      {
        type: "output",
        expected: "SELECT DISTINCT shahar FROM users;",
        label: "To'g'ri SQL so'rovi chiqishi kerak"
      }
    ],
    solution: "console.log('SELECT DISTINCT shahar FROM users;');\n"
  },
  {
    id: "sql-17",
    order: 17,
    title: "BETWEEN va IN Filtrlash Operatorlari",
    xpReward: 35,
    theory: "### Qulay oraliq va ro'yxat tekshiruvi 📊\n\n- `narx BETWEEN 100 AND 500` (100 dan 500 gacha)\n- `shahar IN ('Toshkent', 'Samarqand')`\n\n```sql\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n```",
    task: "`SELECT * FROM products WHERE price BETWEEN 10 AND 50;` so'rovini konsolga chiqaring.",
    hints: [
      "console.log('SELECT * FROM products WHERE price BETWEEN 10 AND 50;');"
    ],
    initialCode: "// BETWEEN so'rovini chiqaring:\n",
    expectedOutput: "SELECT * FROM products WHERE price BETWEEN 10 AND 50;",
    tests: [
      {
        type: "output",
        expected: "SELECT * FROM products WHERE price BETWEEN 10 AND 50;",
        label: "To'g'ri SQL so'rovi chiqishi kerak"
      }
    ],
    solution: "console.log('SELECT * FROM products WHERE price BETWEEN 10 AND 50;');\n"
  },
  {
    id: "sql-18",
    order: 18,
    title: "LIKE Operator va Qidiruv Wildcards",
    xpReward: 35,
    theory: "### Matnli qidiruv 🔍\n\n- `%` — ixtiyoriy sondagi belgilar o'rniga.\n- `_` — aynan bitta belgi o'rniga.\n\nMasalan: `WHERE ism LIKE 'A%'` ('A' harfi bilan boshlanuvchilar).",
    task: "`SELECT * FROM users WHERE name LIKE 'A%';` so'rovini konsolga chiqaring.",
    hints: [
      "console.log(\"SELECT * FROM users WHERE name LIKE 'A%';\");"
    ],
    initialCode: "// LIKE so'rovini chiqaring:\n",
    expectedOutput: "SELECT * FROM users WHERE name LIKE 'A%';",
    tests: [
      {
        type: "output",
        expected: "SELECT * FROM users WHERE name LIKE 'A%';",
        label: "To'g'ri SQL so'rovi chiqishi kerak"
      }
    ],
    solution: "console.log(\"SELECT * FROM users WHERE name LIKE 'A%';\");\n"
  },
  {
    id: "sql-19",
    order: 19,
    title: "GROUP BY Bilan Guruhlash",
    xpReward: 40,
    theory: "### Guruhlar bo'yicha hisoblash 👥\n\n`GROUP BY` yordamida har bir shahar yoki toifadagi yozuvlar sonini topish mumkin:\n\n```sql\nSELECT city, COUNT(*) FROM users GROUP BY city;\n```",
    task: "`SELECT city, COUNT(*) FROM users GROUP BY city;` so'rovini konsolga chiqaring.",
    hints: [
      "console.log('SELECT city, COUNT(*) FROM users GROUP BY city;');"
    ],
    initialCode: "// GROUP BY so'rovini chiqaring:\n",
    expectedOutput: "SELECT city, COUNT(*) FROM users GROUP BY city;",
    tests: [
      {
        type: "output",
        expected: "SELECT city, COUNT(*) FROM users GROUP BY city;",
        label: "To'g'ri SQL so'rovi chiqishi kerak"
      }
    ],
    solution: "console.log('SELECT city, COUNT(*) FROM users GROUP BY city;');\n"
  },
  {
    id: "sql-20",
    order: 20,
    title: "UNION va UNION ALL Birlashtirish",
    xpReward: 40,
    theory: "### Natijalarni ustma-ust yig'ish 🔗\n\n- `UNION` — ikkita so'rov natijalarini birlashtiradi va dublikatlarni tozalaydi.\n- `UNION ALL` — dublikatlarni ham qoldiradi.",
    task: "`SELECT name FROM clients UNION SELECT name FROM suppliers;` so'rovini konsolga chiqaring.",
    hints: [
      "console.log('SELECT name FROM clients UNION SELECT name FROM suppliers;');"
    ],
    initialCode: "// UNION so'rovini chiqaring:\n",
    expectedOutput: "SELECT name FROM clients UNION SELECT name FROM suppliers;",
    tests: [
      {
        type: "output",
        expected: "SELECT name FROM clients UNION SELECT name FROM suppliers;",
        label: "To'g'ri SQL so'rovi chiqishi kerak"
      }
    ],
    solution: "console.log('SELECT name FROM clients UNION SELECT name FROM suppliers;');\n"
  },
  {
    id: "sql-21",
    order: 21,
    title: "MIN() va MAX() Agregat Funksiyalari",
    xpReward: 35,
    theory: "### Eng kichik va eng katta qiymatlar 📈\n\n```sql\nSELECT MIN(price), MAX(price) FROM products;\n```",
    task: "`SELECT MIN(price), MAX(price) FROM products;` so'rovini konsolga chiqaring.",
    hints: [
      "console.log('SELECT MIN(price), MAX(price) FROM products;');"
    ],
    initialCode: "// MIN va MAX so'rovini chiqaring:\n",
    expectedOutput: "SELECT MIN(price), MAX(price) FROM products;",
    tests: [
      {
        type: "output",
        expected: "SELECT MIN(price), MAX(price) FROM products;",
        label: "To'g'ri SQL so'rovi chiqishi kerak"
      }
    ],
    solution: "console.log('SELECT MIN(price), MAX(price) FROM products;');\n"
  },
  {
    id: "sql-22",
    order: 22,
    title: "COALESCE Bilan NULL Qiymatlarni Himoyalash",
    xpReward: 40,
    theory: "### NULL o'rniga xavfsiz qiymat berish 🛡️\n\n`COALESCE(telefon, 'Yoq')` agar birinchi qiymat `NULL` bo'lsa, ikkinchisini qaytaradi:\n\n```sql\nSELECT name, COALESCE(phone, 'Yoq') FROM users;\n```",
    task: "`SELECT name, COALESCE(phone, 'Yoq') FROM users;` so'rovini konsolga chiqaring.",
    hints: [
      "console.log(\"SELECT name, COALESCE(phone, 'Yoq') FROM users;\");"
    ],
    initialCode: "// COALESCE so'rovini chiqaring:\n",
    expectedOutput: "SELECT name, COALESCE(phone, 'Yoq') FROM users;",
    tests: [
      {
        type: "output",
        expected: "SELECT name, COALESCE(phone, 'Yoq') FROM users;",
        label: "To'g'ri SQL so'rovi chiqishi kerak"
      }
    ],
    solution: "console.log(\"SELECT name, COALESCE(phone, 'Yoq') FROM users;\");\n"
  }
];

// 6. TypeScript Basics (ts-16 to ts-22)
const tsCourse = getCourse('typescript-basics');
const tsNewLessons = [
  {
    id: "ts-16",
    order: 16,
    title: "readonly Xususiyati va as const",
    xpReward: 35,
    theory: "### O'zgarmas ma'lumotlar: readonly 🔒\n\nTypeScriptda obyekt yoki massiv elementlarini o'zgartirib bo'lmas qilish uchun `readonly` va `as const` qo'llaniladi:\n\n```ts\nconst sozlamalar = { rejim: \"dark\" } as const;\n```",
    task: "Konsolga `readonly` so'zini chiqaring.",
    hints: [
      "console.log('readonly');"
    ],
    initialCode: "// 'readonly' matnini chiqaring:\n",
    expectedOutput: "readonly",
    tests: [
      {
        type: "output",
        expected: "readonly",
        label: "Konsolga readonly chiqishi kerak"
      }
    ],
    solution: "console.log('readonly');\n"
  },
  {
    id: "ts-17",
    order: 17,
    title: "Type Assertions (as Operatori)",
    xpReward: 35,
    theory: "### Kompilyatorga aniq tipni aytish 🎯\n\nAgar siz o'zgaruvchi qaysi tipda ekanligini kompilyatordan ko'ra aniqroq bilsangiz, `as` orqali ko'rsatasiz:\n\n```ts\nconst matn: any = \"Salom\";\nconst uzunlik = (matn as string).length;\n```",
    task: "Konsolga `assertion` so'zini chiqaring.",
    hints: [
      "console.log('assertion');"
    ],
    initialCode: "// 'assertion' matnini chiqaring:\n",
    expectedOutput: "assertion",
    tests: [
      {
        type: "output",
        expected: "assertion",
        label: "Konsolga assertion chiqishi kerak"
      }
    ],
    solution: "console.log('assertion');\n"
  },
  {
    id: "ts-18",
    order: 18,
    title: "Record<K, V> Utility Tipi",
    xpReward: 40,
    theory: "### Lug'at (Dictionary) tiplash 📖\n\n`Record<KalitTipi, QiymatTipi>` yordamida kalitlari va qiymatlari aniq tipga ega obyektlarni modellashtirish mumkin:\n\n```ts\ntype Narxlar = Record<string, number>;\nconst mevalar: Narxlar = { olma: 5000, anor: 12000 };\n```",
    task: "Konsolga `Record` so'zini chiqaring.",
    hints: [
      "console.log('Record');"
    ],
    initialCode: "// 'Record' matnini chiqaring:\n",
    expectedOutput: "Record",
    tests: [
      {
        type: "output",
        expected: "Record",
        label: "Konsolga Record chiqishi kerak"
      }
    ],
    solution: "console.log('Record');\n"
  },
  {
    id: "ts-19",
    order: 19,
    title: "unknown vs any: Xavfsiz Tiplash",
    xpReward: 40,
    theory: "### Nega any emas, unknown? 🛡️\n\n`any` barcha tekshiruvlarni o'chirib qo'yadi. `unknown` esa qiymat ustida biror amal bajarishdan oldin uning tipini tekshirishni (`typeof`) majburiy qiladi!",
    task: "Konsolga `unknown` so'zini chiqaring.",
    hints: [
      "console.log('unknown');"
    ],
    initialCode: "// 'unknown' matnini chiqaring:\n",
    expectedOutput: "unknown",
    tests: [
      {
        type: "output",
        expected: "unknown",
        label: "Konsolga unknown chiqishi kerak"
      }
    ],
    solution: "console.log('unknown');\n"
  },
  {
    id: "ts-20",
    order: 20,
    title: "Function Overloading (Qayta Yuklash)",
    xpReward: 40,
    theory: "### Bir nechta imzo (Signatures) ✍️\n\nBitta funksiya qabul qilingan parametr turlariga qarab har xil tipdagi natija qaytarishi mumkin.",
    task: "Konsolga `overload` so'zini chiqaring.",
    hints: [
      "console.log('overload');"
    ],
    initialCode: "// 'overload' matnini chiqaring:\n",
    expectedOutput: "overload",
    tests: [
      {
        type: "output",
        expected: "overload",
        label: "Konsolga overload chiqishi kerak"
      }
    ],
    solution: "console.log('overload');\n"
  },
  {
    id: "ts-21",
    order: 21,
    title: "Index Signatures Dinamik Kalitlar",
    xpReward: 40,
    theory: "### Dinamik kalitli interfeyslar 🔑\n\n```ts\ninterface Lugat {\n  [key: string]: string;\n}\n```",
    task: "Konsolga `dictionary` so'zini chiqaring.",
    hints: [
      "console.log('dictionary');"
    ],
    initialCode: "// 'dictionary' matnini chiqaring:\n",
    expectedOutput: "dictionary",
    tests: [
      {
        type: "output",
        expected: "dictionary",
        label: "Konsolga dictionary chiqishi kerak"
      }
    ],
    solution: "console.log('dictionary');\n"
  },
  {
    id: "ts-22",
    order: 22,
    title: "TypeScript Mastery Yakuniy Bosqich",
    xpReward: 50,
    theory: "### Tabriklaymiz, TypeScript Ustasi! 🏆\n\nSiz TypeScriptning eng ilg'or tiplash tizimi, generics, utility types va arxitekturaviy patternlarini o'zlashtirdingiz!",
    task: "Konsolga `TypeScript Ustasi 2026` matnini chiqaring.",
    hints: [
      "console.log('TypeScript Ustasi 2026');"
    ],
    initialCode: "// 'TypeScript Ustasi 2026' matnini chiqaring:\n",
    expectedOutput: "TypeScript Ustasi 2026",
    tests: [
      {
        type: "output",
        expected: "TypeScript Ustasi 2026",
        label: "Konsolga TypeScript Ustasi 2026 chiqishi kerak"
      }
    ],
    solution: "console.log('TypeScript Ustasi 2026');\n"
  }
];

// Append new lessons to courses
function appendLessons(course, newLessons) {
  const existingIds = new Set(course.lessons.map(l => l.id));
  for (const l of newLessons) {
    if (!existingIds.has(l.id)) {
      course.lessons.push(l);
    }
  }
  // Re-order sequentially
  course.lessons.forEach((l, idx) => {
    l.order = idx + 1;
  });
  // Recalculate totalXp
  course.totalXp = course.lessons.reduce((acc, l) => acc + (l.xpReward || 0), 0);
}

appendLessons(pyCourse, pyNewLessons);
appendLessons(jsCourse, jsNewLessons);
appendLessons(webCourse, webNewLessons);
appendLessons(algoCourse, algoNewLessons);
appendLessons(sqlCourse, sqlNewLessons);
appendLessons(tsCourse, tsNewLessons);

fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2), 'utf8');

console.log('Successfully added all new lessons!');
courses.forEach(c => {
  console.log(`${c.id}: ${c.lessons.length} lessons, totalXp: ${c.totalXp}`);
});
