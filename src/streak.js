// ============================================
// CodeDuel — Streak & Daily Challenge Retention System
// Duolingo-style streak flames, weekly calendar, and Daily Kata Pick
// ============================================

import { sound } from "./audio.js";
import { showToast } from "./ui.js";
import { getChallenges } from "./challenges.js";

const WEEKDAYS_UZ = ["Yak", "Du", "Se", "Chor", "Pay", "Juma", "Shan"];
const WEEKDAYS_SHORT = ["D", "S", "Ch", "P", "J", "Sh", "Ya"];

/**
 * Get daily challenge based on day-of-year hash (changes daily)
 */
export function getDailyFeaturedChallenge() {
  const challenges = getChallenges();
  if (!challenges || challenges.length === 0) return null;

  const now = new Date();
  // Day of year
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Pick deterministic challenge (prefer 8-6 kyu for accessibility)
  const accessible = challenges.filter(c => c.difficulty >= 6);
  const pool = accessible.length > 0 ? accessible : challenges;
  const index = (dayOfYear * 7 + 13) % pool.length;
  return pool[index];
}

/**
 * Get time left today until midnight (ms)
 */
export function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

/**
 * Format milliseconds into HH:MM:SS
 */
export function formatCountdown(ms) {
  const totalSec = Math.floor(Math.max(0, ms) / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/**
 * Get the last 7 days activity status for the current week
 */
export function getWeeklyStreakDays(user) {
  const result = [];
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const dayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon ...
  // Monday as first day: Monday is offset 0
  const mondayOffset = (dayOfWeek + 6) % 7;

  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - mondayOffset + i);
    const dateStr = d.toISOString().split("T")[0];
    const isToday = dateStr === todayStr;
    const isPast = d < now && !isToday;
    const isFuture = d > now && !isToday;

    const hasActivity = user.activityLog && user.activityLog[dateStr] > 0;
    const isCompleted = hasActivity || (isToday && user.lastActiveDate === todayStr);

    result.push({
      dayIndex: i,
      name: WEEKDAYS_SHORT[i],
      fullName: WEEKDAYS_UZ[(i + 1) % 7],
      dateStr,
      isToday,
      isPast,
      isFuture,
      isCompleted,
    });
  }

  return result;
}

/**
 * Check streak milestones
 */
export const STREAK_MILESTONES = [
  { days: 3, xp: 50, gems: 20, label: "3 Kunlik Olov", icon: "🔥" },
  { days: 7, xp: 150, gems: 50, label: "Haftalik Jangchi", icon: "⚡" },
  { days: 14, xp: 500, gems: 100, label: "Kiber Qalqon Sohibi", icon: "🛡️" },
  { days: 30, xp: 1500, gems: 300, label: "Afsonaviy Samurai", icon: "👑" },
];
