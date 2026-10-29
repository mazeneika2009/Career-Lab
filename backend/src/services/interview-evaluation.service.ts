import {
  INTERVIEW_PASS_SCORE,
  type InterviewStage
} from '../config/constants.js'
import {
  aiProviderConfigured,
  aiProviderModel,
  requestJsonCompletion
} from '../utils/ai-provider.js'
import { logger } from '../utils/logger.js'

/**
 * Per-question interview review. Every submitted answer gets a score, an
 * explanation of that score, concrete gaps and a study plan. When an AI
 * provider is configured it produces the report; otherwise a deterministic
 * rubric engine produces the same structured feedback so the feature never
 * blocks on an external service.
 */
export interface InterviewStudyTopic {
  topic: string
  why: string
  action: string
}

export interface InterviewAnswerReview {
  questionPublicId: string
  question: string
  dimension: string
  score: number
  passed: boolean
  verdict: string
  whyThisScore: string[]
  strengths: string[]
  mistakes: string[]
  feedback: string[]
  studyTopics: InterviewStudyTopic[]
  gradedBy: 'ai' | 'deterministic'
  model: string | null
}

export interface InterviewAnswerInput {
  questionPublicId: string
  question: string
  dimension: string
  guidance: string[]
  answer: string
  stage: InterviewStage
  careerName: string
}

const DIMENSION_LABELS: Record<string, string> = {
  technical_knowledge: 'Technical knowledge',
  problem_solving: 'Problem solving',
  professional_reasoning: 'Professional reasoning',
  communication: 'Communication'
}

export function interviewDimensionLabel(dimension: string): string {
  return DIMENSION_LABELS[dimension] ?? dimension.replace(/_/g, ' ')
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'your', 'you', 'use',
  'using', 'must', 'should', 'will', 'can', 'are', 'was', 'were', 'have', 'has', 'its',
  'their', 'each', 'every', 'when', 'then', 'than', 'also', 'not', 'but', 'all', 'any',
  'about', 'what', 'which', 'how', 'why', 'who', 'where', 'would', 'could', 'does',
  'before', 'after', 'during', 'while', 'within', 'across', 'between', 'through',
  'over', 'under', 'upon', 'without', 'against', 'around', 'along', 'via',
  'explain', 'describe', 'give', 'tell'
])

/**
 * Rubric text is written as instructions ("explains…", "gives a concrete…").
 * Those verbs must not become required answer keywords, otherwise a candidate
 * who actually covers the point is penalised for not repeating the rubric.
 */
const META_WORDS = new Set([
  'connect', 'connects', 'explain', 'explains', 'give', 'gives', 'show', 'shows',
  'demonstrate', 'demonstrates', 'describe', 'describes', 'identify', 'identifies',
  'apply', 'applies', 'verify', 'verifies', 'state', 'states', 'provide', 'provides',
  'mention', 'mentions', 'include', 'includes', 'cover', 'covers', 'address', 'addresses',
  'highlight', 'highlights', 'discuss', 'discusses', 'acknowledge', 'acknowledges',
  'recognize', 'recognizes', 'recognise', 'recognises', 'understand', 'understands',
  'know', 'knows', 'list', 'lists', 'ensure', 'ensures', 'outline', 'outlines',
  'define', 'defines', 'compare', 'compares', 'evaluate', 'evaluates', 'assess',
  'assesses', 'analyze', 'analyzes', 'analyse', 'analyses', 'choose', 'chooses',
  'select', 'selects', 'propose', 'proposes', 'recommend', 'recommends', 'support',
  'supports', 'justify', 'justifies', 'articulate', 'articulates', 'communicate',
  'communicates', 'collaborate', 'collaborates', 'handle', 'handles', 'manage',
  'manages', 'achieve', 'achieves', 'ability', 'able', 'candidate', 'answer',
  'response', 'specific', 'concrete', 'relevant', 'clear', 'detailed', 'strong',
  'good', 'effective', 'appropriate', 'correct', 'accurate', 'practical',
  'professional', 'key', 'main', 'core', 'own', 'measurable', 'making'
])

/**
 * Vocabulary bridges for common interview concepts. They let the rubric
 * recognise "previous role" as past experience and "dashboard" as an example,
 * without requiring the candidate to mirror the exact rubric wording.
 */
const SYNONYMS: Record<string, string[]> = {
  past: ['previous', 'prior', 'earlier', 'last'],
  previous: ['past', 'prior', 'earlier', 'last'],
  experience: ['role', 'job', 'project', 'worked', 'career', 'background'],
  motivation: ['want', 'why', 'interested', 'interest', 'passion', 'drawn', 'enjoy', 'career', 'goal'],
  interest: ['motivation', 'want', 'enjoy', 'drawn'],
  role: ['position', 'job', 'developer', 'engineer', 'responsibility'],
  frontend: ['front-end', 'client-side', 'ui', 'react', 'javascript', 'web', 'interface'],
  backend: ['back-end', 'server-side', 'api', 'database', 'node'],
  development: ['developer', 'develop', 'built', 'build', 'engineering', 'implement'],
  developer: ['development', 'engineer', 'built', 'build'],
  example: ['project', 'built', 'implemented', 'shipped', 'instance', 'case', 'dashboard', 'situation'],
  work: ['role', 'job', 'project', 'task', 'assignment'],
  skill: ['skills', 'technology', 'technologies', 'tool', 'tools', 'testing', 'knowledge'],
  skills: ['skill', 'technology', 'technologies', 'tool', 'tools', 'testing', 'knowledge'],
  awareness: ['aware', 'understand', 'recognize', 'learning', 'conscious', 'currently'],
  still: ['currently', 'learning', 'developing', 'remain', 'yet'],
  develop: ['improve', 'growth', 'grow', 'learning', 'strengthen', 'build'],
  team: ['teamwork', 'colleague', 'collaborate', 'worked with'],
  teamwork: ['team', 'collaborate', 'colleague'],
  problem: ['issue', 'challenge', 'bug', 'incident', 'failure', 'blocker'],
  issue: ['problem', 'challenge', 'bug', 'incident'],
  solution: ['fix', 'resolve', 'approach', 'implementation'],
  fix: ['resolve', 'solution', 'repair', 'correct'],
  result: ['outcome', 'impact', 'improved', 'reduced', 'increased', 'delivered', 'metric'],
  outcome: ['result', 'impact', 'improvement'],
  impact: ['result', 'outcome', 'improved', 'reduced', 'increased'],
  metric: ['measure', 'measurement', 'number', 'percentage', 'percent', 'baseline', 'kpi'],
  performance: ['speed', 'latency', 'load time', 'throughput', 'faster', 'slow'],
  improve: ['improved', 'enhance', 'optimize', 'optimise', 'reduce', 'increase', 'better'],
  improved: ['improve', 'enhance', 'optimized', 'optimised', 'reduced', 'increased'],
  bottleneck: ['constraint', 'limiting factor', 'slow point', 'profiling', 'profile'],
  test: ['testing', 'tested', 'unit test', 'integration test', 'qa', 'verify', 'validation'],
  testing: ['test', 'tested', 'qa', 'verify', 'validation'],
  accessibility: ['a11y', 'wcag', 'screen reader', 'keyboard', 'contrast']
}

function baseForm(word: string): string {
  if (word.endsWith('ies') && word.length > 4) return `${word.slice(0, -3)}y`
  if (word.endsWith('s') && !/(ss|us|is)$/.test(word) && word.length > 3) {
    return word.slice(0, -1)
  }
  return word
}

function variantsOf(key: string): string[] {
  const base = baseForm(key)
  return [...new Set([key, base, ...(SYNONYMS[key] ?? SYNONYMS[base] ?? [])])]
}

function matchesVocabulary(haystack: string, key: string): boolean {
  return variantsOf(key).some((variant) => {
    if (variant.length <= 3) {
      const escaped = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:[^a-z0-9]|$)`, 'i').test(haystack)
    }
    return haystack.includes(variant)
  })
}

const FILLER_PATTERNS = [
  /\bi think\b/gi,
  /\bi guess\b/gi,
  /\bkind of\b/gi,
  /\bsort of\b/gi,
  /\byou know\b/gi,
  /\bstuff\b/gi,
  /\bthings like that\b/gi,
  /\bbasically\b/gi,
  /\bobviously\b/gi,
  /\bmaybe\b/gi,
  /\bi'm not sure\b/gi,
  /\bi don't know\b/gi
]

function clampScore(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, Math.round(n)))
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

function unique(values: string[], limit: number): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].slice(0, limit)
}

function wordsOf(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean)
}

function keywordsOf(text: string): string[] {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/\s+/)
    .map((token) => token.replace(/^[.-]+|[.-]+$/g, ''))
    .filter(
      (token) =>
        token.length >= 4 &&
        !STOP_WORDS.has(token) &&
        !META_WORDS.has(token) &&
        !META_WORDS.has(baseForm(token))
    )
  return [...new Set(tokens)]
}

function shortTopic(point: string): string {
  const clause = point.split(/[:.;—–]/)[0]?.trim() ?? point.trim()
  const text = clause.split(/\s+/).filter(Boolean).slice(0, 9).join(' ')
  return text.length > 80 ? `${text.slice(0, 77)}…` : text || 'The missing interview point'
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

interface GuidanceCheck {
  point: string
  ratio: number
  covered: boolean
  partial: boolean
  matched: string[]
  missing: string[]
}

function assessGuidance(answer: string, guidance: string[]): GuidanceCheck[] {
  const haystack = ` ${answer.toLowerCase()} `
  return guidance.map((point) => {
    const keys = keywordsOf(point)
    if (keys.length === 0) {
      const covered = answer.trim().length >= 40
      return {
        point,
        ratio: covered ? 1 : 0,
        covered,
        partial: !covered && answer.trim().length > 0,
        matched: [],
        missing: []
      }
    }

    const matched = keys.filter((key) => matchesVocabulary(haystack, key))
    const ratio = matched.length / keys.length
    const needed = Math.min(2, keys.length)
    return {
      point,
      ratio,
      covered: ratio >= 0.34 && matched.length >= needed,
      partial: ratio >= 0.15,
      matched,
      missing: keys.filter((key) => !matched.includes(key))
    }
  })
}

function fillerSignals(answer: string): { count: number; phrases: string[] } {
  const phrases: string[] = []
  let count = 0
  for (const pattern of FILLER_PATTERNS) {
    const matches = answer.match(pattern) ?? []
    count += matches.length
    phrases.push(...matches.map((match) => match.toLowerCase()))
  }
  return { count, phrases: [...new Set(phrases)] }
}

function deterministicVerdict(score: number, stage: InterviewStage): string {
  const label = stage === 'hr' ? 'screening' : 'technical'
  if (score >= 85) return `Excellent ${label} answer — specific, well-evidenced and ready for a real interview.`
  if (score >= INTERVIEW_PASS_SCORE) {
    return `Solid ${label} answer that clears the bar; close the gaps below to move into the top band.`
  }
  if (score >= 45) return `Developing ${label} answer — the core idea is present, but evidence and precision are missing.`
  return `Weak ${label} answer — key expectations are missing; rebuild it using the feedback below.`
}

function dimensionStudyTopic(
  dimension: string,
  careerName: string
): InterviewStudyTopic {
  switch (dimension) {
    case 'technical_knowledge':
      return {
        topic: `Core ${careerName} concepts`,
        why: 'Technical answers are scored on precise terminology and correct mechanisms, not general enthusiasm.',
        action: `Revisit the core ${careerName} material, then explain the three most important concepts aloud in under 90 seconds each.`
      }
    case 'problem_solving':
      return {
        topic: 'Structured problem solving',
        why: 'Interviewers look for a repeatable diagnosis → action → verification sequence.',
        action: 'Practise answering with: context, constraints, options considered, action taken, result measured.'
      }
    case 'professional_reasoning':
      return {
        topic: 'Trade-offs and professional judgment',
        why: 'Senior roles require you to explain why one option is better under real constraints.',
        action: 'For each decision, write the trade-off in one sentence: speed vs quality, cost vs reliability, or scope vs risk.'
      }
    default:
      return {
        topic: 'Concise interview storytelling',
        why: 'Strong content still scores poorly when the interviewer has to work to follow it.',
        action: 'Record a 60-second answer and cut it to three sentences: situation, action, measurable result.'
      }
  }
}

function buildStudyTopics(input: {
  checks: GuidanceCheck[]
  stage: InterviewStage
  dimension: string
  careerName: string
  score: number
  hasExample: boolean
  hasMetrics: boolean
  fillerCount: number
}): InterviewStudyTopic[] {
  const topics: InterviewStudyTopic[] = []

  for (const check of input.checks.filter((item) => !item.covered)) {
    const topic = shortTopic(check.point)
    topics.push({
      topic,
      why: `The answer did not evidence this expected point: ${truncate(check.point, 160)}`,
      action: check.partial
        ? `Review ${topic} and add the missing detail (${check.missing.slice(0, 3).join(', ') || 'the expected outcome'}) to your next answer.`
        : `Study ${topic}, then write a three-bullet answer that states what you did, why, and the result.`
    })
  }

  if (!input.hasExample) {
    topics.push({
      topic: 'STAR evidence and examples',
      why: 'The answer makes claims but gives the interviewer no concrete situation to evaluate.',
      action: 'Prepare two STAR stories (Situation, Task, Action, Result) from your last project and rehearse them in 90 seconds.'
    })
  }

  if (!input.hasMetrics) {
    topics.push({
      topic: 'Quantifying impact',
      why: 'Numbers make claims credible and distinguish you from candidates who speak only in generalities.',
      action: 'For each project on your CV, record one metric: time saved, percentage improvement, users affected, or cost avoided.'
    })
  }

  if (input.fillerCount > 0) {
    topics.push({
      topic: 'Confident, concise delivery',
      why: 'Hedging phrases such as “I think” or “maybe” reduce the perceived authority of your answer.',
      action: 'Rewrite the answer without hedging, then practise it aloud until the opening sentence states your position directly.'
    })
  }

  topics.push(dimensionStudyTopic(input.dimension, input.careerName))

  if (input.stage === 'hr') {
    topics.push({
      topic: 'Motivation and role fit',
      why: 'Screening interviews test whether your story logically connects to this career and company.',
      action: 'Write a 60-second “why this role” answer that links one past experience to one requirement in the job description.'
    })
  }

  if (input.score >= 85) {
    topics.push({
      topic: 'Advanced scenario preparation',
      why: 'You already clear the bar; the remaining upside is handling ambiguous, senior-level follow-ups.',
      action: 'Practise two ambiguous scenarios and state the assumptions you would validate before acting.'
    })
  }

  if (topics.length < 2) {
    topics.push({
      topic: 'Answer refinement and follow-up questions',
      why: 'Interviewers probe the edges of a strong answer; prepare the next question your answer invites.',
      action: 'For your best answer, write the two most likely follow-up questions and a one-sentence response to each.'
    })
  }

  const seen = new Set<string>()
  return topics
    .filter((topic) => {
      const key = topic.topic.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 5)
}

export function deterministicInterviewAnswerReview(
  input: InterviewAnswerInput
): InterviewAnswerReview {
  const answer = input.answer.trim()
  const guidance = input.guidance.filter((point) => point.trim().length > 0)
  const effectiveGuidance = guidance.length > 0 ? guidance : [input.question]
  const checks = assessGuidance(answer, effectiveGuidance)
  const words = wordsOf(answer).length
  const targetWords = input.stage === 'hr' ? 60 : 80
  const depth = clamp01(words / targetWords)
  const sentenceParts = answer.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean)
  const paragraphs = answer.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean)
  const bulletLines = answer.split('\n').filter((line) => /^\s*([-*•]|\d+[.)])\s+/.test(line))
  const transitions = answer.match(
    /\b(first|firstly|second|secondly|then|next|finally|because|however|therefore|as a result|for example|for instance|in summary|to recap)\b/gi
  ) ?? []
  const starWords = answer.match(
    /\b(situation|task|action|result|context|challenge|outcome|impact)\b/gi
  ) ?? []
  const starSet = new Set(starWords.map((word) => word.toLowerCase()))
  const averageSentenceWords = sentenceParts.length > 0 ? words / sentenceParts.length : words

  let structure = 0
  if (bulletLines.length >= 2) structure += 0.3
  if (paragraphs.length >= 2) structure += 0.2
  else if (sentenceParts.length >= 4) structure += 0.1
  if (transitions.length >= 1) structure += 0.2
  if (starSet.size >= 2) structure += 0.15
  if (sentenceParts.length >= 3 && averageSentenceWords <= 28) structure += 0.15
  structure = clamp01(structure)

  const numberMatches = answer.match(/\b\d+(?:\.\d+)?\s?(?:%|percent|ms|s|sec|seconds|minutes|hours|days|weeks|months|years|users|customers|requests|rows|records|people|k|m|x)?\b/gi) ?? []
  const exampleMatches = answer.match(
    /\b(for example|for instance|in my (?:last|previous|current) (?:role|project|job|team)|at (?:work|university|college)|i (?:built|led|implemented|designed|tested|migrated|fixed|shipped|automated|reduced|improved)|we (?:built|shipped|launched|reduced|improved))\b/gi
  ) ?? []
  const matchedKeywords = new Set(checks.flatMap((check) => check.matched)).size
  const specificity = clamp01(
    Math.min(1, numberMatches.length / 2) * 0.35 +
      Math.min(1, exampleMatches.length) * 0.4 +
      Math.min(1, matchedKeywords / 12) * 0.25
  )

  const questionKeys = keywordsOf(`${input.question} ${input.dimension.replace(/_/g, ' ')}`)
  const answerLower = answer.toLowerCase()
  const questionHits = questionKeys.filter((key) => matchesVocabulary(answerLower, key)).length
  const questionOverlap = questionKeys.length > 0 ? questionHits / questionKeys.length : 0.5
  const guidanceRatio = checks.length > 0
    ? checks.reduce((sum, check) => sum + (check.covered ? 1 : check.partial ? 0.5 : 0), 0) / checks.length
    : 0.5
  const relevance = clamp01(0.45 * questionOverlap + 0.55 * guidanceRatio)

  const filler = fillerSignals(answer)
  let clarity = 1
  if (averageSentenceWords > 32) clarity -= 0.3
  if (averageSentenceWords < 6 && words > 20) clarity -= 0.2
  if (filler.count >= 2) clarity -= 0.25
  if (/\b(\w+)\s+\1\b/i.test(answer)) clarity -= 0.1
  if (words < 15) clarity -= 0.3
  clarity = clamp01(clarity)

  const base =
    55 * guidanceRatio +
    15 * depth +
    10 * structure +
    10 * specificity +
    5 * relevance +
    5 * clarity
  let score = clampScore(base - Math.min(15, filler.count * 2))
  if (words === 0) score = 0
  else if (words < 15) score = Math.min(score, 25)
  else if (relevance < 0.08) score = Math.min(score, 30)

  const coveredCount = checks.filter((check) => check.covered).length
  const partialCount = checks.filter((check) => !check.covered && check.partial).length
  const whyThisScore = [
    `Rubric coverage: ${coveredCount}/${checks.length} expected points fully covered${partialCount > 0 ? `, ${partialCount} partially` : ''} (${Math.round(guidanceRatio * 100)}%) → ${Math.round(55 * guidanceRatio)}/55 points.`,
    `Depth: ${words} words against a ${targetWords}-word target for this ${input.stage === 'hr' ? 'screening' : 'technical'} answer → ${Math.round(depth * 15)}/15 points.`,
    `Structure: ${bulletLines.length >= 2 ? 'bullet points detected' : paragraphs.length >= 2 ? 'multiple paragraphs detected' : sentenceParts.length >= 4 ? 'one developed paragraph' : 'single unstructured block'}${transitions.length > 0 ? ', with signposting language' : ''} → ${Math.round(structure * 10)}/10 points.`,
    `Specificity: ${exampleMatches.length} concrete example${exampleMatches.length === 1 ? '' : 's'} and ${numberMatches.length} metric${numberMatches.length === 1 ? '' : 's'} → ${Math.round(specificity * 10)}/10 points.`,
    `Relevance and clarity: ${Math.round(relevance * 100)}% aligned with the question${filler.count > 0 ? `, with ${filler.count} hedging/filler phrase${filler.count === 1 ? '' : 's'}` : ', no filler detected'} → ${Math.round((5 * relevance + 5 * clarity))}/10 points.`
  ]
  if (filler.count > 0) {
    whyThisScore.push(`Penalty: −${Math.min(15, filler.count * 2)} points for filler or hedging language.`)
  }

  const mistakes: string[] = []
  for (const check of checks.filter((item) => !item.covered)) {
    const topic = shortTopic(check.point)
    const missing = check.missing.slice(0, 3).join(', ')
    if (check.partial) {
      mistakes.push(
        `Partially covered: “${topic}”. The answer is missing evidence for ${missing || 'the expected outcome'}.`
      )
    } else {
      mistakes.push(
        `Missing key point: “${topic}”. The answer never addresses ${missing || 'this expectation'}.`
      )
    }
  }
  if (words < targetWords * 0.5) {
    mistakes.push(
      `Too brief: ${words} words against a ${targetWords}-word target for this ${input.stage === 'hr' ? 'screening' : 'technical'} interview.`
    )
  }
  if (exampleMatches.length === 0 && words >= 15) {
    mistakes.push('No concrete example or scenario is provided to prove the claim.')
  }
  if (structure < 0.35 && words >= 25) {
    mistakes.push('Unstructured response: there is no clear context → action → result flow.')
  }
  if (filler.count > 0) {
    mistakes.push(`Hedging/filler language weakens authority: ${filler.phrases.slice(0, 4).join(', ')}.`)
  }
  if (relevance < 0.08 && words > 0) {
    mistakes.push('The answer does not directly address the question or its key terms.')
  }
  if (mistakes.length === 0) {
    mistakes.push(
      score >= 85
        ? 'No critical gaps detected. The answer is interview-ready; keep the same structure and evidence in the next round.'
        : 'No critical gaps detected. To reach the top band, add a quantified outcome and a second concrete example.'
    )
  }

  const feedback: string[] = []
  for (const check of checks.filter((item) => !item.covered)) {
    const topic = shortTopic(check.point)
    feedback.push(
      `Add a sentence covering “${topic}” — state what you did, why you chose it, and what changed as a result.`
    )
  }
  if (words < targetWords) {
    feedback.push(`Expand the answer to at least ${targetWords} words by adding one example and one trade-off.`)
  }
  if (exampleMatches.length === 0) {
    feedback.push('Replace the general claim with one specific example: situation, action, measurable result.')
  }
  if (structure < 0.35) {
    feedback.push('Rewrite it as three short paragraphs: context, action, result — or use two or three bullets.')
  }
  if (filler.count > 0) {
    feedback.push(`Remove hedging phrases (${filler.phrases.slice(0, 3).join(', ')}) and open with a direct claim.`)
  }
  if (numberMatches.length === 0) {
    feedback.push('Quantify the impact: time saved, percentage improvement, users affected, or cost avoided.')
  }
  if (feedback.length === 0) {
    feedback.push('Polish the answer by linking your result to the company’s priorities and naming one follow-up question you would ask.')
  }

  const strengths: string[] = []
  for (const check of checks.filter((item) => item.covered)) {
    strengths.push(`Covered the expected point: ${shortTopic(check.point)}.`)
  }
  if (structure >= 0.6) strengths.push('Clear structure makes the answer easy for an interviewer to follow.')
  if (numberMatches.length > 0) strengths.push('Concrete metrics make the claims credible.')
  if (exampleMatches.length > 0) strengths.push('A real example gives the interviewer evidence to evaluate.')
  if (depth >= 0.9) strengths.push('The answer has enough depth for the interviewer to assess your reasoning.')
  if (strengths.length === 0) {
    strengths.push('You engaged with the question directly; the next step is to add evidence and structure.')
  }

  const studyTopics = buildStudyTopics({
    checks,
    stage: input.stage,
    dimension: input.dimension,
    careerName: input.careerName,
    score,
    hasExample: exampleMatches.length > 0,
    hasMetrics: numberMatches.length > 0,
    fillerCount: filler.count
  })

  return {
    questionPublicId: input.questionPublicId,
    question: input.question,
    dimension: input.dimension,
    score,
    passed: score >= INTERVIEW_PASS_SCORE,
    verdict: deterministicVerdict(score, input.stage),
    whyThisScore,
    strengths: unique(strengths, 4),
    mistakes: unique(mistakes, 6),
    feedback: unique(feedback, 6),
    studyTopics,
    gradedBy: 'deterministic',
    model: null
  }
}

function buildAiPrompt(input: InterviewAnswerInput): { system: string; user: string } {
  const guidance = input.guidance.filter((point) => point.trim().length > 0)
  const system = [
    'You are a senior interviewer and career coach for Career Lab.',
    'Evaluate exactly one interview answer. Be exacting, specific and constructive.',
    'Never invent experience the candidate did not mention. Return ONLY valid JSON.'
  ].join(' ')

  const user = [
    `Career: ${input.careerName}`,
    `Interview stage: ${input.stage === 'hr' ? 'Virtual / HR screening' : 'Technical interview'}`,
    `Question dimension: ${input.dimension}`,
    '',
    'Interview question:',
    input.question,
    '',
    'Private rubric points (expected evidence; never quote them verbatim as candidate experience):',
    ...(guidance.length > 0
      ? guidance.map((point, index) => `${index + 1}. ${point}`)
      : ['1. Answer the question directly with concrete, relevant evidence.']),
    '',
    'Candidate answer:',
    '"""',
    truncate(input.answer, 8000),
    '"""',
    '',
    'Return this exact JSON shape:',
    '{',
    '  "score": <integer 0-100>,',
    '  "verdict": "<one sentence overall judgement>",',
    '  "whyThisScore": ["<score component and the evidence that produced it>", ...],',
    '  "strengths": ["<specific strength grounded in the answer>", ...],',
    '  "mistakes": ["<exact missing element, weak reasoning or incorrect claim>", ...],',
    '  "feedback": ["<specific rewrite instruction the candidate can apply immediately>", ...],',
    '  "studyTopics": [{"topic": "<short topic>", "why": "<why it matters>", "action": "<what to study and practise>"}]',
    '}',
    '',
    'Rules:',
    `- Score against the rubric points and a pass mark of ${INTERVIEW_PASS_SCORE}/100.`,
    '- Deduct for missing rubric points, vagueness, no example, incorrect reasoning, and filler.',
    '- Do not reward length alone; a concise answer that covers the rubric should score well.',
    '- Each mistake must name the exact gap. Never use generic advice such as "be more specific".',
    '- Each feedback item must say what to add or change, ideally with an example phrase.',
    '- Provide at least 2 studyTopics, ordered by impact on the score.',
    '- If the answer is empty, off-topic or only restates the question, score 20 or below.'
  ].join('\n')

  return { system, user }
}

function asStringList(value: unknown, max: number): string[] {
  if (!Array.isArray(value)) return []
  return unique(
    value.filter((item): item is string => typeof item === 'string').map((item) => truncate(item, 400)),
    max
  )
}

function parseStudyTopics(value: unknown): InterviewStudyTopic[] {
  if (!Array.isArray(value)) return []
  const topics: InterviewStudyTopic[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') continue
    const row = item as Record<string, unknown>
    const topic = typeof row.topic === 'string' ? row.topic.trim() : ''
    if (!topic) continue
    topics.push({
      topic: truncate(topic, 120),
      why: typeof row.why === 'string' && row.why.trim()
        ? truncate(row.why.trim(), 300)
        : 'This topic is needed to close a rubric gap.',
      action: typeof row.action === 'string' && row.action.trim()
        ? truncate(row.action.trim(), 300)
        : `Review ${topic} and practise a concise answer that demonstrates it.`
    })
  }
  return topics.slice(0, 6)
}

function mergeAiReview(
  parsed: Record<string, unknown>,
  fallback: InterviewAnswerReview
): InterviewAnswerReview {
  const parsedScore = Number(parsed.score)
  const score = Number.isFinite(parsedScore) ? clampScore(parsedScore) : fallback.score
  const aiWhy = asStringList(parsed.whyThisScore, 6)
  const aiStrengths = asStringList(parsed.strengths, 6)
  const aiMistakes = asStringList(parsed.mistakes, 8)
  const aiFeedback = asStringList(parsed.feedback, 8)
  const aiTopics = parseStudyTopics(parsed.studyTopics)

  const studyTopics = [...aiTopics]
  for (const topic of fallback.studyTopics) {
    if (studyTopics.length >= 3) break
    if (!studyTopics.some((item) => item.topic.toLowerCase() === topic.topic.toLowerCase())) {
      studyTopics.push(topic)
    }
  }

  const feedback = [...aiFeedback]
  for (const item of fallback.feedback) {
    if (feedback.length >= 2) break
    if (!feedback.includes(item)) feedback.push(item)
  }

  const verdict = typeof parsed.verdict === 'string' && parsed.verdict.trim()
    ? truncate(parsed.verdict.trim(), 300)
    : fallback.verdict

  return {
    ...fallback,
    score,
    passed: score >= INTERVIEW_PASS_SCORE,
    verdict,
    whyThisScore: aiWhy.length > 0 ? aiWhy : fallback.whyThisScore,
    strengths: aiStrengths.length > 0 ? aiStrengths : fallback.strengths,
    // Always keep at least one concrete gap, even when the model is overly positive.
    mistakes: aiMistakes.length > 0 ? aiMistakes : fallback.mistakes,
    feedback,
    studyTopics: studyTopics.length > 0 ? studyTopics : fallback.studyTopics,
    gradedBy: 'ai',
    model: aiProviderModel()
  }
}

/** Review one answer with AI when configured, always falling back safely. */
export async function evaluateInterviewAnswer(
  input: InterviewAnswerInput
): Promise<InterviewAnswerReview> {
  const fallback = deterministicInterviewAnswerReview(input)
  if (!aiProviderConfigured()) return fallback

  const prompt = buildAiPrompt(input)
  const parsed = await requestJsonCompletion({
    system: prompt.system,
    user: prompt.user,
    temperature: 0.15,
    maxAttempts: 2
  })
  if (!parsed) return fallback

  try {
    return mergeAiReview(parsed, fallback)
  } catch (error) {
    logger.warn(
      { error: error instanceof Error ? error.message : String(error) },
      'Unable to merge AI interview review; using deterministic fallback'
    )
    return fallback
  }
}

/**
 * Review every answer with bounded concurrency. Each task already has its own
 * deterministic fallback, so one provider failure never discards the others.
 */
export async function evaluateInterviewAnswers(
  inputs: InterviewAnswerInput[],
  concurrency = 3
): Promise<InterviewAnswerReview[]> {
  if (inputs.length === 0) return []

  const results = new Array<InterviewAnswerReview>(inputs.length)
  let cursor = 0
  const workerCount = Math.min(Math.max(1, concurrency), inputs.length)

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (true) {
        const index = cursor
        cursor += 1
        if (index >= inputs.length) return
        const input = inputs[index]
        if (!input) return
        try {
          results[index] = await evaluateInterviewAnswer(input)
        } catch (error) {
          logger.warn(
            { error: error instanceof Error ? error.message : String(error), dimension: input.dimension },
            'Interview answer review failed; using deterministic fallback'
          )
          results[index] = deterministicInterviewAnswerReview(input)
        }
      }
    })
  )

  return results
}
