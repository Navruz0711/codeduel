// ============================================
// CodeDuel — Weekly Season Leagues & Division Ladders
// Tiered competitive league system with promotion zones
// ============================================

import { getLanguage, t } from './i18n.js';

export const LEAGUES = [
  { id: 'bronze', name: 'Bronze League', icon: '🥉', color: '#cd7f32', minXp: 0, maxXp: 150 },
  { id: 'silver', name: 'Silver League', icon: '🥈', color: '#94a3b8', minXp: 150, maxXp: 400 },
  { id: 'gold', name: 'Gold League', icon: '🥇', color: '#f59e0b', minXp: 400, maxXp: 800 },
  { id: 'platinum', name: 'Platinum League', icon: '💎', color: '#22d3ee', minXp: 800, maxXp: 1400 },
  { id: 'diamond', name: 'Diamond League', icon: '💠', color: '#a855f7', minXp: 1400, maxXp: 2200 },
  { id: 'grandmaster', name: 'Grandmaster League', icon: '👑', color: '#ec4899', minXp: 2200, maxXp: Infinity },
];

export function getUserLeague(userXp = 0) {
  for (let i = LEAGUES.length - 1; i >= 0; i--) {
    if (userXp >= LEAGUES[i].minXp) {
      return LEAGUES[i];
    }
  }
  return LEAGUES[0];
}

export function getLeagueSeasonTimeLeft() {
  const now = new Date();
  const day = now.getUTCDay(); // 0 is Sunday
  const daysUntilSunday = (7 - day) % 7 || 7;

  const nextSunday = new Date(now);
  nextSunday.setUTCDate(now.getUTCDate() + daysUntilSunday);
  nextSunday.setUTCHours(23, 59, 59, 999);

  const diffMs = Math.max(0, nextSunday.getTime() - now.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${mins}m`;
}

export function getDivisionLadder(currentLeague, user) {
  const botsInDivision = [
    { name: 'CyberSamuraiUz', avatar: '🥷', xp: Math.round(currentLeague.minXp * 0.9 + 120), solved: 14, isBot: true },
    { name: 'AlgoWizard_01', avatar: '🧙', xp: Math.round(currentLeague.minXp * 0.8 + 95), solved: 11, isBot: true },
    { name: 'ByteStriker', avatar: '⚡', xp: Math.round(currentLeague.minXp * 0.7 + 70), solved: 8, isBot: true },
    { name: 'Rustacean_Pro', avatar: '🦀', xp: Math.round(currentLeague.minXp * 0.6 + 50), solved: 6, isBot: true },
    { name: 'PixelNinja', avatar: '🦊', xp: Math.round(currentLeague.minXp * 0.5 + 35), solved: 4, isBot: true },
  ];

  const userEntry = {
    name: `${user.name} (${t('duel_player_you')})`,
    avatar: user.avatar || '🥷',
    xp: user.xp,
    solved: user.totalSolved,
    isCurrentUser: true,
  };

  const allEntries = [...botsInDivision, userEntry].sort((a, b) => b.xp - a.xp);
  return allEntries;
}
