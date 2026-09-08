// ============================================
// CodeDuel — Cyber Developer Passport & Tech ID Card
// Replaces outdated static paper certificate with high-tech Dev-ID
// ============================================

import { getUserRank } from "./user.js";

/**
 * Generate High-Resolution Holographic Cyber Dev-ID Card on Canvas
 */
export function generateCyberDevCardCanvas(user) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 540;
  const ctx = canvas.getContext("2d");

  const rank = getUserRank(user);
  const solvedCount = Object.keys(user.solvedChallenges || {}).length;
  const coursesCount = (user.completedCourses || []).length;

  // 1. Deep Cyber Dark Background
  const bgGrad = ctx.createLinearGradient(0, 0, 900, 540);
  bgGrad.addColorStop(0, "#080c14");
  bgGrad.addColorStop(0.5, "#0f172a");
  bgGrad.addColorStop(1, "#020617");
  ctx.fillStyle = bgGrad;
  ctx.roundRect(0, 0, 900, 540, 28);
  ctx.fill();

  // 2. Neon Holographic Border
  ctx.lineWidth = 4;
  const borderGrad = ctx.createLinearGradient(0, 0, 900, 540);
  borderGrad.addColorStop(0, "#38bdf8");
  borderGrad.addColorStop(0.3, "#a855f7");
  borderGrad.addColorStop(0.7, "#ec4899");
  borderGrad.addColorStop(1, "#00ff88");
  ctx.strokeStyle = borderGrad;
  ctx.roundRect(4, 4, 892, 532, 26);
  ctx.stroke();

  // 3. Background Cyber Grid Lines
  ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
  ctx.lineWidth = 1;
  for (let x = 40; x < 900; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 520);
    ctx.stroke();
  }
  for (let y = 40; y < 540; y += 40) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(880, y);
    ctx.stroke();
  }

  // 4. Header Bar
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 13px monospace";
  ctx.fillText("CODEDUEL // VERIFIED DEVELOPER TECH-ID", 50, 52);

  ctx.fillStyle = "#00ff88";
  ctx.textAlign = "right";
  ctx.fillText("● SYSTEM STATUS: ACTIVE VERIFIED", 850, 52);
  ctx.textAlign = "left";

  // Separator Line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.beginPath();
  ctx.moveTo(50, 68);
  ctx.lineTo(850, 68);
  ctx.stroke();

  // 5. User Avatar Block (Holographic Avatar Ring)
  ctx.save();
  ctx.beginPath();
  ctx.arc(125, 175, 55, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#38bdf8";
  ctx.stroke();

  ctx.font = "56px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(user.avatar || "🥷", 125, 175);
  ctx.restore();

  // 6. User Identity Info
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 32px sans-serif";
  ctx.fillText(user.name || "Kiber Dasturchi", 210, 150);

  ctx.fillStyle = "#a855f7";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText(user.title || "Elite Code Warrior & Problem Solver", 210, 182);

  // Kyu Badge Pill
  ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
  ctx.roundRect(210, 200, 100, 30, 8);
  ctx.fill();
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#f59e0b";
  ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.fillText(`${rank.kyu} KYU`, 260, 220);
  ctx.textAlign = "left";

  // PRO Indicator if active
  if (user.isPro) {
    ctx.fillStyle = "rgba(236, 72, 153, 0.2)";
    ctx.roundRect(320, 200, 85, 30, 8);
    ctx.fill();
    ctx.strokeStyle = "#ec4899";
    ctx.stroke();
    ctx.fillStyle = "#ec4899";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("👑 PRO VIP", 362, 220);
    ctx.textAlign = "left";
  }

  // 7. Stats Grid Section
  const stats = [
    { label: "UMUMIY TAJRIBA", val: `⚡ ${user.xp || 0} XP`, color: "#38bdf8" },
    { label: "KIBER YOQUTLAR", val: `💎 ${user.gems || 0}`, color: "#06b6d4" },
    { label: "KUNLIK STREAK", val: `🔥 ${user.streak || 0} KUN`, color: "#ff6b00" },
    { label: "YECHILGAN KATALAR", val: `⚔️ ${solvedCount} TA`, color: "#00ff88" },
    { label: "TAMOMALANGAN KURSLAR", val: `🎓 ${coursesCount} TA`, color: "#a855f7" },
    { label: "MAXSUS QALQON", val: `🛡️ ${user.streakShields || 1}X FREEZE`, color: "#10b981" }
  ];

  const startX = 50;
  const startY = 270;
  const cardW = 245;
  const cardH = 72;
  const gapX = 32;
  const gapY = 20;

  stats.forEach((s, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.roundRect(x, y, cardW, cardH, 12);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "bold 10px monospace";
    ctx.fillText(s.label, x + 16, y + 26);

    ctx.fillStyle = s.color;
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(s.val, x + 16, y + 54);
  });

  // 8. Footer Hologram Stamp
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.beginPath();
  ctx.moveTo(50, 470);
  ctx.lineTo(850, 470);
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.font = "11px monospace";
  ctx.fillText("HASH ID: 0x" + (user.id || "88a9ffb3").slice(0, 16) + " // CODEDUEL PROTOCOL 2026", 50, 500);

  ctx.fillStyle = "#38bdf8";
  ctx.textAlign = "right";
  ctx.fillText("RASMIY TASDIQLANGAN RAQAMLI KIBER-PASPORT", 850, 500);

  return canvas;
}
