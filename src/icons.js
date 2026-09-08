// ============================================
// CodeDuel — Official Industry-Standard Icons
// Authentic Devicon & SimpleIcons Vector System
// ============================================

export const LANGUAGE_ICONS = {
  javascript: {
    name: 'JavaScript',
    color: '#F7DF1E',
    bgColor: 'rgba(247, 223, 30, 0.12)',
    borderColor: 'rgba(247, 223, 30, 0.35)',
    deviconClass: 'devicon-javascript-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#F7DF1E" d="M0 0h128v128H0z"/>
        <path d="M67.312 103.61c1.58 2.59 4.3 4.29 8.27 4.29 4.7 0 7.82-2.12 7.82-10.42V48.5h14.73v49.19c0 14.8-8.84 21.32-21.84 21.32-11.45 0-18.15-5.99-21.72-13.43l12.74-7.97zM20.25 102.26c2.49 4.07 7.02 7.13 13.91 7.13 6.68 0 10.98-3.39 10.98-8.03 0-5.65-4.52-7.69-12.22-11.09l-4.18-1.81c-12.22-5.2-20.25-11.77-20.25-24.89 0-12.33 9.5-21.72 24.32-21.72 10.63 0 18.26 4.07 23.36 12.89l-11.88 7.58c-2.49-4.41-5.77-6.33-11.43-6.33-5.32 0-8.94 3.28-8.94 7.35 0 5.09 3.51 7.13 11.09 10.41l4.18 1.81c14.37 6.22 21.72 12.67 21.72 25.46 0 14.7-11.54 22.85-26.36 22.85-14.82 0-23.76-7.24-27.83-16.18l13.04-7.53z"/>
      </svg>
    `
  },
  python: {
    name: 'Python',
    color: '#3776AB',
    bgColor: 'rgba(55, 118, 171, 0.14)',
    borderColor: 'rgba(55, 118, 171, 0.4)',
    deviconClass: 'devicon-python-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#3776AB" d="M63.02 0c-17.06 0-27.18 1.64-32.96 5.25-8.52 5.3-7.79 16.5-7.79 26.24h40.94v5.86H21.23c-15.1 0-21.23 7.85-21.23 21.68 0 13.82 6.13 21.67 21.23 21.67h10.35v-14.8c0-11.96 10.02-21.57 21.98-21.57h27.97V27.08c0-11.96-9.84-27.08-27.51-27.08zm-9.33 8.78a4.39 4.39 0 1 1 0 8.78 4.39 4.39 0 0 1 0-8.78z"/>
        <path fill="#FFD43B" d="M64.98 128c17.06 0 27.18-1.64 32.96-5.25 8.52-5.3 7.79-16.5 7.79-26.24H64.79v-5.86h41.98c15.1 0 21.23-7.85 21.23-21.68 0-13.82-6.13-21.67-21.23-21.67H96.42v14.8c0 11.96-10.02 21.57-21.98 21.57H46.47v17.25c0 11.96 9.84 27.08 27.51 27.08zm9.33-8.78a4.39 4.39 0 1 1 0-8.78 4.39 4.39 0 0 1 0 8.78z"/>
      </svg>
    `
  },
  typescript: {
    name: 'TypeScript',
    color: '#3178C6',
    bgColor: 'rgba(49, 120, 198, 0.14)',
    borderColor: 'rgba(49, 120, 198, 0.4)',
    deviconClass: 'devicon-typescript-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#3178C6" d="M0 0h128v128H0z"/>
        <path fill="#FFF" d="M37.5 45.3h32.2V58H56v47.2H42.7V58H37.5V45.3zm42.7 39.8c3.2 2.2 7.7 3.8 12.5 3.8 6.5 0 10.4-3.3 10.4-8 0-4.8-3.7-7.4-11.4-10.7-9.5-4-15.1-9.7-15.1-18.7 0-10.9 9-18.9 22.8-18.9 6.7 0 12.3 1.8 16.2 4.4l-3.8 9.9c-3.2-1.9-7.3-3.3-12.4-3.3-6.5 0-9.7 3.4-9.7 7.2 0 4.5 3.8 6.8 11.5 10.1 10.4 4.5 15.3 10.2 15.3 19.3 0 11.6-9.2 19.8-24.1 19.8-7.9 0-14.7-2.4-19-5.7l3.8-9.9z"/>
      </svg>
    `
  },
  html: {
    name: 'HTML5',
    color: '#E34F26',
    bgColor: 'rgba(227, 79, 38, 0.14)',
    borderColor: 'rgba(227, 79, 38, 0.4)',
    deviconClass: 'devicon-html5-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#E34F26" d="M19.1 11.7l8.2 91.9L64 114.3l36.7-10.7 8.2-91.9H19.1z"/>
        <path fill="#EF652A" d="M64 19.5v86.7l29.4-8.2 6.6-78.5H64z"/>
        <path fill="#EBEBEB" d="M64 48.6H44.8l1.4 15.6H64V48.6zm0 29.5l-12.7-3.4-.8-9.2H35.7l1.6 18.2L64 88.5v-10.4z"/>
        <path fill="#FFF" d="M64 48.6h19.2l-.7 7.8-.7 7.8H64v14.1l12.7-3.4 1.3-14.5h14.8l-2.4 27.2L64 92.4V48.6z"/>
      </svg>
    `
  },
  css: {
    name: 'CSS3',
    color: '#1572B6',
    bgColor: 'rgba(21, 114, 182, 0.14)',
    borderColor: 'rgba(21, 114, 182, 0.4)',
    deviconClass: 'devicon-css3-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1572B6" d="M19.1 11.7l8.2 91.9L64 114.3l36.7-10.7 8.2-91.9H19.1z"/>
        <path fill="#33A9DC" d="M64 19.5v86.7l29.4-8.2 6.6-78.5H64z"/>
        <path fill="#EBEBEB" d="M64 48.4H44.8l1.4 15.6H64V48.4zm0 29.8l-12.7-3.4-.8-9.4H35.7l1.6 18.4L64 88.7V78.2z"/>
        <path fill="#FFF" d="M83.2 48.4H64v15.6h17.8l-1.6 18-16.2 4.4v10.5l29-8 2.8-31.5.7-9z"/>
      </svg>
    `
  },
  cpp: {
    name: 'C++',
    color: '#00599C',
    bgColor: 'rgba(0, 89, 156, 0.14)',
    borderColor: 'rgba(0, 89, 156, 0.4)',
    deviconClass: 'devicon-cplusplus-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#00599C" d="M117.8 89.2l-47.5 27.4c-3.9 2.2-8.7 2.2-12.6 0L10.2 89.2c-3.9-2.2-6.3-6.4-6.3-10.9V23.7c0-4.5 2.4-8.7 6.3-10.9L57.7-14.6c3.9-2.2 8.7-2.2 12.6 0l47.5 27.4c3.9 2.2 6.3 6.4 6.3 10.9v54.6c0 4.5-2.4 8.7-6.3 10.9z" transform="translate(0 20)"/>
        <path fill="#FFF" d="M64 45.4c-11.8 0-21.4 9.6-21.4 21.4s9.6 21.4 21.4 21.4c8.4 0 15.6-4.8 19.1-11.8l-9.2-5.3c-2.1 4.2-6.5 7.1-11.6 7.1-7.2 0-13-5.8-13-13s5.8-13 13-13c5.1 0 9.5 2.9 11.6 7.1l9.2-5.3c-3.5-7-10.7-11.8-19.1-11.8zm27.4 16v4.2h-4.2v4.2h4.2v4.2h4.2v-4.2h4.2v-4.2h-4.2v-4.2h-4.2zm14.3 0v4.2h-4.2v4.2h4.2v4.2h4.2v-4.2h4.2v-4.2h-4.2v-4.2h-4.2z"/>
      </svg>
    `
  },
  java: {
    name: 'Java',
    color: '#ED8B00',
    bgColor: 'rgba(237, 139, 0, 0.14)',
    borderColor: 'rgba(237, 139, 0, 0.4)',
    deviconClass: 'devicon-java-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#5382A1" d="M51.9 96.2c0 0-7.7 1.7-18.7.6-3.8-.4-1.2-2.8.8-3.4 9.1-2.9 18.2-1.9 27.4-4 2.8-.6 6.3-.9 7.7.9 1.7 2.2-8.3 5.4-17.2 5.9zm-4.3-13.8c-7.9 2.5-16.1 4.5-22.9 2-2.4-.9-1.9-2.3.6-2.9 10.3-2.6 18.8-1.5 28.5-3.8 5.6-1.3 15.6-2.5 17.5 2.1 2.2 5.1-11.7 7.7-23.7 8.3z"/>
        <path fill="#ED8B00" d="M64 0C54.1 11.4 59.9 21.3 69.2 30.2c10 9.6 8.9 17.7.2 26.1-3.6 3.5-6.2 7.7-4.7 11.4 1.2 3 6.9 4.3 11.8 2 11.6-5.5 12.7-19.8 1.4-32C67.7 26.7 66.8 18.3 72.8 10c3.9-5.4 2.9-8.4-1.9-9.5-2.2-.5-4.8-.7-6.9-.5z"/>
        <path fill="#5382A1" d="M89.7 101.4c-22.2 6.8-55.2 5.7-67.7-2.1-3.8-2.4-1.6-6.4 5.9-6.9 19.3-1.6 44.2-2.7 63.3 5.2 3.1 1.3 2.5 3.1-1.5 3.8z"/>
      </svg>
    `
  },
  go: {
    name: 'Go',
    color: '#00ADD8',
    bgColor: 'rgba(0, 173, 216, 0.14)',
    borderColor: 'rgba(0, 173, 216, 0.4)',
    deviconClass: 'devicon-go-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#00ADD8" d="M25.7 62.3c3.8-15.1 16.3-26 32.5-26 18.9 0 34.1 15.2 34.1 34.1s-15.2 34.1-34.1 34.1c-13 0-24.3-7.1-29.8-17.9l13-7c2.9 6.8 9.7 11.4 16.8 11.4 10.6 0 19.1-8.5 19.1-19.1 0-10.6-8.5-19.1-19.1-19.1-8.6 0-16.2 5.4-18.4 13.5h18.4v13.5H25.7v-7.5z"/>
        <path fill="#00ADD8" d="M96.8 47.3c15.2 0 27.1 11.9 27.1 27.1s-11.9 27.1-27.1 27.1-27.1-11.9-27.1-27.1 11.9-27.1 27.1-27.1zm0 13.5c-7.6 0-13.6 6-13.6 13.6s6 13.6 13.6 13.6 13.6-6 13.6-13.6-6-13.6-13.6-13.6z"/>
      </svg>
    `
  },
  rust: {
    name: 'Rust',
    color: '#CE422B',
    bgColor: 'rgba(206, 66, 43, 0.14)',
    borderColor: 'rgba(206, 66, 43, 0.4)',
    deviconClass: 'devicon-rust-original colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="62" fill="#241C15"/>
        <path fill="#CE422B" d="M64 12c-28.7 0-52 23.3-52 52s23.3 52 52 52 52-23.3 52-52-23.3-52-52-52zm0 16c19.9 0 36 16.1 36 36s-16.1 36-36 36-36-16.1-36-36 16.1-36 36-36z"/>
        <path fill="#FFF" d="M53.4 46.2h15.2c8.5 0 13.3 4.2 13.3 11 0 4.8-3.1 8.5-7.3 9.7l9.1 15.8h-7.8L68 68.3h-4.8v14.4h-9.8V46.2zm9.8 15h5.8c3.1 0 4.9-1.3 4.9-3.7 0-2.5-1.8-3.7-4.9-3.7h-5.8v7.4z"/>
      </svg>
    `
  },
  php: {
    name: 'PHP',
    color: '#777BB4',
    bgColor: 'rgba(119, 123, 180, 0.14)',
    borderColor: 'rgba(119, 123, 180, 0.4)',
    deviconClass: 'devicon-php-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="64" rx="60" ry="38" fill="#777BB4"/>
        <path fill="#FFF" d="M32 53.4h13.3c5.3 0 8.5 2.7 8.5 6.9 0 4.8-3.2 7.4-8.5 7.4h-6.4l-2.1 11.2H30.4l6.4-26.6h-4.8zm7 9.6h5.3c2.1 0 3.7-1.1 3.7-3.2s-1.6-2.1-3.7-2.1h-5.3l-1.1 4.8h1.1zm23.9-9.6h7.5l-2.7 10.7h11.7l2.7-10.7h7.5l-6.4 26.6h-7.5l2.7-10.7H66.9l-2.7 10.7h-7.5l6.9-26.6zm34.6 0h13.3c5.3 0 8.5 2.7 8.5 6.9 0 4.8-3.2 7.4-8.5 7.4h-6.4l-2.1 11.2h-6.4l6.4-26.6h-4.8zm7 9.6h5.3c2.1 0 3.7-1.1 3.7-3.2s-1.6-2.1-3.7-2.1h-5.3l-1.1 4.8h1.1z"/>
      </svg>
    `
  },
  sql: {
    name: 'SQL Database',
    color: '#00D2FF',
    bgColor: 'rgba(0, 210, 255, 0.14)',
    borderColor: 'rgba(0, 210, 255, 0.4)',
    deviconClass: 'devicon-postgresql-plain colored',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="28" rx="46" ry="15" fill="#00D2FF"/>
        <path d="M18 28v36c0 8.3 20.6 15 46 15s46-6.7 46-15V28" stroke="#00D2FF" stroke-width="9" fill="none"/>
        <path d="M18 64v36c0 8.3 20.6 15 46 15s46-6.7 46-15V64" stroke="#00D2FF" stroke-width="9" fill="none"/>
      </svg>
    `
  },
  algorithms: {
    name: 'Algoritmlar',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.14)',
    borderColor: 'rgba(236, 72, 153, 0.4)',
    deviconClass: 'ri-git-branch-line',
    svg: (size = 18) => `
      <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="24" r="16" fill="#EC4899"/>
        <circle cx="28" cy="96" r="15" fill="#A855F7"/>
        <circle cx="100" cy="96" r="15" fill="#3B82F6"/>
        <circle cx="64" cy="96" r="12" fill="#00FF88"/>
        <path d="M54 35L34 84M74 35l20 49M64 40v44" stroke="rgba(255,255,255,0.75)" stroke-width="8" stroke-linecap="round"/>
      </svg>
    `
  }
};

/**
 * Get language SVG icon (or Devicon fallback)
 */
export function getLanguageIconSvg(langKey, size = 18) {
  const key = (langKey || '').toLowerCase().trim();
  const found = LANGUAGE_ICONS[key];
  if (found) {
    return found.svg(size);
  }
  return `
    <svg class="lang-icon-svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.1)"/>
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 7l-2 10" stroke="#00FF88" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

/**
 * Get display name for language
 */
export function getLanguageDisplayName(langKey) {
  const key = (langKey || '').toLowerCase().trim();
  return LANGUAGE_ICONS[key]?.name || langKey.toUpperCase();
}

/**
 * Render a rich, high-quality language pill with official icon
 */
export function renderLanguagePill(langKey) {
  const key = (langKey || '').toLowerCase().trim();
  const info = LANGUAGE_ICONS[key];
  const icon = getLanguageIconSvg(key, 14);
  const name = info?.name || langKey;
  const style = info
    ? `background: ${info.bgColor}; border-color: ${info.borderColor}; color: #ffffff;`
    : '';

  return `<span class="lang-pill" style="${style}">${icon} <span class="lang-name">${name}</span></span>`;
}

/**
 * Course icon mapping to downloaded high-quality PNGs
 */
const COURSE_ICON_MAP = {
  python: '/images/python.png',
  javascript: '/images/js.png',
  js: '/images/js.png',
  typescript: '/images/typescript.png',
  ts: '/images/typescript.png',
  sql: '/images/sql-server.png',
  data: '/images/sql-server.png',
  algo: '/images/machine-learning.png',
  algorithm: '/images/machine-learning.png',
  html: '/images/html.svg',
  web: '/images/html.svg',
  css: '/images/html.svg',
};

/**
 * Get Course Track icon (High-res downloaded PNG)
 */
export function getCourseIconSvg(courseIdOrSlug, size = 32) {
  const id = (courseIdOrSlug || '').toLowerCase();

  for (const [key, src] of Object.entries(COURSE_ICON_MAP)) {
    if (id.includes(key)) {
      return `<img src="${src}" alt="${key}" width="${size}" height="${size}" class="course-icon-img" style="object-fit: contain;" />`;
    }
  }

  return `<img src="/images/js.png" alt="code" width="${size}" height="${size}" class="course-icon-img" style="object-fit: contain;" />`;
}

