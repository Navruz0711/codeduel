// ============================================
// CodeDuel — Multi-Provider AI Copilot & Code Intelligence Engine
// Groq Free Llama 3.3 70B, Mistral Codestral, HuggingFace Qwen, Gemini & Offline AI
// ============================================

import { getLanguage, t } from './i18n.js';
import { sound } from './audio.js';
import { loadUser } from './user.js';
import { getDailyAILimit, recordAIRequest, isUserPro } from './monetization.js';

export const AI_PROVIDERS = {
  groq: {
    id: 'groq',
    name: 'Groq Cloud (Ultra-Fast Bepul / Free)',
    shortName: '⚡ Groq Llama 3.3',
    icon: '⚡',
    badge: 'Tavsiya / 500 tok/s',
    keyRequired: true,
    envKeyName: 'VITE_GROQ_API_KEY',
    models: [
      { id: 'llama-3.3-70b-versatile', name: '🦙 Llama 3.3 70B Versatile (Tavsiya)' },
      { id: 'llama-3.1-8b-instant', name: '⚡ Llama 3.1 8B Instant (Ultra-Tezkor)' },
      { id: 'deepseek-r1-distill-llama-70b', name: '🔮 DeepSeek R1 Distill 70B' },
      { id: 'gemma2-9b-it', name: '💎 Google Gemma 2 9B' }
    ],
    defaultModel: 'llama-3.3-70b-versatile',
    keyStorage: 'codeduel_groq_api_key',
    helpUrl: 'https://console.groq.com/keys',
    infoText: 'Groq Cloud bepul API kaliti — sekundiga 500+ token tezlik, 14,400 so\'rov/kun mutlaqo bepul (karta talab qilinmaydi).'
  },
  mistral: {
    id: 'mistral',
    name: 'Mistral Codestral (Dasturlash AI)',
    shortName: '💻 Mistral Codestral',
    icon: '💻',
    badge: 'Kodlash Uchun',
    keyRequired: true,
    envKeyName: 'VITE_MISTRAL_API_KEY',
    models: [
      { id: 'codestral-latest', name: '🚀 Codestral Latest (Maxsus Kod AI)' },
      { id: 'mistral-small-latest', name: '⚡ Mistral Small Latest' },
      { id: 'open-mistral-nemo', name: '🌊 Mistral Nemo (Bepul)' }
    ],
    defaultModel: 'codestral-latest',
    keyStorage: 'codeduel_mistral_api_key',
    helpUrl: 'https://console.mistral.ai/api-keys',
    infoText: 'Mistral AI bepul API kaliti — 80+ dasturlash tiliga ixtisoslashgan yuqori aniqlikdagi Codestral modeli.'
  },
  huggingface: {
    id: 'huggingface',
    name: 'Hugging Face (Qwen 2.5 Coder)',
    shortName: '🤗 HF Qwen Coder',
    icon: '🤗',
    badge: 'Free Serverless',
    keyRequired: true,
    envKeyName: 'VITE_HF_API_KEY',
    models: [
      { id: 'Qwen/Qwen2.5-Coder-32B-Instruct', name: '💻 Qwen 2.5 Coder 32B (Top Coding AI)' },
      { id: 'meta-llama/Meta-Llama-3-8B-Instruct', name: '🦙 Llama 3 8B Instruct' }
    ],
    defaultModel: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    keyStorage: 'codeduel_hf_api_key',
    helpUrl: 'https://huggingface.co/settings/tokens',
    infoText: 'Hugging Face bepul User Access Token — serverless inference orqali eng kuchli ochiq kodli modellardan foydalaning.'
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter Free AI',
    shortName: '🌐 OpenRouter',
    icon: '🌐',
    badge: 'Multi-Model',
    keyRequired: true,
    envKeyName: 'VITE_OPENROUTER_API_KEY',
    models: [
      { id: 'deepseek/deepseek-r1:free', name: '🔮 DeepSeek R1 (Free)' },
      { id: 'meta-llama/llama-3.3-70b-instruct:free', name: '🦙 Llama 3.3 70B (Free)' },
      { id: 'qwen/qwen-2.5-coder-32b-instruct:free', name: '💻 Qwen 2.5 Coder 32B (Free)' }
    ],
    defaultModel: 'deepseek/deepseek-r1:free',
    keyStorage: 'codeduel_openrouter_api_key',
    helpUrl: 'https://openrouter.ai/keys',
    infoText: 'OpenRouter bepul modellari uchun API kalit (DeepSeek R1, Llama 3.3, Qwen 2.5).'
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini (Free Tier)',
    shortName: '✨ Gemini Flash',
    icon: '✨',
    badge: 'Google AI',
    keyRequired: true,
    envKeyName: 'VITE_GEMINI_API_KEY',
    models: [
      { id: 'gemini-2.5-flash', name: '⚡ Gemini 2.5 Flash' },
      { id: 'gemini-3.6-flash', name: '🧠 Gemini 3.6 Flash' },
      { id: 'gemini-flash-latest', name: '🚀 Gemini Flash Latest' }
    ],
    defaultModel: 'gemini-2.5-flash',
    keyStorage: 'codeduel_gemini_api_key',
    helpUrl: 'https://aistudio.google.com/apikey',
    infoText: 'Google AI Studio orqali olingan bepul API kalit (kuniga 1500+ so\'rov mutlaqo bepul).'
  },
  heuristic: {
    id: 'heuristic',
    name: 'CodeDuel Smart Offline AI',
    shortName: '🧠 Offline AI',
    icon: '🧠',
    badge: '100% Oflayn',
    keyRequired: false,
    envKeyName: '',
    models: [
      { id: 'smart-heuristic-v2', name: '🤖 Lokal Algoritmik Tahlilchi & Big-O' }
    ],
    defaultModel: 'smart-heuristic-v2',
    keyStorage: '',
    helpUrl: '',
    infoText: 'Internet va API kalitsiz ishlaydigan lokal tahlilchi va bosqichma-bosqich maslahatchi.'
  }
};

const STORAGE_ACTIVE_PROVIDER = 'codeduel_ai_active_provider';
const STORAGE_PROVIDER_MODELS = 'codeduel_ai_provider_models';

function decodeKey(b64) {
  if (!b64) return '';
  try {
    return typeof atob !== 'undefined' ? atob(b64) : Buffer.from(b64, 'base64').toString('utf8');
  } catch (e) {
    return '';
  }
}

// Default open keys embedded directly (per user preference for personal use)
const DEFAULT_OPEN_KEYS = {
  mistral: decodeKey('RzJaWWhoUnVOcGJFSFhySllJZ0RESGpWT3NhOG83bTE='),
  groq: '',
  gemini: decodeKey('QVEuQWI4Uk42SXdWWmticl80R0gtcVR6WklIOFNwdGRZTWhkU3FPSU5jeDgydllkVmRjdWc='),
  huggingface: '',
  openrouter: ''
};

const ENV_KEYS = {
  mistral: import.meta.env?.VITE_MISTRAL_API_KEY || DEFAULT_OPEN_KEYS.mistral,
  groq: import.meta.env?.VITE_GROQ_API_KEY || DEFAULT_OPEN_KEYS.groq,
  huggingface: import.meta.env?.VITE_HF_API_KEY || DEFAULT_OPEN_KEYS.huggingface,
  openrouter: import.meta.env?.VITE_OPENROUTER_API_KEY || DEFAULT_OPEN_KEYS.openrouter,
  gemini: import.meta.env?.VITE_GEMINI_API_KEY || DEFAULT_OPEN_KEYS.gemini
};

// ============================================
// Storage and Configuration Helpers
// ============================================

export function getActiveProviderId() {
  try {
    const saved = localStorage.getItem(STORAGE_ACTIVE_PROVIDER);
    if (saved && AI_PROVIDERS[saved]) return saved;
  } catch (e) {}
  
  // Prefer provider that has a valid API key configured
  if (getProviderApiKey('mistral')) return 'mistral';
  if (getProviderApiKey('groq')) return 'groq';
  if (getProviderApiKey('gemini')) return 'gemini';
  if (getProviderApiKey('openrouter')) return 'openrouter';
  if (getProviderApiKey('huggingface')) return 'huggingface';

  return 'mistral'; // Default to Mistral Codestral
}

export function setActiveProviderId(providerId) {
  try {
    if (AI_PROVIDERS[providerId]) {
      localStorage.setItem(STORAGE_ACTIVE_PROVIDER, providerId);
    }
  } catch (e) {}
}

export function getActiveModelForProvider(providerId) {
  const provider = AI_PROVIDERS[providerId] || AI_PROVIDERS.mistral;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_PROVIDER_MODELS) || '{}');
    if (saved[providerId] && provider.models.some(m => m.id === saved[providerId])) {
      return saved[providerId];
    }
  } catch (e) {}
  return provider.defaultModel;
}

export function setActiveModelForProvider(providerId, modelId) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_PROVIDER_MODELS) || '{}');
    saved[providerId] = modelId;
    localStorage.setItem(STORAGE_PROVIDER_MODELS, JSON.stringify(saved));
  } catch (e) {}
}

export function getProviderApiKey(providerId) {
  const provider = AI_PROVIDERS[providerId];
  if (!provider) return '';

  // 1. Check user key in localStorage
  if (provider.keyStorage) {
    try {
      const userKey = localStorage.getItem(provider.keyStorage);
      if (userKey && userKey.trim().length > 0) {
        return userKey.trim();
      }
    } catch (e) {}
  }

  // 2. Check environment variable
  const staticEnv = ENV_KEYS[providerId];
  if (staticEnv && typeof staticEnv === 'string' && staticEnv.trim().length > 0 && !staticEnv.includes('YOUR_')) {
    return staticEnv.trim();
  }

  if (provider.envKeyName) {
    const envKey = import.meta.env?.[provider.envKeyName];
    if (envKey && typeof envKey === 'string' && envKey.trim().length > 0 && !envKey.includes('YOUR_')) {
      return envKey.trim();
    }
  }

  // 3. Fallback to embedded default open key
  if (DEFAULT_OPEN_KEYS[providerId]) {
    return DEFAULT_OPEN_KEYS[providerId];
  }

  return '';
}

export function saveProviderApiKey(providerId, key) {
  const storageKey = AI_PROVIDERS[providerId]?.keyStorage;
  if (!storageKey) return;
  try {
    localStorage.setItem(storageKey, (key || '').trim());
  } catch (e) {}
}

// Backward compatibility
export function getGeminiKey() {
  return getProviderApiKey('gemini');
}

export function saveGeminiKey(key) {
  saveProviderApiKey('gemini', key);
}

// ============================================
// Intelligent Heuristic Engine (Offline / Local)
// ============================================

export function getAIHint(challenge, currentCode, level = 1) {
  sound.playAIBlip();
  const lang = getLanguage();

  const hintsMap = {
    'sum-positive': {
      1: {
        uz: '💡 **1-Bosqich: Asosiy G\'oya**\nMassivni aylanib chiqish va faqat musbat sonlarni (`> 0`) yig\'indiga qo\'shish lozim.',
        en: '💡 **Level 1: Core Concept**\nIterate through the array and accumulate only numbers strictly greater than zero (`> 0`).',
        ru: '💡 **Уровень 1: Ключевая Концепция**\nПройдитесь по массиву и суммируйте только положительные числа (`> 0`).'
      },
      2: {
        uz: '🧠 **2-Bosqich: Mantiq & Edge-caselar**\n- Bo\'sh massiv `[]` yoki barcha sonlar manfiy bo\'lsa, boshlang\'ich yig\'indi `0` bo\'lishi shart.\n- `reduce((sum, n) => n > 0 ? sum + n : sum, 0)` yoki oddiy `for` siklidan foydalaning.',
        en: '🧠 **Level 2: Logic & Edge Cases**\n- If empty array or all negative, the sum must remain `0`.\n- You can use `filter().reduce()` or a simple `for` loop.',
        ru: '🧠 **Уровень 2: Логика и Граничные Случаи**\n- Для пустого массива или только отрицательных чисел результат должен быть `0`.\n- Используйте `reduce()` или простой цикл `for`.'
      },
      3: {
        uz: '🛠️ **3-Bosqich: Kod Skeleti (Blueprint)**\n```javascript\nlet sum = 0;\nfor (const num of arr) {\n  if (num > 0) sum += num;\n}\nreturn sum;\n```',
        en: '🛠️ **Level 3: Blueprint**\n```javascript\nlet sum = 0;\nfor (const num of arr) {\n  if (num > 0) sum += num;\n}\nreturn sum;\n```',
        ru: '🛠️ **Уровень 3: Скелет Кода**\n```javascript\nlet sum = 0;\nfor (const num of arr) {\n  if (num > 0) sum += num;\n}\nreturn sum;\n```'
      }
    },
    'reverse-string': {
      1: {
        uz: '💡 **1-Bosqich: Asosiy G\'oya**\nStringdagi belgilarni oxirgi indeksdan (`length - 1`) boshlab 0-indeksgacha teskari ketma-ketlikda yig\'ish kerak.',
        en: '💡 **Level 1: Core Concept**\nTraverse the characters starting from the last index down to 0.',
        ru: '💡 **Уровень 1: Ключевая Концепция**\nСчитывайте символы строки начиная с последнего индекса до нулевого.'
      },
      2: {
        uz: '🧠 **2-Bosqich: Mantiq & Cheklovlar**\n- Built-in `.reverse()` ishlatish taqiqlangan.\n- Bo\'sh string ochib, har bir harfni uning boshiga qo\'shing: `result = char + result` yoki orqadan `for` aylaning.',
        en: '🧠 **Level 2: Logic & Constraints**\n- Built-in `.reverse()` is prohibited.\n- Accumulate characters into a new string using a backward loop or string concatenation.',
        ru: '🧠 **Уровень 2: Ограничения**\n- Использовать `.reverse()` запрещено.\n- Формируйте новую строку в цикле с конца.'
      },
      3: {
        uz: '🛠️ **3-Bosqich: Kod Skeleti**\n```javascript\nlet res = "";\nfor (let i = str.length - 1; i >= 0; i--) {\n  res += str[i];\n}\nreturn res;\n```',
        en: '🛠️ **Level 3: Blueprint**\n```javascript\nlet res = "";\nfor (let i = str.length - 1; i >= 0; i--) {\n  res += str[i];\n}\nreturn res;\n```',
        ru: '🛠️ **Уровень 3: Скелет Кода**\n```javascript\nlet res = "";\nfor (let i = str.length - 1; i >= 0; i--) {\n  res += str[i];\n}\nreturn res;\n```'
      }
    },
    'even-or-odd': {
      1: {
        uz: '💡 **1-Bosqich: Asosiy G\'oya**\nQoldiq olish operatori (`% 2`) orqali sonning 2 ga bo\'linishini tekshiring.',
        en: '💡 **Level 1: Core Concept**\nUse the modulo operator (`% 2`) to check if the integer is divisible by 2.',
        ru: '💡 **Уровень 1: Ключевая Концепция**\nИспользуйте остаток от деления (`% 2`).'
      },
      2: {
        uz: '🧠 **2-Bosqich: Mantiq**\nAgar `number % 2 === 0` bo\'lsa `"Even"`, aks holda `"Odd"` qaytaring. Manfiy sonlar uchun ham to\'g\'ri ishlashini inobatga oling.',
        en: '🧠 **Level 2: Logic**\nIf `number % 2 === 0` return `"Even"`, else return `"Odd"`. Mind negative numbers.',
        ru: '🧠 **Уровень 2: Логика**\nЕсли `number % 2 === 0`, возвращайте `"Even"`, иначе `"Odd"`.'
      },
      3: {
        uz: '🛠️ **3-Bosqich: Kod Skeleti**\n```javascript\nreturn number % 2 === 0 ? "Even" : "Odd";\n```',
        en: '🛠️ **Level 3: Blueprint**\n```javascript\nreturn number % 2 === 0 ? "Even" : "Odd";\n```',
        ru: '🛠️ **Уровень 3: Скелет Кода**\n```javascript\nreturn number % 2 === 0 ? "Even" : "Odd";\n```'
      }
    },
    'two-sum': {
      1: {
        uz: '💡 **1-Bosqich: Asosiy G\'oya**\nHar bir son `nums[i]` uchun `target - nums[i]` qiymati mavjudligini tekshirish kerak.',
        en: '💡 **Level 1: Core Concept**\nFor every number `nums[i]`, find if its complement `target - nums[i]` exists.',
        ru: '💡 **Уровень 1: Ключевая Концепция**\nДля каждого числа ищите дополнение `target - nums[i]`.'
      },
      2: {
        uz: '🧠 **2-Bosqich: Optimal Mantiq (Hash Map)**\n- $O(n^2)$ o\'rniga $O(n)$ tezlikka erishish uchun Hash Map (Object yoki Map) dan foydalaning.\n- Massiv bo\'ylab bir martalik o\'tishda ko\'rilgan sonlarni xotirada saqlab boring.',
        en: '🧠 **Level 2: Optimal Logic (Hash Map)**\n- Achieve $O(n)$ time complexity using a Hash Map instead of nested loops $O(n^2)$.\n- Store previously seen elements and their indices.',
        ru: '🧠 **Уровень 2: Хэш-таблица**\n- Используйте объект или Map для $O(n)$ сложности вместо $O(n^2)$.'
      },
      3: {
        uz: '🛠️ **3-Bosqich: Kod Skeleti**\n```javascript\nconst map = {};\nfor (let i = 0; i < nums.length; i++) {\n  const diff = target - nums[i];\n  if (diff in map) return [map[diff], i];\n  map[nums[i]] = i;\n}\n```',
        en: '🛠️ **Level 3: Blueprint**\n```javascript\nconst map = {};\nfor (let i = 0; i < nums.length; i++) {\n  const diff = target - nums[i];\n  if (diff in map) return [map[diff], i];\n  map[nums[i]] = i;\n}\n```',
        ru: '🛠️ **Уровень 3: Скелет Кода**\n```javascript\nconst map = {};\nfor (let i = 0; i < nums.length; i++) {\n  const diff = target - nums[i];\n  if (diff in map) return [map[diff], i];\n  map[nums[i]] = i;\n}\n```'
      }
    }
  };

  const custom = hintsMap[challenge?.id]?.[level]?.[lang];
  if (custom) return custom;

  const category = challenge?.category || 'Algorithm';
  if (level === 1) {
    if (lang === 'uz') return `💡 **1-Bosqich: Asosiy G'oya**\nMasala **${category}** turkumiga tegishli. Masalaning asosiy shartlarini va cheklovlarini (edge-cases) aniqlab oling.`;
    if (lang === 'ru') return `💡 **Уровень 1: Ключевая Концепция**\nЗадача относится к категории **${category}**. Определите базовые условия и граничные случаи.`;
    return `💡 **Level 1: Core Concept**\nThis problem belongs to the **${category}** domain. Define input constraints and base cases.`;
  }
  if (level === 2) {
    if (lang === 'uz') return `🧠 **2-Bosqich: Mantiq & Cheklovlar**\n- Kiruvchi ma'lumotlar bo'sh (\`[]\` yoki \`""\`) yoki manfiy bo'lganda to'g'ri ishlashini tekshiring.\n- Vaqt va xotira murakkabligini optimallashtiring.`;
    if (lang === 'ru') return `🧠 **Уровень 2: Логика и Граничные Случаи**\n- Проверьте краевые случаи (пустые массивы, нули, отрицательные числа).\n- Избегайте лишних вложенных циклов.`;
    return `🧠 **Level 2: Logic & Edge Cases**\n- Validate edge cases (empty inputs, zeroes, negatives).\n- Minimize memory overhead and avoid redundant loops.`;
  }
  if (lang === 'uz') return `🛠️ **3-Bosqich: Tuzilma (Blueprint)**\n1. Kiruvchi ma'lumotlarni tekshirish / tozalash\n2. Asosiy algoritmik sikl yoki o'zgartirish\n3. Kutilgan formatdagi natijani qaytarish.`;
  if (lang === 'ru') return `🛠️ **Уровень 3: Структура**\n1. Валидация входных данных\n2. Основной цикл преобразования\n3. Возврат результата.`;
  return `🛠️ **Level 3: Blueprint**\n1. Validate input\n2. Main transformation loop\n3. Return formatted result.`;
}

export function reviewCode(challenge, code, language) {
  sound.playAIBlip();
  const lang = getLanguage();

  if (!code || code.trim().length < 8) {
    return {
      timeComplexity: 'O(?)',
      spaceComplexity: 'O(?)',
      score: 0,
      feedback: lang === 'uz'
        ? '⚠️ Muharrirda kod yozilmagan. Avval yechimni yozing.'
        : lang === 'ru'
        ? '⚠️ В редакторе нет кода. Напишите решение.'
        : '⚠️ No code in editor. Write your solution first.'
    };
  }

  const loopCount = (code.match(/\b(for|while|forEach|map|filter|reduce|sort)\b/g) || []).length;
  const nestedLoop = (code.match(/(for|while)[^{]*\{[^}]*(for|while)/s) !== null);
  const usesMap = code.includes('new Map') || code.includes('{}') || code.includes('dict(') || code.includes('set(');
  const usesSort = code.includes('.sort(') || code.includes('sorted(');

  let timeComp = 'O(n)';
  let spaceComp = 'O(1)';
  let score = 90;
  const suggestions = [];

  if (nestedLoop) {
    timeComp = 'O(n²)';
    score -= 25;
    suggestions.push(
      lang === 'uz'
        ? '⚠️ **Ichma-ich sikllar ($O(n^2)$) aniqlandi**: Katta ma\'lumotlarda sekinlashishi mumkin. Hash Map yoki Set yordamida $O(n)$ ga tushirishni ko\'rib chiqing.'
        : lang === 'ru'
        ? '⚠️ **Вложенные циклы ($O(n^2)$)**: Возможно замедление на больших тестах. Оптимизируйте до $O(n)$ с помощью Hash Map.'
        : '⚠️ **Nested loops detected ($O(n^2)$)**: Consider using a Hash Map or Set for $O(n)$ linear time complexity.'
    );
  } else if (loopCount === 0 && !code.includes('return')) {
    timeComp = 'O(1)';
    score = 40;
  } else if (usesSort) {
    timeComp = 'O(n log n)';
    suggestions.push(
      lang === 'uz'
        ? 'ℹ️ **Saralash algoritmi ishlatildi ($O(n \\log n)$)**: Qidiruv uchun massivni saralash o\'rniga bir martalik sikl yoki Hash Map qo\'llash tezroq bo\'lishi mumkin.'
        : 'ℹ️ **Sorting used ($O(n \\log n)$)**: A single-pass loop or Hash Map may be faster.'
    );
  }

  if (usesMap || code.includes('[]') || code.includes('new Array') || code.includes('.split(')) {
    spaceComp = 'O(n)';
  }

  if (code.includes('var ')) {
    suggestions.push(
      lang === 'uz' ? '💡 `var` o\'rniga zamonaviy `const` va `let` dan foydalaning.' : '💡 Use `const` and `let` instead of `var`.'
    );
    score -= 5;
  }

  if (suggestions.length === 0) {
    suggestions.push(
      lang === 'uz'
        ? '✨ **Ajoyib va toza tuzilma!** Kod optimal va samarali ko\'rinmoqda. Testlarni ishga tushirib natijani tekshiring!'
        : lang === 'ru'
        ? '✨ **Отличная и чистая структура!** Код выглядит оптимально. Запустите тесты.'
        : '✨ **Clean and optimal structure!** Ready to run test cases.'
    );
  }

  return {
    timeComplexity: timeComp,
    spaceComplexity: spaceComp,
    score: Math.max(10, Math.min(100, score)),
    feedback: suggestions.join('\n\n')
  };
}

// ============================================
// Remote API Drivers (Groq, Mistral, HF, OpenRouter, Gemini)
// ============================================

async function callGroqAPI(prompt, systemPrompt, model, apiKey) {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1200
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Groq API xatoligi (${res.status})`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq javob qaytarmadi');
  return text;
}

async function callMistralAPI(prompt, systemPrompt, model, apiKey) {
  const chosenModel = model || 'codestral-latest';
  const endpoints = chosenModel.includes('codestral')
    ? ['https://codestral.mistral.ai/v1/chat/completions', 'https://api.mistral.ai/v1/chat/completions']
    : ['https://api.mistral.ai/v1/chat/completions', 'https://codestral.mistral.ai/v1/chat/completions'];

  let lastError = null;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: chosenModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 1200
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return text;
      } else {
        const errData = await res.json().catch(() => ({}));
        const errorMsg = errData?.message || errData?.error?.message || errData?.error || `Mistral API xatoligi (${res.status})`;
        lastError = new Error(errorMsg);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Mistral / Codestral javob qaytarmadi');
}

async function callHuggingFaceAPI(prompt, systemPrompt, model, apiKey) {
  const chosenModel = model || 'Qwen/Qwen2.5-Coder-32B-Instruct';
  const url = `https://router.huggingface.co/hf-inference/models/${chosenModel}/v1/chat/completions`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: chosenModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1200
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Hugging Face API xatoligi (${res.status})`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Hugging Face javob qaytarmadi');
  return text;
}

async function callOpenRouterAPI(prompt, systemPrompt, model, apiKey) {
  const url = 'https://openrouter.ai/api/v1/chat/completions';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'CodeDuel Cyber Arena'
    },
    body: JSON.stringify({
      model: model || 'deepseek/deepseek-r1:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1200
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `OpenRouter API xatoligi (${res.status})`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenRouter javob qaytarmadi');
  return text;
}

async function callGeminiAPI(prompt, systemPrompt, model, apiKey) {
  const chosenModel = model || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nFoydalanuvchi murojaati:\n${prompt}` }]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1200
      }
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Gemini API xatoligi (${res.status})`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini javob qaytarmadi');
  return text;
}

/**
 * Test Connection helper for Settings Modal
 */
export async function testProviderConnection(providerId, customKey, customModel) {
  const provider = AI_PROVIDERS[providerId];
  if (!provider) return { success: false, message: 'Noma\'lum provayder' };

  if (providerId === 'heuristic') {
    return { success: true, message: 'Offline Heuristic AI tayyor! (100% lokal)', latencyMs: 3 };
  }

  const key = customKey || getProviderApiKey(providerId);
  if (!key) {
    return { success: false, message: 'API kalit kiritilmagan. Avval bepul kalitni kiriting.' };
  }

  const model = customModel || getActiveModelForProvider(providerId);
  const start = performance.now();

  try {
    const testPrompt = 'Say "CodeDuel AI Ready" in 1 line.';
    const systemPrompt = 'Respond with "CodeDuel AI Ready" in exactly one short line.';

    if (providerId === 'groq') {
      await callGroqAPI(testPrompt, systemPrompt, model, key);
    } else if (providerId === 'mistral') {
      await callMistralAPI(testPrompt, systemPrompt, model, key);
    } else if (providerId === 'huggingface') {
      await callHuggingFaceAPI(testPrompt, systemPrompt, model, key);
    } else if (providerId === 'openrouter') {
      await callOpenRouterAPI(testPrompt, systemPrompt, model, key);
    } else if (providerId === 'gemini') {
      await callGeminiAPI(testPrompt, systemPrompt, model, key);
    }

    const latencyMs = Math.round(performance.now() - start);
    return {
      success: true,
      message: `Ulanish muvaffaqiyatli! Server tezligi: ${latencyMs}ms`,
      latencyMs
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Ulanishda xatolik yuz berdi'
    };
  }
}

// ============================================
// Main AI Mentor Query Handler
// ============================================

export async function askAIMentor(prompt, challenge, currentCode, language, actionType = 'chat') {
  sound.playAIBlip();
  const currentLang = getLanguage();
  const providerId = getActiveProviderId();
  const model = getActiveModelForProvider(providerId);
  const apiKey = getProviderApiKey(providerId);

  // If Heuristic selected or no key for remote providers, use smart local engine
  if (providerId === 'heuristic' || (!apiKey && providerId !== 'heuristic')) {
    if (!apiKey && providerId !== 'heuristic') {
      const notice = currentLang === 'uz'
        ? `💡 *[${AI_PROVIDERS[providerId]?.name || providerId} uchun API kalit kiritilmagan. Yuqoridagi 🔑 tugmasi orqali bepul kalitingizni kiriting. Hozir CodeDuel Offline AI javob bermoqda]*\n\n`
        : `💡 *[No API key found for ${providerId}. Add your free key via 🔑 Settings. Fallback to Offline AI]*\n\n`;
      return notice + handleOfflineResponse(actionType, prompt, challenge, currentCode, language, currentLang);
    }
    return handleOfflineResponse(actionType, prompt, challenge, currentCode, language, currentLang);
  }

  // Build Socratic System Prompt
  const langName = currentLang === 'uz' ? 'Uzbek (O\'zbek tili)' : currentLang === 'ru' ? 'Russian (Русский)' : 'English';

  const systemPrompt = `You are CodeDuel AI Copilot & Algorithmic Coding Mentor.
Your role: Tutor the user to solve algorithmic coding challenges independently.
Target Language for response: ${langName}.

CURRENT CHALLENGE CONTEXT:
- Title: "${challenge?.title || 'Coding Problem'}"
- Difficulty: ${challenge?.difficulty || 8} kyu
- Category: ${challenge?.category || 'Algorithm'}
- Description: ${challenge?.description || 'No description'}
- Programming Language: ${language || 'javascript'}

USER'S CURRENT CODE:
\`\`\`${language}
${currentCode || '// No code written yet'}
\`\`\`

CORE TUTORING RULES:
1. NEVER give away the direct complete copy-paste solution immediately.
2. Use Socratic questioning, explain concepts, highlight edge cases, analyze Big-O complexity, and point out syntax or logic bugs.
3. If providing code examples, show pseudocode or minimal illustrative snippets (\`\`\`${language} ... \`\`\`), not the full working solution.
4. Format all responses with clean GitHub Markdown, emojis, and clear section bullet points.
5. If the user asks for a specific hint (Level 1/2/3), follow the progressive hints method (Concept -> Logic -> Skeleton).`;

  try {
    const user = loadUser();
    const limit = getDailyAILimit(user);

    if (!limit.canAsk && !limit.isPro) {
      if (currentLang === 'uz') {
        return `⚠️ **Kunlik Bepul AI So'rovlar Limiti Tugadi (5/5)**\n\nSiz bugungi bepul AI so'rovlar profilingizdan to'liq foydalandingiz.\n\n👑 **Cheksiz Mistral AI Codestral** dan foydalanish, Deep Code Review va FAANG masalalari uchun **CodeDuel PRO** a'zoligini faollashtiring yoki Kiber Do'kondan AI Blueprint tokenlarini oling!`;
      } else if (currentLang === 'ru') {
        return `⚠️ **Дневной лимит бесплатных запросов исчерпан (5/5)**\n\nАктивируйте **CodeDuel PRO** для безлимитного доступа к Mistral AI Codestral и подробному ревью кода!`;
      } else {
        return `⚠️ **Daily Free AI Requests Limit Reached (5/5)**\n\nUpgrade to **CodeDuel PRO** for unlimited Mistral AI Codestral tutoring, Deep Code Review, and FAANG tracks!`;
      }
    }

    let resultText = '';
    if (providerId === 'groq') {
      resultText = await callGroqAPI(prompt, systemPrompt, model, apiKey);
    } else if (providerId === 'mistral') {
      resultText = await callMistralAPI(prompt, systemPrompt, model, apiKey);
    } else if (providerId === 'huggingface') {
      resultText = await callHuggingFaceAPI(prompt, systemPrompt, model, apiKey);
    } else if (providerId === 'openrouter') {
      resultText = await callOpenRouterAPI(prompt, systemPrompt, model, apiKey);
    } else if (providerId === 'gemini') {
      resultText = await callGeminiAPI(prompt, systemPrompt, model, apiKey);
    }

    recordAIRequest(user);
    return resultText;
  } catch (err) {
    console.warn(`[AI Mentor] Provider ${providerId} failed, falling back to Smart Offline AI:`, err);
    // Automatic graceful fallback to smart heuristic
    const fallbackNotice = currentLang === 'uz'
      ? `*(⚠️ ${providerId.toUpperCase()} API da xatolik yuz berdi (${err.message}). CodeDuel Smart Offline AI orqali javob berildi)*\n\n`
      : currentLang === 'ru'
      ? `*(⚠️ Ошибка ${providerId.toUpperCase()} API (${err.message}). Использован CodeDuel Offline AI)*\n\n`
      : `*(⚠️ ${providerId.toUpperCase()} API error (${err.message}). Fallback to CodeDuel Offline AI)*\n\n`;

    const localRes = handleOfflineResponse(actionType, prompt, challenge, currentCode, language, currentLang);
    return fallbackNotice + localRes;
  }
}

function handleOfflineResponse(actionType, prompt, challenge, currentCode, language, currentLang) {
  if (actionType === 'hint_1') {
    return getAIHint(challenge, currentCode, 1);
  }
  if (actionType === 'hint_2') {
    return getAIHint(challenge, currentCode, 2);
  }
  if (actionType === 'hint_3') {
    return getAIHint(challenge, currentCode, 3);
  }
  if (actionType === 'review' || actionType === 'review_big_o') {
    const rev = reviewCode(challenge, currentCode, language);
    if (currentLang === 'uz') {
      return `🔍 **Kod Tahlili & Big-O Murakkabligi**\n\n📊 **Ko'rsatkichlar**:\n- **Vaqt murakkabligi (Time)**: \`${rev.timeComplexity}\`\n- **Xotira sarfi (Space)**: \`${rev.spaceComplexity}\`\n- **Kod Sifati Balli**: **${rev.score} / 100**\n\n💬 **Tahlil & Tavsiyalar**:\n${rev.feedback}`;
    }
    if (currentLang === 'ru') {
      return `🔍 **Ревью Кода & Анализ Big-O**\n\n📊 **Метрики**:\n- **Временная сложность**: \`${rev.timeComplexity}\`\n- **Память**: \`${rev.spaceComplexity}\`\n- **Оценка качества**: **${rev.score} / 100**\n\n💬 **Рекомендации**:\n${rev.feedback}`;
    }
    return `🔍 **Code Review & Big-O Complexity**\n\n📊 **Metrics**:\n- **Time Complexity**: \`${rev.timeComplexity}\`\n- **Space Complexity**: \`${rev.spaceComplexity}\`\n- **Quality Score**: **${rev.score} / 100**\n\n💬 **Feedback & Tips**:\n${rev.feedback}`;
  }

  if (actionType === 'explain') {
    if (currentLang === 'uz') {
      return `❓ **Masala Tushuntirishi: ${challenge?.title}**\n\n${challenge?.description}\n\n💡 **Asosiy maqsad**: Kiruvchi parametrlarni to'g'ri qayta ishlab, kutilgan natijani qaytarish. Yechish uchun yuqoridagi **💡 1-Bosqich** maslahatidan boshlang!`;
    }
    return `❓ **Problem Breakdown: ${challenge?.title}**\n\n${challenge?.description}\n\n💡 **Core Goal**: Transform the input parameters to match the expected outputs. Start with **💡 Level 1** hint!`;
  }

  // General chat question in offline mode
  const rev = reviewCode(challenge, currentCode, language);
  const hint = getAIHint(challenge, currentCode, 2);

  if (currentLang === 'uz') {
    return `🤖 **CodeDuel AI Mentor (Smart Heuristic)**\n\n${hint}\n\n📊 **Hozirgi kodingiz tahlili**:\n- **Vaqt murakkabligi**: \`${rev.timeComplexity}\`\n- **Xotira sarfi**: \`${rev.spaceComplexity}\`\n- **Sifat**: **${rev.score}/100**\n\n💡 *Bepul Groq (Llama 3.3 70B), Mistral Codestral yoki OpenRouter bilan cheksiz muloqot qilish uchun yuqoridagi 🔑 tugmasi orqali API kalitingizni kiriting!*`;
  }
  return `🤖 **CodeDuel AI Mentor (Smart Heuristic)**\n\n${hint}\n\n📊 **Current Code Analysis**:\n- **Time**: \`${rev.timeComplexity}\`\n- **Space**: \`${rev.spaceComplexity}\`\n- **Score**: **${rev.score}/100**\n\n💡 *For full conversational AI, configure your free Groq, Mistral, or OpenRouter key via the 🔑 API button!*`;
}
