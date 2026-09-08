// ============================================
// CodeDuel — Daily Mystery Loot Chest & Streak Shield
// Daily habit-building reward system with 24h reset
// ============================================

import { sound } from './audio.js';
import { addXP, saveUser } from './user.js';
import { launchConfetti } from './gamification.js';
import { getLanguage, t } from './i18n.js';

const LOOT_STORAGE_KEY = 'codeduel_daily_loot';

const LOOT_TITLES = [
  'Neon Phantom', 'Quantum Sorcerer', 'Binary Overlord', 'Cyber Samurai',
  'Code Archmage', 'Matrix Whisperer', 'Void Hacker', 'Apex Engineer'
];

export function getLootState() {
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  try {
    const raw = localStorage.getItem(LOOT_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      const diff = now - data.lastClaimed;
      const canClaim = diff >= twentyFourHours;
      const timeLeftMs = Math.max(0, twentyFourHours - diff);

      return {
        canClaim,
        lastClaimed: data.lastClaimed,
        totalClaimed: data.totalClaimed || 0,
        timeLeftMs,
      };
    }
  } catch (e) {}

  return {
    canClaim: true,
    lastClaimed: 0,
    totalClaimed: 0,
    timeLeftMs: 0,
  };
}

export function openDailyLootChest(user) {
  const state = getLootState();
  if (!state.canClaim) {
    return { success: false, reason: 'cooldown', timeLeftMs: state.timeLeftMs };
  }

  // Roll random reward tier
  const rand = Math.random();
  let reward = {};

  if (rand > 0.90) {
    // Legendary: +250 XP + Rare Title
    const title = LOOT_TITLES[Math.floor(Math.random() * LOOT_TITLES.length)];
    user.title = title;
    reward = {
      tier: 'legendary',
      title: '👑 LEGENDARY CHEST!',
      xp: 250,
      item: `🏅 Maxsus Unvon: "${title}"`,
      icon: '👑',
    };
  } else if (rand > 0.70) {
    // Epic: +150 XP + Streak Shield
    user.streakShields = (user.streakShields || 0) + 1;
    reward = {
      tier: 'epic',
      title: '🌟 EPIC CHEST!',
      xp: 150,
      item: '🛡️ 1x Streak Shield (Streakni himoya qalqoni)',
      icon: '🛡️',
    };
  } else if (rand > 0.40) {
    // Rare: +90 XP
    reward = {
      tier: 'rare',
      title: '✨ RARE CHEST!',
      xp: 90,
      item: '+90 XP Bonus',
      icon: '✨',
    };
  } else {
    // Common: +45 XP
    reward = {
      tier: 'common',
      title: '🎁 DAILY CHEST',
      xp: 45,
      item: '+45 XP Bonus',
      icon: '🎁',
    };
  }

  // Apply XP
  addXP(user, reward.xp);
  saveUser(user);

  // Save claim timestamp
  try {
    localStorage.setItem(LOOT_STORAGE_KEY, JSON.stringify({
      lastClaimed: Date.now(),
      totalClaimed: state.totalClaimed + 1,
    }));
  } catch (e) {}

  sound.playRankUp();
  launchConfetti();

  return { success: true, reward };
}

export function formatTimeLeft(ms) {
  const totalSecs = Math.floor(ms / 1000);
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
