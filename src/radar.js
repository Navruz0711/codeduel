// ============================================
// CodeDuel — Canvas Skill Radar Chart
// 6-Axis Developer Competency Matrix
// ============================================

import { getLanguage } from './i18n.js';

export function renderSkillRadar(canvasId, stats) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 320;
  const height = rect.height || 300;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, width, height);

  const lang = getLanguage();
  const labels = [
    lang === 'uz' ? 'Massivlar' : lang === 'ru' ? 'Массивы' : 'Arrays',
    lang === 'uz' ? 'Stringlar' : lang === 'ru' ? 'Строки' : 'Strings',
    lang === 'uz' ? 'Algoritmlar' : lang === 'ru' ? 'Алгоритмы' : 'Algorithms',
    lang === 'uz' ? 'Matematika' : lang === 'ru' ? 'Математика' : 'Math',
    lang === 'uz' ? 'Mantiq' : lang === 'ru' ? 'Логика' : 'Logic',
    lang === 'uz' ? 'Strukturalar' : lang === 'ru' ? 'Структуры' : 'Structures',
  ];

  const values = [
    stats.arrays || 20,
    stats.strings || 25,
    stats.algorithms || 15,
    stats.math || 30,
    stats.logic || 20,
    stats.structures || 10,
  ].map(v => Math.max(15, Math.min(100, v)));

  const centerX = width / 2;
  const centerY = height / 2 + 10;
  const radius = Math.min(width, height) * 0.36;
  const sides = 6;
  const angleStep = (Math.PI * 2) / sides;

  // Draw concentric background webs
  const levels = [0.25, 0.5, 0.75, 1.0];
  levels.forEach(lvl => {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * lvl);
      const y = centerY + Math.sin(angle) * (radius * lvl);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Draw axis lines and labels
  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // Axis line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.stroke();

    // Axis label
    const labelX = centerX + Math.cos(angle) * (radius + 20);
    const labelY = centerY + Math.sin(angle) * (radius + 16);

    ctx.font = '600 11px Inter, sans-serif';
    ctx.fillStyle = '#9898b0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labels[i], labelX, labelY);
  }

  // Draw Skill Value Polygon
  ctx.beginPath();
  values.forEach((val, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (radius * val) / 100;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();

  // Fill gradient
  const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
  gradient.addColorStop(0, 'rgba(0, 255, 136, 0.5)');
  gradient.addColorStop(1, 'rgba(124, 58, 237, 0.3)');
  ctx.fillStyle = gradient;
  ctx.fill();

  // Stroke with glowing neon
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Draw point dots
  values.forEach((val, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (radius * val) / 100;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}
