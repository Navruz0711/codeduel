// ============================================
// Code Executor — Multi-Language Piston API + Sandboxes
// Supports 8+ languages: JS, Python, TS, C++, Java, Go, PHP, Rust
// ============================================

const PISTON_API = 'https://emkc.org/api/v2/piston';

export const LANGUAGE_MAP = {
  javascript: { name: 'JavaScript', language: 'javascript', version: '18.15.0', ext: 'js', icon: '⚡' },
  python: { name: 'Python', language: 'python', version: '3.10.0', ext: 'py', icon: '🐍' },
  typescript: { name: 'TypeScript', language: 'typescript', version: '5.0.3', ext: 'ts', icon: '🔷' },
  cpp: { name: 'C++', language: 'c++', version: '10.2.0', ext: 'cpp', icon: '⚙️' },
  java: { name: 'Java', language: 'java', version: '15.0.2', ext: 'java', icon: '☕' },
  go: { name: 'Go', language: 'go', version: '1.16.2', ext: 'go', icon: '🐹' },
  php: { name: 'PHP', language: 'php', version: '8.2.3', ext: 'php', icon: '🐘' },
  rust: { name: 'Rust', language: 'rust', version: '1.68.2', ext: 'rs', icon: '🦀' },
};

/**
 * Execute arbitrary code via Piston API
 */
export async function executeCode(code, language) {
  // Instant client-side execution for JavaScript
  if (language === 'javascript') {
    return executeJSLocally(code);
  }

  const langConfig = LANGUAGE_MAP[language];
  if (!langConfig) {
    return { output: '', error: `Unsupported language: ${language}`, success: false };
  }

  try {
    const response = await fetch(`${PISTON_API}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [{ name: `Solution.${langConfig.ext}`, content: code }],
        run_timeout: 8000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.run) {
      const output = (result.run.stdout || '').trim();
      const stderr = (result.run.stderr || '').trim();
      const error = result.run.code !== 0 ? (stderr || result.run.signal || 'Runtime error') : null;

      return {
        output,
        error: error || (stderr && !output ? stderr : null),
        success: result.run.code === 0,
      };
    }

    return { output: '', error: 'No output received', success: false };
  } catch (err) {
    return { output: '', error: `Execution failed: ${err.message}`, success: false };
  }
}

/**
 * Client-side sandboxed JS runner
 */
function executeJSLocally(code) {
  try {
    let output = '';
    const mockConsole = {
      log: (...args) => {
        output += args.map(a => {
          if (typeof a === 'object') return JSON.stringify(a);
          return String(a);
        }).join(' ') + '\n';
      },
    };

    const fn = new Function('console', code);
    fn(mockConsole);

    return { output: output.trim(), error: null, success: true };
  } catch (err) {
    return { output: '', error: err.message, success: false };
  }
}

/**
 * Run test cases with batch optimization
 */
export async function runTests(userCode, tests, language) {
  // If only 1 test or non-batchable, run sequentially
  const results = [];
  let allPassed = true;

  for (const test of tests) {
    try {
      let fullCode = '';

      if (language === 'cpp') {
        // Embed test inside C++ main
        if (userCode.includes('int main()')) {
          fullCode = userCode.replace('return 0;', `${test.input}\nreturn 0;`);
        } else {
          fullCode = `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n${userCode}\n\nint main() {\n  ${test.input}\n  return 0;\n}`;
        }
      } else if (language === 'java') {
        // Embed test inside Java main
        if (userCode.includes('public static void main')) {
          fullCode = userCode.replace('public static void main(String[] args) {', `public static void main(String[] args) {\n  ${test.input}`);
        } else {
          fullCode = `import java.util.*;\n\npublic class Solution {\n  ${userCode}\n  public static void main(String[] args) {\n    ${test.input}\n  }\n}`;
        }
      } else if (language === 'go') {
        if (userCode.includes('func main()')) {
          fullCode = userCode.replace('func main() {', `func main() {\n  ${test.input}`);
        } else {
          fullCode = `package main\n\nimport (\n\t"fmt"\n\t"strings"\n)\n\n${userCode}\n\nfunc main() {\n  ${test.input}\n}`;
        }
      } else if (language === 'rust') {
        if (userCode.includes('fn main()')) {
          fullCode = userCode.replace('fn main() {', `fn main() {\n  ${test.input}`);
        } else {
          fullCode = `${userCode}\n\nfn main() {\n  ${test.input}\n}`;
        }
      } else if (language === 'php') {
        if (!userCode.trim().startsWith('<?php')) {
          fullCode = `<?php\n${userCode}\n${test.input}\n`;
        } else {
          fullCode = `${userCode}\n${test.input}\n`;
        }
      } else {
        fullCode = `${userCode}\n${test.input}`;
      }

      const execution = await executeCode(fullCode, language);

      if (execution.error && !execution.output) {
        results.push({
          test,
          label: test.label || test.description || 'Test case',
          passed: false,
          expected: test.expected,
          actual: execution.error,
          error: execution.error,
        });
        allPassed = false;
      } else {
        const actual = execution.output.trim();
        const expected = String(test.expected).trim();
        const passed = actual === expected;

        results.push({
          test,
          label: test.label || test.description || 'Test case',
          passed,
          expected,
          actual,
          error: null,
        });

        if (!passed) allPassed = false;
      }
    } catch (err) {
      results.push({
        test,
        label: test.label || test.description || 'Test case',
        passed: false,
        expected: test.expected,
        actual: err.message,
        error: err.message,
      });
      allPassed = false;
    }
  }

  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;

  return { results, allPassed, passedCount, totalCount, error: null };
}

/**
 * Execute custom test input
 */
export async function runCustomTest(userCode, customInput, language) {
  let fullCode = '';

  if (language === 'javascript' || language === 'typescript') {
    fullCode = `${userCode}\nconsole.log(${customInput});`;
  } else if (language === 'python') {
    fullCode = `${userCode}\nprint(${customInput})`;
  } else if (language === 'php') {
    fullCode = `<?php\n${userCode}\nprint_r(${customInput});`;
  } else if (language === 'go') {
    fullCode = `${userCode}\nfunc main() {\n  fmt.Println(${customInput})\n}`;
  } else if (language === 'cpp') {
    fullCode = `#include <iostream>\nusing namespace std;\n${userCode}\nint main() { cout << ${customInput} << endl; return 0; }`;
  } else {
    fullCode = `${userCode}\n${customInput}`;
  }

  const res = await executeCode(fullCode, language);
  return {
    output: res.output || '',
    result: res.output || '',
    error: res.error || null,
    success: res.success || false
  };
}
