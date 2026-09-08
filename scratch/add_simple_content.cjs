const fs = require('fs');
const path = require('path');

const KATA_FILE = path.join(__dirname, '../data/kata.json');
const COURSES_FILE = path.join(__dirname, '../data/courses.json');

const katas = JSON.parse(fs.readFileSync(KATA_FILE, 'utf8'));
const courses = JSON.parse(fs.readFileSync(COURSES_FILE, 'utf8'));

const existingIds = new Set(katas.map(k => k.id));

// ============================================================
// 25 NEW SIMPLE (8 KYU & 7 KYU) KATAS
// ============================================================
const newKatas = [
  {
    id: "square-number",
    title: "Sonning Kvadratini Topish",
    slug: "square-number",
    description: `### 🎯 Masala Maqsadi:
Berilgan ixtiyoriy butun yoki o'nlik sonning kvadratini ($n^2$) hisoblovchi \`square\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`n\` *(Number)*: Berilgan son.

### 📤 Qaytariladigan Natija:
- *(Number)*: Sonning kvadrati.

### 💡 Misollar:
\`\`\`javascript
square(3)  // 9
square(-4) // 16
square(0)  // 0
\`\`\``,
    examples: [
      { input: "3", output: "9" },
      { input: "-4", output: "16" },
      { input: "0", output: "0" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function square(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function square(n) {\n  return n * n;\n}",
        tests: [
          { input: "console.log(square(3))", expected: "9", label: "square(3)" },
          { input: "console.log(square(-4))", expected: "16", label: "square(-4)" },
          { input: "console.log(square(0))", expected: "0", label: "square(0)" },
          { input: "console.log(square(12))", expected: "144", label: "square(12)" }
        ]
      },
      python: {
        initialCode: "def square(n):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def square(n):\n    return n * n",
        tests: [
          { input: "print(square(3))", expected: "9", label: "square(3)" },
          { input: "print(square(-4))", expected: "16", label: "square(-4)" },
          { input: "print(square(0))", expected: "0", label: "square(0)" },
          { input: "print(square(12))", expected: "144", label: "square(12)" }
        ]
      }
    }
  },
  {
    id: "cube-number",
    title: "Sonning Kubini Hisoblash",
    slug: "cube-number",
    description: `### 🎯 Masala Maqsadi:
Berilgan sonning kubini ($n^3$) hisoblab beruvchi \`cube\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`n\` *(Number)*: Butun son.

### 📤 Qaytariladigan Natija:
- *(Number)*: Sonning kub darajasi.

### 💡 Misollar:
\`\`\`javascript
cube(2)  // 8
cube(3)  // 27
cube(-2) // -8
\`\`\``,
    examples: [
      { input: "2", output: "8" },
      { input: "3", output: "27" },
      { input: "-2", output: "-8" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function cube(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function cube(n) {\n  return n ** 3;\n}",
        tests: [
          { input: "console.log(cube(2))", expected: "8", label: "cube(2)" },
          { input: "console.log(cube(3))", expected: "27", label: "cube(3)" },
          { input: "console.log(cube(-2))", expected: "-8", label: "cube(-2)" },
          { input: "console.log(cube(10))", expected: "1000", label: "cube(10)" }
        ]
      },
      python: {
        initialCode: "def cube(n):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def cube(n):\n    return n ** 3",
        tests: [
          { input: "print(cube(2))", expected: "8", label: "cube(2)" },
          { input: "print(cube(3))", expected: "27", label: "cube(3)" },
          { input: "print(cube(-2))", expected: "-8", label: "cube(-2)" }
        ]
      }
    }
  },
  {
    id: "celsius-to-fahrenheit",
    title: "Tselsiydan Farengeytga O'tkazish",
    slug: "celsius-to-fahrenheit",
    description: `### 🎯 Masala Maqsadi:
Haroratni Selsiy (°C) darajasidan Farengeyt (°F) darajasiga aylantiruvchi \`cToF\` funksiyasini yozing.
Formula: $F = C \\times 1.8 + 32$.

### 📥 Kiruvchi Parametrlar:
- \`c\` *(Number)*: Harorat Selsiyda.

### 📤 Qaytariladigan Natija:
- *(Number)*: Harorat Farengeytda.

### 💡 Misollar:
\`\`\`javascript
cToF(0)   // 32
cToF(100) // 212
cToF(-40) // -40
\`\`\``,
    examples: [
      { input: "0", output: "32" },
      { input: "100", output: "212" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function cToF(c) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function cToF(c) {\n  return c * 1.8 + 32;\n}",
        tests: [
          { input: "console.log(cToF(0))", expected: "32", label: "0 C -> 32 F" },
          { input: "console.log(cToF(100))", expected: "212", label: "100 C -> 212 F" },
          { input: "console.log(cToF(-40))", expected: "-40", label: "-40 C -> -40 F" }
        ]
      },
      python: {
        initialCode: "def c_to_f(c):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def c_to_f(c):\n    return int(c * 1.8 + 32) if (c * 1.8 + 32).is_integer() else c * 1.8 + 32",
        tests: [
          { input: "print(c_to_f(0))", expected: "32", label: "0 C -> 32 F" },
          { input: "print(c_to_f(100))", expected: "212", label: "100 C -> 212 F" },
          { input: "print(c_to_f(-40))", expected: "-40", label: "-40 C -> -40 F" }
        ]
      }
    }
  },
  {
    id: "filter-odd-numbers",
    title: "Toq Sonlarni Ajratish",
    slug: "filter-odd-numbers",
    description: `### 🎯 Masala Maqsadi:
Berilgan sonlar massividan faqat toq sonlarni ajratib, yangi massiv sifatida qaytaruvchi \`getOdds\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`arr\` *(Array of Numbers)*: Sonlar massivi.

### 📤 Qaytariladigan Natija:
- *(Array)*: Faqat toq sonlar ro'yxati.

### 💡 Misollar:
\`\`\`javascript
getOdds([1, 2, 3, 4, 5]) // [1, 3, 5]
getOdds([2, 4, 6])       // []
\`\`\``,
    examples: [
      { input: "[1, 2, 3, 4, 5]", output: "[1, 3, 5]" },
      { input: "[2, 4, 6]", output: "[]" }
    ],
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function getOdds(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function getOdds(arr) {\n  return arr.filter(n => n % 2 !== 0);\n}",
        tests: [
          { input: "console.log(JSON.stringify(getOdds([1, 2, 3, 4, 5])))", expected: "[1,3,5]", label: "[1,2,3,4,5] -> [1,3,5]" },
          { input: "console.log(JSON.stringify(getOdds([2, 4, 6])))", expected: "[]", label: "Juftlar -> []" },
          { input: "console.log(JSON.stringify(getOdds([7, 9, 11])))", expected: "[7,9,11]", label: "Faqat toqlar" }
        ]
      },
      python: {
        initialCode: "def get_odds(arr):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def get_odds(arr):\n    return [n for n in arr if n % 2 != 0]",
        tests: [
          { input: "import json; print(json.dumps(get_odds([1, 2, 3, 4, 5])))", expected: "[1, 3, 5]", label: "[1,2,3,4,5]" },
          { input: "import json; print(json.dumps(get_odds([2, 4, 6])))", expected: "[]", label: "[]" }
        ]
      }
    }
  },
  {
    id: "calculate-average",
    title: "Massivning O'rtacha Qiymati",
    slug: "calculate-average",
    description: `### 🎯 Masala Maqsadi:
Berilgan sonlar massividagi barcha elementlarning o'rtacha arifmetik qiymatini hisoblovchi \`findAverage\` funksiyasini yozing. Agar massiv bo'sh bo'lsa, \`0\` qaytaring.

### 📥 Kiruvchi Parametrlar:
- \`arr\` *(Array of Numbers)*: Sonlar massivi.

### 📤 Qaytariladigan Natija:
- *(Number)*: O'rtacha arifmetik son.

### 💡 Misollar:
\`\`\`javascript
findAverage([1, 2, 3, 4, 5]) // 3
findAverage([10, 20])        // 15
findAverage([])              // 0
\`\`\``,
    examples: [
      { input: "[1, 2, 3, 4, 5]", output: "3" },
      { input: "[10, 20]", output: "15" },
      { input: "[]", output: "0" }
    ],
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "math"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function findAverage(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function findAverage(arr) {\n  if (!arr || arr.length === 0) return 0;\n  return arr.reduce((sum, n) => sum + n, 0) / arr.length;\n}",
        tests: [
          { input: "console.log(findAverage([1, 2, 3, 4, 5]))", expected: "3", label: "[1,2,3,4,5] -> 3" },
          { input: "console.log(findAverage([10, 20]))", expected: "15", label: "[10,20] -> 15" },
          { input: "console.log(findAverage([]))", expected: "0", label: "Bo'sh massiv -> 0" }
        ]
      },
      python: {
        initialCode: "def find_average(arr):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def find_average(arr):\n    return sum(arr) / len(arr) if arr else 0",
        tests: [
          { input: "print(int(find_average([1, 2, 3, 4, 5])))", expected: "3", label: "avg [1..5]" },
          { input: "print(int(find_average([10, 20])))", expected: "15", label: "avg [10,20]" },
          { input: "print(find_average([]))", expected: "0", label: "empty" }
        ]
      }
    }
  },
  {
    id: "double-array-elements",
    title: "Elementlarni 2 Barobar Oshirish",
    slug: "double-array-elements",
    description: `### 🎯 Masala Maqsadi:
Berilgan sonlar massivining har bir elementini 2 ga ko'paytirib, yangi massiv hosil qiluvchi \`doubleArray\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`arr\` *(Array of Numbers)*: Sonlar massivi.

### 📤 Qaytariladigan Natija:
- *(Array)*: Har bir elementi 2 barobar oshirilgan yangi massiv.

### 💡 Misollar:
\`\`\`javascript
doubleArray([1, 2, 3])  // [2, 4, 6]
doubleArray([-2, 0, 5]) // [-4, 0, 10]
\`\`\``,
    examples: [
      { input: "[1, 2, 3]", output: "[2, 4, 6]" },
      { input: "[-2, 0, 5]", output: "[-4, 0, 10]" }
    ],
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function doubleArray(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function doubleArray(arr) {\n  return arr.map(n => n * 2);\n}",
        tests: [
          { input: "console.log(JSON.stringify(doubleArray([1, 2, 3])))", expected: "[2,4,6]", label: "[1,2,3] -> [2,4,6]" },
          { input: "console.log(JSON.stringify(doubleArray([-2, 0, 5])))", expected: "[-4,0,10]", label: "Manfiy va 0" },
          { input: "console.log(JSON.stringify(doubleArray([])))", expected: "[]", label: "Bo'sh massiv" }
        ]
      },
      python: {
        initialCode: "def double_array(arr):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def double_array(arr):\n    return [n * 2 for n in arr]",
        tests: [
          { input: "import json; print(json.dumps(double_array([1, 2, 3])))", expected: "[2, 4, 6]", label: "[1,2,3]" },
          { input: "import json; print(json.dumps(double_array([])))", expected: "[]", label: "[]" }
        ]
      }
    }
  },
  {
    id: "is-palindrome-string",
    title: "Palindrom Matn Tekshiruvi",
    slug: "is-palindrome-string",
    description: `### 🎯 Masala Maqsadi:
Berilgan matn chapdan o'ngga ham, o'ngdan chapga ham bir xil o'qiladimi (palindrommi) yo'qmi ekanligini tekshiruvchi \`isPalindrome\` funksiyasini yozing. Katta-kichik harflar farq qilmasligi kerak.

### 📥 Kiruvchi Parametrlar:
- \`str\` *(String)*: Tekshiriluvchi matn.

### 📤 Qaytariladigan Natija:
- *(Boolean)*: Agar palindrom bo'lsa \`true\`, aks holda \`false\`.

### 💡 Misollar:
\`\`\`javascript
isPalindrome("aziza") // true
isPalindrome("Madam") // true
isPalindrome("Salom") // false
\`\`\``,
    examples: [
      { input: "'aziza'", output: "true" },
      { input: "'Madam'", output: "true" },
      { input: "'Salom'", output: "false" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function isPalindrome(str) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isPalindrome(str) {\n  const s = str.toLowerCase();\n  return s === s.split('').reverse().join('');\n}",
        tests: [
          { input: "console.log(isPalindrome('aziza'))", expected: "true", label: "'aziza' -> true" },
          { input: "console.log(isPalindrome('Madam'))", expected: "true", label: "'Madam' -> true" },
          { input: "console.log(isPalindrome('Salom'))", expected: "false", label: "'Salom' -> false" },
          { input: "console.log(isPalindrome('radar'))", expected: "true", label: "'radar' -> true" }
        ]
      },
      python: {
        initialCode: "def is_palindrome(s):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def is_palindrome(s):\n    s_clean = s.lower()\n    return s_clean == s_clean[::-1]",
        tests: [
          { input: "print(str(is_palindrome('aziza')).lower())", expected: "true", label: "aziza" },
          { input: "print(str(is_palindrome('Madam')).lower())", expected: "true", label: "Madam" },
          { input: "print(str(is_palindrome('Salom')).lower())", expected: "false", label: "Salom" }
        ]
      }
    }
  },
  {
    id: "find-minimum-number",
    title: "Massivdagi Eng Kichik Son",
    slug: "find-minimum-number",
    description: `### 🎯 Masala Maqsadi:
Berilgan sonlar massividan qiymat jihatidan eng kichik (minimal) bo'lgan elementni topuvchi \`findMin\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`arr\` *(Array of Numbers)*: Bo'sh bo'lmagan sonlar ro'yxati.

### 📤 Qaytariladigan Natija:
- *(Number)*: Eng kichik son.

### 💡 Misollar:
\`\`\`javascript
findMin([5, 2, 9, 1, 7]) // 1
findMin([-10, 0, 10])   // -10
\`\`\``,
    examples: [
      { input: "[5, 2, 9, 1, 7]", output: "1" },
      { input: "[-10, 0, 10]", output: "-10" }
    ],
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "math"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function findMin(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function findMin(arr) {\n  return Math.min(...arr);\n}",
        tests: [
          { input: "console.log(findMin([5, 2, 9, 1, 7]))", expected: "1", label: "[5,2,9,1,7] -> 1" },
          { input: "console.log(findMin([-10, 0, 10]))", expected: "-10", label: "[-10, 0, 10] -> -10" },
          { input: "console.log(findMin([42]))", expected: "42", label: "[42] -> 42" }
        ]
      },
      python: {
        initialCode: "def find_min(arr):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def find_min(arr):\n    return min(arr)",
        tests: [
          { input: "print(find_min([5, 2, 9, 1, 7]))", expected: "1", label: "min 1" },
          { input: "print(find_min([-10, 0, 10]))", expected: "-10", label: "min -10" }
        ]
      }
    }
  },
  {
    id: "count-words-in-string",
    title: "Matndagi So'zlar Soni",
    slug: "count-words-in-string",
    description: `### 🎯 Masala Maqsadi:
Berilgan jumlada nechta so'z borligini hisoblovchi \`countWords\` funksiyasini yozing. So'zlar o'zaro bo'shliq (probel) bilan ajratilgan bo'ladi. Agar matn bo'sh bo'lsa, \`0\` qaytaring.

### 📥 Kiruvchi Parametrlar:
- \`str\` *(String)*: Berilgan matn.

### 📤 Qaytariladigan Natija:
- *(Number)*: So'zlar soni.

### 💡 Misollar:
\`\`\`javascript
countWords("Salom dunyo")       // 2
countWords("Dasturlash juda ajoyib soha") // 4
countWords("")                  // 0
\`\`\``,
    examples: [
      { input: "'Salom dunyo'", output: "2" },
      { input: "'Dasturlash juda ajoyib soha'", output: "4" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function countWords(str) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function countWords(str) {\n  const clean = str.trim();\n  if (!clean) return 0;\n  return clean.split(/\\s+/).length;\n}",
        tests: [
          { input: "console.log(countWords('Salom dunyo'))", expected: "2", label: "'Salom dunyo' -> 2" },
          { input: "console.log(countWords('Dasturlash juda ajoyib soha'))", expected: "4", label: "4 ta so'z" },
          { input: "console.log(countWords(''))", expected: "0", label: "Bo'sh satr -> 0" }
        ]
      },
      python: {
        initialCode: "def count_words(s):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def count_words(s):\n    return len(s.split())",
        tests: [
          { input: "print(count_words('Salom dunyo'))", expected: "2", label: "2 words" },
          { input: "print(count_words(''))", expected: "0", label: "0 words" }
        ]
      }
    }
  },
  {
    id: "first-and-last-char",
    title: "Birinchi va Oxirgi Belgi",
    slug: "first-and-last-char",
    description: `### 🎯 Masala Maqsadi:
Berilgan matnning eng birinchi va eng oxirgi belgisini birlashtirib, yangi 2 belgili matn hosil qiluvchi \`firstAndLast\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`str\` *(String)*: Kamida 1 ta belgidan iborat matn.

### 📤 Qaytariladigan Natija:
- *(String)*: Bosh va oxirgi belgi birlashmasi.

### 💡 Misollar:
\`\`\`javascript
firstAndLast("Codewar") // "Cr"
firstAndLast("Toshkent") // "Tt"
firstAndLast("A")        // "A"
\`\`\``,
    examples: [
      { input: "'Codewar'", output: "Cr" },
      { input: "'Toshkent'", output: "Tt" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function firstAndLast(str) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function firstAndLast(str) {\n  if (str.length <= 1) return str;\n  return str[0] + str[str.length - 1];\n}",
        tests: [
          { input: "console.log(firstAndLast('Codewar'))", expected: "Cr", label: "'Codewar' -> 'Cr'" },
          { input: "console.log(firstAndLast('Toshkent'))", expected: "Tt", label: "'Toshkent' -> 'Tt'" },
          { input: "console.log(firstAndLast('A'))", expected: "A", label: "'A' -> 'A'" }
        ]
      },
      python: {
        initialCode: "def first_and_last(s):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def first_and_last(s):\n    return s if len(s) <= 1 else s[0] + s[-1]",
        tests: [
          { input: "print(first_and_last('Codewar'))", expected: "Cr", label: "Codewar" },
          { input: "print(first_and_last('A'))", expected: "A", label: "A" }
        ]
      }
    }
  },
  {
    id: "grade-calculator",
    title: "Imtihon Bali Bahosi",
    slug: "grade-calculator",
    description: `### 🎯 Masala Maqsadi:
O'quvchining to'plagan balli (0 dan 100 gacha) asosida uning harfli bahosini aniqlovchi \`getGrade\` funksiyasini yozing:
- **90 - 100**: \`'A'\`
- **80 - 89**: \`'B'\`
- **70 - 79**: \`'C'\`
- **60 - 69**: \`'D'\`
- **60 dan past**: \`'F'\`

### 💡 Misollar:
\`\`\`javascript
getGrade(95) // "A"
getGrade(82) // "B"
getGrade(50) // "F"
\`\`\``,
    examples: [
      { input: "95", output: "A" },
      { input: "82", output: "B" },
      { input: "50", output: "F" }
    ],
    difficulty: 8,
    category: "Fundamentals",
    tags: ["conditions", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function getGrade(score) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function getGrade(score) {\n  if (score >= 90) return 'A';\n  if (score >= 80) return 'B';\n  if (score >= 70) return 'C';\n  if (score >= 60) return 'D';\n  return 'F';\n}",
        tests: [
          { input: "console.log(getGrade(95))", expected: "A", label: "95 -> A" },
          { input: "console.log(getGrade(82))", expected: "B", label: "82 -> B" },
          { input: "console.log(getGrade(70))", expected: "C", label: "70 -> C" },
          { input: "console.log(getGrade(65))", expected: "D", label: "65 -> D" },
          { input: "console.log(getGrade(50))", expected: "F", label: "50 -> F" }
        ]
      },
      python: {
        initialCode: "def get_grade(score):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def get_grade(score):\n    if score >= 90: return 'A'\n    elif score >= 80: return 'B'\n    elif score >= 70: return 'C'\n    elif score >= 60: return 'D'\n    else: return 'F'",
        tests: [
          { input: "print(get_grade(95))", expected: "A", label: "95" },
          { input: "print(get_grade(50))", expected: "F", label: "50" }
        ]
      }
    }
  },
  {
    id: "check-sign",
    title: "Son Ishorasi (Musbat, Manfiy, Nol)",
    slug: "check-sign",
    description: `### 🎯 Masala Maqsadi:
Berilgan sonning ishorasini aniqlovchi \`checkSign\` funksiyasini yozing:
- Agar son 0 dan katta bo'lsa: \`"positive"\`
- Agar son 0 dan kichik bo'lsa: \`"negative"\`
- Agar son 0 ga teng bo'lsa: \`"zero"\`

### 💡 Misollar:
\`\`\`javascript
checkSign(10)  // "positive"
checkSign(-5)  // "negative"
checkSign(0)   // "zero"
\`\`\``,
    examples: [
      { input: "10", output: "positive" },
      { input: "-5", output: "negative" },
      { input: "0", output: "zero" }
    ],
    difficulty: 8,
    category: "Fundamentals",
    tags: ["conditions", "math"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function checkSign(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function checkSign(n) {\n  if (n > 0) return 'positive';\n  if (n < 0) return 'negative';\n  return 'zero';\n}",
        tests: [
          { input: "console.log(checkSign(10))", expected: "positive", label: "10 -> positive" },
          { input: "console.log(checkSign(-5))", expected: "negative", label: "-5 -> negative" },
          { input: "console.log(checkSign(0))", expected: "zero", label: "0 -> zero" }
        ]
      },
      python: {
        initialCode: "def check_sign(n):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def check_sign(n):\n    if n > 0: return 'positive'\n    elif n < 0: return 'negative'\n    return 'zero'",
        tests: [
          { input: "print(check_sign(10))", expected: "positive", label: "10" },
          { input: "print(check_sign(-5))", expected: "negative", label: "-5" },
          { input: "print(check_sign(0))", expected: "zero", label: "0" }
        ]
      }
    }
  },
  {
    id: "sum-of-evens",
    title: "Juft Sonlar Yig'indisi",
    slug: "sum-of-evens",
    description: `### 🎯 Masala Maqsadi:
Berilgan sonlar massividagi faqat juft sonlarning yig'indisini hisoblovchi \`sumEvens\` funksiyasini yozing. Juft sonlar bo'lmasa, \`0\` qaytarilsin.

### 💡 Misollar:
\`\`\`javascript
sumEvens([1, 2, 3, 4, 6]) // 12 (chunki 2 + 4 + 6 = 12)
sumEvens([1, 3, 5])       // 0
\`\`\``,
    examples: [
      { input: "[1, 2, 3, 4, 6]", output: "12" },
      { input: "[1, 3, 5]", output: "0" }
    ],
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "math"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function sumEvens(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function sumEvens(arr) {\n  return arr.filter(n => n % 2 === 0).reduce((sum, n) => sum + n, 0);\n}",
        tests: [
          { input: "console.log(sumEvens([1, 2, 3, 4, 6]))", expected: "12", label: "[1,2,3,4,6] -> 12" },
          { input: "console.log(sumEvens([1, 3, 5]))", expected: "0", label: "[1,3,5] -> 0" },
          { input: "console.log(sumEvens([10, -2, 4]))", expected: "12", label: "[10,-2,4] -> 12" }
        ]
      },
      python: {
        initialCode: "def sum_evens(arr):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def sum_evens(arr):\n    return sum(n for n in arr if n % 2 == 0)",
        tests: [
          { input: "print(sum_evens([1, 2, 3, 4, 6]))", expected: "12", label: "[1,2,3,4,6]" },
          { input: "print(sum_evens([1, 3, 5]))", expected: "0", label: "no evens" }
        ]
      }
    }
  },
  {
    id: "is-factor-of",
    title: "Karrali Sonni Tekshirish",
    slug: "is-factor-of",
    description: `### 🎯 Masala Maqsadi:
\`factor\` soni \`base\` sonining bo'luvchisi (karralisi) ekanligini tekshiruvchi \`isFactor\` funksiyasini yozing. Ya'ni \`base\` soni \`factor\` ga qoldiqsiz bo'linadimi?

### 💡 Misollar:
\`\`\`javascript
isFactor(10, 2) // true
isFactor(9, 2)  // false
isFactor(15, 5) // true
\`\`\``,
    examples: [
      { input: "10, 2", output: "true" },
      { input: "9, 2", output: "false" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function isFactor(base, factor) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isFactor(base, factor) {\n  return base % factor === 0;\n}",
        tests: [
          { input: "console.log(isFactor(10, 2))", expected: "true", label: "10, 2 -> true" },
          { input: "console.log(isFactor(9, 2))", expected: "false", label: "9, 2 -> false" },
          { input: "console.log(isFactor(15, 5))", expected: "true", label: "15, 5 -> true" }
        ]
      },
      python: {
        initialCode: "def is_factor(base, factor):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def is_factor(base, factor):\n    return base % factor == 0",
        tests: [
          { input: "print(str(is_factor(10, 2)).lower())", expected: "true", label: "10, 2" },
          { input: "print(str(is_factor(9, 2)).lower())", expected: "false", label: "9, 2" }
        ]
      }
    }
  },
  {
    id: "reverse-words-sentence",
    title: "Jumladagi So'zlar Tartibini O'girish",
    slug: "reverse-words-sentence",
    description: `### 🎯 Masala Maqsadi:
Berilgan matndagi so'zlarning joylashuv tartibini teskarisiga o'girib beruvchi \`reverseWords\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
reverseWords("salom dunyo") // "dunyo salom"
reverseWords("men dasturlashni sevaman") // "sevaman dasturlashni men"
\`\`\``,
    examples: [
      { input: "'salom dunyo'", output: "dunyo salom" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function reverseWords(str) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function reverseWords(str) {\n  return str.split(' ').reverse().join(' ');\n}",
        tests: [
          { input: "console.log(reverseWords('salom dunyo'))", expected: "dunyo salom", label: "'salom dunyo'" },
          { input: "console.log(reverseWords('men kod yozaman'))", expected: "yozaman kod men", label: "'men kod yozaman'" }
        ]
      },
      python: {
        initialCode: "def reverse_words(s):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def reverse_words(s):\n    return ' '.join(s.split()[::-1])",
        tests: [
          { input: "print(reverse_words('salom dunyo'))", expected: "dunyo salom", label: "salom dunyo" }
        ]
      }
    }
  },
  {
    id: "repeat-string-n",
    title: "Satrni N Marta Takrorlash",
    slug: "repeat-string-n",
    description: `### 🎯 Masala Maqsadi:
Berilgan \`s\` satrini aynan \`n\` marta takrorlab birlashtiruvchi \`repeatStr\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
repeatStr(3, "*")   // "***"
repeatStr(2, "Ha")  // "HaHa"
repeatStr(0, "Yo")  // ""
\`\`\``,
    examples: [
      { input: "3, '*'", output: "***" },
      { input: "2, 'Ha'", output: "HaHa" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function repeatStr(n, s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function repeatStr(n, s) {\n  return s.repeat(n);\n}",
        tests: [
          { input: "console.log(repeatStr(3, '*'))", expected: "***", label: "3, '*'" },
          { input: "console.log(repeatStr(2, 'Ha'))", expected: "HaHa", label: "2, 'Ha'" },
          { input: "console.log(repeatStr(0, 'Yo'))", expected: "", label: "0 marta" }
        ]
      },
      python: {
        initialCode: "def repeat_str(n, s):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def repeat_str(n, s):\n    return s * n",
        tests: [
          { input: "print(repeat_str(3, '*'))", expected: "***", label: "3, '*'" },
          { input: "print(repeat_str(2, 'Ha'))", expected: "HaHa", label: "2, 'Ha'" }
        ]
      }
    }
  },
  {
    id: "array-contains",
    title: "Element Massivda Bormi?",
    slug: "array-contains",
    description: `### 🎯 Masala Maqsadi:
Berilgan \`arr\` massivida qidirilayotgan \`val\` qiymati mavjudligini tekshiruvchi \`check\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
check([66, 101], 66)        // true
check(["a", "b", "c"], "d") // false
\`\`\``,
    examples: [
      { input: "[66, 101], 66", output: "true" },
      { input: "['a', 'b'], 'c'", output: "false" }
    ],
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function check(arr, val) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function check(arr, val) {\n  return arr.includes(val);\n}",
        tests: [
          { input: "console.log(check([66, 101], 66))", expected: "true", label: "Bor -> true" },
          { input: "console.log(check(['a', 'b', 'c'], 'd'))", expected: "false", label: "Yo'q -> false" }
        ]
      },
      python: {
        initialCode: "def check(arr, val):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def check(arr, val):\n    return val in arr",
        tests: [
          { input: "print(str(check([66, 101], 66)).lower())", expected: "true", label: "true" },
          { input: "print(str(check(['a', 'b'], 'c')).lower())", expected: "false", label: "false" }
        ]
      }
    }
  },
  {
    id: "calculate-bmi",
    title: "Tana Massasi Indeksi (BMI)",
    slug: "calculate-bmi",
    description: `### 🎯 Masala Maqsadi:
Insonning vazni (\`weight\` kg) va bo'yi (\`height\` metr) bo'yicha Tana Massasi Indeksini ($BMI = \\frac{vazn}{bo'y^2}$) hisoblang va uning holatini aniqlang:
- $BMI \\le 18.5$ bo'lsa: \`"Underweight"\`
- $BMI \\le 25.0$ bo'lsa: \`"Normal"\`
- $BMI \\le 30.0$ bo'lsa: \`"Overweight"\`
- $BMI > 30$ bo'lsa: \`"Obese"\`

### 💡 Misollar:
\`\`\`javascript
bmi(80, 1.80) // "Normal" (chunki 80 / (1.8^2) ≈ 24.69)
bmi(50, 1.75) // "Underweight"
\`\`\``,
    examples: [
      { input: "80, 1.80", output: "Normal" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function bmi(weight, height) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function bmi(weight, height) {\n  const val = weight / (height * height);\n  if (val <= 18.5) return 'Underweight';\n  if (val <= 25.0) return 'Normal';\n  if (val <= 30.0) return 'Overweight';\n  return 'Obese';\n}",
        tests: [
          { input: "console.log(bmi(80, 1.80))", expected: "Normal", label: "80kg, 1.8m -> Normal" },
          { input: "console.log(bmi(50, 1.75))", expected: "Underweight", label: "50kg, 1.75m -> Underweight" },
          { input: "console.log(bmi(90, 1.75))", expected: "Overweight", label: "90kg, 1.75m -> Overweight" }
        ]
      },
      python: {
        initialCode: "def bmi(weight, height):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def bmi(weight, height):\n    val = weight / (height ** 2)\n    if val <= 18.5: return 'Underweight'\n    if val <= 25.0: return 'Normal'\n    if val <= 30.0: return 'Overweight'\n    return 'Obese'",
        tests: [
          { input: "print(bmi(80, 1.80))", expected: "Normal", label: "Normal" },
          { input: "print(bmi(50, 1.75))", expected: "Underweight", label: "Underweight" }
        ]
      }
    }
  },
  {
    id: "quarter-of-year",
    title: "Yilning Qaysi Choragi?",
    slug: "quarter-of-year",
    description: `### 🎯 Masala Maqsadi:
Berilgan oy raqamiga (1 dan 12 gacha) qarab, uning yilning qaysi choragiga (1, 2, 3 yoki 4) tegishli ekanligini hisoblovchi \`quarterOf\` funksiyasini yozing.
- 1, 2, 3-oylar -> 1-chorak
- 4, 5, 6-oylar -> 2-chorak
- 7, 8, 9-oylar -> 3-chorak
- 10, 11, 12-oylar -> 4-chorak

### 💡 Misollar:
\`\`\`javascript
quarterOf(3)  // 1
quarterOf(8)  // 3
quarterOf(11) // 4
\`\`\``,
    examples: [
      { input: "3", output: "1" },
      { input: "8", output: "3" },
      { input: "11", output: "4" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function quarterOf(month) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function quarterOf(month) {\n  return Math.ceil(month / 3);\n}",
        tests: [
          { input: "console.log(quarterOf(3))", expected: "1", label: "3-oy -> 1" },
          { input: "console.log(quarterOf(8))", expected: "3", label: "8-oy -> 3" },
          { input: "console.log(quarterOf(11))", expected: "4", label: "11-oy -> 4" }
        ]
      },
      python: {
        initialCode: "def quarter_of(month):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "import math\ndef quarter_of(month):\n    return math.ceil(month / 3)",
        tests: [
          { input: "print(quarter_of(3))", expected: "1", label: "3" },
          { input: "print(quarter_of(8))", expected: "3", label: "8" }
        ]
      }
    }
  },
  {
    id: "remove-first-last-char",
    title: "Birinchi va Oxirgi Belgini Olib Tashlash",
    slug: "remove-first-last-char",
    description: `### 🎯 Masala Maqsadi:
Berilgan matnning birinchi va oxirgi belgisini olib tashlab, qolgan o'rta qismini qaytaruvchi \`removeChar\` funksiyasini yozing. Matn uzunligi kamida 2 ta belgidan iborat bo'ladi.

### 💡 Misollar:
\`\`\`javascript
removeChar("dastur") // "astu"
removeChar("salom")  // "alo"
removeChar("ok")     // ""
\`\`\``,
    examples: [
      { input: "'dastur'", output: "astu" },
      { input: "'salom'", output: "alo" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function removeChar(str) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function removeChar(str) {\n  return str.slice(1, -1);\n}",
        tests: [
          { input: "console.log(removeChar('dastur'))", expected: "astu", label: "'dastur' -> 'astu'" },
          { input: "console.log(removeChar('salom'))", expected: "alo", label: "'salom' -> 'alo'" },
          { input: "console.log(removeChar('ok'))", expected: "", label: "'ok' -> ''" }
        ]
      },
      python: {
        initialCode: "def remove_char(s):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def remove_char(s):\n    return s[1:-1]",
        tests: [
          { input: "print(remove_char('dastur'))", expected: "astu", label: "dastur" },
          { input: "print(remove_char('ok'))", expected: "", label: "ok" }
        ]
      }
    }
  },
  {
    id: "power-of-number",
    title: "Sonni Darajaga Ko'tarish",
    slug: "power-of-number",
    description: `### 🎯 Masala Maqsadi:
Berilgan \`base\` asosini \`exp\` darajasiga ko'tarib natijani hisoblovchi \`power\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
power(2, 4) // 16 (2^4)
power(5, 2) // 25
power(10, 0) // 1
\`\`\``,
    examples: [
      { input: "2, 4", output: "16" },
      { input: "5, 2", output: "25" }
    ],
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function power(base, exp) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function power(base, exp) {\n  return Math.pow(base, exp);\n}",
        tests: [
          { input: "console.log(power(2, 4))", expected: "16", label: "2^4 = 16" },
          { input: "console.log(power(5, 2))", expected: "25", label: "5^2 = 25" },
          { input: "console.log(power(10, 0))", expected: "1", label: "10^0 = 1" }
        ]
      },
      python: {
        initialCode: "def power(base, exp):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def power(base, exp):\n    return base ** exp",
        tests: [
          { input: "print(power(2, 4))", expected: "16", label: "2^4" },
          { input: "print(power(5, 2))", expected: "25", label: "5^2" }
        ]
      }
    }
  },
  {
    id: "sum-between-range",
    title: "Oraliqdagi Barcha Sonlar Yig'indisi",
    slug: "sum-between-range",
    description: `### 🎯 Masala Maqsadi:
Berilgan ikkita butun son (\`a\` va \`b\`) orasidagi barcha sonlar yig'indisini hisoblovchi \`getSum\` funksiyasini yozing (\`a\` va \`b\` ham kiritiladi). E'tibor bering, \`a\` soni \`b\` dan katta ham bo'lishi mumkin!

### 💡 Misollar:
\`\`\`javascript
getSum(1, 4)  // 10 (1 + 2 + 3 + 4)
getSum(4, 1)  // 10
getSum(3, 3)  // 3
getSum(-1, 2) // 2 (-1 + 0 + 1 + 2)
\`\`\``,
    examples: [
      { input: "1, 4", output: "10" },
      { input: "-1, 2", output: "2" }
    ],
    difficulty: 7,
    category: "Math",
    tags: ["math", "algorithms"],
    isPremium: false,
    xpReward: 25,
    languages: {
      javascript: {
        initialCode: "function getSum(a, b) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function getSum(a, b) {\n  const min = Math.min(a, b);\n  const max = Math.max(a, b);\n  let sum = 0;\n  for (let i = min; i <= max; i++) sum += i;\n  return sum;\n}",
        tests: [
          { input: "console.log(getSum(1, 4))", expected: "10", label: "1 dan 4 gacha -> 10" },
          { input: "console.log(getSum(4, 1))", expected: "10", label: "4 dan 1 gacha -> 10" },
          { input: "console.log(getSum(3, 3))", expected: "3", label: "3, 3 -> 3" },
          { input: "console.log(getSum(-1, 2))", expected: "2", label: "-1 dan 2 gacha -> 2" }
        ]
      },
      python: {
        initialCode: "def get_sum(a, b):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def get_sum(a, b):\n    start, end = min(a, b), max(a, b)\n    return sum(range(start, end + 1))",
        tests: [
          { input: "print(get_sum(1, 4))", expected: "10", label: "1..4" },
          { input: "print(get_sum(3, 3))", expected: "3", label: "3..3" }
        ]
      }
    }
  },
  {
    id: "capitalize-word",
    title: "So'zning Bosh Harfini Katta Qilish",
    slug: "capitalize-word",
    description: `### 🎯 Masala Maqsadi:
Berilgan bitta so'zning faqat birinchi harfini bosh harf (katta) qilib, qolgan qismini o'z holicha qaytaruvchi \`capitalizeWord\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
capitalizeWord("word")   // "Word"
capitalizeWord("toshkent") // "Toshkent"
\`\`\``,
    examples: [
      { input: "'word'", output: "Word" },
      { input: "'toshkent'", output: "Toshkent" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function capitalizeWord(word) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function capitalizeWord(word) {\n  if (!word) return '';\n  return word[0].toUpperCase() + word.slice(1);\n}",
        tests: [
          { input: "console.log(capitalizeWord('word'))", expected: "Word", label: "'word' -> 'Word'" },
          { input: "console.log(capitalizeWord('toshkent'))", expected: "Toshkent", label: "'toshkent' -> 'Toshkent'" }
        ]
      },
      python: {
        initialCode: "def capitalize_word(word):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def capitalize_word(word):\n    return word.capitalize()",
        tests: [
          { input: "print(capitalize_word('word'))", expected: "Word", label: "word" }
        ]
      }
    }
  },
  {
    id: "rock-paper-scissors-game",
    title: "Tosh, Qaychi, Qog'oz",
    slug: "rock-paper-scissors-game",
    description: `### 🎯 Masala Maqsadi:
Ikki o'yinchi o'rtasidagi "Tosh, Qaychi, Qog'oz" (\`rock\`, \`scissors\`, \`paper\`) o'yinida g'olibni aniqlovchi \`rps\` funksiyasini yozing.
Qoidalar:
- Tosh (\`rock\`) qaychini (\`scissors\`) yengadi.
- Qaychi (\`scissors\`) qog'ozni (\`paper\`) yengadi.
- Qog'oz (\`paper\`) toshni (\`rock\`) yengadi.
- Bir xil tanlov bo'lsa: \`"Draw!"\`
- O'yinchi 1 yutsa: \`"Player 1 won!"\`
- O'yinchi 2 yutsa: \`"Player 2 won!"\`

### 💡 Misollar:
\`\`\`javascript
rps('scissors', 'paper') // "Player 1 won!"
rps('scissors', 'rock')  // "Player 2 won!"
rps('paper', 'paper')    // "Draw!"
\`\`\``,
    examples: [
      { input: "'scissors', 'paper'", output: "Player 1 won!" },
      { input: "'paper', 'paper'", output: "Draw!" }
    ],
    difficulty: 8,
    category: "Fundamentals",
    tags: ["conditions", "games"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function rps(p1, p2) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function rps(p1, p2) {\n  if (p1 === p2) return 'Draw!';\n  if ((p1 === 'scissors' && p2 === 'paper') || (p1 === 'paper' && p2 === 'rock') || (p1 === 'rock' && p2 === 'scissors')) return 'Player 1 won!';\n  return 'Player 2 won!';\n}",
        tests: [
          { input: "console.log(rps('scissors', 'paper'))", expected: "Player 1 won!", label: "scissors vs paper" },
          { input: "console.log(rps('scissors', 'rock'))", expected: "Player 2 won!", label: "scissors vs rock" },
          { input: "console.log(rps('paper', 'paper'))", expected: "Draw!", label: "paper vs paper" }
        ]
      },
      python: {
        initialCode: "def rps(p1, p2):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def rps(p1, p2):\n    if p1 == p2: return 'Draw!'\n    if (p1 == 'scissors' and p2 == 'paper') or (p1 == 'paper' and p2 == 'rock') or (p1 == 'rock' and p2 == 'scissors'): return 'Player 1 won!'\n    return 'Player 2 won!'",
        tests: [
          { input: "print(rps('scissors', 'paper'))", expected: "Player 1 won!", label: "p1" },
          { input: "print(rps('paper', 'paper'))", expected: "Draw!", label: "draw" }
        ]
      }
    }
  },
  {
    id: "count-characters",
    title: "Belgining Takrorlanish Soni",
    slug: "count-characters",
    description: `### 🎯 Masala Maqsadi:
Berilgan \`str\` matnida aynan \`char\` belgisi necha marta uchrashini hisoblovchi \`countChar\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
countChar("salom", "a")    // 1
countChar("banana", "a")   // 3
countChar("dastur", "z")   // 0
\`\`\``,
    examples: [
      { input: "'salom', 'a'", output: "1" },
      { input: "'banana', 'a'", output: "3" }
    ],
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    languages: {
      javascript: {
        initialCode: "function countChar(str, char) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function countChar(str, char) {\n  return str.split(char).length - 1;\n}",
        tests: [
          { input: "console.log(countChar('salom', 'a'))", expected: "1", label: "'salom', 'a' -> 1" },
          { input: "console.log(countChar('banana', 'a'))", expected: "3", label: "'banana', 'a' -> 3" },
          { input: "console.log(countChar('dastur', 'z'))", expected: "0", label: "Yo'q belgi -> 0" }
        ]
      },
      python: {
        initialCode: "def count_char(str_val, char_val):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def count_char(str_val, char_val):\n    return str_val.count(char_val)",
        tests: [
          { input: "print(count_char('salom', 'a'))", expected: "1", label: "salom a" },
          { input: "print(count_char('banana', 'a'))", expected: "3", label: "banana a" }
        ]
      }
    }
  }
];

// Test all JS solutions
console.log("Verifying JS solutions...");
for (const kata of newKatas) {
  const js = kata.languages.javascript;
  for (const t of js.tests) {
    let output = '';
    const mockConsole = {
      log: (...args) => {
        output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
      }
    };
    const codeToRun = `${js.solution}\n${t.input}`;
    try {
      const fn = new Function('console', codeToRun);
      fn(mockConsole);
      const actual = output.trim();
      const expected = String(t.expected).trim();
      if (actual !== expected) {
        console.error(`FAIL in ${kata.id}: Expected "${expected}", got "${actual}"`);
        process.exit(1);
      }
    } catch (e) {
      console.error(`ERROR in ${kata.id}:`, e.message);
      process.exit(1);
    }
  }
}
console.log("All 25 new katas verified successfully!");

// Append to katas list
let addedKatas = 0;
for (const k of newKatas) {
  if (!existingIds.has(k.id)) {
    katas.push(k);
    existingIds.add(k.id);
    addedKatas++;
  }
}
fs.writeFileSync(KATA_FILE, JSON.stringify(katas, null, 2), 'utf8');
console.log(`Saved kata.json! Added ${addedKatas} new katas. Total now: ${katas.length}`);


// ============================================================
// 15 NEW LESSONS FOR COURSES
// ============================================================
const jsCourse = courses.find(c => c.id === 'javascript-mastery');
const pyCourse = courses.find(c => c.id === 'python-basics');
const webCourse = courses.find(c => c.id === 'web-dev-basics');
const algoCourse = courses.find(c => c.id === 'algorithms-ds');

if (jsCourse) {
  const existingJsLessonIds = new Set(jsCourse.lessons.map(l => l.id));
  const newJsLessons = [
    {
      id: "js-19",
      order: 19,
      title: "Matn Metodlari (.includes, .slice, .trim)",
      xpReward: 25,
      theory: `### Matnlar (Strings) bilan ishlash 📝

JavaScriptda matnlarni tahlil qilish va o'zgartirish uchun qulay metodlar mavjud:
- **\`str.includes('soz')\`**: Matnda qidirilayotgan so'z bor-yo'qligini \`true\` yoki \`false\` qaytaradi.
- **\`str.slice(boshlangich, tugash)\`**: Matnning kerakli qismini kesib oladi.
- **\`str.trim()\`**: Boshidagi va oxiridagi bo'shliqlarni (probellarni) olib tashlaydi.

\`\`\`javascript
const matn = "  Salom Dunyo!  ";
console.log(matn.trim()); // "Salom Dunyo!"
console.log(matn.includes("Dunyo")); // true
\`\`\``,
      task: "`dastur` o'zgaruvchisidagi matndan `.trim()` va `.includes('JS')` tekshiruvini bajaring va natijani konsolga chiqaring.",
      hints: [
        "console.log() ichida includes('JS') tekshiruvini yozing."
      ],
      initialCode: "const dastur = '  Men JS o\\'rganmoqdaman!  ';\n// O'z kodingizni bu yerga yozing:\n",
      expectedOutput: "true",
      tests: [
        {
          type: "output",
          expected: "true",
          label: "Konsolga 'true' chiqishi kerak"
        }
      ],
      solution: "const dastur = '  Men JS o\\'rganmoqdaman!  ';\nconsole.log(dastur.includes('JS'));\n"
    },
    {
      id: "js-20",
      order: 20,
      title: "Ternary Operator (Uchlik operator ?: )",
      xpReward: 25,
      theory: `### Qisqa Shart Operator: Ternary ⚡

Oddiy \`if / else\` shartlarini 1 qatorga ixcham yozish uchun **Ternary (\`shart ? agar_rost : agar_yolgon\`)** ishlatiladi:

\`\`\`javascript
const yosh = 20;
const holat = yosh >= 18 ? "Katta yoshli" : "Voyaga yetmagan";
console.log(holat); // "Katta yoshli"
\`\`\``,
      task: "`ball` o'zgaruvchisi berilgan (85). Agar `ball >= 60` bo'lsa, konsolga `O'tdi`, aks holda `Yiqildi` degan so'zni ternary operator orqali chiqaring.",
      hints: [
        "const natija = ball >= 60 ? \"O'tdi\" : \"Yiqildi\";",
        "console.log(natija)"
      ],
      initialCode: "const ball = 85;\n// Ternary operatori orqali natijani konsolga chiqaring:\n",
      expectedOutput: "O'tdi",
      tests: [
        {
          type: "output",
          expected: "O'tdi",
          label: "Konsolga 'O'tdi' chiqishi kerak"
        }
      ],
      solution: "const ball = 85;\nconsole.log(ball >= 60 ? \"O'tdi\" : \"Yiqildi\");\n"
    },
    {
      id: "js-21",
      order: 21,
      title: "Set Ma'lumotlar Tuzilmasi (Takrorlanmas Qiymatlar)",
      xpReward: 25,
      theory: `### Set — Takrorlanmas Elementlar To'plami 💎

Oddiy massivda bir xil qiymatlar takrorlanishi mumkin. **\`Set\`** esa faqat unikal (takrorlanmas) qiymatlarni saqlaydi:

\`\`\`javascript
const sonlar = [1, 2, 2, 3, 3, 4];
const unikal = new Set(sonlar);
console.log(unikal.size); // 4
console.log([...unikal]); // [1, 2, 3, 4]
\`\`\``,
      task: "Berilgan `massiv`dagi takrorlanuvchi elementlarni yo'qotish uchun `new Set` yarating va uning hajmini (`.size`) konsolga chiqaring.",
      hints: [
        "const unikal = new Set(massiv);",
        "console.log(unikal.size);"
      ],
      initialCode: "const massiv = ['olma', 'anor', 'olma', 'uzum', 'anor'];\n// Unikal to'plam yarating va hajmini chiqaring:\n",
      expectedOutput: "3",
      tests: [
        {
          type: "output",
          expected: "3",
          label: "Konsolga 3 chiqishi kerak"
        }
      ],
      solution: "const massiv = ['olma', 'anor', 'olma', 'uzum', 'anor'];\nconst unikal = new Set(massiv);\nconsole.log(unikal.size);\n"
    },
    {
      id: "js-22",
      order: 22,
      title: "Object.keys() va Object.values()",
      xpReward: 25,
      theory: `### Obyekt kalitlari va qiymatlari 🔑

Obyekt ichidagi ma'lumotlarni massivga aylantirish uchun foydali metodlar:
- **\`Object.keys(obj)\`**: Obyektning barcha kalit (xususiyat) nomlarini massiv qilib qaytaradi.
- **\`Object.values(obj)\`**: Obyektning barcha qiymatlarini massiv qilib qaytaradi.

\`\`\`javascript
const user = { name: "Ali", age: 22 };
console.log(Object.keys(user)); // ["name", "age"]
console.log(Object.values(user)); // ["Ali", 22]
\`\`\``,
      task: "`avto` obyektining barcha qiymatlarini `Object.values()` orqali oling va konsolga chiqaring.",
      hints: [
        "console.log(Object.values(avto));"
      ],
      initialCode: "const avto = { model: 'Cobalt', rang: 'Oq', yil: 2024 };\n// Qiymatlarni konsolga chiqaring:\n",
      expectedOutput: "Cobalt",
      tests: [
        {
          type: "output",
          expected: "Cobalt",
          label: "Konsolga obyekt qiymatlari chiqishi kerak"
        }
      ],
      solution: "const avto = { model: 'Cobalt', rang: 'Oq', yil: 2024 };\nconsole.log(Object.values(avto));\n"
    }
  ];

  for (const l of newJsLessons) {
    if (!existingJsLessonIds.has(l.id)) {
      jsCourse.lessons.push(l);
      existingJsLessonIds.add(l.id);
    }
  }
}

if (pyCourse) {
  const existingPyLessonIds = new Set(pyCourse.lessons.map(l => l.id));
  const newPyLessons = [
    {
      id: "py-21",
      order: 21,
      title: "Matn Metodlari (strip, split, replace)",
      xpReward: 25,
      theory: `### Pythonda Matnlar bilan Ishlash 📜

Pythonda satrlar (string) uchun juda qulay metodlar mavjud:
- **\`str.strip()\`**: Matnning boshi va oxiridagi bo'shliqlarni tozalaydi.
- **\`str.split()\`**: Matnni so'zlarga bo'lib, ro'yxat (list) qiladi.
- **\`str.replace('eski', 'yangi')\`**: Kerakli qismni yangisiga almashtiradi.

\`\`\`python
matn = "  Salom Dunyo  "
print(matn.strip()) # "Salom Dunyo"
print(matn.replace("Dunyo", "O'zbekiston"))
\`\`\``,
      task: "`xabar` o'zgaruvchisidagi 'JavaScript' so'zini 'Python' so'ziga almashtiring (`replace`) va natijani chop eting.",
      hints: [
        "print(xabar.replace('JavaScript', 'Python'))"
      ],
      initialCode: "xabar = \"Men JavaScript o'rganmoqdaman\"\n# So'zni almashtiring va chiqaring:\n",
      expectedOutput: "Men Python o'rganmoqdaman",
      tests: [
        {
          type: "output",
          expected: "Men Python o'rganmoqdaman",
          label: "Konsolga yangilangan xabar chiqishi kerak"
        }
      ],
      solution: "xabar = \"Men JavaScript o'rganmoqdaman\"\nprint(xabar.replace(\"JavaScript\", \"Python\"))\n"
    },
    {
      id: "py-22",
      order: 22,
      title: "F-satrlar (F-Strings) orqali Matn Formatlash",
      xpReward: 25,
      theory: `### F-satrlar (Formatted Strings) 🎯

Python 3.6+ versiyasida o'zgaruvchilarni matn ichiga joylashtirishning eng zamonaviy va tezkor usuli — **f-string**:

\`\`\`python
ism = "Aziz"
yosh = 24
print(f"Salom, mening ismim {ism} va yoshim {yosh}da.")
\`\`\`
Matn oldiga kichik \`f\` harfi qo'yiladi va jingalak qavs \`{...}\` ichiga o'zgaruvchi yoziladi.`,
      task: "`shahar` va `aholi` o'zgaruvchilarini f-satr orqali `Toshkent shahrida 3 million aholi yashaydi.` ko'rinishida chop eting.",
      hints: [
        "print(f\"{shahar} shahrida {aholi} million aholi yashaydi.\")"
      ],
      initialCode: "shahar = \"Toshkent\"\naholi = 3\n# F-satr orqali chiqaring:\n",
      expectedOutput: "Toshkent shahrida 3 million aholi yashaydi.",
      tests: [
        {
          type: "output",
          expected: "Toshkent shahrida 3 million aholi yashaydi.",
          label: "Konsolga f-string orqali shakllangan matn chiqishi kerak"
        }
      ],
      solution: "shahar = \"Toshkent\"\naholi = 3\nprint(f\"{shahar} shahrida {aholi} million aholi yashaydi.\")\n"
    },
    {
      id: "py-23",
      order: 23,
      title: "Ro'yxat Metodlari (append, pop, sort)",
      xpReward: 25,
      theory: `### Ro'yxatni Boshqarish (List Methods) 📋

Pythonda ro'yxat (list) elementlarini o'zgartirish:
- **\`list.append(qiymat)\`**: Oxiriga yangi element qo'shadi.
- **\`list.pop()\`**: Oxirgi elementni o'chiradi va qaytaradi.
- **\`list.sort()\`**: Ro'yxatni o'sish tartibida saralaydi.

\`\`\`python
mevalar = ["olma", "banan"]
mevalar.append("anor")
print(mevalar) # ["olma", "banan", "anor"]
\`\`\``,
      task: "Berilgan `sonlar` ro'yxatiga `.append(50)` qiling va keyin `.sort()` qilib konsolga chop eting.",
      hints: [
        "sonlar.append(50)",
        "sonlar.sort()",
        "print(sonlar)"
      ],
      initialCode: "sonlar = [30, 10, 20, 40]\n# 50 ni qo'shing, saralang va chop eting:\n",
      expectedOutput: "[10, 20, 30, 40, 50]",
      tests: [
        {
          type: "output",
          expected: "[10, 20, 30, 40, 50]",
          label: "Saralangan ro'yxat chiqishi kerak"
        }
      ],
      solution: "sonlar = [30, 10, 20, 40]\nsonlar.append(50)\nsonlar.sort()\nprint(sonlar)\n"
    }
  ];

  for (const l of newPyLessons) {
    if (!existingPyLessonIds.has(l.id)) {
      pyCourse.lessons.push(l);
      existingPyLessonIds.add(l.id);
    }
  }
}

if (webCourse) {
  const existingWebLessonIds = new Set(webCourse.lessons.map(l => l.id));
  const newWebLessons = [
    {
      id: "web-16",
      order: 16,
      title: "CSS Box-Shadow va Glassmorphism",
      xpReward: 25,
      theory: `### Zamonaviy Soya va Shisha (Glassmorphism) Effekti 🔮

Zamonaviy veb-dizaynda elementlarga chuqurlik berish uchun \`box-shadow\` va orqa fonni xiralashtiruvchi \`backdrop-filter\` ishlatiladi:

\`\`\`css
.karta {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
\`\`\``,
      task: "Konsolga `Glassmorphism effekti: backdrop-filter: blur()` matnini chiqaring.",
      hints: [
        "console.log(\"Glassmorphism effekti: backdrop-filter: blur()\")"
      ],
      initialCode: "// Matnni konsolga chiqaring:\n",
      expectedOutput: "Glassmorphism effekti: backdrop-filter: blur()",
      tests: [
        {
          type: "output",
          expected: "Glassmorphism effekti: backdrop-filter: blur()",
          label: "Konsolga xabar chiqishi kerak"
        }
      ],
      solution: "console.log(\"Glassmorphism effekti: backdrop-filter: blur()\");\n"
    }
  ];

  for (const l of newWebLessons) {
    if (!existingWebLessonIds.has(l.id)) {
      webCourse.lessons.push(l);
      existingWebLessonIds.add(l.id);
    }
  }
}

if (algoCourse) {
  const existingAlgoLessonIds = new Set(algoCourse.lessons.map(l => l.id));
  const newAlgoLessons = [
    {
      id: "algo-16",
      order: 16,
      title: "Palindrom Tekshirish Algoritmi (Two Pointers)",
      xpReward: 30,
      theory: `### Two Pointers (Ikki ko'rsatkich) Texnikasi 🎯

Satr palindromligini tekshirish uchun bitta ko'rsatkichni boshidan (\`left = 0\`), ikkinchisini oxiridan (\`right = s.length - 1\`) boshlab markazga qarab siljitamiz. Bu $O(n)$ vaqt va $O(1)$ xotirada ishlaydi.

\`\`\`javascript
function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
\`\`\``,
      task: "`isPalindrome('radar')` funksiyasini chaqiring va natijani konsolga chiqaring.",
      hints: [
        "console.log(isPalindrome('radar'))"
      ],
      initialCode: "function isPalindrome(s) {\n  return s === s.split('').reverse().join('');\n}\n// 'radar' so'zini tekshiring va chiqaring:\n",
      expectedOutput: "true",
      tests: [
        {
          type: "output",
          expected: "true",
          label: "Konsolga 'true' chiqishi kerak"
        }
      ],
      solution: "function isPalindrome(s) {\n  return s === s.split('').reverse().join('');\n}\nconsole.log(isPalindrome('radar'));\n"
    }
  ];

  for (const l of newAlgoLessons) {
    if (!existingAlgoLessonIds.has(l.id)) {
      algoCourse.lessons.push(l);
      existingAlgoLessonIds.add(l.id);
    }
  }
}

// Re-index orders and recalculate total XP for all courses
courses.forEach(c => {
  c.lessons.forEach((l, idx) => {
    l.order = idx + 1;
  });
  c.totalXp = c.lessons.reduce((sum, l) => sum + (l.xpReward || 25), 0);
});

fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2), 'utf8');
console.log('Saved courses.json!');
courses.forEach(c => console.log(`  - ${c.title}: ${c.lessons.length} lessons (Total XP: ${c.totalXp})`));
