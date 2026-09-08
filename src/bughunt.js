// ============================================
// CodeDuel — Bug Hunt Arena (Kiber Detektiv / Bug Bounty)
// Real-world debugging challenge replacing random wheel
// ============================================

import { sound } from "./audio.js";
import { addXP, addGems, saveUser } from "./user.js";
import { launchConfetti } from "./gamification.js";
import { showToast } from "./ui.js";

const BUGHUNT_STORAGE_KEY = "codeduel_daily_bughunt";

export const BUG_CASES = [
  {
    id: "bug_sum_even",
    title: "Juft Sonlar Yig'indisi Buzilgan",
    difficulty: "8 kyu",
    category: "Math & Logic",
    bountyXP: 80,
    bountyGems: 25,
    scenario: "Server hisob-kitob modulida xatolik yuz berdi! Funksiya faqat juft sonlarni qo'shishi kerak edi, lekin xato tufayli toq sonlar ham qo'shilib ketmoqda.",
    buggyCode: `function sumEvenNumbers(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    // BUG: Toq sonlarni tekshirishda xatolik!
    if (numbers[i] % 2 !== 0) {
      sum += numbers[i];
    }
  }
  return sum;
}`,
    tests: [
      { input: "sumEvenNumbers([1, 2, 3, 4, 6])", expected: 12, label: "2 + 4 + 6 = 12" },
      { input: "sumEvenNumbers([1, 3, 5])", expected: 0, label: "Faqat toq sonlar: 0" },
      { input: "sumEvenNumbers([10, 20, 30])", expected: 60, label: "Barchasi juft: 60" }
    ]
  },
  {
    id: "bug_palindrome",
    title: "Palindrom Detektori Qotib Qolmoqda",
    difficulty: "7 kyu",
    category: "Strings",
    bountyXP: 100,
    bountyGems: 30,
    scenario: "Foydalanuvchi qidiruv tizimida katta-kichik harflar va teskari o'qilish tekshiruvida mantiqiy xato bor.",
    buggyCode: `function isPalindrome(str) {
  // BUG: Katta-kichik harflar inobatga olinmagan va teskari solishtirish xato
  const clean = str;
  const reversed = clean.split("").reverse().join("");
  return clean === reversed;
}`,
    tests: [
      { input: "isPalindrome(\"Madam\")", expected: true, label: "Madam -> true" },
      { input: "isPalindrome(\"hello\")", expected: false, label: "hello -> false" },
      { input: "isPalindrome(\"Racecar\")", expected: true, label: "Racecar -> true" }
    ]
  },
  {
    id: "bug_find_max",
    title: "Manfiy Sonlarda Maksimum Xatosi",
    difficulty: "7 kyu",
    category: "Arrays",
    bountyXP: 90,
    bountyGems: 25,
    scenario: "Bank hisob-kitoblarida barcha tranzaksiyalar manfiy bo'lganda tizim 0 qaytarib xato bermoqda.",
    buggyCode: `function findMaximum(arr) {
  // BUG: Boshlang'ich qiymat 0 qilib olingan! Manfiy sonlarda xato beradi
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    tests: [
      { input: "findMaximum([-5, -10, -2, -8])", expected: -2, label: "[-5, -10, -2, -8] -> -2" },
      { input: "findMaximum([1, 9, 3])", expected: 9, label: "[1, 9, 3] -> 9" }
    ]
  },
  {
    id: "bug_average",
    title: "O'rtacha Qiymat Hisoblashda 0 ga Bo'linish",
    difficulty: "8 kyu",
    category: "Math",
    bountyXP: 80,
    bountyGems: 20,
    scenario: "Bo'sh massiv kelganda funksiya NaN qaytarmoqda, aslida 0 qaytarishi lozim.",
    buggyCode: `function findAverage(arr) {
  // BUG: Bo'sh massiv tekshirilmagan
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}`,
    tests: [
      { input: "findAverage([])", expected: 0, label: "Bo'sh massiv: 0" },
      { input: "findAverage([2, 4, 6])", expected: 4, label: "O'rtacha: 4" }
    ]
  },
  {
    id: "bug_capitalize_words",
    title: "So'z Bosh Harflari Birlashtirish Xatosi",
    difficulty: "6 kyu",
    category: "Strings",
    bountyXP: 120,
    bountyGems: 35,
    scenario: "Har bir so'zning birinchi harfini katta qilishda probellar yo'qolib ketmoqda.",
    buggyCode: `function capitalizeWords(sentence) {
  // BUG: Birlashtirishda bo'sh joy (space) qolib ketgan
  const words = sentence.split(" ");
  const res = [];
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    res.push(w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  }
  return res.join("");
}`,
    tests: [
      { input: "capitalizeWords(\"salom dunyo dasturchi\")", expected: "Salom Dunyo Dasturchi", label: "Har bir so'z bosh harf bilan" },
      { input: "capitalizeWords(\"code duel\")", expected: "Code Duel", label: "Code Duel" }
    ]
  }
];

export function getDailyBugCase() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const index = dayOfYear % BUG_CASES.length;
  return BUG_CASES[index];
}

export function getBugHuntState() {
  const today = new Date().toISOString().split("T")[0];
  try {
    const raw = localStorage.getItem(BUGHUNT_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      const isSolvedToday = data.lastSolvedDate === today;
      return {
        isSolvedToday,
        lastSolvedDate: data.lastSolvedDate,
        totalBugsFixed: data.totalBugsFixed || 0
      };
    }
  } catch (e) {}

  return {
    isSolvedToday: false,
    lastSolvedDate: null,
    totalBugsFixed: 0
  };
}

export function recordBugFixed(user, bugCase) {
  const today = new Date().toISOString().split("T")[0];
  const state = getBugHuntState();
  const updated = {
    lastSolvedDate: today,
    totalBugsFixed: state.totalBugsFixed + 1,
    lastBugId: bugCase.id
  };
  localStorage.setItem(BUGHUNT_STORAGE_KEY, JSON.stringify(updated));

  addXP(user, bugCase.bountyXP || 100);
  addGems(user, bugCase.bountyGems || 25);
  saveUser(user);

  sound.playVictory();
  launchConfetti();
}

export function executeBugTest(code, bugCase) {
  const results = [];
  let allPassed = true;

  for (const t of bugCase.tests) {
    try {
      const fn = new Function("console", `${code}; return ${t.input};`);
      const actual = fn({ log: () => {} });
      const passed = JSON.stringify(actual) === JSON.stringify(t.expected);
      if (!passed) allPassed = false;
      results.push({
        label: t.label,
        input: t.input,
        expected: t.expected,
        actual: actual,
        passed: passed
      });
    } catch (err) {
      allPassed = false;
      results.push({
        label: t.label,
        input: t.input,
        expected: t.expected,
        actual: "Error: " + err.message,
        passed: false
      });
    }
  }

  return { allPassed, results };
}
