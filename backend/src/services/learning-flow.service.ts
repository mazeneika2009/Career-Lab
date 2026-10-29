import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { ulid } from '../utils/ids.js'
import { logger } from '../utils/logger.js'
import { requireActiveCareer } from './domain.helpers.js'
import { supabaseAdmin, supabaseConfigured, supabaseSchema } from '../utils/supabase.js'
import type { Assignment, Chapter, Exam, Prisma } from '@prisma/client'
import { pickChapterForAssignment } from '../content/assignment-routing.js'

export type LearningStepKey = 'content' | 'theory' | 'practical' | 'assignment'
export type LessonCurrentStep = LearningStepKey | 'complete'

/** Passing bar shared by assignment evaluation and the course-flow lock state. */
export const ASSIGNMENT_PASS_SCORE = 70

export interface LearningFlowStep {
  key: LearningStepKey
  label: string
  unlocked: boolean
  completed: boolean
  status: 'locked' | 'in_progress' | 'completed'
  score: number | null
  completedAt: string | null
  lockReason: string | null
}

export interface LearningFlowTopic {
  publicId: string
  title: string
  minutes: number
  status: 'not_started' | 'in_progress' | 'completed'
  locked: boolean
}

export interface LearningFlowExam {
  step: LearningFlowStep
  examPublicId: string
  title: string
  passScore: number
  bestScore: number | null
  passed: boolean
  attemptCount: number
}

export interface LearningFlowAssignment {
  step: LearningFlowStep
  assignmentPublicId: string
  title: string
  objective: string
  passScore: number
  bestScore: number | null
  passed: boolean
  submissionCount: number
  latestSubmittedAt: string | null
}

export interface LearningFlowLesson {
  chapterPublicId: string
  number: number
  title: string
  description: string
  stage: string
  topics: LearningFlowTopic[]
  content: LearningFlowStep
  theory: LearningFlowExam
  practical: LearningFlowExam
  assignment: LearningFlowAssignment
  unlocked: boolean
  completed: boolean
  status: 'locked' | 'in_progress' | 'completed'
  currentStep: LessonCurrentStep
}

export interface LearningFlow {
  career: { name: string; slug: string; pathSummary: string }
  lessons: LearningFlowLesson[]
  progress: { completed: number; total: number; percent: number }
  currentLesson: { chapterPublicId: string; number: number; title: string; currentStep: LessonCurrentStep } | null
}

interface PersistedStep {
  chapterPublicId: string
  step: LearningStepKey
  status: 'in_progress' | 'completed'
  score: number | null
  completedAt: string | null
}

export interface PracticalExamSpec {
  brief: string
  requirements: string[]
  expectedOutput: string
  rubric: Array<{ skill: string; weight: number; criteria: string }>
  language: string
  languageLabel: string
  starterCode: string
  lessonTitle: string
  objectives: string[]
}

interface ChapterWithTopics extends Chapter {
  topics: Array<{
    id: bigint
    publicId: string
    title: string
    minutes: number
    objectives: unknown
    quiz: unknown
    order: number
    progress: Array<{ status: 'not_started' | 'in_progress' | 'completed' }>
  }>
}

interface ChapterWithObjectives extends Chapter {
  topics: Array<{
    id: bigint
    title: string
    objectives: unknown
    order: number
  }>
}

interface AssignmentWithState {
  assignment: Assignment
  submissions: Array<{ submittedAt: Date }>
  evaluationScore: number | null
  completed: boolean
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}

function stepKey(chapterPublicId: string, step: LearningStepKey): string {
  return `${chapterPublicId}:${step}`
}

function bestScore(exam: Exam & { attempts: Array<{ score: number | null }> }): number | null {
  const scores = exam.attempts
    .map((attempt) => attempt.score)
    .filter((score): score is number => typeof score === 'number')
  return scores.length === 0 ? null : Math.max(...scores)
}

function passed(exam: { attempts: Array<{ passed: boolean | null }> }): boolean {
  return exam.attempts.some((attempt) => attempt.passed === true)
}

function languageForCareer(careerSlug: string): { language: string; languageLabel: string } {
  const slug = careerSlug.toLowerCase()
  if (/(data|ai-|machine|deep-|nlp|vision|scientist|analyst)/.test(slug)) {
    return { language: 'python', languageLabel: 'Python' }
  }
  if (slug.includes('database') || slug.includes('bi-developer')) {
    return { language: 'sql', languageLabel: 'SQL' }
  }
  if (slug.includes('android')) return { language: 'kotlin', languageLabel: 'Kotlin' }
  if (slug.includes('ios')) return { language: 'swift', languageLabel: 'Swift' }
  if (slug.includes('flutter')) return { language: 'dart', languageLabel: 'Dart' }
  if (/(designer|marketing|writer|artist|editor|game-designer)/.test(slug)) {
    return { language: 'html', languageLabel: 'HTML / CSS' }
  }
  if (/(backend|full-stack|node|cloud|devops|security|network|system|qa|automation)/.test(slug)) {
    return { language: 'typescript', languageLabel: 'TypeScript' }
  }
  return { language: 'javascript', languageLabel: 'JavaScript' }
}

function starterCodeFor(language: string, lessonTitle: string, requirements: string[]): string {
  const lines = requirements.slice(0, 6)
  switch (language) {
    case 'python':
      return [
        `# Practical exam: ${lessonTitle}`,
        '# Implement each requirement and add a short usage example at the bottom.',
        ...lines.map((line) => `# - ${line}`),
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
    case 'sql':
      return [
        `-- Practical exam: ${lessonTitle}`,
        ...lines.map((line) => `-- - ${line}`),
        '',
        'WITH prepared AS (',
        '  SELECT *',
        '  FROM your_table',
        ')',
        'SELECT *',
        'FROM prepared;',
        '-- TODO: replace with the query that satisfies each requirement.'
      ].join('\n')
    case 'html':
      return [
        `<!-- Practical exam: ${lessonTitle} -->`,
        ...lines.map((line) => `<!-- - ${line} -->`),
        '',
        '<main>',
        '  <h1>Your solution</h1>',
        '  <!-- TODO: build the required interface and behaviour -->',
        '</main>'
      ].join('\n')
    case 'kotlin':
      return [
        `// Practical exam: ${lessonTitle}`,
        ...lines.map((line) => `// - ${line}`),
        '',
        'fun solve(input: Any?): Any? {',
        '    // TODO: implement the required behaviour',
        '    return null',
        '}'
      ].join('\n')
    case 'swift':
      return [
        `// Practical exam: ${lessonTitle}`,
        ...lines.map((line) => `// - ${line}`),
        '',
        'func solve(_ input: Any?) -> Any? {',
        '    // TODO: implement the required behaviour',
        '    return nil',
        '}'
      ].join('\n')
    case 'dart':
      return [
        `// Practical exam: ${lessonTitle}`,
        ...lines.map((line) => `// - ${line}`),
        '',
        'Object? solve(Object? input) {',
        '  // TODO: implement the required behaviour',
        '  return null;',
        '}'
      ].join('\n')
    case 'typescript':
      return [
        `// Practical exam: ${lessonTitle}`,
        ...lines.map((line) => `// - ${line}`),
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
        `// Practical exam: ${lessonTitle}`,
        ...lines.map((line) => `// - ${line}`),
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

function fallbackQuiz(chapter: ChapterWithTopics): unknown[] {
  return chapter.topics.map((topic) => {
    const objectives = asStringArray(topic.objectives)
    const correct = objectives[0] ?? `Apply the core ideas from ${topic.title}.`
    return {
      topicSlug: topic.title,
      prompt: `Which outcome belongs to "${topic.title}"?`,
      options: [
        correct,
        'Skip the practical work and move straight to the next lesson.',
        'Memorise terminology without applying it.',
        'Ignore accessibility and error handling.'
      ],
      answerIndex: 0,
      explanation: `"${correct}" is one of the authored objectives for ${topic.title}.`
    }
  })
}

/**
 * Every chapter must have both assessments for the strict Coursera flow.
 * Existing seed content already has a theory exam per chapter. Practical
 * exams are generated from the chapter's own objectives on first access so
 * every lesson has a coding task without re-seeding or losing attempts.
 */
async function ensureChapterAssessments(
  chapter: ChapterWithTopics,
  career: { id: bigint; name: string; slug: string }
): Promise<{ theory: Exam; practical: Exam }> {
  const existing = await prisma.exam.findMany({
    where: { careerId: career.id, chapterId: chapter.id }
  })
  let theory = existing.find((exam) => exam.kind === 'theory')
  let practical = existing.find((exam) => exam.kind === 'practical')

  if (!theory) {
    const quizzes = chapter.topics
      .map((topic) => topic.quiz)
      .filter((quiz): quiz is Record<string, unknown> => typeof quiz === 'object' && quiz !== null)
      .map((quiz) => ({
        topicSlug: typeof quiz.topicSlug === 'string' ? quiz.topicSlug : '',
        prompt: typeof quiz.prompt === 'string' ? quiz.prompt : '',
        options: Array.isArray(quiz.options) ? quiz.options : [],
        answerIndex: typeof quiz.answerIndex === 'number' ? quiz.answerIndex : 0,
        explanation: typeof quiz.explanation === 'string' ? quiz.explanation : ''
      }))
      .filter((quiz) => quiz.prompt && quiz.options.length >= 2)
    const questions = quizzes.length > 0 ? quizzes : fallbackQuiz(chapter)
    theory = await prisma.exam.create({
      data: {
        publicId: ulid(),
        careerId: career.id,
        chapterId: chapter.id,
        kind: 'theory',
        title: `Theory Exam - ${chapter.title}`,
        coverage: chapter.topics.map((topic) => topic.title) as unknown as Prisma.InputJsonValue,
        passScore: 70,
        questions: questions as unknown as Prisma.InputJsonValue
      }
    })
  }

  if (!practical) {
    const template = await prisma.exam.findFirst({
      where: { careerId: career.id, kind: 'practical', chapterId: null }
    })
    const templateSpec = (template?.questions ?? null) as Record<string, unknown> | null
    const objectives = chapter.topics.flatMap((topic) => asStringArray(topic.objectives))
    const requirements =
      objectives.length > 0
        ? [...new Set(objectives)].slice(0, 6)
        : chapter.topics.map((topic) => `Demonstrate the key skill from ${topic.title}.`).slice(0, 6)
    const { language, languageLabel } = languageForCareer(career.slug)
    const expectedOutput =
      typeof templateSpec?.expectedOutput === 'string' && templateSpec.expectedOutput
        ? templateSpec.expectedOutput
        : 'A runnable solution plus a short note explaining how to verify it.'
    const brief =
      `Apply the lesson "${chapter.title}" in a hands-on task. ` +
      `Work in ${languageLabel}; the reviewer checks each requirement against your submitted code. ` +
      (typeof templateSpec?.brief === 'string' && templateSpec.brief
        ? `Career context: ${templateSpec.brief.slice(0, 280)}`
        : 'Keep the solution small enough to finish in one sitting and explicit enough to review.')
    const rubric = requirements.map((requirement, index) => ({
      skill: chapter.topics[index]?.title ?? `Requirement ${index + 1}`,
      weight: Math.max(1, Math.round(100 / requirements.length)),
      criteria: requirement
    }))
    const spec: PracticalExamSpec = {
      brief,
      requirements,
      expectedOutput,
      rubric,
      language,
      languageLabel,
      starterCode: starterCodeFor(language, chapter.title, requirements),
      lessonTitle: chapter.title,
      objectives
    }
    practical = await prisma.exam.create({
      data: {
        publicId: ulid(),
        careerId: career.id,
        chapterId: chapter.id,
        kind: 'practical',
        title: `Practical Exam - ${chapter.title}`,
        coverage: chapter.topics.map((topic) => topic.title) as unknown as Prisma.InputJsonValue,
        passScore: typeof template?.passScore === 'number' ? template.passScore : 70,
        questions: spec as unknown as Prisma.InputJsonValue
      }
    })
  }

  return { theory, practical }
}

function generatedAssignmentFor(chapter: ChapterWithObjectives) {
  const topicObjectives = [...new Set(chapter.topics.flatMap((topic) => asStringArray(topic.objectives)))]
  const requirements = topicObjectives.slice(0, 5)
  const fallbackRequirements = [
    `Produce a concrete, review-ready deliverable that applies the core skills of "${chapter.title}".`,
    'Explain the decisions you made and why they suit the task, audience and constraints.',
    'Show how you verified the result, including any checks, tests or review steps.',
    'Reflect on one difficulty you encountered and how you resolved it.'
  ]
  for (const requirement of fallbackRequirements) {
    if (requirements.length >= 4) break
    requirements.push(requirement)
  }

  const skills = [...new Set(chapter.topics.map((topic) => topic.title))].slice(0, 5)
  return {
    stage: chapter.stage,
    title: `Applied Project — ${chapter.title}`.slice(0, 200),
    objective:
      `Apply the practical skills from "${chapter.title}" to a realistic, self-contained project. ` +
      'Submit a professional write-up with the artifact itself and enough evidence for a reviewer to verify your work.',
    requirements,
    skillsEvaluated: skills.length > 0 ? skills : [chapter.title],
    dueDays: Math.max(7, chapter.order * 7),
    difficulty: chapter.stage,
    submissionSpec: {
      instructions:
        'Describe what you built, the decisions behind it, and how you verified it. ' +
        'Address every requirement in order and include links to the artifact or supporting evidence.',
      textLabel: 'project write-up',
      minTextLength: 500,
      linkLabels: ['Project / repository URL', 'Evidence or demo URL']
    }
  }
}

/**
 * Every lesson must have exactly one assignment so the strict four-stage flow
 * is complete. Authored assignments are attached to matching-stage chapters;
 * remaining chapters receive a generated lesson project. Safe to re-run.
 */
export async function ensureCareerAssignments(careerId: bigint): Promise<void> {
  const chapters = (await prisma.chapter.findMany({
    where: { book: { careerId } },
    orderBy: { order: 'asc' },
    include: { topics: { orderBy: { order: 'asc' } } }
  })) as ChapterWithObjectives[]
  if (chapters.length === 0) return

  const assignments = await prisma.assignment.findMany({
    where: { careerId },
    orderBy: { order: 'asc' }
  })
  const chapterIds = new Set(chapters.map((chapter) => chapter.id))
  const claimedChapterIds = new Set<bigint>()
  for (const assignment of assignments) {
    if (assignment.chapterId && chapterIds.has(assignment.chapterId)) {
      claimedChapterIds.add(assignment.chapterId)
    }
  }

  for (const assignment of assignments) {
    if (assignment.chapterId && chapterIds.has(assignment.chapterId)) continue
    const chapter = pickChapterForAssignment(
      { stage: assignment.stage, order: assignment.order },
      chapters,
      claimedChapterIds
    )
    if (!chapter) break
    await prisma.assignment.update({
      where: { id: assignment.id },
      data: { chapterId: chapter.id }
    })
    claimedChapterIds.add(chapter.id)
  }

  for (const chapter of chapters) {
    if (claimedChapterIds.has(chapter.id)) continue
    const generated = generatedAssignmentFor(chapter)
    await prisma.assignment.create({
      data: {
        publicId: ulid(),
        careerId,
        chapterId: chapter.id,
        order: chapter.order,
        stage: generated.stage,
        title: generated.title,
        objective: generated.objective,
        requirements: generated.requirements as unknown as Prisma.InputJsonValue,
        skillsEvaluated: generated.skillsEvaluated as unknown as Prisma.InputJsonValue,
        dueDays: generated.dueDays,
        difficulty: generated.difficulty,
        submissionSpec: generated.submissionSpec as unknown as Prisma.InputJsonValue
      }
    })
    claimedChapterIds.add(chapter.id)
  }
}

function mergePersisted(
  existing: Map<string, PersistedStep>,
  derived: PersistedStep[]
): PersistedStep[] {
  const merged = new Map(existing)
  for (const row of derived) {
    if (row.status !== 'completed') {
      if (!merged.has(stepKey(row.chapterPublicId, row.step))) {
        merged.set(stepKey(row.chapterPublicId, row.step), row)
      }
      continue
    }
    const current = merged.get(stepKey(row.chapterPublicId, row.step))
    if (!current || current.status !== 'completed') {
      merged.set(stepKey(row.chapterPublicId, row.step), row)
    }
  }
  return [...merged.values()]
}

async function loadPersistedSteps(
  userPublicId: string,
  careerSlug: string
): Promise<Map<string, PersistedStep>> {
  if (!supabaseConfigured()) return new Map()
  const { data, error } = await supabaseAdmin()
    .schema(supabaseSchema())
    .from('learning_step_progress')
    .select('chapter_public_id,step,status,score,completed_at')
    .eq('user_public_id', userPublicId)
    .eq('career_slug', careerSlug)
  if (error) {
    logger.error({ error: error.message }, 'Unable to read learning step progress')
    throw new AppError(
      503,
      'PROGRESS_UNAVAILABLE',
      'Learning progress is temporarily unavailable. Please try again.'
    )
  }
  const rows = (data ?? []) as Array<{
    chapter_public_id: string
    step: LearningStepKey
    status: 'in_progress' | 'completed'
    score: number | null
    completed_at: string | null
  }>
  return new Map(
    rows.map((row) => [
      stepKey(row.chapter_public_id, row.step),
      {
        chapterPublicId: row.chapter_public_id,
        step: row.step,
        status: row.status,
        score: row.score,
        completedAt: row.completed_at
      }
    ])
  )
}

async function persistStepRows(
  userPublicId: string,
  careerSlug: string,
  rows: PersistedStep[]
): Promise<Map<string, PersistedStep>> {
  if (!supabaseConfigured()) {
    return new Map(rows.map((row) => [stepKey(row.chapterPublicId, row.step), row]))
  }
  if (rows.length > 0) {
    const payload = rows.map((row) => ({
      user_public_id: userPublicId,
      career_slug: careerSlug,
      chapter_public_id: row.chapterPublicId,
      step: row.step,
      status: row.status,
      score: row.score,
      completed_at: row.completedAt,
      updated_at: new Date().toISOString()
    }))
    const { error } = await supabaseAdmin()
      .schema(supabaseSchema())
      .from('learning_step_progress')
      .upsert(payload, {
        onConflict: 'user_public_id,career_slug,chapter_public_id,step'
      })
    if (error) {
      logger.error({ error: error.message }, 'Unable to persist learning step progress')
      throw new AppError(
        503,
        'PROGRESS_UNAVAILABLE',
        'Your progress could not be saved. Please try again.'
      )
    }
  }
  return loadPersistedSteps(userPublicId, careerSlug)
}

async function activeCareerChapters(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const chapters = (await prisma.chapter.findMany({
    where: { book: { careerId: active.career.id } },
    orderBy: { order: 'asc' },
    include: {
      topics: {
        orderBy: { order: 'asc' },
        include: { progress: { where: { userId } } }
      }
    }
  })) as ChapterWithTopics[]
  return { active, chapters }
}

function buildLesson(
  chapter: ChapterWithTopics,
  index: number,
  theory: Exam & { attempts: Array<{ score: number | null; passed: boolean | null }> },
  practical: Exam & { attempts: Array<{ score: number | null; passed: boolean | null }> },
  assignment: AssignmentWithState,
  persisted: Map<string, PersistedStep>,
  previousLessonComplete: boolean
): LearningFlowLesson {
  const contentPersisted = persisted.get(stepKey(chapter.publicId, 'content'))
  const theoryPersisted = persisted.get(stepKey(chapter.publicId, 'theory'))
  const practicalPersisted = persisted.get(stepKey(chapter.publicId, 'practical'))
  const assignmentPersisted = persisted.get(stepKey(chapter.publicId, 'assignment'))

  const contentCompleted =
    contentPersisted?.status === 'completed' ||
    (chapter.topics.length > 0 &&
      chapter.topics.every((topic) => topic.progress[0]?.status === 'completed'))
  const theoryCompleted = theoryPersisted?.status === 'completed' || passed(theory)
  const practicalCompleted = practicalPersisted?.status === 'completed' || passed(practical)
  const assignmentCompleted =
    assignmentPersisted?.status === 'completed' || assignment.completed

  const contentUnlocked = previousLessonComplete
  const theoryUnlocked = contentUnlocked && contentCompleted
  const practicalUnlocked = theoryUnlocked && theoryCompleted
  const assignmentUnlocked = practicalUnlocked && practicalCompleted

  const content: LearningFlowStep = {
    key: 'content',
    label: 'Lesson content',
    unlocked: contentUnlocked,
    completed: contentCompleted,
    status: contentCompleted ? 'completed' : contentUnlocked ? 'in_progress' : 'locked',
    score: null,
    completedAt: contentPersisted?.completedAt ?? null,
    lockReason: contentUnlocked
      ? null
      : `Complete the practical exam and assignment in Lesson ${String(Math.max(1, index - 1)).padStart(2, '0')} to unlock this lesson.`
  }

  const theoryStep: LearningFlowStep = {
    key: 'theory',
    label: 'Theory exam',
    unlocked: theoryUnlocked,
    completed: theoryCompleted,
    status: theoryCompleted ? 'completed' : theoryUnlocked ? 'in_progress' : 'locked',
    score: bestScore(theory),
    completedAt: theoryPersisted?.completedAt ?? null,
    lockReason: theoryUnlocked
      ? null
      : contentCompleted
        ? 'Complete the lesson content first.'
        : 'Read every topic in this lesson to unlock the theory exam.'
  }

  const practicalStep: LearningFlowStep = {
    key: 'practical',
    label: 'Practical exam',
    unlocked: practicalUnlocked,
    completed: practicalCompleted,
    status: practicalCompleted ? 'completed' : practicalUnlocked ? 'in_progress' : 'locked',
    score: bestScore(practical),
    completedAt: practicalPersisted?.completedAt ?? null,
    lockReason: practicalUnlocked
      ? null
      : theoryCompleted
        ? 'Pass the theory exam first.'
        : 'Pass the theory exam to unlock the coding exam.'
  }

  const assignmentStep: LearningFlowStep = {
    key: 'assignment',
    label: 'Assignment',
    unlocked: assignmentUnlocked,
    completed: assignmentCompleted,
    status: assignmentCompleted ? 'completed' : assignmentUnlocked ? 'in_progress' : 'locked',
    score: assignment.evaluationScore,
    completedAt: assignmentPersisted?.completedAt ?? null,
    lockReason: assignmentUnlocked
      ? null
      : !contentUnlocked
        ? content.lockReason
        : !theoryCompleted
          ? 'Pass the theory exam and practical exam to unlock this assignment.'
          : 'Pass the practical exam to unlock this assignment.'
  }

  const currentStep: LessonCurrentStep = !contentCompleted
    ? 'content'
    : !theoryCompleted
      ? 'theory'
      : !practicalCompleted
        ? 'practical'
        : !assignmentCompleted
          ? 'assignment'
          : 'complete'

  const lessonCompleted =
    contentCompleted && theoryCompleted && practicalCompleted && assignmentCompleted

  return {
    chapterPublicId: chapter.publicId,
    number: index,
    title: chapter.title,
    description: chapter.description,
    stage: chapter.stage,
    topics: chapter.topics.map((topic) => ({
      publicId: topic.publicId,
      title: topic.title,
      minutes: topic.minutes,
      status: topic.progress[0]?.status ?? 'not_started',
      locked: !contentUnlocked
    })),
    content,
    theory: {
      step: theoryStep,
      examPublicId: theory.publicId,
      title: theory.title,
      passScore: theory.passScore,
      bestScore: bestScore(theory),
      passed: theoryCompleted,
      attemptCount: theory.attempts.length
    },
    practical: {
      step: practicalStep,
      examPublicId: practical.publicId,
      title: practical.title,
      passScore: practical.passScore,
      bestScore: bestScore(practical),
      passed: practicalCompleted,
      attemptCount: practical.attempts.length
    },
    assignment: {
      step: assignmentStep,
      assignmentPublicId: assignment.assignment.publicId,
      title: assignment.assignment.title,
      objective: assignment.assignment.objective,
      passScore: ASSIGNMENT_PASS_SCORE,
      bestScore: assignment.evaluationScore,
      passed: assignmentCompleted,
      submissionCount: assignment.submissions.length,
      latestSubmittedAt: assignment.submissions[0]?.submittedAt.toISOString() ?? null
    },
    unlocked: contentUnlocked,
    completed: lessonCompleted,
    status: lessonCompleted ? 'completed' : contentUnlocked ? 'in_progress' : 'locked',
    currentStep
  }
}

/**
 * Load the ordered course, ensuring every chapter has theory + practical
 * assessments and an assignment, backfilling MySQL completions into Supabase,
 * and computing step locks from the Supabase-backed completion state. */
export async function getLearningFlow(userId: bigint, userPublicId: string): Promise<LearningFlow> {
  const { active, chapters } = await activeCareerChapters(userId)
  if (chapters.length === 0) {
    return {
      career: {
        name: active.career.name,
        slug: active.career.slug,
        pathSummary: active.career.pathSummary
      },
      lessons: [],
      progress: { completed: 0, total: 0, percent: 0 },
      currentLesson: null
    }
  }

  await ensureCareerAssignments(active.career.id)

  const assessments: Array<{ theory: Exam; practical: Exam }> = []
  for (const chapter of chapters) {
    assessments.push(await ensureChapterAssessments(chapter, active.career))
  }

  const examIds = assessments.flatMap((pair) => [pair.theory.id, pair.practical.id])
  const attempts = await prisma.examAttempt.findMany({
    where: { userId, examId: { in: examIds }, submittedAt: { not: null } },
    orderBy: { submittedAt: 'desc' }
  })
  const attemptsByExam = new Map<bigint, typeof attempts>()
  for (const attempt of attempts) {
    const list = attemptsByExam.get(attempt.examId) ?? []
    list.push(attempt)
    attemptsByExam.set(attempt.examId, list)
  }

  const assignments = await prisma.assignment.findMany({
    where: { careerId: active.career.id, chapterId: { in: chapters.map((chapter) => chapter.id) } },
    orderBy: { order: 'asc' },
    include: {
      submissions: {
        where: { userId },
        orderBy: { submittedAt: 'desc' },
        select: { submittedAt: true }
      }
    }
  })
  const assignmentEvaluations = await prisma.evaluation.findMany({
    where: {
      userId,
      careerId: active.career.id,
      targetType: 'assignment',
      targetPublicId: { in: assignments.map((assignment) => assignment.publicId) }
    }
  })
  const evaluationByTarget = new Map(
    assignmentEvaluations.map((evaluation) => [evaluation.targetPublicId, evaluation])
  )
  const assignmentByChapterId = new Map<bigint, AssignmentWithState>()
  for (const assignment of assignments) {
    if (!assignment.chapterId || assignmentByChapterId.has(assignment.chapterId)) continue
    const evaluation = evaluationByTarget.get(assignment.publicId)
    const evaluationScore = evaluation?.overallScore ?? null
    assignmentByChapterId.set(assignment.chapterId, {
      assignment,
      submissions: assignment.submissions,
      evaluationScore,
      completed: evaluationScore !== null && evaluationScore >= ASSIGNMENT_PASS_SCORE
    })
  }

  const derived: PersistedStep[] = []
  chapters.forEach((chapter, index) => {
    const theory = assessments[index]!.theory
    const practical = assessments[index]!.practical
    const theoryAttempts = attemptsByExam.get(theory.id) ?? []
    const practicalAttempts = attemptsByExam.get(practical.id) ?? []
    const contentComplete =
      chapter.topics.length > 0 &&
      chapter.topics.every((topic) => topic.progress[0]?.status === 'completed')
    if (contentComplete) {
      derived.push({
        chapterPublicId: chapter.publicId,
        step: 'content',
        status: 'completed',
        score: null,
        completedAt: new Date().toISOString()
      })
    }
    const theoryPass = theoryAttempts.find((attempt) => attempt.passed === true)
    if (theoryPass) {
      derived.push({
        chapterPublicId: chapter.publicId,
        step: 'theory',
        status: 'completed',
        score: theoryPass.score,
        completedAt: theoryPass.submittedAt?.toISOString() ?? null
      })
    }
    const practicalPass = practicalAttempts.find((attempt) => attempt.passed === true)
    if (practicalPass) {
      derived.push({
        chapterPublicId: chapter.publicId,
        step: 'practical',
        status: 'completed',
        score: practicalPass.score,
        completedAt: practicalPass.submittedAt?.toISOString() ?? null
      })
    }
    const assignmentState = assignmentByChapterId.get(chapter.id)
    if (assignmentState?.completed) {
      derived.push({
        chapterPublicId: chapter.publicId,
        step: 'assignment',
        status: 'completed',
        score: assignmentState.evaluationScore,
        completedAt:
          assignmentState.submissions[0]?.submittedAt.toISOString() ?? new Date().toISOString()
      })
    }
  })

  const existing = await loadPersistedSteps(userPublicId, active.career.slug)
  const merged = mergePersisted(existing, derived)
  // Only write rows that Supabase is missing (or that just became complete).
  const needsWrite = merged.filter((row) => {
    const current = existing.get(stepKey(row.chapterPublicId, row.step))
    if (!current) return true
    if (row.status === 'completed' && current.status !== 'completed') return true
    if (row.score !== null && current.score === null) return true
    return false
  })
  const persisted = await persistStepRows(userPublicId, active.career.slug, needsWrite)

  let previousLessonComplete = true
  const lessons: LearningFlowLesson[] = chapters.map((chapter, index) => {
    const pair = assessments[index]!
    const assignmentState = assignmentByChapterId.get(chapter.id)
    if (!assignmentState) {
      throw new AppError(
        503,
        'ASSIGNMENT_UNAVAILABLE',
        'This lesson assignment is being prepared. Please try again.'
      )
    }
    const theoryAttempts = attemptsByExam.get(pair.theory.id) ?? []
    const practicalAttempts = attemptsByExam.get(pair.practical.id) ?? []
    const lesson = buildLesson(
      chapter,
      index + 1,
      { ...pair.theory, attempts: theoryAttempts },
      { ...pair.practical, attempts: practicalAttempts },
      assignmentState,
      persisted,
      previousLessonComplete
    )
    previousLessonComplete = lesson.completed
    return lesson
  })

  const completed = lessons.filter((lesson) => lesson.completed).length
  const current =
    lessons.find((lesson) => !lesson.completed && lesson.unlocked) ?? lessons[lessons.length - 1] ?? null

  return {
    career: {
      name: active.career.name,
      slug: active.career.slug,
      pathSummary: active.career.pathSummary
    },
    lessons,
    progress: {
      completed,
      total: lessons.length,
      percent: lessons.length === 0 ? 0 : Math.round((completed / lessons.length) * 100)
    },
    currentLesson: current
      ? {
          chapterPublicId: current.chapterPublicId,
          number: current.number,
          title: current.title,
          currentStep: current.currentStep
        }
      : null
  }
}

async function flowLesson(userId: bigint, userPublicId: string, chapterPublicId: string) {
  const flow = await getLearningFlow(userId, userPublicId)
  const lesson = flow.lessons.find((item) => item.chapterPublicId === chapterPublicId)
  if (!lesson) throw AppError.notFound('Lesson not found.')
  return { flow, lesson }
}

/** Throwing guard used when opening lesson reading content. */
export async function assertLessonContentAccess(
  userId: bigint,
  userPublicId: string,
  chapterPublicId: string
): Promise<void> {
  const { lesson } = await flowLesson(userId, userPublicId, chapterPublicId)
  if (!lesson.content.unlocked) {
    throw new AppError(
      403,
      'LESSON_LOCKED',
      lesson.content.lockReason ?? 'Complete the previous lesson first.'
    )
  }
}

/**
 * Throwing guard for exam detail/start/submit. Theory requires the lesson
 * content to be complete; practical requires the theory exam to be passed.
 */
export async function assertExamAccess(
  userId: bigint,
  userPublicId: string,
  exam: Pick<Exam, 'chapterId' | 'kind' | 'publicId'>
): Promise<LearningFlowLesson> {
  if (!exam.chapterId) {
    throw new AppError(
      403,
      'LESSON_REQUIRED',
      'Open this assessment from its lesson in the course.'
    )
  }
  const chapter = await prisma.chapter.findUnique({
    where: { id: exam.chapterId },
    select: { publicId: true }
  })
  if (!chapter) throw AppError.notFound('Lesson not found.')
  const { lesson } = await flowLesson(userId, userPublicId, chapter.publicId)
  const step = exam.kind === 'theory' ? lesson.theory.step : lesson.practical.step
  if (!step.unlocked) {
    throw new AppError(403, 'STEP_LOCKED', step.lockReason ?? 'This step is locked.')
  }
  return lesson
}

/**
 * Throwing guard for assignment detail/submission. An assignment is only
 * reachable after the practical exam of the lesson it belongs to has passed.
 */
export async function assertAssignmentAccess(
  userId: bigint,
  userPublicId: string,
  assignment: Pick<Assignment, 'chapterId' | 'publicId'>
): Promise<LearningFlowLesson> {
  if (!assignment.chapterId) {
    throw new AppError(
      403,
      'LESSON_REQUIRED',
      'Open this assignment from its lesson in the course.'
    )
  }
  const chapter = await prisma.chapter.findUnique({
    where: { id: assignment.chapterId },
    select: { publicId: true }
  })
  if (!chapter) throw AppError.notFound('Lesson not found.')
  const { lesson } = await flowLesson(userId, userPublicId, chapter.publicId)
  if (!lesson.assignment.step.unlocked) {
    throw new AppError(
      403,
      'ASSIGNMENT_LOCKED',
      lesson.assignment.step.lockReason ?? 'Complete this lesson before opening its assignment.'
    )
  }
  return lesson
}

/** Persist a completed step (content, theory, practical or assignment) in Supabase. */
export async function completeStep(input: {
  userPublicId: string
  careerSlug: string
  chapterPublicId: string
  step: LearningStepKey
  score?: number | null
}): Promise<void> {
  if (!supabaseConfigured()) return
  const row = {
    user_public_id: input.userPublicId,
    career_slug: input.careerSlug,
    chapter_public_id: input.chapterPublicId,
    step: input.step,
    status: 'completed',
    score: input.score ?? null,
    completed_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  const { error } = await supabaseAdmin()
    .schema(supabaseSchema())
    .from('learning_step_progress')
    .upsert(row, { onConflict: 'user_public_id,career_slug,chapter_public_id,step' })
  if (error) {
    logger.error({ error: error.message }, 'Unable to complete learning step')
    throw new AppError(
      503,
      'PROGRESS_UNAVAILABLE',
      'Your progress could not be saved. Please try again.'
    )
  }
}

export interface SavedPracticalSubmission {
  publicId: string
  score: number
  passed: boolean
  feedback: unknown
  gradedBy: 'ai' | 'deterministic'
  model: string | null
  createdAt: string
}

/** Persist an immutable practical submission in Supabase. */
export async function savePracticalSubmission(input: {
  userPublicId: string
  careerSlug: string
  chapterPublicId: string
  examPublicId: string
  language: string
  code: string
  score: number
  passed: boolean
  feedback: unknown
  gradedBy: 'ai' | 'deterministic'
  model: string | null
}): Promise<SavedPracticalSubmission> {
  const publicId = ulid()
  const createdAt = new Date().toISOString()
  if (supabaseConfigured()) {
    const { error } = await supabaseAdmin()
      .schema(supabaseSchema())
      .from('practical_submissions')
      .insert({
        public_id: publicId,
        user_public_id: input.userPublicId,
        career_slug: input.careerSlug,
        chapter_public_id: input.chapterPublicId,
        exam_public_id: input.examPublicId,
        language: input.language,
        code: input.code,
        score: input.score,
        passed: input.passed,
        feedback: input.feedback as object,
        graded_by: input.gradedBy,
        model: input.model,
        created_at: createdAt
      })
    if (error) {
      logger.error({ error: error.message }, 'Unable to save practical submission')
      throw new AppError(
        503,
        'SUBMISSION_UNAVAILABLE',
        'Your submission could not be saved. Please try again.'
      )
    }
  }
  return {
    publicId,
    score: input.score,
    passed: input.passed,
    feedback: input.feedback,
    gradedBy: input.gradedBy,
    model: input.model,
    createdAt
  }
}
