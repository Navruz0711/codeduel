// ============================================
// CodeDuel — 1v1 Real-time AI Code Duel Arena
// Race against autonomous AI opponents in real time!
// ============================================

import { sound } from './audio.js';
import { getLanguage, t } from './i18n.js';
import { addXP, getUserRank } from './user.js';
import { launchConfetti } from './gamification.js';

export const AI_BOTS = [
  {
    id: 'buggy-bot',
    name: 'BuggyBot',
    avatar: '🤖',
    kyu: 8,
    title: 'Novice Bot',
    speedWpm: 45,
    solveTimeRange: [75, 120], // seconds
    color: '#94a3b8',
    taunts: {
      uz: ['Men hali o\'rganyapman... Lekin sizni yengaman!', 'Kutib turing, o\'ylayapman!'],
      en: ['I am still learning... but I might beat you!', 'Wait up, I am thinking!'],
      ru: ['Я еще учусь... Но я попробую победить вас!', 'Секунду, я вычисляю!'],
    }
  },
  {
    id: 'cyber-ninja',
    name: 'CyberNinja',
    avatar: '⚡',
    kyu: 6,
    title: 'Swift Coder',
    speedWpm: 75,
    solveTimeRange: [45, 75],
    color: '#eab308',
    taunts: {
      uz: ['Mening kodim chaqmoqday tez!', 'Orqada qolib ketmang!'],
      en: ['My code strikes like lightning!', 'Do not lag behind!'],
      ru: ['Мой код быстр как молния!', 'Не отставай!'],
    }
  },
  {
    id: 'algo-master',
    name: 'AlgoMaster',
    avatar: '🧙',
    kyu: 4,
    title: 'Algorithm Wizard',
    speedWpm: 105,
    solveTimeRange: [25, 45],
    color: '#ef4444',
    taunts: {
      uz: ['O(n) vaqtda yechyapman, shoshiling!', 'Bu masala men uchun oson!'],
      en: ['Solving in O(n) time, hurry up!', 'This kata is trivial for me!'],
      ru: ['Решаю за O(n), поспеши!', 'Эта задача слишком проста!'],
    }
  },
  {
    id: 'quantum-ai',
    name: 'QuantumAI',
    avatar: '👑',
    kyu: 2,
    title: 'Grandmaster Core',
    speedWpm: 140,
    solveTimeRange: [15, 30],
    color: '#ec4899',
    taunts: {
      uz: ['Kvant hisoblash boshlandi. Imkoningiz kam!', 'G\'alaba meniki!'],
      en: ['Quantum execution engaged. Resistance is futile!', 'Victory is mine!'],
      ru: ['Квантовые вычисления запущены. Шансов мало!', 'Победа предрешена!'],
    }
  }
];

class DuelManager {
  constructor() {
    this.activeDuel = null;
    this.timerInterval = null;
    this.botInterval = null;
    this.isBattling = false;
  }

  startDuel(botId, challenge, onTick, onFinish) {
    this.stopDuel();

    const bot = AI_BOTS.find(b => b.id === botId) || AI_BOTS[0];
    const duration = Math.floor(
      Math.random() * (bot.solveTimeRange[1] - bot.solveTimeRange[0]) + bot.solveTimeRange[0]
    );

    this.activeDuel = {
      bot,
      challenge,
      duration,
      startTime: Date.now(),
      botProgress: 0,
      playerProgress: 0,
      status: 'battling',
      onTick,
      onFinish,
    };

    this.isBattling = true;
    sound.playRun();

    // Bot progress loop
    const stepTime = 500;
    this.botInterval = setInterval(() => {
      if (!this.activeDuel || !this.isBattling) return;

      const elapsed = (Date.now() - this.activeDuel.startTime) / 1000;
      const progress = Math.min(100, Math.round((elapsed / this.activeDuel.duration) * 100));
      this.activeDuel.botProgress = progress;

      if (onTick) {
        onTick({
          elapsed: Math.round(elapsed),
          botProgress: progress,
          bot: this.activeDuel.bot,
        });
      }

      if (progress >= 100) {
        this.finishDuel('bot');
      }
    }, stepTime);
  }

  updatePlayerProgress(percent) {
    if (!this.activeDuel) return;
    const bounded = Math.max(0, Math.min(100, Math.round(percent)));
    this.activeDuel.playerProgress = bounded;
    const bar = document.getElementById('player-duel-progress');
    if (bar) {
      bar.style.width = `${bounded}%`;
    }
  }

  playerSolved() {
    if (!this.isBattling || !this.activeDuel) return;
    this.updatePlayerProgress(100);
    this.finishDuel('player');
  }

  finishDuel(winner) {
    if (!this.activeDuel) return;
    this.isBattling = false;
    clearInterval(this.botInterval);

    const duel = this.activeDuel;
    const elapsed = Math.round((Date.now() - duel.startTime) / 1000);

    if (winner === 'player') {
      sound.playVictory();
      launchConfetti();
    } else {
      sound.playFail();
    }

    if (duel.onFinish) {
      duel.onFinish({
        winner,
        bot: duel.bot,
        challenge: duel.challenge,
        elapsed,
        bonusXP: winner === 'player' ? duel.bot.kyu * 15 + 20 : 0,
      });
    }

    this.activeDuel = null;
  }

  stopDuel() {
    this.isBattling = false;
    if (this.botInterval) clearInterval(this.botInterval);
    this.activeDuel = null;
  }

  cancelDuel() {
    this.stopDuel();
  }
}

export const duelManager = new DuelManager();
