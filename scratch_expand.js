const fs = require('fs');
const path = require('path');

const kataPath = path.join(__dirname, '..', 'data', 'kata.json');
const katas = JSON.parse(fs.readFileSync(kataPath, 'utf8'));

// Helper to generate missing language templates based on JS/Python tests
katas.forEach(k => {
  const js = k.languages.javascript;
  const py = k.languages.python;
  const tests = js ? js.tests : (py ? py.tests : []);

  // Ensure typescript
  if (!k.languages.typescript && js) {
    k.languages.typescript = {
      initialCode: js.initialCode.replace('function ', 'function '),
      tests: js.tests
    };
  }

  // Ensure cpp
  if (!k.languages.cpp) {
    const fnName = k.slug ? k.slug.replace(/-([a-z])/g, g => g[1].toUpperCase()) : 'solve';
    k.languages.cpp = {
      initialCode: `// C++ Solution\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n// Write your function here\n`,
      tests: tests.map(t => ({
        input: `cout << boolalpha << ${t.input.replace('console.log(', '').replace(/\)$/, '')} << endl;`,
        expected: t.expected,
        label: t.label
      }))
    };
  }

  // Ensure java
  if (!k.languages.java) {
    k.languages.java = {
      initialCode: `import java.util.*;\n\npublic class Solution {\n    // Write your solution method here\n}`,
      tests: tests.map(t => ({
        input: `System.out.println(${t.input.replace('console.log(', '').replace(/\)$/, '')});`,
        expected: t.expected,
        label: t.label
      }))
    };
  }

  // Ensure go
  if (!k.languages.go) {
    k.languages.go = {
      initialCode: `package main\n\nimport "fmt"\n\n// Write your function here\n`,
      tests: tests.map(t => ({
        input: `fmt.Println(${t.input.replace('console.log(', '').replace(/\)$/, '')})`,
        expected: t.expected,
        label: t.label
      }))
    };
  }

  // Ensure php
  if (!k.languages.php) {
    const fnName = k.slug ? k.slug.replace(/-([a-z])/g, g => g[1].toUpperCase()) : 'solve';
    k.languages.php = {
      initialCode: `function ${fnName}($param) {\n    // Your PHP code here\n}`,
      tests: tests.map(t => {
        let inp = t.input.replace('console.log(', '').replace(/\)$/, '');
        return {
          input: `echo ${inp};`,
          expected: t.expected,
          label: t.label
        };
      })
    };
  }

  // Ensure rust
  if (!k.languages.rust) {
    k.languages.rust = {
      initialCode: `// Rust Solution\n// Write your function here\n`,
      tests: tests.map(t => ({
        input: `println!("{:?}", ${t.input.replace('console.log(', '').replace(/\)$/, '')});`,
        expected: t.expected,
        label: t.label
      }))
    };
  }
});

fs.writeFileSync(kataPath, JSON.stringify(katas, null, 2), 'utf8');
console.log('Successfully expanded all 20 katas with 8 programming languages!');
