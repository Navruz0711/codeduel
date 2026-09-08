// ============================================
// CodeDuel — Monetization & Economy System
// PRO Subscription, Payment Gateways (Click, Payme, Uzum), 
// Gems Shop, and Verified Official Certificate Generator
// ============================================

import { saveUser, addXP } from './user.js';
import { sound } from './audio.js';
import { launchConfetti } from './gamification.js';
import { getLanguage, t } from './i18n.js';

export const PRO_PLANS = {
  monthly: {
    id: 'monthly',
    name: 'Oylik PRO',
    priceUZS: 29000,
    priceFormatted: "29,000 so'm",
    priceUSD: 2.50,
    period: 'oy',
    badge: '🚀 Standart',
    features: [
      '⚡ Cheksiz Mistral AI Codestral & Deep Code Review',
      '🏢 FAANG & BigTech (Google, Yandex, Uzum) maxsus masalalari',
      '📜 Rasmiy tekshiriladigan dasturchi sertifikati (QR-kodli)',
      '⚡ 2x XP Booster barcha masalalar va duellarda',
      '👑 Profil uchun Oltin VIP nishoni va neyron ramka'
    ]
  },
  annual: {
    id: 'annual',
    name: 'Yillik PRO',
    priceUZS: 199000,
    priceFormatted: "199,000 so'm",
    priceUSD: 16.00,
    period: 'yil',
    badge: '🔥 40% Chegirma',
    popular: true,
    features: [
      '⚡ Barcha Oylik PRO imkoniyatlari (12 oy davomida)',
      '💎 +1,500 bepul Kiber Yoqut (Gems) bonusi',
      '🛡️ 5x Streak Shield (Ketma-ketlikni himoya qilish)',
      '🎨 Barcha VIP Neon mavzulari va avatarlar ochiq',
      '🥇 Arena reytingida "VIP Gold Master" unvoni'
    ]
  },
  lifetime: {
    id: 'lifetime',
    name: 'Cheksiz VIP (Lifetime)',
    priceUZS: 399000,
    priceFormatted: "399,000 so'm",
    priceUSD: 32.00,
    period: 'umrbod',
    badge: '👑 Cheksiz',
    features: [
      '♾️ Bir umrlik cheksiz CodeDuel PRO a\'zoligi',
      '🤖 Eng yangi Mistral Codestral 2026 AI modellariga doimiy kirish',
      '💎 +5,000 Kiber Yoqut (Gems) bir zumda',
      '📜 Cheksiz sertifikatlar generatsiyasi va CV/LinkedIn integratsiyasi',
      '🌟 CodeDuel Discord & Telegram VIP yopiq hamjamiyati'
    ]
  }
};

export const PROMO_CODES = {
  'PROMO2026': { discountPercent: 100, days: 30, desc: '30 kunlik bepul PRO sinovi!' },
  'WARRIOR100': { discountPercent: 100, days: 3650, desc: 'Cheksiz VIP sinov a\'zoligi faollashtirildi!' },
  'MISTRAL50': { discountPercent: 50, days: 30, desc: '50% maxsus chegirma qo\'llandi!' },
  'DEVUZ': { discountPercent: 30, days: 30, desc: '30% O\'zbekiston dasturchilari uchun chegirma!' }
};

export const PAYMENT_METHODS = [
  { id: 'click', name: 'Click Up', icon: '🔵', color: '#0070ba', badge: 'Avtomat' },
  { id: 'payme', name: 'Payme', icon: '🟢', color: '#00b894', badge: '0% Komissiya' },
  { id: 'uzum', name: 'Uzum Bank', icon: '🟣', color: '#7000ff', badge: 'Tezkor' },
  { id: 'card', name: 'UzCard / Humo / Visa', icon: '💳', color: '#2d3436', badge: 'Xavfsiz' }
];

export const SHOP_ITEMS = [
  {
    id: 'gems_500',
    category: 'gems',
    name: '500 Kiber Yoqut',
    icon: '💎',
    priceUZS: 9000,
    priceFormatted: "9,000 so'm",
    rewardGems: 500,
    desc: 'Boshlang\'ich yoqutlar to\'plami'
  },
  {
    id: 'gems_1500',
    category: 'gems',
    name: '1,500 Kiber Yoqut',
    icon: '💎',
    priceUZS: 22000,
    priceFormatted: "22,000 so'm",
    rewardGems: 1500,
    badge: '🔥 Mashhur',
    desc: '+20% bonus yoqutlar bilan'
  },
  {
    id: 'gems_5000',
    category: 'gems',
    name: '5,000 Kiber Yoqut',
    icon: '👑',
    priceUZS: 59000,
    priceFormatted: "59,000 so'm",
    rewardGems: 5000,
    badge: '💎 Eng Zo\'r Narx',
    desc: '+40% katta miqdordagi yoqutlar'
  },
  {
    id: 'streak_shield_3x',
    category: 'items',
    name: '3x Streak Qalqoni',
    icon: '🛡️',
    costGems: 120,
    desc: '3 kunlik dars qoldirilganda streakni avtomat saqlab qoladi',
    apply: (user) => {
      user.streakShields = (user.streakShields || 0) + 3;
    }
  },
  {
    id: 'ai_blueprint_5x',
    category: 'items',
    name: '5x AI Blueprint Maslahat',
    icon: '💡',
    costGems: 80,
    desc: 'Qiyin masalalarni yechish uchun 5 ta chuqur kod tahlili tokeni',
    apply: (user) => {
      user.bonusAITokens = (user.bonusAITokens || 0) + 5;
    }
  },
  {
    id: 'title_apex_hacker',
    category: 'customization',
    name: 'Unvon: "Apex Cyber Hacker"',
    icon: '🥷',
    costGems: 200,
    desc: 'Profil va reytingda ko\'rinadigan afsonaviy unvon',
    apply: (user) => {
      user.title = 'Apex Cyber Hacker';
    }
  },
  {
    id: 'avatar_cyber_dragon',
    category: 'customization',
    name: 'Avatar: "Kiber Ajdaho 🐉"',
    icon: '🐉',
    costGems: 250,
    desc: 'Maxsus yaltiroq kiber ajdaho avatari',
    apply: (user) => {
      user.avatar = '🐉';
      if (!user.unlockedAvatars) user.unlockedAvatars = [];
      if (!user.unlockedAvatars.includes('🐉')) user.unlockedAvatars.push('🐉');
    }
  }
];

/**
 * Check if the user has an active PRO subscription
 */
export function isUserPro(user) {
  if (!user) return false;
  if (user.isPro === true) {
    if (!user.proExpiresAt || user.proExpiresAt === 'lifetime') return true;
    const exp = new Date(user.proExpiresAt).getTime();
    if (exp > Date.now()) return true;
  }
  return false;
}

/**
 * Get daily AI usage status
 */
export function getDailyAILimit(user) {
  const isPro = isUserPro(user);
  if (isPro) {
    return { isPro: true, used: 0, max: Infinity, canAsk: true, remaining: Infinity };
  }

  const today = new Date().toISOString().split('T')[0];
  if (!user.aiDailyUsage || user.aiDailyUsage.date !== today) {
    user.aiDailyUsage = { date: today, count: 0 };
    saveUser(user);
  }

  const used = user.aiDailyUsage.count || 0;
  const max = 5;
  const bonus = user.bonusAITokens || 0;
  const canAsk = used < max || bonus > 0;

  return {
    isPro: false,
    used,
    max,
    bonus,
    canAsk,
    remaining: Math.max(0, max - used) + bonus
  };
}

/**
 * Record an AI request
 */
export function recordAIRequest(user) {
  if (isUserPro(user)) return;
  const today = new Date().toISOString().split('T')[0];
  if (!user.aiDailyUsage || user.aiDailyUsage.date !== today) {
    user.aiDailyUsage = { date: today, count: 0 };
  }

  if (user.aiDailyUsage.count < 5) {
    user.aiDailyUsage.count += 1;
  } else if (user.bonusAITokens && user.bonusAITokens > 0) {
    user.bonusAITokens -= 1;
  }
  saveUser(user);
}

/**
 * Activate PRO membership
 */
export function activateProMembership(user, planId, durationDays = 30) {
  user.isPro = true;
  if (planId === 'lifetime' || durationDays >= 3650) {
    user.proExpiresAt = 'lifetime';
    user.proPlan = 'lifetime';
  } else {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + durationDays);
    user.proExpiresAt = expDate.toISOString();
    user.proPlan = planId;
  }

  // Bonus Gems for purchasing PRO
  const bonusGems = planId === 'lifetime' ? 5000 : planId === 'annual' ? 1500 : 250;
  user.gems = (user.gems || 0) + bonusGems;

  sound.playVictory();
  launchConfetti();
  saveUser(user);

  return { success: true, planId, bonusGems };
}

/**
 * Purchase item from Cyber Shop
 */
export function buyShopItem(user, itemId) {
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return { success: false, message: 'Noma\'lum mahsulot' };

  if (item.costGems) {
    const currentGems = user.gems || 0;
    if (currentGems < item.costGems) {
      return { success: false, message: `Yoqutlar yetarli emas! Sizda: ${currentGems} 💎, kerak: ${item.costGems} 💎` };
    }
    user.gems -= item.costGems;
    if (item.apply) item.apply(user);
    if (!user.purchasedItems) user.purchasedItems = [];
    user.purchasedItems.push({ id: item.id, date: new Date().toISOString() });

    sound.playBadge();
    saveUser(user);
    return { success: true, message: `"${item.name}" muvaffaqiyatli sotib olindi!` };
  }

  return { success: false, message: 'To\'lov oynasi orqali xarid qiling' };
}

/**
 * Generate High-Resolution Verified Official Certificate
 */
export function generateVerifiedCertificateCanvas(user, rank) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // 1. Cyber Dark Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
  bgGrad.addColorStop(0, '#0a0b10');
  bgGrad.addColorStop(0.5, '#101424');
  bgGrad.addColorStop(1, '#05070c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 800);

  // 2. Cyber Circuit Neon Borders & Accents
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, 1140, 740);

  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(45, 45, 1110, 710);

  // Corner tech markings
  const drawCorner = (x, y, dx, dy) => {
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 40);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 40, y);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 5;
    ctx.stroke();
  };
  drawCorner(30, 30, 1, 1);
  drawCorner(1170, 30, -1, 1);
  drawCorner(30, 770, 1, -1);
  drawCorner(1170, 770, -1, -1);

  // 3. Header Titles
  ctx.textAlign = 'center';
  ctx.font = 'bold 22px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = '#00e5ff';
  ctx.letterSpacing = '4px';
  ctx.fillText('⚡ CODEDUEL CYBER ARENA & ALGORITHMS ACADEMY ⚡', 600, 110);

  ctx.font = 'bold 44px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('OFFICIAL CERTIFICATE OF MASTERY', 600, 175);

  ctx.font = 'italic 18px "Inter", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Ushbu sertifikat dasturlash va algoritmlar bo\'yicha yuqori bilimga egaligini tasdiqlaydi:', 600, 240);

  // 4. User Name Glow
  ctx.font = 'bold 56px "Inter", sans-serif';
  const nameGrad = ctx.createLinearGradient(300, 310, 900, 310);
  nameGrad.addColorStop(0, '#ffd700');
  nameGrad.addColorStop(0.5, '#00ff88');
  nameGrad.addColorStop(1, '#00e5ff');
  ctx.fillStyle = nameGrad;
  ctx.fillText((user.name || 'CodeWarrior').toUpperCase(), 600, 320);

  // Divider Line
  ctx.beginPath();
  ctx.moveTo(350, 345);
  ctx.lineTo(850, 345);
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 5. Achievement Details Grid
  ctx.font = '20px "Inter", sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText(`Erishilgan Daraja: ${rank.kyu} kyu (${rank.title})  •  Unvon: "${user.title || 'Binary Ninja'}"`, 600, 390);

  ctx.font = '18px "Inter", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`Muvaffaqiyatli Yechilgan Masalalar: ${user.totalSolved || 0} ta  •  Jami XP: ${user.xp || 0} XP  •  AI Duellari: ${user.duelWins || 0} G'alaba`, 600, 430);

  // 6. Security Verification ID & Date
  const serialId = `CD-VERIFIED-${Math.abs((user.name || 'USER').split('').reduce((a,b)=>((a<<5)-a)+b.charCodeAt(0),0)).toString(16).toUpperCase().padStart(8, '0')}`;
  const verifyDate = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });

  // Verification Box
  ctx.fillStyle = 'rgba(16, 24, 39, 0.85)';
  ctx.fillRect(200, 480, 800, 110);
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(200, 480, 800, 110);

  ctx.font = '14px "Courier New", monospace';
  ctx.fillStyle = '#00ff88';
  ctx.fillText(`SERIAL NUMBER: ${serialId}`, 600, 515);
  ctx.font = '14px "Inter", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`Berilgan Sana: ${verifyDate}  •  Status: 100% VERIFIED ON-CHAIN`, 600, 545);
  ctx.fillText(`Tasdiqlash manzili: https://codeduel.io/verify/${serialId}`, 600, 570);

  // 7. Seals & Signatures
  // Left: AI Mentor Stamp
  ctx.textAlign = 'left';
  ctx.font = '15px "Inter", sans-serif';
  ctx.fillStyle = '#00e5ff';
  ctx.fillText('🤖 Mistral AI Codestral & Arena Core', 150, 680);
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Algoritmik Tekshiruv Tizimi', 150, 705);

  // Right: CodeDuel Director Signature
  ctx.textAlign = 'right';
  ctx.font = 'bold 16px "Inter", sans-serif';
  ctx.fillStyle = '#ffd700';
  ctx.fillText('👑 CodeDuel Examination Board', 1050, 680);
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Xalqaro Kiber Dasturlash Standarti', 1050, 705);

  return canvas;
}
