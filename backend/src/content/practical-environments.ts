export type PracticalEnvironment =
  | 'code'
  | 'database'
  | 'design'
  | 'network'
  | 'ai'
  | 'business'
  | 'writing'

export interface PracticalEnvironmentProfile {
  environment: PracticalEnvironment
  language: string
  languageLabel: string
}

const DESIGN_CAREERS = new Set([
  '2d-artist-illustrator',
  '3d-artist',
  'digital-artist',
  'game-designer',
  'motion-designer',
  'product-designer',
  'ui-designer',
  'ux-designer',
  'video-editor',
  'web-designer'
])

const NETWORK_CAREERS = new Set([
  'cloud-engineer',
  'cloud-security-engineer',
  'cybersecurity-analyst',
  'devops-engineer',
  'hardware-support-specialist',
  'it-support-specialist',
  'network-administrator',
  'network-engineer',
  'penetration-tester',
  'security-engineer',
  'site-reliability-engineer',
  'soc-analyst',
  'system-administrator'
])

const AI_CAREERS = new Set([
  'ai-engineer',
  'computer-vision-engineer',
  'data-scientist',
  'deep-learning-engineer',
  'generative-ai-developer',
  'machine-learning-engineer',
  'nlp-engineer'
])

const DATABASE_CAREERS = new Set([
  'bi-developer',
  'data-analyst',
  'data-engineer',
  'database-administrator'
])

const BUSINESS_CAREERS = new Set([
  'digital-marketing-specialist'
])

const WRITING_CAREERS = new Set(['technical-writer'])

const ENVIRONMENT_PROFILES: Record<PracticalEnvironment, Omit<PracticalEnvironmentProfile, 'environment'>> = {
  code: { language: 'javascript', languageLabel: 'JavaScript' },
  database: { language: 'sql', languageLabel: 'SQL' },
  design: { language: 'design', languageLabel: 'Design canvas' },
  network: { language: 'network', languageLabel: 'Network configuration' },
  ai: { language: 'python', languageLabel: 'Python notebook' },
  business: { language: 'markdown', languageLabel: 'Business strategy' },
  writing: { language: 'markdown', languageLabel: 'Technical writing' }
}

export function practicalEnvironmentFor(career: { slug: string; category?: string }): PracticalEnvironmentProfile {
  const slug = career.slug.toLowerCase()
  let environment: PracticalEnvironment
  if (DESIGN_CAREERS.has(slug)) environment = 'design'
  else if (NETWORK_CAREERS.has(slug)) environment = 'network'
  else if (AI_CAREERS.has(slug)) environment = 'ai'
  else if (DATABASE_CAREERS.has(slug)) environment = 'database'
  else if (WRITING_CAREERS.has(slug)) environment = 'writing'
  else if (BUSINESS_CAREERS.has(slug)) environment = 'business'
  else if (career.category === 'Design' || career.category === 'Creative') environment = 'design'
  else if (career.category === 'AI & Data') environment = 'ai'
  else if (career.category === 'Security') environment = 'network'
  else environment = 'code'

  const languageOverride = languageForCodeCareer(slug, environment)
  return {
    environment,
    language: languageOverride?.language ?? ENVIRONMENT_PROFILES[environment].language,
    languageLabel: languageOverride?.languageLabel ?? ENVIRONMENT_PROFILES[environment].languageLabel
  }
}

function languageForCodeCareer(
  slug: string,
  environment: PracticalEnvironment
): { language: string; languageLabel: string } | null {
  if (environment !== 'code') return null
  if (slug.includes('android')) return { language: 'kotlin', languageLabel: 'Kotlin' }
  if (slug.includes('ios')) return { language: 'swift', languageLabel: 'Swift' }
  if (slug.includes('flutter')) return { language: 'dart', languageLabel: 'Dart' }
  if (slug.includes('react-native')) return { language: 'typescript', languageLabel: 'TypeScript' }
  if (/(backend|full-stack|node|cloud|devops|security|network|system|qa|automation|sre)/.test(slug)) {
    return { language: 'typescript', languageLabel: 'TypeScript' }
  }
  return { language: 'javascript', languageLabel: 'JavaScript' }
}

export function starterCodeForEnvironment(input: {
  environment: PracticalEnvironment
  language: string
  lessonTitle: string
  requirements: string[]
  brief?: string
}): string {
  const requirements = input.requirements.slice(0, 6)

  switch (input.environment) {
    case 'database':
      return [
        `-- Practical exam: ${input.lessonTitle}`,
        ...requirements.map((line) => `-- - ${line}`),
        '',
        '-- Review the schema, then write the query that satisfies every requirement.',
        'WITH prepared AS (',
        '  SELECT *',
        '  FROM your_table',
        ')',
        'SELECT *',
        'FROM prepared;'
      ].join('\n')
    case 'design':
      return [
        `// Practical exam: ${input.lessonTitle}`,
        ...requirements.map((line) => `// - ${line}`),
        '',
        '// Use the canvas to produce the required visual deliverable.',
        '// Add a short rationale in the notes panel before submitting.'
      ].join('\n')
    case 'network':
      return [
        `// Practical exam: ${input.lessonTitle}`,
        ...requirements.map((line) => `// - ${line}`),
        '',
        '// Build the topology on the canvas, then verify it in the terminal.',
        '// Document the addressing and security decisions in the notes panel.'
      ].join('\n')
    case 'ai':
      return [
        `# Practical exam: ${input.lessonTitle}`,
        ...requirements.map((line) => `# - ${line}`),
        '',
        'sample_input = [',
        '    {"text": "The package arrived on time", "label": "positive"},',
        '    {"text": "The item was damaged", "label": "negative"},',
        ']',
        '',
        'def solve(input_data):',
        '    """Prepare a result and evaluate it against the sample input."""',
        '    # TODO: implement the required model or analysis',
        '    raise NotImplementedError',
        '',
        '',
        'if __name__ == "__main__":',
        '    print(solve(sample_input))'
      ].join('\n')
    case 'business':
      return [
        `# Practical exam: ${input.lessonTitle}`,
        '',
        '## Objective',
        '',
        '## Audience',
        '',
        '## Channels',
        '',
        '## Timeline',
        '',
        '## KPIs',
        '',
        '## Risks and mitigations',
        '',
        ...requirements.map((line) => `- [ ] ${line}`)
      ].join('\n')
    case 'writing':
      return [
        `# ${input.lessonTitle}`,
        '',
        '## Purpose',
        '',
        '## Audience and prerequisites',
        '',
        '## Step-by-step guide',
        '',
        '## Verification',
        '',
        ...requirements.map((line) => `- [ ] ${line}`)
      ].join('\n')
    case 'code':
    default:
      switch (input.language) {
        case 'python':
          return [
            `# Practical exam: ${input.lessonTitle}`,
            '# Implement each requirement and add a short usage example at the bottom.',
            ...requirements.map((line) => `# - ${line}`),
            '',
            'def solve(input_data):',
            '    """Return a working result for the lesson brief."""',
            '    # TODO: implement the required behaviour',
            '    raise NotImplementedError',
            '',
            '',
            'if __name__ == "__main__":',
            '    print(solve(None))'
          ].join('\n')
        case 'kotlin':
          return [
            `// Practical exam: ${input.lessonTitle}`,
            ...requirements.map((line) => `// - ${line}`),
            '',
            'fun solve(input: Any?): Any? {',
            '    // TODO: implement the required behaviour',
            '    return null',
            '}'
          ].join('\n')
        case 'swift':
          return [
            `// Practical exam: ${input.lessonTitle}`,
            ...requirements.map((line) => `// - ${line}`),
            '',
            'func solve(_ input: Any?) -> Any? {',
            '    // TODO: implement the required behaviour',
            '    return nil',
            '}'
          ].join('\n')
        case 'dart':
          return [
            `// Practical exam: ${input.lessonTitle}`,
            ...requirements.map((line) => `// - ${line}`),
            '',
            'Object? solve(Object? input) {',
            '  // TODO: implement the required behaviour',
            '  return null;',
            '}'
          ].join('\n')
        case 'typescript':
          return [
            `// Practical exam: ${input.lessonTitle}`,
            ...requirements.map((line) => `// - ${line}`),
            '',
            'type Result = { ok: boolean; data?: unknown }',
            '',
            'export function solve(input: unknown): Result {',
            '  // TODO: implement the required behaviour',
            '  throw new Error("Not implemented")',
            '}'
          ].join('\n')
        default:
          return [
            `// Practical exam: ${input.lessonTitle}`,
            ...requirements.map((line) => `// - ${line}`),
            '',
            'function solve(input) {',
            '  // TODO: implement the required behaviour',
            '  throw new Error("Not implemented")',
            '}',
            '',
            '// Add a short usage example below.',
            '// console.log(solve(/* sample input */))'
          ].join('\n')
      }
  }
}
