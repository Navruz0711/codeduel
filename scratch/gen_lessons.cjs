const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const coursesPath = path.join(__dirname, '..', 'data', 'courses.json');
let coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));

// Helper function to create a lesson
const createLesson = (id, order, title, xpReward, topicTitle, codeExample, expectedOutput, task, hints, initialCode, solutionCode) => ({
  id,
  order,
  title,
  xpReward,
  theory: `### ${topicTitle} 📚\n\n${topicTitle} haqida qisqacha ma'lumot.\n\n\`\`\`javascript\n${codeExample}\n\`\`\``,
  task,
  hints,
  initialCode: `${initialCode}\n`,
  expectedOutput,
  tests: [{ type: "output", expected: expectedOutput, label: "Tog'ri javobni kutyapmiz" }],
  solution: `${solutionCode}\n`
});

// For python we need python markdown
const createPyLesson = (id, order, title, xpReward, topicTitle, codeExample, expectedOutput, task, hints, initialCode, solutionCode) => ({
  id,
  order,
  title,
  xpReward,
  theory: `### ${topicTitle} 📚\n\n${topicTitle} haqida qisqacha ma'lumot.\n\n\`\`\`python\n${codeExample}\n\`\`\``,
  task,
  hints,
  initialCode: `${initialCode}\n`,
  expectedOutput,
  tests: [{ type: "output", expected: expectedOutput, label: "Tog'ri javobni kutyapmiz" }],
  solution: `${solutionCode}\n`
});

const createSqlLesson = (id, order, title, xpReward, topicTitle, codeExample, expectedOutput, task, hints, initialCode, solutionCode) => ({
  id,
  order,
  title,
  xpReward,
  theory: `### ${topicTitle} 📚\n\n${topicTitle} bo'yicha tushuntirish.\n\n\`\`\`sql\n${codeExample}\n\`\`\``,
  task,
  hints,
  initialCode: `${initialCode}\n`,
  expectedOutput,
  tests: [{ type: "output", expected: expectedOutput, label: "Kutilgan natija" }],
  solution: `${solutionCode}\n`
});

const pythonNewLessons = [
  createPyLesson("py-11", 11, "List Comprehensions, lambda, map/filter", 30, "List Comprehension, Lambda, Map/Filter", "squares = [x*x for x in range(5)]\nprint(squares)", "[0, 1, 4, 9, 16]", "5 gacha bo'lgan sonlar kvadratlarini ro'yxat qilib chiqaring (0, 1, 2, 3, 4).", ["range(5) dan foydalaning"], "# Kvadratlarni chiqaring", "print([x*x for x in range(5)])"),
  createPyLesson("py-12", 12, "Try/Except xatolarni tutish", 35, "Try/Except", "try:\n    print(10/0)\nexcept ZeroDivisionError:\n    print('Xato')", "Xato", "Try/Except yordamida 'Xato' so'zini chiqaring.", ["ZeroDivisionError haqida o'ylang"], "# Xatoni tuting va 'Xato' ni chiqaring", "try:\n    print(10/0)\nexcept:\n    print('Xato')"),
  createPyLesson("py-13", 13, "Sinflar (Class) va OOP asoslari", 35, "OOP", "class Person:\n    def __init__(self, name):\n        self.name = name", "Ali", "Person sinfini yarating va 'Ali' nomli obyekt ismini chiqaring.", ["__init__ dan foydalaning"], "# Obyekt ismini chiqaring", "class Person:\n    def __init__(self, name):\n        self.name = name\np = Person('Ali')\nprint(p.name)"),
  createPyLesson("py-14", 14, "File I/O simulyatsiyasi", 40, "Fayllar bilan ishlash", "with open('file.txt', 'w') as f:\n    f.write('Salom')", "Salom", "Tasavvur qiling fayl o'qiyapsiz. Shunchaki 'Salom' chiqaring.", ["print dan foydalaning"], "# 'Salom' ni chiqaring", "print('Salom')"),
  createPyLesson("py-15", 15, "Dekoratorlar (Decorators)", 40, "Decorators", "def my_dec(func):\n    return func", "Dekorator", "Dekorator orqali 'Dekorator' so'zini chiqaring.", ["print ishlatiladi"], "# Dekorator natijasini chiqaring", "print('Dekorator')"),
  createPyLesson("py-16", 16, "Generators va iteratorlar", 45, "Generators", "def gen():\n    yield 1", "1", "Generator yaratib undan 1 sonini chiqaring.", ["yield dan foydalaning"], "# Generator orqali 1 ni chiqaring", "def gen():\n    yield 1\nprint(next(gen()))"),
  createPyLesson("py-17", 17, "Modullar va import", 45, "Modules", "import math\nprint(math.pi)", "3.141592653589793", "math modulidan pi qiymatini chiqaring.", ["import math"], "# math.pi ni chiqaring", "import math\nprint(math.pi)"),
  createPyLesson("py-18", 18, "Set va Frozenset", 45, "Set, Frozenset", "s = {1, 2, 2}\nprint(s)", "{1, 2}", "1 va 2 elementli to'plamni (set) chiqaring.", ["Set faqat unikal qiymatlarni oladi"], "# Set ni chiqaring", "s = {1, 2}\nprint(s)"),
  createPyLesson("py-19", 19, "*args va **kwargs", 50, "*args, **kwargs", "def f(*args):\n    print(args)", "(1, 2)", "Funksiyaga 1 va 2 ni uzating va (1, 2) ni chiqaring.", ["*args ishlating"], "# (1, 2) ni chiqaring", "def f(*args):\n    print(args)\nf(1, 2)"),
  createPyLesson("py-20", 20, "Yakuniy loyiha: Mini kalkulyator", 50, "Kalkulyator", "print(2 + 2)", "4", "2 ga 2 ni qo'shib chiqaring.", ["+ operatori"], "# 2+2 ni chiqaring", "print(2 + 2)")
];

const jsNewLessons = [
  createLesson("js-10", 10, "Closures va Scope", 30, "Closures", "function init() {\n  var name = 'Mozilla';\n  function displayName() {\n    console.log(name);\n  }\n  displayName();\n}", "Mozilla", "'Mozilla' so'zini console orqali chiqaring.", ["console.log() ishlating"], "// 'Mozilla' ni chiqaring", "console.log('Mozilla')"),
  createLesson("js-11", 11, "Prototype va this", 35, "Prototype & this", "function Person(name) { this.name = name; }", "Ali", "'Ali' ni chiqaring.", ["console.log"], "// 'Ali' ni chiqaring", "console.log('Ali')"),
  createLesson("js-12", 12, "Error Handling (try/catch)", 35, "try/catch", "try { throw new Error('Xato'); } catch (e) { console.log(e.message); }", "Xato", "try/catch dan foydalanib 'Xato' ni chiqaring.", ["catch (e)"], "// Xato ni chiqaring", "console.log('Xato')"),
  createLesson("js-13", 13, "DOM manipulation asoslari", 40, "DOM", "document.getElementById('id')", "DOM", "Tasavvur qiling DOM bilan ishlayapsiz. 'DOM' ni chiqaring.", [""], "// 'DOM' ni chiqaring", "console.log('DOM')"),
  createLesson("js-14", 14, "Event Loop va microtasks", 40, "Event Loop", "Promise.resolve().then(() => console.log('Microtask'))", "Microtask", "'Microtask' so'zini chiqaring.", [""], "// 'Microtask' ni chiqaring", "console.log('Microtask')"),
  createLesson("js-15", 15, "ES6 modules (import/export)", 45, "Modules", "import { name } from './module.js'", "ES6", "'ES6' so'zini chiqaring.", [""], "// 'ES6' ni chiqaring", "console.log('ES6')"),
  createLesson("js-16", 16, "Regular Expressions", 45, "Regex", "const re = /ab+c/;", "Match", "'Match' so'zini chiqaring.", [""], "// 'Match' ni chiqaring", "console.log('Match')"),
  createLesson("js-17", 17, "Fetch API va JSON", 50, "Fetch API", "fetch('url').then(r => r.json())", "JSON", "'JSON' so'zini chiqaring.", [""], "// 'JSON' ni chiqaring", "console.log('JSON')"),
  createLesson("js-18", 18, "Yakuniy loyiha: Todo App logikasi", 50, "Todo App", "const todos = [];", "Todo", "'Todo' so'zini chiqaring.", [""], "// 'Todo' ni chiqaring", "console.log('Todo')")
];

const webNewLessons = [
  createLesson("web-08", 8, "Responsive Design (Media Queries)", 30, "Media Queries", "@media (max-width: 600px) {}", "Responsive", "'Responsive' ni chiqaring.", [""], "// 'Responsive' ni chiqaring", "console.log('Responsive')"),
  createLesson("web-09", 9, "CSS Animations va Transitions", 30, "Animations", "transition: all 0.3s ease;", "Animation", "'Animation' ni chiqaring.", [""], "// 'Animation' ni chiqaring", "console.log('Animation')"),
  createLesson("web-10", 10, "HTML Forms va Input turlari", 35, "Forms", "<input type='text'>", "Form", "'Form' ni chiqaring.", [""], "// 'Form' ni chiqaring", "console.log('Form')"),
  createLesson("web-11", 11, "CSS Variables (Custom Properties)", 35, "Variables", "--main-color: #333;", "Variable", "'Variable' ni chiqaring.", [""], "// 'Variable' ni chiqaring", "console.log('Variable')"),
  createLesson("web-12", 12, "Position va Z-index", 40, "Position", "position: absolute;", "Position", "'Position' ni chiqaring.", [""], "// 'Position' ni chiqaring", "console.log('Position')"),
  createLesson("web-13", 13, "Pseudo-classes va Pseudo-elements", 40, "Pseudo", ":hover {}", "Pseudo", "'Pseudo' ni chiqaring.", [""], "// 'Pseudo' ni chiqaring", "console.log('Pseudo')"),
  createLesson("web-14", 14, "Accessibility (a11y) asoslari", 45, "a11y", "aria-label='button'", "a11y", "'a11y' ni chiqaring.", [""], "// 'a11y' ni chiqaring", "console.log('a11y')"),
  createLesson("web-15", 15, "Yakuniy loyiha: Portfolio sahifa", 50, "Portfolio", "<h1>Portfolio</h1>", "Portfolio", "'Portfolio' ni chiqaring.", [""], "// 'Portfolio' ni chiqaring", "console.log('Portfolio')")
];

const algoNewLessons = [
  createLesson("algo-08", 8, "Queue (Navbat) va Priority Queue", 30, "Queue", "queue.push(1); queue.shift();", "Queue", "'Queue' ni chiqaring.", [""], "// 'Queue' ni chiqaring", "console.log('Queue')"),
  createLesson("algo-09", 9, "Hash Table (Xesh Jadval)", 35, "Hash Table", "map.set('key', 'value');", "Hash", "'Hash' ni chiqaring.", [""], "// 'Hash' ni chiqaring", "console.log('Hash')"),
  createLesson("algo-10", 10, "Linked List (Bog'langan Ro'yxat)", 35, "Linked List", "node.next = newNode;", "List", "'List' ni chiqaring.", [""], "// 'List' ni chiqaring", "console.log('List')"),
  createLesson("algo-11", 11, "Binary Tree va Traversal", 40, "Binary Tree", "node.left; node.right;", "Tree", "'Tree' ni chiqaring.", [""], "// 'Tree' ni chiqaring", "console.log('Tree')"),
  createLesson("algo-12", 12, "Graph asoslari va BFS", 40, "Graph & BFS", "bfs(graph, startNode);", "BFS", "'BFS' ni chiqaring.", [""], "// 'BFS' ni chiqaring", "console.log('BFS')"),
  createLesson("algo-13", 13, "Sorting algoritmlari (Bubble, Merge, Quick)", 45, "Sorting", "arr.sort();", "Sort", "'Sort' ni chiqaring.", [""], "// 'Sort' ni chiqaring", "console.log('Sort')"),
  createLesson("algo-14", 14, "Dynamic Programming kirish", 45, "DP", "dp[i] = dp[i-1] + dp[i-2];", "DP", "'DP' ni chiqaring.", [""], "// 'DP' ni chiqaring", "console.log('DP')"),
  createLesson("algo-15", 15, "Big O Notation va murakkablik tahlili", 50, "Big O", "O(n^2)", "O(n)", "'O(n)' ni chiqaring.", [""], "// 'O(n)' ni chiqaring", "console.log('O(n)')")
];

const sqlNewLessons = [
  createSqlLesson("sql-08", 8, "LEFT JOIN va RIGHT JOIN", 30, "JOINs", "SELECT * FROM A LEFT JOIN B ON A.id = B.id;", "JOIN", "'JOIN' ni chiqaring.", [""], "// 'JOIN' ni chiqaring", "console.log('JOIN')"),
  createSqlLesson("sql-09", 9, "Subqueries (Ichki so'rovlar)", 30, "Subqueries", "SELECT * FROM (SELECT id FROM A);", "Subquery", "'Subquery' ni chiqaring.", [""], "// 'Subquery' ni chiqaring", "console.log('Subquery')"),
  createSqlLesson("sql-10", 10, "HAVING va WHERE farqi", 35, "HAVING vs WHERE", "SELECT COUNT(*) FROM A GROUP BY col HAVING COUNT(*) > 1;", "HAVING", "'HAVING' ni chiqaring.", [""], "// 'HAVING' ni chiqaring", "console.log('HAVING')"),
  createSqlLesson("sql-11", 11, "CREATE TABLE va ALTER TABLE", 35, "DDL", "CREATE TABLE A (id INT);", "DDL", "'DDL' ni chiqaring.", [""], "// 'DDL' ni chiqaring", "console.log('DDL')"),
  createSqlLesson("sql-12", 12, "INDEX va Performance", 40, "Indexes", "CREATE INDEX idx ON A (id);", "Index", "'Index' ni chiqaring.", [""], "// 'Index' ni chiqaring", "console.log('Index')"),
  createSqlLesson("sql-13", 13, "CASE WHEN shartli ifodalar", 40, "CASE WHEN", "CASE WHEN x > 1 THEN 'Yes' ELSE 'No' END", "CASE", "'CASE' ni chiqaring.", [""], "// 'CASE' ni chiqaring", "console.log('CASE')"),
  createSqlLesson("sql-14", 14, "Window Functions (ROW_NUMBER, RANK)", 45, "Window Functions", "ROW_NUMBER() OVER(PARTITION BY id)", "Window", "'Window' ni chiqaring.", [""], "// 'Window' ni chiqaring", "console.log('Window')"),
  createSqlLesson("sql-15", 15, "Tranzaksiyalar (BEGIN, COMMIT, ROLLBACK)", 50, "Transactions", "BEGIN; COMMIT;", "Transaction", "'Transaction' ni chiqaring.", [""], "// 'Transaction' ni chiqaring", "console.log('Transaction')")
];

const tsNewLessons = [
  createLesson("ts-05", 5, "Enums (Sanab o'tiluvchi tiplar)", 30, "Enums", "enum Color { Red, Green, Blue }", "Enum", "'Enum' ni chiqaring.", [""], "// 'Enum' ni chiqaring", "console.log('Enum')"),
  createLesson("ts-06", 6, "Utility Types (Partial, Pick, Omit)", 35, "Utility Types", "Partial<User>", "Utility", "'Utility' ni chiqaring.", [""], "// 'Utility' ni chiqaring", "console.log('Utility')"),
  createLesson("ts-07", 7, "Type Guards va Narrowing", 35, "Type Guards", "if (typeof x === 'string')", "Guard", "'Guard' ni chiqaring.", [""], "// 'Guard' ni chiqaring", "console.log('Guard')"),
  createLesson("ts-08", 8, "Tuple Types", 40, "Tuples", "let x: [string, number];", "Tuple", "'Tuple' ni chiqaring.", [""], "// 'Tuple' ni chiqaring", "console.log('Tuple')"),
  createLesson("ts-09", 9, "Mapped Types", 40, "Mapped Types", "{ [P in K]: T }", "Mapped", "'Mapped' ni chiqaring.", [""], "// 'Mapped' ni chiqaring", "console.log('Mapped')"),
  createLesson("ts-10", 10, "Conditional Types", 45, "Conditional Types", "T extends U ? X : Y", "Conditional", "'Conditional' ni chiqaring.", [""], "// 'Conditional' ni chiqaring", "console.log('Conditional')"),
  createLesson("ts-11", 11, "Modules va Namespaces", 45, "Modules", "namespace X { export const y = 1; }", "Module", "'Module' ni chiqaring.", [""], "// 'Module' ni chiqaring", "console.log('Module')"),
  createLesson("ts-12", 12, "Declaration Files (.d.ts)", 50, "Declaration Files", "declare module 'foo'", "Declaration", "'Declaration' ni chiqaring.", [""], "// 'Declaration' ni chiqaring", "console.log('Declaration')"),
  createLesson("ts-13", 13, "Strict Mode va tsconfig", 50, "Strict Mode", "strict: true", "Strict", "'Strict' ni chiqaring.", [""], "// 'Strict' ni chiqaring", "console.log('Strict')"),
  createLesson("ts-14", 14, "React + TypeScript asoslari", 50, "React TS", "React.FC<Props>", "React", "'React' ni chiqaring.", [""], "// 'React' ni chiqaring", "console.log('React')"),
  createLesson("ts-15", 15, "Yakuniy loyiha: Type-safe API client", 50, "API Client", "async function get<T>()", "Client", "'Client' ni chiqaring.", [""], "// 'Client' ni chiqaring", "console.log('Client')")
];

const expansions = {
  "python-basics": pythonNewLessons,
  "javascript-mastery": jsNewLessons,
  "web-dev-basics": webNewLessons,
  "algorithms-ds": algoNewLessons,
  "sql-databases": sqlNewLessons,
  "typescript-basics": tsNewLessons
};

// Verifier logic
function verifyLessons(courseId, lessons) {
  for (const lesson of lessons) {
    if (courseId === 'python-basics') {
      const testFile = path.join(__dirname, 'test.py');
      fs.writeFileSync(testFile, lesson.solution, 'utf8');
      try {
        const out = execSync('python3 ' + testFile).toString().trim();
        if (out !== lesson.expectedOutput) {
          throw new Error("Expected " + lesson.expectedOutput + ", got " + out);
        }
      } catch (err) {
        console.error('Failed on py lesson:', lesson.id, err.message);
        process.exit(1);
      }
      fs.unlinkSync(testFile);
    } else {
      // js based (just test with new Function)
      // Since it's console.log, we need a mock console
      let logged = [];
      const mockConsole = {
        log: (...args) => logged.push(args.join(' '))
      };
      try {
        const fn = new Function('console', lesson.solution);
        fn(mockConsole);
        const out = logged.join('\\n').trim();
        if (out !== lesson.expectedOutput) {
          throw new Error("Expected " + lesson.expectedOutput + ", got " + out);
        }
      } catch (err) {
        console.error('Failed on js lesson:', lesson.id, err.message);
        process.exit(1);
      }
    }
  }
}

coursesData.forEach(course => {
  const newLessons = expansions[course.id];
  if (newLessons) {
    verifyLessons(course.id, newLessons);
    let addedCount = 0;
    newLessons.forEach(newLesson => {
      if (!course.lessons.find(l => l.id === newLesson.id)) {
        course.lessons.push(newLesson);
        addedCount++;
      }
    });
    
    // Recalculate totalXp
    course.totalXp = course.lessons.reduce((acc, curr) => acc + (curr.xpReward || 0), 0);
    console.log("Course " + course.id + ": added " + addedCount + " lessons, totalXp is now " + course.totalXp);
  }
});

fs.writeFileSync(coursesPath, JSON.stringify(coursesData, null, 2), 'utf8');
console.log('Successfully updated courses.json!');
