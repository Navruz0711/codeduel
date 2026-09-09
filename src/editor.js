// ============================================
// Monaco Editor Integration (CDN)
// Enhanced with WPM Tracker, Mechanical Keystrokes, Zen Mode
// ============================================

import { sound } from './audio.js';

let editor = null;
let isLoaded = false;
let keystrokeCount = 0;
let typingStartTime = null;
let wpmInterval = null;
let isProgrammaticChange = false;

const MONACO_CDN = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min';

export const MONACO_LANG_MAP = {
  javascript: 'javascript',
  js: 'javascript',
  python: 'python',
  py: 'python',
  typescript: 'typescript',
  ts: 'typescript',
  html: 'html',
  css: 'css',
  sql: 'sql',
  cpp: 'cpp',
  java: 'java',
  go: 'go',
  php: 'php',
  rust: 'rust',
  ruby: 'ruby',
};

/**
 * Load Monaco Editor from CDN
 */
export function loadMonaco() {
  return new Promise((resolve, reject) => {
    if (isLoaded && window.monaco) {
      resolve();
      return;
    }

    if (window.monaco) {
      isLoaded = true;
      resolve();
      return;
    }

    const loaderScript = document.createElement('script');
    loaderScript.src = `${MONACO_CDN}/vs/loader.js`;
    loaderScript.onload = () => {
      window.require.config({
        paths: { vs: `${MONACO_CDN}/vs` },
      });

      window.require(['vs/editor/editor.main'], () => {
        monaco.editor.defineTheme('codeduel-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'c084fc', fontStyle: 'bold' },
            { token: 'string', foreground: '00ff88' },
            { token: 'number', foreground: 'f59e0b' },
            { token: 'function', foreground: '38bdf8' },
            { token: 'variable', foreground: 'f1f5f9' },
            { token: 'type', foreground: 'ec4899' },
            { token: 'operator', foreground: '22d3ee' },
          ],
          colors: {
            'editor.background': '#07070d',
            'editor.foreground': '#f1f5f9',
            'editor.lineHighlightBackground': '#13132280',
            'editor.selectionBackground': '#a855f735',
            'editorCursor.foreground': '#00ff88',
            'editorLineNumber.foreground': '#475569',
            'editorLineNumber.activeForeground': '#00ff88',
            'editor.selectionHighlightBackground': '#00ff8820',
            'editorWidget.background': '#0d0d17',
            'editorWidget.border': '#1e293b',
            'editorSuggestWidget.background': '#0d0d17',
            'editorSuggestWidget.border': '#1e293b',
            'editorSuggestWidget.selectedBackground': '#1e293b',
          },
        });

        isLoaded = true;
        resolve();
      });
    };
    loaderScript.onerror = reject;
    document.head.appendChild(loaderScript);
  });
}

/**
 * Create Monaco editor instance
 */
export function createEditor(container, code = '', language = 'javascript') {
  if (editor) {
    editor.dispose();
  }

  const monacoLang = MONACO_LANG_MAP[language] || 'javascript';

  editor = monaco.editor.create(container, {
    value: code,
    language: monacoLang,
    theme: 'codeduel-dark',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: 14,
    lineHeight: 22,
    padding: { top: 16, bottom: 16 },
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    roundedSelection: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    smoothScrolling: true,
    bracketPairColorization: { enabled: true },
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    formatOnPaste: true,
    formatOnType: true,
    renderLineHighlight: 'all',
    renderWhitespace: 'selection',
    guides: {
      indentation: true,
      bracketPairs: true,
    },
  });

  // Track keystrokes, play mechanical audio, and calculate WPM
  resetWpm();
  editor.onDidChangeModelContent((e) => {
    if (isProgrammaticChange) return;
    if (!typingStartTime) {
      typingStartTime = Date.now();
      startWpmLoop();
    }
    keystrokeCount++;
    sound.playKeystroke();
  });

  return editor;
}

function startWpmLoop() {
  if (wpmInterval) clearInterval(wpmInterval);
  wpmInterval = setInterval(() => {
    if (!typingStartTime) return;
    const elapsedMinutes = (Date.now() - typingStartTime) / 60000;
    if (elapsedMinutes > 0) {
      const words = keystrokeCount / 5;
      const wpm = Math.round(words / elapsedMinutes);
      const wpmEl = document.getElementById('editor-wpm-display');
      if (wpmEl) {
        wpmEl.textContent = `⚡ ${wpm} WPM`;
      }
    }
  }, 500);
}

export function resetWpm() {
  keystrokeCount = 0;
  typingStartTime = null;
  if (wpmInterval) clearInterval(wpmInterval);
  const wpmEl = document.getElementById('editor-wpm-display');
  if (wpmEl) wpmEl.textContent = '⚡ 0 WPM';
}

export function getEditorValue() {
  if (!editor) return '';
  return editor.getValue();
}

export function setEditorValue(value) {
  if (!editor) return;
  isProgrammaticChange = true;
  editor.setValue(value);
  isProgrammaticChange = false;
}

export function setEditorLanguage(language) {
  if (!editor) return;
  const model = editor.getModel();
  if (model) {
    const monacoLang = MONACO_LANG_MAP[language] || 'javascript';
    monaco.editor.setModelLanguage(model, monacoLang);
  }
}

export function formatCode() {
  if (editor) {
    editor.getAction('editor.action.formatDocument')?.run();
  }
}

export function focusEditor() {
  if (editor) {
    editor.focus();
  }
}

export function getEditor() {
  return editor;
}
