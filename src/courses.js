// ============================================
// CodeDuel & Coddy.tech — Interactive Learning Tracks & Courses
// Complete roadmap, bite-sized lessons, progress, and certificates
// ============================================

import coursesData from '../data/courses.json';
import { addXP, saveUser } from './user.js';
import { sound } from './audio.js';
import { launchConfetti } from './gamification.js';

let courses = [...coursesData];

/**
 * Get all available interactive courses
 */
export function getCourses() {
  return courses;
}

/**
 * Get single course by ID
 */
export function getCourse(courseId) {
  return courses.find(c => c.id === courseId) || null;
}

/**
 * Get specific lesson within a course
 */
export function getLesson(courseId, lessonId) {
  const course = getCourse(courseId);
  if (!course) return null;
  return course.lessons.find(l => l.id === lessonId) || null;
}

/**
 * Check if a specific lesson is completed by the user
 */
export function isLessonCompleted(user, courseId, lessonId) {
  if (!user || !user.completedLessons) return false;
  return user.completedLessons.includes(`${courseId}:${lessonId}`);
}

/**
 * Check if a lesson is unlocked
 * First lesson is always unlocked.
 * Subsequent lessons are unlocked if the previous lesson in order is completed.
 */
export function isLessonUnlocked(user, courseId, lessonId) {
  const course = getCourse(courseId);
  if (!course) return false;
  
  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  if (lessonIndex === -1) return false;
  if (lessonIndex === 0) return true; // First lesson always open

  const prevLesson = course.lessons[lessonIndex - 1];
  return isLessonCompleted(user, courseId, prevLesson.id);
}

/**
 * Calculate user's completion progress for a course
 */
export function getCourseProgress(user, courseId) {
  const course = getCourse(courseId);
  if (!course || !course.lessons.length) return { percent: 0, completedCount: 0, totalCount: 0, isCompleted: false };

  const totalCount = course.lessons.length;
  let completedCount = 0;

  course.lessons.forEach(lesson => {
    if (isLessonCompleted(user, courseId, lesson.id)) {
      completedCount++;
    }
  });

  const percent = Math.round((completedCount / totalCount) * 100);
  const isCompleted = completedCount === totalCount && totalCount > 0;

  return {
    percent,
    completedCount,
    totalCount,
    isCompleted,
  };
}

/**
 * Mark a lesson as completed, award XP, gems, and update streak
 */
export function completeLesson(user, courseId, lessonId) {
  if (!user.completedLessons) user.completedLessons = [];
  if (!user.completedCourses) user.completedCourses = [];

  const key = `${courseId}:${lessonId}`;
  const alreadyCompleted = user.completedLessons.includes(key);

  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);
  if (!lesson || !course) return { success: false, alreadyCompleted };

  let xpAwarded = 0;
  let gemsAwarded = 0;

  if (!alreadyCompleted) {
    user.completedLessons.push(key);
    xpAwarded = lesson.xpReward || 25;
    gemsAwarded = 10;
    user.gems = (user.gems || 0) + gemsAwarded;

    // Add XP to user
    addXP(user, xpAwarded);

    // Check if whole course is now completed
    const progress = getCourseProgress(user, courseId);
    if (progress.isCompleted && !user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
      // Big course completion bonus
      user.gems = (user.gems || 0) + 100;
      addXP(user, 150);
      if (course.badgeId && !user.badges.includes(course.badgeId)) {
        user.badges.push(course.badgeId);
      }
    }

    saveUser(user);
    launchConfetti();
    sound.playVictory();
  }

  return {
    success: true,
    alreadyCompleted,
    xpAwarded,
    gemsAwarded,
    courseProgress: getCourseProgress(user, courseId),
  };
}

/**
 * Generate official verifiable Course Certificate canvas
 */
export function generateCourseCertificateCanvas(user, course) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // Background
  const grad = ctx.createLinearGradient(0, 0, 1200, 800);
  grad.addColorStop(0, '#0a0a14');
  grad.addColorStop(0.5, '#121324');
  grad.addColorStop(1, '#08080f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 800);

  // High-tech Cyber Grid pattern
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1200; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 800);
    ctx.stroke();
  }
  for (let y = 0; y < 800; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // Outer Border
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, 1140, 740);

  // Inner Border
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(42, 42, 1116, 716);

  // Header Title
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('⚡ CODEDUEL & CODDY.TECH INTERACTIVE ACADEMY ⚡', 600, 95);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('RASMIY DASTURLASH MALAKA VA TA\'LIM SERTIFIKATI', 600, 125);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.moveTo(250, 150);
  ctx.lineTo(950, 150);
  ctx.stroke();

  // "Ushbu sertifikat tasdiqlaydi"
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '18px sans-serif';
  ctx.fillText('Ushbu rasmiy sertifikat bilan tasdiqlanadiki, dasturchi:', 600, 210);

  // User Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px sans-serif';
  ctx.shadowColor = '#00ff88';
  ctx.shadowBlur = 15;
  ctx.fillText(user.name || 'CodeWarrior', 600, 275);
  ctx.shadowBlur = 0;

  // Course completion text
  ctx.fillStyle = '#94a3b8';
  ctx.font = '19px sans-serif';
  ctx.fillText('quyidagi interaktiv amaliy dasturlash kursini muvaffaqiyatli yakunladi:', 600, 340);

  // Course Title & Badge
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 36px sans-serif';
  ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';
  ctx.shadowBlur = 12;
  ctx.fillText(`${course.icon} ${course.title}`, 600, 400);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#a855f7';
  ctx.font = 'italic 18px sans-serif';
  ctx.fillText(`“${course.certificateTitle || course.title}”`, 600, 440);

  // Stats Box
  const progress = getCourseProgress(user, course.id);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.fillRect(320, 480, 560, 90);
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
  ctx.strokeRect(320, 480, 560, 90);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '15px monospace';
  ctx.fillText(`Bajarilgan Darslar: ${progress.completedCount}/${progress.totalCount}  |  O'zlashtirish: 100%  |  Status: TASDIQLANGAN`, 600, 532);

  // Verification & Date Footer
  const dateStr = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = `CERT-COD-${course.id.toUpperCase().slice(0, 4)}-${Math.abs(hashCode(user.name + course.id))}`;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#64748b';
  ctx.font = '13px monospace';
  ctx.fillText(`Sana: ${dateStr}`, 100, 690);
  ctx.fillText(`Sertifikat ID: ${certId}`, 100, 715);
  ctx.fillText(`Tekshirish: codeduel.tech/verify/${certId}`, 100, 740);

  // Seal / Stamp
  ctx.textAlign = 'right';
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('🛡️ VERIFIED BY CODEDUEL AI', 1100, 705);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('Bosh Nazoratchi & AI Hakam Kengashi', 1100, 735);

  return canvas;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

