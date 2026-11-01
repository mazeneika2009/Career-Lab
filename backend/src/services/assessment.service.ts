import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { ulid } from '../utils/ids.js'
import { logger } from '../utils/logger.js'
import type { Prisma } from '@prisma/client'
import { requireActiveCareer, notify } from './domain.helpers.js'
import { assessSubmission, buildEvaluationDraft, recordEvaluation } from './evaluator.js'
import { recomputeSkillProgress } from './progress.service.js'
import {
  ASSIGNMENT_PASS_SCORE,
  assertAssignmentAccess,
  assertExamAccess,
  completeStep,
  ensureCareerAssignments,
  getLearningFlow,
  savePracticalSubmission,
  type PracticalExamSpec
} from './learning-flow.service.js'
import { reviewCode } from './ai-grader.service.js'
import { buildTheoryStudyHints, type TheoryStudyHint } from './theory-hint.service.js'

// ---------------------------------------------------------------------------
// Practice
// ---------------------------------------------------------------------------

export async function listPractice(userId: bigint, topicPublicId?: string) {
  const active = await requireActiveCareer(userId)
  const where = topicPublicId
    ? { careerId: active.career.id, topic: { publicId: topicPublicId } }
    : { careerId: active.career.id }
  const exercises = await prisma.practiceExercise.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      topic: { select: { title: true, chapter: { select: { title: true, stage: true } } } },
      attempts: { where: { userId }, orderBy: { createdAt: 'desc' }, take: 1 }
    }
  })
  return {
    career: { name: active.career.name, slug: active.career.slug },
    exercises: exercises.map((e) => ({
      publicId: e.publicId,
      title: e.title,
      instructions: e.instructions,
      topic: e.topic.title,
      chapter: e.topic.chapter.title,
      stage: e.topic.chapter.stage,
      lastAttemptAt: e.attempts[0]?.createdAt ?? null,
      attemptCount: undefined
    }))
  }
}

export async function submitPracticeAttempt(userId: bigint, exercisePublicId: string, response: string) {
  const active = await requireActiveCareer(userId)
  const exercise = await prisma.practiceExercise.findUnique({
    where: { publicId: exercisePublicId },
    include: { topic: true }
  })
  if (!exercise || exercise.careerId !== active.career.id) throw AppError.notFound('Exercise not found.')

  const attempt = await prisma.practiceAttempt.create({
    data: { publicId: ulid(), exerciseId: exercise.id, userId, response }
  })
  return { publicId: attempt.publicId, submittedAt: attempt.createdAt.toISOString() }
}

// ---------------------------------------------------------------------------
// Theory exams — graded entirely on the server.
// ---------------------------------------------------------------------------

interface StoredQuestion {
  topicSlug?: string
  prompt: string
  options: string[]
  answerIndex: number
  explanation: string
}

function sanitizeQuestions(questions: unknown): Array<{ prompt: string; options: string[] }> {
  if (!Array.isArray(questions)) return []
  return questions.map((q) => {
    const record = q as StoredQuestion
    return { prompt: record.prompt, options: [...record.options] }
  })
}

export async function listExams(userId: bigint, kind: 'theory' | 'practical') {
  const active = await requireActiveCareer(userId)
  const exams = await prisma.exam.findMany({
    where: { careerId: active.career.id, kind },
    orderBy: [{ chapterId: 'asc' }],
    include: {
      chapter: { select: { order: true, title: true, stage: true } },
      attempts: { where: { userId }, orderBy: { startedAt: 'desc' } }
    }
  })

  return {
    career: { name: active.career.name, slug: active.career.slug },
    exams: exams
      .sort((a, b) => (a.chapter?.order ?? 99) - (b.chapter?.order ?? 99))
      .map((e) => ({
        publicId: e.publicId,
        title: e.title,
        coverage: e.coverage,
        passScore: e.passScore,
        durationMin: e.durationMin,
        chapter: e.chapter ? { title: e.chapter.title, stage: e.chapter.stage } : null,
        attempts: e.attempts.map((a) => ({
          publicId: a.publicId,
          score: a.score,
          passed: a.passed,
          startedAt: a.startedAt,
          submittedAt: a.submittedAt
        })),
        bestScore: Math.max(-1, ...e.attempts.filter((a) => a.score !== null).map((a) => a.score as number))
      }))
  }
}

export async function getExam(userId: bigint, userPublicId: string, examPublicId: string) {
  const active = await requireActiveCareer(userId)
  const exam = await prisma.exam.findUnique({ where: { publicId: examPublicId } })
  if (!exam || exam.careerId !== active.career.id) throw AppError.notFound('Exam not found.')

  const lesson = await assertExamAccess(userId, userPublicId, exam)

  if (exam.kind === 'theory') {
    // Answer keys never leave the server.
    const sanitized = sanitizeQuestions(exam.questions)
    return {
      publicId: exam.publicId,
      kind: exam.kind,
      title: exam.title,
      coverage: exam.coverage,
      passScore: exam.passScore,
      durationMin: exam.durationMin,
      chapterTitle: lesson.title,
      lessonNumber: lesson.number,
      questions: sanitized.map((q) => ({ prompt: q.prompt, options: q.options }))
    }
  }

  const raw = (exam.questions ?? {}) as Partial<PracticalExamSpec>
  const fallbackLanguage = 'javascript'
  const requirements = Array.isArray(raw.requirements)
    ? raw.requirements.filter((item): item is string => typeof item === 'string')
    : []
  const rubric = Array.isArray(raw.rubric) ? raw.rubric : []
  return {
    publicId: exam.publicId,
    kind: exam.kind,
    title: exam.title,
    coverage: exam.coverage,
    passScore: exam.passScore,
    brief:
      typeof raw.brief === 'string' && raw.brief
        ? raw.brief
        : `Apply the lesson "${lesson.title}" in a hands-on exercise.`,
    requirements,
    expectedOutput:
      typeof raw.expectedOutput === 'string' && raw.expectedOutput
        ? raw.expectedOutput
        : 'A runnable solution plus a short note explaining how to verify it.',
    rubric,
    language: typeof raw.language === 'string' && raw.language ? raw.language : fallbackLanguage,
    languageLabel:
      typeof raw.languageLabel === 'string' && raw.languageLabel ? raw.languageLabel : 'Code',
    starterCode:
      typeof raw.starterCode === 'string' && raw.starterCode
        ? raw.starterCode
        : '// Implement the requirements for this lesson.\n',
    lessonTitle: lesson.title,
    lessonNumber: lesson.number,
    chapterPublicId: lesson.chapterPublicId,
    chapterTitle: lesson.title
  }
}

export async function startTheoryAttempt(
  userId: bigint,
  userPublicId: string,
  examPublicId: string
) {
  const active = await requireActiveCareer(userId)
  const exam = await prisma.exam.findUnique({ where: { publicId: examPublicId } })
  if (!exam || exam.careerId !== active.career.id || exam.kind !== 'theory') {
    throw AppError.notFound('Theory exam not found.')
  }
  await assertExamAccess(userId, userPublicId, exam)
  const openAttempt = await prisma.examAttempt.findFirst({
    where: { examId: exam.id, userId, submittedAt: null }
  })
  if (openAttempt) {
    return { attemptPublicId: openAttempt.publicId, startedAt: openAttempt.startedAt }
  }
  const attempt = await prisma.examAttempt.create({ data: { publicId: ulid(), examId: exam.id, userId } })
  return { attemptPublicId: attempt.publicId, startedAt: attempt.startedAt }
}

/** Grade a theory attempt. Answers are validated and scored server-side only. */
export async function submitTheoryAttempt(
  userId: bigint,
  userPublicId: string,
  examPublicId: string,
  answers: number[]
) {
  const active = await requireActiveCareer(userId)
  const exam = await prisma.exam.findUnique({ where: { publicId: examPublicId } })
  if (!exam || exam.careerId !== active.career.id || exam.kind !== 'theory') {
    throw AppError.notFound('Theory exam not found.')
  }
  const lesson = await assertExamAccess(userId, userPublicId, exam)

  const openAttempt = await prisma.examAttempt.findFirst({
    where: { examId: exam.id, userId, submittedAt: null },
    orderBy: { startedAt: 'desc' }
  })
  if (!openAttempt) throw new AppError(409, 'NO_OPEN_ATTEMPT', 'Start the exam before submitting.')

  const stored = (exam.questions ?? []) as unknown as StoredQuestion[]
  if (answers.length !== stored.length) {
    throw AppError.validation('Answer count does not match question count.')
  }
  let correct = 0
  for (const [i, a] of answers.entries()) {
    if (!Number.isInteger(a) || a < 0 || a > 3) throw AppError.validation(`Invalid answer at question ${i + 1}.`)
    if ((stored[i] as StoredQuestion).answerIndex === a) correct += 1
  }
  const score = stored.length === 0 ? 0 : Math.round((correct / stored.length) * 100)
  const passed = score >= exam.passScore
  // A failed retake must not take away practical access earned by an earlier pass.
  const practicalUnlocked = passed || lesson.practical.step.unlocked

  const updated = await prisma.examAttempt.update({
    where: { id: openAttempt.id },
    data: { answers: answers as unknown as Prisma.InputJsonValue, score, passed, submittedAt: new Date() }
  })

  // Wrong answers are remediated with a hint and an exact lesson reference.
  // The correct option and its explanation never leave the server for a miss.
  const incorrectIndexes = stored
    .map((question, index) => (question.answerIndex === answers[index] ? -1 : index))
    .filter((index) => index >= 0)
  let studyHints = new Map<number, TheoryStudyHint>()
  if (incorrectIndexes.length > 0 && exam.chapterId) {
    try {
      const chapter = await prisma.chapter.findUnique({
        where: { id: exam.chapterId },
        include: {
          topics: {
            orderBy: { order: 'asc' },
            select: {
              publicId: true,
              slug: true,
              title: true,
              objectives: true,
              sections: true
            }
          }
        }
      })
      if (chapter) {
        studyHints = await buildTheoryStudyHints(
          {
            questions: stored,
            topics: chapter.topics,
            lesson: {
              chapterPublicId: lesson.chapterPublicId,
              number: lesson.number,
              title: lesson.title
            }
          },
          incorrectIndexes
        )
      }
    } catch (hintError) {
      // Study hints are remedial. A failure here must never invalidate a graded
      // attempt or block the result; the response falls back to a generic hint.
      logger.error(
        {
          examPublicId,
          error: hintError instanceof Error ? hintError.message : String(hintError)
        },
        'Theory study hint generation failed'
      )
    }
  }

  if (passed) {
    await completeStep({
      userPublicId,
      careerSlug: active.career.slug,
      chapterPublicId: lesson.chapterPublicId,
      step: 'theory',
      score
    })
  }

  await notify(
    userId,
    'exam_result',
    `Result available: ${exam.title}`,
    `You scored ${score}/100 (${passed ? 'passed' : 'not passed'}). ${
      passed
        ? 'The practical exam is now unlocked.'
        : practicalUnlocked
          ? 'Your practical exam remains unlocked from an earlier pass.'
          : 'The practical exam is still locked.'
    }`,
    '/learn'
  )
  await recomputeSkillProgress(userId, active.career.id)

  return {
    attemptPublicId: updated.publicId,
    score,
    passed,
    correctCount: correct,
    total: stored.length,
    practicalUnlocked,
    review: stored.map((q, i) => {
      const isCorrect = q.answerIndex === answers[i]
      const yourAnswer = q.options[answers[i] as number] ?? '—'
      if (isCorrect) {
        return {
          prompt: q.prompt,
          yourAnswer,
          explanation: q.explanation,
          correct: true
        }
      }

      const studyHint = studyHints.get(i)
      return {
        prompt: q.prompt,
        yourAnswer,
        correct: false,
        hint:
          studyHint?.hint ??
          `Re-read “${q.prompt}” in the lesson material before trying this question again.`,
        hintSource: studyHint?.hintSource ?? ('deterministic' as const),
        lessonRef: studyHint?.lessonRef ?? null
      }
    }),
    submittedAt: updated.submittedAt
  }
}

/** Practical exams are graded against the lesson brief by the code reviewer. */
export async function submitPracticalExam(
  userId: bigint,
  userPublicId: string,
  examPublicId: string,
  submission: string,
  language?: string
) {
  const active = await requireActiveCareer(userId)
  const exam = await prisma.exam.findUnique({ where: { publicId: examPublicId } })
  if (!exam || exam.careerId !== active.career.id || exam.kind !== 'practical') {
    throw AppError.notFound('Practical exam not found.')
  }
  const lesson = await assertExamAccess(userId, userPublicId, exam)

  const code = submission.trim()
  if (code.length < 20) {
    throw AppError.validation('Write a real implementation before submitting.')
  }

  const spec = (exam.questions ?? {}) as Partial<PracticalExamSpec>
  const requirements = Array.isArray(spec.requirements)
    ? spec.requirements.filter((item): item is string => typeof item === 'string')
    : []
  const resolvedLanguage =
    language && /^[a-z0-9+#._-]{1,40}$/i.test(language)
      ? language.toLowerCase()
      : typeof spec.language === 'string' && spec.language
        ? spec.language
        : 'javascript'

  const review = await reviewCode({
    lessonTitle: lesson.title,
    stage: lesson.stage,
    language: resolvedLanguage,
    brief:
      typeof spec.brief === 'string' && spec.brief
        ? spec.brief
        : `Apply the lesson "${lesson.title}" in a hands-on exercise.`,
    requirements,
    expectedOutput:
      typeof spec.expectedOutput === 'string' && spec.expectedOutput
        ? spec.expectedOutput
        : 'A runnable solution plus a short note explaining how to verify it.',
    code,
    passScore: exam.passScore
  })
  const passed = review.score >= exam.passScore && review.passed

  const saved = await savePracticalSubmission({
    userPublicId,
    careerSlug: active.career.slug,
    chapterPublicId: lesson.chapterPublicId,
    examPublicId: exam.publicId,
    language: resolvedLanguage,
    code,
    score: review.score,
    passed,
    feedback: {
      summary: review.summary,
      strengths: review.strengths,
      improvements: review.improvements,
      missingRequirements: review.missingRequirements,
      requirementResults: review.requirementResults,
      gradedBy: review.gradedBy
    },
    gradedBy: review.gradedBy,
    model: review.model
  })

  const attempt = await prisma.examAttempt.create({
    data: {
      publicId: ulid(),
      examId: exam.id,
      userId,
      answers: code,
      score: review.score,
      passed,
      startedAt: new Date(),
      submittedAt: new Date()
    }
  })

  if (passed) {
    await completeStep({
      userPublicId,
      careerSlug: active.career.slug,
      chapterPublicId: lesson.chapterPublicId,
      step: 'practical',
      score: review.score
    })
  }

  const outcomes = review.requirementResults.map((row, index) => ({
    skill: (Array.isArray(spec.rubric) && spec.rubric[index]?.skill) || `Requirement ${index + 1}`,
    weight:
      (Array.isArray(spec.rubric) && spec.rubric[index]?.weight) ||
      Math.max(1, Math.round(100 / Math.max(1, review.requirementResults.length))),
    met: row.met,
    note: row.note,
    criteria: row.requirement
  }))
  const draft = buildEvaluationDraft({
    targetType: 'practical_exam',
    targetPublicId: exam.publicId,
    targetTitle: exam.title,
    score: review.score,
    outcomes,
    passScore: exam.passScore,
    careerName: active.career.name
  })
  const evaluation = await recordEvaluation(userId, active.career.id, draft)

  await notify(
    userId,
    'evaluation_available',
    `Evaluation ready: ${exam.title}`,
    `Practical assessment scored ${review.score}/100. ${
      passed ? 'The next lesson is now available.' : 'Review the feedback and try again.'
    }`,
    '/learn'
  )
  await recomputeSkillProgress(userId, active.career.id)

  return {
    attemptPublicId: attempt.publicId,
    submissionPublicId: saved.publicId,
    evaluationPublicId: evaluation.publicId,
    score: review.score,
    passed,
    feedback: {
      summary: review.summary,
      strengths: review.strengths,
      improvements: review.improvements,
      missingRequirements: review.missingRequirements,
      requirementResults: review.requirementResults
    },
    gradedBy: review.gradedBy,
    model: review.model,
    nextLessonUnlocked: passed,
    submittedAt: saved.createdAt
  }
}

// ---------------------------------------------------------------------------
// Assignments & submissions
// ---------------------------------------------------------------------------

export async function listAssignments(userId: bigint, userPublicId: string) {
  const active = await requireActiveCareer(userId)
  await ensureCareerAssignments(active.career.id)
  const flow = await getLearningFlow(userId, userPublicId)
  const lessonByChapter = new Map(
    flow.lessons.map((lesson) => [lesson.chapterPublicId, lesson] as const)
  )

  const assignments = await prisma.assignment.findMany({
    where: { careerId: active.career.id },
    orderBy: { order: 'asc' },
    include: {
      chapter: { select: { publicId: true, order: true, title: true } },
      submissions: { where: { userId }, orderBy: { submittedAt: 'desc' }, take: 1 }
    }
  })

  return {
    career: { name: active.career.name, slug: active.career.slug },
    assignments: assignments
      .map((a) => {
        const lesson = a.chapter ? lessonByChapter.get(a.chapter.publicId) ?? null : null
        const submission = a.submissions[0]
        const locked = !lesson || !lesson.assignment.step.unlocked
        const passed = lesson?.assignment.passed ?? false
        return {
          publicId: a.publicId,
          title: a.title,
          objective: a.objective,
          stage: a.stage,
          difficulty: a.difficulty,
          dueDays: a.dueDays,
          skillsEvaluated: a.skillsEvaluated,
          status: passed ? 'completed' : submission ? 'submitted' : locked ? 'locked' : 'open',
          locked,
          lockReason: locked
            ? lesson?.assignment.step.lockReason ??
              'Open this assignment from its lesson in the course.'
            : null,
          passed,
          score: lesson?.assignment.bestScore ?? null,
          lesson: lesson
            ? {
                chapterPublicId: lesson.chapterPublicId,
                number: lesson.number,
                title: lesson.title
              }
            : null,
          latestSubmissionAt: submission?.submittedAt ?? null
        }
      })
      .sort((a, b) => (a.lesson?.number ?? 999) - (b.lesson?.number ?? 999))
  }
}

export async function getAssignment(
  userId: bigint,
  userPublicId: string,
  assignmentPublicId: string
) {
  const active = await requireActiveCareer(userId)
  await ensureCareerAssignments(active.career.id)
  const assignment = await prisma.assignment.findUnique({
    where: { publicId: assignmentPublicId },
    include: {
      chapter: { select: { publicId: true, order: true, title: true } },
      submissions: { where: { userId }, orderBy: { submittedAt: 'desc' } }
    }
  })
  if (!assignment || assignment.careerId !== active.career.id) throw AppError.notFound('Assignment not found.')

  const lesson = await assertAssignmentAccess(userId, userPublicId, assignment)

  const evaluation = assignment.submissions.length
    ? await prisma.evaluation.findUnique({
        where: {
          userId_targetType_targetPublicId: {
            userId,
            targetType: 'assignment',
            targetPublicId: assignment.publicId
          }
        }
      })
    : null

  return {
    publicId: assignment.publicId,
    title: assignment.title,
    objective: assignment.objective,
    requirements: assignment.requirements,
    skillsEvaluated: assignment.skillsEvaluated,
    dueDays: assignment.dueDays,
    difficulty: assignment.difficulty,
    submissionSpec: assignment.submissionSpec,
    locked: false,
    lockReason: null,
    passed: lesson.assignment.passed,
    score: lesson.assignment.bestScore ?? evaluation?.overallScore ?? null,
    lesson: {
      chapterPublicId: lesson.chapterPublicId,
      number: lesson.number,
      title: lesson.title
    },
    previousSubmissions: assignment.submissions.map((s) => ({
      publicId: s.publicId,
      status: s.status,
      submittedAt: s.submittedAt
    })),
    evaluation: evaluation
      ? { publicId: evaluation.publicId, overallScore: evaluation.overallScore, verdict: evaluation.verdict }
      : null
  }
}

/**
 * Submit an assignment. The submission is recorded immutably and evaluated
 * server-side against the assignment's own requirement list. Only a passing
 * evaluation completes the assignment stage and unlocks the next lesson.
 */
export async function submitAssignment(
  userId: bigint,
  userPublicId: string,
  assignmentPublicId: string,
  payload: string,
  links: string[]
) {
  const active = await requireActiveCareer(userId)
  await ensureCareerAssignments(active.career.id)
  const assignment = await prisma.assignment.findUnique({ where: { publicId: assignmentPublicId } })
  if (!assignment || assignment.careerId !== active.career.id) throw AppError.notFound('Assignment not found.')

  const lesson = await assertAssignmentAccess(userId, userPublicId, assignment)

  const spec = assignment.submissionSpec as { instructions: string; textLabel: string; minTextLength: number; linkLabels?: string[] }
  if (payload.trim().length < Math.min(spec.minTextLength, 200)) {
    throw AppError.validation(`The ${spec.textLabel} must be substantive (at least ${Math.min(spec.minTextLength, 200)} characters).`)
  }

  const submission = await prisma.assignmentSubmission.create({
    data: { publicId: ulid(), assignmentId: assignment.id, userId, payload, links }
  })

  const areas = (assignment.requirements as string[]).map((req, i) => ({
    skill: (assignment.skillsEvaluated as string[])[i % (assignment.skillsEvaluated as string[]).length] ?? `Requirement ${i + 1}`,
    weight: Math.round(100 / (assignment.requirements as string[]).length),
    criteria: req
  }))
  const result = assessSubmission({ submission: payload, areas, minWords: Math.round(spec.minTextLength / 5) })
  const passed = result.score >= ASSIGNMENT_PASS_SCORE
  const draft = buildEvaluationDraft({
    targetType: 'assignment',
    targetPublicId: assignment.publicId,
    targetTitle: assignment.title,
    score: result.score,
    outcomes: result.outcomes,
    passScore: ASSIGNMENT_PASS_SCORE,
    careerName: active.career.name
  })
  const evaluation = await recordEvaluation(userId, active.career.id, draft)

  await prisma.assignmentSubmission.update({
    where: { id: submission.id },
    data: { status: 'evaluated' }
  })

  if (passed) {
    await completeStep({
      userPublicId,
      careerSlug: active.career.slug,
      chapterPublicId: lesson.chapterPublicId,
      step: 'assignment',
      score: result.score
    })
  }

  await notify(
    userId,
    'evaluation_available',
    `Evaluation ready: ${assignment.title}`,
    `Your submission scored ${result.score}/100. ${
      passed
        ? 'The assignment is complete and the next lesson is now available.'
        : `A score of ${ASSIGNMENT_PASS_SCORE} is required to complete this lesson; revise using the feedback and resubmit.`
    }`,
    '/evaluations'
  )
  await recomputeSkillProgress(userId, active.career.id)

  return {
    submissionPublicId: submission.publicId,
    evaluationPublicId: evaluation.publicId,
    score: result.score,
    passed,
    nextLessonUnlocked: passed,
    submittedAt: submission.submittedAt
  }
}

export async function listEvaluations(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const evaluations = await prisma.evaluation.findMany({
    where: { userId, careerId: active.career.id },
    orderBy: { createdAt: 'desc' }
  })
  return {
    career: { name: active.career.name },
    evaluations: evaluations.map((e) => ({
      publicId: e.publicId,
      targetType: e.targetType,
      targetTitle: e.targetTitle,
      overallScore: e.overallScore,
      verdict: e.verdict,
      strengths: e.strengths,
      weaknesses: e.weaknesses,
      errorNotes: e.errorNotes,
      recommendations: e.recommendations,
      skillLevels: e.skillLevels,
      nextArea: e.nextArea,
      createdAt: e.createdAt
    }))
  }
}
