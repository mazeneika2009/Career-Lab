import type { CareerDef, ChapterDef, VideoDef } from './framework.js'

/**
 * Curated career-video library used by the content seeder.
 *
 * Authored `videos:` blocks in career files always win. For topics without
 * authored videos, the seeder attaches a real, relevant YouTube video from
 * this catalog so that every lesson in every career fetches playable video
 * content through `/me/videos` and the lesson hub.
 *
 * Every ID below was verified embeddable via YouTube's oEmbed endpoint on
 * 2026-09-16 (401 = owner disabled embeds). All come from long-lived
 * official or established-creator channels (freeCodeCamp, Google, Traversy
 * Media, TechWorld with Nana, Blender Guru, Guy in a Cube, Ahrefs, …).
 * NOTE: SuperSimpleDev disables embedding — do not add their videos here.
 */
interface CuratedVideo {
  key: string
  title: string
  url: string
  platform: string
  creator: string
  description: string
  durationSec: number | null
  categories: string[]
  stages: string[]
  keywords: string[]
}

const YT = 'https://www.youtube.com/watch?v='

const CURATED_VIDEOS: CuratedVideo[] = [
  {
    key: 'html-css', title: 'Learn HTML & CSS — Full Course for Beginners', url: `${YT}a_iQb1lnAEQ`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Web foundations from zero: semantic HTML, the box model, flexbox, grid and responsive layouts with projects.',
    durationSec: null, categories: ['Development', 'Design'], stages: ['Beginner'],
    keywords: ['html', 'css', 'semantic', 'responsive', 'accessibility', 'web design', 'frontend', 'layout', 'form', 'button', 'state', 'box model', 'grid', 'flexbox', 'media query', 'web platform']
  },
  {
    key: 'js', title: 'JavaScript Programming — Full Course', url: `${YT}jS4aFq5-91M`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Learn JavaScript by building: variables, functions, DOM events, arrays and 100+ hands-on challenges.',
    durationSec: null, categories: ['Development'], stages: ['Beginner', 'Foundation'],
    keywords: ['javascript', 'dom', 'browser', 'async', 'promise', 'await', 'closure', 'prototype', 'this', 'event loop', 'microtask', 'callback', 'scope', 'error handling', 'frontend', 'language', 'ecmascript']
  },
  {
    key: 'react', title: 'React Course — Beginner Tutorial (12-hour, 8 projects)', url: `${YT}bMknfKXIFA8`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Components, props, state, hooks, effects and API-driven projects including a meme generator and quiz app.',
    durationSec: null, categories: ['Development'], stages: ['Foundation', 'Intermediate'],
    keywords: ['react', 'component', 'hook', 'state', 'jsx', 'props', 'effect', 'context', 'rendering', 'performance', 'form', 'frontend', 'routing']
  },
  {
    key: 'node', title: 'Node.js and Express.js — Full Course', url: `${YT}Oe421EPjeBE`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Server-side JavaScript end to end: modules, async patterns, Express routing, middleware and REST APIs with Postman.',
    durationSec: null, categories: ['Development'], stages: ['Intermediate', 'Advanced'],
    keywords: ['node', 'express', 'api', 'backend', 'server', 'rest', 'npm', 'middleware', 'full-stack', 'performance', 'latency', 'caching', 'architecture', 'security', 'testing', 'deployment', 'queue', 'stream']
  },
  {
    key: 'git', title: 'Git & GitHub Crash Course (2025)', url: `${YT}vA5TTz6BXhY`,
    platform: 'YouTube', creator: 'Traversy Media',
    description: 'Version control every developer uses daily: repos, branching, remotes, collaboration and CI deployment.',
    durationSec: null, categories: ['Development', 'AI & Data', 'IT & Cloud'], stages: [],
    keywords: ['git', 'github', 'version control', 'branch', 'commit', 'pull request', 'workflow', 'collaboration', 'deploy', 'ci']
  },
  {
    key: 'sql-dev', title: 'SQL Tutorial — Full Database Course for Beginners', url: `${YT}HXV3zeQKqGY`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Relational thinking with MySQL: schema design, CRUD, joins, aggregation, triggers and ER diagrams.',
    durationSec: null, categories: ['Development', 'AI & Data', 'Business', 'IT & Cloud'], stages: ['Beginner', 'Foundation'],
    keywords: ['sql', 'mysql', 'database', 'query', 'join', 'schema', 'crud', 'postgres', 'explain', 'index', 'composite', 'window', 'performance', 'migration', 'normalization', 'transaction']
  },
  {
    key: 'android', title: 'Android Development for Beginners — Full Course', url: `${YT}fis26HvvDII`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Build a real Android app from zero: Java/OOP essentials, layouts, Material Design and RecyclerView.',
    durationSec: null, categories: ['Development'], stages: ['Beginner', 'Foundation'],
    keywords: ['android', 'kotlin', 'mobile', 'app', 'jetpack', 'material', 'activity', 'layout', 'testing', 'release', 'security']
  },
  {
    key: 'flutter', title: 'Flutter Course for Beginners (37-hour)', url: `${YT}VPvVD8t02U8`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Cross-platform apps with Flutter and Dart, from first widget to App Store and Play Store release.',
    durationSec: null, categories: ['Development'], stages: ['Beginner', 'Foundation'],
    keywords: ['flutter', 'dart', 'mobile', 'cross-platform', 'widget', 'ios', 'riverpod', 'firebase', 'state management', 'testing', 'release', 'layout']
  },
  {
    key: 'unity', title: 'How to Make a Video Game in Unity — Programming', url: `${YT}9ZEu_I-ido4`,
    platform: 'YouTube', creator: 'Brackeys',
    description: 'Unity scripting fundamentals: forces, collisions, frame-rate independent movement and clean game code.',
    durationSec: null, categories: ['Development', 'Creative'], stages: ['Foundation', 'Intermediate'],
    keywords: ['unity', 'game', 'c#', 'physics', 'godot', 'unreal', 'gameplay', 'collision', 'scripting', 'input', 'audio', 'ui', 'scene', 'optimization', 'build', 'animation', 'prefab']
  },
  {
    key: 'python', title: 'Python Tutorial — Full Course for Beginners', url: `${YT}_uQrJ0TkZlc`,
    platform: 'YouTube', creator: 'Programming with Mosh',
    description: 'Python from zero: data types, control flow, functions and the debugging habits every career needs.',
    durationSec: null, categories: [], stages: ['Beginner'],
    keywords: ['python', 'programming', 'variable', 'function', 'loop', 'automation', 'scripting', 'data', 'file', 'error', 'testing', 'oop']
  },
  {
    key: 'ml', title: 'Machine Learning with Python and Scikit-Learn — Full Course', url: `${YT}hDKCxebp88A`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Train and evaluate real models: regression, classification, feature importance and deployment thinking.',
    durationSec: null, categories: ['AI & Data'], stages: ['Intermediate', 'Advanced'],
    keywords: ['machine learning', 'scikit', 'model', 'regression', 'training', 'tensorflow', 'pytorch', 'classification', 'feature', 'evaluation', 'pipeline', 'deployment', 'overfitting']
  },
  {
    key: 'nn', title: 'But What Is a Neural Network? — Deep Learning, Chapter 1', url: `${YT}aircAruvnKk`,
    platform: 'YouTube', creator: '3Blue1Brown',
    description: 'Visual intuition for how neural networks learn: neurons, layers, activations and handwritten-digit recognition.',
    durationSec: null, categories: ['AI & Data'], stages: ['Foundation', 'Intermediate', 'Advanced'],
    keywords: ['neural network', 'deep learning', 'cnn', 'transformer', 'backprop', 'nlp', 'vision', 'gradient', 'neuron', 'layer', 'activation', 'training']
  },
  {
    key: 'pandas', title: 'Data Analysis with Pandas — Tabular Data', url: `${YT}b2mLDkMSyn4`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Analyze real datasets with pandas: dataframes, cleaning, grouping and matplotlib visualization.',
    durationSec: null, categories: ['AI & Data', 'Business'], stages: ['Beginner', 'Foundation'],
    keywords: ['pandas', 'numpy', 'data analysis', 'dataframe', 'jupyter', 'matplotlib', 'visualization', 'eda', 'statistics', 'groupby', 'merge', 'cleaning']
  },
  {
    key: 'analyst-sql', title: 'Data Analyst Portfolio Project — Data Cleaning in SQL', url: `${YT}8rO7ztF4NtU`,
    platform: 'YouTube', creator: 'Alex The Analyst',
    description: 'Do the analyst job for real: import messy data, clean it in SQL and shape it into portfolio evidence.',
    durationSec: 3284, categories: ['Business', 'AI & Data'], stages: ['Beginner', 'Foundation', 'Intermediate'],
    keywords: ['data analyst', 'analyst', 'excel', 'power bi', 'tableau', 'dashboard', 'portfolio', 'cleaning', 'kpi', 'reporting', 'join', 'group', 'cte']
  },
  {
    key: 'rag', title: 'Learn RAG From Scratch — Python AI Tutorial (LangChain Engineer)', url: `${YT}sVcwVQRHIc8`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Retrieval-augmented generation in practice: indexing, retrieval, query routing and vector databases.',
    durationSec: 8000, categories: ['AI & Data'], stages: ['Intermediate', 'Advanced'],
    keywords: ['llm', 'rag', 'langchain', 'prompt', 'embedding', 'agent', 'openai', 'generative', 'vector', 'chatbot', 'retrieval', 'chunking', 'prompt engineering', 'evaluation']
  },
  {
    key: 'pentest', title: 'Full Ethical Hacking Course — Network Penetration Testing for Beginners', url: `${YT}3Kq1MIfTWCE`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Authorized, defensive methodology: recon, scanning, enumeration, exploitation labs and professional reporting.',
    durationSec: null, categories: ['Security'], stages: ['Intermediate', 'Advanced'],
    keywords: ['penetration', 'hacking', 'ethical', 'kali', 'exploit', 'pentest', 'red team', 'nmap', 'metasploit', 'vulnerability', 'recon', 'scanning', 'reporting']
  },
  {
    key: 'secplus', title: 'CompTIA Security+ SY0-701 — Full Training Course (official playlist)', url: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv',
    platform: 'YouTube', creator: 'Professor Messer',
    description: 'The complete entry-level security certification path: threats, architecture, operations and governance.',
    durationSec: null, categories: ['Security', 'IT & Cloud'], stages: ['Beginner', 'Foundation'],
    keywords: ['security', 'comptia', 'certification', 'soc', 'analyst', 'risk', 'compliance', 'iam', 'threat', 'incident', 'siem', 'zero trust', 'cryptography', 'network security']
  },
  {
    key: 'owasp', title: 'OWASP Top 10 — Explained with Examples (2024)', url: `${YT}Gb7RDognNcc`,
    platform: 'YouTube', creator: 'OWASP community',
    description: 'The ten most critical web risks — injection, auth failures, access control — shown with real examples.',
    durationSec: null, categories: ['Security', 'Development'], stages: ['Foundation', 'Intermediate'],
    keywords: ['owasp', 'web security', 'xss', 'injection', 'authentication', 'authorization', 'access control', 'csrf', 'api security', 'ssrf', 'security misconfiguration']
  },
  {
    key: 'linux', title: 'Introduction to Linux and Basic Commands for Beginners', url: `${YT}IVquJh3DXUA`,
    platform: 'YouTube', creator: 'sakitech',
    description: 'The terminal survival kit: distros, navigation, permissions, processes and package thinking.',
    durationSec: 1126, categories: ['IT & Cloud', 'Security'], stages: ['Beginner'],
    keywords: ['linux', 'terminal', 'bash', 'command line', 'ubuntu', 'shell', 'sysadmin', 'permissions', 'server', 'file', 'process', 'package', 'ssh']
  },
  {
    key: 'aws', title: 'AWS Certified Cloud Practitioner Course (CLF-C02)', url: `${YT}7HKot-brXFE`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Cloud fluency: regions, IAM, EC2, S3, billing and the shared-responsibility model behind every cloud career.',
    durationSec: null, categories: ['IT & Cloud'], stages: ['Beginner', 'Foundation'],
    keywords: ['aws', 'cloud', 'ec2', 's3', 'deployment', 'infrastructure', 'azure', 'gcp', 'iam', 'devops', 'lambda', 'rds', 'vpc', 'cost', 'security']
  },
  {
    key: 'docker', title: 'Docker Tutorial for Beginners — Full Course', url: `${YT}3c-iBn73dDE`,
    platform: 'YouTube', creator: 'TechWorld with Nana',
    description: 'Containers that click: images, volumes, Compose, Dockerfiles and shipping a real demo project.',
    durationSec: 9975, categories: ['IT & Cloud', 'Development'], stages: ['Intermediate'],
    keywords: ['docker', 'container', 'image', 'compose', 'devops', 'dockerfile', 'microservices', 'volume', 'network', 'build', 'registry']
  },
  {
    key: 'k8s', title: 'Kubernetes Crash Course for Absolute Beginners', url: `${YT}s_o8dwzRlu4`,
    platform: 'YouTube', creator: 'TechWorld with Nana',
    description: 'Orchestration essentials: pods, deployments, services, YAML and a full MongoDB-backed demo on Minikube.',
    durationSec: null, categories: ['IT & Cloud'], stages: ['Intermediate', 'Advanced'],
    keywords: ['kubernetes', 'k8s', 'pod', 'deployment', 'cluster', 'helm', 'sre', 'observability', 'scaling', 'service', 'ingress', 'configmap', 'secret']
  },
  {
    key: 'networking', title: 'Network Engineering — CompTIA Network+ Exam Prep', url: `${YT}qiQR5rTSshw`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'How networks actually work: OSI, TCP/IP, DNS, DHCP, subnetting, routing and troubleshooting method.',
    durationSec: null, categories: ['IT & Cloud', 'Security'], stages: ['Beginner', 'Foundation'],
    keywords: ['network', 'tcp', 'ip', 'dns', 'osi', 'router', 'vlan', 'cisco', 'protocol', 'subnet', 'dhcp', 'routing', 'firewall', 'troubleshooting']
  },
  {
    key: 'figma-ui', title: 'UI/UX Design Tutorial — Wireframe, Mockup & Design in Figma', url: `${YT}c9Wg6Cb_YlU`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'From blank canvas to designed page: grids, components, hierarchy and a complete Figma workflow.',
    durationSec: null, categories: ['Design'], stages: ['Beginner', 'Foundation'],
    keywords: ['figma', 'ui', 'interface', 'wireframe', 'mockup', 'prototype', 'component', 'design system', 'layout', 'accessibility', 'states', 'responsive', 'handoff']
  },
  {
    key: 'figma-basics', title: 'Figma Tutorial for UI Design — Course for Beginners', url: `${YT}jwCmIBJ8Jtc`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Figma foundations: shapes, typography, color, auto layout and the tools behind modern product design.',
    durationSec: null, categories: ['Design'], stages: ['Beginner'],
    keywords: ['figma', 'design', 'vector', 'typography', 'color', 'autolayout', 'tool', 'getting started', 'component', 'prototype', 'grid', 'style']
  },
  {
    key: 'ux-google', title: 'Intro to UX — Google UX Design Certificate', url: `${YT}2QQQtiFwXjU`,
    platform: 'YouTube', creator: 'Google Career Certificates',
    description: 'What UX designers actually do: user-centered process, jobs in the field and designing for good experience.',
    durationSec: null, categories: ['Design', 'Business'], stages: ['Beginner', 'Foundation'],
    keywords: ['ux', 'user experience', 'research', 'persona', 'usability', 'journey', 'testing', 'product', 'empathy', 'user research', 'wireframe', 'prototype', 'accessibility']
  },
  {
    key: 'blender', title: 'Blender Donut Tutorial — Part 1: The Basics', url: `${YT}-tbSCMbJA6o`,
    platform: 'YouTube', creator: 'Blender Guru',
    description: 'The legendary first steps in 3D: navigation, modeling, shading and the workflow every Blender artist learns.',
    durationSec: null, categories: ['Creative'], stages: ['Beginner'],
    keywords: ['blender', '3d', 'modeling', 'render', 'sculpt', 'texturing', 'animation', 'donut', 'geometry', 'modifier', 'lighting', 'material', 'uv', 'rig']
  },
  {
    key: 'davinci', title: 'Learn DaVinci Resolve in 2 Hours — Beginner Course', url: `${YT}ZW0K-HzgUJ4`,
    platform: 'YouTube', creator: 'Bring Your Own Laptop',
    description: 'Cut your first video fast: timeline craft, pacing, audio and delivery in the free Hollywood-grade editor.',
    durationSec: null, categories: ['Creative'], stages: ['Beginner', 'Foundation'],
    keywords: ['video', 'editing', 'premiere', 'davinci', 'resolve', 'color', 'timeline', 'film', 'production', 'audio', 'grade', 'export']
  },
  {
    key: 'ae', title: 'After Effects for Beginners — Free Mega Course', url: `${YT}PWvPbGWVRrU`,
    platform: 'YouTube', creator: 'Envato Tuts+',
    description: 'Motion design from zero: keyframes, masks, tracking, effects and a finished lower-third project.',
    durationSec: 15920, categories: ['Creative'], stages: ['Intermediate'],
    keywords: ['after effects', 'motion', 'animation', 'vfx', 'compositing', 'keyframe', 'tracking', 'motion graphics', 'expression', 'render']
  },
  {
    key: 'procreate', title: 'Anyone Can Draw This Colorful Landscape in Procreate', url: `${YT}U5o4ZFOuBMY`,
    platform: 'YouTube', creator: 'Art with Flo',
    description: 'Guided digital painting: brushes, layers, texture and color confidence for absolute beginners.',
    durationSec: null, categories: ['Creative'], stages: ['Beginner'],
    keywords: ['procreate', 'drawing', 'illustration', 'digital art', 'painting', 'photoshop', 'art', 'sketch', 'ipad', 'layer', 'brush', 'color', 'composition']
  },
  {
    key: 'gamedesign', title: 'Making Your First Game — Basics: How to Start', url: `${YT}z06QR-tz1_o`,
    platform: 'YouTube', creator: 'Extra Credits',
    description: 'Scope small, finish games: MVP thinking, core loops and the beginner traps every designer must dodge.',
    durationSec: null, categories: ['Creative', 'Development'], stages: ['Foundation', 'Intermediate'],
    keywords: ['game design', 'mechanics', 'level', 'narrative', 'gameplay', 'gdd', 'balancing', 'prototype', 'player', 'level design', 'scope', 'player experience']
  },
  {
    key: 'playwright', title: 'Software Testing Course — Playwright, E2E and AI Agents', url: `${YT}jydYq7oAtD8`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Test like a team: the testing pyramid, Playwright setup, assertions and a full e-commerce checkout flow.',
    durationSec: null, categories: ['Quality', 'Development'], stages: ['Foundation', 'Intermediate'],
    keywords: ['playwright', 'testing', 'qa', 'automation', 'e2e', 'cypress', 'test', 'assert', 'ci', 'locator', 'fixture']
  },
  {
    key: 'selenium', title: 'Selenium Course for Beginners — Bots, Automation, Testing', url: `${YT}j7VZsCCnptM`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Browser automation with Selenium and Python: waits, selectors, unittest projects and real bots.',
    durationSec: null, categories: ['Quality'], stages: ['Intermediate'],
    keywords: ['selenium', 'webdriver', 'automation', 'qa', 'testing', 'test plan', 'bug', 'regression', 'locator', 'wait']
  },
  {
    key: 'excel', title: 'Microsoft Excel Tutorial for Beginners — Full Course', url: `${YT}Vl0H-qTclOg`,
    platform: 'YouTube', creator: 'freeCodeCamp.org',
    description: 'Spreadsheet fluency through six projects: formulas, sorting, pivot tables and automation basics.',
    durationSec: null, categories: ['Business'], stages: ['Beginner'],
    keywords: ['excel', 'spreadsheet', 'formula', 'pivot', 'sheets', 'data entry', 'vlookup', 'report', 'chart', 'function']
  },
  {
    key: 'powerbi', title: 'Power BI for the Non-Technical Person', url: `${YT}S7Fh2l-4jlc`,
    platform: 'YouTube', creator: 'Guy in a Cube',
    description: 'From Excel comfort to dashboards: build a beautiful Power BI report with clicks, not code.',
    durationSec: 930, categories: ['Business'], stages: ['Foundation', 'Intermediate'],
    keywords: ['power bi', 'bi', 'dashboard', 'dax', 'report', 'tableau', 'visualization', 'kpi', 'model', 'visual']
  },
  {
    key: 'seo', title: 'Complete SEO Course for Beginners — Learn to Rank #1', url: `${YT}xsVTqzratPs`,
    platform: 'YouTube', creator: 'Ahrefs',
    description: 'Search that works: intent, keyword research, on-page optimization and link building that earns traffic.',
    durationSec: null, categories: ['Business', 'Design'], stages: ['Beginner', 'Foundation'],
    keywords: ['seo', 'marketing', 'keyword', 'content', 'analytics', 'campaign', 'sem', 'social', 'email', 'writing', 'on-page', 'backlink', 'keyword research', 'technical seo']
  }
]

interface RankedVideo {
  video: CuratedVideo
  score: number
}

interface TopicVideoHaystack {
  title: string
  objectives: string
  sections: string
  chapter: string
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function scoreVideo(
  video: CuratedVideo,
  category: string,
  stage: string,
  haystack: TopicVideoHaystack
): number {
  const categoryMatch = video.categories.includes(category)

  // The career allowlist is already an explicit editorial decision; category
  // and stage only rank within it. Never let a broad category label discard
  // an allowed, part-relevant video.
  let score = categoryMatch ? 10 : 0
  if (video.stages.length === 0) score += 1
  else if (video.stages.includes(stage)) score += 4

  // A keyword in the part title is the strongest signal that the video covers
  // this exact sub-topic. Objectives and authored section headings are the
  // next best evidence; the chapter title is only weak context.
  for (const keyword of video.keywords) {
    const needle = normalizeText(keyword)
    if (!needle) continue
    if (haystack.title.includes(needle)) score += 16
    else if (haystack.objectives.includes(needle)) score += 7
    else if (haystack.sections.includes(needle)) score += 5
    else if (haystack.chapter.includes(needle)) score += 2
  }
  return score
}

function clipText(value: string, max = 2_400): string {
  return value.length > max ? value.slice(0, max) : value
}

function buildHaystack(
  career: Pick<CareerDef, 'category'>,
  chapter: Pick<ChapterDef, 'stage' | 'title' | 'slug'>,
  topic: VideoTopicInput
): TopicVideoHaystack {
  const sections = (topic.sections ?? [])
    .map((section) => section.heading ?? '')
    .join(' ')
  return {
    title: normalizeText(`${topic.title} ${topic.slug}`),
    objectives: normalizeText((topic.objectives ?? []).join(' ')),
    sections: normalizeText(clipText(sections)),
    chapter: normalizeText(`${chapter.title} ${chapter.slug} ${career.category}`)
  }
}

function toVideoDef(video: CuratedVideo): VideoDef {
  return {
    title: video.title,
    url: video.url,
    platform: video.platform,
    creator: video.creator,
    description: video.description,
    durationSec: video.durationSec ?? undefined
  }
}

/**
 * Strict per-career video allowlist: career slug → curated video keys.
 * A lesson may ONLY receive videos from its own career's list, so a Unity
 * lesson can never be served a JavaScript video, a security lesson never a
 * cooking-unrelated pick, etc. Every one of the 50 catalog careers is mapped.
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

/** Reverse lookup: curated video URL → catalog key (for mismatch auditing). */
const URL_TO_KEY = new Map(CURATED_VIDEOS.map((v) => [v.url, v.key]))

export function curatedKeyForUrl(url: string): string | null {
  return URL_TO_KEY.get(url) ?? null
}

export interface VideoTopicInput {
  slug: string
  title: string
  objectives?: string[]
  sections?: Array<{ heading: string; body?: string }>
  videos?: VideoDef[]
}

/**
 * Resolve curated videos for every part of one lesson. Topics keep their
 * authored videos when present; the rest are matched by category, stage,
 * part title, objectives and section headings, rotating distinct videos
 * across the three parts so sibling parts don't all play the same video.
 * Returns one VideoDef[] per part.
 */
export function resolveChapterVideos(
  career: Pick<CareerDef, 'category' | 'slug'>,
  chapter: Pick<ChapterDef, 'stage' | 'title' | 'slug'>,
  topics: VideoTopicInput[]
): VideoDef[][] {
  // Strict scoping: only the career's own allowlist may serve its lessons.
  const allowed = new Set(CAREER_VIDEO_ALLOWLIST[career.slug] ?? [])
  const usedUrls = new Set<string>()
  return topics.map((topic) => {
    if (topic.videos && topic.videos.length > 0) {
      for (const video of topic.videos) usedUrls.add(video.url)
      return topic.videos
    }

    const haystack = buildHaystack(career, chapter, topic)
    const ranked: RankedVideo[] = []
    for (const video of CURATED_VIDEOS) {
      if (!allowed.has(video.key)) continue
      const score = scoreVideo(video, career.category, chapter.stage, haystack)
      ranked.push({ video, score })
    }
    ranked.sort((a, b) => b.score - a.score)

    // Prefer a video no sibling part is already using; fall back to the best
    // remaining match for careers whose curated pool is smaller than 3.
    const fresh = ranked.find((r) => !usedUrls.has(r.video.url)) ?? ranked[0]
    if (!fresh) return []
    usedUrls.add(fresh.video.url)
    return [toVideoDef(fresh.video)]
  })
}

export const CURATED_VIDEO_COUNT = CURATED_VIDEOS.length
