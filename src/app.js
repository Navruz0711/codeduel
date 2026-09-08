// ============================================
// CodeDuel — Main Application Orchestrator
// Supercharged with 3D Tilt, Particle Canvas, Themes, Daily Loot, and Leagues
// ============================================

import { initI18n, getLanguage, setLanguage, t } from './i18n.js';
import { sound } from './audio.js';
import { loadUser, saveUser, getUserRank, getNextRank, getXPProgress, addXP, markSolved, isSolved, saveSolution, getSolution, recordDuelResult } from './user.js';
import { checkBadges, getAllBadges, launchConfetti, getLeaderboardData } from './gamification.js';
import { loadChallenges, getChallenges, getChallenge, filterChallenges, getNextChallenge, getDifficultyColor, parseMarkdown } from './challenges.js';
import { loadMonaco, createEditor, getEditorValue, setEditorValue, setEditorLanguage, focusEditor, formatCode } from './editor.js';
import { runTests, runCustomTest } from './executor.js';
import {
  AI_PROVIDERS,
  getActiveProviderId,
  setActiveProviderId,
  getActiveModelForProvider,
  setActiveModelForProvider,
  getProviderApiKey,
  saveProviderApiKey,
  testProviderConnection,
  getAIHint,
  reviewCode,
  askAIMentor,
  getGeminiKey,
  saveGeminiKey
} from './ai.js';
import { duelManager, AI_BOTS } from './duel.js';
import { recordQuestProgress, getDailyQuests } from './quests.js';
import { initParticles } from './particles.js';
import { initTheme, setTheme, getTheme } from './theme.js';
import { getLeagueSeasonTimeLeft } from './league.js';
import {
  showToast, showSuccessModal, hideSuccessModal, showRankUpModal, hideRankUpModal,
  navigateTo, renderChallenges, renderQuests, renderDuelBots, renderProfile,
  renderLeaderboard, openAvatarModal, updateNavbar, init3DTiltCards, openLootModal,
  openProModal, openShopModal, openDevCardModal,
  renderCoursesCatalog, renderCourseRoadmap, renderLessonPlayer, showLessonSuccessModal,
  openBugHuntModal, openStreakModal, renderRetentionSection, updateBugHuntNavDot
} from './ui.js';
import { isUserPro } from './monetization.js';
import { getCourses, getCourse, getLesson, completeLesson, getCourseProgress } from './courses.js';
import { PLAYGROUND_TEMPLATES, runPlaygroundCode } from './playground.js';
import { getDailyFeaturedChallenge, getTimeUntilMidnight, formatCountdown } from './streak.js';

// ---- State ----
let user = null;
let currentChallenge = null;
let currentLanguage = 'javascript';
let isRunning = false;
let challengeTimerInterval = null;
let challengeSeconds = 0;
let isDuelActive = false;
let currentCourse = null;
let currentLesson = null;
let playgroundLang = 'javascript';

// ---- Initialize ----
async function init() {
  // 1. Initialize Particles Background
  try {
    initParticles('ambient-particles-canvas');
  } catch (e) {}

  // 2. Initialize Theme Engine
  initTheme();

  // 3. Initialize i18n
  initI18n();

  // 4. Load user data
  user = loadUser();

  // 5. Load challenges
  loadChallenges();

  // 6. Update navbar
  const rank = getUserRank(user);
  updateNavbar(user, rank);

  // 7. Setup UI and event listeners
  setupNavigation();
  setupThemeSwitcher();
  setupRetentionFeatures();
  setupLanguageSwitcher();
  setupSoundControl();
  setupFilters();
  setupEditorControls();
  setupAIMentor();
  setupCustomTestRunner();
  setupDuelArena();
  setupModals();
  setupLeaderboardTabs();
  setupCyberDrawer();
  setupAvatarPicker();
  setupSeasonTicker();

  // 8. Initialize 3D Card Tilt on loaded elements
  init3DTiltCards();

  // 9. Navigate to home
  navigateTo('home');

  // Preload Monaco Editor in background
  try {
    await loadMonaco();
  } catch (err) {
    console.warn('Monaco preload background task:', err);
  }
}

// ---- Theme Switcher ----
function setupThemeSwitcher() {
  const pickerBtn = document.getElementById('btn-theme-picker');
  const popup = document.getElementById('theme-popup-menu');
  const activeOrb = document.getElementById('theme-active-orb');

  const current = getTheme();
  updateThemeOrbUI(current);

  pickerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    sound.playClick();
    popup?.classList.toggle('active');
  });

  document.querySelectorAll('.theme-option-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = card.dataset.theme;
      setTheme(themeId);
      updateThemeOrbUI(themeId);
      popup?.classList.remove('active');
      showToast(`Mavzu o'zgartirildi: ${card.querySelector('span:last-child')?.textContent}`, 'info');
    });
  });

  document.addEventListener('click', (e) => {
    if (!popup?.contains(e.target) && e.target !== pickerBtn) {
      popup?.classList.remove('active');
    }
  });
}

function updateThemeOrbUI(themeId) {
  const activeOrb = document.getElementById('theme-active-orb');
  const colors = {
    emerald: '#00ff88',
    synthwave: '#c084fc',
    cyan: '#22d3ee',
    amber: '#f59e0b',
    crimson: '#ef4444',
  };
  if (activeOrb) {
    activeOrb.style.background = colors[themeId] || '#00ff88';
    activeOrb.style.boxShadow = `0 0 8px ${colors[themeId] || '#00ff88'}`;
  }

  document.querySelectorAll('.theme-option-card').forEach(card => {
    card.classList.toggle('active', card.dataset.theme === themeId);
  });
}

// ---- Retention & Engagement Features (Bug Hunt, Loot, Streak, Daily Pick) ----
function setupRetentionFeatures() {
  const onUserRewardClaimed = (updatedUser) => {
    user = updatedUser;
    updateNavbar(user, getUserRank(user));
    renderRetentionSection(
      user,
      (c) => openChallenge(c.id),
      () => openBugHuntModal(user, onUserRewardClaimed),
      () => openStreakModal(user, () => openDailyChallenge())
    );
  };

  // 1. Bug Hunt triggers
  ['nav-btn-bughunt', 'drawer-btn-bughunt', 'dock-btn-bughunt', 'btn-home-start-bughunt'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      sound.playClick();
      openBugHuntModal(user, onUserRewardClaimed);
    });
  });

  // 2. Loot triggers
  ['btn-daily-loot', 'dock-btn-loot'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      sound.playClick();
      openLootModal(user, onUserRewardClaimed);
    });
  });

  // 3. Streak triggers
  ['nav-streak', 'dock-btn-streak', 'btn-view-streak-modal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      sound.playClick();
      openStreakModal(user, () => openDailyChallenge());
    });
  });

  // Initial render
  renderRetentionSection(
    user,
    (c) => openChallenge(c.id),
    () => openBugHuntModal(user, onUserRewardClaimed),
    () => openStreakModal(user, () => openDailyChallenge())
  );

  // Live countdown timer (every second)
  setInterval(() => {
    const timerEl = document.getElementById('daily-pick-timer');
    if (timerEl) {
      timerEl.textContent = formatCountdown(getTimeUntilMidnight());
    }
  }, 1000);

  // Dynamic live social proof marquee feed
  setupDynamicActivityTicker();
}

function openDailyChallenge() {
  const daily = getDailyFeaturedChallenge();
  if (daily) {
    openChallenge(daily.id);
  }
}

// ---- Dynamic Live Activity Ticker (Social Proof) ----
const LIVE_FEED_EVENTS = [
  '⚡ @Javohir (Toshkent) "Two Sum" masalasini yechdi (+40 XP)',
  '🔥 @Madina 7 kunlik uzluksiz streakka erishdi!',
  '⚔️ @Temur AI CyberNinja\x27ni 1v1 duelda mag\x27lub etdi!',
  '💎 @Farrux "JavaScript Mastery" kursidan sertifikat oldi!',
  '🎡 @Nilufar Omad G\x27ildiragida 100 Kiber Yoqut yutib oldi!',
  '🛡️ @Shahzod "Python Asoslari" kursining 15-darsini yakunladi!',
  '🚀 @Jasurbek 6 kyu darajasiga muvaffaqiyatli ko\x27tarildi!',
  '⚡ @Malika "Tribonacci Sequence" masalasini yechdi (+50 XP)',
  '👑 @Bobur CodeDuel PRO obunasiga ega bo\x27ldi!',
];

function setupDynamicActivityTicker() {
  const tickerContents = document.querySelectorAll('.ticker-content');
  if (tickerContents.length === 0) return;

  let eventIndex = 0;
  setInterval(() => {
    const ev = LIVE_FEED_EVENTS[eventIndex % LIVE_FEED_EVENTS.length];
    eventIndex++;

    tickerContents.forEach(tc => {
      const firstItem = tc.querySelector('.ticker-item');
      if (firstItem) {
        firstItem.innerHTML = `<span class="ticker-dot cyan pulse"></span> <strong>${ev}</strong>`;
      }
    });
  }, 7000);
}

// ---- Season Ticker Countdown ----
function setupSeasonTicker() {
  const tickerEl = document.getElementById('season-countdown-ticker');
  if (tickerEl) {
    tickerEl.textContent = getLeagueSeasonTimeLeft();
    setInterval(() => {
      tickerEl.textContent = getLeagueSeasonTimeLeft();
    }, 60000);
  }
}

// ---- Language Switcher (Segmented Luxury Control) ----
function setupLanguageSwitcher() {
  const curLang = getLanguage();
  updateLangSegmentsUI(curLang);

  document.querySelectorAll('.lang-segment').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.dataset.lang;
      if (selectedLang === getLanguage()) return;

      sound.playClick();
      setLanguage(selectedLang);
      updateLangSegmentsUI(selectedLang);
      updateNavbar(user, getUserRank(user));
      
      const activePage = document.querySelector('.page.active')?.id.replace('page-', '') || 'home';
      if (activePage === 'challenges') renderChallengesPage();
      if (activePage === 'profile') renderProfilePage();
      if (activePage === 'leaderboard') renderLeaderboardPage();
      if (activePage === 'quests') renderQuestsPage();
      if (activePage === 'challenge-detail' && currentChallenge) {
        renderChallengeDetail(currentChallenge, currentLanguage);
      }
    });
  });
}

function updateLangSegmentsUI(lang) {
  document.querySelectorAll('.lang-segment').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ---- Sound Control (Equalizer FX Visualizer) ----
function setupSoundControl() {
  const soundBtn = document.getElementById('btn-sound-toggle');
  const label = document.getElementById('sound-text-label');

  const updateSoundUI = () => {
    if (soundBtn) {
      if (sound.isEnabled()) {
        soundBtn.classList.add('active');
        soundBtn.classList.remove('muted');
        if (label) label.textContent = 'FX ON';
      } else {
        soundBtn.classList.remove('active');
        soundBtn.classList.add('muted');
        if (label) label.textContent = 'FX OFF';
      }
    }
  };

  updateSoundUI();

  soundBtn?.addEventListener('click', () => {
    const newState = sound.toggle();
    updateSoundUI();
    showToast(newState ? t('nav_sound_on') : t('nav_sound_off'), 'info');
  });
}

// ---- Navigation ----
function setupNavigation() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      sound.playClick();
      const page = el.dataset.page;
      navigateTo(page);

      if (page === 'home') {
        renderRetentionSection(
          user,
          (c) => openChallenge(c.id),
          () => openBugHuntModal(user, (u) => { user = u; updateNavbar(user, getUserRank(user)); }),
          () => openStreakModal(user, () => openDailyChallenge())
        );
      }
      if (page === 'courses') renderCoursesPage();
      if (page === 'playground') renderPlaygroundPage();
      if (page === 'challenges') renderChallengesPage();
      if (page === 'duel') renderDuelPage();
      if (page === 'quests') renderQuestsPage();
      if (page === 'profile') renderProfilePage();
      if (page === 'leaderboard') renderLeaderboardPage();

      document.querySelector('.nav-links')?.classList.remove('open');
    });
  });

  // PRO Modal Button in Navbar
  document.getElementById('nav-btn-pro')?.addEventListener('click', () => {
    sound.playClick();
    openProModal(user, (updatedUser) => {
      user = updatedUser;
      updateNavbar(user, getUserRank(user));
      renderProfilePage();
    });
  });

  // Gems Shop Pill in Navbar
  document.getElementById('nav-gems-pill')?.addEventListener('click', () => {
    sound.playClick();
    openShopModal(user, (updatedUser) => {
      user = updatedUser;
      updateNavbar(user, getUserRank(user));
      renderProfilePage();
    });
  });

  // Hero PRO CTA
  document.getElementById('hero-pro-btn')?.addEventListener('click', () => {
    sound.playClick();
    openProModal(user, (updatedUser) => {
      user = updatedUser;
      updateNavbar(user, getUserRank(user));
      renderProfilePage();
    });
  });

  // Hero Start Button
  document.getElementById('hero-start-btn')?.addEventListener('click', () => {
    sound.playClick();
    navigateTo('challenges');
    renderChallengesPage();
    const challenges = getChallenges();
    const firstUnsolved = challenges.find(c => !isSolved(user, c.id));
    if (firstUnsolved) openChallenge(firstUnsolved.id);
  });

  document.getElementById('hero-courses-btn')?.addEventListener('click', () => {
    sound.playClick();
    navigateTo('courses');
    renderCoursesPage();
  });

  document.getElementById('hero-duel-btn')?.addEventListener('click', () => {
    sound.playClick();
    navigateTo('duel');
    renderDuelPage();
  });

  document.getElementById('hero-explore-btn')?.addEventListener('click', () => {
    sound.playClick();
    navigateTo('challenges');
    renderChallengesPage();
  });

  document.getElementById('back-to-challenges')?.addEventListener('click', () => {
    sound.playClick();
    stopTimer();
    navigateTo('challenges');
    renderChallengesPage();
  });

  document.getElementById('btn-exit-challenge')?.addEventListener('click', () => {
    sound.playClick();
    stopTimer();
    navigateTo('challenges');
    renderChallengesPage();
  });
}

// ---- Timer ----
function startTimer() {
  stopTimer();
  challengeSeconds = 0;
  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) timerDisplay.textContent = '00:00';

  challengeTimerInterval = setInterval(() => {
    challengeSeconds++;
    const mins = String(Math.floor(challengeSeconds / 60)).padStart(2, '0');
    const secs = String(challengeSeconds % 60).padStart(2, '0');
    if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopTimer() {
  if (challengeTimerInterval) {
    clearInterval(challengeTimerInterval);
    challengeTimerInterval = null;
  }
}

// ---- Challenges Page ----
function renderChallengesPage() {
  const challenges = filterChallenges({
    difficulty: document.getElementById('filter-difficulty')?.value || 'all',
    language: document.getElementById('filter-language')?.value || 'all',
    status: document.getElementById('filter-status')?.value || 'all',
    search: document.getElementById('filter-search')?.value || '',
  }, user.solvedChallenges);

  renderChallenges(challenges, user, (challenge) => openChallenge(challenge.id));
}

function setupFilters() {
  ['filter-difficulty', 'filter-language', 'filter-status'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      sound.playClick();
      renderChallengesPage();
    });
  });

  document.getElementById('filter-search')?.addEventListener('input', renderChallengesPage);
}

// ---- Open Challenge ----
async function openChallenge(challengeId) {
  currentChallenge = getChallenge(challengeId);
  if (!currentChallenge) return;

  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    if (!currentChallenge.languages[currentLanguage]) {
      currentLanguage = 'javascript';
      langSelect.value = 'javascript';
    } else {
      langSelect.value = currentLanguage;
    }
  }

  navigateTo('challenge-detail', false);
  renderChallengeDetail(currentChallenge, currentLanguage);
  startTimer();

  // Reset test tab
  switchEditorBottomTab('tests');
  document.getElementById('test-results-list').innerHTML = `
    <div class="test-placeholder">${t('test_placeholder')}</div>
  `;
  document.getElementById('test-summary').textContent = '';

  // Monaco Editor
  try {
    await loadMonaco();
    const container = document.getElementById('editor-container');
    if (!container) {
      console.error('Editor container not found');
      return;
    }
    const rawSaved = getSolution(currentChallenge.id, currentLanguage);
    const solCode = currentChallenge.languages[currentLanguage]?.solution || '';
    const initialCode = (rawSaved && rawSaved.trim() !== solCode.trim())
      ? rawSaved
      : (currentChallenge.languages[currentLanguage]?.initialCode || '// Write your code here');

    createEditor(container, initialCode, currentLanguage);
    focusEditor();
  } catch (err) {
    console.error('Failed to load editor:', err);
    showToast('Editor yuklashda xatolik yuz berdi', 'error');
  }
}

function renderChallengeDetail(challenge, language) {
  const diffColor = getDifficultyColor(challenge.difficulty);

  const rankEl = document.getElementById('detail-rank');
  rankEl.textContent = `${challenge.difficulty} kyu`;
  rankEl.className = `challenge-rank-badge rank-badge ${diffColor}`;

  document.getElementById('detail-category').textContent = challenge.category || 'General';
  document.getElementById('detail-title').innerHTML = challenge.title + (challenge.isPremium ? ' <span class="challenge-premium-badge" style="font-size: 14px; vertical-align: middle; margin-left: 10px;">👑 PRO</span>' : '');

  // Challenge Description (What the problem is about)
  const descEl = document.getElementById('detail-description');
  if (descEl) {
    const rawDesc = challenge.description || '';
    const descHtml = challenge.descriptionHtml || parseMarkdown(rawDesc);
    descEl.innerHTML = descHtml || '<p>Ushbu masala uchun batafsil tavsif tayyorlanmoqda.</p>';
  }

  // Examples
  const examplesEl = document.getElementById('detail-examples');
  if (challenge.examples && challenge.examples.length > 0) {
    examplesEl.innerHTML = `
      <h3 style="font-size: 15px; margin-bottom: 10px;">📋 ${t('detail_examples')}</h3>
      ${challenge.examples.map(ex => `
        <div class="example-block">
          <div><span class="example-label">Input:</span> <span class="example-value">${ex.input}</span></div>
          <div><span class="example-label">Output:</span> <span class="example-value">${ex.output}</span></div>
          ${ex.explanation ? `<div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">💡 ${ex.explanation}</div>` : ''}
        </div>
      `).join('')}
    `;
  } else {
    examplesEl.innerHTML = '';
  }

  // XP info
  document.getElementById('detail-xp-info').innerHTML = `
    <span>⚡ <strong>+${challenge.xpReward} XP</strong> — ${t('detail_xp_gain')}</span>
  `;
}

// ---- Editor Controls ----
function setupEditorControls() {
  document.getElementById('language-select')?.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    sound.playClick();
    if (currentChallenge) {
      const savedCode = getSolution(currentChallenge.id, currentLanguage);
      const code = savedCode || currentChallenge.languages[currentLanguage]?.initialCode || '// Code here';
      setEditorLanguage(currentLanguage);
      setEditorValue(code);
    }
  });

  document.getElementById('btn-format')?.addEventListener('click', () => {
    sound.playClick();
    formatCode();
    showToast(t('btn_format'), 'info');
  });

  document.getElementById('btn-reset')?.addEventListener('click', () => {
    if (!currentChallenge) return;
    sound.playClick();
    const defaultCode = currentChallenge.languages[currentLanguage]?.initialCode || '';
    setEditorValue(defaultCode);
    showToast(t('btn_reset'), 'warning');
  });

  document.getElementById('btn-run')?.addEventListener('click', () => runCurrentTests(false));
  document.getElementById('btn-submit')?.addEventListener('click', () => runCurrentTests(true));

  // Bottom Tabs
  document.querySelectorAll('.tab-header-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      switchEditorBottomTab(btn.dataset.tab);
    });
  });
}

function switchEditorBottomTab(tabName) {
  document.querySelectorAll('.tab-header-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === `pane-${tabName}`);
  });
}

// ---- Test Execution ----
async function runCurrentTests(isSubmit = false) {
  if (isRunning || !currentChallenge) return;

  const code = getEditorValue();
  if (!code.trim()) {
    showToast('Iltimos, avval kod yozing!', 'warning');
    return;
  }

  saveSolution(currentChallenge.id, currentLanguage, code);

  isRunning = true;
  sound.playRun();
  switchEditorBottomTab('tests');

  const testsList = document.getElementById('test-results-list');
  testsList.innerHTML = `<div class="test-loading">⏳ ${t('test_running')}</div>`;

  const tests = currentChallenge.languages[currentLanguage]?.tests || [];

  try {
    const result = await runTests(code, tests, currentLanguage);
    const passedCount = result.passedCount ?? result.results.filter(r => r.passed).length;
    const totalCount = result.totalCount ?? result.results.length;

    // Synchronize player progress in duel if active
    if (isDuelActive) {
      const progressPercent = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;
      duelManager.updatePlayerProgress(progressPercent);
    }

    testsList.innerHTML = result.results.map((r, i) => {
      const testObj = r.test || {};
      const labelText = r.label || testObj.label || testObj.description || `Test #${i + 1}`;
      const inputStr = testObj.input !== undefined ? String(testObj.input) : '';
      const expectedStr = r.expected !== undefined ? String(r.expected) : '';
      const actualStr = r.actual !== undefined ? String(r.actual) : '';

      return `
      <div class="test-result-item ${r.passed ? 'passed' : 'failed'}">
        <span class="test-status-icon">${r.passed ? '✅' : '❌'}</span>
        <div class="test-content">
          <div class="test-header-row">
            <strong>${labelText}</strong>
            <span class="test-badge ${r.passed ? 'pass-badge' : 'fail-badge'}">${r.passed ? 'PASSED' : 'FAILED'}</span>
          </div>
          <div class="test-detail">
            ${inputStr ? `<span>Input: <code>${inputStr.replace(/</g, '&lt;')}</code></span>` : ''}
            ${expectedStr ? `<span>Expected: <code>${expectedStr.replace(/</g, '&lt;')}</code></span>` : ''}
            ${!r.passed ? `<span class="text-fail">Got: <code>${actualStr.replace(/</g, '&lt;')}</code></span>` : ''}
          </div>
          ${r.error ? `<div class="text-fail" style="margin-top: 6px;">⚠️ ${r.error}</div>` : ''}
        </div>
      </div>
    `;
    }).join('');

    const summaryEl = document.getElementById('test-summary');
    if (result.allPassed) {
      summaryEl.textContent = `✅ ${passedCount}/${totalCount} Passed (Barcha testlar muvaffaqiyatli!)`;
      summaryEl.className = 'test-summary pass';
      sound.playPass();

      if (isSubmit) {
        handleChallengeSolved();
      }
    } else {
      summaryEl.textContent = `❌ ${passedCount}/${totalCount} Passed`;
      summaryEl.className = 'test-summary fail';
      sound.playFail();
      user.totalAttempts = (user.totalAttempts || 0) + 1;
      saveUser(user);
    }
  } catch (err) {
    testsList.innerHTML = `<div class="test-result-item failed">❌ Xatolik: ${err.message}</div>`;
    sound.playFail();
  } finally {
    isRunning = false;
  }
}

// ---- Challenge Solved Handler ----
function handleChallengeSolved() {
  stopTimer();
  sound.playVictory();
  launchConfetti();

  const wasAlreadySolved = isSolved(user, currentChallenge.id);

  markSolved(user, currentChallenge.id, challengeSeconds);
  recordQuestProgress('solve_count', 1, user);
  if (challengeSeconds <= 120) {
    recordQuestProgress('speed_solve', 1, user);
  }
  if (currentChallenge.difficulty <= 6) {
    recordQuestProgress('hard_kata', 1, user);
  }

  // If in an active duel, finalize player victory
  if (isDuelActive) {
    duelManager.playerSolved();
  }

  let earnedXP = 0;
  if (!wasAlreadySolved) {
    earnedXP = currentChallenge.xpReward || 10;
    const rankUp = addXP(user, earnedXP);
    if (rankUp.rankedUp || rankUp.ranked) {
      setTimeout(() => showRankUpModal(rankUp.newRank), 1000);
    }
  }

  const newBadges = checkBadges(user);
  if (newBadges.length > 0) {
    newBadges.forEach(b => {
      sound.playBadge();
      showToast(`🏅 Yangi nishon ochildi: "${b.name}"!`, 'success');
    });
  }

  saveUser(user);
  updateNavbar(user, getUserRank(user));

  showSuccessModal(
    t('modal_success_title'),
    t('modal_success_subtitle'),
    [
      { label: 'Vaqt', value: `${challengeSeconds}s` },
      { label: 'XP', value: `+${earnedXP} XP` },
      { label: 'Daraja', value: `${getUserRank(user).kyu} kyu` },
    ]
  );
}

// ---- AI Copilot & Mentor Drawer ----
export function toggleAICopilot() {
  const drawer = document.getElementById('ai-copilot-drawer');
  const backdrop = document.getElementById('ai-drawer-backdrop');
  if (drawer) {
    const isOpening = !drawer.classList.contains('active');
    drawer.classList.toggle('active');
    if (backdrop) backdrop.classList.toggle('active', isOpening);
    sound.playClick();
    if (isOpening) {
      document.getElementById('ai-drawer-input')?.focus();
      updateAICopilotHeader();
    }
  }
}

export function openAICopilot() {
  const drawer = document.getElementById('ai-copilot-drawer');
  const backdrop = document.getElementById('ai-drawer-backdrop');
  if (drawer) {
    drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.getElementById('ai-drawer-input')?.focus();
    updateAICopilotHeader();
  }
}

export function closeAICopilot() {
  document.getElementById('ai-copilot-drawer')?.classList.remove('active');
  document.getElementById('ai-drawer-backdrop')?.classList.remove('active');
}

function updateAICopilotHeader() {
  const providerId = getActiveProviderId();
  const provider = AI_PROVIDERS[providerId] || AI_PROVIDERS.gemini;
  const badgeEl = document.getElementById('ai-current-provider-badge');
  const selectEl = document.getElementById('ai-provider-select');

  if (badgeEl) {
    badgeEl.textContent = provider.shortName || provider.name;
  }
  if (selectEl && selectEl.value !== providerId) {
    selectEl.value = providerId;
  }
}

function renderAIMarkdown(text) {
  if (!text) return '';
  let str = String(text);

  // 1. Code blocks: ```lang\ncode\n```
  str = str.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const displayLang = (lang || 'CODE').toUpperCase();
    const cleanCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const rawAttr = encodeURIComponent(code.trim());
    return `
      <div class="ai-code-block-wrapper">
        <div class="ai-code-block-header">
          <span>💻 ${displayLang}</span>
          <button class="ai-copy-code-btn" data-code="${rawAttr}">
            📋 <span class="copy-text">${t('ai_copy_code') || 'Nusxa olish'}</span>
          </button>
        </div>
        <pre><code class="language-${lang || 'text'}">${cleanCode.trim()}</code></pre>
      </div>
    `;
  });

  // 2. Inline code: `code`
  str = str.replace(/`([^`]+)`/g, '<code style="background: rgba(168,85,247,0.2); padding: 2px 5px; border-radius: 4px; font-family: monospace; color: #38bdf8;">$1</code>');

  // 3. Bold: **text**
  str = str.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // 4. Italic: *text*
  str = str.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  // 5. Lists & newlines
  const lines = str.split('\n');
  const mapped = lines.map(line => {
    const t = line.trim();
    if (t.startsWith('- ') || t.startsWith('• ') || t.startsWith('* ')) {
      return `<div style="padding-left: 12px; margin: 3px 0;">• ${t.substring(2)}</div>`;
    }
    return line;
  });

  return mapped.join('<br>').replace(/(<br>\s*){3,}/g, '<br><br>');
}

function appendAIDrawerMessage(htmlOrMarkdown, isUser = false) {
  const container = document.getElementById('ai-drawer-messages');
  if (!container) return null;

  const bubble = document.createElement('div');
  bubble.className = `ai-msg-bubble ${isUser ? 'ai-bubble-user' : 'ai-bubble-assistant'}`;

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const senderName = isUser ? (user?.name || t('duel_player_you') || 'Siz') : 'CodeDuel AI Copilot';
  const avatar = isUser ? (user?.avatar || '🥷') : '🤖';

  const contentHtml = isUser
    ? htmlOrMarkdown.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
    : renderAIMarkdown(htmlOrMarkdown);

  bubble.innerHTML = `
    <div class="ai-msg-avatar">${avatar}</div>
    <div class="ai-msg-body">
      <div class="ai-msg-header">
        <span class="ai-msg-sender">${senderName}</span>
        <span class="ai-msg-time">${timeStr}</span>
      </div>
      <div class="ai-msg-text">${contentHtml}</div>
    </div>
  `;

  container.appendChild(bubble);
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  return bubble;
}

function setAIThinking(isThinking) {
  const el = document.getElementById('ai-thinking-bubble');
  const statusEl = document.getElementById('ai-status-text');
  if (el) {
    el.style.display = isThinking ? 'flex' : 'none';
    if (isThinking) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  if (statusEl) {
    statusEl.textContent = isThinking ? (t('ai_status_thinking') || 'O\'ylamoqda...') : (t('ai_status_online') || 'Online');
  }
}

function setupAIMentor() {
  // Floating trigger button in arena
  document.getElementById('btn-floating-ai')?.addEventListener('click', () => {
    toggleAICopilot();
  });

  // Top Editor "AI Maslahat" button
  document.getElementById('btn-ai-hint')?.addEventListener('click', () => {
    sound.playClick();
    openAICopilot();
    // Auto-trigger level 1 hint if chat has only greeting
    const messages = document.getElementById('ai-drawer-messages');
    if (messages && messages.children.length <= 1) {
      triggerAIAction('hint_1');
    }
  });

  // Drawer actions: Close, Expand, Clear, Settings
  document.getElementById('ai-btn-close-drawer')?.addEventListener('click', () => {
    sound.playClick();
    closeAICopilot();
  });
  document.getElementById('ai-drawer-backdrop')?.addEventListener('click', () => {
    sound.playClick();
    closeAICopilot();
  });
  document.getElementById('ai-btn-expand-drawer')?.addEventListener('click', () => {
    const drawer = document.getElementById('ai-copilot-drawer');
    drawer?.classList.toggle('expanded');
    sound.playClick();
  });
  document.getElementById('ai-btn-clear-chat')?.addEventListener('click', () => {
    const container = document.getElementById('ai-drawer-messages');
    if (container) {
      sound.playClick();
      container.innerHTML = `
        <div class="ai-msg-bubble ai-bubble-assistant">
          <div class="ai-msg-avatar">🤖</div>
          <div class="ai-msg-body">
            <div class="ai-msg-header">
              <span class="ai-msg-sender">CodeDuel AI Copilot</span>
              <span class="ai-msg-time">Hozir</span>
            </div>
            <div class="ai-msg-text">
              Chat tozalandi! Masala bo'yicha savolingizni yozing yoki yuqoridagi tezkor tugmalardan foydalaning.
            </div>
          </div>
        </div>
      `;
    }
  });

  // Model & Provider select dropdown inside drawer
  const providerSelect = document.getElementById('ai-provider-select');
  if (providerSelect) {
    providerSelect.value = getActiveProviderId();
    providerSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      const premiumProviders = ['openrouter', 'gemini', 'groq'];
      showToast(`AI Provayder almashtirildi: ${AI_PROVIDERS[selected]?.name || selected}`, 'info');
    });
  }
  // Quick Action Chips
  document.querySelectorAll('.ai-action-chips-bar .ai-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.dataset.action;
      if (action) {
        triggerAIAction(action);
      }
    });
  });

  // Chat message send (Button & Textarea Enter)
  document.getElementById('ai-drawer-send')?.addEventListener('click', handleAICopilotSend);
  const textarea = document.getElementById('ai-drawer-input');
  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleAICopilotSend();
      }
    });
    // Auto resize
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    });
  }

  // Code Copy Button delegation inside messages container
  document.getElementById('ai-drawer-messages')?.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.ai-copy-code-btn');
    if (copyBtn) {
      const encodedCode = copyBtn.dataset.code;
      if (encodedCode) {
        const rawCode = decodeURIComponent(encodedCode);
        navigator.clipboard.writeText(rawCode).then(() => {
          const textEl = copyBtn.querySelector('.copy-text') || copyBtn;
          const orig = textEl.textContent;
          textEl.textContent = t('ai_code_copied') || '✅ Nusxalandi!';
          sound.playClick();
          setTimeout(() => {
            textEl.textContent = orig;
          }, 2000);
        });
      }
    }
  });

  // Settings modal triggers
  document.getElementById('ai-btn-open-settings')?.addEventListener('click', openAISettingsModal);
  document.getElementById('ai-btn-settings')?.addEventListener('click', openAISettingsModal);

  // Setup Multi-Provider Modal interactions
  setupAISettingsModal();
}

async function triggerAIAction(actionType) {
  if (!currentChallenge) {
    showToast('Avval masalani oching', 'warning');
    return;
  }

  const actionPrompts = {
    hint_1: 'Masalani yechish bo\'yicha 1-Bosqich (Asosiy G\'oya) maslahatini bering.',
    hint_2: 'Masalani yechish bo\'yicha 2-Bosqich (Mantiq va Cheklovlar) maslahatini bering.',
    hint_3: 'Masalani yechish bo\'yicha 3-Bosqich (Pseudo-kod va Tuzilma) maslahatini bering.',
    review: 'Kodingizni tahlil qiling va Big-O vaqt/xotira murakkabligini ko\'rsating.',
    debug: 'Hozirgi koddagi mantiqiy yoki sintaktik xatolarni topishga yordam bering.',
    optimize: 'Kodni qanday qilib yanada tezkor, optimal va toza qilish mumkin?',
    explain: 'Masalaning mohiyatini sodda va tushunarli qilib tushuntirib bering.'
  };

  const prompt = actionPrompts[actionType] || 'Maslahat bering';
  appendAIDrawerMessage(prompt, true);

  const code = getEditorValue();
  setAIThinking(true);

  try {
    const answer = await askAIMentor(prompt, currentChallenge, code, currentLanguage, actionType);
    setAIThinking(false);
    appendAIDrawerMessage(answer, false);
  } catch (err) {
    setAIThinking(false);
    appendAIDrawerMessage(`❌ Xatolik yuz berdi: ${err.message}`, false);
  }
}

async function handleAICopilotSend() {
  const input = document.getElementById('ai-drawer-input');
  if (!input || !input.value.trim()) return;
  if (!currentChallenge) {
    showToast('Avval masalani tanlang', 'warning');
    return;
  }

  const question = input.value.trim();
  input.value = '';
  input.style.height = '42px';

  appendAIDrawerMessage(question, true);
  const code = getEditorValue();
  setAIThinking(true);

  try {
    const answer = await askAIMentor(question, currentChallenge, code, currentLanguage, 'chat');
    setAIThinking(false);
    appendAIDrawerMessage(answer, false);
  } catch (err) {
    setAIThinking(false);
    appendAIDrawerMessage(`❌ Xatolik yuz berdi: ${err.message}`, false);
  }
}

function openAISettingsModal() {
  const modal = document.getElementById('ai-settings-modal');
  if (!modal) return;

  const currentProvider = getActiveProviderId() || 'mistral';

  // Synchronize tabs with active provider
  document.querySelectorAll('.ai-modal-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === currentProvider);
  });
  document.querySelectorAll('.ai-modal-tab-pane').forEach(pane => {
    pane.style.display = pane.id === `modal-pane-${currentProvider}` ? 'block' : 'none';
  });

  // Populate inputs with current keys and models
  const groqInput = document.getElementById('modal-groq-key-input');
  const mistralInput = document.getElementById('modal-mistral-key-input');
  const hfInput = document.getElementById('modal-huggingface-key-input');
  const openrouterInput = document.getElementById('modal-openrouter-key-input');
  const geminiInput = document.getElementById('modal-gemini-key-input');

  if (groqInput) groqInput.value = getProviderApiKey('groq');
  if (mistralInput) mistralInput.value = getProviderApiKey('mistral');
  if (hfInput) hfInput.value = getProviderApiKey('huggingface');
  if (openrouterInput) openrouterInput.value = getProviderApiKey('openrouter');
  if (geminiInput) geminiInput.value = getProviderApiKey('gemini');

  const groqModel = document.getElementById('modal-groq-model-select');
  const mistralModel = document.getElementById('modal-mistral-model-select');
  const hfModel = document.getElementById('modal-huggingface-model-select');
  const openrouterModel = document.getElementById('modal-openrouter-model-select');
  const geminiModel = document.getElementById('modal-gemini-model-select');

  if (groqModel) groqModel.value = getActiveModelForProvider('groq');
  if (mistralModel) mistralModel.value = getActiveModelForProvider('mistral');
  if (hfModel) hfModel.value = getActiveModelForProvider('huggingface');
  if (openrouterModel) openrouterModel.value = getActiveModelForProvider('openrouter');
  if (geminiModel) geminiModel.value = getActiveModelForProvider('gemini');

  // Reset status box
  const statusBox = document.getElementById('ai-test-status-box');
  if (statusBox) statusBox.style.display = 'none';

  modal.classList.add('active');
}

function setupAISettingsModal() {
  let activeModalTab = getActiveProviderId() || 'mistral';

  // Tab switching
  document.querySelectorAll('.ai-modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const tab = btn.dataset.tab;
      activeModalTab = tab;

      document.querySelectorAll('.ai-modal-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.ai-modal-tab-pane').forEach(p => p.style.display = 'none');
      const pane = document.getElementById(`modal-pane-${tab}`);
      if (pane) pane.style.display = 'block';

      const statusBox = document.getElementById('ai-test-status-box');
      if (statusBox) statusBox.style.display = 'none';
    });
  });

  // Test connection button
  document.getElementById('btn-test-ai-key')?.addEventListener('click', async () => {
    sound.playClick();
    const statusBox = document.getElementById('ai-test-status-box');
    const iconEl = document.getElementById('ai-test-status-icon');
    const msgEl = document.getElementById('ai-test-status-msg');

    if (!statusBox) return;
    statusBox.style.display = 'flex';
    statusBox.className = 'ai-test-status-box';
    if (iconEl) iconEl.textContent = '⏳';
    if (msgEl) msgEl.textContent = 'Provayder serveri bilan ulanish tekshirilmoqda...';

    let customKey = '';
    let customModel = '';
    if (activeModalTab === 'groq') {
      customKey = document.getElementById('modal-groq-key-input')?.value;
      customModel = document.getElementById('modal-groq-model-select')?.value;
    } else if (activeModalTab === 'mistral') {
      customKey = document.getElementById('modal-mistral-key-input')?.value;
      customModel = document.getElementById('modal-mistral-model-select')?.value;
    } else if (activeModalTab === 'huggingface') {
      customKey = document.getElementById('modal-huggingface-key-input')?.value;
      customModel = document.getElementById('modal-huggingface-model-select')?.value;
    } else if (activeModalTab === 'openrouter') {
      customKey = document.getElementById('modal-openrouter-key-input')?.value;
      customModel = document.getElementById('modal-openrouter-model-select')?.value;
    } else if (activeModalTab === 'gemini') {
      customKey = document.getElementById('modal-gemini-key-input')?.value;
      customModel = document.getElementById('modal-gemini-model-select')?.value;
    }

    const res = await testProviderConnection(activeModalTab, customKey, customModel);

    if (res.success) {
      statusBox.className = 'ai-test-status-box success';
      if (iconEl) iconEl.textContent = '✅';
      if (msgEl) msgEl.textContent = `${res.message} (${res.latencyMs || 0}ms)`;
    } else {
      statusBox.className = 'ai-test-status-box error';
      if (iconEl) iconEl.textContent = '❌';
      if (msgEl) msgEl.textContent = res.message;
    }
  });

  // Save button
  document.getElementById('btn-save-ai-settings')?.addEventListener('click', () => {
    sound.playClick();
    const groqKey = document.getElementById('modal-groq-key-input')?.value;
    const mistralKey = document.getElementById('modal-mistral-key-input')?.value;
    const hfKey = document.getElementById('modal-huggingface-key-input')?.value;
    const openrouterKey = document.getElementById('modal-openrouter-key-input')?.value;
    const geminiKey = document.getElementById('modal-gemini-key-input')?.value;

    if (groqKey !== undefined) saveProviderApiKey('groq', groqKey);
    if (mistralKey !== undefined) saveProviderApiKey('mistral', mistralKey);
    if (hfKey !== undefined) saveProviderApiKey('huggingface', hfKey);
    if (openrouterKey !== undefined) saveProviderApiKey('openrouter', openrouterKey);
    if (geminiKey !== undefined) saveProviderApiKey('gemini', geminiKey);

    const groqModel = document.getElementById('modal-groq-model-select')?.value;
    const mistralModel = document.getElementById('modal-mistral-model-select')?.value;
    const hfModel = document.getElementById('modal-huggingface-model-select')?.value;
    const openrouterModel = document.getElementById('modal-openrouter-model-select')?.value;
    const geminiModel = document.getElementById('modal-gemini-model-select')?.value;

    if (groqModel) setActiveModelForProvider('groq', groqModel);
    if (mistralModel) setActiveModelForProvider('mistral', mistralModel);
    if (hfModel) setActiveModelForProvider('huggingface', hfModel);
    if (openrouterModel) setActiveModelForProvider('openrouter', openrouterModel);
    if (geminiModel) setActiveModelForProvider('gemini', geminiModel);

    // Set active provider
    setActiveProviderId(activeModalTab);
    updateAICopilotHeader();

    showToast(`AI Saqlandi: ${AI_PROVIDERS[activeModalTab]?.name || activeModalTab}`, 'success');
    document.getElementById('ai-settings-modal')?.classList.remove('active');
  });

  // Close modal buttons
  const close = () => {
    document.getElementById('ai-settings-modal')?.classList.remove('active');
  };
  document.getElementById('btn-close-ai-modal')?.addEventListener('click', close);
  document.getElementById('btn-close-ai-modal-icon')?.addEventListener('click', close);
  document.getElementById('ai-settings-modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) close();
  });
}

// ---- Custom Test Runner ----
function setupCustomTestRunner() {
  document.getElementById('btn-run-custom')?.addEventListener('click', async () => {
    if (!currentChallenge) return;
    const inputStr = document.getElementById('custom-test-input')?.value || '';
    const code = getEditorValue();
    const outputEl = document.getElementById('custom-test-output');

    if (!inputStr.trim()) {
      showToast('Kiruvchi ma\'lumotni kiriting', 'warning');
      return;
    }

    outputEl.textContent = '⏳ Bajarilmoqda...';
    outputEl.className = 'custom-test-res';

    try {
      const res = await runCustomTest(code, inputStr, currentLanguage);
      if (res.error) {
        outputEl.textContent = `❌ Xato: ${res.error}`;
        outputEl.className = 'custom-test-res error';
      } else {
        const outStr = (res.output !== undefined && res.output !== '') ? res.output : (res.result !== undefined ? String(res.result) : '(Bo\'sh natija)');
        outputEl.textContent = `✅ Natija:\n${outStr}`;
        outputEl.className = 'custom-test-res success';
      }
    } catch (err) {
      outputEl.textContent = `❌ Xato: ${err.message}`;
      outputEl.className = 'custom-test-res error';
    }
  });
}

// ---- 1v1 AI Duel Arena ----
function setupDuelArena() {
  let selectedBotId = 'buggy-bot';

  renderDuelBots((botId) => {
    selectedBotId = botId;
  });

  document.getElementById('btn-launch-duel')?.addEventListener('click', () => {
    sound.playClick();
    startDuelMatch(selectedBotId);
  });

  document.getElementById('btn-duel-quit')?.addEventListener('click', () => {
    duelManager.cancelDuel();
    isDuelActive = false;
    document.getElementById('duel-battlefield').style.display = 'none';
    document.getElementById('duel-bot-selection').style.display = 'block';
    showToast('Duel bekor qilindi', 'info');
  });

  document.getElementById('btn-duel-open-challenge')?.addEventListener('click', () => {
    if (duelManager.activeDuel?.challenge) {
      openChallenge(duelManager.activeDuel.challenge.id);
    }
  });
}

function renderDuelPage() {
  document.getElementById('duel-bot-selection').style.display = 'block';
  document.getElementById('duel-battlefield').style.display = 'none';
}

function startDuelMatch(botId) {
  const bot = AI_BOTS.find(b => b.id === botId);
  if (!bot) return;

  if ((botId === 'algo-master' || botId === 'quantum-ai') && !isUserPro(user)) {
    showToast(`Ushbu ${bot.name} botiga qarshi o'ynash uchun PRO a'zolik kerak!`, 'warning');
    openProModal(user, (updatedUser) => {
      user = updatedUser;
      updateNavbar(user, getUserRank(user));
      if (isUserPro(user)) {
        startDuelMatch(botId); // retry
      }
    });
    return;
  }

  const challenges = getChallenges();
  const availableChallenges = challenges.filter(c => !c.isPremium || isUserPro(user));
  const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];

  document.getElementById('duel-bot-selection').style.display = 'none';
  document.getElementById('duel-battlefield').style.display = 'block';

  document.getElementById('duel-player-avatar').textContent = user.avatar || '🥷';
  document.getElementById('duel-player-name').textContent = user.name;
  document.getElementById('duel-bot-avatar').textContent = bot.avatar;
  document.getElementById('duel-bot-name').textContent = bot.name;

  document.getElementById('player-duel-progress').style.width = '0%';
  document.getElementById('bot-duel-progress').style.width = '0%';
  document.getElementById('bot-duel-status').textContent = 'AI hisoblamoqda...';

  isDuelActive = true;

  duelManager.startDuel(
    botId,
    randomChallenge,
    (tick) => {
      document.getElementById('bot-duel-progress').style.width = `${tick.botProgress}%`;
      document.getElementById('bot-duel-status').textContent = `AI yechmoqda: ${tick.botProgress}% (${tick.elapsed}s)`;
    },
    (result) => {
      isDuelActive = false;
      const isWin = result.winner === 'player';
      recordDuelResult(user, isWin);

      if (isWin) {
        addXP(user, result.bonusXP);
        recordQuestProgress('win_duel', 1, user);
        showToast(`🎉 G'alaba! +${result.bonusXP} XP Duel bonusi berildi!`, 'success');
      } else {
        showToast("💀 AI g'alaba qozondi! Qaytadan urinib ko'ring.", 'error');
      }

      saveUser(user);
      updateNavbar(user, getUserRank(user));
    }
  );

  openChallenge(randomChallenge.id);
  showToast(`⚔️ Duel Boshlandi! Raqib: ${bot.name}`, 'info');
}

// ---- Daily Quests Page ----
function renderQuestsPage() {
  renderQuests(user, () => {
    updateNavbar(user, getUserRank(user));
  });
}

// ---- Profile Page ----
function renderProfilePage() {
  const rank = getUserRank(user);
  const allBadges = getAllBadges();
  const allChallenges = getChallenges();

  renderProfile(user, rank, allBadges, allChallenges);
}

function setupAvatarPicker() {
  document.getElementById('profile-avatar-btn')?.addEventListener('click', () => {
    openAvatarModal(user, () => {
      renderProfilePage();
    });
  });
}

// ---- Leaderboard Page ----
function renderLeaderboardPage() {
  const data = getLeaderboardData();
  const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'weekly';
  renderLeaderboard(data, activeTab, user);
}

function setupLeaderboardTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderLeaderboardPage();
    });
  });
}

// ---- Modals Setup ----
function setupModals() {
  // Universal backdrop click handler for ANY modal overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        sound.playClick();
      }
    });
  });

  const closeModalById = (id) => {
    sound.playClick();
    document.getElementById(id)?.classList.remove('active');
  };

  // Loot modal
  document.getElementById('btn-close-loot-modal')?.addEventListener('click', () => closeModalById('loot-modal'));
  document.getElementById('btn-close-loot-modal-icon')?.addEventListener('click', () => closeModalById('loot-modal'));

  // Avatar modal
  document.getElementById('avatar-close-btn')?.addEventListener('click', () => closeModalById('avatar-modal'));
  document.getElementById('btn-close-avatar-modal-icon')?.addEventListener('click', () => closeModalById('avatar-modal'));

  // PRO modal
  document.getElementById('btn-close-pro-modal')?.addEventListener('click', () => closeModalById('pro-pricing-modal'));

  // Shop modal
  document.getElementById('btn-close-shop-modal')?.addEventListener('click', () => closeModalById('shop-modal'));

  // Payment checkout modal
  document.getElementById('btn-close-payment-modal')?.addEventListener('click', () => closeModalById('payment-checkout-modal'));

  // DevCard modal
  document.getElementById('btn-close-devcard-modal')?.addEventListener('click', () => closeModalById('devcard-modal'));
  document.getElementById('btn-close-bughunt-modal')?.addEventListener('click', () => closeModalById('bughunt-modal'));

  // Success modal
  document.getElementById('success-close-btn')?.addEventListener('click', hideSuccessModal);
  document.getElementById('btn-close-success-modal-icon')?.addEventListener('click', hideSuccessModal);

  // Rankup modal
  document.getElementById('rankup-continue-btn')?.addEventListener('click', hideRankUpModal);
  document.getElementById('btn-close-rankup-modal-icon')?.addEventListener('click', hideRankUpModal);

  // Next challenge button
  document.getElementById('success-next-btn')?.addEventListener('click', () => {
    hideSuccessModal();
    const next = getNextChallenge(currentChallenge?.id, user.solvedChallenges);
    if (next) {
      openChallenge(next.id);
    } else {
      navigateTo('challenges');
      renderChallengesPage();
      showToast(t('toast_all_solved'), 'success');
    }
  });
}

// ============================================
// CODDY.TECH COURSES & ROADMAP ORCHESTRATION
// ============================================

let courseEditorInstance = null;
let playgroundEditorInstance = null;

function renderCoursesPage() {
  const allCourses = getCourses();
  
  // Wire Category Filter Buttons
  const filterBtns = document.querySelectorAll('.course-filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      sound.playClick();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      const filtered = filter === 'all' 
        ? allCourses 
        : allCourses.filter(c => c.language === filter || c.id.includes(filter));
      
      renderCoursesCatalog(filtered, user, (course) => openCourseRoadmap(course));
    };
  });

  const catalogEl = document.getElementById('courses-catalog-container');
  const roadmapEl = document.getElementById('course-roadmap-container');
  if (catalogEl) catalogEl.style.display = 'block';
  if (roadmapEl) roadmapEl.style.display = 'none';

  renderCoursesCatalog(allCourses, user, (course) => openCourseRoadmap(course));
}

function openCourseRoadmap(course) {
  currentCourse = course;
  renderCourseRoadmap(
    course,
    user,
    (c, lesson) => openLesson(c, lesson),
    () => renderCoursesPage(),
    (u, c) => openDevCardModal(u)
  );
}

function openLesson(course, lesson) {
  currentCourse = course;
  currentLesson = lesson;
  navigateTo('lesson', false);

  const container = document.getElementById('lesson-monaco-container');
  const fallback = document.getElementById('lesson-fallback-editor');

  const rawSaved = localStorage.getItem(`lesson_code_${course.id}_${lesson.id}`);
  const solCode = lesson.solution || '';
  const savedCode = (rawSaved && rawSaved.trim() !== solCode.trim())
    ? rawSaved
    : lesson.initialCode;

  try {
    if (window.monaco && container) {
      container.innerHTML = '';
      const lessonLang = lesson.language || course.language || 'javascript';
      courseEditorInstance = monaco.editor.create(container, {
        value: savedCode,
        language: lessonLang === 'html' ? 'html' : lessonLang === 'python' ? 'python' : 'javascript',
        theme: 'codeduel-dark',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        automaticLayout: true,
        minimap: { enabled: false },
        lineNumbers: 'on',
        tabSize: 2
      });
      courseEditorInstance.onDidChangeModelContent(() => {
        const val = courseEditorInstance.getValue();
        localStorage.setItem(`lesson_code_${course.id}_${lesson.id}`, val);
      });
    } else if (fallback) {
      fallback.value = savedCode;
      fallback.oninput = () => {
        localStorage.setItem(`lesson_code_${course.id}_${lesson.id}`, fallback.value);
      };
    }
  } catch (err) {
    if (fallback) fallback.value = savedCode;
  }

  renderLessonPlayer(course, lesson, user, {
    onRunCode: () => runLessonCode(false),
    onCheckSolution: () => runLessonCode(true),
    onResetCode: () => {
      const code = lesson.initialCode;
      if (courseEditorInstance) courseEditorInstance.setValue(code);
      if (fallback) fallback.value = code;
      localStorage.removeItem(`lesson_code_${course.id}_${lesson.id}`);
      showToast("Kod dastlabki holatiga qaytarildi", "info");
    },
    onBackToRoadmap: () => {
      navigateTo('courses', false);
      openCourseRoadmap(course);
    },
    onAskAI: async (l, c, outputEl) => {
      outputEl.style.display = 'block';
      outputEl.textContent = '🤖 AI Murabbiy o\'ylamoqda...';
      try {
        const code = getLessonCurrentCode();
        const prompt = `Foydalanuvchi Coddy interaktiv darsida o'qiyapti.\nKurs: "${c.title}"\nDars: "${l.title}"\nNazariya: "${l.theory}"\nVazifa: "${l.task}"\nFoydalanuvchi kodi:\n${code}\n\nIltimos, foydalanuvchiga to'g'ridan-to'g'ri to'liq javobni bermasdan, uning kodi nima uchun xato ekanligini va qanday to'g'irlash kerakligini samimiy, do'stona va sodda qilib o'zbek tilida tushuntirib bering (1-2 ta qisqa xatboshi).`;
        const res = await askAIMentor(prompt);
        outputEl.innerHTML = `<strong>💡 AI Murabbiy Ko'rsatmasi:</strong><br>${res}`;
      } catch (e) {
        outputEl.textContent = 'AI murabbiy bilan bog\'lanishda xatolik. Qaytadan urinib ko\'ring.';
      }
    }
  });
}

function getLessonCurrentCode() {
  if (courseEditorInstance) {
    return courseEditorInstance.getValue();
  }
  const fallback = document.getElementById('lesson-fallback-editor');
  return fallback ? fallback.value : '';
}

async function runLessonCode(isCheck = false) {
  if (!currentLesson || !currentCourse) return;

  const code = getLessonCurrentCode();
  const consoleOutput = document.getElementById('lesson-console-output');
  const lang = currentLesson.language || currentCourse.language;

  if (consoleOutput) {
    consoleOutput.textContent = '⏳ Kod bajarilmoqda...';
    consoleOutput.style.color = 'var(--text-secondary)';
  }

  sound.playRun();

  let output = '';
  let error = null;

  try {
    if (lang === 'javascript' || lang === 'js') {
      let logs = [];
      const mockConsole = {
        log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        error: (...args) => logs.push(args.join(' ')),
        warn: (...args) => logs.push(args.join(' '))
      };
      const fn = new Function('console', code);
      fn(mockConsole);
      output = logs.join('\n').trim();
    } else {
      const execResult = await executeCode(code, lang);
      output = (execResult.output || '').trim();
      error = execResult.error;
    }
  } catch (err) {
    error = err.message;
  }

  if (consoleOutput) {
    if (error) {
      consoleOutput.textContent = `❌ Xatolik:\n${error}`;
      consoleOutput.style.color = '#ef4444';
      sound.playFail();
    } else {
      consoleOutput.textContent = output || '(Bo\'sh chiqish)';
      consoleOutput.style.color = '#00ff88';
    }
  }

  if (!isCheck) return;

  // Perform Step-by-Step Test Checks
  const tests = currentLesson.tests || [];
  let allPassed = true;

  tests.forEach((t, idx) => {
    const chkEl = document.getElementById(`chk-test-${idx}`);
    let passed = false;

    if (t.type === 'output') {
      passed = output.includes(t.expected) || output === t.expected;
    } else if (t.type === 'html') {
      passed = code.includes(t.expected) || output.includes(t.expected);
    } else {
      passed = output.includes(t.expected);
    }

    if (chkEl) {
      if (passed) {
        chkEl.className = 'checklist-item passed';
        const icon = chkEl.querySelector('.chk-icon');
        if (icon) icon.textContent = '✅';
      } else {
        chkEl.className = 'checklist-item failed';
        const icon = chkEl.querySelector('.chk-icon');
        if (icon) icon.textContent = '❌';
        allPassed = false;
      }
    }
  });

  if (tests.length === 0) {
    allPassed = !error && output.length > 0;
  }

  if (allPassed && !error) {
    sound.playVictory();
    const result = completeLesson(user, currentCourse.id, currentLesson.id);
    updateNavbar(user, getUserRank(user));
    showLessonSuccessModal(
      currentCourse,
      currentLesson,
      result,
      () => goToNextLesson(),
      () => {
        navigateTo('courses', false);
        openCourseRoadmap(currentCourse);
      }
    );
  } else {
    sound.playFail();
    showToast("Ba'zi testlar o'tmadi. Kodni tekshirib, qayta urinib ko'ring yoki AI Murabbiydan so'rang!", 'warning');
  }
}

function goToNextLesson() {
  if (!currentCourse || !currentLesson) return;
  const currentIdx = currentCourse.lessons.findIndex(l => l.id === currentLesson.id);
  if (currentIdx !== -1 && currentIdx + 1 < currentCourse.lessons.length) {
    const nextLesson = currentCourse.lessons[currentIdx + 1];
    openLesson(currentCourse, nextLesson);
  } else {
    // Course finished!
    navigateTo('courses', false);
    openCourseRoadmap(currentCourse);
    showToast("🎉 Tabriklaymiz! Kursni to'liq yakunladingiz! 🏆 Rasmiy sertifikatni ko'rishingiz mumkin!", 'success');
  }
}

// ============================================
// CODDY MULTI-LANGUAGE PLAYGROUND
// ============================================

let playgroundInitialized = false;

function renderPlaygroundPage() {
  const container = document.getElementById('pg-editor-container');
  const fallback = document.getElementById('pg-fallback-editor');
  const langSelect = document.getElementById('pg-language-select');
  const templateSelect = document.getElementById('pg-template-select');
  const previewTab = document.getElementById('tab-pg-preview');
  const consoleTab = document.getElementById('tab-pg-console');

  if (langSelect) {
    langSelect.value = playgroundLang;
  }

  updatePlaygroundTemplates(templateSelect, playgroundLang);

  const initialCode = PLAYGROUND_TEMPLATES[playgroundLang]?.[0]?.code || '// Happy coding in Coddy Playground!';

  try {
    if (window.monaco && container) {
      if (playgroundEditorInstance) {
        playgroundEditorInstance.dispose();
      }
      container.innerHTML = '';
      playgroundEditorInstance = monaco.editor.create(container, {
        value: initialCode,
        language: playgroundLang === 'html' ? 'html' : playgroundLang === 'python' ? 'python' : 'javascript',
        theme: 'codeduel-dark',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        automaticLayout: true,
        minimap: { enabled: false },
        lineNumbers: 'on',
        tabSize: 2
      });
    } else if (fallback) {
      fallback.value = initialCode;
    }
  } catch (e) {
    if (fallback) fallback.value = initialCode;
  }

  if (previewTab) {
    previewTab.style.display = playgroundLang === 'html' ? 'inline-block' : 'none';
    if (playgroundLang === 'html') {
      previewTab.click();
    } else {
      consoleTab?.click();
    }
  }

  if (!playgroundInitialized) {
    setupPlaygroundListeners();
    playgroundInitialized = true;
  }
}

function updatePlaygroundTemplates(selectEl, lang) {
  if (!selectEl) return;
  const templates = PLAYGROUND_TEMPLATES[lang] || [];
  selectEl.innerHTML = '<option value="">-- Shablonni tanlang --</option>' + 
    templates.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
}

function getPlaygroundCode() {
  if (playgroundEditorInstance) return playgroundEditorInstance.getValue();
  const fallback = document.getElementById('pg-fallback-editor');
  return fallback ? fallback.value : '';
}

function setPlaygroundCode(code) {
  if (playgroundEditorInstance) playgroundEditorInstance.setValue(code);
  const fallback = document.getElementById('pg-fallback-editor');
  if (fallback) fallback.value = code;
}

function setupPlaygroundListeners() {
  const langSelect = document.getElementById('pg-language-select');
  const templateSelect = document.getElementById('pg-template-select');
  const runBtn = document.getElementById('btn-pg-run');
  const copyBtn = document.getElementById('btn-pg-copy');
  const formatBtn = document.getElementById('btn-pg-format');
  const consoleTab = document.getElementById('tab-pg-console');
  const previewTab = document.getElementById('tab-pg-preview');
  const consoleDisplay = document.getElementById('pg-console-display');
  const previewDisplay = document.getElementById('pg-preview-display');
  const consoleText = document.getElementById('pg-console-text');
  const liveIframe = document.getElementById('pg-live-iframe');

  langSelect?.addEventListener('change', (e) => {
    sound.playClick();
    playgroundLang = e.target.value;
    updatePlaygroundTemplates(templateSelect, playgroundLang);
    const defaultCode = PLAYGROUND_TEMPLATES[playgroundLang]?.[0]?.code || '';
    setPlaygroundCode(defaultCode);

    if (window.monaco && playgroundEditorInstance) {
      const monacoLang = playgroundLang === 'html' ? 'html' : playgroundLang === 'python' ? 'python' : 'javascript';
      monaco.editor.setModelLanguage(playgroundEditorInstance.getModel(), monacoLang);
    }

    if (previewTab) {
      previewTab.style.display = playgroundLang === 'html' ? 'inline-block' : 'none';
      if (playgroundLang === 'html') {
        previewTab.click();
      } else {
        consoleTab?.click();
      }
    }
  });

  templateSelect?.addEventListener('change', (e) => {
    const templateId = e.target.value;
    if (!templateId) return;
    sound.playClick();
    const tmpl = PLAYGROUND_TEMPLATES[playgroundLang]?.find(t => t.id === templateId);
    if (tmpl) {
      setPlaygroundCode(tmpl.code);
      showToast(`"${tmpl.name}" shabloni yuklandi!`, 'info');
    }
  });

  consoleTab?.addEventListener('click', () => {
    consoleTab.classList.add('active');
    previewTab?.classList.remove('active');
    if (consoleDisplay) consoleDisplay.style.display = 'block';
    if (previewDisplay) previewDisplay.style.display = 'none';
  });

  previewTab?.addEventListener('click', () => {
    previewTab.classList.add('active');
    consoleTab?.classList.remove('active');
    if (previewDisplay) previewDisplay.style.display = 'block';
    if (consoleDisplay) consoleDisplay.style.display = 'none';
    const code = getPlaygroundCode();
    if (liveIframe) liveIframe.srcdoc = code;
  });

  runBtn?.addEventListener('click', async () => {
    const code = getPlaygroundCode();
    await runPlaygroundCode(code, playgroundLang, consoleText, liveIframe);
  });

  copyBtn?.addEventListener('click', () => {
    sound.playClick();
    const code = getPlaygroundCode();
    navigator.clipboard.writeText(code);
    showToast("Kod nusxalandi!", "success");
  });

  formatBtn?.addEventListener('click', () => {
    sound.playClick();
    if (playgroundEditorInstance) {
      playgroundEditorInstance.getAction('editor.action.formatDocument')?.run();
    }
  });
}

// ---- Cyber Side Drawer (Hamburger Menu) ----
function setupCyberDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawerPanel = document.getElementById('cyber-drawer-panel');
  const backdrop = document.getElementById('cyber-drawer-backdrop');
  const closeBtn = document.getElementById('btn-close-drawer');

  const openDrawer = () => {
    sound.playClick();
    toggleBtn?.classList.add('active');
    drawerPanel?.classList.add('active');
    backdrop?.classList.add('active');
    updateDrawerUserMeta();
  };

  const closeDrawer = () => {
    toggleBtn?.classList.remove('active');
    drawerPanel?.classList.remove('active');
    backdrop?.classList.remove('active');
  };

  toggleBtn?.addEventListener('click', () => {
    if (drawerPanel?.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  closeBtn?.addEventListener('click', () => {
    sound.playClick();
    closeDrawer();
  });

  backdrop?.addEventListener('click', () => {
    closeDrawer();
  });

  // Drawer links auto close on click
  document.querySelectorAll('.drawer-nav-item, #drawer-user-profile-btn').forEach(el => {
    el.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Wire PRO button inside drawer
  document.getElementById('drawer-btn-pro')?.addEventListener('click', () => {
    closeDrawer();
    sound.playClick();
    openProModal(user, (updatedUser) => {
      user = updatedUser;
      updateNavbar(user, getUserRank(user));
      renderProfilePage();
    });
  });

  // Wire Sound Toggle in Drawer
  document.getElementById('btn-sound-toggle')?.addEventListener('click', () => {
    const label = document.getElementById('sound-text-label');
    if (label) {
      label.textContent = sound.isEnabled() ? 'FX ON' : 'FX OFF';
    }
  });

  // Escape key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerPanel?.classList.contains('active')) {
      closeDrawer();
    }
  });
}

function updateDrawerUserMeta() {
  if (!user) return;
  const avatarEl = document.getElementById('drawer-avatar-icon');
  const nameEl = document.getElementById('drawer-user-name');
  const rankBadge = document.getElementById('drawer-rank-badge');
  const xpEl = document.getElementById('drawer-user-xp');

  const rank = getUserRank(user);
  if (avatarEl) avatarEl.textContent = user.avatar || '🥷';
  if (nameEl) nameEl.textContent = user.name || 'CodeWarrior';
  if (rankBadge) {
    rankBadge.textContent = `${rank.kyu} kyu`;
    rankBadge.className = `rank-badge ${rank.color}`;
  }
  if (xpEl) xpEl.textContent = `⚡ ${user.xp} XP`;
}

// ---- Keyboard Shortcuts ----
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'm' || e.key === 'M')) {
    e.preventDefault();
    toggleAICopilot();
    return;
  }

  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'Enter') {
    e.preventDefault();
    if (currentChallenge && !isRunning) {
      runCurrentTests(false);
    }
  }

  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
    e.preventDefault();
    if (currentChallenge && !isRunning) {
      runCurrentTests(true);
    }
  }

  if (e.key === 'Escape') {
    closeAICopilot();
    hideSuccessModal();
    hideRankUpModal();
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    document.querySelector('.nav-links')?.classList.remove('open');
    document.getElementById('theme-popup-menu')?.classList.remove('active');
  }
});

// ---- Start ----
document.addEventListener('DOMContentLoaded', init);
