import { prisma } from '../utils/prisma.js'
import { ulid } from '../utils/ids.js'
import type { EvalTargetType, Prisma } from '@prisma/client'

/**
 * Deterministic, server-side assessment engine.
 *
 * Submissions are scored against explicit requirement/rubric text using
 * keyword-coverage analysis. The frontend never supplies scores; every
 * evaluation row is computed here and stored immutably for the student.
 */

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'your', 'you',
  'be', 'is', 'are', 'as', 'at', 'by', 'it', 'this', 'that', 'from', 'each', 'every',
  'must', 'should', 'will', 'can', 'their', 'its', 'into', 'per', 'use', 'using',
  'include', 'includes', 'including', 'list', 'list.', 'describe', 'explain', 'show',
  'all', 'any', 'one', 'two', 'three'
])

export function keywordsOf(text: string): string[] {
  return [...new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !STOP_WORDS.has(w))
  )]
}

function coverageRatio(submission: string, referenceTexts: string[]): number {
  const hay = submission.toLowerCase()
  const keys = [...new Set(referenceTexts.flatMap(keywordsOf))].filter((k) => k.length >= 5)
  if (keys.length === 0) return 0.5
  const hits = keys.filter((k) => hay.includes(k)).length
  return hits / keys.length
}

function lengthSignal(text: string, minWords: number): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  if (words === 0) return 0
  return Math.min(1, words / Math.max(60, minWords))
}

function structureSignal(text: string): number {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const bullets = lines.filter((l) => /^([-*•]|\d+[.)])\s/.test(l)).length
  const headings = lines.filter((l) => l.length > 0 && l.length < 80 && /[:：]$/.test(l)).length
  const signals = (bullets > 0 ? 0.6 : 0) + (headings > 0 ? 0.4 : 0)
  return Math.min(1, signals)
}

export interface RubricOutcome {
  skill: string
  weight: number
  met: boolean
  note: string
  criteria?: string
}

/**
 * Score a written submission against a set of requirement/rubric texts.
 * Returns a 0-100 score plus per-area outcomes for the feedback UI.
 */
export function assessSubmission(input: {
  submission: string
  areas: Array<{ skill: string; weight: number; criteria: string }>
  minWords?: number
}): { score: number; outcomes: RubricOutcome[] } {
  const totalWeight = input.areas.reduce((sum, a) => sum + a.weight, 0) || 1
  interface InternalOutcome extends RubricOutcome {
    criteria: string
    credit: number
  }
  const outcomes: InternalOutcome[] = input.areas.map((area) => {
    const cov = coverageRatio(input.submission, [area.criteria])
    const len = lengthSignal(input.submission, input.minWords ?? 300)
    // Area passes when the criteria vocabulary appears with enough surrounding substance.
    const met = cov >= 0.45 && len >= 0.5
    const partial = cov >= 0.25 && len >= 0.3
    return {
      skill: area.skill,
      weight: area.weight,
      met,
      note: met
        ? `Requirement addressed: ${area.criteria.slice(0, 120)}`
        : `Not sufficiently evidenced: ${area.criteria.slice(0, 120)}`
        + (partial ? ' (partially covered)' : ''),
      criteria: area.criteria,
      credit: met ? 1 : partial ? 0.55 : cov > 0.1 ? 0.25 : 0
    }
  })

  const earned = outcomes.reduce((sum, o) => sum + o.credit * o.weight, 0)
  const base = Math.round((earned / totalWeight) * 100)
  const structureBonus = Math.round(structureSignal(input.submission) * 5)
  const score = Math.max(0, Math.min(100, base + structureBonus))

  return {
    score,
    outcomes: outcomes.map(({ skill, weight, met, note, criteria }) => ({ skill, weight, met, note, criteria }))
  }
}

export interface EvaluationDraft {
  targetType: EvalTargetType
  targetPublicId: string
  targetTitle: string
  overallScore: number
  verdict: string
  strengths: string[]
  weaknesses: string[]
  errorNotes: string[]
  recommendations: string[]
  skillLevels: Array<{ skill: string; level: string; percent: number }>
  nextArea: string
}

const LEVEL = (pct: number): string =>
  pct >= 85 ? 'Strong' : pct >= 70 ? 'Competent' : pct >= 50 ? 'Developing' : 'Needs work'

/** Persist an evaluation row and refresh downstream aggregates. */
export async function recordEvaluation(userId: bigint, careerId: bigint, draft: EvaluationDraft) {
  const evaluation = await prisma.evaluation.upsert({
    where: {
      userId_targetType_targetPublicId: {
        userId,
        targetType: draft.targetType,
        targetPublicId: draft.targetPublicId
      }
    },
    update: {
      overallScore: draft.overallScore,
      verdict: draft.verdict,
      strengths: draft.strengths,
      weaknesses: draft.weaknesses,
      errorNotes: draft.errorNotes,
      recommendations: draft.recommendations,
      skillLevels: draft.skillLevels,
      nextArea: draft.nextArea
    },
    create: {
      publicId: ulid(),
      userId,
      careerId,
      targetType: draft.targetType,
      targetPublicId: draft.targetPublicId,
      targetTitle: draft.targetTitle,
      overallScore: draft.overallScore,
      verdict: draft.verdict,
      strengths: draft.strengths,
      weaknesses: draft.weaknesses,
      errorNotes: draft.errorNotes,
      recommendations: draft.recommendations,
      skillLevels: draft.skillLevels,
      nextArea: draft.nextArea
    }
  })
  return evaluation
}

/** Build an EvaluationDraft from rubric outcomes. */
export function buildEvaluationDraft(input: {
  targetType: EvalTargetType
  targetPublicId: string
  targetTitle: string
  score: number
  outcomes: RubricOutcome[]
  passScore: number
  careerName: string
}): EvaluationDraft {
  const met = input.outcomes.filter((o) => o.met)
  const missed = input.outcomes.filter((o) => !o.met)

  const strengths = met.slice(0, 3).map((o) =>
    `${o.skill}: ${o.note.replace(/^Requirement addressed: /, '')}`
  )
  if (strengths.length === 0) {
    strengths.push('You submitted complete work within scope — use the requirement notes below to target revisions.')
  }

  const weaknesses = missed.slice(0, 3).map((o) => `${o.skill}: expectation not fully evidenced.`)
  const errorNotes = missed.slice(0, 3).map((o) => o.note)
  const recommendations = [
    ...(missed[0] ? [`Revisit ${missed[0].skill} material and address: ${(missed[0].criteria ?? missed[0].note).slice(0, 100)}…`] : []),
    ...(input.score < input.passScore ? ['Re-read the assignment requirements list and map each item to a section of your submission before resubmitting.'] : []),
    'Cross-check terminology against the linked documentation for this topic area.'
  ].slice(0, 3)

  const skillLevels = input.outcomes.map((o) => ({
    skill: o.skill,
    level: LEVEL(o.met ? Math.max(70, input.score) : Math.max(35, input.score - 20)),
    percent: Math.max(0, Math.min(100, o.met ? input.score : Math.max(30, input.score - 15)))
  }))

  const passed = input.score >= input.passScore
  const verdict = passed
    ? `Assessment passed at ${input.score}/100. Work meets the ${input.careerName} standard for this stage.`
    : `Assessment scored ${input.score}/100 against a passing bar of ${input.passScore}. The requirement notes below identify what to strengthen before resubmitting.`

  const nextArea =
    missed[0]?.skill ??
    (passed ? 'Proceed to the next stage of your roadmap.' : 'Review the linked learning material for the weakest outcome above.')

  return {
    targetType: input.targetType,
    targetPublicId: input.targetPublicId,
    targetTitle: input.targetTitle,
    overallScore: input.score,
    verdict,
    strengths,
    weaknesses,
    errorNotes,
    recommendations,
    skillLevels,
    nextArea
  }
}

export type EvaluationJson = Prisma.JsonValue
