// ============================================
// CodeDuel — Internationalization (i18n) Engine
// Supported: Uzbek (uz), English (en), Russian (ru)
// ============================================

const STORAGE_KEY = 'codeduel_lang';

export const translations = {
  uz: {
    // Navigation
    nav_home: 'Bosh sahifa',
    nav_courses: 'Kurslar',
    nav_playground: 'Playground',
    nav_challenges: 'Masalalar',
    nav_duel: 'AI Duel',
    nav_profile: 'Profil',
    nav_leaderboard: 'Reyting',
    nav_quests: 'Topshiriqlar',
    nav_sound_on: 'Ovoz yoqilgan',
    nav_sound_off: 'Ovoz o\'chirilgan',

    // Hero
    hero_badge: '🛡️ AI Davrida Haqiqiy Dasturchi Bo\'ling',
    hero_title_1: 'AI ga imkon bermang,',
    hero_title_accent: 'Bilimingizni Charxlang',
    hero_subtitle: 'AI yordamisiz toza kod yozing. Haqiqiy algoritmik masalalarni yeching, o\'z mahoratingizni isbotlang va 1-dan darajasiga ko\'tariling!',
    hero_btn_start: '⚔️ Kodlashni Boshlash',
    hero_btn_duel: '🤖 AI Bilan Duel',
    hero_btn_explore: 'Masalalarni Ko\'rish →',
    stat_challenges: 'Masalalar',
    stat_languages: 'Dasturlash Tillari',
    stat_warriors: 'Dasturchilar',

    // Features
    features_title: 'Nima uchun',
    features_subtitle: 'Platformamiz sizni kuchli, mustaqil va haqiqiy muhandis bo\'lib yetishishingizga yordam beradi.',
    feat_1_title: 'AI-Free Fikrlash',
    feat_1_desc: 'Bu yerda faqat o\'z miyangiz ishlaydi. Algoritmlarni chuqur tushunib, mustaqil kod yozish mahoratingizni charxlaysiz.',
    feat_2_title: '8+ Dasturlash Tili',
    feat_2_desc: 'JavaScript, Python, TypeScript, C++, Java, Go, PHP va Rust tillarida real vaqtda testlarni bajaring.',
    feat_3_title: '1v1 AI Duel Arena',
    feat_3_desc: 'Sun\'iy intellekt botlariga qarshi tezlik va aniqlik bo\'yicha real vaqtda kuch sinashing!',
    feat_4_title: 'Aqlli AI Mentor',
    feat_4_desc: 'Yechimni ko\'rsatmasdan, fikrlash yo\'nalishini beruvchi bosqichma-bosqich AI maslahatlar va Big-O tahlili.',
    feat_5_title: 'Rank & Dan Tizimi',
    feat_5_desc: '8-kyu dan 1-dan gacha o\'sing. Har bir yechilgan masala sizni buyuk usta (Grandmaster) darajasiga yaqinlashtiradi.',
    feat_6_title: 'Kundalik Topshiriqlar',
    feat_6_desc: 'Har kuni yangi missiyalarni bajaring, XP bonuslariga ega bo\'ling va streakingizni saqlang.',

    // Challenges Page
    challenges_title: '⚡ Masalalar To\'plami',
    challenges_subtitle: 'O\'zingizga mos qiyinlik va dasturlash tilini tanlab, bilimingizni sinang.',
    filter_difficulty: 'Qiyinlik:',
    filter_language: 'Dasturlash tili:',
    filter_status: 'Holat:',
    filter_search_placeholder: '🔍 Qidirish (nomi, tegi, kategoriya)...',
    filter_all: 'Barchasi',
    filter_solved: '✅ Yechilgan',
    filter_unsolved: '⬜ Yechilmagan',
    diff_8_kyu: '8 kyu (Boshlang\'ich)',
    diff_7_kyu: '7 kyu (Oson)',
    diff_6_kyu: '6 kyu (O\'rta)',
    diff_5_kyu: '5 kyu (Murakkab)',
    diff_4_kyu: '4 kyu (Qiyin)',
    diff_3_kyu: '3 kyu (Usta)',
    diff_2_kyu: '2 kyu (Ekspert)',
    diff_1_kyu: '1 kyu (Grandmaster)',

    // Challenge Detail
    btn_back: '← Ortga',
    detail_examples: '📋 Misollar',
    detail_input: 'Kiruvchi ma\'lumot',
    detail_output: 'Kutilayotgan natija',
    detail_xp_reward: '⚡ Bu masalani yechib <strong>+{xp} XP</strong> oling!',
    btn_reset: '↺ Tiklash',
    btn_format: '🪄 Formatlash',
    btn_ai_hint: '💡 AI Maslahat',
    btn_ai_review: '🔍 AI Tahlil',
    btn_custom_test: '🧪 Maxsus Test',
    btn_run: '▶ Testlarni Ishga Tushirish',
    btn_submit: '🚀 Yechimni Yuborish',
    tab_tests: '📊 Test Natijalari',
    tab_custom_test: '🧪 Maxsus Test',
    tab_ai_mentor: '🤖 AI Mentor',
    custom_test_placeholder: 'Masalan: [1, 2, 3, 4]',
    custom_test_btn_run: 'Maxsus Testni Ishlatish',
    test_placeholder: 'Testlarni ko\'rish uchun kodni ishga tushiring...',
    test_running: 'Testlar tekshirilmoqda...',
    timer_label: '⏱️ Vaqt:',

    // AI Copilot & Mentor
    ai_mentor_title: '🤖 AI Copilot & Mentor',
    ai_copilot_badge: 'Cyber AI',
    ai_status_online: 'Faol',
    ai_status_thinking: 'O\'ylamoqda...',
    ai_hint_tab: '💡 Maslahat olish',
    ai_review_tab: '🔍 Kod Tahlili & Big-O',
    ai_chat_tab: '💬 Mentor bilan Muloqot',
    ai_hint_level_1: '1-Bosqich: Asosiy g\'oya',
    ai_hint_level_2: '2-Bosqich: Mantiq va Edge-caselar',
    ai_hint_level_3: '3-Bosqich: Pseudo-kod tuzilmasi',
    ai_chip_hint_1: '💡 1-G\'oya',
    ai_chip_hint_2: '🧠 2-Mantiq',
    ai_chip_hint_3: '🛠️ 3-Skelet',
    ai_chip_review: '🔍 Big-O Tahlil',
    ai_chip_debug: '🐛 Xatoni Topish',
    ai_chip_optimize: '⚡ Optimizatsiya',
    ai_chip_explain: '❓ Tushuntirish',
    ai_btn_get_hint: 'Maslahatni ochish',
    ai_analyzing: 'AI kodingizni chuqur tahlil qilmoqda...',
    ai_chat_placeholder: 'Savol yozing yoki tezkor tugmani bosing... (Enter)',
    ai_send: 'Yuborish',
    ai_clear_chat: 'Chatni tozalash',
    ai_copy_code: 'Nusxa olish',
    ai_code_copied: 'Nusxalandi!',
    ai_floating_btn: '🤖 AI Copilot',
    ai_key_settings: '🤖 Bepul AI Provayderlar Sozlamalari',
    ai_key_placeholder: 'API kalitingizni kiriting...',
    ai_key_save: 'Saqlash',
    ai_test_btn: '⚡ Ulanishni Tekshirish',
    ai_get_free_key: 'Bepul kalit olish ↗',

    // Duel Arena
    duel_title: '⚔️ AI Duel Arena',
    duel_subtitle: 'Sun\'iy intellekt botlariga qarshi real vaqtda kodlash bellashuvi!',
    duel_select_bot: 'Raqibni Tanlang:',
    duel_bot_easy: '🤖 BuggyBot (Boshlang\'ich - 8 kyu)',
    duel_bot_med: '⚡ CyberNinja (O\'rta - 6 kyu)',
    duel_bot_hard: '🧙 AlgoMaster (Murakkab - 4 kyu)',
    duel_bot_insane: '👑 QuantumAI (Grandmaster - 2 kyu)',
    duel_start_btn: '⚔️ Dueni Boshlash!',
    duel_player_you: 'Siz',
    duel_player_bot: 'AI Bot',
    duel_status_ready: 'Tayyor! "Start" tugmasini bosing.',
    duel_status_battling: '🔥 Jang qizg\'in! Tezroq yeching!',
    duel_status_win: '🎉 G\'ALABA! Siz AI dan tezroq yechdingiz!',
    duel_status_lose: '💀 MAG\'LUBIYAT! AI sizdan oldinroq tugatdi.',
    duel_bonus_xp: 'Duel G\'alabasi: +{xp} XP bonus!',

    // Quests Drawer
    quests_title: '🎯 Kundalik Topshiriqlar',
    quests_subtitle: 'Har kuni yangilanadi. Qo\'shimcha XP va mukofotlarni oling!',
    quest_claim: 'Olish',
    quest_claimed: '✅ Olindi',
    quest_progress: 'Bajarilishi',

    // Profile Page
    profile_title: 'Foydalanuvchi Profili',
    profile_streak: 'kunlik streak',
    stat_total_xp: 'Umumiy XP',
    stat_solved: 'Yechilgan',
    stat_accuracy: 'Aniqlik',
    stat_best_streak: 'Eng yaxshi streak',
    stat_duel_wins: 'Duel G\'alabalari',
    radar_title: '🕸️ Ko\'nikmalar Radari (Skill Matrix)',
    radar_arrays: 'Massivlar',
    radar_strings: 'Stringlar',
    radar_algorithms: 'Algoritmlar',
    radar_math: 'Matematika',
    radar_logic: 'Mantiq',
    radar_ds: 'Strukturalar',
    progress_next_rank: '🎯 Keyingi Darajagacha Taraqqiyot',
    activity_title: '📅 Faollik Taqsimoti',
    badges_title: '🏅 Yutuqlar va Nishonlar (Badges)',
    recent_title: '📝 Oxirgi Yechilgan Masalalar',
    avatar_modal_title: '🥷 Avatarni Tanlang',

    // Leaderboard
    leaderboard_title: '🏆 Peshqadamlar Jadvali',
    lb_tab_weekly: 'Haftalik',
    lb_tab_alltime: 'Barcha Vaqt',
    lb_col_rank: 'O\'rin',
    lb_col_user: 'Dasturchi',
    lb_col_xp: 'XP',
    lb_col_solved: 'Yechilgan',

    // Modals & Notifications
    modal_success_title: '🎉 Masala Muvaffaqiyatli Yechildi!',
    modal_success_subtitle: 'Ajoyib natija! Bilimingiz oshmoqda.',
    modal_btn_next: 'Keyingi Masala →',
    modal_btn_close: 'Yopish',
    modal_rankup_title: '🌟 TABRIKLAYMIZ! DARAJANGIZ OSHDI!',
    modal_rankup_subtitle: 'Siz yangi unvonga sazovor bo\'ldingiz!',
    toast_copied: 'Nusxa olindi!',
    toast_reset: 'Kod dastlabki holatga qaytarildi',
    toast_submit_success: 'Barcha testlar o\'tdi! +{xp} XP qo\'shildi!',
    toast_submit_fail: 'Ba\'zi testlar o\'tmadi. Kodingizni qayta tekshiring.',
    toast_all_solved: 'Barcha masalalar muvaffaqiyatli yechildi! 🎉',
  },

  en: {
    // Navigation
    nav_home: 'Home',
    nav_courses: 'Courses',
    nav_playground: 'Playground',
    nav_challenges: 'Challenges',
    nav_duel: 'AI Duel',
    nav_profile: 'Profile',
    nav_leaderboard: 'Leaderboard',
    nav_quests: 'Quests',
    nav_sound_on: 'Sound Enabled',
    nav_sound_off: 'Sound Muted',

    // Hero
    hero_badge: '🛡️ AI-Proof Developer Platform',
    hero_title_1: 'Don\'t Let AI',
    hero_title_accent: 'Kill Your Skills',
    hero_subtitle: 'Write pure code without AI assistance. Solve authentic algorithmic challenges, prove your mastery, and advance to 1-dan Grandmaster rank!',
    hero_btn_start: '⚔️ Start Coding',
    hero_btn_duel: '🤖 Duel with AI',
    hero_btn_explore: 'Explore Challenges →',
    stat_challenges: 'Challenges',
    stat_languages: 'Languages',
    stat_warriors: 'Warriors',

    // Features
    features_title: 'Why',
    features_subtitle: 'Our platform transforms you into an autonomous, problem-solving software engineer.',
    feat_1_title: 'AI-Free Thinking',
    feat_1_desc: 'Only your brain works here. Master algorithms from first principles and write clean, resilient code.',
    feat_2_title: '8+ Modern Languages',
    feat_2_desc: 'Execute real-time tests in JavaScript, Python, TypeScript, C++, Java, Go, PHP, and Rust.',
    feat_3_title: '1v1 AI Duel Arena',
    feat_3_desc: 'Race against AI bots in real-time speed & accuracy battles with instant XP payouts!',
    feat_4_title: 'Intelligent AI Mentor',
    feat_4_desc: 'Get step-by-step guidance without code spoilers, plus automated Big-O complexity audits.',
    feat_5_title: 'Kyu & Dan Progression',
    feat_5_desc: 'Climb from 8-kyu novice to 1-dan Grandmaster. Every solved kata brings you closer to mastery.',
    feat_6_title: 'Daily Missions & Quests',
    feat_6_desc: 'Complete daily algorithmic quests to earn bonus XP, build streaks, and unlock legendary badges.',

    // Challenges Page
    challenges_title: '⚡ Challenge Katas',
    challenges_subtitle: 'Select your preferred difficulty and language, then dive into coding challenges.',
    filter_difficulty: 'Difficulty:',
    filter_language: 'Language:',
    filter_status: 'Status:',
    filter_search_placeholder: '🔍 Search by title, tag, or topic...',
    filter_all: 'All',
    filter_solved: '✅ Solved',
    filter_unsolved: '⬜ Unsolved',
    diff_8_kyu: '8 kyu (Beginner)',
    diff_7_kyu: '7 kyu (Easy)',
    diff_6_kyu: '6 kyu (Medium)',
    diff_5_kyu: '5 kyu (Intermediate)',
    diff_4_kyu: '4 kyu (Hard)',
    diff_3_kyu: '3 kyu (Advanced)',
    diff_2_kyu: '2 kyu (Expert)',
    diff_1_kyu: '1 kyu (Grandmaster)',

    // Challenge Detail
    btn_back: '← Back',
    detail_examples: '📋 Examples',
    detail_input: 'Input',
    detail_output: 'Output',
    detail_xp_reward: '⚡ Solve this challenge to earn <strong>+{xp} XP</strong>!',
    btn_reset: '↺ Reset',
    btn_format: '🪄 Format',
    btn_ai_hint: '💡 AI Hint',
    btn_ai_review: '🔍 AI Review',
    btn_custom_test: '🧪 Custom Test',
    btn_run: '▶ Run Tests',
    btn_submit: '🚀 Submit Solution',
    tab_tests: '📊 Test Results',
    tab_custom_test: '🧪 Custom Test',
    tab_ai_mentor: '🤖 AI Mentor',
    custom_test_placeholder: 'e.g. [1, 2, 3, 4]',
    custom_test_btn_run: 'Run Custom Input',
    test_placeholder: 'Run your code to see test results...',
    test_running: 'Running test cases...',
    timer_label: '⏱️ Timer:',

    // AI Copilot & Mentor
    ai_mentor_title: '🤖 AI Copilot & Mentor',
    ai_copilot_badge: 'Cyber AI',
    ai_status_online: 'Online',
    ai_status_thinking: 'Thinking...',
    ai_hint_tab: '💡 Hints & Guidance',
    ai_review_tab: '🔍 Code Review & Big-O',
    ai_chat_tab: '💬 Chat with Mentor',
    ai_hint_level_1: 'Level 1: Core Concept',
    ai_hint_level_2: 'Level 2: Logic & Edge Cases',
    ai_hint_level_3: 'Level 3: Pseudo-code Blueprint',
    ai_chip_hint_1: '💡 1-Concept',
    ai_chip_hint_2: '🧠 2-Logic',
    ai_chip_hint_3: '🛠️ 3-Blueprint',
    ai_chip_review: '🔍 Big-O Review',
    ai_chip_debug: '🐛 Find Bug',
    ai_chip_optimize: '⚡ Optimize',
    ai_chip_explain: '❓ Explain',
    ai_btn_get_hint: 'Unlock Hint',
    ai_analyzing: 'AI is analyzing your code structure...',
    ai_chat_placeholder: 'Ask a question or click an action chip... (Enter)',
    ai_send: 'Send',
    ai_clear_chat: 'Clear Chat',
    ai_copy_code: 'Copy Code',
    ai_code_copied: 'Copied!',
    ai_floating_btn: '🤖 AI Copilot',
    ai_key_settings: '🤖 Free AI Providers & API Keys',
    ai_key_placeholder: 'Enter your API key...',
    ai_key_save: 'Save Key',
    ai_test_btn: '⚡ Test Connection',
    ai_get_free_key: 'Get Free Key ↗',

    // Duel Arena
    duel_title: '⚔️ 1v1 AI Duel Arena',
    duel_subtitle: 'Real-time competitive coding against autonomous AI opponents!',
    duel_select_bot: 'Select Opponent:',
    duel_bot_easy: '🤖 BuggyBot (Novice - 8 kyu)',
    duel_bot_med: '⚡ CyberNinja (Skilled - 6 kyu)',
    duel_bot_hard: '🧙 AlgoMaster (Veteran - 4 kyu)',
    duel_bot_insane: '👑 QuantumAI (Grandmaster - 2 kyu)',
    duel_start_btn: '⚔️ Launch Duel!',
    duel_player_you: 'You',
    duel_player_bot: 'AI Bot',
    duel_status_ready: 'Ready! Click Start Duel to begin.',
    duel_status_battling: '🔥 Duel in progress! Speed up your code!',
    duel_status_win: '🎉 VICTORY! You outcoded the AI!',
    duel_status_lose: '💀 DEFEAT! AI finished first.',
    duel_bonus_xp: 'Duel Victory: +{xp} XP bonus!',

    // Quests Drawer
    quests_title: '🎯 Daily Quests',
    quests_subtitle: 'Refreshed every 24 hours. Earn extra XP and achievements!',
    quest_claim: 'Claim',
    quest_claimed: '✅ Claimed',
    quest_progress: 'Progress',

    // Profile Page
    profile_title: 'Warrior Profile',
    profile_streak: 'day streak',
    stat_total_xp: 'Total XP',
    stat_solved: 'Solved',
    stat_accuracy: 'Accuracy',
    stat_best_streak: 'Best Streak',
    stat_duel_wins: 'Duel Wins',
    radar_title: '🕸️ Skill Matrix (Radar Chart)',
    radar_arrays: 'Arrays',
    radar_strings: 'Strings',
    radar_algorithms: 'Algorithms',
    radar_math: 'Math',
    radar_logic: 'Logic',
    radar_ds: 'Structures',
    progress_next_rank: '🎯 Progress to Next Rank',
    activity_title: '📅 Activity Heatmap',
    badges_title: '🏅 Badges & Trophies',
    recent_title: '📝 Recent Solutions',
    avatar_modal_title: '🥷 Choose Your Avatar',

    // Leaderboard
    leaderboard_title: '🏆 Global Leaderboard',
    lb_tab_weekly: 'Weekly',
    lb_tab_alltime: 'All-Time',
    lb_col_rank: 'Rank',
    lb_col_user: 'Warrior',
    lb_col_xp: 'XP',
    lb_col_solved: 'Solved',

    // Modals & Notifications
    modal_success_title: '🎉 Challenge Conquered!',
    modal_success_subtitle: 'Outstanding work! Your algorithmic skills are leveling up.',
    modal_btn_next: 'Next Challenge →',
    modal_btn_close: 'Close',
    modal_rankup_title: '🌟 CONGRATULATIONS! RANK PROMOTION!',
    modal_rankup_subtitle: 'You have earned a new rank title!',
    toast_copied: 'Copied to clipboard!',
    toast_reset: 'Code reset to initial template',
    toast_submit_success: 'All tests passed! +{xp} XP added!',
    toast_submit_fail: 'Some tests failed. Check your logic and retry.',
    toast_all_solved: 'All challenges completed! 🎉',
  },

  ru: {
    // Navigation
    nav_home: 'Главная',
    nav_courses: 'Курсы',
    nav_playground: 'Песочница',
    nav_challenges: 'Задачи',
    nav_duel: 'AI Дуэль',
    nav_profile: 'Профиль',
    nav_leaderboard: 'Рейтинг',
    nav_quests: 'Задания',
    nav_sound_on: 'Звук включен',
    nav_sound_off: 'Звук выключен',

    // Hero
    hero_badge: '🛡️ Платформа Программистов Эры AI',
    hero_title_1: 'Не позволяй AI',
    hero_title_accent: 'Убить Твои Навыки',
    hero_subtitle: 'Пишите чистый код без помощи AI. Решайте алгоритмические задачи, докажите мастерство и достигните ранга 1-дан!',
    hero_btn_start: '⚔️ Начать Кодить',
    hero_btn_duel: '🤖 Дуэль с AI',
    hero_btn_explore: 'Все Задачи →',
    stat_challenges: 'Задач',
    stat_languages: 'Языков',
    stat_warriors: 'Воинов',

    // Features
    features_title: 'Почему',
    features_subtitle: 'Наша платформа помогает стать сильным и независимым инженером-программистом.',
    feat_1_title: 'Мышление без AI',
    feat_1_desc: 'Здесь работает только ваш мозг. Понимайте алгоритмы глубоко и пишите надежный код.',
    feat_2_title: '8+ Языков',
    feat_2_desc: 'Запуск тестов в реальном времени на JavaScript, Python, TypeScript, C++, Java, Go, PHP и Rust.',
    feat_3_title: '1v1 AI Дуэль Арена',
    feat_3_desc: 'Соревнуйтесь на скорость и точность с ботами искусственного интеллекта в реальном времени!',
    feat_4_title: 'Умный AI Ментор',
    feat_4_desc: 'Пошаговые подсказки без спойлеров решений и автоматический аудит Big-O сложности.',
    feat_5_title: 'Система Рангов (Кю и Дан)',
    feat_5_desc: 'Развивайтесь от 8-кю новичка до 1-дан Грандмастера. Каждая задача приближает к цели.',
    feat_6_title: 'Ежедневные Квесты',
    feat_6_desc: 'Выполняйте ежедневные миссии, получайте бонусный XP и сохраняйте непрерывный стрик.',

    // Challenges Page
    challenges_title: '⚡ Ката Задач',
    challenges_subtitle: 'Выберите язык и уровень сложности, чтобы начать тренировку.',
    filter_difficulty: 'Сложность:',
    filter_language: 'Язык:',
    filter_status: 'Статус:',
    filter_search_placeholder: '🔍 Поиск по названию или тегу...',
    filter_all: 'Все',
    filter_solved: '✅ Решенные',
    filter_unsolved: '⬜ Нерешенные',
    diff_8_kyu: '8 кю (Начальный)',
    diff_7_kyu: '7 кю (Легкий)',
    diff_6_kyu: '6 кю (Средний)',
    diff_5_kyu: '5 кю (Продвинутый)',
    diff_4_kyu: '4 кю (Сложный)',
    diff_3_kyu: '3 кю (Мастер)',
    diff_2_kyu: '2 кю (Эксперт)',
    diff_1_kyu: '1 кю (Грандмастер)',

    // Challenge Detail
    btn_back: '← Назад',
    detail_examples: '📋 Примеры',
    detail_input: 'Входные данные',
    detail_output: 'Ожидаемый результат',
    detail_xp_reward: '⚡ Решите эту задачу и получите <strong>+{xp} XP</strong>!',
    btn_reset: '↺ Сброс',
    btn_format: '🪄 Форматировать',
    btn_ai_hint: '💡 Подсказка AI',
    btn_ai_review: '🔍 Анализ AI',
    btn_custom_test: '🧪 Свой Тест',
    btn_run: '▶ Запустить Тесты',
    btn_submit: '🚀 Отправить Решение',
    tab_tests: '📊 Результаты Тестов',
    tab_custom_test: '🧪 Свой Тест',
    tab_ai_mentor: '🤖 AI Ментор',
    custom_test_placeholder: 'Например: [1, 2, 3, 4]',
    custom_test_btn_run: 'Выполнить Свой Тест',
    test_placeholder: 'Запустите код для проверки тестов...',
    test_running: 'Тестирование выполняется...',
    timer_label: '⏱️ Время:',

    // AI Copilot & Mentor
    ai_mentor_title: '🤖 AI Копилот & Ментор',
    ai_copilot_badge: 'Cyber AI',
    ai_status_online: 'Онлайн',
    ai_status_thinking: 'Думает...',
    ai_hint_tab: '💡 Подсказки',
    ai_review_tab: '🔍 Ревью Кода & Big-O',
    ai_chat_tab: '💬 Чat с Ментором',
    ai_hint_level_1: 'Уровень 1: Ключевая концепция',
    ai_hint_level_2: 'Уровень 2: Логика и граничные случаи',
    ai_hint_level_3: 'Уровень 3: Псевдокод решения',
    ai_chip_hint_1: '💡 1-Идея',
    ai_chip_hint_2: '🧠 2-Логика',
    ai_chip_hint_3: '🛠️ 3-Скелет',
    ai_chip_review: '🔍 Big-O Анализ',
    ai_chip_debug: '🐛 Найти Ошибку',
    ai_chip_optimize: '⚡ Оптимизация',
    ai_chip_explain: '❓ Объяснить',
    ai_btn_get_hint: 'Открыть Подсказку',
    ai_analyzing: 'AI глубоко анализирует структуру кода...',
    ai_chat_placeholder: 'Задайте вопрос или выберите действие... (Enter)',
    ai_send: 'Отправить',
    ai_clear_chat: 'Очистить чат',
    ai_copy_code: 'Копировать',
    ai_code_copied: 'Скопировано!',
    ai_floating_btn: '🤖 AI Копилот',
    ai_key_settings: '🤖 Настройки Бесплатных AI Провайдеров',
    ai_key_placeholder: 'Введите ваш API ключ...',
    ai_key_save: 'Сохранить',
    ai_test_btn: '⚡ Проверить Соединение',
    ai_get_free_key: 'Получить бесплатный ключ ↗',

    // Duel Arena
    duel_title: '⚔️ AI Дуэль Арена',
    duel_subtitle: 'Битва по написанию кода против ботов ИИ в реальном времени!',
    duel_select_bot: 'Выберите Соперника:',
    duel_bot_easy: '🤖 BuggyBot (Новичок - 8 кю)',
    duel_bot_med: '⚡ CyberNinja (Опытный - 6 кю)',
    duel_bot_hard: '🧙 AlgoMaster (Ветеран - 4 кю)',
    duel_bot_insane: '👑 QuantumAI (Грандмастер - 2 кю)',
    duel_start_btn: '⚔️ Начать Дуэль!',
    duel_player_you: 'Вы',
    duel_player_bot: 'AI Бот',
    duel_status_ready: 'Готовы! Нажмите "Начать Дуэль".',
    duel_status_battling: '🔥 Битва началась! Пишите код быстрее!',
    duel_status_win: '🎉 ПОБЕДА! Вы обогнали искусственный интеллект!',
    duel_status_lose: '💀 ПОРАЖЕНИЕ! AI завершил решение раньше.',
    duel_bonus_xp: 'Победа в дуэли: +{xp} XP бонус!',

    // Quests Drawer
    quests_title: '🎯 Ежедневные Квесты',
    quests_subtitle: 'Обновляются каждые 24 часа. Получайте дополнительный XP!',
    quest_claim: 'Забрать',
    quest_claimed: '✅ Забрано',
    quest_progress: 'Прогресс',

    // Profile Page
    profile_title: 'Профиль Воина',
    profile_streak: 'дней подряд',
    stat_total_xp: 'Всего XP',
    stat_solved: 'Решено',
    stat_accuracy: 'Точность',
    stat_best_streak: 'Лучший стрик',
    stat_duel_wins: 'Побед в дуэлях',
    radar_title: '🕸️ Матрица Навыков (Радар)',
    radar_arrays: 'Массивы',
    radar_strings: 'Строки',
    radar_algorithms: 'Алгоритмы',
    radar_math: 'Математика',
    radar_logic: 'Логика',
    radar_ds: 'Структуры',
    progress_next_rank: '🎯 Прогресс до Следующего Ранга',
    activity_title: '📅 Активность',
    badges_title: '🏅 Награды и Бейджи',
    recent_title: '📝 Недавние Решения',
    avatar_modal_title: '🥷 Выберите Аватар',

    // Leaderboard
    leaderboard_title: '🏆 Таблица Лидеров',
    lb_tab_weekly: 'Неделя',
    lb_tab_alltime: 'Все Время',
    lb_col_rank: 'Место',
    lb_col_user: 'Воин',
    lb_col_xp: 'XP',
    lb_col_solved: 'Решено',

    // Modals & Notifications
    modal_success_title: '🎉 Задача Успешно Решена!',
    modal_success_subtitle: 'Отличная работа! Ваш уровень мастерства растет.',
    modal_btn_next: 'Следующая Задача →',
    modal_btn_close: 'Закрыть',
    modal_rankup_title: '🌟 ПОЗДРАВЛЯЕМ! ПОВЫШЕНИЕ РАНГА!',
    modal_rankup_subtitle: 'Вам присвоен новый почетный титул!',
    toast_copied: 'Скопировано в буфер!',
    toast_reset: 'Код сброшен к исходному шаблону',
    toast_submit_success: 'Все тесты пройдены! +{xp} XP добавлено!',
    toast_submit_fail: 'Часть тестов не прошла. Проверьте ваш код.',
    toast_all_solved: 'Все задачи успешно решены! 🎉',
  }
};

let currentLang = 'uz';

export function initI18n() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'uz' || saved === 'en' || saved === 'ru')) {
      currentLang = saved;
    }
  } catch (e) {
    currentLang = 'uz';
  }
  applyTranslations();
  return currentLang;
}

export function getLanguage() {
  return currentLang;
}

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyTranslations();
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
}

export function t(key, params = {}) {
  const dict = translations[currentLang] || translations.uz;
  let text = dict[key] || translations.en[key] || key;

  Object.keys(params).forEach(k => {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
  });

  return text;
}

export function applyTranslations() {
  // Translate elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.innerHTML = t(key);
    }
  });

  // Translate placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.setAttribute('placeholder', t(key));
    }
  });

  // Translate titles with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.setAttribute('title', t(key));
    }
  });
}
