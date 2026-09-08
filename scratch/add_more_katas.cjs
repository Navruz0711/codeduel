const fs = require('fs');
const path = require('path');

const KATA_FILE = path.join(__dirname, '../data/kata.json');
const COURSES_FILE = path.join(__dirname, '../data/courses.json');

const katas = JSON.parse(fs.readFileSync(KATA_FILE, 'utf8'));
const courses = JSON.parse(fs.readFileSync(COURSES_FILE, 'utf8'));

const moreKatas = [
  {
    id: "categorize-new-member",
    title: "Klubga Yangi A'zolarni Tasniflash (Senior / Open)",
    slug: "categorize-new-member",
    description: "Klub a'zolarining [yosh, nogironlik_darajasi] juftliklari beriladi. Agar yoshi kamida 55 va darajasi 7 dan yuqori bo'lsa 'Senior', aks holda 'Open' toifasini qaytaring.",
    examples: [
      { input: "[[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]", output: "['Open', 'Open', 'Senior', 'Open', 'Open', 'Senior']" }
    ],
    difficulty: 7,
    category: "Arrays",
    tags: ["arrays", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function openOrSenior(data) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function openOrSenior(data) {\n  return data.map(([age, handicap]) => (age >= 55 && handicap > 7) ? 'Senior' : 'Open');\n}",
        tests: [
          { input: "console.log(JSON.stringify(openOrSenior([[45, 12], [55, 21], [19, -2], [104, 20]])))", expected: "[\"Open\",\"Senior\",\"Open\",\"Senior\"]", label: "Mixed members" }
        ]
      }
    }
  },
  {
    id: "printer-errors",
    title: "Printer Xatoliklarini Aniqlash",
    slug: "printer-errors",
    description: "Printer faqat 'a' dan 'm' gacha bo'lgan harflarni to'g'ri chop eta oladi. 'n' dan 'z' gacha harflar xatolik hisoblanadi. Xatoliklar soni va umumiy belgilar sonini 'xatolar/jami' formatida qaytaring.",
    examples: [
      { input: "'aaabbbbhaijjjm'", output: "'0/14'" },
      { input: "'aaaxbbbbyyhwawiwjjjwwm'", output: "'8/22'" }
    ],
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "regex"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function printerError(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function printerError(s) {\n  const errors = (s.match(/[^a-m]/g) || []).length;\n  return `${errors}/${s.length}`;\n}",
        tests: [
          { input: "console.log(printerError('aaabbbbhaijjjm'))", expected: "0/14", label: "No errors" },
          { input: "console.log(printerError('aaaxbbbbyyhwawiwjjjwwm'))", expected: "8/22", label: "With errors" }
        ]
      }
    }
  },
  {
    id: "is-this-a-triangle",
    title: "Uchburchak Hosil Qilish Mumkinmi?",
    slug: "is-this-a-triangle",
    description: "Berilgan a, b, c uzunlikdagi kesmalardan uchburchak yasash mumkinligini (true/false) aniqlang (ixtiyoriy ikki tomon yig'indisi uchinchisidan katta bo'lishi kerak).",
    examples: [
      { input: "1, 2, 2", output: "true" },
      { input: "7, 2, 2", output: "false" }
    ],
    difficulty: 7,
    category: "Geometry",
    tags: ["math", "geometry"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function isTriangle(a, b, c) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isTriangle(a, b, c) {\n  return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;\n}",
        tests: [
          { input: "console.log(isTriangle(1, 2, 2))", expected: "true", label: "Valid triangle" },
          { input: "console.log(isTriangle(7, 2, 2))", expected: "false", label: "Invalid triangle" }
        ]
      }
    }
  },
  {
    id: "sum-two-lowest-positive-integers",
    title: "Eng Kichik Ikki Musbat Son Yig'indisi",
    slug: "sum-two-lowest-positive-integers",
    description: "Musbat butun sonlar massividan eng kichik ikkita sonni topib, ularning yig'indisini qaytaring.",
    examples: [
      { input: "[19, 5, 42, 2, 77]", output: "7" },
      { input: "[10, 343445353, 3453445, 3453545353453]", output: "3453455" }
    ],
    difficulty: 7,
    category: "Arrays",
    tags: ["arrays", "math"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function sumTwoSmallestNumbers(numbers) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function sumTwoSmallestNumbers(numbers) {\n  const [a, b] = numbers.sort((x, y) => x - y);\n  return a + b;\n}",
        tests: [
          { input: "console.log(sumTwoSmallestNumbers([19, 5, 42, 2, 77]))", expected: "7", label: "2 + 5 = 7" },
          { input: "console.log(sumTwoSmallestNumbers([5, 8, 12, 19, 22]))", expected: "13", label: "5 + 8 = 13" }
        ]
      }
    }
  },
  {
    id: "shortest-word",
    title: "Matndagi Eng Qisqa So'z Uzunligi",
    slug: "shortest-word",
    description: "So'zlar qatoridan eng qisqa so'zning uzunligini (belgilar sonini) toping.",
    examples: [
      { input: "'bitcoin take over the world maybe who knows perhaps'", output: "3" },
      { input: "'turns out random test cases are easier than writing out basic ones'", output: "3" }
    ],
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function findShort(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function findShort(s) {\n  return Math.min(...s.split(' ').map(w => w.length));\n}",
        tests: [
          { input: "console.log(findShort('bitcoin take over the world maybe who knows perhaps'))", expected: "3", label: "Shortest is 3" },
          { input: "console.log(findShort('Let\\'s travel abroad shall we'))", expected: "2", label: "Shortest is 2" }
        ]
      }
    }
  },
  {
    id: "complementary-dna",
    title: "Komplementar DNK Zanjiri",
    slug: "complementary-dna",
    description: "DNK zanjirining qarama-qarshi komplementar juftini hosil qiling: A harfi T ga, T harfi A ga, C harfi G ga, G harfi C ga aylanadi.",
    examples: [
      { input: "'ATTGC'", output: "'TAACG'" },
      { input: "'GTAT'", output: "'CATA'" }
    ],
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "biology"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function dnaStrand(dna) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function dnaStrand(dna) {\n  const map = { A: 'T', T: 'A', C: 'G', G: 'C' };\n  return dna.split('').map(c => map[c] || c).join('');\n}",
        tests: [
          { input: "console.log(dnaStrand('ATTGC'))", expected: "TAACG", label: "ATTGC -> TAACG" },
          { input: "console.log(dnaStrand('GTAT'))", expected: "CATA", label: "GTAT -> CATA" }
        ]
      }
    }
  },
  {
    id: "two-to-one",
    title: "Ikki Matndan Saralangan Yagona Belgilar",
    slug: "two-to-one",
    description: "Faqat a dan z gacha harflardan iborat s1 va s2 matnlaridan takrorlanmagan barcha harflarni alfavit bo'yicha saralangan bitta matn qilib qaytaring.",
    examples: [
      { input: "'xyaabbbccccdefww', 'xxxxyyyyabklmopq'", output: "'abcdefklmopqwxy'" }
    ],
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "sorting"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function longest(s1, s2) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function longest(s1, s2) {\n  return Array.from(new Set(s1 + s2)).sort().join('');\n}",
        tests: [
          { input: "console.log(longest('xyaabbbccccdefww', 'xxxxyyyyabklmopq'))", expected: "abcdefklmopqwxy", label: "Unique sorted letters" }
        ]
      }
    }
  },
  {
    id: "regex-validate-pin-code",
    title: "Bank PIN-Kodining To'g'riligini Tekshirish",
    slug: "regex-validate-pin-code",
    description: "ATM PIN kodlari faqat 4 yoki 6 xonali butun raqamlardan iborat bo'lishi shart. Boshqa hech qanday belgi yoki harf qabul qilinmaydi.",
    examples: [
      { input: "'1234'", output: "true" },
      { input: "'12345'", output: "false" },
      { input: "'a234'", output: "false" }
    ],
    difficulty: 7,
    category: "Regex",
    tags: ["regex", "validation"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function validatePIN(pin) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function validatePIN(pin) {\n  return /^(\\d{4}|\\d{6})$/.test(pin);\n}",
        tests: [
          { input: "console.log(validatePIN('1234'))", expected: "true", label: "4 digits valid" },
          { input: "console.log(validatePIN('12345'))", expected: "false", label: "5 digits invalid" },
          { input: "console.log(validatePIN('a234'))", expected: "false", label: "Letters invalid" }
        ]
      }
    }
  },
  {
    id: "sum-of-odd-numbers",
    title: "Toq Sonlar Uchburchagining N-Qatori Yig'indisi",
    slug: "sum-of-odd-numbers",
    description: "Ketma-ket toq sonlar uchburchagida:\n1\n3     5\n7     9    11\n13    15    17    19\n21    23    25    27    29\nBerilgan n-qatordagi barcha sonlarning yig'indisini toping.",
    examples: [
      { input: "1", output: "1" },
      { input: "2", output: "8 (3 + 5)" },
      { input: "42", output: "74088" }
    ],
    difficulty: 7,
    category: "Math",
    tags: ["math", "numbers"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function rowSumOddNumbers(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function rowSumOddNumbers(n) {\n  return n * n * n;\n}",
        tests: [
          { input: "console.log(rowSumOddNumbers(1))", expected: "1", label: "Row 1" },
          { input: "console.log(rowSumOddNumbers(2))", expected: "8", label: "Row 2" },
          { input: "console.log(rowSumOddNumbers(42))", expected: "74088", label: "Row 42" }
        ]
      }
    }
  },
  {
    id: "find-the-next-perfect-square",
    title: "Keyingi Mukammal Kvadratni Topish",
    slug: "find-the-next-perfect-square",
    description: "Berilgan son butun sonning kvadrati bo'lsa, undan keyingi butun sonning kvadratini qaytaring. Agar son mukammal kvadrat bo'lmasa, -1 qaytaring.",
    examples: [
      { input: "121", output: "144 (11^2 -> 12^2)" },
      { input: "625", output: "676 (25^2 -> 26^2)" },
      { input: "114", output: "-1" }
    ],
    difficulty: 7,
    category: "Math",
    tags: ["math", "algebra"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function findNextSquare(sq) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function findNextSquare(sq) {\n  const root = Math.sqrt(sq);\n  return Number.isInteger(root) ? (root + 1) ** 2 : -1;\n}",
        tests: [
          { input: "console.log(findNextSquare(121))", expected: "144", label: "121 -> 144" },
          { input: "console.log(findNextSquare(625))", expected: "676", label: "625 -> 676" },
          { input: "console.log(findNextSquare(114))", expected: "-1", label: "114 -> -1" }
        ]
      }
    }
  },
  {
    id: "array-diff",
    title: "Massivlar Ayirmasi (Array.diff)",
    slug: "array-diff",
    description: "a massividan b massivida mavjud bo'lgan barcha elementlarni olib tashlang. Qolgan elementlarning ketma-ketlik tartibi saqlanishi kerak.",
    examples: [
      { input: "[1, 2], [1]", output: "[2]" },
      { input: "[1, 2, 2, 2, 3], [2]", output: "[1, 3]" }
    ],
    difficulty: 6,
    category: "Arrays",
    tags: ["arrays", "algorithms"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function arrayDiff(a, b) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function arrayDiff(a, b) {\n  const setB = new Set(b);\n  return a.filter(x => !setB.has(x));\n}",
        tests: [
          { input: "console.log(JSON.stringify(arrayDiff([1, 2], [1])))", expected: "[2]", label: "Remove 1" },
          { input: "console.log(JSON.stringify(arrayDiff([1, 2, 2, 2, 3], [2])))", expected: "[1,3]", label: "Remove multiple 2s" }
        ]
      }
    }
  },
  {
    id: "create-phone-number",
    title: "Telefon Raqami Formatini Yaratish",
    slug: "create-phone-number",
    description: "10 ta raqamdan (0-9) iborat massivni '(xxx) xxx-xxxx' ko'rinishidagi formatlangan telefon raqami matniga aylantiring.",
    examples: [
      { input: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]", output: "'(123) 456-7890'" }
    ],
    difficulty: 6,
    category: "Formatting",
    tags: ["formatting", "strings"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function createPhoneNumber(numbers) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function createPhoneNumber(numbers) {\n  const s = numbers.join('');\n  return `(${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6)}`;\n}",
        tests: [
          { input: "console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))", expected: "(123) 456-7890", label: "Standard phone" },
          { input: "console.log(createPhoneNumber([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]))", expected: "(111) 111-1111", label: "Repeated ones" }
        ]
      }
    }
  },
  {
    id: "counting-duplicates",
    title: "Takrorlangan Belgilar Soni",
    slug: "counting-duplicates",
    description: "Matn ichida 1 martadan ko'p marta uchragan harf va raqamlarning turlari sonini hisoblang (katta-kichik harflar bir xil deb hisoblanadi).",
    examples: [
      { input: "'abcde'", output: "0" },
      { input: "'aabbcde'", output: "2 ('a' va 'b')" },
      { input: "'indivisibility'", output: "1 ('i')" }
    ],
    difficulty: 6,
    category: "Strings",
    tags: ["strings", "counting"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function duplicateCount(text) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function duplicateCount(text) {\n  const counts = {};\n  for (let c of text.toLowerCase()) {\n    counts[c] = (counts[c] || 0) + 1;\n  }\n  return Object.values(counts).filter(cnt => cnt > 1).length;\n}",
        tests: [
          { input: "console.log(duplicateCount('abcde'))", expected: "0", label: "No duplicates" },
          { input: "console.log(duplicateCount('aabbcde'))", expected: "2", label: "Two duplicates" },
          { input: "console.log(duplicateCount('indivisibility'))", expected: "1", label: "Repeated i" }
        ]
      }
    }
  },
  {
    id: "detect-pangram",
    title: "Pangram Matnni Aniqlash (Har Bir Harf Mavjudligi)",
    slug: "detect-pangram",
    description: "Pangram — bu alifbodagi har bir harfni (A dan Z gacha) kamida bir marta o'z ichiga olgan gap. Matn pangram ekanligini (true/false) tekshiring.",
    examples: [
      { input: "'The quick brown fox jumps over the lazy dog.'", output: "true" },
      { input: "'This is not a pangram.'", output: "false" }
    ],
    difficulty: 6,
    category: "Strings",
    tags: ["strings", "validation"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function isPangram(string) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isPangram(string) {\n  const letters = new Set(string.toLowerCase().replace(/[^a-z]/g, ''));\n  return letters.size === 26;\n}",
        tests: [
          { input: "console.log(isPangram('The quick brown fox jumps over the lazy dog.'))", expected: "true", label: "Classic pangram" },
          { input: "console.log(isPangram('This is not a pangram.'))", expected: "false", label: "Not a pangram" }
        ]
      }
    }
  },
  {
    id: "duplicate-encoder",
    title: "Takrorlanish Qavslari Kodi (Duplicate Encoder)",
    slug: "duplicate-encoder",
    description: "Matnni qavslar bilan qayta kodlang: agar belgi butun matnda faqat 1 marta qatnashgan bo'lsa '(' ga, agar 1 dan ortiq marta qatnashgan bo'lsa ')' ga almashtiring. Katta-kichik harflar teng deb qaralsin.",
    examples: [
      { input: "'din'", output: "'((('" },
      { input: "'recede'", output: "'()()()'" },
      { input: "'Success'", output: "')())())'" }
    ],
    difficulty: 6,
    category: "Strings",
    tags: ["strings", "encoding"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function duplicateEncode(word) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function duplicateEncode(word) {\n  const lower = word.toLowerCase();\n  return lower.split('').map(c => lower.indexOf(c) === lower.lastIndexOf(c) ? '(' : ')').join('');\n}",
        tests: [
          { input: "console.log(duplicateEncode('din'))", expected: "(((", label: "din" },
          { input: "console.log(duplicateEncode('recede'))", expected: "()()()", label: "recede" },
          { input: "console.log(duplicateEncode('Success'))", expected: ")())())", label: "Success" }
        ]
      }
    }
  },
  {
    id: "bouncing-balls",
    title: "Sakrovchi To'p (Bouncing Ball)",
    slug: "bouncing-balls",
    description: "To'p h balandlikdan tashlanadi, har safar yerga urilganda bounce koeffitsiyenti bo'yicha sakraydi. Balandligi window bo'lgan derazadan ona qarab turibdi. Ona to'pni deraza oldidan necha marta ko'rishini toping (tushayotganda va qayta ko'tarilayotganda). Agar shartlar noto'g'ri bo'lsa -1 qaytaring.",
    examples: [
      { input: "h = 3, bounce = 0.66, window = 1.5", output: "3" },
      { input: "h = 3, bounce = 1, window = 1.5", output: "-1" }
    ],
    difficulty: 6,
    category: "Math",
    tags: ["math", "simulation"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function bouncingBall(h, bounce, window) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function bouncingBall(h, bounce, window) {\n  if (h <= 0 || bounce <= 0 || bounce >= 1 || window >= h) return -1;\n  let views = 1;\n  while ((h * bounce) > window) {\n    views += 2;\n    h *= bounce;\n  }\n  return views;\n}",
        tests: [
          { input: "console.log(bouncingBall(3.0, 0.66, 1.5))", expected: "3", label: "3.0, 0.66, 1.5 -> 3" },
          { input: "console.log(bouncingBall(30.0, 0.66, 1.5))", expected: "15", label: "30.0, 0.66, 1.5 -> 15" }
        ]
      }
    }
  }
];

// Verify each kata passes
for (const k of moreKatas) {
  const js = k.languages.javascript;
  for (const test of js.tests) {
    let output = '';
    const mockConsole = {
      log: (...args) => {
        output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
      }
    };
    const fn = new Function('console', `${js.solution}\n${test.input}`);
    fn(mockConsole);
    const actual = output.trim();
    if (actual !== test.expected) {
      console.error(`FAILED: ${k.id} - ${test.label}: expected ${test.expected}, got ${actual}`);
      process.exit(1);
    }
  }
}
console.log('All 16 extra katas verified!');

const existingIds = new Set(katas.map(k => k.id));
let added = 0;
for (const k of moreKatas) {
  if (!existingIds.has(k.id)) {
    katas.push(k);
    added++;
  }
}
console.log(`Added ${added} new katas. Total now: ${katas.length}`);
fs.writeFileSync(KATA_FILE, JSON.stringify(katas, null, 2), 'utf8');

// Also expand SQL course lessons
const sqlCourse = courses.find(c => c.id === 'sql-ma-lumotlar-bazasi');
if (sqlCourse) {
  const existingLessonIds = new Set(sqlCourse.lessons.map(l => l.id));
  const newSqlLessons = [
    {
      id: "sql-06",
      order: 6,
      title: "GROUP BY va Aggregat Funksiyalar",
      xpReward: 35,
      theory: "### GROUP BY bilan Guruhlash 📊\n\nMa'lumotlarni biror ustun bo'yicha guruhlab, har bir guruh uchun o'rtacha qiymat yoki sonini hisoblash:\n\n```sql\nSELECT department, COUNT(*)\nFROM employees\nGROUP BY department;\n```",
      task: "Konsolga `GROUP BY` matnini chiqaring.",
      hints: ["console.log('GROUP BY')"],
      initialCode: "// Konsolga 'GROUP BY' chiqaring:\n",
      expectedOutput: "GROUP BY",
      tests: [{ type: "output", expected: "GROUP BY", label: "'GROUP BY' chiqishi kerak" }],
      solution: "console.log('GROUP BY');\n"
    },
    {
      id: "sql-07",
      order: 7,
      title: "INNER JOIN bilan Jadvallarni Bog'lash",
      xpReward: 40,
      theory: "### INNER JOIN 🔗\n\nIkki jadvalni umumiy kalit (ID) orqali birlashtirish:\n\n```sql\nSELECT users.name, orders.amount\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;\n```",
      task: "Konsolga `INNER JOIN` matnini chiqaring.",
      hints: ["console.log('INNER JOIN')"],
      initialCode: "// Konsolga 'INNER JOIN' chiqaring:\n",
      expectedOutput: "INNER JOIN",
      tests: [{ type: "output", expected: "INNER JOIN", label: "'INNER JOIN' chiqishi kerak" }],
      solution: "console.log('INNER JOIN');\n"
    }
  ];
  for (const l of newSqlLessons) {
    if (!existingLessonIds.has(l.id)) sqlCourse.lessons.push(l);
  }
}

for (const course of courses) {
  course.totalXp = course.lessons.reduce((sum, l) => sum + (l.xpReward || 25), 0);
}
fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2), 'utf8');
console.log('Updated courses! Total courses:', courses.length);
console.log('Total lessons now:', courses.reduce((sum, c) => sum + c.lessons.length, 0));
