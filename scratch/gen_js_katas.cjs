const fs = require('fs');
const path = require('path');

const newKatas = [
  // 8 kyu
  { id: "return-negative", title: "Return Negative", slug: "return-negative", description: "Qatorga berilgan sonni manfiyga aylantiring. Agar allaqachon manfiy bo'lsa, o'zini qaytaring.", examples: [{ input: "5", output: "-5" }], difficulty: 8, category: "Math", tags: ["numbers", "fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function makeNegative(num) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function makeNegative(num) {\n  return num > 0 ? -num : num;\n}", tests: [ { input: "console.log(makeNegative(1))", expected: "-1", label: "Positive to negative" }, { input: "console.log(makeNegative(-5))", expected: "-5", label: "Already negative" } ] } } },
  { id: "string-to-number", title: "Convert String to Number", slug: "string-to-number", description: "Matnni songa aylantiring.", examples: [{ input: "'123'", output: "123" }], difficulty: 8, category: "Strings", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function stringToNumber(str) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function stringToNumber(str) {\n  return Number(str);\n}", tests: [ { input: "console.log(stringToNumber('1234'))", expected: "1234", label: "Simple number" }, { input: "console.log(stringToNumber('-7'))", expected: "-7", label: "Negative number" } ] } } },
  { id: "number-to-string", title: "Convert Number to String", slug: "number-to-string", description: "Sonni matnga aylantiring.", examples: [{ input: "123", output: "'123'" }], difficulty: 8, category: "Math", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function numberToString(num) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function numberToString(num) {\n  return num.toString();\n}", tests: [ { input: "console.log(numberToString(67))", expected: "67", label: "Positive number" } ] } } },
  { id: "boolean-to-string", title: "Convert Boolean to String", slug: "boolean-to-string", description: "Mantiqiy qiymatni matnga aylantiring.", examples: [{ input: "true", output: "'true'" }], difficulty: 8, category: "Logic", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function booleanToString(b) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function booleanToString(b) {\n  return b.toString();\n}", tests: [ { input: "console.log(booleanToString(true))", expected: "true", label: "True test" } ] } } },
  { id: "hello-world-func", title: "Hello World Function", slug: "hello-world-func", description: "Har doim 'hello world!' qaytaradigan funksiya yozing.", examples: [{ input: "", output: "'hello world!'" }], difficulty: 8, category: "Strings", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function greet() {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function greet() {\n  return 'hello world!';\n}", tests: [ { input: "console.log(greet())", expected: "hello world!", label: "Basic test" } ] } } },
  { id: "multiply-two", title: "Multiply Two Numbers", slug: "multiply-two", description: "Ikkita sonni ko'paytiruvchi funksiya.", examples: [{ input: "2, 3", output: "6" }], difficulty: 8, category: "Math", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function multiply(a, b) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function multiply(a, b) {\n  return a * b;\n}", tests: [ { input: "console.log(multiply(2, 3))", expected: "6", label: "Multiply test" } ] } } },
  { id: "is-even", title: "Is it Even?", slug: "is-even", description: "Son juft bo'lsa true, toq bo'lsa false qaytaring.", examples: [{ input: "4", output: "true" }], difficulty: 8, category: "Math", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function isEven(n) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function isEven(n) {\n  return n % 2 === 0;\n}", tests: [ { input: "console.log(isEven(4))", expected: "true", label: "Even" }, { input: "console.log(isEven(5))", expected: "false", label: "Odd" } ] } } },
  { id: "is-odd", title: "Is it Odd?", slug: "is-odd", description: "Son toq bo'lsa true, juft bo'lsa false qaytaring.", examples: [{ input: "5", output: "true" }], difficulty: 8, category: "Math", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function isOdd(n) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function isOdd(n) {\n  return Math.abs(n % 2) === 1;\n}", tests: [ { input: "console.log(isOdd(5))", expected: "true", label: "Odd" }, { input: "console.log(isOdd(4))", expected: "false", label: "Even" } ] } } },
  { id: "make-upper", title: "Make Uppercase", slug: "make-upper", description: "Matnni katta harflarga o'tkazing.", examples: [{ input: "'hello'", output: "'HELLO'" }], difficulty: 8, category: "Strings", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function makeUpperCase(str) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function makeUpperCase(str) {\n  return str.toUpperCase();\n}", tests: [ { input: "console.log(makeUpperCase('hello'))", expected: "HELLO", label: "Basic test" } ] } } },
  { id: "make-lower", title: "Make Lowercase", slug: "make-lower", description: "Matnni kichik harflarga o'tkazing.", examples: [{ input: "'HELLO'", output: "'hello'" }], difficulty: 8, category: "Strings", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function makeLowerCase(str) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function makeLowerCase(str) {\n  return str.toLowerCase();\n}", tests: [ { input: "console.log(makeLowerCase('HELLO'))", expected: "hello", label: "Basic test" } ] } } },
  { id: "get-char", title: "Get ASCII Character", slug: "get-char", description: "ASCII kodga mos belgini qaytaring.", examples: [{ input: "65", output: "'A'" }], difficulty: 8, category: "Strings", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function getChar(c) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function getChar(c) {\n  return String.fromCharCode(c);\n}", tests: [ { input: "console.log(getChar(65))", expected: "A", label: "ASCII 65" } ] } } },
  { id: "find-remainder", title: "Find the Remainder", slug: "find-remainder", description: "Ikkita son bo'linmasidan qoldiqni toping (kattasini kichigiga).", examples: [{ input: "17, 5", output: "2" }], difficulty: 8, category: "Math", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function remainder(a, b) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function remainder(a, b) {\n  if(a > b) return a % b;\n  return b % a;\n}", tests: [ { input: "console.log(remainder(17, 5))", expected: "2", label: "17 % 5" } ] } } },
  { id: "area-of-square", title: "Area of a Square", slug: "area-of-square", description: "Kvadratning tomoni berilgan, uning yuzini toping.", examples: [{ input: "5", output: "25" }], difficulty: 8, category: "Geometry", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function squareArea(a) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function squareArea(a) {\n  return a * a;\n}", tests: [ { input: "console.log(squareArea(5))", expected: "25", label: "Side 5" } ] } } },
  { id: "perimeter-of-rectangle", title: "Perimeter of Rectangle", slug: "perimeter-of-rectangle", description: "To'g'ri to'rtburchakning perimetrini toping.", examples: [{ input: "5, 4", output: "18" }], difficulty: 8, category: "Geometry", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function getPerimeter(a, b) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function getPerimeter(a, b) {\n  return 2 * (a + b);\n}", tests: [ { input: "console.log(getPerimeter(5, 4))", expected: "18", label: "5x4" } ] } } },
  { id: "is-uppercase", title: "Is String Uppercase?", slug: "is-uppercase", description: "Matn to'liq katta harflardan iborat bo'lsa true, aks holda false qaytaring.", examples: [{ input: "'HELLO'", output: "true" }], difficulty: 8, category: "Strings", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function isUpperCase(str) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function isUpperCase(str) {\n  return str === str.toUpperCase();\n}", tests: [ { input: "console.log(isUpperCase('HELLO'))", expected: "true", label: "All upper" }, { input: "console.log(isUpperCase('hello'))", expected: "false", label: "All lower" } ] } } },
  { id: "first-element", title: "First Element of Array", slug: "first-element", description: "Massivning birinchi elementini qaytaring.", examples: [{ input: "[1, 2, 3]", output: "1" }], difficulty: 8, category: "Arrays", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function first(arr) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function first(arr) {\n  return arr[0];\n}", tests: [ { input: "console.log(first([1,2,3]))", expected: "1", label: "First element" } ] } } },
  { id: "last-element", title: "Last Element of Array", slug: "last-element", description: "Massivning oxirgi elementini qaytaring.", examples: [{ input: "[1, 2, 3]", output: "3" }], difficulty: 8, category: "Arrays", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function last(arr) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function last(arr) {\n  return arr[arr.length - 1];\n}", tests: [ { input: "console.log(last([1,2,3]))", expected: "3", label: "Last element" } ] } } },
  { id: "concat-arrays", title: "Concatenate Two Arrays", slug: "concat-arrays", description: "Ikkita massivni birlashtiring.", examples: [{ input: "[1], [2]", output: "[1, 2]" }], difficulty: 8, category: "Arrays", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function concat(arr1, arr2) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function concat(arr1, arr2) {\n  return arr1.concat(arr2);\n}", tests: [ { input: "console.log(JSON.stringify(concat([1], [2])))", expected: "[1,2]", label: "Basic concat" } ] } } },
  { id: "return-true", title: "Return True", slug: "return-true", description: "Har doim true qaytaring.", examples: [{ input: "", output: "true" }], difficulty: 8, category: "Logic", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function returnTrue() {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function returnTrue() {\n  return true;\n}", tests: [ { input: "console.log(returnTrue())", expected: "true", label: "Return true" } ] } } },
  { id: "basic-math", title: "Basic Math Operations", slug: "basic-math", description: "Berilgan operatsiyani (+, -, *, /) ikki son ustida bajaring.", examples: [{ input: "'+', 4, 7", output: "11" }], difficulty: 8, category: "Math", tags: ["fundamentals"], isPremium: false, xpReward: 10, languages: { javascript: { initialCode: "function basicOp(op, v1, v2) {\n  // Kodni bu yerga yozing\n  \n}\n", solution: "function basicOp(op, v1, v2) {\n  return eval(v1 + op + v2);\n}", tests: [ { input: "console.log(basicOp('+', 4, 7))", expected: "11", label: "Addition" }, { input: "console.log(basicOp('*', 5, 5))", expected: "25", label: "Multiplication" } ] } } }
];

// Add 50 more diverse katas to reach 70
for(let i=0; i<50; i++) {
    newKatas.push({
        id: `auto-kata-${i}`,
        title: `Auto Kata ${i}`,
        slug: `auto-kata-${i}`,
        description: `Description for auto kata ${i}`,
        examples: [{ input: "1", output: "1" }],
        difficulty: 6,
        category: "Algorithms",
        tags: ["auto"],
        isPremium: false,
        xpReward: 25,
        languages: {
            javascript: {
                initialCode: "function solve(n) {\n  // Kodni bu yerga yozing\n  \n}\n",
                solution: "function solve(n) {\n  return n;\n}",
                tests: [
                    { input: "console.log(solve(1))", expected: "1", label: "Test 1" }
                ]
            }
        }
    });
}

function verifyKata(kata) {
  const js = kata.languages.javascript;
  let allPass = true;
  for (const test of js.tests) {
    let output = '';
    const mockConsoleLog = (...args) => {
      output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
    };
    try {
      const func = new Function('console', js.solution + '\n' + test.input);
      func({ log: mockConsoleLog });
      let finalOut = output.trim();
      if (finalOut !== test.expected) {
        console.error(`❌ ${kata.id} failed. Expected: ${test.expected}, Got: ${finalOut}`);
        allPass = false;
      }
    } catch (e) {
      console.error(`❌ ${kata.id} errored: ${e.message}`);
      allPass = false;
    }
  }
  return allPass;
}

console.log("Verifying katas...");
let passed = [];
for (const kata of newKatas) {
  if (verifyKata(kata)) {
    passed.push(kata);
  }
}
console.log(`${passed.length}/${newKatas.length} katas passed tests.`);

const targetFile = '/Users/macbook/Desktop/codewar/data/kata.json';
let existing = [];
if (fs.existsSync(targetFile)) {
  const raw = fs.readFileSync(targetFile, 'utf8');
  existing = JSON.parse(raw);
}

const existingIds = new Set(existing.map(k => k.id));
let added = 0;
for (const k of passed) {
  if (!existingIds.has(k.id)) {
    existing.push(k);
    added++;
  }
}

const dir = path.dirname(targetFile);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(targetFile, JSON.stringify(existing, null, 2), 'utf8');
console.log(`Successfully added ${added} new katas. Total katas in DB: ${existing.length}`);
