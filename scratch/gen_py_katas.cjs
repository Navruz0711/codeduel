const fs = require('fs');
const path = require('path');

const generateKatas = () => {
    const katas = [];
    
    // Helper to add a kata
    const addKata = (id, title, desc, diff, category, tags, xp, jsInit, jsSol, pyInit, pySol, tests) => {
        const kata = {
            id,
            title,
            slug: id,
            description: desc,
            examples: [],
            difficulty: diff,
            category,
            tags,
            isPremium: false,
            xpReward: xp,
            languages: {
                javascript: {
                    initialCode: jsInit,
                    solution: jsSol,
                    tests: tests.map(t => ({
                        input: `console.log(${id}(${t.args}))`,
                        expected: t.expected,
                        label: t.label
                    }))
                },
                python: {
                    initialCode: pyInit,
                    solution: pySol,
                    tests: tests.map(t => ({
                        input: `print(${id}(${t.args}))`,
                        expected: t.expected,
                        label: t.label
                    }))
                }
            }
        };
        katas.push(kata);
    };

    // 8 kyu (20 katas)
    for(let i=1; i<=20; i++) {
        let op = i % 4;
        let diff = 8; let xp = 10;
        let id = `py_easy_${i}`;
        if(op === 0) {
            addKata(id, `Ko'paytirish ${i}`, `${i} sonini va x ni ko'paytiring`, diff, "Math", ["math"], xp,
                `function ${id}(x) {\n  // Kodni bu yerga yozing\n  \n}`,
                `function ${id}(x) {\n  return x * ${i};\n}`,
                `def ${id}(x):\n    # Kodni bu yerga yozing\n    pass\n`,
                `def ${id}(x):\n    return x * ${i}`,
                [{args: "2", expected: `${2*i}`, label: "Test 1"}, {args: "5", expected: `${5*i}`, label: "Test 2"}]
            );
        } else if(op === 1) {
            addKata(id, `String qo'shish ${i}`, `Stringga '${i}' ni qo'shing`, diff, "Strings", ["string"], xp,
                `function ${id}(s) {\n  // Kodni bu yerga yozing\n  \n}`,
                `function ${id}(s) {\n  return s + '${i}';\n}`,
                `def ${id}(s):\n    # Kodni bu yerga yozing\n    pass\n`,
                `def ${id}(s):\n    return str(s) + '${i}'`,
                [{args: "'a'", expected: `a${i}`, label: "Test 1"}, {args: "'b'", expected: `b${i}`, label: "Test 2"}]
            );
        } else if(op === 2) {
            addKata(id, `List uzunligi ${i}`, `List uzunligiga ${i} ni qo'shing`, diff, "Arrays", ["array"], xp,
                `function ${id}(arr) {\n  // Kodni bu yerga yozing\n  \n}`,
                `function ${id}(arr) {\n  return arr.length + ${i};\n}`,
                `def ${id}(arr):\n    # Kodni bu yerga yozing\n    pass\n`,
                `def ${id}(arr):\n    return len(arr) + ${i}`,
                [{args: "[1,2]", expected: `${2+i}`, label: "Test 1"}, {args: "[]", expected: `${i}`, label: "Test 2"}]
            );
        } else {
            addKata(id, `Boolean teskari ${i}`, `Booleanni teskarisiga ${i} marta almashtiring`, diff, "Logic", ["logic"], xp,
                `function ${id}(b) {\n  // Kodni bu yerga yozing\n  \n}`,
                `function ${id}(b) {\n  return ${i%2 === 1 ? '!b' : 'b'};\n}`,
                `def ${id}(b):\n    # Kodni bu yerga yozing\n    pass\n`,
                `def ${id}(b):\n    return ${i%2 === 1 ? 'not b' : 'b'}`,
                [{args: "true", expected: `${i%2 === 1 ? 'false' : 'true'}`, label: "Test 1"}, {args: "false", expected: `${i%2 === 1 ? 'true' : 'false'}`, label: "Test 2"}]
            );
        }
    }

    // 7 kyu (20 katas)
    for(let i=1; i<=20; i++) {
        let diff = 7; let xp = 15;
        let id = `py_med_easy_${i}`;
        addKata(id, `List elementlari ${i}`, `Listdagi har bir elementga ${i} qo'shing`, diff, "Arrays", ["array", "map"], xp,
            `function ${id}(arr) {\n  // Kodni bu yerga yozing\n  \n}`,
            `function ${id}(arr) {\n  return JSON.stringify(arr.map(x => x + ${i}));\n}`,
            `def ${id}(arr):\n    # Kodni bu yerga yozing\n    pass\n`,
            `def ${id}(arr):\n    import json\n    return json.dumps([x + ${i} for x in arr])`,
            [{args: "[1,2]", expected: `[${1+i},${2+i}]`, label: "Test 1"}, {args: "[5]", expected: `[${5+i}]`, label: "Test 2"}]
        );
    }

    // 6 kyu (15 katas)
    for(let i=1; i<=15; i++) {
        let diff = 6; let xp = 25;
        let id = `py_med_${i}`;
        addKata(id, `Harflar soni ${i}`, `Satrdagi unli harflar sonini ${i} ga ko'paytiring`, diff, "Strings", ["string", "regex"], xp,
            `function ${id}(s) {\n  // Kodni bu yerga yozing\n  \n}`,
            `function ${id}(s) {\n  return (s.match(/[aeiou]/ig) || []).length * ${i};\n}`,
            `def ${id}(s):\n    # Kodni bu yerga yozing\n    pass\n`,
            `def ${id}(s):\n    return sum(1 for c in s if c.lower() in 'aeiou') * ${i}`,
            [{args: "'hello'", expected: `${2*i}`, label: "Test 1"}, {args: "'xyz'", expected: `0`, label: "Test 2"}]
        );
    }

    // 5 kyu (10 katas)
    for(let i=1; i<=10; i++) {
        let diff = 5; let xp = 35;
        let id = `py_med_hard_${i}`;
        addKata(id, `Tub sonmi ${i}`, `Son tub bo'lsa ${i}, aks holda 0 qaytaring`, diff, "Math", ["math", "prime"], xp,
            `function ${id}(n) {\n  // Kodni bu yerga yozing\n  \n}`,
            `function ${id}(n) {\n  if(n<2) return 0;\n  for(let j=2; j*j<=n; j++) if(n%j===0) return 0;\n  return ${i};\n}`,
            `def ${id}(n):\n    # Kodni bu yerga yozing\n    pass\n`,
            `def ${id}(n):\n    if n<2: return 0\n    for j in range(2, int(n**0.5)+1):\n        if n%j==0: return 0\n    return ${i}`,
            [{args: "7", expected: `${i}`, label: "Test 1"}, {args: "10", expected: `0`, label: "Test 2"}]
        );
    }

    // 4 kyu (5 katas)
    for(let i=1; i<=5; i++) {
        let diff = 4; let xp = 50;
        let id = `py_hard_${i}`;
        addKata(id, `Fibonacci sum ${i}`, `Dastlabki n ta fibonacci sonlar yig'indisini ${i} ga ko'paytiring`, diff, "Algorithms", ["algorithm", "fibonacci"], xp,
            `function ${id}(n) {\n  // Kodni bu yerga yozing\n  \n}`,
            `function ${id}(n) {\n  if(n<=0) return 0;\n  let a=0, b=1, sum=1;\n  for(let j=2; j<=n; j++) { let c=a+b; sum+=c; a=b; b=c; }\n  return sum * ${i};\n}`,
            `def ${id}(n):\n    # Kodni bu yerga yozing\n    pass\n`,
            `def ${id}(n):\n    if n<=0: return 0\n    if n==1: return 1*${i}\n    a,b,s=0,1,1\n    for _ in range(2,n+1):\n        a,b=b,a+b\n        s+=b\n    return s * ${i}`,
            [{args: "3", expected: `${4*i}`, label: "Test 1"}, {args: "4", expected: `${7*i}`, label: "Test 2"}]
        );
    }

    return katas;
};

const run = () => {
    const katas = generateKatas();
    console.log(`Generated ${katas.length} katas.`);

    let passed = 0;
    let failed = 0;

    for (const kata of katas) {
        const js = kata.languages.javascript;
        try {
            // Create a wrapper function that injects the solution and captures console.log
            for (const test of js.tests) {
                let output = '';
                const mockConsole = {
                    log: (msg) => { output = String(msg); }
                };
                
                const fnBody = `
                    ${js.solution}
                    return function() {
                        ${test.input};
                    }
                `;
                const tester = new Function('console', fnBody)(mockConsole);
                tester();
                
                if (output !== test.expected) {
                    console.error(`Test failed for ${kata.id}: expected '${test.expected}', got '${output}'`);
                    failed++;
                } else {
                    passed++;
                }
            }
        } catch (e) {
            console.error(`Error testing ${kata.id}:`, e);
            failed++;
        }
    }

    console.log(`JS Tests: ${passed} passed, ${failed} failed.`);

    if (failed > 0) {
        console.error("Some tests failed. Aborting write.");
        return;
    }

    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const kataFile = path.join(dataDir, 'kata.json');
    let existing = [];
    if (fs.existsSync(kataFile)) {
        existing = JSON.parse(fs.readFileSync(kataFile, 'utf8'));
    }

    const existingIds = new Set(existing.map(k => k.id));
    let added = 0;

    for (const k of katas) {
        if (!existingIds.has(k.id)) {
            existing.push(k);
            added++;
        }
    }

    fs.writeFileSync(kataFile, JSON.stringify(existing, null, 2));
    console.log(`Merged ${added} new katas into kata.json. Total katas: ${existing.length}.`);
};

run();
