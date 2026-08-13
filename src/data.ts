export type Project = {
  id: string
  title: string
  kind: 'public' | 'nda'
  eyebrow: string
  description: string
  impact: string[]
  stack: string[]
  metrics: string[]
  url?: string
  embed?: string
  mediaHint?: string
  gallery?: { src: string; alt: string }[]
  galleryLayout?: 'phone' | 'wide'
  phonePreview?: string
}

export const profile = {
  name: 'Максим Кочергин',
  role: 'Senior Full Stack AI Engineer',
  intro:
    'Проектирую и запускаю AI-first продукты: от технической гипотезы и архитектуры до production, наблюдаемости и развития.',
  location: 'Remote · Worldwide',
  telegram: 'https://t.me/Drakedog_ee',
}

export const principles = [
  ['01', 'Architecture before implementation', 'Начинаю с ограничений, контрактов, потоков данных и сценариев отказа.'],
  ['02', 'AI as an engineering tool', 'Использую LLM и агентов для ускорения работы, сохраняя контроль качества и решений.'],
  ['03', 'Production-first', 'Закладываю идемпотентность, retries, логи, метрики, тесты и понятную эксплуатацию.'],
]

export const metrics = {
  law: {
    title: 'Закон Гудхарта',
    quote:
      'Когда метрика становится целью, она перестаёт быть хорошей метрикой.',
    note:
      'Ниже — проектные ориентиры для оценки эффекта: их нужно сверять с production-аналитикой перед использованием как фактических KPI.',
  },
  scenarios: [
    {
      id: 'seo',
      label: 'SEO Magic',
      metric: 'Подготовка SEO-материала',
      before: 240,
      after: 25,
      unit: 'мин',
      delta: '−90%',
      note: 'Черновик с ключами, структурой и оформлением вместо ручного старта с нуля.',
    },
    {
      id: 'matching',
      label: 'AI Matching',
      metric: 'Ручной разбор до shortlist',
      before: 180,
      after: 15,
      unit: 'мин',
      delta: '−92%',
      note: 'Векторный pre-filter убирает нерелевантные пары до детального анализа.',
    },
    {
      id: 'recovery',
      label: 'Operational Recovery',
      metric: 'Ручная нагрузка команды',
      before: 3.22,
      after: 0.4,
      unit: 'FTE / мес',
      delta: 'до −88%',
      note: 'Подтверждённый потенциал высвобождения — до 3,22 FTE в месяц; остаток — контроль исключений.',
    },
    {
      id: 'onepage',
      label: 'ONEpage Bot',
      metric: 'От описания до публикации',
      before: 120,
      after: 5,
      unit: 'мин',
      delta: '−96%',
      note: 'AI-генерация, preview, wildcard DNS и публикация — в одном Telegram-flow.',
    },
    {
      id: 'fincheck',
      label: 'Financial Reconciliation',
      metric: 'Ручной контроль одного прогона',
      before: 45,
      after: 5,
      unit: 'мин',
      delta: '−89%',
      note: 'Оркестрация статусов, логов и непустых error-файлов без ручного ожидания ноутбука.',
    },
  ],
}

export const experience = [
  {
    period: '07.2025 — 01.2026',
    company: 'Авито',
    role: 'Инженер по автоматизации бизнес-процессов',
    summary:
      'Внутренние платформы автоматизации и AI-решения в кросс-функциональной продуктовой команде.',
    points: [
      'Проектирование workflow, интеграций, API-контрактов и технической документации.',
      'Оркестрация процессов на n8n: события, ошибки, повторные попытки, уведомления и мониторинг.',
      'Работа с production-системами в инженерных процессах BigTech: Agile, CI/CD и обязательный code review.',
    ],
  },
  {
    period: '06.2024 — 07.2025',
    company: 'NK-JAX',
    role: 'Senior Full Stack AI Engineer',
    summary:
      'AI-first продукты для e-commerce: генерация контента, RAG-системы и автоматизация обработки отзывов.',
    points: [
      'Полный цикл: TDR, декомпозиция, архитектура, разработка, деплой и сопровождение.',
      'React/TypeScript/Node.js-продукты, AI workflow, очереди и интеграции с внешними сервисами.',
      'CI/CD, Docker, Linux/VPS и модульная архитектура с фокусом на поддерживаемость.',
    ],
  },
  {
    period: '09.2023 — 06.2024',
    company: 'Axioma',
    role: 'Fullstack-разработчик',
    summary: 'AI-сервисы для бизнес-процессов, backend-интеграции и клиентские веб-интерфейсы.',
    points: [
      'Python API и RAG-архитектуры для документов, отзывов и пользовательских данных.',
      'Очереди, вебхуки, идемпотентная обработка задач и Docker-деплой.',
      'Поддержка производительности, ETL-процессов и масштабирования серверной инфраструктуры.',
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'rangor',
    title: 'Rangor',
    kind: 'public',
    eyebrow: 'Context layer for engineering teams',
    description:
      'SaaS, который собирает решения, риски и актуальные факты задачи из Jira, Confluence, GitHub, Slack и Drive в единый permission-aware briefing для инженеров и AI-агентов.',
    impact: [
      'Контекст задачи вместо ручного поиска и копирования между системами.',
      'Context Guard проверяет PR на противоречия ранее принятым решениям до merge.',
      'Единый UCP-пакет с происхождением фактов, конфликтами и изменениями контекста.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Temporal Graph', 'GitHub App', 'Jira', 'Confluence', 'Slack', 'Google Drive', 'MCP', 'OAuth', 'ACL / ReBAC', 'UCP'],
    metrics: ['~2–4× меньше контекста на типовой задаче', 'До 15× сжатие длинных обсуждений без потери решений', 'Контекст задачи: минуты → секунды'],
    url: 'https://rangor.io/',
    embed: 'https://rangor.io/',
  },
  {
    id: 'shadowgpt',
    title: 'ShadowGPT',
    kind: 'public',
    eyebrow: 'Shadow AI protection · Chrome extension',
    description:
      'Расширение и cloud dashboard для контроля Shadow AI: мониторинг промптов и вложений в ChatGPT, Claude, Gemini и других сервисах до утечки корпоративных данных. Расширение уже доступно в Google Chrome Web Store / App Market.',
    impact: [
      'Уникальная архитектура: ML-модель встроена прямо в расширение и анализирует данные локально на устройстве.',
      'В отличие от типичных «AI DLP», где проверка ПДн уходит на LLM разработчика (и данные всё равно утекают), здесь prompt/файлы не отправляются на сервер — в облако уходят только метаданные и уровень риска.',
      'Многослойный детект: regex → custom rules → NER/PII → локальный LLM; перехват PDF/DOCX/кода и OCR изображений.',
      'Privacy Mode: анонимизация чувствительных полей перед отправкой в публичные AI-сервисы; админский dashboard для политик и аудита.',
    ],
    stack: ['Chrome Extension (MV3)', 'TypeScript', 'On-device ML', 'Web Worker', 'NER / Presidio', 'Regex', 'OCR', 'PII Detection', 'Cloud Dashboard', 'Policy Engine', 'Audit Log'],
    metrics: ['0 байт prompt/файлов в облако при local mode', '4 уровня проверки до отправки запроса', '19+ AI-сервисов под мониторингом'],
    url: 'https://shadowgpt.app/',
    embed: 'https://shadowgpt.app/',
  },
  {
    id: 'axioma8',
    title: 'Axioma8',
    kind: 'public',
    eyebrow: 'AI orchestration platform',
    description:
      'Платформа автоматизации на базе ИИ: управляемые пайплайны, политики, RAG и агенты. Акцент не на «умности модели», а на воспроизводимых, проверяемых и встраиваемых в бизнес-контур выводах.',
    impact: [
      'Стек слоями: данные → знания → оркестрация → модели → контроль; модели — сменяемый слой.',
      'Визуальная оркестрация workflow/chatflow, human-in-the-loop, версии пайплайнов и трассировка решений.',
      'RAG, агентный фреймворк, REST API для встраивания в корпоративные сервисы.',
      'Правила, политики доступа, аудит и валидация — чтобы AI-выводы можно было объяснить и масштабировать.',
    ],
    stack: ['LLMOps', 'RAG', 'Embeddings', 'Agent Framework', 'Visual Workflow', 'REST API', 'Prompt Orchestration', 'Policy Engine', 'Human-in-the-loop', 'Audit / Tracing'],
    metrics: ['Настройка AI workflow: недели → дни', '1 управляемый контур вместо набора разрозненных AI-интеграций', '100% версионируемых правил и пайплайнов'],
    url: 'https://axioma8.ru/',
    embed: 'https://axioma8.ru/',
  },
  {
    id: 'hiremi',
    title: 'Hiremi',
    kind: 'public',
    eyebrow: 'AI-рекрутер · интеграция с Bitrix24',
    description:
      'Продуктовый AI-рекрутер с глубокой интеграцией Bitrix24: помогает рекрутинговой команде быстрее обрабатывать поток кандидатов и вести подбор внутри CRM, не меняя рабочий контур.',
    impact: [
      'Интеграция с Bitrix24: стадии, карточки, ответственные и действия рекрутера живут в CRM.',
      'AI-автоматизация рутинных этапов подбора без отдельного изолированного инструмента.',
      'Прозрачные статусы и сценарии вокруг CRM-процесса, а не вокруг чат-бота «сбоку».',
    ],
    stack: ['Bitrix24 REST API', 'Webhooks', 'LLM', 'AI Automation', 'Workflow Engine', 'CRM Integration', 'SaaS', 'Role-based Access'],
    metrics: ['До 60% меньше ручных действий рекрутера в типовом сценарии', 'Карточка кандидата: минуты ручного разбора → <1 минуты AI-подготовки', '1 рабочее место вместо переключения между CRM и отдельным AI-инструментом'],
    url: 'https://hiremi.ru/',
    embed: 'https://hiremi.ru/',
  },
  {
    id: 'onepage',
    title: 'ONEpage Bot',
    kind: 'public',
    eyebrow: 'Telegram → link-in-bio factory',
    description:
      'Telegram-бот, который по одному описанию и медиа собирает link-in-bio страницу, сразу деплоит её, вешает поддомен через wildcard DNS и отдаёт метрики посещений и кликов.',
    impact: [
      'Сценарий: brief + фото → AI-генерация HTML → preview → publish на `{slug}.domain`.',
      'Wildcard-инфраструктура и renderer: каждая страница кастомизируется, версионируется и живёт как самостоятельный сайт.',
      'Очередь worker’ов (BullMQ), биллинг, рефералка, админка и аналитика трафика по ссылкам.',
      'Monorepo: Fastify API, grammY bot, AI worker, Nginx/S3, PostgreSQL + Redis.',
    ],
    stack: ['TypeScript', 'pnpm Workspaces', 'Telegram / grammY', 'Fastify', 'BullMQ', 'PostgreSQL 16', 'Drizzle ORM', 'Redis 7', 'S3 / MinIO', 'Nginx', 'Wildcard DNS', 'OpenAI / Anthropic', 'Docker Compose'],
    metrics: ['Описание → опубликованная страница: ~5 минут', '0 ручных действий DevOps для выдачи поддомена', '7 дней TTL для preview + автоматическая очистка'],
    url: 'https://annatarieli.onepage.ink/',
    phonePreview: 'https://annatarieli.onepage.ink/',
    galleryLayout: 'phone',
    gallery: [
      { src: '/onepage/bot-home.png', alt: 'Главное меню Telegram-бота ONEpage' },
      { src: '/onepage/bot-page.png', alt: 'Управление опубликованной страницей в Telegram-боте ONEpage' },
      { src: '/onepage/bot-stats.png', alt: 'Статистика просмотров и кликов в Telegram-боте ONEpage' },
    ],
  },
  {
    id: 'seo-magic',
    title: 'SEO Magic',
    kind: 'nda',
    eyebrow: 'NDA · Content factory for SEO & marketplaces',
    description:
      'Контент-завод для SEO-статей и медиа под маркетплейсы: многоступенчатые AI-агенты, очереди задач, студия карточек и конструктор вертикального RICH-контента.',
    impact: [
      'Генерация SEO-текстов по keyword + LSI: информационные, продающие и экспертные форматы.',
      'Асинхронный пайплайн: токены → job в БД → webhook n8n → polling статуса → результат/экспорт.',
      'AI-конструктор RICH-полотна для МП: OCR, анализ визуала, блоки Hero/USP/характеристики, drag-and-drop и единый вертикальный экспорт.',
      'Управление промптами, историей задач, биллингом токенов, доступом и support-контуром.',
    ],
    stack: ['React 18', 'Vite', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Framer Motion', 'TanStack Query', 'React Router', 'React Hook Form', 'Zod', 'Supabase', 'PostgreSQL', 'Storage', 'n8n', 'LLM Agents', 'OCR'],
    metrics: ['Подготовка SEO-материала: ~3–5 часов → 20–30 минут', 'RICH-полотно: несколько ручных макетов → 1 AI-пайплайн до 60 секунд', 'До 70% меньше времени на черновой контент и оформление'],
    url: 'https://ai-designer-pres.vercel.app/',
    embed: 'https://ai-designer-pres.vercel.app/',
  },
  {
    id: 'matching',
    title: 'AI Matching Platform',
    kind: 'nda',
    eyebrow: 'NDA · HR automation · Bitrix24',
    description:
      'Сервис семантического сопоставления вакансий и кандидатов с интеграцией Bitrix24: синхронизирует изменения по вебхукам, формирует векторный shortlist и даёт объяснимую оценку соответствия.',
    impact: [
      'Интеграция с Bitrix24: роботы/вебхуки на воронках, pull через REST API, опциональные уведомления менеджерам.',
      'Двухэтапный отбор: vector pre-filter (pgvector) и глубокий LLM-анализ только релевантных пар.',
      'Кэширование по хэшам исходных данных, чтобы не пересчитывать неизменившиеся сущности.',
      'Ролевая web-панель с сортировкой, фильтрами, историей и ручным пересчётом.',
    ],
    stack: ['Python', 'FastAPI', 'Pydantic', 'SQLAlchemy', 'PostgreSQL 16', 'pgvector', 'Celery', 'Redis', 'Bitrix24 REST API', 'Webhooks', 'OpenAI-compatible LLM', 'Embeddings', 'JWT', 'Docker Compose', 'Nginx'],
    metrics: ['Shortlist: часы ручного разбора → ~10–15 минут', 'До 80% меньше CV на ручной детальный разбор за счёт pre-filter', 'LLM-расходы до 10–50× ниже благодаря кэшированию и rerank'],
    mediaHint: 'Здесь можно разместить скриншот дашборда матчинга',
  },
  {
    id: 'sourcer',
    title: 'AI Candidate Sourcer',
    kind: 'nda',
    eyebrow: 'NDA · Recruitment ops · Bitrix24',
    description:
      'Система первичного сорсинга под заявки с интеграцией Bitrix24: переводит требования в поисковую стратегию, ранжирует результаты и оставляет решение о передаче кандидата за рекрутером.',
    impact: [
      'Интеграция с Bitrix24: запуск по стадии заявки, Workplace UI внутри CRM, передача кандидата в воронку найма по кнопке рекрутера.',
      'n8n как ingress-оркестратор; доменное ядро на FastAPI с адаптерами CRM/source.',
      'Асинхронные worker-процессы: поиск, анализ CV, коммуникации, CRM-операции.',
      'Детерминированная оценка поверх LLM-фактов: объяснимые критерии, пороги GOAL×K и аудит.',
    ],
    stack: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'SQLAlchemy 2.0', 'Alembic', 'Celery', 'Redis 7', 'PostgreSQL 16', 'pgvector', 'TimescaleDB', 'n8n', 'Bitrix24 REST API', 'Webhooks', 'React / Vue', 'Docker Compose', 'Nginx', 'Playwright'],
    metrics: ['Сбор первичного shortlist: часы → 15–30 минут', 'До 70% меньше CV открывается для глубокого анализа', 'Целевой результат: 3 годных кандидата × коэффициент конверсии без ручной рутины'],
    mediaHint: 'Здесь можно разместить схему пайплайна или экран workplace-интерфейса',
  },
  {
    id: 'cv-robot',
    title: 'CV Processing Assistant',
    kind: 'nda',
    eyebrow: 'NDA · Document intelligence',
    description:
      'Корпоративный Telegram-ассистент для приёма резюме, извлечения структурированных данных и подготовки документов по единому шаблону.',
    impact: [
      'Обработка PDF, DOCX и ссылок с дедупликацией по составному SHA-256 хэшу.',
      'LLM извлекает данные в валидируемую JSON-схему; предусмотрен fallback провайдера.',
      'Контроль доступа, аудит, TTL хранения и повторная выдача результата из кэша.',
    ],
    stack: ['Python', 'FastAPI', 'aiogram / python-telegram-bot', 'Apache Tika', 'OpenAI GPT-4.1 mini', 'YandexGPT fallback', 'LiteLLM', 'Redis', 'PostgreSQL', 'MinIO', 'docxtpl', 'Docker Compose'],
    metrics: ['Подготовка CV: ~20 минут → 1–2 минуты', 'Кэш-повтор: секунды вместо полного повторного pipeline', 'До 95% повторных материалов обрабатываются без вызова LLM'],
    galleryLayout: 'phone',
    gallery: [
      { src: '/cv/pipeline.png', alt: 'Приём PDF-резюме и статус LLM-анализа в Telegram-боте' },
    ],
  },
  {
    id: 'fincheck',
    title: 'Financial Reconciliation Automation',
    kind: 'nda',
    eyebrow: 'NDA · RPA / data workflows',
    description:
      'Production-контур финансовой сверки между внутренними системами и внешними партнёрами: n8n оркестрирует файлы, статусы и ветвления сценариев, а изолированный runner headless исполняет версионируемые Jupyter-ноутбуки бизнес-логики.',
    impact: [
      'Зона ответственности: интеграция тяжёлого Jupyter-шага в общий n8n-пайплайн без UI-автоматизации «как человек кликает».',
      'Разделение оркестрации и вычислений: sub-workflow принимает Excel + тип обработки, выбирает актуальный `.ipynb` из VCS и запускает papermill/runner по HTTP.',
      'Постобработка: сбор только непустых error-файлов, флаг ошибок upstream, retry, таймауты, логи `execution_id` и алерты в мессенджер.',
      'Production-ready путь: микросервис Jupiter Runner (FastAPI) с изоляцией Python/DWH, версионированием ноутбуков и E2E на реальном партнёрском файле.',
    ],
    stack: ['n8n', 'FastAPI', 'Python 3.10+', 'Jupyter', 'Papermill', 'nbconvert', 'nbclient', 'pandas', 'openpyxl', 'Excel', 'HTTP API', 'DWH', 'Stash / Git', 'Docker', 'Mattermost'],
    metrics: ['Запуск сверки: ~30–60 минут ручного контроля → 1 workflow', '100% прогонов получают execution_id, логи и статус', 'Только непустые error-файлы попадают в дальнейший разбор'],
    mediaHint: 'Здесь можно разместить схему workflow n8n и runner API',
  },
  {
    id: 'breaks',
    title: 'Operational Recovery Workflow',
    kind: 'nda',
    eyebrow: 'NDA · Business-process automation',
    description:
      'Технический дизайн и реализация отказоустойчивого RPA-процесса ежедневного восстановления и балансировки операционных расписаний: сначала восстановление обязательных активностей, затем перенос интервалов под покрытие линии.',
    impact: [
      'Формализация двух связанных процессов: recovery обязательных окон и coverage balancing без создания новых провалов.',
      'Интеграции: чтение расписаний/покрытия из БД, запись изменений через UI/API целевой системы, уведомления (Mattermost/email) по исключениям.',
      'Правила по типам графиков и контейнеров, запрет трогать вручную проставленные активности, пакетная публикация и пересчёт метрик покрытия.',
      'TDR-уровень: security, аудит действий робота, мониторинг success rate, SLA по приоритетам инцидентов и обоснование выбора n8n.',
    ],
    stack: ['n8n', 'PostgreSQL', 'SQL', 'REST API', 'Web UI automation', 'Mattermost', 'SMTP / Email', 'Monitoring', 'Audit Log', 'Retry / Error Handling'],
    metrics: ['До 3,22 FTE/месяц освобождается от ручных операций', 'Ежедневная обработка расписаний: часы → автоматический запуск до смены', '≥99% успешных запусков — целевой SLA'],
    mediaHint: 'Здесь можно разместить архитектурную схему To Be / потоков данных',
  },
  {
    id: 'tarot',
    title: 'Tarot Bot · Rich UX',
    kind: 'nda',
    eyebrow: 'NDA · Telegram product with rich markup',
    description:
      'Премиальный Telegram-бот таро/эзотерики с богатой визуальной разметкой: расклады с реальной колодой карт, память диалога, воронки продуктов, голос/vision и отдельная веб-админка.',
    impact: [
      'Rich markup: отправка изображений выпавших карт из локальной колоды 78 карт, а не «AI-картинок».',
      'AI-оркестрация интерпретаций (таро, нумерология, астрология), long-term memory и relationship memory.',
      'Монетизация: фиксированные продукты, мини→полная воронка, комбо и подписки; платежные callback’и.',
      'Production: FastAPI + aiogram, Redis FSM, PostgreSQL, Docker Compose, nginx/SSL, admin SPA.',
    ],
    stack: ['Python 3.12', 'FastAPI', 'aiogram 3', 'SQLAlchemy Async', 'asyncpg', 'Alembic', 'Redis FSM', 'KIE.ai', 'Whisper', 'ElevenLabs', 'GPT Image', 'Robokassa / Platega', 'React Admin SPA', 'Docker Compose', 'Nginx'],
    metrics: ['Время ответа на расклад: минуты ожидания эксперта → <30 секунд', '78 карт: 100% раскладов с тематическим rich media', 'Мини-расклад → полный: измеряемая продуктовая воронка'],
    galleryLayout: 'phone',
    gallery: [
      { src: '/tarot/home.png', alt: 'Приветствие, баланс и категории в Telegram-боте таро' },
      { src: '/tarot/menu.png', alt: 'Меню раскладов, баланса и настроек в Telegram-боте таро' },
      { src: '/tarot/spread.png', alt: 'Расклад «выбор решения» с картами колоды' },
      { src: '/tarot/palm.png', alt: 'Хиромантия: инфографика ладони и интерпретация' },
    ],
  },
  {
    id: 'reviews-bi',
    title: 'Reviews Intelligence BI',
    kind: 'nda',
    eyebrow: 'NDA · Marketplace reviews analytics',
    description:
      'Аналитическая BI-платформа по отзывам маркетплейсов: сбор, фильтрация, дашборды, студия промптов и AI-инсайты для продуктовых и коммерческих команд. Название клиента скрыто.',
    impact: [
      'Self-hosted dashboard: отзывы по моделям/датам, RBAC-флаги доступа, serverless/API слой поверх PostgreSQL.',
      'Контур продаж/пенетрации: ingest ERP-событий, нормализация buyer facts, справочники и time series.',
      'Prompt studio и GPT-insights для регулярного разбора тональности и сигналов из отзывов.',
      'Стек: React + Vite + Recharts, Supabase/PostgREST, gated UI под роли.',
    ],
    stack: ['React 18', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'Supabase', 'PostgreSQL', 'PostgREST', 'Vercel Serverless Functions', 'Node.js', 'LLM Insights', 'Prompt Studio', 'RBAC'],
    metrics: ['Сводка отзывов: дни Excel-анализа → интерактивный dashboard', '100% доступа к BI контролируется ролями', 'Инсайты по отзывам: еженедельный анализ → по запросу'],
    galleryLayout: 'wide',
    gallery: [
      { src: '/reviews/overview.png', alt: 'Дашборд анализа отзывов: тональность, инсайты и динамика' },
    ],
  },
  {
    id: 'energy-platform',
    title: 'Industrial Energy Metering Platform',
    kind: 'nda',
    eyebrow: 'NDA · Industrial energy consumption',
    description:
      'Веб-платформа учёта и анализа потребления электроэнергии на промышленном предприятии: ввод показаний по линиям/участкам, коэффициенты трансформации, сводки и отчёты.',
    impact: [
      'Каталог счётчиков (АСКУЭ / техучёт) с коэффициентами, начальными показаниями и привязкой к производственным линиям.',
      'Ежемесячный ввод, расчёт потребления, сводки по линиям и выгрузка отчётности.',
      'React/Vite UI, Supabase как хранилище показаний и пользователей, отчётные SQL-вьюхи.',
      'Фокус на прозрачности энергобаланса цеха без ручных Excel-сводок.',
    ],
    stack: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'SQL Views', 'Recharts', 'ExcelJS', 'Vercel', 'REST API'],
    metrics: ['Сводка потребления: дни ручной консолидации → <15 минут', '25+ точек учёта в одном интерфейсе', '100% показаний проходят валидацию коэффициентов до отчёта'],
    galleryLayout: 'wide',
    gallery: [
      { src: '/energy/statement.png', alt: 'Ведомость учёта потребления электроэнергии' },
      { src: '/energy/consumption.png', alt: 'Сводка потребления и стоимости электроэнергии' },
    ],
  },
]

export const resume = {
  preview: '/resume/index.html',
  pdf: '/resume/kochergin-maxim.pdf',
  downloadName: 'Kochergin-Maxim-AI-Engineer.pdf',
  fullName: 'Кочергин Максим Андреевич',
  grade: 'Senior',
  years: '2+ года',
  city: 'Одинцово (Московская область)',
  citizenship: 'Россия',
  languages: [{ name: 'Русский', level: 'родной' }, { name: 'English', level: 'B2' }],
  availability: 'ASAP',
  summary:
    'Full Stack AI Engineer с опытом создания AI-продуктов полного цикла: от архитектуры и технического дизайна до production-деплоя и сопровождения. В NK-JAX спроектировал и вывел в production платформу SEO Magic, AI-конструктор Rich Content и корпоративную RAG-систему ответов на отзывы маркетплейсов. В Авито разрабатывал внутренние платформы автоматизации и AI-решения в кросс-функциональной команде со зрелыми инженерными процессами. Сочетает LLM, RAG и workflow-автоматизацию с полным стеком TypeScript / React / Node.js / Python и культурой production-ready разработки.',
  aiFocus: [
    'RAG-архитектуры для ответов на отзывы маркетплейсов: Qdrant, LLM, семантический поиск по базе знаний.',
    'AI workflow на n8n с OpenAI, Claude, Gemini, OpenRouter, Llama и Mistral.',
    'Многоэтапный пайплайн генерации SEO-контента и AI-конструктор Rich Content с визуальным редактором и live preview.',
    'Асинхронные пайплайны и event-driven архитектура для AI-систем; векторные БД: Qdrant, pgvector, ChromaDB.',
    'Claude Code и AI-агенты как инженерный инструмент: разработка, рефакторинг, тесты и документация.',
  ],
  education: [
    {
      year: '2023',
      place: 'МГТУ им. Н. Э. Баумана',
      degree: 'Бакалавр, факультет биомедицинской техники',
      field: 'Автоматизация технологических процессов и производств',
    },
    {
      year: '2017',
      place: 'Медицинский университет «Реавиз», Самара',
      degree: 'Высшее, стоматологический факультет',
      field: 'Стоматология',
    },
  ],
  approach:
    'Системно проходит путь от требований и архитектуры до production-сопровождения. Держит code review, документацию и инженерные стандарты даже при высокой скорости поставки. Работает и самостоятельно — собирая AI-продукты с нуля — и в большой распределённой команде со зрелыми процессами.',
  detailedJobs: [
    {
      company: 'Авито',
      period: '07.2025 — 01.2026',
      role: 'Инженер по автоматизации бизнес-процессов / AI Full Stack Developer',
      summary: 'Внутренние платформы автоматизации и AI-решения для корпоративных сервисов.',
      points: [
        'Проектировал сервисы автоматизации, workflow и интеграции между внутренними системами и API.',
        'Разрабатывал AI-оркестрацию процессов на n8n; работал с отказоустойчивостью, наблюдаемостью и обратной совместимостью.',
        'Готовил RFC, API-контракты и архитектурные схемы; участвовал в обязательном code review и Agile-цикле команды.',
      ],
      stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'n8n', 'Docker', 'GitLab', 'REST API'],
    },
    {
      company: 'NK-JAX',
      period: '06.2024 — 07.2025',
      role: 'Senior Full Stack AI Engineer',
      summary: 'AI-first продукты для e-commerce: генерация SEO и Rich Content, автоматизация отзывов на базе LLM и RAG.',
      points: [
        'Вёл продукты с нуля: TDR, API-контракты, архитектура, разработка, деплой и сопровождение.',
        'Собрал SEO Magic, конструктор Rich Content и RAG-платформу отзывов с RabbitMQ, Qdrant и интеграцией ERP.',
        'Настраивал GitLab CI/CD, Docker и production на Linux; держал модульную архитектуру, тесты и code review.',
      ],
      stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'n8n', 'RabbitMQ', 'Qdrant', 'OpenAI', 'Claude', 'Docker', 'GitLab CI/CD'],
    },
    {
      company: 'Axioma',
      period: '09.2023 — 06.2024',
      role: 'Fullstack-разработчик',
      summary: 'AI-сервисы и автоматизация бизнес-процессов: RAG, Python backend, интеграции и клиентский веб.',
      points: [
        'Строил Python API, RAG для документов и отзывов, подключал векторные БД и LLM.',
        'Настраивал n8n, очереди и вебхуки; обеспечивал идемпотентную обработку задач и Docker-деплой.',
        'Провёл миграцию данных, тестировал ETL и масштабировал серверную инфраструктуру.',
      ],
      stack: ['Python', 'n8n', 'Docker', 'PostgreSQL', 'RAG', 'LLM', 'REST API', 'Webhooks'],
    },
  ],
}

export const skillGroups = [
  ['Languages', 'TypeScript · Python · JavaScript · SQL'],
  ['Frontend', 'React · Next.js · Vite · Tailwind CSS'],
  ['Backend', 'Node.js · FastAPI · PostgreSQL · Supabase · Redis'],
  ['AI', 'OpenAI · Claude · Gemini · RAG · Agents · Prompt / Context Engineering · On-device ML'],
  ['Automation', 'n8n · RabbitMQ · Webhooks · Event-driven architecture · Bitrix24'],
  ['Data & DevOps', 'Qdrant · pgvector · Docker · Kubernetes · GitLab CI/CD · Linux'],
]
