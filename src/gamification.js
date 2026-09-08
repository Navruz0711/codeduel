// ============================================
// Gamification — Badges, Confetti, Celebrations, Combos
// ============================================

import { sound } from './audio.js';
import { getLanguage } from './i18n.js';

const BADGES = [
  {
    id: 'first-blood',
    name: { uz: 'Birinchi G\'alaba', en: 'First Blood', ru: 'Первая Кровь' },
    icon: '🗡️',
    description: { uz: 'Birinchi masalani yeching', en: 'Solve your first challenge', ru: 'Решите первую задачу' },
    condition: (user) => user.totalSolved >= 1,
  },
  {
    id: 'five-down',
    name: { uz: 'Beshlik', en: 'High Five', ru: 'Дай Пять' },
    icon: '✋',
    description: { uz: '5 ta masala yeching', en: 'Solve 5 challenges', ru: 'Решите 5 задач' },
    condition: (user) => user.totalSolved >= 5,
  },
  {
    id: 'ten-warrior',
    name: { uz: 'O\'nlik Jangchi', en: 'Ten Warrior', ru: 'Воин Десяти' },
    icon: '⚔️',
    description: { uz: '10 ta masala yeching', en: 'Solve 10 challenges', ru: 'Решите 10 задач' },
    condition: (user) => user.totalSolved >= 10,
  },
  {
    id: 'twenty-grand',
    name: { uz: 'Katta Usta', en: 'Grandmaster', ru: 'Грандмастер' },
    icon: '👑',
    description: { uz: 'Barcha 20 ta masalani yeching', en: 'Solve all 20 challenges', ru: 'Решите все 20 задач' },
    condition: (user) => user.totalSolved >= 20,
  },
  {
    id: 'duel-victor',
    name: { uz: 'Duel G\'olibi', en: 'Duel Victor', ru: 'Победитель Дуэли' },
    icon: '🤖',
    description: { uz: 'AI Bot bilan duelda yuting', en: 'Win a duel against an AI bot', ru: 'Победите в дуэли против бота' },
    condition: (user) => (user.duelWins || 0) >= 1,
  },
  {
    id: 'duel-master',
    name: { uz: 'Duel Chempioni', en: 'Arena Champion', ru: 'Чемпион Арены' },
    icon: '🏆',
    description: { uz: '5 ta duelda g\'alaba qozoning', en: 'Win 5 AI duels', ru: 'Выиграйте 5 дуэлей' },
    condition: (user) => (user.duelWins || 0) >= 5,
  },
  {
    id: 'speed-demon',
    name: { uz: 'Chaqmoq Tezlik', en: 'Speed Demon', ru: 'Демон Скорости' },
    icon: '⚡',
    description: { uz: 'Masalani 60 soniyadan kam vaqtda yeching', en: 'Solve a challenge under 60 seconds', ru: 'Решите задачу быстрее 60 секунд' },
    condition: (user) => user.fastestSolveSeconds && user.fastestSolveSeconds <= 60,
  },
  {
    id: 'streak-3',
    name: { uz: 'Olovli Ketma-ketlik', en: 'On Fire', ru: 'В Огне' },
    icon: '🔥',
    description: { uz: '3 kunlik uzluksiz streak', en: '3-day streak', ru: '3 дня подряд' },
    condition: (user) => user.bestStreak >= 3,
  },
  {
    id: 'streak-7',
    name: { uz: 'To\'xtatib Bo\'lmas', en: 'Unstoppable', ru: 'Неудержимый' },
    icon: '💫',
    description: { uz: '7 kunlik uzluksiz streak', en: '7-day streak', ru: '7 дней подряд' },
    condition: (user) => user.bestStreak >= 7,
  },
  {
    id: 'rank-7',
    name: { uz: 'Shogird (7 kyu)', en: 'Apprentice (7 kyu)', ru: 'Ученик (7 кю)' },
    icon: '🎓',
    description: { uz: '7 kyu darajasiga yeting', en: 'Reach 7 kyu', ru: 'Достигните 7 кю' },
    condition: (user) => user.xp >= 100,
  },
  {
    id: 'rank-6',
    name: { uz: 'Jangchi (6 kyu)', en: 'Warrior (6 kyu)', ru: 'Воин (6 кю)' },
    icon: '🛡️',
    description: { uz: '6 kyu darajasiga yeting', en: 'Reach 6 kyu', ru: 'Достигните 6 кю' },
    condition: (user) => user.xp >= 250,
  },
  {
    id: 'rank-4',
    name: { uz: 'Faxriy (4 kyu)', en: 'Veteran (4 kyu)', ru: 'Ветеран (4 кю)' },
    icon: '🏅',
    description: { uz: '4 kyu darajasiga yeting', en: 'Reach 4 kyu', ru: 'Достигните 4 кю' },
    condition: (user) => user.xp >= 900,
  },
  {
    id: 'xp-1000',
    name: { uz: 'Afsonaviy (1000 XP)', en: 'Legendary (1000 XP)', ru: 'Легендарный (1000 XP)' },
    icon: '🌟',
    description: { uz: '1000 XP yig\'ing', en: 'Earn 1000 total XP', ru: 'Наберите 1000 XP' },
    condition: (user) => user.xp >= 1000,
  },
];

export function checkBadges(user) {
  const newBadges = [];
  const lang = getLanguage();

  for (const badge of BADGES) {
    if (badge.condition(user) && !user.badges.includes(badge.id)) {
      user.badges.push(badge.id);
      newBadges.push({
        id: badge.id,
        name: badge.name[lang] || badge.name.uz,
        icon: badge.icon,
        description: badge.description[lang] || badge.description.uz,
      });
      sound.playBadge();
    }
  }
  return newBadges;
}

export function getAllBadges() {
  const lang = getLanguage();
  return BADGES.map(b => ({
    id: b.id,
    name: b.name[lang] || b.name.uz || b.name.en,
    icon: b.icon,
    description: b.description[lang] || b.description.uz || b.description.en,
  }));
}

export function getBadge(id) {
  const lang = getLanguage();
  const b = BADGES.find(badge => badge.id === id);
  if (!b) return null;
  return {
    id: b.id,
    name: b.name[lang] || b.name.uz || b.name.en,
    icon: b.icon,
    description: b.description[lang] || b.description.uz || b.description.en,
  };
}

// ---- Confetti Effect ----
export function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#00ff88', '#7c3aed', '#f59e0b', '#22d3ee', '#ef4444', '#ec4899', '#ffffff', '#38bdf8'];

  for (let i = 0; i < 160; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 300,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 24,
      vy: Math.random() * -22 - 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 9 + 4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.35,
      life: 1,
      decay: 0.009 + Math.random() * 0.01,
    });
  }

  let animId;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive = true;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.life -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    }

    if (alive) {
      animId = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animId);
    }
  }

  animate();
}

// ---- Leaderboard Data (Demo) ----
export function getLeaderboardData() {
  return {
    weekly: [
      { name: 'SamuraiCoderUz', avatar: '🥷', rank: '3 kyu', xp: 480, solved: 16 },
      { name: 'QuantumDev', avatar: '🧙', rank: '4 kyu', xp: 390, solved: 13 },
      { name: 'CyberPhoenix', avatar: '🔥', rank: '5 kyu', xp: 310, solved: 10 },
      { name: 'ByteMaster', avatar: '🦊', rank: '5 kyu', xp: 260, solved: 9 },
      { name: 'AlgoNinja', avatar: '⚔️', rank: '6 kyu', xp: 210, solved: 8 },
      { name: 'PixelSorcerer', avatar: '🧙‍♂️', rank: '6 kyu', xp: 170, solved: 7 },
      { name: 'RustaceanUz', avatar: '🦀', rank: '6 kyu', xp: 140, solved: 6 },
      { name: 'BugHunter', avatar: '🐛', rank: '7 kyu', xp: 110, solved: 5 },
      { name: 'CodeNomad', avatar: '🌐', rank: '7 kyu', xp: 85, solved: 3 },
      { name: 'BitStriker', avatar: '💎', rank: '8 kyu', xp: 50, solved: 2 },
    ],
    alltime: [
      { name: 'SamuraiCoderUz', avatar: '🥷', rank: '1 dan', xp: 3850, solved: 120 },
      { name: 'QuantumDev', avatar: '🧙', rank: '1 kyu', xp: 3200, solved: 98 },
      { name: 'CyberPhoenix', avatar: '🔥', rank: '2 kyu', xp: 2650, solved: 84 },
      { name: 'ByteMaster', avatar: '🦊', rank: '3 kyu', xp: 1980, solved: 68 },
      { name: 'AlgoNinja', avatar: '⚔️', rank: '3 kyu', xp: 1720, solved: 62 },
      { name: 'PixelSorcerer', avatar: '🧙‍♂️', rank: '4 kyu', xp: 1340, solved: 49 },
      { name: 'RustaceanUz', avatar: '🦀', rank: '4 kyu', xp: 1150, solved: 42 },
      { name: 'BugHunter', avatar: '🐛', rank: '5 kyu', xp: 780, solved: 30 },
      { name: 'CodeNomad', avatar: '🌐', rank: '6 kyu', xp: 450, solved: 18 },
      { name: 'BitStriker', avatar: '💎', rank: '7 kyu', xp: 290, solved: 12 },
    ],
  };
}
