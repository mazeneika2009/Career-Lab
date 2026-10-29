import type { Lesson } from './buildLessons'
import type { VideoCandidate } from './lessonVideo'

/**
 * Curated career-video catalog.
 *
 * Backend-authored videos (the `/me/videos` library) always win. This catalog
 * is the second layer: hand-verified, long-lived YouTube videos from official
 * or established-creator channels (freeCodeCamp, Google, Traversy Media,
 * TechWorld with Nana, Blender Guru, Guy in a Cube, Ahrefs, …) so that no
 * lesson node is ever video-less. Every ID below was confirmed against public
 * references (repos, course pages, channel listings) AND probed embeddable
 * via YouTube's oEmbed endpoint on 2026-09-16 (401 = owner disabled embeds).
 * NOTE: SuperSimpleDev disables embedding on their videos — do not re-add
 * them here; their entries were replaced with embeddable freeCodeCamp picks.
 *
 * To replace a pick with owned content, author a `videos:` block in the
 * backend career file — it automatically takes precedence, no frontend change.
 */
export interface CuratedVideo {
  id: string
  title: string
  url: string
  creator: string
  description: string
  durationSec: number | null
  /** Career categories this pick serves. Empty = generic fallback for any career. */
  categories: string[]
  /** Chapter stages this pick suits. Empty = any stage. */
  stages: string[]
  /** Lowercase topic tokens used for lesson matching. */
  keywords: string[]
}

const DEV = 'Development'
const AIDATA = 'AI & Data'
const SEC = 'Security'
const ITCLOUD = 'IT & Cloud'
const DESIGN = 'Design'
const CREATIVE = 'Creative'
const QUALITY = 'Quality'
const BUSINESS = 'Business'

const BEGINNER = 'Beginner'
const FOUNDATION = 'Foundation'
const INTERMEDIATE = 'Intermediate'
const ADVANCED = 'Advanced'

const YT = 'https://www.youtube.com/watch?v='

export const CURATED_VIDEOS: CuratedVideo[] = [
  // ------------------------------- Development ------------------------------
  {
    id: 'html-css', title: 'Learn HTML & CSS — Full Course for Beginners', url: `${YT}a_iQb1lnAEQ`,
    creator: 'freeCodeCamp.org', description: 'Web foundations from zero: semantic HTML, the box model, flexbox, grid and responsive layouts with projects.',
    durationSec: null, categories: [DEV, DESIGN], stages: [BEGINNER],
    keywords: ['html', 'css', 'responsive', 'accessibility', 'web design', 'frontend', 'layout', 'web platform']
  },
  {
    id: 'js', title: 'JavaScript Programming — Full Course', url: `${YT}jS4aFq5-91M`,
    creator: 'freeCodeCamp.org', description: 'Learn JavaScript by building: variables, functions, DOM events, arrays and 100+ hands-on challenges.',
    durationSec: null, categories: [DEV], stages: [BEGINNER, FOUNDATION],
    keywords: ['javascript', 'dom', 'browser', 'async', 'promise', 'frontend', 'language', 'ecmascript']
  },
  {
    id: 'react', title: 'React Course — Beginner Tutorial (12-hour, 8 projects)', url: `${YT}bMknfKXIFA8`,
    creator: 'freeCodeCamp.org', description: 'Components, props, state, hooks, effects and API-driven projects including a meme generator and quiz app.',
    durationSec: null, categories: [DEV], stages: [FOUNDATION, INTERMEDIATE],
    keywords: ['react', 'component', 'hook', 'state', 'jsx', 'props', 'frontend', 'routing']
  },
  {
    id: 'node', title: 'Node.js and Express.js — Full Course', url: `${YT}Oe421EPjeBE`,
    creator: 'freeCodeCamp.org', description: 'Server-side JavaScript end to end: modules, async patterns, Express routing, middleware and REST APIs with Postman.',
    durationSec: null, categories: [DEV], stages: [INTERMEDIATE, ADVANCED],
    keywords: ['node', 'express', 'api', 'backend', 'server', 'rest', 'npm', 'middleware', 'full-stack']
  },
  {
    id: 'git', title: 'Git & GitHub Crash Course (2025)', url: `${YT}vA5TTz6BXhY`,
    creator: 'Traversy Media', description: 'Version control every developer uses daily: repos, branching, remotes, collaboration and CI deployment.',
    durationSec: null, categories: [DEV, AIDATA, ITCLOUD], stages: [],
    keywords: ['git', 'github', 'version control', 'branch', 'commit', 'pull request', 'workflow', 'collaboration']
  },
  {
    id: 'sql-dev', title: 'SQL Tutorial — Full Database Course for Beginners', url: `${YT}HXV3zeQKqGY`,
    creator: 'freeCodeCamp.org', description: 'Relational thinking with MySQL: schema design, CRUD, joins, aggregation, triggers and ER diagrams.',
    durationSec: null, categories: [DEV, AIDATA, BUSINESS, ITCLOUD], stages: [BEGINNER, FOUNDATION],
    keywords: ['sql', 'mysql', 'database', 'query', 'join', 'schema', 'crud', 'postgres']
  },
  {
    id: 'android', title: 'Android Development for Beginners — Full Course', url: `${YT}fis26HvvDII`,
    creator: 'freeCodeCamp.org', description: 'Build a real Android app from zero: Java/OOP essentials, layouts, Material Design and RecyclerView.',
    durationSec: null, categories: [DEV], stages: [BEGINNER, FOUNDATION],
    keywords: ['android', 'kotlin', 'mobile', 'app', 'jetpack', 'material']
  },
  {
    id: 'flutter', title: 'Flutter Course for Beginners (37-hour)', url: `${YT}VPvVD8t02U8`,
    creator: 'freeCodeCamp.org', description: 'Cross-platform apps with Flutter and Dart, from first widget to App Store and Play Store release.',
    durationSec: null, categories: [DEV], stages: [BEGINNER, FOUNDATION],
    keywords: ['flutter', 'dart', 'mobile', 'cross-platform', 'widget', 'ios', 'riverpod', 'firebase']
  },
  {
    id: 'unity', title: 'How to Make a Video Game in Unity — Programming', url: `${YT}9ZEu_I-ido4`,
    creator: 'Brackeys', description: 'Unity scripting fundamentals: forces, collisions, frame-rate independent movement and clean game code.',
    durationSec: null, categories: [DEV, CREATIVE], stages: [FOUNDATION, INTERMEDIATE],
    keywords: ['unity', 'game', 'c#', 'physics', 'godot', 'unreal', 'gameplay', 'collision', 'scripting']
  },
  // -------------------------------- AI & Data -------------------------------
  {
    id: 'python', title: 'Python Tutorial — Full Course for Beginners', url: `${YT}_uQrJ0TkZlc`,
    creator: 'Programming with Mosh', description: 'Python from zero: data types, control flow, functions and the debugging habits every career needs.',
    durationSec: null, categories: [], stages: [BEGINNER],
    keywords: ['python', 'programming', 'variable', 'function', 'loop', 'automation', 'scripting']
  },
  {
    id: 'ml', title: 'Machine Learning with Python and Scikit-Learn — Full Course', url: `${YT}hDKCxebp88A`,
    creator: 'freeCodeCamp.org', description: 'Train and evaluate real models: regression, classification, feature importance and deployment thinking.',
    durationSec: null, categories: [AIDATA], stages: [INTERMEDIATE, ADVANCED],
    keywords: ['machine learning', 'scikit', 'model', 'regression', 'training', 'tensorflow', 'pytorch', 'classification']
  },
  {
    id: 'nn', title: 'But What Is a Neural Network? — Deep Learning, Chapter 1', url: `${YT}aircAruvnKk`,
    creator: '3Blue1Brown', description: 'Visual intuition for how neural networks learn: neurons, layers, activations and handwritten-digit recognition.',
    durationSec: null, categories: [AIDATA], stages: [FOUNDATION, INTERMEDIATE, ADVANCED],
    keywords: ['neural network', 'deep learning', 'cnn', 'transformer', 'backprop', 'nlp', 'vision', 'gradient']
  },
  {
    id: 'pandas', title: 'Data Analysis with Pandas — Tabular Data', url: `${YT}b2mLDkMSyn4`,
    creator: 'freeCodeCamp.org', description: 'Analyze real datasets with pandas: dataframes, cleaning, grouping and matplotlib visualization.',
    durationSec: null, categories: [AIDATA, BUSINESS], stages: [BEGINNER, FOUNDATION],
    keywords: ['pandas', 'numpy', 'data analysis', 'dataframe', 'jupyter', 'matplotlib', 'visualization', 'eda', 'statistics']
  },
  {
    id: 'analyst-sql', title: 'Data Analyst Portfolio Project — Data Cleaning in SQL', url: `${YT}8rO7ztF4NtU`,
    creator: 'Alex The Analyst', description: 'Do the analyst job for real: import messy data, clean it in SQL and shape it into portfolio evidence.',
    durationSec: 3284, categories: [BUSINESS, AIDATA], stages: [BEGINNER, FOUNDATION, INTERMEDIATE],
    keywords: ['data analyst', 'analyst', 'excel', 'power bi', 'tableau', 'dashboard', 'portfolio', 'cleaning', 'kpi', 'reporting']
  },
  {
    id: 'rag', title: 'Learn RAG From Scratch — Python AI Tutorial (LangChain Engineer)', url: `${YT}sVcwVQRHIc8`,
    creator: 'freeCodeCamp.org', description: 'Retrieval-augmented generation in practice: indexing, retrieval, query routing and vector databases.',
    durationSec: 8000, categories: [AIDATA], stages: [INTERMEDIATE, ADVANCED],
    keywords: ['llm', 'rag', 'langchain', 'prompt', 'embedding', 'agent', 'openai', 'generative', 'vector', 'chatbot']
  },
  // -------------------------------- Security --------------------------------
  {
    id: 'pentest', title: 'Full Ethical Hacking Course — Network Penetration Testing for Beginners', url: `${YT}3Kq1MIfTWCE`,
    creator: 'freeCodeCamp.org', description: 'Authorized, defensive methodology: recon, scanning, enumeration, exploitation labs and professional reporting.',
    durationSec: null, categories: [SEC], stages: [INTERMEDIATE, ADVANCED],
    keywords: ['penetration', 'hacking', 'ethical', 'kali', 'exploit', 'pentest', 'red team', 'nmap', 'metasploit', 'vulnerability']
  },
  {
    id: 'secplus', title: 'CompTIA Security+ SY0-701 — Full Training Course (official playlist)', url: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv',
    creator: 'Professor Messer', description: 'The complete entry-level security certification path: threats, architecture, operations and governance.',
    durationSec: null, categories: [SEC, ITCLOUD], stages: [BEGINNER, FOUNDATION],
    keywords: ['security', 'comptia', 'certification', 'soc', 'analyst', 'risk', 'compliance', 'iam', 'threat', 'incident', 'siem']
  },
  {
    id: 'owasp', title: 'OWASP Top 10 — Explained with Examples (2024)', url: `${YT}Gb7RDognNcc`,
    creator: 'OWASP community', description: 'The ten most critical web risks — injection, auth failures, access control — shown with real examples.',
    durationSec: null, categories: [SEC, DEV], stages: [FOUNDATION, INTERMEDIATE],
    keywords: ['owasp', 'web security', 'xss', 'injection', 'authentication', 'access control', 'csrf', 'api security']
  },
  // -------------------------------- IT & Cloud ------------------------------
  {
    id: 'linux', title: 'Introduction to Linux and Basic Commands for Beginners', url: `${YT}IVquJh3DXUA`,
    creator: 'sakitech', description: 'The terminal survival kit: distros, navigation, permissions, processes and package thinking.',
    durationSec: 1126, categories: [ITCLOUD, SEC], stages: [BEGINNER],
    keywords: ['linux', 'terminal', 'bash', 'command line', 'ubuntu', 'shell', 'sysadmin', 'permissions', 'server']
  },
  {
    id: 'aws', title: 'AWS Certified Cloud Practitioner Course (CLF-C02)', url: `${YT}7HKot-brXFE`,
    creator: 'freeCodeCamp.org', description: 'Cloud fluency: regions, IAM, EC2, S3, billing and the shared-responsibility model behind every cloud career.',
    durationSec: null, categories: [ITCLOUD], stages: [BEGINNER, FOUNDATION],
    keywords: ['aws', 'cloud', 'ec2', 's3', 'deployment', 'infrastructure', 'azure', 'gcp', 'iam', 'devops']
  },
  {
    id: 'docker', title: 'Docker Tutorial for Beginners — Full Course', url: `${YT}3c-iBn73dDE`,
    creator: 'TechWorld with Nana', description: 'Containers that click: images, volumes, Compose, Dockerfiles and shipping a real demo project.',
    durationSec: 9975, categories: [ITCLOUD, DEV], stages: [INTERMEDIATE],
    keywords: ['docker', 'container', 'image', 'compose', 'devops', 'dockerfile', 'microservices']
  },
  {
    id: 'k8s', title: 'Kubernetes Crash Course for Absolute Beginners', url: `${YT}s_o8dwzRlu4`,
    creator: 'TechWorld with Nana', description: 'Orchestration essentials: pods, deployments, services, YAML and a full MongoDB-backed demo on Minikube.',
    durationSec: null, categories: [ITCLOUD], stages: [INTERMEDIATE, ADVANCED],
    keywords: ['kubernetes', 'k8s', 'pod', 'deployment', 'cluster', 'helm', 'sre', 'observability', 'scaling']
  },
  {
    id: 'networking', title: 'Network Engineering — CompTIA Network+ Exam Prep', url: `${YT}qiQR5rTSshw`,
    creator: 'freeCodeCamp.org', description: 'How networks actually work: OSI, TCP/IP, DNS, DHCP, subnetting, routing and troubleshooting method.',
    durationSec: null, categories: [ITCLOUD, SEC], stages: [BEGINNER, FOUNDATION],
    keywords: ['network', 'tcp', 'ip', 'dns', 'osi', 'router', 'vlan', 'cisco', 'protocol', 'subnet', 'dhcp']
  },
  // --------------------------------- Design ---------------------------------
  {
    id: 'figma-ui', title: 'UI/UX Design Tutorial — Wireframe, Mockup & Design in Figma', url: `${YT}c9Wg6Cb_YlU`,
    creator: 'freeCodeCamp.org', description: 'From blank canvas to designed page: grids, components, hierarchy and a complete Figma workflow.',
    durationSec: null, categories: [DESIGN], stages: [BEGINNER, FOUNDATION],
    keywords: ['figma', 'ui', 'interface', 'wireframe', 'mockup', 'prototype', 'component', 'design system', 'layout']
  },
  {
    id: 'figma-basics', title: 'Figma Tutorial for UI Design — Course for Beginners', url: `${YT}jwCmIBJ8Jtc`,
    creator: 'freeCodeCamp.org', description: 'Figma foundations: shapes, typography, color, auto layout and the tools behind modern product design.',
    durationSec: null, categories: [DESIGN], stages: [BEGINNER],
    keywords: ['figma', 'design', 'vector', 'typography', 'color', 'autolayout', 'tool', 'getting started']
  },
  {
    id: 'ux-google', title: 'Intro to UX — Google UX Design Certificate', url: `${YT}2QQQtiFwXjU`,
    creator: 'Google Career Certificates', description: 'What UX designers actually do: user-centered process, jobs in the field and designing for good experience.',
    durationSec: null, categories: [DESIGN, BUSINESS], stages: [BEGINNER, FOUNDATION],
    keywords: ['ux', 'user experience', 'research', 'persona', 'usability', 'journey', 'testing', 'product', 'empathy']
  },
  // -------------------------------- Creative --------------------------------
  {
    id: 'blender', title: 'Blender Donut Tutorial — Part 1: The Basics', url: `${YT}-tbSCMbJA6o`,
    creator: 'Blender Guru', description: 'The legendary first steps in 3D: navigation, modeling, shading and the workflow every Blender artist learns.',
    durationSec: null, categories: [CREATIVE], stages: [BEGINNER],
    keywords: ['blender', '3d', 'modeling', 'render', 'sculpt', 'texturing', 'animation', 'donut']
  },
  {
    id: 'davinci', title: 'Learn DaVinci Resolve in 2 Hours — Beginner Course', url: `${YT}ZW0K-HzgUJ4`,
    creator: 'Bring Your Own Laptop', description: 'Cut your first video fast: timeline craft, pacing, audio and delivery in the free Hollywood-grade editor.',
    durationSec: null, categories: [CREATIVE], stages: [BEGINNER, FOUNDATION],
    keywords: ['video', 'editing', 'premiere', 'davinci', 'resolve', 'color', 'timeline', 'film', 'production']
  },
  {
    id: 'ae', title: 'After Effects for Beginners — Free Mega Course', url: `${YT}PWvPbGWVRrU`,
    creator: 'Envato Tuts+', description: 'Motion design from zero: keyframes, masks, tracking, effects and a finished lower-third project.',
    durationSec: 15920, categories: [CREATIVE], stages: [INTERMEDIATE],
    keywords: ['after effects', 'motion', 'animation', 'vfx', 'compositing', 'keyframe', 'tracking']
  },
  {
    id: 'procreate', title: 'Anyone Can Draw This Colorful Landscape in Procreate', url: `${YT}U5o4ZFOuBMY`,
    creator: 'Art with Flo', description: 'Guided digital painting: brushes, layers, texture and color confidence for absolute beginners.',
    durationSec: null, categories: [CREATIVE], stages: [BEGINNER],
    keywords: ['procreate', 'drawing', 'illustration', 'digital art', 'painting', 'photoshop', 'art', 'sketch', 'ipad']
  },
  {
    id: 'gamedesign', title: 'Making Your First Game — Basics: How to Start', url: `${YT}z06QR-tz1_o`,
    creator: 'Extra Credits', description: 'Scope small, finish games: MVP thinking, core loops and the beginner traps every designer must dodge.',
    durationSec: null, categories: [CREATIVE, DEV], stages: [FOUNDATION, INTERMEDIATE],
    keywords: ['game design', 'mechanics', 'level', 'narrative', 'gameplay', 'gdd', 'balancing', 'prototype', 'player']
  },
  // --------------------------------- Quality --------------------------------
  {
    id: 'playwright', title: 'Software Testing Course — Playwright, E2E and AI Agents', url: `${YT}jydYq7oAtD8`,
    creator: 'freeCodeCamp.org', description: 'Test like a team: the testing pyramid, Playwright setup, assertions and a full e-commerce checkout flow.',
    durationSec: null, categories: [QUALITY, DEV], stages: [FOUNDATION, INTERMEDIATE],
    keywords: ['playwright', 'testing', 'qa', 'automation', 'e2e', 'cypress', 'test', 'assert', 'ci']
  },
  {
    id: 'selenium', title: 'Selenium Course for Beginners — Bots, Automation, Testing', url: `${YT}j7VZsCCnptM`,
    creator: 'freeCodeCamp.org', description: 'Browser automation with Selenium and Python: waits, selectors, unittest projects and real bots.',
    durationSec: null, categories: [QUALITY], stages: [INTERMEDIATE],
    keywords: ['selenium', 'webdriver', 'automation', 'qa', 'testing', 'test plan', 'bug', 'regression']
  },
  // -------------------------------- Business --------------------------------
  {
    id: 'excel', title: 'Microsoft Excel Tutorial for Beginners — Full Course', url: `${YT}Vl0H-qTclOg`,
    creator: 'freeCodeCamp.org', description: 'Spreadsheet fluency through six projects: formulas, sorting, pivot tables and automation basics.',
    durationSec: null, categories: [BUSINESS], stages: [BEGINNER],
    keywords: ['excel', 'spreadsheet', 'formula', 'pivot', 'sheets', 'data entry', 'vlookup', 'report']
  },
  {
    id: 'powerbi', title: 'Power BI for the Non-Technical Person', url: `${YT}S7Fh2l-4jlc`,
    creator: 'Guy in a Cube', description: 'From Excel comfort to dashboards: build a beautiful Power BI report with clicks, not code.',
    durationSec: 930, categories: [BUSINESS], stages: [FOUNDATION, INTERMEDIATE],
    keywords: ['power bi', 'bi', 'dashboard', 'dax', 'report', 'tableau', 'visualization', 'kpi']
  },
  {
    id: 'seo', title: 'Complete SEO Course for Beginners — Learn to Rank #1', url: `${YT}xsVTqzratPs`,
    creator: 'Ahrefs', description: 'Search that works: intent, keyword research, on-page optimization and link building that earns traffic.',
    durationSec: null, categories: [BUSINESS, DESIGN], stages: [BEGINNER, FOUNDATION],
    keywords: ['seo', 'marketing', 'keyword', 'content', 'analytics', 'campaign', 'sem', 'social', 'email', 'writing']
  }
]

/** Backend catalog slug → category (mirrors backend `CAREER_CATALOG`). */
export const CAREER_CATEGORY_MAP: Record<string, string> = {
  'web-designer': DESIGN, 'frontend-developer': DEV, 'backend-developer': DEV,
  'full-stack-developer': DEV, 'react-developer': DEV, 'nodejs-developer': DEV,
  'wordpress-developer': DEV, 'ecommerce-developer': DEV, 'android-developer': DEV,
  'ios-developer': DEV, 'flutter-developer': DEV, 'react-native-developer': DEV,
  'ai-engineer': AIDATA, 'generative-ai-developer': AIDATA, 'machine-learning-engineer': AIDATA,
  'deep-learning-engineer': AIDATA, 'nlp-engineer': AIDATA, 'computer-vision-engineer': AIDATA,
  'data-scientist': AIDATA, 'data-analyst': BUSINESS, 'data-engineer': AIDATA,
  'bi-developer': BUSINESS, 'database-administrator': ITCLOUD, 'cybersecurity-analyst': SEC,
  'soc-analyst': SEC, 'penetration-tester': SEC, 'security-engineer': SEC,
  'cloud-security-engineer': SEC, 'network-engineer': ITCLOUD, 'network-administrator': ITCLOUD,
  'it-support-specialist': ITCLOUD, 'hardware-support-specialist': ITCLOUD,
  'system-administrator': ITCLOUD, 'cloud-engineer': ITCLOUD, 'devops-engineer': ITCLOUD,
  'site-reliability-engineer': ITCLOUD, 'qa-engineer': QUALITY, 'automation-tester': QUALITY,
  'ui-designer': DESIGN, 'ux-designer': DESIGN, 'product-designer': DESIGN,
  'digital-artist': CREATIVE, '2d-artist-illustrator': CREATIVE, '3d-artist': CREATIVE,
  'motion-designer': CREATIVE, 'video-editor': CREATIVE, 'game-developer': DEV,
  'game-designer': CREATIVE, 'digital-marketing-specialist': BUSINESS, 'technical-writer': BUSINESS
}

/**
 * Strict per-career video allowlist: career slug → curated video keys.
 * Mirrors the backend seeder (`backend/src/content/curated-videos.ts`) so a
 * Unity lesson can never render a JavaScript video, no matter which layer
 * resolved it. Keep both maps in sync when adding careers or videos.
 */
export const CAREER_VIDEO_ALLOWLIST: Record<string, string[]> = {
  'web-designer': ['figma-ui', 'figma-basics', 'ux-google', 'seo', 'html-css'],
  'frontend-developer': ['html-css', 'js', 'react', 'git'],
  'backend-developer': ['node', 'sql-dev', 'git', 'docker', 'owasp'],
  'full-stack-developer': ['html-css', 'js', 'react', 'node', 'sql-dev', 'git'],
  'react-developer': ['react', 'js', 'html-css', 'git'],
  'nodejs-developer': ['node', 'js', 'sql-dev', 'git', 'docker'],
  'wordpress-developer': ['html-css', 'js', 'sql-dev', 'seo'],
  'ecommerce-developer': ['html-css', 'js', 'node', 'sql-dev', 'seo'],
  'android-developer': ['android', 'git', 'sql-dev'],
  'ios-developer': ['flutter', 'git', 'sql-dev'],
  'flutter-developer': ['flutter', 'git'],
  'react-native-developer': ['react', 'js', 'flutter', 'git'],
  'game-developer': ['unity', 'gamedesign', 'git'],
  'ai-engineer': ['rag', 'python', 'ml', 'git'],
  'generative-ai-developer': ['rag', 'python', 'nn'],
  'machine-learning-engineer': ['ml', 'python', 'pandas', 'nn'],
  'deep-learning-engineer': ['nn', 'ml', 'python'],
  'nlp-engineer': ['nn', 'ml', 'python', 'rag'],
  'computer-vision-engineer': ['nn', 'ml', 'python'],
  'data-scientist': ['pandas', 'ml', 'python', 'analyst-sql', 'sql-dev'],
  'data-analyst': ['analyst-sql', 'excel', 'powerbi', 'pandas', 'sql-dev'],
  'data-engineer': ['sql-dev', 'python', 'pandas', 'docker'],
  'bi-developer': ['powerbi', 'excel', 'analyst-sql', 'sql-dev'],
  'database-administrator': ['sql-dev', 'linux', 'aws'],
  'cybersecurity-analyst': ['secplus', 'pentest', 'owasp', 'networking', 'linux'],
  'soc-analyst': ['secplus', 'networking', 'linux', 'pentest'],
  'penetration-tester': ['pentest', 'owasp', 'networking', 'linux'],
  'security-engineer': ['secplus', 'owasp', 'pentest', 'networking'],
  'cloud-security-engineer': ['secplus', 'aws', 'networking', 'owasp'],
  'network-engineer': ['networking', 'linux', 'secplus'],
  'network-administrator': ['networking', 'linux', 'aws'],
  'it-support-specialist': ['linux', 'networking', 'aws', 'git'],
  'hardware-support-specialist': ['linux', 'networking'],
  'system-administrator': ['linux', 'networking', 'aws', 'docker', 'sql-dev'],
  'cloud-engineer': ['aws', 'docker', 'linux', 'networking'],
  'devops-engineer': ['docker', 'k8s', 'aws', 'linux', 'git'],
  'site-reliability-engineer': ['k8s', 'docker', 'linux', 'networking'],
  'qa-engineer': ['playwright', 'selenium', 'git'],
  'automation-tester': ['playwright', 'selenium', 'git', 'docker'],
  'ui-designer': ['figma-ui', 'figma-basics', 'ux-google'],
  'ux-designer': ['ux-google', 'figma-ui', 'seo'],
  'product-designer': ['ux-google', 'figma-ui', 'figma-basics'],
  'digital-artist': ['procreate', 'davinci'],
  '2d-artist-illustrator': ['procreate'],
  '3d-artist': ['blender'],
  'motion-designer': ['ae', 'davinci', 'blender'],
  'video-editor': ['davinci', 'ae'],
  'game-designer': ['gamedesign', 'unity', 'blender'],
  'digital-marketing-specialist': ['seo', 'powerbi', 'excel', 'ux-google'],
  'technical-writer': ['seo', 'git', 'ux-google']
}

const URL_TO_KEY = new Map(CURATED_VIDEOS.map((v) => [v.url, v.id]))

export function curatedKeyForUrl(url: string): string | null {
  return URL_TO_KEY.get(url) ?? null
}

/**
 * Render guard: a known catalog video renders only for careers whose
 * allowlist contains its key. Unknown (authored) URLs pass through — they
 * come from the lesson's own authored content and can't be mis-scoped by
 * the matcher. Returns the key when blocked (for dev warnings), else null.
 */
export function blockedVideoKeyForCareer(url: string, careerSlug: string): string | null {
  const key = curatedKeyForUrl(url)
  if (!key) return null
  const allowed = CAREER_VIDEO_ALLOWLIST[careerSlug]
  if (!allowed) return key
  return allowed.includes(key) ? null : key
}

export interface LessonMatchInput {
  careerSlug: string
  stage: string
  chapterTitle: string
  topicTitles: string[]
}

/**
 * Pick the best curated video for a lesson. Only the career's allowlist may
 * serve it; stage and keyword overlap rank within that pool. Deterministic:
 * ties resolve in catalog order. Returns null when nothing in the allowlist
 * matches (caller renders the honest empty state, never a wrong video).
 */
export function matchCuratedVideo(input: LessonMatchInput): CuratedVideo | null {
  const category = CAREER_CATEGORY_MAP[input.careerSlug] ?? ''
  const allowed = new Set(CAREER_VIDEO_ALLOWLIST[input.careerSlug] ?? [])
  const haystack = `${input.chapterTitle} ${input.topicTitles.join(' ')}`.toLowerCase()
  let best: CuratedVideo | null = null
  let bestScore = -1

  for (const entry of CURATED_VIDEOS) {
    if (!allowed.has(entry.id)) continue
    const categoryMatch = entry.categories.includes(category)

    let score = categoryMatch ? 10 : 0
    if (entry.stages.length === 0) score += 1
    else if (entry.stages.includes(input.stage)) score += 4

    let hits = 0
    for (const kw of entry.keywords) {
      if (kw && haystack.includes(kw)) {
        hits += 1
        if (hits >= 4) break
      }
    }
    score += Math.min(hits, 4) * 2

    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }
  return best
}

export function curatedToCandidate(entry: CuratedVideo): VideoCandidate {
  return {
    title: entry.title,
    url: entry.url,
    platform: 'YouTube',
    durationSec: entry.durationSec,
    description: `${entry.description} — by ${entry.creator}.`
  }
}

interface SyncVideoSource {
  title: string
  topic: { publicId: string; title: string }
  chapter: string
  url: string
  platform: string | null
  durationSec: number | null
  description: string
}

/**
 * Synchronously-known video candidates for a lesson: backend videos first
 * (topic match, then chapter fallback), curated catalog pick appended when
 * the backend holds nothing. Shared by the page (gating) and the hub
 * (playback) so both agree on whether a lesson is video-gated.
 */
export function resolveSyncCandidates<Topic extends { publicId: string; title: string }>(
  lesson: { topics: Topic[]; chapterTitle: string; stage: string },
  videos: SyncVideoSource[],
  careerSlug: string
): VideoCandidate[] {
  const direct = videos.filter((v) =>
    lesson.topics.some((t) => t.publicId === v.topic.publicId || t.title === v.topic.title)
  )
  const pool = direct.length > 0 ? direct : videos.filter((v) => v.chapter === lesson.chapterTitle)
  const backend: VideoCandidate[] = pool.map((v) => ({
    title: v.title,
    url: v.url,
    platform: v.platform,
    durationSec: v.durationSec,
    description: v.description
  }))
  // Backend videos are allowlisted at seed time, but re-check here so a
  // stale/mismatched row can never render.
  const scoped = backend.filter((c) => !blockedVideoKeyForCareer(c.url, careerSlug))
  if (scoped.length > 0) return scoped

  const curated = matchCuratedVideo({
    careerSlug,
    stage: lesson.stage,
    chapterTitle: lesson.chapterTitle,
    topicTitles: lesson.topics.map((t) => t.title)
  })
  return curated ? [curatedToCandidate(curated)] : []
}
