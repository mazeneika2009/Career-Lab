import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

export interface CodeRequirementResult {
  requirement: string
  met: boolean
  note: string
}

export interface CodeReview {
  score: number
  passed: boolean
  summary: string
  strengths: string[]
  improvements: string[]
  missingRequirements: string[]
  requirementResults: CodeRequirementResult[]
  gradedBy: 'ai' | 'deterministic'
  model: string | null
}

export interface CodeReviewInput {
  lessonTitle: string
  stage: string
  language: string
  brief: string
  requirements: string[]
  expectedOutput: string
  code: string
  passScore: number
}

function clampScore(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, Math.round(n)))
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12)
}

function parseJsonObject(text: string): Record<string, unknown> | null {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  try {
    const parsed = JSON.parse(trimmed) as unknown
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null
  } catch {
    const start = trimmed.indexOf('{')
    const end = trimmed.lastIndexOf('}')
    if (start === -1 || end <= start) return null
    try {
      const parsed = JSON.parse(trimmed.slice(start, end + 1)) as unknown
      return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null
    } catch {
      return null
    }
  }
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'your', 'you', 'use',
  'using', 'must', 'should', 'will', 'can', 'are', 'was', 'were', 'have', 'has', 'its',
  'their', 'each', 'every', 'when', 'then', 'than', 'also', 'not', 'but', 'all', 'any'
])

function keywords(text: string): string[] {
  return [
    ...new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9+#. ]/g, ' ')
        .split(/\s+/)
        .filter((word) => word.length >= 3 && !STOP_WORDS.has(word))
    )
  ]
}

function normalisedCode(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/.*$/gm, ' ')
    .replace(/#.*$/gm, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .toLowerCase()
}

function codeDepthSignal(code: string): number {
  const raw = code.trim()
  if (!raw) return 0
  const lines = raw.split('\n').length
  const functions = (raw.match(/\b(function|def|class|const\s+\w+\s*=\s*\(|=>|fn\s+\w+\s*\()/g) ?? []).length
  const control = (raw.match(/\b(if|else|for|while|switch|case|try|catch|return|await|async)\b/g) ?? []).length
  const punctuation = (raw.match(/[{}()[\];]/g) ?? []).length
  const meaningful = Math.min(1, lines / 24) * 0.35 + Math.min(1, functions / 2) * 0.25
  const flow = Math.min(1, control / 5) * 0.25 + Math.min(1, punctuation / 24) * 0.15
  return Math.min(1, meaningful + flow)
}

/**
 * Deterministic fallback reviewer. It never pretends to execute the code: it
 * checks structure, completeness and requirement vocabulary, then returns
 * honest constructive feedback. Used when no AI provider is configured or the
 * provider is unavailable, so the learning flow never blocks.
 */
export function deterministicCodeReview(input: CodeReviewInput): CodeReview {
  const code = input.code.trim()
  const haystack = normalisedCode(code)
  const words = code.split(/\s+/).filter(Boolean).length
  const depth = codeDepthSignal(code)
  const todoCount = (code.match(/\b(TODO|FIXME|your code here|implement me)\b/gi) ?? []).length

  const requirementResults = input.requirements.map((requirement) => {
    const keys = keywords(requirement).filter((key) => key.length >= 4)
    if (keys.length === 0) {
      return {
        requirement,
        met: words >= 20,
        note: words >= 20 ? 'A concrete attempt is present.' : 'No concrete implementation yet.'
      }
    }
    const hits = keys.filter((key) => haystack.includes(key)).length
    const ratio = hits / keys.length
    // Require meaningful vocabulary coverage, not a single incidental word.
    const met = ratio >= 0.34 && words >= 12
    const partial = ratio >= 0.18 || words >= 25
    return {
      requirement,
      met,
      note: met
        ? `Evidence found for: ${keys.filter((key) => haystack.includes(key)).slice(0, 4).join(', ')}.`
        : partial
          ? 'Partially covered — make this requirement explicit in the code or comments.'
          : 'Not evidenced — add the missing behaviour and a short comment explaining it.'
    }
  })

  const metCount = requirementResults.filter((result) => result.met).length
  const coverage = input.requirements.length === 0 ? 0.5 : metCount / input.requirements.length
  const lengthScore = Math.min(1, words / 90)
  const rawScore = coverage * 60 + depth * 25 + lengthScore * 15 - todoCount * 4
  // A submission that is only comments/placeholders must not pass.
  const looksPlaceholder = words < 12 || /^\s*(\/\/|#|\/\*|<!--)/.test(code) && words < 30
  const score = clampScore(looksPlaceholder ? Math.min(25, rawScore) : rawScore)
  const passed = score >= input.passScore

  const missingRequirements = requirementResults
    .filter((result) => !result.met)
    .map((result) => result.requirement)
    .slice(0, 6)

  const strengths: string[] = []
  if (metCount > 0) {
    strengths.push(`Your submission addresses ${metCount} of ${input.requirements.length} required outcomes.`)
  }
  if (depth >= 0.5) strengths.push('The code has a clear structure with control flow and reusable units.')
  if (lengthScore >= 0.7) strengths.push('The implementation is developed enough to review as real work.')
  if (strengths.length === 0) {
    strengths.push('You made a start — the next pass should turn the brief into explicit, runnable behaviour.')
  }

  const improvements: string[] = []
  if (missingRequirements.length > 0) {
    improvements.push(`Make these outcomes explicit: ${missingRequirements.slice(0, 3).join('; ')}.`)
  }
  if (todoCount > 0) improvements.push('Replace TODO/FIXME placeholders with working code before resubmitting.')
  if (depth < 0.45) improvements.push('Add the core function, branching or data handling the brief asks for.')
  if (input.expectedOutput) improvements.push(`Show how your solution produces: ${input.expectedOutput}.`)
  improvements.push('Add a short usage note or example call so the solution can be verified.')

  return {
    score,
    passed,
    summary: passed
      ? `The submission meets the ${input.passScore}% bar for ${input.lessonTitle}. It demonstrates the required outcomes and is ready to continue.`
      : `The submission scores ${score}% against a ${input.passScore}% pass bar. It is a useful start, but the missing outcomes below should be implemented before moving on.`,
    strengths: strengths.slice(0, 4),
    improvements: [...new Set(improvements)].slice(0, 5),
    missingRequirements,
    requirementResults,
    gradedBy: 'deterministic',
    model: null
  }
}

function buildPrompt(input: CodeReviewInput): string {
  return [
    'You are a senior software engineering instructor reviewing a practical exam submission.',
    'Grade the code only against the lesson requirements. Be constructive, specific and honest.',
    'Do not run the code. Do not reward comments alone. Return ONLY valid JSON with this shape:',
    '{',
    '  "score": 0-100 integer,',
    '  "summary": "2-3 sentence overall verdict",',
    '  "strengths": ["specific strength"],',
    '  "improvements": ["specific, actionable improvement"],',
    '  "missingRequirements": ["requirement not met"],',
    '  "requirementResults": [{"requirement": "exact requirement text", "met": true, "note": "evidence"}],',
    '  "passed": true',
    '}',
    '',
    `Lesson: ${input.lessonTitle} (${input.stage})`,
    `Language: ${input.language}`,
    `Brief: ${input.brief}`,
    `Expected output: ${input.expectedOutput}`,
    `Passing score: ${input.passScore}/100`,
    '',
    'Requirements:',
    ...input.requirements.map((requirement, index) => `${index + 1}. ${requirement}`),
    '',
    'Submission:',
    '```' + input.language,
    input.code,
    '```'
  ].join('\n')
}

async function callProvider(input: CodeReviewInput): Promise<CodeReview | null> {
  if (!env.AI_GRADING_API_URL || !env.AI_GRADING_API_KEY) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), env.AI_GRADING_TIMEOUT_MS)
  try {
    const response = await fetch(env.AI_GRADING_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.AI_GRADING_API_KEY}`
      },
      body: JSON.stringify({
        model: env.AI_GRADING_MODEL,
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content:
              'You are an exacting but supportive code reviewer. Return only the requested JSON object.'
          },
          { role: 'user', content: buildPrompt(input) }
        ]
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      logger.warn({ status: response.status }, 'AI grading provider returned an error')
      return null
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: unknown } }>
      output_text?: unknown
    }
    const raw =
      typeof payload.choices?.[0]?.message?.content === 'string'
        ? payload.choices[0].message.content
        : typeof payload.output_text === 'string'
          ? payload.output_text
          : ''
    const parsed = parseJsonObject(raw)
    if (!parsed) {
      logger.warn('AI grading provider returned unparseable content')
      return null
    }

    const score = clampScore(parsed.score)
    const passedValue = typeof parsed.passed === 'boolean' ? parsed.passed : score >= input.passScore
    const requirementResults = Array.isArray(parsed.requirementResults)
      ? (parsed.requirementResults as unknown[])
          .map((item) => {
            if (typeof item !== 'object' || item === null) return null
            const row = item as Record<string, unknown>
            const requirement = typeof row.requirement === 'string' ? row.requirement : ''
            if (!requirement) return null
            return {
              requirement,
              met: row.met === true,
              note: typeof row.note === 'string' ? row.note.slice(0, 400) : ''
            }
          })
          .filter((item): item is CodeRequirementResult => item !== null)
      : []

    // Fill any requirements the model omitted so the UI always has a complete checklist.
    for (const requirement of input.requirements) {
      if (!requirementResults.some((row) => row.requirement === requirement)) {
        requirementResults.push({
          requirement,
          met: false,
          note: 'The reviewer did not find explicit evidence for this requirement.'
        })
      }
    }

    const missingRequirements =
      asStringArray(parsed.missingRequirements).length > 0
        ? asStringArray(parsed.missingRequirements)
        : requirementResults.filter((row) => !row.met).map((row) => row.requirement)

    return {
      score,
      passed: passedValue && score >= input.passScore,
      summary:
        typeof parsed.summary === 'string' && parsed.summary.trim()
          ? parsed.summary.trim().slice(0, 1200)
          : score >= input.passScore
            ? 'The submission meets the lesson requirements.'
            : 'The submission needs more work before it meets the lesson requirements.',
      strengths: asStringArray(parsed.strengths),
      improvements: asStringArray(parsed.improvements),
      missingRequirements: missingRequirements.slice(0, 8),
      requirementResults: requirementResults.slice(0, 12),
      gradedBy: 'ai',
      model: env.AI_GRADING_MODEL
    }
  } catch (error) {
    logger.warn(
      { error: error instanceof Error ? error.message : String(error) },
      'AI grading failed; using deterministic fallback'
    )
    return null
  } finally {
    clearTimeout(timeout)
  }
}

/** Grade a practical submission with the configured provider, falling back safely. */
export async function reviewCode(input: CodeReviewInput): Promise<CodeReview> {
  const ai = await callProvider(input)
  return ai ?? deterministicCodeReview(input)
}
