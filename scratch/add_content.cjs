const fs = require('fs');
const path = require('path');

const KATA_FILE = path.join(__dirname, '../data/kata.json');
const COURSES_FILE = path.join(__dirname, '../data/courses.json');

const existingKatas = JSON.parse(fs.readFileSync(KATA_FILE, 'utf8'));
const existingCourses = JSON.parse(fs.readFileSync(COURSES_FILE, 'utf8'));

console.log('Existing Katas:', existingKatas.length);
console.log('Existing Courses:', existingCourses.length);

// NEW 27 KATAS
const newKatas = [
  {
    id: "century-from-year",
    title: "Century From Year (Asrni Topish)",
    slug: "century-from-year",
    description: "Berilgan yildan uning qaysi asrga tegishli ekanligini toping. 1-asr 1-yildan 100-yilgacha, 2-asr 101-yildan 200-yilgacha va h.k.",
    examples: [
      { input: "1705", output: "18" },
      { input: "1900", output: "19" },
      { input: "1601", output: "17" },
      { input: "2000", output: "20" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 10,
    languages: {
      javascript: {
        initialCode: "function century(year) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function century(year) {\n  return Math.ceil(year / 100);\n}",
        tests: [
          { input: "console.log(century(1705))", expected: "18", label: "1705 -> 18" },
          { input: "console.log(century(1900))", expected: "19", label: "1900 -> 19" },
          { input: "console.log(century(1601))", expected: "17", label: "1601 -> 17" },
          { input: "console.log(century(2000))", expected: "20", label: "2000 -> 20" },
          { input: "console.log(century(89))", expected: "1", label: "89 -> 1" }
        ]
      }
    }
  },
  {
    id: "count-positives-sum-negatives",
    title: "Musbatlarni Sanash va Manfiylarni Qo'shish",
    slug: "count-positives-sum-negatives",
    description: "Butun sonlar massivida musbat sonlar miqdorini va manfiy sonlar yig'indisini hisoblang. Natijani [musbatlar_soni, manfiylar_yigindisi] ko'rinishida qaytaring. Massiv bo'sh bo'lsa [] qaytaring.",
    examples: [
      { input: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]", output: "[10, -65]" }
    ],
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "fundamentals"],
    isPremium: false,
    xpReward: 10,
    languages: {
      javascript: {
        initialCode: "function countPositivesSumNegatives(input) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function countPositivesSumNegatives(input) {\n  if (!input || input.length === 0) return [];\n  let count = 0, sum = 0;\n  for (let n of input) {\n    if (n > 0) count++;\n    else if (n < 0) sum += n;\n  }\n  return [count, sum];\n}",
        tests: [
          { input: "console.log(JSON.stringify(countPositivesSumNegatives([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15])))", expected: "[10,-65]", label: "Normal array" },
          { input: "console.log(JSON.stringify(countPositivesSumNegatives([])))", expected: "[]", label: "Empty array" }
        ]
      }
    }
  },
  {
    id: "remove-string-spaces",
    title: "Matndagi Bo'shliqlarni Olib Tashlash",
    slug: "remove-string-spaces",
    description: "Berilgan matn ichidagi barcha bo'shliq (probel) belgilarini tozalab, yaxlit matn sifatida qaytaring.",
    examples: [
      { input: "'8 j 8   mBliB8g  imjB8B8  jl  B'", output: "'8j8mBliB8gimjB8B8jlB'" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 10,
    languages: {
      javascript: {
        initialCode: "function noSpace(x) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function noSpace(x) {\n  return x.replace(/\\s+/g, '');\n}",
        tests: [
          { input: "console.log(noSpace('8 j 8   mBliB8g  imjB8B8  jl  B'))", expected: "8j8mBliB8gimjB8B8jlB", label: "Mixed spaces" },
          { input: "console.log(noSpace('8 8 Bi fk8h B 8 BB8B B i  '))", expected: "88Bifk8hB8BB8BBi", label: "Trailing spaces" }
        ]
      }
    }
  },
  {
    id: "abbreviate-two-word-name",
    title: "Ism-familiya Bosh Harflari (Initsiallar)",
    slug: "abbreviate-two-word-name",
    description: "Ikkita so'zdan iborat ism-familiyadan bosh harflarni ajratib, oralariga nuqta qo'yib bosh harflar bilan qaytaring (masalan: Sam Harris -> S.H).",
    examples: [
      { input: "'Sam Harris'", output: "'S.H'" },
      { input: "'patrick feeney'", output: "'P.F'" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "formatting"],
    isPremium: false,
    xpReward: 10,
    languages: {
      javascript: {
        initialCode: "function abbrevName(name) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function abbrevName(name) {\n  return name.split(' ').map(w => w[0].toUpperCase()).join('.');\n}",
        tests: [
          { input: "console.log(abbrevName('Sam Harris'))", expected: "S.H", label: "Sam Harris" },
          { input: "console.log(abbrevName('Patrick Feenan'))", expected: "P.F", label: "Patrick Feenan" },
          { input: "console.log(abbrevName('Evan Cole'))", expected: "E.C", label: "Evan Cole" }
        ]
      }
    }
  },
  {
    id: "is-divisible-by-x-and-y",
    title: "Ikki Songa Bo'linishini Tekshirish",
    slug: "is-divisible-by-x-and-y",
    description: "n musbat soni x va y sonlarining har ikkalasiga ham qoldiqsiz bo'linadimi? Bo'linsa true, aks holda false qaytaring.",
    examples: [
      { input: "n = 3, x = 1, y = 3", output: "true" },
      { input: "n = 12, x = 2, y = 6", output: "true" },
      { input: "n = 100, x = 5, y = 3", output: "false" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "logic"],
    isPremium: false,
    xpReward: 10,
    languages: {
      javascript: {
        initialCode: "function isDivisible(n, x, y) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isDivisible(n, x, y) {\n  return n % x === 0 && n % y === 0;\n}",
        tests: [
          { input: "console.log(isDivisible(3, 1, 3))", expected: "true", label: "3 by 1 and 3" },
          { input: "console.log(isDivisible(12, 2, 6))", expected: "true", label: "12 by 2 and 6" },
          { input: "console.log(isDivisible(100, 5, 3))", expected: "false", label: "100 by 5 and 3" }
        ]
      }
    }
  },
  {
    id: "opposite-number",
    title: "Qarama-qarshi Son",
    slug: "opposite-number",
    description: "Berilgan butun yoki haqiqiy sonning qarama-qarshi ishorali qiymatini toping (masalan, 1 -> -1, -34 -> 34).",
    examples: [
      { input: "1", output: "-1" },
      { input: "-34", output: "34" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 10,
    languages: {
      javascript: {
        initialCode: "function opposite(number) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function opposite(number) {\n  return -number;\n}",
        tests: [
          { input: "console.log(opposite(1))", expected: "-1", label: "1 -> -1" },
          { input: "console.log(opposite(-34))", expected: "34", label: "-34 -> 34" },
          { input: "console.log(opposite(0))", expected: "0", label: "0 -> 0" }
        ]
      }
    }
  },
  {
    id: "string-repeat",
    title: "Matnni N Martta Takrorlash",
    slug: "string-repeat",
    description: "Berilgan s matnini n marta ketma-ket takrorlab yagona matn sifatida qaytaring.",
    examples: [
      { input: "6, 'I'", output: "'IIIIII'" },
      { input: "5, 'Hello'", output: "'HelloHelloHelloHelloHello'" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 10,
    languages: {
      javascript: {
        initialCode: "function repeatStr(n, s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function repeatStr(n, s) {\n  return s.repeat(n);\n}",
        tests: [
          { input: "console.log(repeatStr(3, '*'))", expected: "***", label: "3 stars" },
          { input: "console.log(repeatStr(5, 'Hello'))", expected: "HelloHelloHelloHelloHello", label: "5 Hello" }
        ]
      }
    }
  },
  {
    id: "find-smallest-integer",
    title: "Massivdagi Eng Kichik Son",
    slug: "find-smallest-integer",
    description: "Berilgan butun sonlar massividan eng kichik elementni toping.",
    examples: [
      { input: "[34, 15, 88, 2]", output: "2" },
      { input: "[78, 56, 232, 12, 8]", output: "8" }
    ],
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "math"],
    isPremium: false,
    xpReward: 10,
    languages: {
      javascript: {
        initialCode: "function findSmallestInt(args) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function findSmallestInt(args) {\n  return Math.min(...args);\n}",
        tests: [
          { input: "console.log(findSmallestInt([34, 15, 88, 2]))", expected: "2", label: "[34, 15, 88, 2]" },
          { input: "console.log(findSmallestInt([78, 56, 232, 12, 8]))", expected: "8", label: "[78, 56, 232, 12, 8]" }
        ]
      }
    }
  },
  {
    id: "disemvowel-trolls",
    title: "Unli Harflarni O'chirish",
    slug: "disemvowel-trolls",
    description: "Sharhlar ichidan barcha unli harflarni (a, e, i, o, u, katta-kichikligidan qat'i nazar) o'chirib tashlang.",
    examples: [
      { input: "'This website is for losers LOL!'", output: "'Ths wbst s fr lsrs LL!'" }
    ],
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "regex"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function disemvowel(str) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function disemvowel(str) {\n  return str.replace(/[aeiou]/gi, '');\n}",
        tests: [
          { input: "console.log(disemvowel('This website is for losers LOL!'))", expected: "Ths wbst s fr lsrs LL!", label: "Losers comment" },
          { input: "console.log(disemvowel('No offense but,\\nYour writing is among the worst I have ever read'))", expected: "N ffns bt,\nYr wrtng s mng th wrst  hv vr rd", label: "Multi-line comment" }
        ]
      }
    }
  },
  {
    id: "descending-order",
    title: "Raqamlarni Kamayish Tartibida Saralash",
    slug: "descending-order",
    description: "Ixtiyoriy musbat butun sonning raqamlarini kamayish tartibida saralab, hosil bo'ladigan eng katta sonni qaytaring.",
    examples: [
      { input: "42145", output: "54421" },
      { input: "145263", output: "654321" },
      { input: "123456789", output: "987654321" }
    ],
    difficulty: 7,
    category: "Math",
    tags: ["math", "sorting"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function descendingOrder(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function descendingOrder(n) {\n  return parseInt(String(n).split('').sort((a, b) => b - a).join(''), 10);\n}",
        tests: [
          { input: "console.log(descendingOrder(42145))", expected: "54421", label: "42145 -> 54421" },
          { input: "console.log(descendingOrder(145263))", expected: "654321", label: "145263 -> 654321" },
          { input: "console.log(descendingOrder(0))", expected: "0", label: "0 -> 0" }
        ]
      }
    }
  },
  {
    id: "highest-and-lowest",
    title: "Eng Katta va Eng Kichik Sonlar",
    slug: "highest-and-lowest",
    description: "Bo'shliq bilan ajratilgan sonlar matnidan eng katta va eng kichik sonni topib, 'katta kichik' ko'rinishida string sifatida qaytaring.",
    examples: [
      { input: "'1 2 3 4 5'", output: "'5 1'" },
      { input: "'1 2 -3 4 5'", output: "'5 -3'" },
      { input: "'1 9 3 4 -5'", output: "'9 -5'" }
    ],
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "math"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function highAndLow(numbers) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function highAndLow(numbers) {\n  const nums = numbers.split(' ').map(Number);\n  return `${Math.max(...nums)} ${Math.min(...nums)}`;\n}",
        tests: [
          { input: "console.log(highAndLow('1 2 3 4 5'))", expected: "5 1", label: "1 2 3 4 5" },
          { input: "console.log(highAndLow('1 2 -3 4 5'))", expected: "5 -3", label: "1 2 -3 4 5" }
        ]
      }
    }
  },
  {
    id: "get-middle-character",
    title: "O'rtadagi Belgini Topish",
    slug: "get-middle-character",
    description: "So'zning uzunligi toq bo'lsa o'rtadagi 1 ta belgini, juft bo'lsa o'rtadagi 2 ta belgini qaytaring.",
    examples: [
      { input: "'test'", output: "'es'" },
      { input: "'testing'", output: "'t'" },
      { input: "'middle'", output: "'dd'" },
      { input: "'A'", output: "'A'" }
    ],
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function getMiddle(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function getMiddle(s) {\n  const mid = Math.floor(s.length / 2);\n  return s.length % 2 === 0 ? s.slice(mid - 1, mid + 1) : s[mid];\n}",
        tests: [
          { input: "console.log(getMiddle('test'))", expected: "es", label: "test -> es" },
          { input: "console.log(getMiddle('testing'))", expected: "t", label: "testing -> t" },
          { input: "console.log(getMiddle('middle'))", expected: "dd", label: "middle -> dd" }
        ]
      }
    }
  },
  {
    id: "mumbling",
    title: "Mumbling (Harflar Ketma-ketligi)",
    slug: "mumbling",
    description: "Har bir harf o'z o'rni (1-index) bo'yicha takrorlanadi, birinchisi katta qolganlari kichik bo'lib '-' bilan ulanadi (masalan 'abcd' -> 'A-Bb-Ccc-Dddd').",
    examples: [
      { input: "'abcd'", output: "'A-Bb-Ccc-Dddd'" },
      { input: "'RqaEzty'", output: "'R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy'" }
    ],
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "formatting"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function accum(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function accum(s) {\n  return s.split('').map((c, i) => c.toUpperCase() + c.toLowerCase().repeat(i)).join('-');\n}",
        tests: [
          { input: "console.log(accum('abcd'))", expected: "A-Bb-Ccc-Dddd", label: "abcd" },
          { input: "console.log(accum('RqaEzty'))", expected: "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy", label: "RqaEzty" }
        ]
      }
    }
  },
  {
    id: "square-every-digit",
    title: "Har Bir Raqamni Kvadratga Oshirish",
    slug: "square-every-digit",
    description: "Sonning har bir raqamini alohida kvadratga oshirib, ularni birlashtirib butun son sifatida qaytaring (masalan, 9119 -> 811181 chunki 9^2=81, 1^2=1).",
    examples: [
      { input: "9119", output: "811181" },
      { input: "3212", output: "9414" }
    ],
    difficulty: 7,
    category: "Math",
    tags: ["math", "numbers"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function squareDigits(num) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function squareDigits(num) {\n  return Number(String(num).split('').map(d => Number(d) ** 2).join(''));\n}",
        tests: [
          { input: "console.log(squareDigits(9119))", expected: "811181", label: "9119 -> 811181" },
          { input: "console.log(squareDigits(3212))", expected: "9414", label: "3212 -> 9414" }
        ]
      }
    }
  },
  {
    id: "find-the-parity-outlier",
    title: "Juft yoki Toq Begonani Topish (Parity Outlier)",
    slug: "find-the-parity-outlier",
    description: "Kamida 3 ta sondan iborat massiv deyarli butunlay juft yoki deyarli butunlay toq sonlardan iborat bo'ladi. Ularning orasidagi yagona begona sonni toping.",
    examples: [
      { input: "[2, 4, 0, 100, 4, 11, 2602, 36]", output: "11" },
      { input: "[160, 3, 1719, 19, 11, 13, -21]", output: "160" }
    ],
    difficulty: 6,
    category: "Arrays",
    tags: ["arrays", "algorithms"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function findOutlier(integers) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function findOutlier(integers) {\n  const evens = integers.filter(n => n % 2 === 0);\n  const odds = integers.filter(n => n % 2 !== 0);\n  return evens.length === 1 ? evens[0] : odds[0];\n}",
        tests: [
          { input: "console.log(findOutlier([2, 4, 0, 100, 4, 11, 2602, 36]))", expected: "11", label: "Odd outlier" },
          { input: "console.log(findOutlier([160, 3, 1719, 19, 11, 13, -21]))", expected: "160", label: "Even outlier" }
        ]
      }
    }
  },
  {
    id: "who-likes-it",
    title: "Kimlar Yoqtirdi? (Who Likes It?)",
    slug: "who-likes-it",
    description: "Ismlar massiviga qarab layk bosganlar matnini hosil qiling:\n[] -> 'no one likes this'\n['Peter'] -> 'Peter likes this'\n['Jacob', 'Alex'] -> 'Jacob and Alex like this'\n['Max', 'John', 'Mark'] -> 'Max, John and Mark like this'\n['Alex', 'Jacob', 'Mark', 'Max'] -> 'Alex, Jacob and 2 others like this'",
    examples: [
      { input: "[]", output: "'no one likes this'" },
      { input: "['Peter']", output: "'Peter likes this'" },
      { input: "['Jacob', 'Alex']", output: "'Jacob and Alex like this'" },
      { input: "['Alex', 'Jacob', 'Mark', 'Max']", output: "'Alex, Jacob and 2 others like this'" }
    ],
    difficulty: 6,
    category: "Strings",
    tags: ["strings", "formatting"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function likes(names) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function likes(names) {\n  const len = names.length;\n  if (len === 0) return 'no one likes this';\n  if (len === 1) return `${names[0]} likes this`;\n  if (len === 2) return `${names[0]} and ${names[1]} like this`;\n  if (len === 3) return `${names[0]}, ${names[1]} and ${names[2]} like this`;\n  return `${names[0]}, ${names[1]} and ${len - 2} others like this`;\n}",
        tests: [
          { input: "console.log(likes([]))", expected: "no one likes this", label: "Empty likes" },
          { input: "console.log(likes(['Peter']))", expected: "Peter likes this", label: "One person" },
          { input: "console.log(likes(['Jacob', 'Alex']))", expected: "Jacob and Alex like this", label: "Two people" },
          { input: "console.log(likes(['Alex', 'Jacob', 'Mark', 'Max']))", expected: "Alex, Jacob and 2 others like this", label: "Four people" }
        ]
      }
    }
  },
  {
    id: "spin-words",
    title: "So'zlarni Aylantirish (Spin Words)",
    slug: "spin-words",
    description: "Matn ichidagi 5 yoki undan ortiq harfdan iborat har bir so'zning harflarini teskari qilib yozing. Bo'shliqlar va kichik so'zlar o'z o'rnida qolsin.",
    examples: [
      { input: "'Hey fellow warriors'", output: "'Hey wollef sroirraw'" },
      { input: "'This is a test'", output: "'This is a test'" },
      { input: "'This is another test'", output: "'This is rehtona test'" }
    ],
    difficulty: 6,
    category: "Strings",
    tags: ["strings", "algorithms"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function spinWords(string) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function spinWords(string) {\n  return string.split(' ').map(w => w.length >= 5 ? w.split('').reverse().join('') : w).join(' ');\n}",
        tests: [
          { input: "console.log(spinWords('Hey fellow warriors'))", expected: "Hey wollef sroirraw", label: "fellow warriors" },
          { input: "console.log(spinWords('This is a test'))", expected: "This is a test", label: "Short words" }
        ]
      }
    }
  },
  {
    id: "tribonacci-sequence",
    title: "Tribonachchi Ketma-ketligi",
    slug: "tribonacci-sequence",
    description: "Har bir keyingi son o'zidan oldingi 3 ta sonning yig'indisiga teng bo'lgan ketma-ketlik. Boshlang'ich 3 ta element [a, b, c] va kerakli elementlar soni n beriladi.",
    examples: [
      { input: "[1, 1, 1], 10", output: "[1, 1, 1, 3, 5, 9, 17, 31, 57, 105]" },
      { input: "[0, 0, 1], 4", output: "[0, 0, 1, 1]" }
    ],
    difficulty: 6,
    category: "Algorithms",
    tags: ["algorithms", "math"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function tribonacci(signature, n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function tribonacci(signature, n) {\n  if (n === 0) return [];\n  if (n <= 3) return signature.slice(0, n);\n  const res = [...signature];\n  for (let i = 3; i < n; i++) {\n    res.push(res[i - 1] + res[i - 2] + res[i - 3]);\n  }\n  return res;\n}",
        tests: [
          { input: "console.log(JSON.stringify(tribonacci([1, 1, 1], 10)))", expected: "[1,1,1,3,5,9,17,31,57,105]", label: "10 elements" },
          { input: "console.log(JSON.stringify(tribonacci([0, 0, 1], 4)))", expected: "[0,0,1,1]", label: "4 elements" }
        ]
      }
    }
  },
  {
    id: "persistent-bugger",
    title: "Ko'paytma Davomiyligi (Persistent Bugger)",
    slug: "persistent-bugger",
    description: "Sonning raqamlarini bir-biriga ko'paytirish jarayonini son 1 xonali songa aylanmaguncha davom ettiring. Buni necha marta takrorlaganingizni qaytaring.",
    examples: [
      { input: "39", output: "3" },
      { input: "999", output: "4" },
      { input: "4", output: "0" }
    ],
    difficulty: 6,
    category: "Math",
    tags: ["math", "recursion"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function persistence(num) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function persistence(num) {\n  let count = 0;\n  while (num >= 10) {\n    num = String(num).split('').reduce((acc, d) => acc * Number(d), 1);\n    count++;\n  }\n  return count;\n}",
        tests: [
          { input: "console.log(persistence(39))", expected: "3", label: "39 -> 3" },
          { input: "console.log(persistence(4))", expected: "0", label: "4 -> 0" },
          { input: "console.log(persistence(999))", expected: "4", label: "999 -> 4" }
        ]
      }
    }
  },
  {
    id: "digital-root",
    title: "Raqamli Ildiz (Digital Root)",
    slug: "digital-root",
    description: "Sonning barcha raqamlari yig'indisini hisoblang. Agar chiqqan natija 1 xonali bo'lmasa, toki 1 xonali son hosil bo'lguncha takrorlang.",
    examples: [
      { input: "16", output: "7" },
      { input: "942", output: "6" },
      { input: "132189", output: "6" }
    ],
    difficulty: 6,
    category: "Math",
    tags: ["math", "algorithms"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function digitalRoot(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function digitalRoot(n) {\n  while (n >= 10) {\n    n = String(n).split('').reduce((acc, d) => acc + Number(d), 0);\n  }\n  return n;\n}",
        tests: [
          { input: "console.log(digitalRoot(16))", expected: "7", label: "16 -> 7" },
          { input: "console.log(digitalRoot(942))", expected: "6", label: "942 -> 6" },
          { input: "console.log(digitalRoot(132189))", expected: "6", label: "132189 -> 6" }
        ]
      }
    }
  },
  {
    id: "rgb-to-hex-conversion",
    title: "RGB dan HEX ga O'tkazish",
    slug: "rgb-to-hex-conversion",
    description: "RGB sonlarini (0-255) 6 ta belgili o'n oltilik (HEX) formatga aylantiring. 0 dan kichik bo'lsa 0 deb, 255 dan katta bo'lsa 255 deb olinsin. Natija doimo 6 ta bosh harfli belgi bo'lishi shart.",
    examples: [
      { input: "255, 255, 255", output: "'FFFFFF'" },
      { input: "255, 255, 300", output: "'FFFFFF'" },
      { input: "0, 0, 0", output: "'000000'" },
      { input: "148, 0, 211", output: "'9400D3'" }
    ],
    difficulty: 5,
    category: "Algorithms",
    tags: ["algorithms", "color"],
    isPremium: false,
    xpReward: 35,
    languages: {
      javascript: {
        initialCode: "function rgb(r, g, b) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function rgb(r, g, b) {\n  const clamp = v => Math.max(0, Math.min(255, v));\n  const toHex = v => clamp(v).toString(16).toUpperCase().padStart(2, '0');\n  return `${toHex(r)}${toHex(g)}${toHex(b)}`;\n}",
        tests: [
          { input: "console.log(rgb(255, 255, 255))", expected: "FFFFFF", label: "White" },
          { input: "console.log(rgb(255, 255, 300))", expected: "FFFFFF", label: "Clamp high" },
          { input: "console.log(rgb(0, 0, 0))", expected: "000000", label: "Black" },
          { input: "console.log(rgb(148, 0, 211))", expected: "9400D3", label: "Violet" }
        ]
      }
    }
  },
  {
    id: "moving-zeros-to-the-end",
    title: "Nollarni Oxiriga Ko'chirish",
    slug: "moving-zeros-to-the-end",
    description: "Massiv ichidagi barcha 0 sonlarini boshqa elementlarning tartibini o'zgartirmasdan massivning oxiriga ko'chiring.",
    examples: [
      { input: "[false, 1, 0, 1, 2, 0, 1, 3, 'a']", output: "[false, 1, 1, 2, 1, 3, 'a', 0, 0]" }
    ],
    difficulty: 5,
    category: "Arrays",
    tags: ["arrays", "algorithms"],
    isPremium: false,
    xpReward: 35,
    languages: {
      javascript: {
        initialCode: "function moveZeros(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function moveZeros(arr) {\n  const nonZeros = arr.filter(x => x !== 0);\n  const zeros = arr.filter(x => x === 0);\n  return nonZeros.concat(zeros);\n}",
        tests: [
          { input: "console.log(JSON.stringify(moveZeros([false, 1, 0, 1, 2, 0, 1, 3, 'a'])))", expected: "[false,1,1,2,1,3,\"a\",0,0]", label: "Mixed array with zeros" }
        ]
      }
    }
  },
  {
    id: "rot13-cipher",
    title: "ROT13 Shifrlash Algoritmi",
    slug: "rot13-cipher",
    description: "Klassik sezar shifrining ROT13 usuli: har bir lotin harfini alifboda 13 ta pozitsiya oldinga suring. Katta-kichik harflar formati saqlanishi kerak. Harf bo'lmagan belgilar o'zgarmaydi.",
    examples: [
      { input: "'test'", output: "'grfg'" },
      { input: "'Test'", output: "'Grfg'" }
    ],
    difficulty: 5,
    category: "Algorithms",
    tags: ["cryptography", "strings"],
    isPremium: false,
    xpReward: 35,
    languages: {
      javascript: {
        initialCode: "function rot13(message) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function rot13(message) {\n  return message.replace(/[a-zA-Z]/g, c => {\n    const code = c.charCodeAt(0);\n    const base = code >= 97 ? 97 : 65;\n    return String.fromCharCode(((code - base + 13) % 26) + base);\n  });\n}",
        tests: [
          { input: "console.log(rot13('test'))", expected: "grfg", label: "test -> grfg" },
          { input: "console.log(rot13('Test'))", expected: "Grfg", label: "Test -> Grfg" }
        ]
      }
    }
  },
  {
    id: "valid-parentheses",
    title: "Qavslar Muvozanatini Tekshirish",
    slug: "valid-parentheses",
    description: "Faqat '(' va ')' qavslaridan iborat matn berilgan. Qavslar tartibi to'g'ri ochilib yopilganligini (true/false) aniqlang.",
    examples: [
      { input: "'()'", output: "true" },
      { input: "')(()))'", output: "false" },
      { input: "'(())((()())())'", output: "true" }
    ],
    difficulty: 5,
    category: "Algorithms",
    tags: ["stack", "algorithms"],
    isPremium: false,
    xpReward: 35,
    languages: {
      javascript: {
        initialCode: "function validParentheses(parens) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function validParentheses(parens) {\n  let balance = 0;\n  for (let c of parens) {\n    if (c === '(') balance++;\n    else if (c === ')') balance--;\n    if (balance < 0) return false;\n  }\n  return balance === 0;\n}",
        tests: [
          { input: "console.log(validParentheses('()'))", expected: "true", label: "Simple pair" },
          { input: "console.log(validParentheses(')(()))'))", expected: "false", label: "Starts closing" },
          { input: "console.log(validParentheses('(())((()())())'))", expected: "true", label: "Complex balanced" }
        ]
      }
    }
  },
  {
    id: "human-readable-duration",
    title: "Vaqtni O'qishli Formatga O'tkazish",
    slug: "human-readable-duration",
    description: "Soniyalarni yillar (years), kunlar (days), soatlar (hours), daqiqalar (minutes) va soniyalar (seconds) ko'rinishida formatlang. 0 soniya 'now' deb qaytarilsin.",
    examples: [
      { input: "62", output: "'1 minute and 2 seconds'" },
      { input: "3662", output: "'1 hour, 1 minute and 2 seconds'" }
    ],
    difficulty: 4,
    category: "Algorithms",
    tags: ["formatting", "time"],
    isPremium: true,
    xpReward: 50,
    languages: {
      javascript: {
        initialCode: "function formatDuration(seconds) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function formatDuration(seconds) {\n  if (seconds === 0) return 'now';\n  const units = [\n    { name: 'year', secs: 365 * 24 * 3600 },\n    { name: 'day', secs: 24 * 3600 },\n    { name: 'hour', secs: 3600 },\n    { name: 'minute', secs: 60 },\n    { name: 'second', secs: 1 }\n  ];\n  const parts = [];\n  for (let u of units) {\n    if (seconds >= u.secs) {\n      const val = Math.floor(seconds / u.secs);\n      seconds %= u.secs;\n      parts.push(`${val} ${u.name}${val > 1 ? 's' : ''}`);\n    }\n  }\n  if (parts.length === 1) return parts[0];\n  return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];\n}",
        tests: [
          { input: "console.log(formatDuration(0))", expected: "now", label: "0 -> now" },
          { input: "console.log(formatDuration(62))", expected: "1 minute and 2 seconds", label: "62 seconds" },
          { input: "console.log(formatDuration(3662))", expected: "1 hour, 1 minute and 2 seconds", label: "3662 seconds" }
        ]
      }
    }
  },
  {
    id: "snail-sort",
    title: "Snail Sort (Spiral Saralash)",
    slug: "snail-sort",
    description: "N x N o'lchamli matritsani yuqori-chap burchakdan boshlab soat millari yo'nalishi bo'yicha markazgacha spiral aylanib, 1 o'lchamli massiv qilib qaytaring.",
    examples: [
      { input: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]", output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]" }
    ],
    difficulty: 4,
    category: "Algorithms",
    tags: ["matrix", "algorithms"],
    isPremium: true,
    xpReward: 50,
    languages: {
      javascript: {
        initialCode: "function snail(array) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function snail(array) {\n  const res = [];\n  while (array.length) {\n    res.push(...array.shift());\n    for (let i = 0; i < array.length; i++) {\n      res.push(array[i].pop());\n    }\n    if (array.length) {\n      res.push(...(array.pop().reverse()));\n    }\n    for (let i = array.length - 1; i >= 0; i--) {\n      res.push(array[i].shift());\n    }\n  }\n  return res;\n}",
        tests: [
          { input: "console.log(JSON.stringify(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]])))", expected: "[1,2,3,6,9,8,7,4,5]", label: "3x3 matrix" }
        ]
      }
    }
  },
  {
    id: "range-extraction",
    title: "Oraliqlar Formatini Ajratish (Range Extraction)",
    slug: "range-extraction",
    description: "O'sish tartibidagi butun sonlar ro'yxatida ketma-ket kelgan kamida 3 ta sonni 'boshlanish-tugash' ko'rinishida ixchamlashtirib, vergul bilan ajratilgan matn qilib qaytaring.",
    examples: [
      { input: "[-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]", output: "'-6,-3-1,3-5,7-11,14,15,17-20'" }
    ],
    difficulty: 4,
    category: "Algorithms",
    tags: ["algorithms", "strings"],
    isPremium: true,
    xpReward: 50,
    languages: {
      javascript: {
        initialCode: "function rangeExtraction(list) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function rangeExtraction(list) {\n  const res = [];\n  for (let i = 0; i < list.length; i++) {\n    let j = i;\n    while (j < list.length - 1 && list[j + 1] === list[j] + 1) {\n      j++;\n    }\n    if (j - i >= 2) {\n      res.push(`${list[i]}-${list[j]}`);\n      i = j;\n    } else {\n      res.push(String(list[i]));\n    }\n  }\n  return res.join(',');\n}",
        tests: [
          { input: "console.log(rangeExtraction([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]))", expected: "-6,-3-1,3-5,7-11,14,15,17-20", label: "Complex ranges" }
        ]
      }
    }
  }
];

// TEST ALL NEW KATAS
console.log('\n--- TESTING ALL NEW KATAS ---');
let allPassed = true;
for (const kata of newKatas) {
  const js = kata.languages.javascript;
  for (const test of js.tests) {
    let output = '';
    const mockConsole = {
      log: (...args) => {
        output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
      }
    };
    try {
      const fn = new Function('console', `${js.solution}\n${test.input}`);
      fn(mockConsole);
      const actual = output.trim();
      if (actual !== test.expected) {
        console.error(`FAIL: ${kata.id} - test: ${test.label}`);
        console.error(`  Expected: ${test.expected}, Got: ${actual}`);
        allPassed = false;
      }
    } catch (err) {
      console.error(`ERROR: ${kata.id} - ${err.message}`);
      allPassed = false;
    }
  }
}

if (!allPassed) {
  console.error('Some kata tests failed! Aborting.');
  process.exit(1);
}
console.log('ALL 27 NEW KATAS PASSED VERIFICATION SUITE!');

// MERGE KATAS
const existingIds = new Set(existingKatas.map(k => k.id));
let addedCount = 0;
for (const k of newKatas) {
  if (!existingIds.has(k.id)) {
    existingKatas.push(k);
    addedCount++;
  }
}
console.log(`Added ${addedCount} new katas. Total Katas: ${existingKatas.length}`);
fs.writeFileSync(KATA_FILE, JSON.stringify(existingKatas, null, 2), 'utf8');

// EXPAND COURSES
// 1. Python course (py-07 to py-10)
const pyCourse = existingCourses.find(c => c.id === 'python-basics');
if (pyCourse) {
  const existingLessonIds = new Set(pyCourse.lessons.map(l => l.id));
  const newPyLessons = [
    {
      id: "py-07",
      order: 7,
      title: "Ro'yxatlar (Lists) bilan Ishlash",
      xpReward: 30,
      theory: "### Python Ro'yxatlari (Lists) 📋\n\nRo'yxatlar bir nechta qiymatni bitta o'zgaruvchida saqlash imkonini beradi. Ular kvadrat qavs `[...]` bilan yaratiladi.\n\n```python\nmevalar = [\"olma\", \"banan\", \"shaftoli\"]\nmevalar.append(\"anor\")  # yangi element qo'shish\nprint(len(mevalar))     # ro'yxat uzunligi (4)\n```",
      task: "Konsolga `['Python', 'JavaScript', 'Go']` ro'yxatini chiqaring.",
      hints: ["Kvadrat qavs ichida elementlarni vergul bilan yozing.", "print(['Python', 'JavaScript', 'Go'])"],
      initialCode: "# Ro'yxatni konsolga chiqaring:\n",
      expectedOutput: "['Python', 'JavaScript', 'Go']",
      tests: [{ type: "output", expected: "['Python', 'JavaScript', 'Go']", label: "Ro'yxat konsolga to'g'ri chiqishi kerak" }],
      solution: "print(['Python', 'JavaScript', 'Go'])\n"
    },
    {
      id: "py-08",
      order: 8,
      title: "For Sikli va range()",
      xpReward: 35,
      theory: "### For Sikli 🔄\n\nBiror amalni takrorlash uchun Pythonda `for` siklidan foydalaniladi. `range(n)` funksiyasi 0 dan n-1 gacha bo'lgan sonlar ketma-ketligini hosil qiladi.\n\n```python\nfor i in range(3):\n    print(i) # 0, 1, 2 ni chiqaradi\n```",
      task: "For sikli yordamida 1 dan 3 gacha bo'lgan sonlarni (1, 2, 3) alohida qatorlarda chiqaring.",
      hints: ["range(1, 4) dan foydalaning.", "for son in range(1, 4): print(son)"],
      initialCode: "# 1 dan 3 gacha sonlarni for siklida chiqaring:\n",
      expectedOutput: "1\n2\n3",
      tests: [{ type: "output", expected: "1\n2\n3", label: "1, 2, 3 alohida qatorlarda chiqishi kerak" }],
      solution: "for i in range(1, 4):\n    print(i)\n"
    },
    {
      id: "py-09",
      order: 9,
      title: "Lug'atlar (Dictionaries) bilan Ishlash",
      xpReward: 35,
      theory: "### Python Lug'atlari (Dict) 📖\n\nLug'atlar kalit-qiymat (key-value) juftliklarini jingalak qavs `{...}` ichida saqlaydi.\n\n```python\ntalaba = {\"ism\": \"Ali\", \"yosh\": 20}\nprint(talaba[\"ism\"]) # Ali\n```",
      task: "Ismi 'CodeDuel' bo'lgan lug'at yarating va uning 'ism' kalitidagi qiymatini konsolga chiqaring.",
      hints: ["lugat = {'ism': 'CodeDuel'}", "print(lugat['ism'])"],
      initialCode: "# Lug'at tuzing va 'ism' qiymatini chiqaring:\n",
      expectedOutput: "CodeDuel",
      tests: [{ type: "output", expected: "CodeDuel", label: "Konsolga 'CodeDuel' chiqishi kerak" }],
      solution: "platform = {'ism': 'CodeDuel'}\nprint(platform['ism'])\n"
    },
    {
      id: "py-10",
      order: 10,
      title: "Funksiyalar va return Operator",
      xpReward: 40,
      theory: "### Funksiyalar (Functions) ⚙️\n\nPythonda funksiya `def` kalit so'zi orqali e'lon qilinadi va qiymat qaytarish uchun `return` ishlatiladi.\n\n```python\ndef kvadrat(son):\n    return son * son\n\nprint(kvadrat(5)) # 25\n```",
      task: "Ikkita sonni qo'shib natijani qaytaruvchi `qoshish(a, b)` funksiyasini yozing va `print(qoshish(10, 20))` ni ekranga chiqaring.",
      hints: ["def qoshish(a, b): return a + b", "print(qoshish(10, 20))"],
      initialCode: "# qoshish funksiyasini yozing va qoshish(10, 20) ni chiqaring:\n",
      expectedOutput: "30",
      tests: [{ type: "output", expected: "30", label: "Konsolga 30 chiqishi kerak" }],
      solution: "def qoshish(a, b):\n    return a + b\n\nprint(qoshish(10, 20))\n"
    }
  ];
  for (const l of newPyLessons) {
    if (!existingLessonIds.has(l.id)) pyCourse.lessons.push(l);
  }
}

// 2. JavaScript Mastery (js-07 to js-10)
const jsCourse = existingCourses.find(c => c.id === 'javascript-mastery');
if (jsCourse) {
  const existingLessonIds = new Set(jsCourse.lessons.map(l => l.id));
  const newJsLessons = [
    {
      id: "js-07",
      order: 7,
      title: "Massiv Metodlari: .map() va .filter()",
      xpReward: 35,
      theory: "### Zamonaviy Massiv Metodlari ⚡\n\n`.map()` har bir elementni o'zgartiradi, `.filter()` esa shartga mos keluvchi elementlarni tanlab oladi.\n\n```js\nconst sonlar = [1, 2, 3, 4];\nconst juftlar = sonlar.filter(n => n % 2 === 0);\nconsole.log(juftlar); // [2, 4]\n```",
      task: "[1, 2, 3, 4] massividagi har bir sonni 2 ga ko'paytirib `.map()` orqali yangi massivni konsolga chiqaring.",
      hints: ["sonlar.map(n => n * 2)", "console.log(sonlar.map(n => n * 2))"],
      initialCode: "// [1, 2, 3, 4] ni .map() orqali 2 ga ko'paytiring va konsolga chiqaring:\n",
      expectedOutput: "[2,4,6,8]",
      tests: [{ type: "output", expected: "[2,4,6,8]", label: "[2, 4, 6, 8] konsolga chiqishi kerak" }],
      solution: "const sonlar = [1, 2, 3, 4];\nconsole.log(JSON.stringify(sonlar.map(n => n * 2)));\n"
    },
    {
      id: "js-08",
      order: 8,
      title: "Destrukturizatsiya va Spread Operator",
      xpReward: 35,
      theory: "### Destructuring & Spread (...) 📦\n\nObyekt yoki massivdan kerakli qiymatlarni oson ajratib olish:\n\n```js\nconst user = { name: 'Ali', role: 'Dev' };\nconst { name } = user;\n\nconst arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]\n```",
      task: "Ikkita massivni `[1, 2]` va `[3, 4]` spread operatori `...` yordamida birlashtirib konsolga chiqaring.",
      hints: ["const res = [...[1, 2], ...[3, 4]];", "console.log(JSON.stringify(res))"],
      initialCode: "// Spread operatori orqali ikkita massivni birlashtiring:\n",
      expectedOutput: "[1,2,3,4]",
      tests: [{ type: "output", expected: "[1,2,3,4]", label: "[1, 2, 3, 4] konsolga chiqishi kerak" }],
      solution: "const a = [1, 2];\nconst b = [3, 4];\nconsole.log(JSON.stringify([...a, ...b]));\n"
    },
    {
      id: "js-09",
      order: 9,
      title: "Asinxron Dasturlash: Promises va Async / Await",
      xpReward: 40,
      theory: "### Async / Await va Promises ⏳\n\nServerdan ma'lumot olish yoki kechikuvchi amallarni kutish uchun `async` va `await` ishlatiladi.\n\n```js\nasync function getData() {\n  return 'Ma\\'lumot yuklandi';\n}\n```",
      task: "Quyidagi `async` funksiya natijasini `console.log('Yuklandi')` ko'rinishida konsolga chiqaring.",
      hints: ["console.log('Yuklandi')"],
      initialCode: "// Konsolga 'Yuklandi' matnini chiqaring:\n",
      expectedOutput: "Yuklandi",
      tests: [{ type: "output", expected: "Yuklandi", label: "'Yuklandi' konsolga chiqishi kerak" }],
      solution: "console.log('Yuklandi');\n"
    }
  ];
  for (const l of newJsLessons) {
    if (!existingLessonIds.has(l.id)) jsCourse.lessons.push(l);
  }
}

// 3. HTML & CSS Web Development (web-06 to web-08)
const webCourse = existingCourses.find(c => c.id === 'web-dev-basics');
if (webCourse) {
  const existingLessonIds = new Set(webCourse.lessons.map(l => l.id));
  const newWebLessons = [
    {
      id: "web-06",
      order: 6,
      title: "CSS Flexbox: Markazlashtirish",
      xpReward: 35,
      theory: "### CSS Flexbox 📐\n\nElementlarni markazga tekislash uchun eng mashhur usul:\n\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n```",
      task: "Konsolga `display: flex` matnini chiqaring.",
      hints: ["console.log('display: flex')"],
      initialCode: "// Konsolga 'display: flex' matnini chiqaring:\n",
      expectedOutput: "display: flex",
      tests: [{ type: "output", expected: "display: flex", label: "'display: flex' chiqishi kerak" }],
      solution: "console.log('display: flex');\n"
    },
    {
      id: "web-07",
      order: 7,
      title: "CSS Grid: 2-O'lchamli Setkalar",
      xpReward: 35,
      theory: "### CSS Grid ▦\n\nUstun va qatorlardan iborat kuchli setka maketi:\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n```",
      task: "Konsolga `display: grid` matnini chiqaring.",
      hints: ["console.log('display: grid')"],
      initialCode: "// Konsolga 'display: grid' matnini chiqaring:\n",
      expectedOutput: "display: grid",
      tests: [{ type: "output", expected: "display: grid", label: "'display: grid' chiqishi kerak" }],
      solution: "console.log('display: grid');\n"
    }
  ];
  for (const l of newWebLessons) {
    if (!existingLessonIds.has(l.id)) webCourse.lessons.push(l);
  }
}

// 4. Algoritmlar (algo-06 to algo-07)
const algoCourse = existingCourses.find(c => c.id === 'algorithms-ds');
if (algoCourse) {
  const existingLessonIds = new Set(algoCourse.lessons.map(l => l.id));
  const newAlgoLessons = [
    {
      id: "algo-06",
      order: 6,
      title: "Binary Search (Ikkilik Qidiruv) Algoritmi",
      xpReward: 45,
      theory: "### Ikkilik Qidiruv (Binary Search) 🔍\n\nSaralangan massivda elementni O(log N) vaqtda topish algoritmi. Har safar qidiruv doirasi teng 2 ga bo'linadi.",
      task: "Saralangan `[1, 3, 5, 7, 9]` massivida 7 sonining indeksini (3) konsolga chiqaring.",
      hints: ["console.log(3)"],
      initialCode: "// 7 sonining massivdagi indeksini chiqaring:\n",
      expectedOutput: "3",
      tests: [{ type: "output", expected: "3", label: "Indeks 3 chiqishi kerak" }],
      solution: "console.log(3);\n"
    },
    {
      id: "algo-07",
      order: 7,
      title: "Stack (Stek) Ma'lumotlar Tuzilmasi (LIFO)",
      xpReward: 40,
      theory: "### Stack (LIFO: Last In, First Out) 🥞\n\nOxirgi kirgan element birinchi chiqadi. Masalan, brauzerning 'Orqaga' (Back) tugmasi stek asosida ishlaydi.",
      task: "Konsolga `LIFO` matnini chiqaring.",
      hints: ["console.log('LIFO')"],
      initialCode: "// Konsolga 'LIFO' matnini chiqaring:\n",
      expectedOutput: "LIFO",
      tests: [{ type: "output", expected: "LIFO", label: "'LIFO' chiqishi kerak" }],
      solution: "console.log('LIFO');\n"
    }
  ];
  for (const l of newAlgoLessons) {
    if (!existingLessonIds.has(l.id)) algoCourse.lessons.push(l);
  }
}

// 5. Add Brand-New 6th Course: TypeScript Basics
const hasTs = existingCourses.some(c => c.id === 'typescript-basics');
if (!hasTs) {
  existingCourses.push({
    id: "typescript-basics",
    title: "TypeScript Dasturlash Asoslari",
    slug: "typescript-basics",
    description: "Katta loyihalar va xavfsiz kod yozish uchun Microsoft tomonidan yaratilgan tip xavfsiz dasturlash tili.",
    icon: "🔷",
    color: "#3178c6",
    gradient: "linear-gradient(135deg, #3178c6 0%, #2563eb 100%)",
    level: "6 kyu (O'rta)",
    levelKyu: "kyu-6",
    language: "typescript",
    totalXp: 300,
    lessons: [
      {
        id: "ts-01",
        order: 1,
        title: "TypeScript Nima va Statik Tiplash",
        xpReward: 30,
        theory: "### TypeScript ga Xush Kelibsiz! 🔷\n\nTypeScript — bu JavaScript ustiga qurilgan va o'zgaruvchilar, funksiyalar va obyektlar uchun tiplar (types) kirituvchi kuchli dasturlash tili.\n\n```ts\nlet ism: string = \"Ali\";\nlet yosh: number = 25;\nlet faol: boolean = true;\n```",
        task: "Konsolga `Hello TypeScript` matnini chiqaring.",
        hints: ["console.log('Hello TypeScript')"],
        initialCode: "// Konsolga 'Hello TypeScript' matnini chiqaring:\n",
        expectedOutput: "Hello TypeScript",
        tests: [{ type: "output", expected: "Hello TypeScript", label: "'Hello TypeScript' chiqishi kerak" }],
        solution: "console.log('Hello TypeScript');\n"
      },
      {
        id: "ts-02",
        order: 2,
        title: "Interfeyslar (Interfaces) bilan Obyektlarni Modellashtirish",
        xpReward: 35,
        theory: "### Interfaces 📋\n\nObyektlarning qanday xususiyatlarga ega bo'lishini belgilash uchun `interface` ishlatiladi:\n\n```ts\ninterface User {\n  id: number;\n  name: string;\n  isAdmin?: boolean; // ixtiyoriy\n}\n```",
        task: "Konsolga `interface User` matnini chiqaring.",
        hints: ["console.log('interface User')"],
        initialCode: "// Konsolga 'interface User' chiqaring:\n",
        expectedOutput: "interface User",
        tests: [{ type: "output", expected: "interface User", label: "'interface User' chiqishi kerak" }],
        solution: "console.log('interface User');\n"
      },
      {
        id: "ts-03",
        order: 3,
        title: "Union Tiplar va Type Aliases",
        xpReward: 35,
        theory: "### Union Tiplar (|) 🔀\n\nO'zgaruvchi bir nechta tipda bo'lishi mumkinligini ifodalash:\n\n```ts\ntype ID = string | number;\nlet userId: ID = 101;\nuserId = \"UUID-1234\";\n```",
        task: "Konsolga `string | number` matnini chiqaring.",
        hints: ["console.log('string | number')"],
        initialCode: "// Konsolga 'string | number' chiqaring:\n",
        expectedOutput: "string | number",
        tests: [{ type: "output", expected: "string | number", label: "'string | number' chiqishi kerak" }],
        solution: "console.log('string | number');\n"
      },
      {
        id: "ts-04",
        order: 4,
        title: "Generics: Moslashuvchan va Qayta Ishlatiluvchi Kod",
        xpReward: 40,
        theory: "### Generics (<T>) 🧬\n\nTurli xil ma'lumot turlari bilan ishlay oluvchi universal funksiyalar:\n\n```ts\nfunction getFirst<T>(arr: T[]): T {\n  return arr[0];\n}\n```",
        task: "Konsolga `<T>` matnini chiqaring.",
        hints: ["console.log('<T>')"],
        initialCode: "// Konsolga '<T>' chiqaring:\n",
        expectedOutput: "<T>",
        tests: [{ type: "output", expected: "<T>", label: "'<T>' chiqishi kerak" }],
        solution: "console.log('<T>');\n"
      }
    ]
  });
}

// Recalculate total XP and lessons count for all courses
for (const course of existingCourses) {
  course.totalXp = course.lessons.reduce((sum, l) => sum + (l.xpReward || 25), 0);
}

fs.writeFileSync(COURSES_FILE, JSON.stringify(existingCourses, null, 2), 'utf8');
console.log('Saved courses! Total courses now:', existingCourses.length);
console.log('Total lessons now:', existingCourses.reduce((sum, c) => sum + c.lessons.length, 0));
existingCourses.forEach(c => console.log(`  - ${c.title} (${c.language}): ${c.lessons.length} lessons`));
