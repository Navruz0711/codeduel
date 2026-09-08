const fs = require('fs');
const path = require('path');

const KATA_FILE = path.join(__dirname, '../data/kata.json');
const katas = JSON.parse(fs.readFileSync(KATA_FILE, 'utf8'));

const newKatas = [
  // 1. say-goodbye (8 kyu)
  {
    id: "say-goodbye",
    title: "Say Goodbye (Xayrlashuv)",
    slug: "say-goodbye",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Foydalanuvchining ismini qabul qilib, unga samimiy xayrlashuv xabari qaytaruvchi \`sayGoodbye\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`name\` *(String)*: Foydalanuvchi ismi (masalan: \`"Alice"\`, \`"Bob"\`).

### 📤 Qaytariladigan Natija:
- *(String)*: \`"Goodbye, <name>"\` ko'rinishidagi satr.

### 💡 Misollar:
\`\`\`javascript
sayGoodbye("Alice") // "Goodbye, Alice"
sayGoodbye("Bob")   // "Goodbye, Bob"
\`\`\`

### ⚠️ Eslatma:
Vergul va probel joylashuviga e'tibor bering: \`"Goodbye, "\` va undan so'ng ism kelishi shart.`,
    examples: [
      { input: "'Alice'", output: "Goodbye, Alice" },
      { input: "'Bob'", output: "Goodbye, Bob" }
    ],
    languages: {
      javascript: {
        initialCode: "function sayGoodbye(name) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function sayGoodbye(name) {\n  return 'Goodbye, ' + name;\n}",
        tests: [
          { input: "console.log(sayGoodbye('Alice'))", expected: "Goodbye, Alice", label: "Alice bilan xayrlashish" },
          { input: "console.log(sayGoodbye('Bob'))", expected: "Goodbye, Bob", label: "Bob bilan xayrlashish" }
        ]
      },
      python: {
        initialCode: "def say_goodbye(name):\n    # Kodni bu yerga yozing\n    pass\n",
        solution: "def say_goodbye(name):\n    return f'Goodbye, {name}'\n",
        tests: [
          { input: "print(say_goodbye('Alice'))", expected: "Goodbye, Alice", label: "Alice" },
          { input: "print(say_goodbye('Bob'))", expected: "Goodbye, Bob", label: "Bob" }
        ]
      }
    }
  },

  // 2. meters-to-centimeters (8 kyu)
  {
    id: "meters-to-centimeters",
    title: "Metrni Santimetrga O'tkazish",
    slug: "meters-to-centimeters",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan metr o'lchov birligini santimetrga (sm) aylantiruvchi \`metersToCentimeters\` funksiyasini yozing. Ma'lumki, 1 metr = 100 santimetr.

### 📥 Kiruvchi Parametrlar:
- \`m\` *(Number)*: Metr qiymati.

### 📤 Qaytariladigan Natija:
- *(Number)*: Santimetrdagi miqdor (\`m * 100\`).

### 💡 Misollar:
\`\`\`javascript
metersToCentimeters(2)   // 200
metersToCentimeters(5.5) // 550
\`\`\``,
    examples: [
      { input: "2", output: "200" },
      { input: "5.5", output: "550" }
    ],
    languages: {
      javascript: {
        initialCode: "function metersToCentimeters(m) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function metersToCentimeters(m) {\n  return m * 100;\n}",
        tests: [
          { input: "console.log(metersToCentimeters(2))", expected: "200", label: "2 metr -> 200 sm" },
          { input: "console.log(metersToCentimeters(5.5))", expected: "550", label: "5.5 metr -> 550 sm" }
        ]
      },
      python: {
        initialCode: "def meters_to_centimeters(m):\n    pass\n",
        solution: "def meters_to_centimeters(m):\n    return m * 100\n",
        tests: [
          { input: "print(meters_to_centimeters(2))", expected: "200", label: "2 m" },
          { input: "print(meters_to_centimeters(5.5))", expected: "550.0", label: "5.5 m" }
        ]
      }
    }
  },

  // 3. kilometers-to-meters (8 kyu)
  {
    id: "kilometers-to-meters",
    title: "Kilometrni Metrga O'tkazish",
    slug: "kilometers-to-meters",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan kilometr (km) o'lchamini metrga (m) aylantiruvchi \`kmToMeters\` funksiyasini yozing (1 km = 1000 m).

### 💡 Misollar:
\`\`\`javascript
kmToMeters(3)   // 3000
kmToMeters(1.5) // 1500
\`\`\``,
    examples: [
      { input: "3", output: "3000" }
    ],
    languages: {
      javascript: {
        initialCode: "function kmToMeters(km) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function kmToMeters(km) {\n  return km * 1000;\n}",
        tests: [
          { input: "console.log(kmToMeters(3))", expected: "3000", label: "3 km -> 3000 m" },
          { input: "console.log(kmToMeters(1.5))", expected: "1500", label: "1.5 km -> 1500 m" }
        ]
      },
      python: {
        initialCode: "def km_to_meters(km):\n    pass\n",
        solution: "def km_to_meters(km):\n    return int(km * 1000) if km % 1 == 0 else km * 1000\n",
        tests: [
          { input: "print(int(km_to_meters(3)))", expected: "3000", label: "3 km" }
        ]
      }
    }
  },

  // 4. hours-to-seconds (8 kyu)
  {
    id: "hours-to-seconds",
    title: "Soatni Sekundga Aylantirish",
    slug: "hours-to-seconds",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan soat (h) miqdorini sekundlarga aylantiring (1 soat = 3600 sekund).

### 💡 Misollar:
\`\`\`javascript
hoursToSeconds(1) // 3600
hoursToSeconds(2) // 7200
\`\`\``,
    examples: [
      { input: "1", output: "3600" }
    ],
    languages: {
      javascript: {
        initialCode: "function hoursToSeconds(h) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function hoursToSeconds(h) {\n  return h * 3600;\n}",
        tests: [
          { input: "console.log(hoursToSeconds(1))", expected: "3600", label: "1 soat" },
          { input: "console.log(hoursToSeconds(2))", expected: "7200", label: "2 soat" }
        ]
      },
      python: {
        initialCode: "def hours_to_seconds(h):\n    pass\n",
        solution: "def hours_to_seconds(h):\n    return h * 3600\n",
        tests: [
          { input: "print(hours_to_seconds(1))", expected: "3600", label: "1 hour" }
        ]
      }
    }
  },

  // 5. minutes-to-seconds (8 kyu)
  {
    id: "minutes-to-seconds",
    title: "Daqiqani Sekundga Aylantirish",
    slug: "minutes-to-seconds",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan daqiqa (min) miqdorini sekundlarga aylantiring (1 daqiqa = 60 sekund).

### 💡 Misollar:
\`\`\`javascript
minutesToSeconds(5)  // 300
minutesToSeconds(10) // 600
\`\`\``,
    examples: [
      { input: "5", output: "300" }
    ],
    languages: {
      javascript: {
        initialCode: "function minutesToSeconds(m) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function minutesToSeconds(m) {\n  return m * 60;\n}",
        tests: [
          { input: "console.log(minutesToSeconds(5))", expected: "300", label: "5 daqiqa" },
          { input: "console.log(minutesToSeconds(10))", expected: "600", label: "10 daqiqa" }
        ]
      },
      python: {
        initialCode: "def minutes_to_seconds(m):\n    pass\n",
        solution: "def minutes_to_seconds(m):\n    return m * 60\n",
        tests: [
          { input: "print(minutes_to_seconds(5))", expected: "300", label: "5 mins" }
        ]
      }
    }
  },

  // 6. triangle-perimeter (8 kyu)
  {
    id: "triangle-perimeter",
    title: "Uchburchak Perimetrini Hisoblash",
    slug: "triangle-perimeter",
    difficulty: 8,
    category: "Geometry",
    tags: ["geometry", "math"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Uchburchakning uch tomoni \`a\`, \`b\`, \`c\` berilgan. Uning perimetrini (\`a + b + c\`) hisoblab qaytaruvchi \`trianglePerimeter\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
trianglePerimeter(3, 4, 5)    // 12
trianglePerimeter(10, 10, 10) // 30
\`\`\``,
    examples: [
      { input: "3, 4, 5", output: "12" }
    ],
    languages: {
      javascript: {
        initialCode: "function trianglePerimeter(a, b, c) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function trianglePerimeter(a, b, c) {\n  return a + b + c;\n}",
        tests: [
          { input: "console.log(trianglePerimeter(3, 4, 5))", expected: "12", label: "3, 4, 5 perimetr" },
          { input: "console.log(trianglePerimeter(10, 10, 10))", expected: "30", label: "Teng tomonli" }
        ]
      },
      python: {
        initialCode: "def triangle_perimeter(a, b, c):\n    pass\n",
        solution: "def triangle_perimeter(a, b, c):\n    return a + b + c\n",
        tests: [
          { input: "print(triangle_perimeter(3, 4, 5))", expected: "12", label: "3, 4, 5" }
        ]
      }
    }
  },

  // 7. rectangle-area (8 kyu)
  {
    id: "rectangle-area",
    title: "To'g'ri To'rtburchak Yuzi",
    slug: "rectangle-area",
    difficulty: 8,
    category: "Geometry",
    tags: ["geometry", "math"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
To'g'ri to'rtburchakning eni \`w\` va bo'yi \`h\` berilgan. Uning yuzini (\`w * h\`) hisoblang.

### 💡 Misollar:
\`\`\`javascript
rectangleArea(5, 10) // 50
rectangleArea(3, 7)  // 21
\`\`\``,
    examples: [
      { input: "5, 10", output: "50" }
    ],
    languages: {
      javascript: {
        initialCode: "function rectangleArea(w, h) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function rectangleArea(w, h) {\n  return w * h;\n}",
        tests: [
          { input: "console.log(rectangleArea(5, 10))", expected: "50", label: "5 * 10" },
          { input: "console.log(rectangleArea(3, 7))", expected: "21", label: "3 * 7" }
        ]
      },
      python: {
        initialCode: "def rectangle_area(w, h):\n    pass\n",
        solution: "def rectangle_area(w, h):\n    return w * h\n",
        tests: [
          { input: "print(rectangle_area(5, 10))", expected: "50", label: "5, 10" }
        ]
      }
    }
  },

  // 8. is-positive-number (8 kyu)
  {
    id: "is-positive-number",
    title: "Son Musbatligini Aniqlash",
    slug: "is-positive-number",
    difficulty: 8,
    category: "Logic",
    tags: ["logic", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` soni 0 dan katta (musbat) bo'lsa \`true\`, aks holda (manfiy yoki nol bo'lsa) \`false\` qaytaruvchi \`isPositive\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
isPositive(5)  // true
isPositive(-3) // false
isPositive(0)  // false
\`\`\``,
    examples: [
      { input: "5", output: "true" },
      { input: "-3", output: "false" }
    ],
    languages: {
      javascript: {
        initialCode: "function isPositive(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isPositive(n) {\n  return n > 0;\n}",
        tests: [
          { input: "console.log(isPositive(5))", expected: "true", label: "Musbat son" },
          { input: "console.log(isPositive(-3))", expected: "false", label: "Manfiy son" },
          { input: "console.log(isPositive(0))", expected: "false", label: "Nol soni" }
        ]
      },
      python: {
        initialCode: "def is_positive(n):\n    pass\n",
        solution: "def is_positive(n):\n    return n > 0\n",
        tests: [
          { input: "print(is_positive(5))", expected: "True", label: "5" },
          { input: "print(is_positive(-3))", expected: "False", label: "-3" }
        ]
      }
    }
  },

  // 9. is-negative-number (8 kyu)
  {
    id: "is-negative-number",
    title: "Son Manfiyligini Aniqlash",
    slug: "is-negative-number",
    difficulty: 8,
    category: "Logic",
    tags: ["logic", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` soni 0 dan kichik (manfiy) bo'lsa \`true\`, aks holda \`false\` qaytaring.

### 💡 Misollar:
\`\`\`javascript
isNegative(-10) // true
isNegative(5)   // false
isNegative(0)   // false
\`\`\``,
    examples: [
      { input: "-10", output: "true" }
    ],
    languages: {
      javascript: {
        initialCode: "function isNegative(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isNegative(n) {\n  return n < 0;\n}",
        tests: [
          { input: "console.log(isNegative(-10))", expected: "true", label: "Manfiy son" },
          { input: "console.log(isNegative(5))", expected: "false", label: "Musbat son" },
          { input: "console.log(isNegative(0))", expected: "false", label: "Nol" }
        ]
      },
      python: {
        initialCode: "def is_negative(n):\n    pass\n",
        solution: "def is_negative(n):\n    return n < 0\n",
        tests: [
          { input: "print(is_negative(-10))", expected: "True", label: "-10" }
        ]
      }
    }
  },

  // 10. is-divisible-by-five (8 kyu)
  {
    id: "is-divisible-by-five",
    title: "Son 5 ga Bo'linadimi?",
    slug: "is-divisible-by-five",
    difficulty: 8,
    category: "Math",
    tags: ["math", "logic"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` butun soni 5 ga qoldiqsiz bo'linsa \`true\`, aks holda \`false\` qaytaruvchi \`isDivisibleByFive\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
isDivisibleByFive(25) // true
isDivisibleByFive(14) // false
\`\`\``,
    examples: [
      { input: "25", output: "true" }
    ],
    languages: {
      javascript: {
        initialCode: "function isDivisibleByFive(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isDivisibleByFive(n) {\n  return n % 5 === 0;\n}",
        tests: [
          { input: "console.log(isDivisibleByFive(25))", expected: "true", label: "25 bo'linadi" },
          { input: "console.log(isDivisibleByFive(14))", expected: "false", label: "14 bo'linmaydi" }
        ]
      },
      python: {
        initialCode: "def is_divisible_by_five(n):\n    pass\n",
        solution: "def is_divisible_by_five(n):\n    return n % 5 == 0\n",
        tests: [
          { input: "print(is_divisible_by_five(25))", expected: "True", label: "25" }
        ]
      }
    }
  },

  // 11. opposite-boolean (8 kyu)
  {
    id: "opposite-boolean",
    title: "Mantiqiy Qiymat Inqori (Invert Boolean)",
    slug: "opposite-boolean",
    difficulty: 8,
    category: "Logic",
    tags: ["logic", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan mantiqiy (boolean) \`b\` qiymatining teskarisini qaytaring (\`true\` bo'lsa \`false\`, \`false\` bo'lsa \`true\`).

### 💡 Misollar:
\`\`\`javascript
invertBoolean(true)  // false
invertBoolean(false) // true
\`\`\``,
    examples: [
      { input: "true", output: "false" }
    ],
    languages: {
      javascript: {
        initialCode: "function invertBoolean(b) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function invertBoolean(b) {\n  return !b;\n}",
        tests: [
          { input: "console.log(invertBoolean(true))", expected: "false", label: "!true" },
          { input: "console.log(invertBoolean(false))", expected: "true", label: "!false" }
        ]
      },
      python: {
        initialCode: "def invert_boolean(b):\n    pass\n",
        solution: "def invert_boolean(b):\n    return not b\n",
        tests: [
          { input: "print(invert_boolean(True))", expected: "False", label: "not True" }
        ]
      }
    }
  },

  // 12. string-length-check (8 kyu)
  {
    id: "string-length-check",
    title: "Matn Uzunligini Aniqlash",
    slug: "string-length-check",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`s\` satrining uzunligini (belgilar sonini) aniqlovchi \`getStringLength\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
getStringLength("hello")   // 5
getStringLength("")        // 0
getStringLength("codewar") // 7
\`\`\``,
    examples: [
      { input: "'hello'", output: "5" }
    ],
    languages: {
      javascript: {
        initialCode: "function getStringLength(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function getStringLength(s) {\n  return s.length;\n}",
        tests: [
          { input: "console.log(getStringLength('hello'))", expected: "5", label: "hello -> 5" },
          { input: "console.log(getStringLength(''))", expected: "0", label: "bo'sh matn -> 0" }
        ]
      },
      python: {
        initialCode: "def get_string_length(s):\n    pass\n",
        solution: "def get_string_length(s):\n    return len(s)\n",
        tests: [
          { input: "print(get_string_length('hello'))", expected: "5", label: "hello" }
        ]
      }
    }
  },

  // 13. sum-of-three-numbers (8 kyu)
  {
    id: "sum-of-three-numbers",
    title: "Uchta Sonning Yig'indisi",
    slug: "sum-of-three-numbers",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Uchta \`a\`, \`b\`, \`c\` sonlarining yig'indisini hisoblab qaytaruvchi \`sumThree\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
sumThree(1, 2, 3)    // 6
sumThree(10, 20, 30) // 60
\`\`\``,
    examples: [
      { input: "1, 2, 3", output: "6" }
    ],
    languages: {
      javascript: {
        initialCode: "function sumThree(a, b, c) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function sumThree(a, b, c) {\n  return a + b + c;\n}",
        tests: [
          { input: "console.log(sumThree(1, 2, 3))", expected: "6", label: "1 + 2 + 3" },
          { input: "console.log(sumThree(10, 20, 30))", expected: "60", label: "10 + 20 + 30" }
        ]
      },
      python: {
        initialCode: "def sum_three(a, b, c):\n    pass\n",
        solution: "def sum_three(a, b, c):\n    return a + b + c\n",
        tests: [
          { input: "print(sum_three(1, 2, 3))", expected: "6", label: "1, 2, 3" }
        ]
      }
    }
  },

  // 14. multiply-three-numbers (8 kyu)
  {
    id: "multiply-three-numbers",
    title: "Uchta Sonning Ko'paytmasi",
    slug: "multiply-three-numbers",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Uchta \`a\`, \`b\`, \`c\` sonlarining ko'paytmasini (\`a * b * c\`) hisoblab qaytaring.

### 💡 Misollar:
\`\`\`javascript
multiplyThree(2, 3, 4) // 24
multiplyThree(1, 5, 0) // 0
\`\`\``,
    examples: [
      { input: "2, 3, 4", output: "24" }
    ],
    languages: {
      javascript: {
        initialCode: "function multiplyThree(a, b, c) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function multiplyThree(a, b, c) {\n  return a * b * c;\n}",
        tests: [
          { input: "console.log(multiplyThree(2, 3, 4))", expected: "24", label: "2 * 3 * 4" },
          { input: "console.log(multiplyThree(1, 5, 0))", expected: "0", label: "nol bilan ko'paytirish" }
        ]
      },
      python: {
        initialCode: "def multiply_three(a, b, c):\n    pass\n",
        solution: "def multiply_three(a, b, c):\n    return a * b * c\n",
        tests: [
          { input: "print(multiply_three(2, 3, 4))", expected: "24", label: "2, 3, 4" }
        ]
      }
    }
  },

  // 15. check-greater (8 kyu)
  {
    id: "check-greater",
    title: "Birinchi Son Kattaroqmi?",
    slug: "check-greater",
    difficulty: 8,
    category: "Logic",
    tags: ["logic", "numbers"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Ikkita \`a\` va \`b\` sonlari berilgan. Agar \`a > b\` bo'lsa \`true\`, aks holda \`false\` qaytaring.

### 💡 Misollar:
\`\`\`javascript
isGreater(10, 5) // true
isGreater(3, 8)  // false
\`\`\``,
    examples: [
      { input: "10, 5", output: "true" }
    ],
    languages: {
      javascript: {
        initialCode: "function isGreater(a, b) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isGreater(a, b) {\n  return a > b;\n}",
        tests: [
          { input: "console.log(isGreater(10, 5))", expected: "true", label: "10 > 5" },
          { input: "console.log(isGreater(3, 8))", expected: "false", label: "3 > 8" }
        ]
      },
      python: {
        initialCode: "def is_greater(a, b):\n    pass\n",
        solution: "def is_greater(a, b):\n    return a > b\n",
        tests: [
          { input: "print(is_greater(10, 5))", expected: "True", label: "10, 5" }
        ]
      }
    }
  },

  // 16. check-equal-values (8 kyu)
  {
    id: "check-equal-values",
    title: "Ikkita Qiymat Tengmi?",
    slug: "check-equal-values",
    difficulty: 8,
    category: "Logic",
    tags: ["logic", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Ikkita \`a\` va \`b\` qiymatlari berilgan. Agar ular qat'iy teng bo'lsa (\`===\`) \`true\`, aks holda \`false\` qaytaring.

### 💡 Misollar:
\`\`\`javascript
areEqual(5, 5) // true
areEqual(5, 6) // false
\`\`\``,
    examples: [
      { input: "5, 5", output: "true" }
    ],
    languages: {
      javascript: {
        initialCode: "function areEqual(a, b) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function areEqual(a, b) {\n  return a === b;\n}",
        tests: [
          { input: "console.log(areEqual(5, 5))", expected: "true", label: "5 === 5" },
          { input: "console.log(areEqual(5, 6))", expected: "false", label: "5 !== 6" }
        ]
      },
      python: {
        initialCode: "def are_equal(a, b):\n    pass\n",
        solution: "def are_equal(a, b):\n    return a == b\n",
        tests: [
          { input: "print(are_equal(5, 5))", expected: "True", label: "5, 5" }
        ]
      }
    }
  },

  // 17. string-concat-space (8 kyu)
  {
    id: "string-concat-space",
    title: "Ikkita So'zni Birlashtirish",
    slug: "string-concat-space",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Ikkita \`w1\` va \`w2\` so'zlari berilgan. Ularni bitta bo'shliq (probel) bilan ajratib birlashtiruvchi \`joinWords\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
joinWords("Salom", "Dunyo") // "Salom Dunyo"
joinWords("Open", "AI")     // "Open AI"
\`\`\``,
    examples: [
      { input: "'Salom', 'Dunyo'", output: "Salom Dunyo" }
    ],
    languages: {
      javascript: {
        initialCode: "function joinWords(w1, w2) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function joinWords(w1, w2) {\n  return w1 + ' ' + w2;\n}",
        tests: [
          { input: "console.log(joinWords('Salom', 'Dunyo'))", expected: "Salom Dunyo", label: "Salom Dunyo" },
          { input: "console.log(joinWords('Open', 'AI'))", expected: "Open AI", label: "Open AI" }
        ]
      },
      python: {
        initialCode: "def join_words(w1, w2):\n    pass\n",
        solution: "def join_words(w1, w2):\n    return f'{w1} {w2}'\n",
        tests: [
          { input: "print(join_words('Salom', 'Dunyo'))", expected: "Salom Dunyo", label: "join" }
        ]
      }
    }
  },

  // 18. repeat-hello-n-times (8 kyu)
  {
    id: "repeat-hello-n-times",
    title: "Salom So'zini N Marta Takrorlash",
    slug: "repeat-hello-n-times",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "loops"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
\`n\` musbat butun soni berilgan. \`"Hello"\` so'zini \`n\` marta bo'shliq (probel) bilan ajratib qaytaring.

### 💡 Misollar:
\`\`\`javascript
repeatHello(3) // "Hello Hello Hello"
repeatHello(1) // "Hello"
\`\`\``,
    examples: [
      { input: "3", output: "Hello Hello Hello" }
    ],
    languages: {
      javascript: {
        initialCode: "function repeatHello(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function repeatHello(n) {\n  return Array(n).fill('Hello').join(' ');\n}",
        tests: [
          { input: "console.log(repeatHello(3))", expected: "Hello Hello Hello", label: "3 marta Hello" },
          { input: "console.log(repeatHello(1))", expected: "Hello", label: "1 marta Hello" }
        ]
      },
      python: {
        initialCode: "def repeat_hello(n):\n    pass\n",
        solution: "def repeat_hello(n):\n    return ' '.join(['Hello'] * n)\n",
        tests: [
          { input: "print(repeat_hello(3))", expected: "Hello Hello Hello", label: "3 Hello" }
        ]
      }
    }
  },

  // 19. speed-distance-time (8 kyu)
  {
    id: "speed-distance-time",
    title: "Harakat Tezligini Hisoblash",
    slug: "speed-distance-time",
    difficulty: 8,
    category: "Math",
    tags: ["math", "physics"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Bosib o'tilgan masofa \`dist\` va sarflangan vaqt \`time\` berilgan. O'rtacha harakat tezligini (\`dist / time\`) hisoblang.

### 💡 Misollar:
\`\`\`javascript
calculateSpeed(100, 2) // 50
calculateSpeed(60, 1)  // 60
\`\`\``,
    examples: [
      { input: "100, 2", output: "50" }
    ],
    languages: {
      javascript: {
        initialCode: "function calculateSpeed(dist, time) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function calculateSpeed(dist, time) {\n  return dist / time;\n}",
        tests: [
          { input: "console.log(calculateSpeed(100, 2))", expected: "50", label: "100 / 2 = 50" },
          { input: "console.log(calculateSpeed(60, 1))", expected: "60", label: "60 / 1 = 60" }
        ]
      },
      python: {
        initialCode: "def calculate_speed(dist, time):\n    pass\n",
        solution: "def calculate_speed(dist, time):\n    return dist / time\n",
        tests: [
          { input: "print(int(calculate_speed(100, 2)))", expected: "50", label: "speed" }
        ]
      }
    }
  },

  // 20. check-voting-age (8 kyu)
  {
    id: "check-voting-age",
    title: "Ovoz Berish Yoshiga Yetganmi?",
    slug: "check-voting-age",
    difficulty: 8,
    category: "Logic",
    tags: ["logic", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Foydalanuvchining yoshi \`age\` berilgan. Agar \`age >= 18\` bo'lsa \`true\`, aks holda \`false\` qaytaruvchi \`canVote\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
canVote(18) // true
canVote(16) // false
canVote(25) // true
\`\`\``,
    examples: [
      { input: "18", output: "true" }
    ],
    languages: {
      javascript: {
        initialCode: "function canVote(age) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function canVote(age) {\n  return age >= 18;\n}",
        tests: [
          { input: "console.log(canVote(18))", expected: "true", label: "18 yosh" },
          { input: "console.log(canVote(16))", expected: "false", label: "16 yosh" }
        ]
      },
      python: {
        initialCode: "def can_vote(age):\n    pass\n",
        solution: "def can_vote(age):\n    return age >= 18\n",
        tests: [
          { input: "print(can_vote(18))", expected: "True", label: "18" }
        ]
      }
    }
  },

  // 21. is-weekend-day (8 kyu)
  {
    id: "is-weekend-day",
    title: "Dam Olish Kuni Aniqlash (1..7)",
    slug: "is-weekend-day",
    difficulty: 8,
    category: "Logic",
    tags: ["logic", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Haftaning kuni \`day\` soni bilan berilgan (1 = Dushanba, ..., 6 = Shanba, 7 = Yakshanba).
Agar kun shanba (6) yoki yakshanba (7) bo'lsa \`true\`, ish kuni (1..5) bo'lsa \`false\` qaytaring.

### 💡 Misollar:
\`\`\`javascript
isWeekend(6) // true
isWeekend(7) // true
isWeekend(3) // false
\`\`\``,
    examples: [
      { input: "6", output: "true" }
    ],
    languages: {
      javascript: {
        initialCode: "function isWeekend(day) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isWeekend(day) {\n  return day === 6 || day === 7;\n}",
        tests: [
          { input: "console.log(isWeekend(6))", expected: "true", label: "Shanba" },
          { input: "console.log(isWeekend(3))", expected: "false", label: "Chorshanba" }
        ]
      },
      python: {
        initialCode: "def is_weekend(day):\n    pass\n",
        solution: "def is_weekend(day):\n    return day in (6, 7)\n",
        tests: [
          { input: "print(is_weekend(6))", expected: "True", label: "6" }
        ]
      }
    }
  },

  // 22. calculate-discount-price (8 kyu)
  {
    id: "calculate-discount-price",
    title: "Chegirmadan Keyingi Narxni Topish",
    slug: "calculate-discount-price",
    difficulty: 8,
    category: "Math",
    tags: ["math", "numbers"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Mahsulot narxi \`price\` va chegirma foizi \`discount\` (0 dan 100 gacha) berilgan. Chegirmadan keyingi yangi narxni hisoblang: \`price - (price * discount / 100)\`.

### 💡 Misollar:
\`\`\`javascript
applyDiscount(100, 20) // 80
applyDiscount(50, 10)  // 45
\`\`\``,
    examples: [
      { input: "100, 20", output: "80" }
    ],
    languages: {
      javascript: {
        initialCode: "function applyDiscount(price, discount) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function applyDiscount(price, discount) {\n  return price - (price * discount / 100);\n}",
        tests: [
          { input: "console.log(applyDiscount(100, 20))", expected: "80", label: "100 narx 20% chegirma" },
          { input: "console.log(applyDiscount(50, 10))", expected: "45", label: "50 narx 10% chegirma" }
        ]
      },
      python: {
        initialCode: "def apply_discount(price, discount):\n    pass\n",
        solution: "def apply_discount(price, discount):\n    return price - (price * discount / 100)\n",
        tests: [
          { input: "print(int(apply_discount(100, 20)))", expected: "80", label: "100, 20" }
        ]
      }
    }
  },

  // 23. check-empty-string (8 kyu)
  {
    id: "check-empty-string",
    title: "Matn Bo'shmi?",
    slug: "check-empty-string",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "logic"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`s\` satri bo'sh bo'lsa (\`""\`) \`true\`, aks holda \`false\` qaytaring.

### 💡 Misollar:
\`\`\`javascript
isEmptyString("")  // true
isEmptyString("a") // false
\`\`\``,
    examples: [
      { input: "''", output: "true" }
    ],
    languages: {
      javascript: {
        initialCode: "function isEmptyString(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isEmptyString(s) {\n  return s === '';\n}",
        tests: [
          { input: "console.log(isEmptyString(''))", expected: "true", label: "bo'sh matn" },
          { input: "console.log(isEmptyString('a'))", expected: "false", label: "a harfi" }
        ]
      },
      python: {
        initialCode: "def is_empty_string(s):\n    pass\n",
        solution: "def is_empty_string(s):\n    return s == ''\n",
        tests: [
          { input: "print(is_empty_string(''))", expected: "True", label: "empty" }
        ]
      }
    }
  },

  // 24. first-character-of-string (8 kyu)
  {
    id: "first-character-of-string",
    title: "Matnning Birinchi Harfi",
    slug: "first-character-of-string",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`s\` satrining birinchi belgisini qaytaruvchi \`firstChar\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
firstChar("Python")   // "P"
firstChar("Frontend") // "F"
\`\`\``,
    examples: [
      { input: "'Python'", output: "P" }
    ],
    languages: {
      javascript: {
        initialCode: "function firstChar(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function firstChar(s) {\n  return s[0] || '';\n}",
        tests: [
          { input: "console.log(firstChar('Python'))", expected: "P", label: "Python -> P" },
          { input: "console.log(firstChar('Frontend'))", expected: "F", label: "Frontend -> F" }
        ]
      },
      python: {
        initialCode: "def first_char(s):\n    pass\n",
        solution: "def first_char(s):\n    return s[0] if s else ''\n",
        tests: [
          { input: "print(first_char('Python'))", expected: "P", label: "Python" }
        ]
      }
    }
  },

  // 25. last-character-of-string (8 kyu)
  {
    id: "last-character-of-string",
    title: "Matnning Oxirgi Harfi",
    slug: "last-character-of-string",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`s\` satrining eng oxirgi belgisini qaytaruvchi \`lastChar\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
lastChar("Python")  // "n"
lastChar("Codewar") // "r"
\`\`\``,
    examples: [
      { input: "'Python'", output: "n" }
    ],
    languages: {
      javascript: {
        initialCode: "function lastChar(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function lastChar(s) {\n  return s[s.length - 1] || '';\n}",
        tests: [
          { input: "console.log(lastChar('Python'))", expected: "n", label: "Python -> n" },
          { input: "console.log(lastChar('Codewar'))", expected: "r", label: "Codewar -> r" }
        ]
      },
      python: {
        initialCode: "def last_char(s):\n    pass\n",
        solution: "def last_char(s):\n    return s[-1] if s else ''\n",
        tests: [
          { input: "print(last_char('Python'))", expected: "n", label: "Python" }
        ]
      }
    }
  },

  // 26. array-first-plus-last (8 kyu)
  {
    id: "array-first-plus-last",
    title: "Massiv Boshidagi va Oxiridagi Elementlar Yig'indisi",
    slug: "array-first-plus-last",
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "math"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Sonlar massivi \`arr\` berilgan. Uning birinchi va oxirgi elementlari yig'indisini hisoblang.

### 💡 Misollar:
\`\`\`javascript
firstPlusLast([5, 10, 15])      // 20 (5 + 15)
firstPlusLast([1, 2, 3, 4, 9])  // 10 (1 + 9)
\`\`\``,
    examples: [
      { input: "[5, 10, 15]", output: "20" }
    ],
    languages: {
      javascript: {
        initialCode: "function firstPlusLast(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function firstPlusLast(arr) {\n  return arr[0] + arr[arr.length - 1];\n}",
        tests: [
          { input: "console.log(firstPlusLast([5, 10, 15]))", expected: "20", label: "5 + 15 = 20" },
          { input: "console.log(firstPlusLast([1, 2, 3, 4, 9]))", expected: "10", label: "1 + 9 = 10" }
        ]
      },
      python: {
        initialCode: "def first_plus_last(arr):\n    pass\n",
        solution: "def first_plus_last(arr):\n    return arr[0] + arr[-1]\n",
        tests: [
          { input: "print(first_plus_last([5, 10, 15]))", expected: "20", label: "first plus last" }
        ]
      }
    }
  },

  // 27. double-number (8 kyu)
  {
    id: "double-number",
    title: "Sonni Ikki Barobar Oshirish",
    slug: "double-number",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` sonini 2 ga ko'paytirib qaytaruvchi \`doubleNumber\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
doubleNumber(7)  // 14
doubleNumber(-4) // -8
\`\`\``,
    examples: [
      { input: "7", output: "14" }
    ],
    languages: {
      javascript: {
        initialCode: "function doubleNumber(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function doubleNumber(n) {\n  return n * 2;\n}",
        tests: [
          { input: "console.log(doubleNumber(7))", expected: "14", label: "7 * 2 = 14" },
          { input: "console.log(doubleNumber(-4))", expected: "-8", label: "-4 * 2 = -8" }
        ]
      },
      python: {
        initialCode: "def double_number(n):\n    pass\n",
        solution: "def double_number(n):\n    return n * 2\n",
        tests: [
          { input: "print(double_number(7))", expected: "14", label: "7" }
        ]
      }
    }
  },

  // 28. triple-number (8 kyu)
  {
    id: "triple-number",
    title: "Sonni Uch Barobar Oshirish",
    slug: "triple-number",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` sonini 3 ga ko'paytirib qaytaruvchi \`tripleNumber\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
tripleNumber(5) // 15
tripleNumber(0) // 0
\`\`\``,
    examples: [
      { input: "5", output: "15" }
    ],
    languages: {
      javascript: {
        initialCode: "function tripleNumber(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function tripleNumber(n) {\n  return n * 3;\n}",
        tests: [
          { input: "console.log(tripleNumber(5))", expected: "15", label: "5 * 3 = 15" },
          { input: "console.log(tripleNumber(0))", expected: "0", label: "0 * 3 = 0" }
        ]
      },
      python: {
        initialCode: "def triple_number(n):\n    pass\n",
        solution: "def triple_number(n):\n    return n * 3\n",
        tests: [
          { input: "print(triple_number(5))", expected: "15", label: "5" }
        ]
      }
    }
  },

  // 29. half-number (8 kyu)
  {
    id: "half-number",
    title: "Sonning Yarmini Topish",
    slug: "half-number",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` sonining yarmini (\`n / 2\`) qaytaring.

### 💡 Misollar:
\`\`\`javascript
halfNumber(10) // 5
halfNumber(7)  // 3.5
\`\`\``,
    examples: [
      { input: "10", output: "5" }
    ],
    languages: {
      javascript: {
        initialCode: "function halfNumber(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function halfNumber(n) {\n  return n / 2;\n}",
        tests: [
          { input: "console.log(halfNumber(10))", expected: "5", label: "10 / 2 = 5" },
          { input: "console.log(halfNumber(7))", expected: "3.5", label: "7 / 2 = 3.5" }
        ]
      },
      python: {
        initialCode: "def half_number(n):\n    pass\n",
        solution: "def half_number(n):\n    return n / 2\n",
        tests: [
          { input: "print(half_number(10))", expected: "5.0", label: "10" }
        ]
      }
    }
  },

  // 30. next-integer-number (8 kyu)
  {
    id: "next-integer-number",
    title: "Keyingi Butun Son",
    slug: "next-integer-number",
    difficulty: 8,
    category: "Math",
    tags: ["math", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` butun sonidan keyin keluvchi navbatdagi sonni (\`n + 1\`) qaytaring.

### 💡 Misollar:
\`\`\`javascript
nextNumber(9)  // 10
nextNumber(-1) // 0
\`\`\``,
    examples: [
      { input: "9", output: "10" }
    ],
    languages: {
      javascript: {
        initialCode: "function nextNumber(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function nextNumber(n) {\n  return n + 1;\n}",
        tests: [
          { input: "console.log(nextNumber(9))", expected: "10", label: "9 -> 10" },
          { input: "console.log(nextNumber(-1))", expected: "0", label: "-1 -> 0" }
        ]
      },
      python: {
        initialCode: "def next_number(n):\n    pass\n",
        solution: "def next_number(n):\n    return n + 1\n",
        tests: [
          { input: "print(next_number(9))", expected: "10", label: "next" }
        ]
      }
    }
  },

  // 31. circle-diameter-to-radius (8 kyu)
  {
    id: "circle-diameter-to-radius",
    title: "Diametrdan Radiusni Topish",
    slug: "circle-diameter-to-radius",
    difficulty: 8,
    category: "Geometry",
    tags: ["geometry", "math"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Doiraning diametri \`d\` berilgan. Uning radiusi \`r\` ni hisoblang (\`r = d / 2\`).

### 💡 Misollar:
\`\`\`javascript
diameterToRadius(10) // 5
diameterToRadius(24) // 12
\`\`\``,
    examples: [
      { input: "10", output: "5" }
    ],
    languages: {
      javascript: {
        initialCode: "function diameterToRadius(d) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function diameterToRadius(d) {\n  return d / 2;\n}",
        tests: [
          { input: "console.log(diameterToRadius(10))", expected: "5", label: "10 -> 5" },
          { input: "console.log(diameterToRadius(24))", expected: "12", label: "24 -> 12" }
        ]
      },
      python: {
        initialCode: "def diameter_to_radius(d):\n    pass\n",
        solution: "def diameter_to_radius(d):\n    return d / 2\n",
        tests: [
          { input: "print(int(diameter_to_radius(10)))", expected: "5", label: "radius" }
        ]
      }
    }
  },

  // 32. formal-greeting (8 kyu)
  {
    id: "formal-greeting",
    title: "Rasmiy Murojaat Shakllantirish (Janob / Xonim)",
    slug: "formal-greeting",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "logic"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Ism \`name\` va jins kodi \`gender\` (\`"m"\` - erkak, \`"f"\` - ayol) beriladi.
Agar erkak bo'lsa \`"Janob <name>"\`, ayol bo'lsa \`"Xonim <name>"\` satrini qaytaring.

### 💡 Misollar:
\`\`\`javascript
formalGreeting("Ali", "m")    // "Janob Ali"
formalGreeting("Madina", "f") // "Xonim Madina"
\`\`\``,
    examples: [
      { input: "'Ali', 'm'", output: "Janob Ali" }
    ],
    languages: {
      javascript: {
        initialCode: "function formalGreeting(name, gender) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function formalGreeting(name, gender) {\n  return (gender === 'm' ? 'Janob ' : 'Xonim ') + name;\n}",
        tests: [
          { input: "console.log(formalGreeting('Ali', 'm'))", expected: "Janob Ali", label: "Erkak" },
          { input: "console.log(formalGreeting('Madina', 'f'))", expected: "Xonim Madina", label: "Ayol" }
        ]
      },
      python: {
        initialCode: "def formal_greeting(name, gender):\n    pass\n",
        solution: "def formal_greeting(name, gender):\n    return ('Janob ' if gender == 'm' else 'Xonim ') + name\n",
        tests: [
          { input: "print(formal_greeting('Ali', 'm'))", expected: "Janob Ali", label: "Ali" }
        ]
      }
    }
  },

  // 33. is-number-zero (8 kyu)
  {
    id: "is-number-zero",
    title: "Son Nolga Tengmi?",
    slug: "is-number-zero",
    difficulty: 8,
    category: "Logic",
    tags: ["logic", "fundamentals"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` soni 0 ga teng bo'lsa \`true\`, aks holda \`false\` qaytaring.

### 💡 Misollar:
\`\`\`javascript
isZero(0) // true
isZero(5) // false
\`\`\``,
    examples: [
      { input: "0", output: "true" }
    ],
    languages: {
      javascript: {
        initialCode: "function isZero(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isZero(n) {\n  return n === 0;\n}",
        tests: [
          { input: "console.log(isZero(0))", expected: "true", label: "0 -> true" },
          { input: "console.log(isZero(5))", expected: "false", label: "5 -> false" }
        ]
      },
      python: {
        initialCode: "def is_zero(n):\n    pass\n",
        solution: "def is_zero(n):\n    return n == 0\n",
        tests: [
          { input: "print(is_zero(0))", expected: "True", label: "0" }
        ]
      }
    }
  },

  // 34. sum-min-max (8 kyu)
  {
    id: "sum-min-max",
    title: "Eng Kichik va Eng Katta Sonlar Yig'indisi",
    slug: "sum-min-max",
    difficulty: 8,
    category: "Arrays",
    tags: ["arrays", "math"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Bo'sh bo'lmagan sonlar massivi \`arr\` berilgan. Uning ichidagi eng kichik (minimal) va eng katta (maksimal) elementlarining yig'indisini qaytaring.

### 💡 Misollar:
\`\`\`javascript
sumMinMax([1, 2, 3, 4, 5]) // 6 (1 + 5)
sumMinMax([10, -5, 20])    // 15 (-5 + 20)
\`\`\``,
    examples: [
      { input: "[1, 2, 3, 4, 5]", output: "6" }
    ],
    languages: {
      javascript: {
        initialCode: "function sumMinMax(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function sumMinMax(arr) {\n  return Math.min(...arr) + Math.max(...arr);\n}",
        tests: [
          { input: "console.log(sumMinMax([1, 2, 3, 4, 5]))", expected: "6", label: "1 + 5 = 6" },
          { input: "console.log(sumMinMax([10, -5, 20]))", expected: "15", label: "-5 + 20 = 15" }
        ]
      },
      python: {
        initialCode: "def sum_min_max(arr):\n    pass\n",
        solution: "def sum_min_max(arr):\n    return min(arr) + max(arr)\n",
        tests: [
          { input: "print(sum_min_max([1, 2, 3, 4, 5]))", expected: "6", label: "min max" }
        ]
      }
    }
  },

  // 35. make-plural-word (8 kyu)
  {
    id: "make-plural-word",
    title: "So'zni Ko'plikka Aylantirish (-s qo'shimchasi)",
    slug: "make-plural-word",
    difficulty: 8,
    category: "Strings",
    tags: ["strings", "logic"],
    isPremium: false,
    xpReward: 15,
    description: `### 🎯 Masala Maqsadi:
Miqdor \`count\` va so'z \`word\` berilgan. Agar \`count === 1\` bo'lsa so'zning o'zini, aks holda oxiriga \`"s"\` harfini qo'shib qaytaruvchi \`makePlural\` funksiyasini yozing.

### 💡 Misollar:
\`\`\`javascript
makePlural(1, "apple") // "apple"
makePlural(5, "apple") // "apples"
makePlural(0, "book")  // "books"
\`\`\``,
    examples: [
      { input: "1, 'apple'", output: "apple" },
      { input: "5, 'apple'", output: "apples" }
    ],
    languages: {
      javascript: {
        initialCode: "function makePlural(count, word) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function makePlural(count, word) {\n  return count === 1 ? word : word + 's';\n}",
        tests: [
          { input: "console.log(makePlural(1, 'apple'))", expected: "apple", label: "1 apple" },
          { input: "console.log(makePlural(5, 'apple'))", expected: "apples", label: "5 apples" }
        ]
      },
      python: {
        initialCode: "def make_plural(count, word):\n    pass\n",
        solution: "def make_plural(count, word):\n    return word if count == 1 else word + 's'\n",
        tests: [
          { input: "print(make_plural(1, 'apple'))", expected: "apple", label: "1 apple" },
          { input: "print(make_plural(5, 'apple'))", expected: "apples", label: "5 apples" }
        ]
      }
    }
  },

  // 36. sum-of-cubes-to-n (7 kyu)
  {
    id: "sum-of-cubes-to-n",
    title: "1 dan N gacha Bo'lgan Sonlar Kublari Yig'indisi",
    slug: "sum-of-cubes-to-n",
    difficulty: 7,
    category: "Math",
    tags: ["math", "algorithms"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Musbat butun \`n\` soni berilgan. 1 dan \`n\` gacha bo'lgan barcha butun sonlarning kublari yig'indisini hisoblang:
\`1³ + 2³ + ... + n³\`.

### 💡 Misollar:
\`\`\`javascript
sumCubes(2) // 9  (1 + 8)
sumCubes(3) // 36 (1 + 8 + 27)
\`\`\``,
    examples: [
      { input: "2", output: "9" },
      { input: "3", output: "36" }
    ],
    languages: {
      javascript: {
        initialCode: "function sumCubes(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function sumCubes(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i++) sum += i ** 3;\n  return sum;\n}",
        tests: [
          { input: "console.log(sumCubes(2))", expected: "9", label: "n = 2 -> 9" },
          { input: "console.log(sumCubes(3))", expected: "36", label: "n = 3 -> 36" }
        ]
      },
      python: {
        initialCode: "def sum_cubes(n):\n    pass\n",
        solution: "def sum_cubes(n):\n    return sum(i**3 for i in range(1, n + 1))\n",
        tests: [
          { input: "print(sum_cubes(2))", expected: "9", label: "n=2" },
          { input: "print(sum_cubes(3))", expected: "36", label: "n=3" }
        ]
      }
    }
  },

  // 37. count-letter-occurrences (7 kyu)
  {
    id: "count-letter-occurrences",
    title: "Matnda Berilgan Harf Necha Marta Qatnashgan?",
    slug: "count-letter-occurrences",
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "algorithms"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Satr \`str\` va bitta harf \`char\` berilgan. Harflar katta-kichikligidan qat'iy nazar (case-insensitive), \`char\` belgisi satrda necha marta qatnashganini hisoblang.

### 💡 Misollar:
\`\`\`javascript
countLetter("Hello World", "l") // 3
countLetter("JavaScript", "a")  // 2
\`\`\``,
    examples: [
      { input: "'Hello World', 'l'", output: "3" }
    ],
    languages: {
      javascript: {
        initialCode: "function countLetter(str, char) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function countLetter(str, char) {\n  const target = char.toLowerCase();\n  return str.split('').filter(c => c.toLowerCase() === target).length;\n}",
        tests: [
          { input: "console.log(countLetter('Hello World', 'l'))", expected: "3", label: "'l' 3 marta" },
          { input: "console.log(countLetter('JavaScript', 'a'))", expected: "2", label: "'a' 2 marta" }
        ]
      },
      python: {
        initialCode: "def count_letter(s, char):\n    pass\n",
        solution: "def count_letter(s, char):\n    return s.lower().count(char.lower())\n",
        tests: [
          { input: "print(count_letter('Hello World', 'l'))", expected: "3", label: "count l" }
        ]
      }
    }
  },

  // 38. sum-of-digits-number (7 kyu)
  {
    id: "sum-of-digits-number",
    title: "Sonning Raqamlari Yig'indisi",
    slug: "sum-of-digits-number",
    difficulty: 7,
    category: "Math",
    tags: ["math", "numbers"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Ixtiyoriy butun \`n\` soni berilgan. Uning raqamlari yig'indisini hisoblab qaytaring (manfiy son bo'lsa, ishorani hisobga olmang).

### 💡 Misollar:
\`\`\`javascript
sumDigits(123)  // 6 (1 + 2 + 3)
sumDigits(9045) // 18 (9 + 0 + 4 + 5)
sumDigits(-15)  // 6 (1 + 5)
\`\`\``,
    examples: [
      { input: "123", output: "6" },
      { input: "9045", output: "18" }
    ],
    languages: {
      javascript: {
        initialCode: "function sumDigits(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function sumDigits(n) {\n  return Math.abs(n).toString().split('').reduce((s, d) => s + Number(d), 0);\n}",
        tests: [
          { input: "console.log(sumDigits(123))", expected: "6", label: "123 -> 6" },
          { input: "console.log(sumDigits(9045))", expected: "18", label: "9045 -> 18" },
          { input: "console.log(sumDigits(-15))", expected: "6", label: "-15 -> 6" }
        ]
      },
      python: {
        initialCode: "def sum_digits(n):\n    pass\n",
        solution: "def sum_digits(n):\n    return sum(int(d) for d in str(abs(n)))\n",
        tests: [
          { input: "print(sum_digits(123))", expected: "6", label: "123" }
        ]
      }
    }
  },

  // 39. is-power-of-two (7 kyu)
  {
    id: "is-power-of-two",
    title: "Son 2 ning Darajasimi?",
    slug: "is-power-of-two",
    difficulty: 7,
    category: "Math",
    tags: ["math", "logic"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`n\` soni 2 ning darajasi (1, 2, 4, 8, 16, ...) ekanligini aniqlang.

### 💡 Misollar:
\`\`\`javascript
isPowerOfTwo(16) // true
isPowerOfTwo(1)  // true (2^0 = 1)
isPowerOfTwo(14) // false
\`\`\``,
    examples: [
      { input: "16", output: "true" },
      { input: "14", output: "false" }
    ],
    languages: {
      javascript: {
        initialCode: "function isPowerOfTwo(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isPowerOfTwo(n) {\n  return n > 0 && (n & (n - 1)) === 0;\n}",
        tests: [
          { input: "console.log(isPowerOfTwo(16))", expected: "true", label: "16 -> true" },
          { input: "console.log(isPowerOfTwo(1))", expected: "true", label: "1 -> true" },
          { input: "console.log(isPowerOfTwo(14))", expected: "false", label: "14 -> false" }
        ]
      },
      python: {
        initialCode: "def is_power_of_two(n):\n    pass\n",
        solution: "def is_power_of_two(n):\n    return n > 0 and (n & (n - 1)) == 0\n",
        tests: [
          { input: "print(is_power_of_two(16))", expected: "True", label: "16" }
        ]
      }
    }
  },

  // 40. remove-vowels-from-string (7 kyu)
  {
    id: "remove-vowels-from-string",
    title: "Matndan Unli Harflarni Olib Tashlash",
    slug: "remove-vowels-from-string",
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "regex"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`s\` satridan barcha inglizcha unli harflarni (\`a, e, i, o, u\` va ularning kattalarini) olib tashlang.

### 💡 Misollar:
\`\`\`javascript
removeVowels("Codewar") // "Cdwr"
removeVowels("hello")   // "hll"
\`\`\``,
    examples: [
      { input: "'Codewar'", output: "Cdwr" }
    ],
    languages: {
      javascript: {
        initialCode: "function removeVowels(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function removeVowels(s) {\n  return s.replace(/[aeiouAEIOU]/g, '');\n}",
        tests: [
          { input: "console.log(removeVowels('Codewar'))", expected: "Cdwr", label: "Codewar -> Cdwr" },
          { input: "console.log(removeVowels('hello'))", expected: "hll", label: "hello -> hll" }
        ]
      },
      python: {
        initialCode: "def remove_vowels(s):\n    pass\n",
        solution: "def remove_vowels(s):\n    return ''.join(c for c in s if c.lower() not in 'aeiou')\n",
        tests: [
          { input: "print(remove_vowels('Codewar'))", expected: "Cdwr", label: "vowels" }
        ]
      }
    }
  },

  // 41. find-longest-word-len (7 kyu)
  {
    id: "find-longest-word-len",
    title: "Gapdagi Eng Uzun So'z Uzunligi",
    slug: "find-longest-word-len",
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "arrays"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Bo'shliqlar bilan ajratilgan so'zlardan iborat \`str\` gapi berilgan. Undagi eng uzun so'zning uzunligini (belgilar sonini) toping.

### 💡 Misollar:
\`\`\`javascript
longestWordLength("Men dasturchiman")      // 12 ("dasturchiman")
longestWordLength("Frontend developer")    // 9 ("developer")
\`\`\``,
    examples: [
      { input: "'Men dasturchiman'", output: "12" }
    ],
    languages: {
      javascript: {
        initialCode: "function longestWordLength(str) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function longestWordLength(str) {\n  return Math.max(...str.split(' ').map(w => w.length));\n}",
        tests: [
          { input: "console.log(longestWordLength('Men dasturchiman'))", expected: "12", label: "dasturchiman -> 12" },
          { input: "console.log(longestWordLength('Frontend developer'))", expected: "9", label: "developer -> 9" }
        ]
      },
      python: {
        initialCode: "def longest_word_length(s):\n    pass\n",
        solution: "def longest_word_length(s):\n    return max(len(w) for w in s.split())\n",
        tests: [
          { input: "print(longest_word_length('Men dasturchiman'))", expected: "12", label: "longest" }
        ]
      }
    }
  },

  // 42. check-strictly-increasing (7 kyu)
  {
    id: "check-strictly-increasing",
    title: "Massiv Qat'iy O'suvchimi?",
    slug: "check-strictly-increasing",
    difficulty: 7,
    category: "Arrays",
    tags: ["arrays", "logic"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Sonlar massivi \`arr\` berilgan. Agar undagi har bir element o'zidan oldingi elementdan qat'iy katta bo'lsa (\`arr[i] > arr[i - 1]\`) \`true\`, aks holda \`false\` qaytaring.

### 💡 Misollar:
\`\`\`javascript
isIncreasing([1, 2, 5, 8]) // true
isIncreasing([1, 3, 2])    // false
isIncreasing([2, 2, 3])    // false (tenglik qat'iy o'sish emas)
\`\`\``,
    examples: [
      { input: "[1, 2, 5, 8]", output: "true" },
      { input: "[1, 3, 2]", output: "false" }
    ],
    languages: {
      javascript: {
        initialCode: "function isIncreasing(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function isIncreasing(arr) {\n  return arr.every((v, i) => i === 0 || v > arr[i - 1]);\n}",
        tests: [
          { input: "console.log(isIncreasing([1, 2, 5, 8]))", expected: "true", label: "o'suvchi" },
          { input: "console.log(isIncreasing([1, 3, 2]))", expected: "false", label: "kamaygan" }
        ]
      },
      python: {
        initialCode: "def is_increasing(arr):\n    pass\n",
        solution: "def is_increasing(arr):\n    return all(arr[i] > arr[i-1] for i in range(1, len(arr)))\n",
        tests: [
          { input: "print(is_increasing([1, 2, 5, 8]))", expected: "True", label: "inc" }
        ]
      }
    }
  },

  // 43. alternate-case-string (7 kyu)
  {
    id: "alternate-case-string",
    title: "Katta-Kichik Harflar Navbati (Alternate Case)",
    slug: "alternate-case-string",
    difficulty: 7,
    category: "Strings",
    tags: ["strings", "fundamentals"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Berilgan \`s\` satrini juft indeksdagi harflarini katta (uppercase), toq indeksdagi harflarini kichik (lowercase) qilib qaytaruvchi \`alternateCase\` funksiyasini yozing (0-indeks juft hisoblanadi).

### 💡 Misollar:
\`\`\`javascript
alternateCase("hello") // "HeLlO"
alternateCase("code")  // "CoDe"
\`\`\``,
    examples: [
      { input: "'hello'", output: "HeLlO" }
    ],
    languages: {
      javascript: {
        initialCode: "function alternateCase(s) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function alternateCase(s) {\n  return s.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');\n}",
        tests: [
          { input: "console.log(alternateCase('hello'))", expected: "HeLlO", label: "hello -> HeLlO" },
          { input: "console.log(alternateCase('code'))", expected: "CoDe", label: "code -> CoDe" }
        ]
      },
      python: {
        initialCode: "def alternate_case(s):\n    pass\n",
        solution: "def alternate_case(s):\n    return ''.join(c.upper() if i % 2 == 0 else c.lower() for i, c in enumerate(s))\n",
        tests: [
          { input: "print(alternate_case('hello'))", expected: "HeLlO", label: "hello" }
        ]
      }
    }
  },

  // 44. filter-words-by-min-length (7 kyu)
  {
    id: "filter-words-by-min-length",
    title: "Uzunligi Katta Bo'lgan So'zlarni Ajratish",
    slug: "filter-words-by-min-length",
    difficulty: 7,
    category: "Arrays",
    tags: ["strings", "arrays"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
So'zlar massivi \`words\` va minimal uzunlik \`minLen\` berilgan. Uzunligi \`minLen\` dan qat'iy katta bo'lgan so'zlarni yangi massiv qilib qaytaring.

### 💡 Misollar:
\`\`\`javascript
filterLongWords(["olma", "nok", "gilos"], 3) // ["olma", "gilos"]
\`\`\``,
    examples: [
      { input: "['olma', 'nok', 'gilos'], 3", output: "['olma', 'gilos']" }
    ],
    languages: {
      javascript: {
        initialCode: "function filterLongWords(words, minLen) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function filterLongWords(words, minLen) {\n  return words.filter(w => w.length > minLen);\n}",
        tests: [
          { input: "console.log(JSON.stringify(filterLongWords(['olma', 'nok', 'gilos'], 3)))", expected: "[\"olma\",\"gilos\"]", label: "uzunligi > 3" }
        ]
      },
      python: {
        initialCode: "def filter_long_words(words, min_len):\n    pass\n",
        solution: "def filter_long_words(words, min_len):\n    return [w for w in words if len(w) > min_len]\n",
        tests: [
          { input: "import json; print(json.dumps(filter_long_words(['olma', 'nok', 'gilos'], 3)))", expected: "[\"olma\", \"gilos\"]", label: "long words" }
        ]
      }
    }
  },

  // 45. sum-of-odd-numbers-array (7 kyu)
  {
    id: "sum-of-odd-numbers-array",
    title: "Massivdagi Faqat Toq Sonlar Yig'indisi",
    slug: "sum-of-odd-numbers-array",
    difficulty: 7,
    category: "Arrays",
    tags: ["arrays", "math"],
    isPremium: false,
    xpReward: 25,
    description: `### 🎯 Masala Maqsadi:
Sonlar massivi \`arr\` berilgan. Undagi faqat toq sonlarning yig'indisini hisoblab qaytaring (agar toq son bo'lmasa 0 qaytarilsin).

### 💡 Misollar:
\`\`\`javascript
sumOdds([1, 2, 3, 4, 5]) // 9 (1 + 3 + 5)
sumOdds([2, 4, 6])       // 0
\`\`\``,
    examples: [
      { input: "[1, 2, 3, 4, 5]", output: "9" },
      { input: "[2, 4, 6]", output: "0" }
    ],
    languages: {
      javascript: {
        initialCode: "function sumOdds(arr) {\n  // Kodni bu yerga yozing\n  \n}\n",
        solution: "function sumOdds(arr) {\n  return arr.filter(n => n % 2 !== 0).reduce((s, n) => s + n, 0);\n}",
        tests: [
          { input: "console.log(sumOdds([1, 2, 3, 4, 5]))", expected: "9", label: "1 + 3 + 5 = 9" },
          { input: "console.log(sumOdds([2, 4, 6]))", expected: "0", label: "toq sonlar yo'q -> 0" }
        ]
      },
      python: {
        initialCode: "def sum_odds(arr):\n    pass\n",
        solution: "def sum_odds(arr):\n    return sum(n for n in arr if n % 2 != 0)\n",
        tests: [
          { input: "print(sum_odds([1, 2, 3, 4, 5]))", expected: "9", label: "sum odds" }
        ]
      }
    }
  }
];

// Enrich newKatas with typescript, cpp, java, go, php, rust
newKatas.forEach(k => {
  const js = k.languages.javascript;
  const tests = js.tests;

  // TypeScript
  k.languages.typescript = {
    initialCode: js.initialCode,
    solution: js.solution,
    tests: js.tests
  };

  // C++
  const fnName = k.slug.replace(/-([a-z])/g, g => g[1].toUpperCase());
  k.languages.cpp = {
    initialCode: `// C++ Solution\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n// Write your solution here\n`,
    tests: tests.map(t => ({
      input: `cout << boolalpha << ${t.input.replace('console.log(', '').replace(/\)$/, '')} << endl;`,
      expected: t.expected,
      label: t.label
    }))
  };

  // Java
  k.languages.java = {
    initialCode: `import java.util.*;\n\npublic class Solution {\n    // Write your solution method here\n}`,
    tests: tests.map(t => ({
      input: `System.out.println(${t.input.replace('console.log(', '').replace(/\)$/, '')});`,
      expected: t.expected,
      label: t.label
    }))
  };

  // Go
  k.languages.go = {
    initialCode: `package main\n\nimport "fmt"\n\n// Write your function here\n`,
    tests: tests.map(t => ({
      input: `fmt.Println(${t.input.replace('console.log(', '').replace(/\)$/, '')})`,
      expected: t.expected,
      label: t.label
    }))
  };
});

// Append to existing katas if not exists
const existingIds = new Set(katas.map(k => k.id));
let addedCount = 0;
newKatas.forEach(k => {
  if (!existingIds.has(k.id)) {
    katas.push(k);
    addedCount++;
  }
});

fs.writeFileSync(KATA_FILE, JSON.stringify(katas, null, 2), 'utf8');

console.log(`Successfully added ${addedCount} new katas to kata.json!`);
console.log(`Total katas now: ${katas.length}`);

// Test all JS solutions
let jsPassed = 0, jsFailed = 0;
newKatas.forEach(k => {
  const js = k.languages.javascript;
  const tests = js.tests;
  tests.forEach(t => {
    let output = '';
    const mockConsole = {
      log: (...args) => {
        output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
      }
    };
    try {
      const code = `${js.solution}\n${t.input}`;
      const fn = new Function('console', code);
      fn(mockConsole);
      const actual = output.trim();
      const expected = String(t.expected).trim();
      if (actual === expected) {
        jsPassed++;
      } else {
        console.error(`FAIL in ${k.id}: expected "${expected}", got "${actual}"`);
        jsFailed++;
      }
    } catch (e) {
      console.error(`ERROR in ${k.id}: ${e.message}`);
      jsFailed++;
    }
  });
});

console.log(`All new kata tests executed: Passed: ${jsPassed}, Failed: ${jsFailed}`);
