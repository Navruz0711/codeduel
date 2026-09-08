// ============================================
// Challenge Management
// ============================================

import kataData from '../data/kata.json';
import { getLanguage } from './i18n.js';

let challenges = [];

export function loadChallenges() {
  const xpMap = { 8: 15, 7: 25, 6: 40, 5: 65, 4: 100, 3: 150, 2: 220, 1: 300 };
  challenges = kataData.map(kata => ({
    ...kata,
    xpReward: kata.xpReward || xpMap[kata.difficulty] || 25,
    descriptionHtml: parseMarkdown(kata.description),
  }));
  return challenges;
}

export function getChallenges() {
  if (challenges.length === 0) loadChallenges();
  return challenges;
}

export function getChallenge(id) {
  if (challenges.length === 0) loadChallenges();
  return challenges.find(c => c.id === id);
}

export function filterChallenges({ difficulty = 'all', category = 'all', language = 'all', status = 'all', search = '' }, solvedIds = []) {
  if (challenges.length === 0) loadChallenges();

  return challenges.filter(c => {
    if (difficulty !== 'all' && c.difficulty !== parseInt(difficulty)) return false;
    if (category !== 'all' && (c.category || '').toLowerCase() !== category.toLowerCase()) return false;
    if (language !== 'all' && !c.languages[language]) return false;
    if (status === 'solved' && !solvedIds.includes(c.id)) return false;
    if (status === 'unsolved' && solvedIds.includes(c.id)) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchCat = (c.category || '').toLowerCase().includes(q);
      const matchTags = (c.tags || []).some(t => t.toLowerCase().includes(q));
      const matchDesc = (c.description || '').toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchTags && !matchDesc) return false;
    }
    return true;
  });
}

export function getNextChallenge(currentId, solvedIds = []) {
  if (challenges.length === 0) loadChallenges();
  const unsolved = challenges.filter(c => c.id !== currentId && !solvedIds.includes(c.id));
  if (unsolved.length === 0) return challenges.find(c => c.id !== currentId) || null;
  unsolved.sort((a, b) => b.difficulty - a.difficulty);
  return unsolved[0];
}

export function getDifficultyColor(kyu) {
  const colors = {
    8: 'kyu-8', 7: 'kyu-7', 6: 'kyu-6', 5: 'kyu-5',
    4: 'kyu-4', 3: 'kyu-3', 2: 'kyu-2', 1: 'kyu-1',
  };
  return colors[kyu] || 'kyu-8';
}

export function getDifficultyLabel(kyu) {
  const lang = getLanguage();
  const labels = {
    8: { uz: 'Boshlang\'ich (8 kyu)', en: 'Beginner (8 kyu)', ru: 'Начальный (8 кю)' },
    7: { uz: 'Oson (7 kyu)', en: 'Easy (7 kyu)', ru: 'Легкий (7 кю)' },
    6: { uz: 'O\'rta (6 kyu)', en: 'Medium (6 kyu)', ru: 'Средний (6 кю)' },
    5: { uz: 'Murakkab (5 kyu)', en: 'Intermediate (5 kyu)', ru: 'Продвинутый (5 кю)' },
    4: { uz: 'Qiyin (4 kyu)', en: 'Hard (4 kyu)', ru: 'Сложный (4 кю)' },
    3: { uz: 'Usta (3 kyu)', en: 'Advanced (3 kyu)', ru: 'Мастер (3 кю)' },
    2: { uz: 'Ekspert (2 kyu)', en: 'Expert (2 kyu)', ru: 'Эксперт (2 кю)' },
    1: { uz: 'Grandmaster (1 kyu)', en: 'Grandmaster (1 kyu)', ru: 'Грандмастер (1 кю)' },
  };
  return labels[kyu]?.[lang] || labels[kyu]?.uz || 'Unknown';
}

// Markdown parser for kata descriptions with formatted code blocks and headings
export function parseMarkdown(md) {
  if (!md) return '';
  let str = md;

  // Code blocks: ```javascript\ncode\n```
  str = str.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const cleanCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
    return `<pre class="kata-desc-code"><code class="language-${lang || 'text'}">${cleanCode}</code></pre>`;
  });

  // Headings: ### Title -> <h4 class="kata-desc-subheading">Title</h4>
  str = str.replace(/^### (.*$)/gim, '<h4 class="kata-desc-subheading">$1</h4>');
  str = str.replace(/^## (.*$)/gim, '<h3 class="kata-desc-heading">$1</h3>');

  // Bold & Italic
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  str = str.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Inline code
  str = str.replace(/`([^`]+)`/g, '<code class="kata-inline-code">$1</code>');

  // Unordered list items: - item -> <li class="kata-list-item">$1</li>
  str = str.replace(/^\s*-\s+(.*$)/gim, '<li class="kata-list-item">$1</li>');

  // Paragraphs and breaks
  str = str.replace(/\n\n/g, '<br><br>');
  str = str.replace(/\n/g, '<br>');

  return str;
}
