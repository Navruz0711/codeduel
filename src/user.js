// ============================================
// User Management — LocalStorage based
// ============================================

const USER_STORAGE_KEY = 'codeduel_user';
const USER_BACKUP_KEY = 'codeduel_user_backup';
const SOLUTIONS_STORAGE_KEY = 'codeduel_solutions';
const SOLUTIONS_BACKUP_KEY = 'codeduel_solutions_backup';

export const AVATARS = [
  '🥷', '🧙', '🦊', '⚔️', '🔥', '🧙‍♂️', '🐛', '📚', 
  '🌐', '💎', '⚡', '🚀', '🤖', '🐲', '🎯', '🛸'
];

export const TITLES = [
  'Code Initiate', 'Byte Apprentice', 'Binary Ninja', 'Syntax Samurai',
  'Algo Mage', 'Cyber Warrior', 'Kernel Veteran', 'Quantum Grandmaster'
];

const RANKS = [
  { kyu: 8, title: 'Beginner', xpRequired: 0, color: 'kyu-8' },
  { kyu: 7, title: 'Apprentice', xpRequired: 100, color: 'kyu-7' },
  { kyu: 6, title: 'Warrior', xpRequired: 250, color: 'kyu-6' },
  { kyu: 5, title: 'Fighter', xpRequired: 500, color: 'kyu-5' },
  { kyu: 4, title: 'Veteran', xpRequired: 900, color: 'kyu-4' },
  { kyu: 3, title: 'Elite', xpRequired: 1400, color: 'kyu-3' },
  { kyu: 2, title: 'Master', xpRequired: 2000, color: 'kyu-2' },
  { kyu: 1, title: 'Grandmaster', xpRequired: 3000, color: 'kyu-1' },
];

function getDefaultUser() {
  return {
    name: 'CodeWarrior',
    avatar: '🥷',
    title: 'Code Initiate',
    xp: 0,
    streak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    totalAttempts: 0,
    totalSolved: 0,
    duelWins: 0,
    duelLosses: 0,
    fastestSolveSeconds: null,
    solvedChallenges: [],
    activityLog: {},
    badges: [],
    completedLessons: [],
    completedCourses: [],
    courseProgress: {},
    isPro: false,
    proExpiresAt: null,
    proPlan: null,
    gems: 150,
    streakShields: 1,
    bonusAITokens: 3,
    purchasedItems: [],
    aiDailyUsage: { date: '', count: 0 },
    createdAt: new Date().toISOString(),
  };
}

export function loadUser() {
  try {
    if (typeof localStorage !== 'undefined') {
      let raw = localStorage.getItem(USER_STORAGE_KEY);
      if (!raw) {
        raw = localStorage.getItem(USER_BACKUP_KEY);
      }
      if (raw) {
        const parsed = JSON.parse(raw);
        const user = { ...getDefaultUser(), ...parsed };
        if (user.gems === undefined) user.gems = 150;
        if (!user.completedLessons) user.completedLessons = [];
        if (!user.completedCourses) user.completedCourses = [];
        if (!user.solvedChallenges) user.solvedChallenges = [];
        if (!user.courseProgress) user.courseProgress = {};
        updateStreak(user);
        saveUser(user);
        return user;
      }
    }
  } catch (e) {
    console.error('Error loading user:', e);
    try {
      const backupRaw = localStorage.getItem(USER_BACKUP_KEY);
      if (backupRaw) {
        const backupUser = { ...getDefaultUser(), ...JSON.parse(backupRaw) };
        return backupUser;
      }
    } catch (e2) {}
    // DO NOT overwrite existing corrupted localStorage key!
    return getDefaultUser();
  }
  const user = getDefaultUser();
  saveUser(user);
  return user;
}

export function saveUser(user) {
  try {
    if (typeof localStorage !== 'undefined' && user) {
      const json = JSON.stringify(user);
      localStorage.setItem(USER_STORAGE_KEY, json);
      localStorage.setItem(USER_BACKUP_KEY, json);
    }
  } catch (e) {
    console.error('Error saving user:', e);
  }
}

/**
 * Export all progress, challenges, lessons, and solutions into portable JSON
 */
export function exportAllUserData() {
  const exportData = {
    version: '2.0',
    exportedAt: new Date().toISOString(),
    user: loadUser(),
    solutions: {},
    lessonsCode: {}
  };

  try {
    if (typeof localStorage !== 'undefined') {
      exportData.solutions = JSON.parse(localStorage.getItem(SOLUTIONS_STORAGE_KEY) || '{}');

      // Export all lesson code entries
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('lesson_code_')) {
          exportData.lessonsCode[key] = localStorage.getItem(key);
        }
      }
    }
  } catch (e) {
    console.error('Error gathering backup data:', e);
  }

  return exportData;
}

/**
 * Import all progress, challenges, lessons, and solutions from JSON
 */
export function importAllUserData(jsonInput) {
  try {
    const data = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;
    if (!data || !data.user) {
      throw new Error("Noto'g'ri zaxira fayl formati (user topilmadi)");
    }

    if (typeof localStorage !== 'undefined') {
      // 1. Restore user
      const mergedUser = { ...getDefaultUser(), ...data.user };
      saveUser(mergedUser);

      // 2. Restore solutions
      if (data.solutions) {
        const existingSolutions = JSON.parse(localStorage.getItem(SOLUTIONS_STORAGE_KEY) || '{}');
        const mergedSolutions = { ...existingSolutions, ...data.solutions };
        localStorage.setItem(SOLUTIONS_STORAGE_KEY, JSON.stringify(mergedSolutions));
        localStorage.setItem(SOLUTIONS_BACKUP_KEY, JSON.stringify(mergedSolutions));
      }

      // 3. Restore lesson code
      if (data.lessonsCode) {
        Object.entries(data.lessonsCode).forEach(([k, val]) => {
          if (val !== undefined && val !== null) {
            localStorage.setItem(k, String(val));
          }
        });
      }

      return { success: true, user: mergedUser };
    }
    return { success: false, error: 'localStorage mavjud emas' };
  } catch (err) {
    console.error('Import error:', err);
    return { success: false, error: err.message };
  }
}

export function addXP(user, amount) {
  const oldRank = getUserRank(user);
  const multiplier = user.isPro ? 2 : 1;
  const actualAmount = amount * multiplier;
  user.xp += actualAmount;
  const newRank = getUserRank(user);
  saveUser(user);
  const isRankedUp = oldRank.kyu > newRank.kyu;
  return { 
    oldRank, 
    newRank, 
    ranked: oldRank.kyu !== newRank.kyu, 
    rankedUp: isRankedUp, 
    gainedXP: actualAmount, 
    isBooster: user.isPro 
  };
}

export function addGems(user, amount) {
  user.gems = (user.gems || 0) + amount;
  saveUser(user);
  return user.gems;
}

export function getUserRank(user) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (user.xp >= r.xpRequired) {
      rank = r;
    }
  }
  return rank;
}

export function getNextRank(user) {
  const currentRank = getUserRank(user);
  const idx = RANKS.findIndex(r => r.kyu === currentRank.kyu);
  if (idx < RANKS.length - 1) {
    return RANKS[idx + 1];
  }
  return null;
}

export function getXPProgress(user) {
  const current = getUserRank(user);
  const next = getNextRank(user);
  if (!next) return { percent: 100, current: user.xp, needed: 0 };
  const progressXP = user.xp - current.xpRequired;
  const totalNeeded = next.xpRequired - current.xpRequired;
  const percent = Math.min(100, Math.round((progressXP / totalNeeded) * 100));
  return { percent, current: user.xp, needed: next.xpRequired - user.xp };
}

function updateStreak(user) {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (user.lastActiveDate === today) {
    return;
  } else if (user.lastActiveDate === yesterday) {
    return;
  } else if (user.lastActiveDate && user.lastActiveDate !== today) {
    if (user.streakShields && user.streakShields > 0) {
      user.streakShields -= 1;
      user.lastActiveDate = yesterday; // Protect streak
      saveUser(user);
    } else {
      user.streak = 0;
    }
  }
}

export function recordActivity(user) {
  const today = new Date().toISOString().split('T')[0];

  if (user.lastActiveDate !== today) {
    if (user.lastActiveDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
    user.lastActiveDate = today;
  }

  if (user.streak > user.bestStreak) {
    user.bestStreak = user.streak;
  }

  if (!user.activityLog) user.activityLog = {};
  user.activityLog[today] = (user.activityLog[today] || 0) + 1;

  saveUser(user);
}

export function markSolved(user, challengeId, elapsedSeconds = 0) {
  if (!user.solvedChallenges.includes(challengeId)) {
    user.solvedChallenges.push(challengeId);
    user.totalSolved += 1;
  }
  user.totalAttempts += 1;
  if (elapsedSeconds > 0) {
    if (!user.fastestSolveSeconds || elapsedSeconds < user.fastestSolveSeconds) {
      user.fastestSolveSeconds = elapsedSeconds;
    }
  }
  recordActivity(user);
  saveUser(user);
}

export function recordDuelResult(user, won = true) {
  if (won) {
    user.duelWins = (user.duelWins || 0) + 1;
  } else {
    user.duelLosses = (user.duelLosses || 0) + 1;
  }
  recordActivity(user);
  saveUser(user);
}

export function isSolved(user, challengeId) {
  return user.solvedChallenges.includes(challengeId);
}

export function saveSolution(challengeId, language, code) {
  try {
    if (typeof localStorage !== 'undefined') {
      const solutions = JSON.parse(localStorage.getItem(SOLUTIONS_STORAGE_KEY) || '{}');
      if (!solutions[challengeId]) solutions[challengeId] = {};
      solutions[challengeId][language] = {
        code,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(SOLUTIONS_STORAGE_KEY, JSON.stringify(solutions));
    }
  } catch (e) {
    console.error('Error saving solution:', e);
  }
}

export function getSolution(challengeId, language) {
  try {
    if (typeof localStorage !== 'undefined') {
      const solutions = JSON.parse(localStorage.getItem(SOLUTIONS_STORAGE_KEY) || '{}');
      return solutions[challengeId]?.[language]?.code || null;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export function calculateSkillRadar(user, allChallenges) {
  const categories = {
    arrays: 0,
    strings: 0,
    algorithms: 0,
    math: 0,
    logic: 0,
    structures: 0,
  };

  user.solvedChallenges.forEach(id => {
    const c = allChallenges.find(k => k.id === id);
    if (c) {
      const cat = (c.category || '').toLowerCase();
      if (cat.includes('array')) categories.arrays += 25;
      else if (cat.includes('string')) categories.strings += 25;
      else if (cat.includes('math')) categories.math += 25;
      else if (cat.includes('algo') || cat.includes('sort') || cat.includes('search')) categories.algorithms += 25;
      else if (cat.includes('list') || cat.includes('matrix') || cat.includes('tree')) categories.structures += 25;
      else categories.logic += 25;
    }
  });

  return {
    arrays: Math.min(100, 20 + categories.arrays),
    strings: Math.min(100, 20 + categories.strings),
    algorithms: Math.min(100, 15 + categories.algorithms),
    math: Math.min(100, 25 + categories.math),
    logic: Math.min(100, 20 + categories.logic),
    structures: Math.min(100, 15 + categories.structures),
  };
}

export { RANKS };
