// ============================================
// CodeDuel & Coddy.tech — Multi-Language Playground Sandbox
// Freeform coding playground with Live HTML/CSS Preview & Console
// ============================================

import { executeCode } from './executor.js';
import { sound } from './audio.js';

export const PLAYGROUND_TEMPLATES = {
  javascript: [
    {
      id: 'js-basic',
      name: 'Salom Dunyo',
      code: `// JavaScript Playground\nconsole.log("Xush kelibsiz Coddy Playground ga! 🚀");\n\nconst sonlar = [1, 2, 3, 4, 5];\nconst juftlar = sonlar.filter(n => n % 2 === 0);\nconsole.log("Juft sonlar:", juftlar);`,
    },
    {
      id: 'js-fib',
      name: 'Fibonachchi Ketma-ketligi',
      code: `function fibonacci(n) {\n  const ketma = [0, 1];\n  for (let i = 2; i < n; i++) {\n    ketma.push(ketma[i - 1] + ketma[i - 2]);\n  }\n  return ketma;\n}\n\nconsole.log("Dastlabki 10 ta Fibonachchi soni:");\nconsole.log(fibonacci(10).join(", "));`,
    },
    {
      id: 'js-timer',
      name: 'Obyektlar & Vaqt',
      code: `const warrior = {\n  name: "Kiber Qahramon",\n  level: "Master",\n  xp: 3450,\n  skills: ["JavaScript", "Python", "Algorithms"]\n};\n\nconsole.log("Qahramon haqida ma'lumot:");\nconsole.log(JSON.stringify(warrior, null, 2));`,
    }
  ],
  python: [
    {
      id: 'py-basic',
      name: 'Salom Python',
      code: `# Python Playground\nprint("Coddy.tech Python muharririga xush kelibsiz!")\n\nroyxat = ["Olma", "Banan", "Gilos"]\nfor meva in royxat:\n    print(f"Meva: {meva}")`,
    },
    {
      id: 'py-math',
      name: 'Tub Sonlar Algoritmi',
      code: `def tubmi(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\ntub_sonlar = [x for x in range(1, 50) if tubmi(x)]\nprint("1 dan 50 gacha tub sonlar:")\nprint(tub_sonlar)`,
    }
  ],
  html: [
    {
      id: 'html-card',
      name: 'Kiber Neon Karta',
      code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    padding: 30px;
    background: #0d0e1a;
    font-family: 'Segoe UI', sans-serif;
    color: #f1f5f9;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }
  .card {
    background: #15172b;
    border: 1px solid #00ff88;
    border-radius: 16px;
    padding: 24px;
    width: 320px;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
    text-align: center;
    transition: transform 0.3s;
  }
  .card:hover {
    transform: translateY(-5px);
  }
  .badge {
    background: rgba(0, 255, 136, 0.15);
    color: #00ff88;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
  }
  h2 { margin: 16px 0 8px; color: #fff; }
  p { color: #94a3b8; font-size: 14px; line-height: 1.5; }
  button {
    background: linear-gradient(135deg, #00ff88, #00b4d8);
    color: #000;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 12px;
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
  }
</style>
</head>
<body>
  <div class="card">
    <span class="badge">CODDY PLAYGROUND</span>
    <h2>Jonli Veb Sinov</h2>
    <p>Ushbu kodni bemalol o'zgartiring va o'ng tarafda natijani darhol ko'ring!</p>
    <button onclick="alert('Salom! Siz Coddy veb maydonidasiz!')">Bosing 🚀</button>
  </div>
</body>
</html>`,
    },
    {
      id: 'html-clock',
      name: 'Interaktiv Soat',
      code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    background: #080914;
    font-family: monospace;
    color: #00ff88;
  }
  #clock {
    font-size: 48px;
    letter-spacing: 4px;
    background: rgba(255,255,255,0.03);
    padding: 20px 40px;
    border-radius: 12px;
    border: 1px solid rgba(0,255,136,0.3);
    box-shadow: 0 0 25px rgba(0,255,136,0.2);
  }
  .label {
    margin-top: 15px;
    color: #94a3b8;
    font-size: 14px;
  }
</style>
</head>
<body>
  <div id="clock">00:00:00</div>
  <div class="label">Toshkent Aniq Vaqti</div>
  <script>
    function updateClock() {
      const now = new Date();
      document.getElementById('clock').innerText = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();
  </script>
</body>
</html>`,
    }
  ]
};

/**
 * Execute code inside playground
 */
export async function runPlaygroundCode(code, language, outputContainer, iframePreview) {
  sound.playRun();

  if (language === 'html') {
    if (iframePreview) {
      iframePreview.srcdoc = code;
    }
    if (outputContainer) {
      outputContainer.textContent = "✅ Jonli ko'rinish (Live Preview) yangilandi!";
    }
    return { success: true };
  }

  if (outputContainer) {
    outputContainer.textContent = "⏳ Kod bajarilmoqda...";
  }

  const result = await executeCode(code, language);

  if (outputContainer) {
    if (result.error) {
      outputContainer.textContent = `❌ Xatolik:\n${result.error}`;
      outputContainer.style.color = '#ef4444';
    } else {
      outputContainer.textContent = result.output || '(Chiqish ma\'lumoti yo\'q)';
      outputContainer.style.color = '#00ff88';
    }
  }

  return result;
}

