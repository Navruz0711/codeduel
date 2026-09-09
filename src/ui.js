// ============================================
// CodeDuel — UI Components & Page Renderers
// 3D Tilt, Daily Loot, Season League, Skill Radar,
// PRO Store, Payment Checkout, & Certificate Generator
// ============================================

import { t, getLanguage } from './i18n.js';
import { sound } from './audio.js';
import { getDifficultyColor, getDifficultyLabel } from './challenges.js';
import { renderSkillRadar } from './radar.js';
import { calculateSkillRadar, AVATARS, saveUser } from './user.js';
import { getDailyQuests, claimQuest } from './quests.js';
import { AI_BOTS, duelManager } from './duel.js';
import { getLootState, openDailyLootChest, formatTimeLeft } from './rewards.js';
import { getUserLeague, getLeagueSeasonTimeLeft, getDivisionLadder } from './league.js';
import { 
  PRO_PLANS, 
  PROMO_CODES, 
  PAYMENT_METHODS, 
  SHOP_ITEMS, 
  isUserPro, 
  activateProMembership, 
  buyShopItem
} from './monetization.js';
import { 
  getCourseProgress, 
  isLessonCompleted, 
  isLessonUnlocked
} from './courses.js';
import { renderLanguagePill, getCourseIconSvg, getLanguageIconSvg } from './icons.js';
import { getDailyBugCase, getBugHuntState, recordBugFixed, executeBugTest } from './bughunt.js';
import { generateCyberDevCardCanvas } from './devcard.js';
import { getDailyFeaturedChallenge, getTimeUntilMidnight, formatCountdown, getWeeklyStreakDays, STREAK_MILESTONES } from './streak.js';

/**
 * Show a toast notification
 */
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span> <div>${message}</div>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/**
 * Interactive 3D Tilt & Mouse Cursor Spotlight Effect
 */
export function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card, .challenge-card, .feature-card, .bot-card, .pro-plan-card, .shop-item-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/**
 * Daily Mystery Loot Chest Modal
 */
export function openLootModal(user, onRewardClaimed) {
  const modal = document.getElementById('loot-modal');
  if (!modal) return;

  const state = getLootState();
  const titleEl = document.getElementById('loot-modal-title');
  const descEl = document.getElementById('loot-modal-desc');
  const rewardBox = document.getElementById('loot-reward-display');
  const rewardText = document.getElementById('loot-reward-text');
  const openBtn = document.getElementById('btn-open-loot-chest');
  const closeBtn = document.getElementById('btn-close-loot-modal');

  rewardBox.style.display = 'none';

  if (!state.canClaim) {
    titleEl.textContent = '⏳ SOVUTISH VAQTI (COOLDOWN)';
    descEl.textContent = `Keyingi tekin sandiqni ochish uchun kuting: ${formatTimeLeft(state.timeLeftMs)}`;
    openBtn.disabled = true;
    openBtn.textContent = '🔒 Qulflangan';
  } else {
    titleEl.textContent = '🎁 KUNLIK SIRLI SANDIQ';
    descEl.textContent = 'Har 24 soatda sandiqni ochib, bepul XP, streak qalqoni va maxsus unvonlarni oling!';
    openBtn.disabled = false;
    openBtn.textContent = '🎁 Sandiqni Ochish!';
  }

  openBtn.onclick = () => {
    if (!state.canClaim) return;
    const result = openDailyLootChest(user);
    if (result.success) {
      rewardBox.style.display = 'block';
      rewardText.textContent = `${result.reward.title} — ${result.reward.item}`;
      openBtn.disabled = true;
      openBtn.textContent = '✅ Olingan!';
      showToast(`Tabriklaymiz! ${result.reward.item} olindi!`, 'success');
      if (onRewardClaimed) onRewardClaimed(user);
      updateLootNavDot();
    }
  };

  closeBtn.onclick = () => {
    modal.classList.remove('active');
  };

  modal.classList.add('active');
}

export function updateLootNavDot() {
  const dot = document.querySelector('.loot-dot');
  if (dot) {
    const state = getLootState();
    dot.style.display = state.canClaim ? 'block' : 'none';
  }
  const dockLootDot = document.getElementById('dock-loot-dot');
  if (dockLootDot) {
    const state = getLootState();
    dockLootDot.style.display = state.canClaim ? 'block' : 'none';
  }
}

export function updateBugHuntNavDot() {
  const state = getBugHuntState();
  const navDot = document.getElementById('nav-bughunt-dot');
  if (navDot) {
    navDot.style.display = !state.isSolvedToday ? 'block' : 'none';
  }
  const dockDot = document.getElementById('dock-bughunt-dot');
  if (dockDot) {
    dockDot.style.display = !state.isSolvedToday ? 'block' : 'none';
  }
  const homeStatusTag = document.getElementById('home-bughunt-status-tag');
  if (homeStatusTag) {
    if (!state.isSolvedToday) {
      homeStatusTag.textContent = 'TAYYOR!';
      homeStatusTag.className = 'rc-tag green';
    } else {
      homeStatusTag.textContent = 'YECHILGAN';
      homeStatusTag.className = 'rc-tag cyan';
    }
  }
}

export const updateWheelNavDot = updateBugHuntNavDot;

/**
 * Open Daily Bug Hunt Arena Modal
 */
export function openBugHuntModal(user, onRewardClaimed) {
  const modal = document.getElementById('bughunt-modal');
  if (!modal) return;

  const bugCase = getDailyBugCase();
  const state = getBugHuntState();

  const titleEl = document.getElementById('bughunt-case-title');
  if (titleEl) titleEl.textContent = bugCase.title;
  const scenEl = document.getElementById('bughunt-case-scenario');
  if (scenEl) scenEl.textContent = bugCase.scenario;
  const xpEl = document.getElementById('bughunt-xp-reward');
  if (xpEl) xpEl.textContent = `⚡ +${bugCase.bountyXP} XP Bounty`;
  const gemsEl = document.getElementById('bughunt-gems-reward');
  if (gemsEl) gemsEl.textContent = `💎 +${bugCase.bountyGems} Yoqut`;
  const diffEl = document.getElementById('bughunt-difficulty');
  if (diffEl) diffEl.textContent = bugCase.difficulty;

  const codeInput = document.getElementById('bughunt-code-input');
  if (codeInput) codeInput.value = bugCase.buggyCode;

  const terminal = document.getElementById('bughunt-terminal');
  const logBody = document.getElementById('bughunt-log-body');
  if (terminal) terminal.style.display = 'none';

  const runBtn = document.getElementById('btn-run-bughunt-tests');
  const resetBtn = document.getElementById('btn-reset-bug-code');
  const closeBtn = document.getElementById('btn-close-bughunt-modal');
  const closeIcon = document.getElementById('btn-close-bughunt-modal-icon');

  if (runBtn) {
    if (state.isSolvedToday) {
      runBtn.textContent = '✅ Bugun Yechilgan (Ertaga Yangisi)';
      runBtn.disabled = true;
    } else {
      runBtn.textContent = '🔍 Kodni Tekshirish & Yechish';
      runBtn.disabled = false;
    }

    runBtn.onclick = () => {
      if (state.isSolvedToday) return;
      const userCode = codeInput ? codeInput.value : '';
      const { allPassed, results } = executeBugTest(userCode, bugCase);

      if (terminal && logBody) {
        terminal.style.display = 'block';
        logBody.innerHTML = results.map(r => `
          <div class="bughunt-test-row ${r.passed ? 'pass' : 'fail'}">
            <div>${r.passed ? '✅' : '❌'} <strong>${r.label}</strong></div>
            <div class="btr-detail">Kutilgan: <code>${JSON.stringify(r.expected)}</code> | Olingan: <code>${JSON.stringify(r.actual)}</code></div>
          </div>
        `).join('');
      }

      if (allPassed) {
        recordBugFixed(user, bugCase);
        runBtn.textContent = '🎉 Xato Tuzatildi! (+Bounty Olingan)';
        runBtn.disabled = true;
        updateBugHuntNavDot();
        showToast(`Qoyil! Xato tuzatildi: +${bugCase.bountyXP} XP & +${bugCase.bountyGems} 💎 qo'shildi!`, 'success');
        if (onRewardClaimed) onRewardClaimed(user);
      } else {
        sound.playError();
        showToast('Xatolik hali to\'liq tuzatilmadi, testlarni tekshiring!', 'error');
      }
    };
  }

  if (resetBtn && codeInput) {
    resetBtn.onclick = () => {
      codeInput.value = bugCase.buggyCode;
      if (terminal) terminal.style.display = 'none';
      showToast('Kod asl holatiga qaytarildi', 'info');
    };
  }

  const closeModal = () => modal.classList.remove('active');
  if (closeBtn) closeBtn.onclick = closeModal;
  if (closeIcon) closeIcon.onclick = closeModal;

  modal.classList.add('active');
}

/**
 * Open Weekly Streak Calendar Modal
 */
export function openStreakModal(user, onStartDaily) {
  const modal = document.getElementById('streak-modal');
  if (!modal) return;

  const countEl = document.getElementById('streak-modal-count');
  if (countEl) countEl.textContent = user.streak || 0;

  const shieldEl = document.getElementById('streak-shield-count-badge');
  if (shieldEl) {
    shieldEl.textContent = `${user.streakShields || 0}x Faol`;
  }

  // Render 7-day flame calendar
  const daysRow = document.getElementById('streak-modal-days-row');
  if (daysRow) {
    const days = getWeeklyStreakDays(user);
    daysRow.innerHTML = days.map(d => `
      <div class="sc-day-item ${d.isCompleted ? 'completed' : ''} ${d.isToday ? 'today' : ''}">
        <span class="sc-day-name">${d.name}</span>
        <span class="sc-day-icon">${d.isCompleted ? '🔥' : d.isToday ? '🎯' : '⚪'}</span>
        <span class="sc-day-status">${d.isCompleted ? 'Bajarildi' : d.isToday ? 'Bugun' : ''}</span>
      </div>
    `).join('');
  }

  // Render milestones
  const milestonesList = document.getElementById('streak-milestones-list');
  if (milestonesList) {
    milestonesList.innerHTML = STREAK_MILESTONES.map(m => {
      const reached = (user.streak || 0) >= m.days;
      return `
        <div class="sm-item ${reached ? 'reached' : ''}">
          <span class="sm-icon">${m.icon}</span>
          <div class="sm-info">
            <div class="sm-name">${m.days} Kun — ${m.label}</div>
            <div class="sm-reward">+${m.xp} XP & +${m.gems} 💎</div>
          </div>
          <span class="sm-badge">${reached ? '✅ Olingan' : `${m.days - (user.streak || 0)} kun qoldi`}</span>
        </div>
      `;
    }).join('');
  }

  const startBtn = document.getElementById('btn-streak-start-today');
  if (startBtn) {
    startBtn.onclick = () => {
      modal.classList.remove('active');
      if (onStartDaily) onStartDaily();
    };
  }

  const closeModal = () => modal.classList.remove('active');
  const closeBtn = document.getElementById('btn-close-streak-modal');
  const closeIcon = document.getElementById('btn-close-streak-modal-icon');
  if (closeBtn) closeBtn.onclick = closeModal;
  if (closeIcon) closeIcon.onclick = closeModal;

  modal.classList.add('active');
}

/**
 * Render the Retention Command Center on Home Page
 */
export function renderRetentionSection(user, onStartChallenge, onOpenBugHunt, onOpenStreak) {
  // 1. Daily Featured Challenge Card
  const dailyChallenge = getDailyFeaturedChallenge();
  if (dailyChallenge) {
    const titleEl = document.getElementById('daily-pick-title');
    if (titleEl) titleEl.textContent = dailyChallenge.title;

    const rankEl = document.getElementById('daily-pick-rank');
    if (rankEl) {
      rankEl.textContent = `${dailyChallenge.difficulty} kyu`;
      rankEl.className = `rank-badge ${getDifficultyColor(dailyChallenge.difficulty)}`;
    }

    const xpEl = document.getElementById('daily-pick-xp');
    if (xpEl) {
      const baseXP = dailyChallenge.xpReward || 25;
      xpEl.textContent = `⚡ +${baseXP * 2} XP (2X BONUS) & 💎 +20`;
    }

    const startBtn = document.getElementById('btn-start-daily-challenge');
    if (startBtn) {
      startBtn.onclick = () => {
        sound.playClick();
        if (onStartChallenge) onStartChallenge(dailyChallenge);
      };
    }
  }

  // Daily timer update
  const timerEl = document.getElementById('daily-pick-timer');
  if (timerEl) {
    timerEl.textContent = formatCountdown(getTimeUntilMidnight());
  }

  // 2. Weekly Streak Card
  const streakCountEl = document.getElementById('home-streak-count');
  if (streakCountEl) streakCountEl.textContent = user.streak || 0;

  const statusTextEl = document.getElementById('home-streak-status-text');
  if (statusTextEl) {
    const todayStr = new Date().toISOString().split('T')[0];
    if (user.lastActiveDate === todayStr) {
      statusTextEl.textContent = 'Bugungi mashq bajarildi! 🔥';
      statusTextEl.style.color = '#00ff88';
    } else {
      statusTextEl.textContent = "Streakni saqlash uchun bugun kod yozing!";
      statusTextEl.style.color = '#f59e0b';
    }
  }

  const shieldTextEl = document.getElementById('home-streak-shield-text');
  if (shieldTextEl) {
    shieldTextEl.textContent = `🛡️ ${user.streakShields || 0}x Qalqon`;
  }

  const flamesContainer = document.getElementById('home-weekly-flames');
  if (flamesContainer) {
    const days = getWeeklyStreakDays(user);
    flamesContainer.innerHTML = days.map(d => `
      <div class="wf-day ${d.isCompleted ? 'done' : ''} ${d.isToday ? 'today' : ''}" title="${d.fullName}: ${d.isCompleted ? 'Bajarilgan' : d.isToday ? 'Bugun' : 'Kutilmoqda'}">
        <span class="wf-letter">${d.name}</span>
        <span class="wf-flame">${d.isCompleted ? '🔥' : d.isToday ? '🎯' : '•'}</span>
      </div>
    `).join('');
  }

  const viewStreakBtn = document.getElementById('btn-view-streak-modal');
  if (viewStreakBtn) {
    viewStreakBtn.onclick = () => {
      sound.playClick();
      if (onOpenStreak) onOpenStreak();
    };
  }

  // 3. Bug Hunt Card Button
  const bugHuntBtn = document.getElementById('btn-home-start-bughunt');
  if (bugHuntBtn) {
    bugHuntBtn.onclick = () => {
      sound.playClick();
      if (onOpenBugHunt) onOpenBugHunt();
    };
  }

  // 4. Floating dock updates
  const dockStreak = document.getElementById('dock-streak-count');
  if (dockStreak) dockStreak.textContent = `${user.streak || 0} Kun`;

  updateBugHuntNavDot();
}

/**
 * Success modal for challenge completion
 */
export function showSuccessModal(title, subtitle, stats) {
  const modal = document.getElementById('success-modal');
  if (!modal) return;

  document.getElementById('success-modal-title').textContent = title;
  document.getElementById('success-modal-subtitle').textContent = subtitle;

  const statsEl = document.getElementById('success-modal-stats');
  statsEl.innerHTML = stats.map(s => `
    <div class="success-stat">
      <div class="success-stat-value">${s.value}</div>
      <div class="success-stat-label">${s.label}</div>
    </div>
  `).join('');

  modal.classList.add('active');
}

export function hideSuccessModal() {
  document.getElementById('success-modal')?.classList.remove('active');
}

/**
 * Rank Up Fullscreen Celebration Modal
 */
export function showRankUpModal(newRank) {
  sound.playRankUp();
  const modal = document.getElementById('rankup-modal');
  if (!modal) return;

  const badgeEl = document.getElementById('rankup-new-badge');
  if (badgeEl) {
    badgeEl.textContent = `${newRank.kyu} kyu — ${newRank.title}`;
    badgeEl.className = `rankup-badge-display rank-badge large ${newRank.color}`;
  }

  const subtitle = document.getElementById('rankup-modal-subtitle');
  if (subtitle) {
    subtitle.textContent = t('modal_rankup_subtitle');
  }

  modal.classList.add('active');
}

export function hideRankUpModal() {
  document.getElementById('rankup-modal')?.classList.remove('active');
}

/**
 * Navigate to page
 */
export function navigateTo(pageName, updateNav = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const page = document.getElementById(`page-${pageName}`);
  if (page) {
    page.classList.add('active');
  }

  if (updateNav) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Render Challenges Grid
 */
export function renderChallenges(challenges, user, onSelect) {
  const grid = document.getElementById('challenges-grid');
  if (!grid) return;

  grid.innerHTML = '';

  challenges.forEach(challenge => {
    const isSolved = user.solvedChallenges.includes(challenge.id);
    const diffColor = getDifficultyColor(challenge.difficulty);
    const diffLabel = getDifficultyLabel(challenge.difficulty);
    const isPremium = challenge.isPremium;

    const card = document.createElement('div');
    card.className = `challenge-card tilt-card ${isSolved ? 'solved' : ''} ${isPremium ? 'premium-challenge' : ''}`;
    card.style.setProperty('--card-accent', diffColor);

    const langKeys = Object.keys(challenge.languages || {});
    const displayedLangs = langKeys.slice(0, 4);
    const extraCount = langKeys.length - 4;

    card.innerHTML = `
      <div class="challenge-card-header">
        <span class="rank-badge ${diffColor}">${diffLabel}</span>
        <span class="challenge-category-badge">${challenge.category || 'General'}</span>
        ${isPremium ? '<span class="challenge-premium-badge" title="PRO Member Only">👑 PRO</span>' : ''}
        ${isSolved ? '<span class="challenge-solved-icon">✅</span>' : ''}
      </div>
      <h3 class="challenge-card-title">${challenge.title}</h3>
      <p class="challenge-card-desc">${challenge.description.slice(0, 95)}...</p>
      <div class="challenge-card-langs">
        ${displayedLangs.map(l => renderLanguagePill(l)).join('')}
        ${extraCount > 0 ? `<span class="lang-pill extra">+${extraCount}</span>` : ''}
      </div>
      <div class="challenge-card-footer">
        <div class="challenge-tags">
          ${(challenge.tags || []).slice(0, 2).map(tag => `<span class="challenge-tag">#${tag}</span>`).join(' ')}
        </div>
        <div class="challenge-xp">+${challenge.xpReward} XP</div>
      </div>
    `;

    card.addEventListener('click', () => {
      sound.playClick();
      onSelect(challenge);
    });

    grid.appendChild(card);
  });

  init3DTiltCards();
}

/**
 * Render Daily Quests
 */
export function renderQuests(user, onClaimReward) {
  const list = document.getElementById('quests-list');
  if (!list) return;

  const quests = getDailyQuests(user);
  let hasUnclaimed = false;

  list.innerHTML = quests.map(quest => {
    if (quest.completed && !quest.claimed) hasUnclaimed = true;
    const progress = quest.current ?? quest.progress ?? 0;
    const progressPercent = Math.min(100, Math.round((progress / (quest.target || 1)) * 100));
    const title = typeof quest.title === 'object' 
      ? (quest.title[getLanguage()] || quest.title.uz || quest.title.en)
      : quest.title;

    return `
      <div class="quest-card tilt-card ${quest.completed ? 'completed' : ''} ${quest.claimed ? 'claimed' : ''}">
        <div class="quest-icon">${quest.icon}</div>
        <div class="quest-info">
          <div class="quest-title">${title}</div>
          <div class="quest-progress-bar">
            <div class="quest-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
          <div class="quest-stats-row">
            <span>${progress} / ${quest.target}</span>
            <span class="quest-xp">+${quest.xpReward} XP</span>
          </div>
        </div>
        <div class="quest-action">
          ${quest.claimed
            ? '<button class="btn btn-ghost btn-xs" disabled>✅ Olingan</button>'
            : quest.completed
              ? `<button class="btn btn-primary btn-sm btn-glow btn-claim-quest" data-id="${quest.id}">🎁 Olish</button>`
              : '<button class="btn btn-outline btn-xs" disabled>Jarayonda</button>'
          }
        </div>
      </div>
    `;
  }).join('');

  // Wire claim buttons
  list.querySelectorAll('.btn-claim-quest').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playVictory();
      const questId = btn.dataset.id;
      const res = claimQuest(questId, user);
      if (res && (res.success || res === true)) {
        const xp = res.xpReward || 50;
        showToast(`+${xp} XP topshiriq uchun berildi!`, 'success');
        if (onClaimReward) onClaimReward(user);
        renderQuests(user, onClaimReward);
        const questDot = document.getElementById('quest-nav-dot');
        if (questDot) {
          const remainingUnclaimed = getDailyQuests(user).filter(q => q.completed && !q.claimed).length;
          questDot.style.display = remainingUnclaimed > 0 ? 'inline-flex' : 'none';
          questDot.textContent = remainingUnclaimed;
        }
      }
    });
  });

  const dot = document.getElementById('quest-nav-dot');
  if (dot) {
    const unclaimedCount = quests.filter(q => q.completed && !q.claimed).length;
    dot.style.display = unclaimedCount > 0 ? 'inline-flex' : 'none';
    dot.textContent = unclaimedCount;
  }

  init3DTiltCards();
}

/**
 * Render Bot Cards on 1v1 Arena
 */
export function renderDuelBots(onSelectBot) {
  const cards = document.querySelectorAll('.bot-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      sound.playClick();
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const botId = card.dataset.bot;
      if (onSelectBot) onSelectBot(botId);
    });
  });
}

/**
 * Render Profile Page with PRO and Certificate actions
 */
export function renderProfile(user, rank, badges, allChallenges = []) {
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-avatar').textContent = user.avatar;
  
  const titleEl = document.getElementById('profile-custom-title');
  if (titleEl) titleEl.textContent = user.title || 'Code Initiate';

  // PRO Status & Badge
  const proStatusEl = document.getElementById('profile-pro-badge');
  if (proStatusEl) {
    const isPro = isUserPro(user);
    proStatusEl.textContent = isPro ? '👑 PRO MEMBER' : '⚡ FREE';
    proStatusEl.className = `pro-status-chip ${isPro ? 'active' : ''}`;
  }

  const gemsCountEl = document.getElementById('profile-gems-count');
  if (gemsCountEl) gemsCountEl.textContent = user.gems || 0;

  const shieldEl = document.getElementById('profile-shield-display');
  if (shieldEl) {
    if (user.streakShields && user.streakShields > 0) {
      shieldEl.style.display = 'inline-block';
      shieldEl.textContent = `🛡️ ${user.streakShields}x Streak Shield`;
    } else {
      shieldEl.style.display = 'none';
    }
  }

  const rankBadge = document.getElementById('profile-rank');
  rankBadge.textContent = `${rank.kyu} kyu`;
  rankBadge.className = `rank-badge large ${rank.color}`;

  document.getElementById('profile-rank-title').textContent = rank.title;
  document.getElementById('profile-streak').textContent = user.streak;
  document.getElementById('profile-xp').textContent = user.xp;
  document.getElementById('profile-solved').textContent = user.totalSolved;

  const accuracy = user.totalAttempts > 0
    ? Math.round((user.totalSolved / user.totalAttempts) * 100)
    : 0;
  document.getElementById('profile-accuracy').textContent = `${accuracy}%`;
  document.getElementById('profile-best-streak').textContent = user.bestStreak;

  const duelWinsEl = document.getElementById('profile-duel-wins');
  if (duelWinsEl) duelWinsEl.textContent = user.duelWins || 0;

  // XP bar
  const xpBar = document.getElementById('profile-xp-bar');
  xpBar.style.width = `${Math.min(100, rank.progress)}%`;
  document.getElementById('xp-current-label').textContent = `${user.xp} XP`;
  document.getElementById('xp-next-label').textContent = `${rank.xpForNext} XP (${rank.progress}%)`;

  // Render Skill Radar Chart
  const radarData = calculateSkillRadar(user, allChallenges);
  renderSkillRadar('skill-radar-canvas', radarData);

  // Activity calendar
  renderActivityCalendar(user.activityLog);

  // Badges
  renderBadges(badges, user.badges);

  // Recent solutions
  renderRecentSolutions(user.solvedChallenges);

  // Wire Cyber Dev-ID Passport Button
  const btnDevCard = document.getElementById('btn-view-devcard');
  if (btnDevCard) {
    btnDevCard.onclick = () => {
      openDevCardModal(user);
    };
  }

  init3DTiltCards();
}

/**
 * Render Activity Heatmap
 */
function renderActivityCalendar(activityLog) {
  const container = document.getElementById('activity-calendar');
  if (!container) return;

  container.innerHTML = '';
  const now = new Date();

  for (let i = 59; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = activityLog[dateStr] || 0;

    let level = 'level-0';
    if (count >= 4) level = 'level-4';
    else if (count >= 2) level = 'level-3';
    else if (count === 1) level = 'level-1';

    const dayEl = document.createElement('div');
    dayEl.className = `activity-day ${level}`;
    dayEl.title = `${dateStr}: ${count} masalalar`;
    container.appendChild(dayEl);
  }
}

/**
 * Render Badges
 */
function renderBadges(allBadges, userBadgeIds) {
  const grid = document.getElementById('badges-grid');
  if (!grid) return;

  grid.innerHTML = allBadges.map(badge => {
    const earned = userBadgeIds.includes(badge.id);
    return `
      <div class="badge-item ${earned ? 'earned' : 'locked'}" title="${typeof badge.description === 'object' ? (badge.description[getLanguage()] || badge.description.uz) : badge.description}">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${typeof badge.name === 'object' ? (badge.name[getLanguage()] || badge.name.uz) : badge.name}</div>
      </div>
    `;
  }).join('');
}

/**
 * Render Recent Solutions
 */
function renderRecentSolutions(solvedIds) {
  const list = document.getElementById('recent-solutions-list');
  if (!list) return;

  if (solvedIds.length === 0) {
    list.innerHTML = `<p style="color: var(--text-muted); font-size: 13px;">Hozircha yechilgan masalalar yo'q.</p>`;
    return;
  }

  list.innerHTML = solvedIds.slice(-5).reverse().map(id => `
    <div class="recent-item" data-id="${id}">
      <span class="recent-icon">✅</span>
      <div class="recent-info">
        <div class="recent-title">${id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
        <div class="recent-meta">Solved</div>
      </div>
    </div>
  `).join('');
}

/**
 * Render Avatar Picker Modal
 */
export function openAvatarModal(user, onSelectAvatar) {
  const modal = document.getElementById('avatar-modal');
  const grid = document.getElementById('avatar-grid');
  if (!modal || !grid) return;

  const unlocked = user.unlockedAvatars || [];
  const allAvatars = [...new Set([...AVATARS, ...unlocked])];

  grid.innerHTML = allAvatars.map(a => `
    <div class="avatar-option ${user.avatar === a ? 'selected' : ''}" data-avatar="${a}">
      ${a}
    </div>
  `).join('');

  grid.querySelectorAll('.avatar-option').forEach(opt => {
    opt.addEventListener('click', () => {
      sound.playClick();
      user.avatar = opt.dataset.avatar;
      saveUser(user);
      modal.classList.remove('active');
      if (onSelectAvatar) onSelectAvatar(user.avatar);
    });
  });

  document.getElementById('avatar-close-btn').onclick = () => {
    modal.classList.remove('active');
  };

  modal.classList.add('active');
}

/**
 * Open PRO Membership & Pricing Modal
 */
export function openProModal(user, onProActivated) {
  const modal = document.getElementById('pro-pricing-modal');
  if (!modal) return;

  const plansContainer = document.getElementById('pro-plans-grid');
  if (plansContainer) {
    plansContainer.innerHTML = Object.values(PRO_PLANS).map(plan => `
      <div class="pro-plan-card tilt-card ${plan.popular ? 'popular' : ''}" data-plan="${plan.id}">
        ${plan.badge ? `<div class="pro-plan-badge">${plan.badge}</div>` : ''}
        <h3 class="pro-plan-title">${plan.name}</h3>
        <div class="pro-plan-price">${plan.priceFormatted} <span class="pro-period">/ ${plan.period}</span></div>
        <ul class="pro-plan-features">
          ${plan.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <button class="btn ${plan.popular ? 'btn-primary btn-glow' : 'btn-outline'} btn-select-pro-plan" data-plan="${plan.id}" style="width: 100%; margin-top: 15px;">
          👑 ${plan.name} Tanlash
        </button>
      </div>
    `).join('');

    plansContainer.querySelectorAll('.btn-select-pro-plan').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const planId = btn.dataset.plan;
        const plan = PRO_PLANS[planId];
        modal.classList.remove('active');
        openPaymentModal({ type: 'pro', data: plan }, user, onProActivated);
      });
    });
  }

  // Promo Code Support
  const promoInput = document.getElementById('pro-promo-input');
  const promoBtn = document.getElementById('btn-apply-promo');
  const promoMsg = document.getElementById('pro-promo-msg');

  if (promoBtn) {
    promoBtn.onclick = () => {
      sound.playClick();
      const code = (promoInput?.value || '').trim().toUpperCase();
      if (!code) return;

      const promo = PROMO_CODES[code];
      if (promo) {
        if (promoMsg) {
          promoMsg.textContent = `✅ ${promo.desc}`;
          promoMsg.style.color = '#00ff88';
        }
        if (promo.discountPercent === 100) {
          activateProMembership(user, 'monthly', promo.days);
          showToast(`🎉 Tabriklaymiz! PRO a'zolik faollashtirildi!`, 'success');
          modal.classList.remove('active');
          if (onProActivated) onProActivated(user);
        }
      } else {
        if (promoMsg) {
          promoMsg.textContent = '❌ Noto\'g\'ri promokod. Qaytadan urinib ko\'ring.';
          promoMsg.style.color = '#ff4757';
        }
      }
    };
  }

  const closeBtn = document.getElementById('btn-close-pro-modal');
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');

  modal.classList.add('active');
  init3DTiltCards();
}

/**
 * Open Cyber Gems & Items Shop Modal
 */
export function openShopModal(user, onUpdateUser) {
  const modal = document.getElementById('shop-modal');
  if (!modal) return;

  const gemsDisplay = document.getElementById('shop-user-gems');
  if (gemsDisplay) gemsDisplay.textContent = user.gems || 0;

  const grid = document.getElementById('shop-items-grid');
  if (grid) {
    grid.innerHTML = SHOP_ITEMS.map(item => `
      <div class="shop-item-card tilt-card" data-id="${item.id}">
        ${item.badge ? `<div class="shop-item-badge">${item.badge}</div>` : ''}
        <div class="shop-item-icon">${item.icon}</div>
        <h4 class="shop-item-title">${item.name}</h4>
        <p class="shop-item-desc">${item.desc}</p>
        <div class="shop-item-cost">
          ${item.costGems 
            ? `<span class="gem-price">💎 ${item.costGems} Yoqut</span>` 
            : `<span class="real-price">💳 ${item.priceFormatted}</span>`
          }
        </div>
        <button class="btn btn-sm btn-primary btn-buy-shop-item" data-id="${item.id}" style="width: 100%; margin-top: 10px;">
          ${item.costGems ? '💎 Sotib Olish' : '💳 To\'lash'}
        </button>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-buy-shop-item').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const itemId = btn.dataset.id;
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item) return;

        if (item.costGems) {
          const res = buyShopItem(user, itemId);
          if (res.success) {
            showToast(res.message, 'success');
            if (gemsDisplay) gemsDisplay.textContent = user.gems || 0;
            if (onUpdateUser) onUpdateUser(user);
          } else {
            showToast(res.message, 'error');
          }
        } else {
          modal.classList.remove('active');
          openPaymentModal({ type: 'shop', data: item }, user, onUpdateUser);
        }
      });
    });
  }

  const closeBtn = document.getElementById('btn-close-shop-modal');
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');

  modal.classList.add('active');
  init3DTiltCards();
}

/**
 * Open Payment Checkout Modal (Click, Payme, Uzum, Card)
 */
export function openPaymentModal(itemOrPlan, user, onComplete) {
  const modal = document.getElementById('payment-checkout-modal');
  if (!modal) return;

  const titleEl = document.getElementById('checkout-item-title');
  const priceEl = document.getElementById('checkout-item-price');
  const item = itemOrPlan.data;

  if (titleEl) titleEl.textContent = item.name;
  if (priceEl) priceEl.textContent = item.priceFormatted || `${item.priceUZS.toLocaleString()} so'm`;

  let selectedPayment = 'click';

  const methodsContainer = document.getElementById('checkout-payment-methods');
  if (methodsContainer) {
    methodsContainer.innerHTML = PAYMENT_METHODS.map(m => `
      <div class="payment-method-card ${m.id === selectedPayment ? 'active' : ''}" data-method="${m.id}">
        <div class="pm-icon">${m.icon}</div>
        <div class="pm-info">
          <div class="pm-name">${m.name}</div>
          <div class="pm-desc">${m.desc}</div>
        </div>
        <div class="pm-badge">${m.badge}</div>
      </div>
    `).join('');

    methodsContainer.querySelectorAll('.payment-method-card').forEach(card => {
      card.addEventListener('click', () => {
        sound.playClick();
        methodsContainer.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedPayment = card.dataset.method;
      });
    });
  }

  const payBtn = document.getElementById('btn-confirm-payment');
  if (payBtn) {
    payBtn.onclick = () => {
      sound.playVictory();
      payBtn.disabled = true;
      payBtn.textContent = '⏳ To\'lov tekshirilmoqda...';

      setTimeout(() => {
        if (itemOrPlan.type === 'pro') {
          activateProMembership(user, item.id, item.id === 'lifetime' ? 3650 : item.id === 'annual' ? 365 : 30);
          showToast(`🎉 To'lov muvaffaqiyatli! CodeDuel PRO faollashtirildi!`, 'success');
        } else if (itemOrPlan.type === 'shop') {
          if (item.rewardGems) {
            user.gems = (user.gems || 0) + item.rewardGems;
            saveUser(user);
            showToast(`🎉 +${item.rewardGems} Yoqut hisobingizga qo'shildi!`, 'success');
          }
        }

        payBtn.disabled = false;
        payBtn.textContent = '✅ To\'lashni Tasdiqlash';
        modal.classList.remove('active');
        if (onComplete) onComplete(user);
      }, 1000);
    };
  }

  const closeBtn = document.getElementById('btn-close-payment-modal');
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');

  modal.classList.add('active');
}

/**
 * Open Holographic Cyber Developer Passport / Dev-ID Modal & Download
 */
export function openDevCardModal(user) {
  const modal = document.getElementById('devcard-modal');
  if (!modal) return;

  const previewContainer = document.getElementById('devcard-canvas-container');
  if (previewContainer) {
    previewContainer.innerHTML = '';
    const canvas = generateCyberDevCardCanvas(user);
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    canvas.style.borderRadius = '16px';
    canvas.style.boxShadow = '0 10px 40px rgba(56, 189, 248, 0.25)';
    previewContainer.appendChild(canvas);

    const downloadBtn = document.getElementById('btn-download-devcard-png');
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        sound.playVictory();
        const link = document.createElement('a');
        link.download = `CodeDuel-DevPassport-${user.name || 'Warrior'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Kiber-Pasport yuklab olindi! (PNG 900x540)', 'success');
      };
    }
  }

  const closeBtn = document.getElementById('btn-close-devcard-modal');
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');

  modal.classList.add('active');
}

export const openCertificateModal = openDevCardModal;

/**
 * Render Leaderboard & Season League
 */
export function renderLeaderboard(data, tab, currentUser) {
  const table = document.getElementById('leaderboard-table');
  if (!table) return;

  const currentLeague = getUserLeague(currentUser.xp);
  const leagueNameEl = document.getElementById('user-current-league-name');
  if (leagueNameEl) {
    leagueNameEl.textContent = `${currentLeague.icon} ${currentLeague.name}`;
    leagueNameEl.style.color = currentLeague.color;
  }

  if (tab === 'league') {
    const ladder = getDivisionLadder(currentLeague, currentUser);
    table.innerHTML = `
      <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid var(--border-purple); padding: 14px 20px; border-radius: var(--radius-md); margin-bottom: 12px; font-size: 13px;">
        🏆 <strong>${currentLeague.icon} ${currentLeague.name}</strong> — Mavsum tugashiga: <strong>${getLeagueSeasonTimeLeft()}</strong>. (Dastlabki 3 o'rin yuqori ligaga ko'tariladi!)
      </div>
      ${ladder.map((entry, idx) => {
        const pos = idx + 1;
        const isPromotion = pos <= 3;
        return `
          <div class="leaderboard-row ${isPromotion ? 'promotion-zone' : ''} ${entry.isCurrentUser ? 'current-user' : ''}">
            <div class="lb-position">${isPromotion ? '🟢 ' + pos : pos}</div>
            <div class="lb-avatar">${entry.avatar}</div>
            <div class="lb-info">
              <div class="lb-name">${entry.name}</div>
              <div class="lb-rank" style="color: ${currentLeague.color}">${currentLeague.name}</div>
            </div>
            <div class="lb-stats">
              <div class="lb-stat">
                <div class="lb-stat-value text-accent">${entry.xp}</div>
                <div class="lb-stat-label">XP</div>
              </div>
              <div class="lb-stat">
                <div class="lb-stat-value">${entry.solved}</div>
                <div class="lb-stat-label">Solved</div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    `;
    return;
  }

  const entries = data[tab] || [];
  const userEntry = {
    name: `${currentUser.name} (${t('duel_player_you')})`,
    avatar: currentUser.avatar || '🥷',
    rank: `${currentUser.xp >= 900 ? 4 : currentUser.xp >= 500 ? 5 : currentUser.xp >= 250 ? 6 : currentUser.xp >= 100 ? 7 : 8} kyu`,
    xp: tab === 'weekly' ? Math.min(currentUser.xp, 250) : currentUser.xp,
    solved: currentUser.totalSolved,
    isCurrentUser: true,
  };

  let allEntries = [...entries];
  let userInserted = false;
  for (let i = 0; i < allEntries.length; i++) {
    if (userEntry.xp >= allEntries[i].xp) {
      allEntries.splice(i, 0, userEntry);
      userInserted = true;
      break;
    }
  }
  if (!userInserted) allEntries.push(userEntry);

  table.innerHTML = allEntries.map((entry, idx) => {
    const pos = idx + 1;
    let posClass = '';
    let posDisplay = pos;
    if (pos === 1) { posClass = 'gold'; posDisplay = '🥇'; }
    else if (pos === 2) { posClass = 'silver'; posDisplay = '🥈'; }
    else if (pos === 3) { posClass = 'bronze'; posDisplay = '🥉'; }

    return `
      <div class="leaderboard-row ${pos <= 3 ? `top-${pos}` : ''} ${entry.isCurrentUser ? 'current-user' : ''}">
        <div class="lb-position ${posClass}">${posDisplay}</div>
        <div class="lb-avatar">${entry.avatar}</div>
        <div class="lb-info">
          <div class="lb-name">${entry.name}</div>
          <div class="lb-rank">${entry.rank}</div>
        </div>
        <div class="lb-stats">
          <div class="lb-stat">
            <div class="lb-stat-value text-accent">${entry.xp}</div>
            <div class="lb-stat-label">XP</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value">${entry.solved}</div>
            <div class="lb-stat-label">Solved</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Update navbar user info with PRO badge and Gems counter
 */
export function updateNavbar(user, rank) {
  const avatarIcon = document.getElementById('nav-avatar-icon');
  if (avatarIcon) {
    avatarIcon.textContent = user.avatar || '🥷';
  }

  const streakEl = document.getElementById('nav-streak');
  if (streakEl) streakEl.textContent = `🔥 ${user.streak}`;

  const xpEl = document.getElementById('nav-xp');
  if (xpEl) xpEl.textContent = `⚡ ${user.xp} XP`;

  const rankBadge = document.getElementById('nav-rank');
  if (rankBadge) rankBadge.textContent = `${rank.kyu} kyu`;

  // Nav Gems Counter
  const gemsEl = document.getElementById('nav-gems-count');
  if (gemsEl) gemsEl.textContent = user.gems || 0;

  // Nav PRO Crown Indicator
  const proPill = document.getElementById('nav-btn-pro');
  if (proPill) {
    if (isUserPro(user)) {
      proPill.classList.add('active-pro');
      proPill.querySelector('.pro-pill-text').textContent = 'VIP PRO';
    } else {
      proPill.classList.remove('active-pro');
      proPill.querySelector('.pro-pill-text').textContent = 'PRO';
    }
  }

  updateLootNavDot();
  updateBugHuntNavDot();

  const questDot = document.getElementById('quest-nav-dot');
  if (questDot) {
    try {
      const quests = getDailyQuests(user);
      const unclaimed = quests.filter(q => q.completed && !q.claimed).length;
      if (unclaimed > 0) {
        questDot.style.display = 'inline-flex';
        questDot.textContent = unclaimed;
      } else {
        questDot.style.display = 'none';
      }
    } catch (e) {}
  }

  // Drawer HUD Sync
  const drawerAvatar = document.getElementById('drawer-avatar-icon');
  if (drawerAvatar) drawerAvatar.textContent = user.avatar || '🥷';
  const drawerName = document.getElementById('drawer-user-name');
  if (drawerName) drawerName.textContent = user.name || 'CodeWarrior';
  const drawerXp = document.getElementById('drawer-user-xp');
  if (drawerXp) drawerXp.textContent = `⚡ ${user.xp} XP`;
  const drawerRank = document.getElementById('drawer-rank-badge');
  if (drawerRank) {
    drawerRank.textContent = `${rank.kyu} kyu`;
    drawerRank.className = `rank-badge ${rank.color}`;
  }
  const drawerQuestDot = document.getElementById('drawer-quest-dot');
  if (drawerQuestDot && questDot) {
    drawerQuestDot.style.display = questDot.style.display;
    drawerQuestDot.textContent = questDot.textContent;
  }
}

// ============================================
// CODDY.TECH COURSES, ROADMAP & LESSON RENDERERS
// ============================================

/**
 * Render the Catalog of Interactive Courses
 */
export function renderCoursesCatalog(courses, user, onSelectCourse) {
  const grid = document.getElementById('courses-grid');
  if (!grid) return;

  grid.innerHTML = courses.map(course => {
    const progress = getCourseProgress(user, course.id);
    const isStarted = progress.completedCount > 0;
    const isFinished = progress.isCompleted;

    return `
      <div class="course-card tilt-card ${isFinished ? 'course-finished' : ''}" data-id="${course.id}" style="--course-accent: ${course.color};">
        <div class="course-card-glow" style="background: ${course.gradient};"></div>
        <div class="course-card-header">
          <span class="course-icon-bubble">${getCourseIconSvg(course.id, 38)}</span>
          <div class="course-badges">
            <span class="rank-badge ${course.levelKyu || 'kyu-8'}">${course.level}</span>
            <span class="course-lang-tag">${course.language.toUpperCase()}</span>
          </div>
        </div>

        <h3 class="course-card-title">${course.title}</h3>
        <p class="course-card-desc">${course.description}</p>

        <div class="course-card-meta">
          <span>📚 ${course.lessons.length} Dars</span>
          <span>⚡ +${course.totalXp} XP</span>
          ${isFinished ? '<span class="course-cert-badge">🏆 Sertifikat Tayyor</span>' : ''}
        </div>

        <div class="course-progress-block">
          <div class="course-progress-header">
            <span>O'zlashtirish</span>
            <span class="course-percent">${progress.percent}%</span>
          </div>
          <div class="course-progress-bar">
            <div class="course-progress-fill" style="width: ${progress.percent}%; background: ${course.gradient};"></div>
          </div>
        </div>

        <button class="btn ${isFinished ? 'btn-outline' : 'btn-primary btn-glow'} btn-course-start" data-id="${course.id}" style="width: 100%; margin-top: 15px;">
          ${isFinished ? '🔁 Qayta Ko\'rish' : isStarted ? '▶️ Davom Ettirish' : '🚀 Kursni Boshlash'}
        </button>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.btn-course-start, .course-card').forEach(el => {
    el.addEventListener('click', (e) => {
      const courseId = el.dataset.id || el.closest('.course-card')?.dataset.id;
      if (!courseId) return;
      sound.playClick();
      const course = courses.find(c => c.id === courseId);
      if (course && onSelectCourse) onSelectCourse(course);
    });
  });

  init3DTiltCards();
}

/**
 * Render Coddy-style Visual Learning Roadmap
 */
export function renderCourseRoadmap(course, user, onSelectLesson, onBackToCatalog, onOpenCertificate) {
  const catalogView = document.getElementById('courses-catalog-container');
  const roadmapView = document.getElementById('course-roadmap-container');
  if (!roadmapView || !catalogView) return;

  catalogView.style.display = 'none';
  roadmapView.style.display = 'block';

  // Banner details
  const roadmapIconEl = document.getElementById('roadmap-course-icon');
  if (roadmapIconEl) roadmapIconEl.innerHTML = getCourseIconSvg(course.id, 60);
  document.getElementById('roadmap-course-title').textContent = course.title;
  document.getElementById('roadmap-course-desc').textContent = course.description;
  document.getElementById('roadmap-course-level').textContent = course.level;
  document.getElementById('roadmap-course-lang').textContent = course.language.toUpperCase();

  const progress = getCourseProgress(user, course.id);
  const fillEl = document.getElementById('roadmap-progress-fill');
  const textEl = document.getElementById('roadmap-progress-text');
  if (fillEl) fillEl.style.width = `${progress.percent}%`;
  if (textEl) textEl.textContent = `${progress.completedCount} / ${progress.totalCount} dars tugatildi (${progress.percent}%)`;

  const certBtn = document.getElementById('btn-view-course-cert');
  if (certBtn) {
    certBtn.style.display = progress.isCompleted ? 'inline-flex' : 'none';
    certBtn.onclick = () => {
      sound.playVictory();
      if (onOpenCertificate) onOpenCertificate(user, course);
    };
  }

  const backBtn = document.getElementById('btn-back-to-catalog');
  if (backBtn) {
    backBtn.onclick = () => {
      sound.playClick();
      roadmapView.style.display = 'none';
      catalogView.style.display = 'block';
      if (onBackToCatalog) onBackToCatalog();
    };
  }

  // Render Vertical Nodes Path (Coddy & Duolingo style)
  const nodesList = document.getElementById('roadmap-nodes-list');
  if (!nodesList) return;

  nodesList.innerHTML = course.lessons.map((lesson, idx) => {
    const isCompleted = isLessonCompleted(user, course.id, lesson.id);
    const isUnlocked = isLessonUnlocked(user, course.id, lesson.id);
    const isCurrent = isUnlocked && !isCompleted;

    let nodeState = 'locked';
    let statusBadge = '🔒 Qulflangan';
    if (isCompleted) {
      nodeState = 'completed';
      statusBadge = '✅ Bajarilgan';
    } else if (isCurrent) {
      nodeState = 'current';
      statusBadge = '🟡 Hozirgi Dars';
    }

    return `
      <div class="roadmap-node-row ${nodeState}">
        <div class="roadmap-node-bubble ${nodeState}" data-lesson-id="${lesson.id}">
          <span class="bubble-icon">${isCompleted ? '✅' : isCurrent ? '▶️' : '🔒'}</span>
          <span class="bubble-number">${lesson.order}</span>
        </div>

        <div class="roadmap-node-card tilt-card ${nodeState}" data-lesson-id="${lesson.id}">
          <div class="node-card-top">
            <span class="node-status-chip ${nodeState}">${statusBadge}</span>
            <span class="node-xp-chip">+${lesson.xpReward} XP</span>
          </div>
          <h4 class="node-card-title">${lesson.order}. ${lesson.title}</h4>
          <p class="node-card-task">${lesson.task.slice(0, 95)}...</p>
          <div class="node-card-action">
            ${isUnlocked 
              ? `<button class="btn btn-sm ${isCurrent ? 'btn-primary btn-glow' : 'btn-outline'} btn-open-lesson" data-lesson-id="${lesson.id}">
                  ${isCompleted ? '🔄 Qayta Yechish' : '🚀 Boshlash'}
                </button>`
              : `<button class="btn btn-sm btn-ghost" disabled>🔒 Oldingi darsni yakunlang</button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');

  nodesList.querySelectorAll('.btn-open-lesson, .roadmap-node-card.completed, .roadmap-node-card.current').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lessonId = btn.dataset.lessonId || btn.closest('[data-lesson-id]')?.dataset.lessonId;
      if (!lessonId) return;
      sound.playClick();
      const lesson = course.lessons.find(l => l.id === lessonId);
      if (lesson && isLessonUnlocked(user, course.id, lessonId)) {
        if (onSelectLesson) onSelectLesson(course, lesson);
      }
    });
  });

  init3DTiltCards();
}

/**
 * Render Interactive Bite-sized Lesson Runner
 */
export function renderLessonPlayer(course, lesson, user, handlers) {
  // Breadcrumb & title
  const courseBadge = document.getElementById('lesson-course-badge');
  const titleBadge = document.getElementById('lesson-title-badge');
  const stepBadge = document.getElementById('lesson-step-badge');
  const editorLang = document.getElementById('lesson-editor-lang');

  if (courseBadge) courseBadge.innerHTML = `${getCourseIconSvg(course.id, 18)} <span>${course.title}</span>`;
  if (titleBadge) titleBadge.textContent = `${lesson.order}-Dars: ${lesson.title}`;
  if (stepBadge) stepBadge.textContent = `${lesson.order} / ${course.lessons.length}`;
  if (editorLang) editorLang.textContent = (lesson.language || course.language).toUpperCase();

  // Theory tab
  const theoryBody = document.getElementById('lesson-theory-body');
  if (theoryBody) {
    // Format simple markdown into HTML
    theoryBody.innerHTML = formatMarkdownToHTML(lesson.theory);
  }

  // Task tab
  const taskText = document.getElementById('lesson-task-text');
  if (taskText) taskText.textContent = lesson.task;

  const checklist = document.getElementById('lesson-checklist');
  if (checklist) {
    checklist.innerHTML = (lesson.tests || []).map((t, idx) => `
      <div class="checklist-item pending" id="chk-test-${idx}">
        <span class="chk-icon">⬜</span>
        <span class="chk-label">${t.label || `Qadam ${idx + 1}`}</span>
      </div>
    `).join('');
  }

  // Hints tab
  const hintsList = document.getElementById('lesson-hints-list');
  if (hintsList) {
    if (lesson.hints && lesson.hints.length) {
      hintsList.innerHTML = lesson.hints.map((h, idx) => `
        <details class="hint-accordion-item">
          <summary>💡 Maslahat #${idx + 1} (Ko'rish uchun bosing)</summary>
          <div class="hint-body">${h}</div>
        </details>
      `).join('');
    } else {
      hintsList.innerHTML = `<p style="color: var(--text-muted); font-size: 13px;">Ushbu dars uchun qo'shimcha maslahat talab qilinmaydi.</p>`;
    }
  }

  // AI Murabbiy Output Reset
  const aiOutput = document.getElementById('lesson-ai-output');
  if (aiOutput) {
    aiOutput.style.display = 'none';
    aiOutput.textContent = '';
  }

  // Wire AI Tutor button
  const aiBtn = document.getElementById('btn-lesson-ask-ai');
  if (aiBtn) {
    aiBtn.onclick = () => {
      sound.playClick();
      if (handlers.onAskAI) handlers.onAskAI(lesson, course, aiOutput);
    };
  }

  // Tab switcher in left pane
  document.querySelectorAll('.lesson-pane-tabs .l-tab').forEach(tab => {
    tab.onclick = () => {
      sound.playClick();
      document.querySelectorAll('.lesson-pane-tabs .l-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.lesson-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(`l-tab-${tab.dataset.tab}`);
      if (target) target.classList.add('active');
    };
  });

  // Action buttons
  const runBtn = document.getElementById('btn-lesson-run');
  const checkBtn = document.getElementById('btn-lesson-check');
  const resetBtn = document.getElementById('btn-lesson-reset');
  const formatBtn = document.getElementById('btn-lesson-format');
  const copyBtn = document.getElementById('btn-lesson-copy');
  const clearConsoleBtn = document.getElementById('btn-lesson-clear-console');
  const consoleOutput = document.getElementById('lesson-console-output');

  // Output tabs (Console vs Live Preview)
  const tabConsole = document.getElementById('tab-lesson-console');
  const tabPreview = document.getElementById('tab-lesson-preview');
  const contentConsole = document.getElementById('lesson-console-tab-content');
  const contentPreview = document.getElementById('lesson-preview-tab-content');

  const isHtml = (course.language === 'html' || lesson.language === 'html' || lesson.language === 'css' || course.id === 'web-dev-basics');

  if (tabPreview) {
    tabPreview.style.display = isHtml ? 'inline-block' : 'none';
  }

  function switchOutputTab(view) {
    if (view === 'preview') {
      tabPreview?.classList.add('active');
      tabConsole?.classList.remove('active');
      if (contentPreview) contentPreview.style.display = 'block';
      if (contentConsole) contentConsole.style.display = 'none';
    } else {
      tabConsole?.classList.add('active');
      tabPreview?.classList.remove('active');
      if (contentConsole) contentConsole.style.display = 'block';
      if (contentPreview) contentPreview.style.display = 'none';
    }
  }

  if (tabConsole) {
    tabConsole.onclick = () => {
      sound.playClick();
      switchOutputTab('console');
    };
  }

  if (tabPreview) {
    tabPreview.onclick = () => {
      sound.playClick();
      switchOutputTab('preview');
    };
  }

  // Default tab selection: Preview for HTML, Console for others
  if (isHtml) {
    switchOutputTab('preview');
  } else {
    switchOutputTab('console');
  }

  if (consoleOutput) {
    consoleOutput.textContent = isHtml 
      ? 'HTML & CSS darsiga xush kelibsiz! Kodingizni yozib, "Kodni Ishga Tushirish" yoki "Tekshirish" tugmasini bosing.'
      : 'Kodingizni yozib, "Tekshirish" tugmasini bosing...';
    consoleOutput.style.color = 'var(--text-secondary)';
  }

  if (runBtn) {
    runBtn.onclick = () => {
      if (handlers.onRunCode) handlers.onRunCode();
    };
  }

  if (checkBtn) {
    checkBtn.onclick = () => {
      if (handlers.onCheckSolution) handlers.onCheckSolution();
    };
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      sound.playClick();
      if (handlers.onResetCode) handlers.onResetCode();
    };
  }

  if (formatBtn) {
    formatBtn.onclick = () => {
      sound.playClick();
      if (handlers.onFormatCode) handlers.onFormatCode();
    };
  }

  if (copyBtn) {
    copyBtn.onclick = () => {
      sound.playClick();
      if (handlers.onCopyCode) handlers.onCopyCode();
    };
  }

  if (clearConsoleBtn) {
    clearConsoleBtn.onclick = () => {
      if (consoleOutput) consoleOutput.textContent = '';
    };
  }

  const backBtn = document.getElementById('btn-lesson-back');
  if (backBtn) {
    backBtn.onclick = () => {
      sound.playClick();
      if (handlers.onBackToRoadmap) handlers.onBackToRoadmap();
    };
  }
}

/**
 * Simple markdown-to-html converter for lesson theory
 */
function formatMarkdownToHTML(md = '') {
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/```([a-z]*)\n([\s\S]*?)\n```/gim, '<pre class="theory-code-block"><code>$2</code></pre>')
    .replace(/`([^`]+)`/gim, '<code class="theory-inline-code">$1</code>')
    .replace(/\n\n/gim, '<p></p>')
    .replace(/\n/gim, '<br>');
}

/**
 * Show Celebration Modal when Lesson is passed
 */
export function showLessonSuccessModal(course, lesson, result, onNextLesson, onBackToRoadmap) {
  const modal = document.getElementById('lesson-success-modal');
  if (!modal) return;

  const xpEl = document.getElementById('lesson-reward-xp');
  const gemsEl = document.getElementById('lesson-reward-gems');
  if (xpEl) xpEl.textContent = `+${result.xpAwarded || 25}`;
  if (gemsEl) gemsEl.textContent = `+${result.gemsAwarded || 10}`;

  const nextBtn = document.getElementById('btn-lesson-modal-next');
  const roadmapBtn = document.getElementById('btn-lesson-modal-roadmap');

  if (nextBtn) {
    const isLast = lesson.order >= course.lessons.length;
    nextBtn.textContent = isLast ? '🏆 Kursni Yakunlash!' : 'Keyingi Dars ➡️';
    nextBtn.onclick = () => {
      modal.classList.remove('active');
      if (onNextLesson) onNextLesson();
    };
  }

  if (roadmapBtn) {
    roadmapBtn.onclick = () => {
      modal.classList.remove('active');
      if (onBackToRoadmap) onBackToRoadmap();
    };
  }

  modal.classList.add('active');
}

/**
 * Open Official Course Certificate Modal
 */
export function openCourseCertificateModal(user, course) {
  openDevCardModal(user);
}

