import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

/**
 * Theory-exam study hints.
 *
 * A wrong answer must never expose the correct option. Instead the student gets
 * (1) a teaching hint and (2) an exact lesson reference (lesson → topic →
 * section → paragraph) they can use to re-study the material before retrying.
 *
 * Hints are produced by the configured AI provider when available. A
 * deterministic, answer-safe fallback keeps the exam flow working when the
 * provider is missing, slow or returns content that leaks the answer.
 */

export interface TheoryQuestionSource {
  topicSlug?: string
  prompt: string
  options: string[]
  answerIndex: number
  explanation: string
}

export interface TheoryTopicSource {
  publicId: string
  slug: string
  title: string
  objectives: unknown
  sections: unknown
}

export interface TheoryLessonSource {
  chapterPublicId: string
  number: number
  title: string
}

export interface TheoryLessonReference {
  chapterPublicId: string
  lessonNumber: number
  lessonTitle: string
  topicPublicId: string
  topicTitle: string
  /** Zero-based index of the section inside the topic. */
  sectionIndex: number
  sectionHeading: string
  /** One-based paragraph number inside the section. */
  paragraphNumber: number
  /** Stable DOM anchor used by the lesson reader. */
  sectionAnchor: string
}

export interface TheoryStudyHint {
  hint: string
  lessonRef: TheoryLessonReference
  hintSource: 'ai' | 'deterministic'
}

interface SectionSource {
  heading: string
  body: string
}

interface ParagraphSource {
  index: number
  text: string
}

interface PreparedHint {
  questionIndex: number
  question: TheoryQuestionSource
  correctAnswer: string
  fallbackHint: string
  lessonRef: TheoryLessonReference
  topicTitle: string
  sectionHeading: string
  sectionExcerpt: string
  lessonNumber: number
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'your', 'you',
  'be', 'is', 'are', 'as', 'at', 'by', 'it', 'this', 'that', 'from', 'each', 'every',
  'must', 'should', 'will', 'can', 'their', 'its', 'into', 'per', 'use', 'using',
  'which', 'what', 'when', 'how', 'why', 'does', 'do', 'did', 'not', 'all', 'any',
  'one', 'two', 'three', 'most', 'best', 'following', 'correct', 'answer', 'option'
])

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean)
    : []
}

function asSections(value: unknown): SectionSource[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (typeof item !== 'object' || item === null) return null
      const record = item as Record<string, unknown>
      const heading = typeof record.heading === 'string' ? record.heading.trim() : ''
      const body =
        typeof record.body === 'string'
          ? record.body.trim()
          : typeof record.description === 'string'
            ? record.description.trim()
            : ''
      if (!heading && !body) return null
      return { heading: heading || 'Lesson material', body }
    })
    .filter((item): item is SectionSource => item !== null)
}

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

function normalise(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9+#. ]/g, ' ').replace(/\s+/g, ' ').trim()
}

function overlapScore(haystack: string[], needles: string[]): number {
  if (haystack.length === 0 || needles.length === 0) return 0
  const set = new Set(haystack)
  return needles.reduce((score, token) => (set.has(token) ? score + 1 : score), 0)
}

/** Resolve a stored question back to the topic that authored it. */
export function findTheoryTopic(
  question: TheoryQuestionSource,
  topics: TheoryTopicSource[],
  questionIndex: number
): TheoryTopicSource | null {
  if (topics.length === 0) return null
  const reference = (question.topicSlug ?? '').trim().toLowerCase()

  if (reference) {
    const bySlug = topics.find((topic) => topic.slug.toLowerCase() === reference)
    if (bySlug) return bySlug
    // fallbackQuiz() writes the topic title into topicSlug for older content.
    const byTitle = topics.find((topic) => topic.title.toLowerCase() === reference)
    if (byTitle) return byTitle
    const byPartial = topics.find((topic) => {
      const slug = topic.slug.toLowerCase()
      const title = topic.title.toLowerCase()
      return slug.includes(reference) || reference.includes(slug) || title.includes(reference) || reference.includes(title)
    })
    if (byPartial) return byPartial
  }

  return topics[questionIndex] ?? topics[0] ?? null
}

function chooseSection(sections: SectionSource[], question: TheoryQuestionSource): number {
  if (sections.length === 0) return -1
  const promptTokens = keywords(question.prompt)
  const explanationTokens = keywords(question.explanation)
  let bestIndex = 0
  let bestScore = -1

  sections.forEach((section, index) => {
    const headingTokens = keywords(section.heading)
    const bodyTokens = keywords(section.body)
    let score = 0
    for (const token of promptTokens) {
      if (headingTokens.includes(token)) score += 3
      if (bodyTokens.includes(token)) score += 1
    }
    for (const token of explanationTokens) {
      if (headingTokens.includes(token)) score += 2
      if (bodyTokens.includes(token)) score += 0.5
    }
    if (score > bestScore) {
      bestScore = score
      bestIndex = index
    }
  })

  return bestIndex
}

function splitParagraphs(body: string): ParagraphSource[] {
  return body
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter((text) => text.length > 0)
    .map((text, index) => ({ index, text }))
}

function chooseParagraph(paragraphs: ParagraphSource[], question: TheoryQuestionSource): ParagraphSource | null {
  if (paragraphs.length === 0) return null
  const promptTokens = keywords(question.prompt)
  const explanationTokens = keywords(question.explanation)
  let best = paragraphs[0] ?? null
  let bestScore = -1

  for (const paragraph of paragraphs) {
    const tokens = keywords(paragraph.text)
    const score = overlapScore(tokens, promptTokens) + overlapScore(tokens, explanationTokens) * 0.5
    if (score > bestScore) {
      bestScore = score
      best = paragraph
    }
  }

  return best
}

/** Remove an explicit correct-option string from text before it reaches the client. */
export function redactCorrectAnswer(text: string, correctAnswer: string): string {
  const answer = correctAnswer.trim()
  if (answer.length < 2) return text
  const normalisedAnswer = normalise(answer)
  if (normalisedAnswer.length < 2) return text
  const pattern = new RegExp(answer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  return text.replace(pattern, 'the concept described in this section')
}

export function answerLeaks(hint: string, correctAnswer: string): boolean {
  if (
    /\b(the correct (answer|option|choice)|correct (answer|option|choice)|answer is|the answer)\b/i.test(
      hint
    ) ||
    /\b(options?|choices?)\s+([a-d]|\d)\b/i.test(hint) ||
    /\b(first|second|third|fourth)\s+(option|choice)\b/i.test(hint)
  ) {
    return true
  }

  // An explicit "A." / "B)" option label reveals the key just as clearly.
  if (/(^|\s)[a-d][).:]\s/i.test(hint)) return true

  const answer = normalise(correctAnswer)
  if (answer.length >= 2 && normalise(hint).includes(answer)) return true

  const answerTokens = keywords(correctAnswer)
  if (answerTokens.length > 0) {
    const hintTokens = new Set(keywords(hint))
    const overlap = answerTokens.filter((token) => hintTokens.has(token)).length / answerTokens.length
    // Short answers are especially easy to give away, so require a lower
    // overlap before rejecting: one matching word can be the whole key.
    if (overlap >= 0.6) return true
  }
  return false
}

function compactPrompt(prompt: string): string {
  const clean = prompt.replace(/\s+/g, ' ').trim()
  return clean.length <= 180 ? clean : `${clean.slice(0, 177).trimEnd()}…`
}

/**
 * Deterministic hint that points at the right lesson segment without naming
 * the correct option. Used as the baseline and as the safe fallback for AI.
 */
export function buildDeterministicTheoryHint(input: {
  question: TheoryQuestionSource
  topicTitle: string
  sectionHeading: string
  paragraphNumber: number
  lessonNumber: number
  objective?: string | null
}): string {
  const correctAnswer = input.question.options[input.question.answerIndex] ?? ''
  const safeHeading = redactCorrectAnswer(input.sectionHeading, correctAnswer)
  // If the heading itself contained the answer, redaction replaces it. Refer to
  // "the referenced section" instead of quoting the replacement phrase.
  const headingLabel =
    safeHeading === input.sectionHeading && safeHeading.trim()
      ? `“${safeHeading}”`
      : 'the referenced section'
  const safeObjective = input.objective
    ? redactCorrectAnswer(input.objective, correctAnswer)
    : ''
  const objective =
    safeObjective && safeObjective === input.objective
      ? ` Use this learning objective as a checklist: “${safeObjective}”.`
      : ''
  return (
    `Re-read ${headingLabel} ` +
    `in Lesson ${String(input.lessonNumber).padStart(2, '0')}, paragraph ${input.paragraphNumber}. ` +
    `It explains the concept behind “${compactPrompt(input.question.prompt)}”. ` +
    `As you read, identify the rule the scenario depends on, then eliminate options that describe a similar but different situation.${objective}`
  )
}

function selectObjective(topic: TheoryTopicSource, question: TheoryQuestionSource): string | null {
  const objectives = asStringArray(topic.objectives)
  if (objectives.length === 0) return null
  const promptTokens = keywords(question.prompt)
  let best = objectives[0] ?? null
  let bestScore = -1
  for (const objective of objectives) {
    const score = overlapScore(keywords(objective), promptTokens)
    if (score > bestScore) {
      bestScore = score
      best = objective
    }
  }
  return best
}

/** Build a lesson reference + deterministic hint from authored content. */
export function buildTheoryHintBase(input: {
  question: TheoryQuestionSource
  questionIndex: number
  topics: TheoryTopicSource[]
  lesson: TheoryLessonSource
}): TheoryStudyHint & { sectionExcerpt: string; correctAnswer: string } {
  const topic = findTheoryTopic(input.question, input.topics, input.questionIndex)
  if (!topic) {
    return {
      hint: `Update your notes on “${compactPrompt(input.question.prompt)}” and re-read the matching lesson before retrying.`,
      lessonRef: {
        chapterPublicId: input.lesson.chapterPublicId,
        lessonNumber: input.lesson.number,
        lessonTitle: input.lesson.title,
        topicPublicId: '',
        topicTitle: input.lesson.title,
        sectionIndex: 0,
        sectionHeading: 'Lesson material',
        paragraphNumber: 1,
        sectionAnchor: ''
      },
      hintSource: 'deterministic',
      sectionExcerpt: '',
      correctAnswer: input.question.options[input.question.answerIndex] ?? ''
    }
  }

  const sections = asSections(topic.sections)
  const sectionIndex = chooseSection(sections, input.question)
  const section = sectionIndex >= 0 ? sections[sectionIndex] : undefined
  const paragraphs = section ? splitParagraphs(section.body) : []
  const paragraph = chooseParagraph(paragraphs, input.question)
  const paragraphNumber = (paragraph?.index ?? 0) + 1
  const sectionHeading = section?.heading ?? topic.title
  const correctAnswer = input.question.options[input.question.answerIndex] ?? ''
  const safeSectionHeading = redactCorrectAnswer(sectionHeading, correctAnswer)
  const sectionLabel =
    safeSectionHeading === sectionHeading ? sectionHeading : 'this section'
  const objective = selectObjective(topic, input.question)
  const fallbackHint = buildDeterministicTheoryHint({
    question: input.question,
    topicTitle: topic.title,
    sectionHeading,
    paragraphNumber,
    lessonNumber: input.lesson.number,
    objective
  })

  return {
    hint: redactCorrectAnswer(fallbackHint, correctAnswer),
    lessonRef: {
      chapterPublicId: input.lesson.chapterPublicId,
      lessonNumber: input.lesson.number,
      lessonTitle: input.lesson.title,
      topicPublicId: topic.publicId,
      topicTitle: topic.title,
      sectionIndex: Math.max(0, sectionIndex),
      sectionHeading: sectionLabel,
      paragraphNumber,
      sectionAnchor: `topic-${topic.publicId}-section-${Math.max(0, sectionIndex)}`
    },
    hintSource: 'deterministic',
    sectionExcerpt: section?.body ?? '',
    correctAnswer
  }
}

function buildHintPrompt(prepared: PreparedHint[]): string {
  return [
    'You are a patient technical tutor writing hints for a multiple-choice theory exam.',
    'For every question, write ONE hint of 1–2 sentences that guides the student toward the reasoning.',
    'Strict rules:',
    '- NEVER reveal, name, quote or paraphrase the correct option.',
    '- NEVER say “the answer is”, “the correct option is”, or mention an option letter.',
    '- Point the student to the named lesson section and paragraph.',
    '- Encourage the student to distinguish the underlying rule from similar-sounding ideas.',
    'Return ONLY valid JSON in this shape:',
    '{"hints":[{"index":0,"hint":"..."}]}',
    '',
    ...prepared.map((item) => {
      return [
        `Question index: ${item.questionIndex}`,
        `Lesson: ${item.lessonNumber}`,
        `Topic: ${item.topicTitle}`,
        `Section: ${item.sectionHeading}`,
        `Paragraph: ${item.lessonRef.paragraphNumber}`,
        `Question: ${item.question.prompt}`,
        'Options (unmarked; do not identify the correct one):',
        ...item.question.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`),
        `Lesson excerpt for grounding: ${item.sectionExcerpt.slice(0, 900)}`,
        ''
      ].join('\n')
    })
  ].join('\n')
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

async function callHintProvider(prepared: PreparedHint[]): Promise<Map<number, string> | null> {
  if (
    !env.AI_GRADING_API_URL ||
    !env.AI_GRADING_API_KEY ||
    !env.AI_GRADING_MODEL ||
    prepared.length === 0
  ) {
    return null
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), Math.min(env.AI_GRADING_TIMEOUT_MS, 8_000))
  try {
    const response = await fetch(env.AI_GRADING_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.AI_GRADING_API_KEY}`
      },
      body: JSON.stringify({
        model: env.AI_GRADING_MODEL,
        temperature: 0.35,
        messages: [
          {
            role: 'system',
            content:
              'You are a careful tutor. Never reveal the correct answer. Return only the requested JSON object.'
          },
          { role: 'user', content: buildHintPrompt(prepared) }
        ]
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      logger.warn({ status: response.status }, 'AI hint provider returned an error; using deterministic hints')
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
    if (!parsed || !Array.isArray(parsed.hints)) return null

    const hints = new Map<number, string>()
    for (const entry of parsed.hints) {
      if (typeof entry !== 'object' || entry === null) continue
      const record = entry as Record<string, unknown>
      const index = typeof record.index === 'number' ? record.index : Number(record.index)
      const hint = typeof record.hint === 'string' ? record.hint.trim() : ''
      if (!Number.isInteger(index) || !hint) continue
      hints.set(index, hint.slice(0, 600))
    }
    return hints.size > 0 ? hints : null
  } catch (error) {
    logger.warn(
      { error: error instanceof Error ? error.message : String(error) },
      'AI hint generation failed; using deterministic hints'
    )
    return null
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Generate study hints for the requested question indexes. Only answers that
 * were wrong should be passed here; correct answers never need remediation.
 */
export async function buildTheoryStudyHints(
  input: {
    questions: TheoryQuestionSource[]
    topics: TheoryTopicSource[]
    lesson: TheoryLessonSource
  },
  questionIndexes: number[]
): Promise<Map<number, TheoryStudyHint>> {
  const prepared: PreparedHint[] = []
  const result = new Map<number, TheoryStudyHint>()

  for (const questionIndex of questionIndexes) {
    const question = input.questions[questionIndex]
    if (!question) continue
    const base = buildTheoryHintBase({
      question,
      questionIndex,
      topics: input.topics,
      lesson: input.lesson
    })
    result.set(questionIndex, {
      hint: base.hint,
      lessonRef: base.lessonRef,
      hintSource: 'deterministic'
    })
    prepared.push({
      questionIndex,
      question,
      correctAnswer: base.correctAnswer,
      fallbackHint: base.hint,
      lessonRef: base.lessonRef,
      topicTitle: base.lessonRef.topicTitle,
      sectionHeading: base.lessonRef.sectionHeading,
      sectionExcerpt: base.sectionExcerpt,
      lessonNumber: input.lesson.number
    })
  }

  const aiHints = await callHintProvider(prepared)
  if (!aiHints) return result

  for (const item of prepared) {
    const candidate = aiHints.get(item.questionIndex)
    if (!candidate) continue
    if (answerLeaks(candidate, item.correctAnswer)) {
      logger.warn(
        { questionIndex: item.questionIndex },
        'AI hint leaked the correct option; using deterministic hint instead'
      )
      continue
    }
    result.set(item.questionIndex, {
      hint: redactCorrectAnswer(candidate, item.correctAnswer),
      lessonRef: item.lessonRef,
      hintSource: 'ai'
    })
  }

  return result
}
