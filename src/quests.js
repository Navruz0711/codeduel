// ============================================
// CodeDuel — Daily Quests & Mission Engine
// Refreshes every 24 hours with fresh bonus XP goals
// ============================================

import { getLanguage, t } from './i18n.js';
import { sound } from './audio.js';
import { addXP, saveUser } from './user.js';
import { showToast } from './ui.js';

const STORAGE_KEY = 'codeduel_quests';

const QUEST_TEMPLATES = [
  {
    id: 'solve-1',
    title: {
      uz: 'Birinchi G\'alaba: 1 ta masala yeching',
      en: 'First Victory: Solve 1 challenge',
      ru: 'Первая победа: Решите 1 задачу',
    },
    target: 1,
    type: 'solve_count',
    xpReward: 30,
    icon: '⚡',
  },
  {
    id: 'solve-3',
    title: {
      uz: 'Kodlash Marafon: 3 ta masala yeching',
      en: 'Coding Marathon: Solve 3 challenges',
      ru: 'Марафон: Решите 3 задачи',
    },
    target: 3,
    type: 'solve_count',
    xpReward: 75,
    icon: '🔥',
  },
  {
    id: 'win-duel',
    title: {
      uz: 'Duel Qahramoni: AI Bot ustidan g\'alaba qozoning',
      en: 'Duel Hero: Defeat an AI Bot in Duel Arena',
      ru: 'Герой Дуэли: Победите AI Бота на Арене',
    },
    target: 1,
    type: 'win_duel',
    xpReward: 50,
    icon: '⚔️',
  },
  {
    id: 'speed-solve',
    title: {
      uz: 'Tezkor Fikr: Masalani 2 daqiqadan kam vaqtda yeching',
      en: 'Speedrun: Solve a challenge under 2 minutes',
      ru: 'Спидран: Решите задачу быстрее 2 минут',
    },
    target: 1,
    type: 'speed_solve',
    xpReward: 40,
    icon: '⏱️',
  },
  {
    id: 'hard-kata',
    title: {
      uz: 'Jasur Jangchi: 6-kyu yoki undan yuqori masala yeching',
      en: 'Brave Warrior: Solve a 6-kyu or higher challenge',
      ru: 'Отважный воин: Решите задачу 6-кю или выше',
    },
    target: 1,
    type: 'hard_kata',
    xpReward: 60,
    icon: '🛡️',
  }
];

export function getDailyQuests() {
  const today = new Date().toISOString().split('T')[0];
  let data = null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      data = JSON.parse(raw);
    }
  } catch (e) {}

  if (!data || data.date !== today) {
    // Generate new 3 quests for today
    const shuffled = [...QUEST_TEMPLATES].sort(() => 0.5 - Math.random()).slice(0, 3);
    data = {
      date: today,
      quests: shuffled.map(q => ({
        ...q,
        current: 0,
        completed: false,
        claimed: false,
      }))
    };
    saveQuests(data);
  }

  return data.quests;
}

export function saveQuests(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

export function recordQuestProgress(eventType, value = 1, user = null) {
  const today = new Date().toISOString().split('T')[0];
  const quests = getDailyQuests();
  let updated = false;

  const normalizedType = 
    (eventType === 'solve_any' || eventType === 'solve') ? 'solve_count' :
    (eventType === 'speedrun') ? 'speed_solve' :
    eventType;

  quests.forEach(q => {
    if (q.claimed) return;

    if (q.type === normalizedType || q.type === eventType) {
      q.current = Math.min(q.target, q.current + value);
      if (q.current >= q.target && !q.completed) {
        q.completed = true;
        sound.playBadge();
        const lang = getLanguage();
        const titleStr = typeof q.title === 'object' ? (q.title[lang] || q.title.uz || q.title.en) : q.title;
        showToast(`🎯 Topshiriq bajarildi: ${titleStr}!`, 'success');
      }
      updated = true;
    }
  });

  if (updated) {
    saveQuests({ date: today, quests });
  }
}

export function claimQuest(questId, user) {
  const today = new Date().toISOString().split('T')[0];
  const quests = getDailyQuests();
  const quest = quests.find(q => q.id === questId);

  if (quest && quest.completed && !quest.claimed) {
    quest.claimed = true;
    saveQuests({ date: today, quests });

    addXP(user, quest.xpReward);
    sound.playVictory();
    saveUser(user);
    return { success: true, xpReward: quest.xpReward, quest };
  }
  return { success: false, message: 'Topshiriq hali bajarilmagan yoki allaqachon olingan' };
}
