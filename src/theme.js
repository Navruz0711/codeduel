// ============================================
// CodeDuel — Cyber Studio Theme Engine
// 5 Preset Cyberpunk Palettes with Live CSS Variables
// ============================================

import { updateParticleTheme } from './particles.js';
import { sound } from './audio.js';

const THEME_STORAGE_KEY = 'codeduel_active_theme';

export const THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Matrix Emerald',
    icon: '🟢',
    primary: '#00ff88',
    primaryRgb: '0, 255, 136',
    secondary: '#a855f7',
    secondaryRgb: '168, 85, 247',
    accentText: '#00ff88',
    glow: 'rgba(0, 255, 136, 0.25)',
    bgPrimary: '#07070d',
    bgSecondary: '#0d0d17',
  },
  synthwave: {
    id: 'synthwave',
    name: 'Synthwave 2077',
    icon: '🟣',
    primary: '#c084fc',
    primaryRgb: '192, 132, 252',
    secondary: '#ec4899',
    secondaryRgb: '236, 72, 153',
    accentText: '#ec4899',
    glow: 'rgba(192, 132, 252, 0.3)',
    bgPrimary: '#090514',
    bgSecondary: '#110a22',
  },
  cyan: {
    id: 'cyan',
    name: 'Hyper Cyan',
    icon: '🔵',
    primary: '#22d3ee',
    primaryRgb: '34, 211, 238',
    secondary: '#38bdf8',
    secondaryRgb: '56, 189, 248',
    accentText: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.3)',
    bgPrimary: '#050b14',
    bgSecondary: '#0a1424',
  },
  amber: {
    id: 'amber',
    name: 'Solar Flare',
    icon: '🟠',
    primary: '#f59e0b',
    primaryRgb: '245, 158, 11',
    secondary: '#f97316',
    secondaryRgb: '249, 115, 22',
    accentText: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.3)',
    bgPrimary: '#0c0804',
    bgSecondary: '#181006',
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson Blade',
    icon: '🔴',
    primary: '#ef4444',
    primaryRgb: '239, 68, 68',
    secondary: '#f43f5e',
    secondaryRgb: '244, 63, 94',
    accentText: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.3)',
    bgPrimary: '#0c0507',
    bgSecondary: '#180a0e',
  }
};

let currentTheme = 'emerald';

export function initTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && THEMES[saved]) {
      currentTheme = saved;
    }
  } catch (e) {}

  applyTheme(currentTheme, false);
  return currentTheme;
}

export function getTheme() {
  return currentTheme;
}

export function setTheme(themeId) {
  if (THEMES[themeId]) {
    currentTheme = themeId;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch (e) {}
    sound.playClick();
    applyTheme(themeId, true);
  }
}

export function applyTheme(themeId, notify = true) {
  const t = THEMES[themeId] || THEMES.emerald;
  const root = document.documentElement;

  root.style.setProperty('--accent-green', t.primary);
  root.style.setProperty('--text-accent', t.accentText);
  root.style.setProperty('--shadow-glow', `0 0 25px ${t.glow}`);
  root.style.setProperty('--bg-primary', t.bgPrimary);
  root.style.setProperty('--bg-secondary', t.bgSecondary);

  updateParticleTheme(t.primaryRgb, t.secondaryRgb);

  if (notify) {
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: t } }));
  }
}
