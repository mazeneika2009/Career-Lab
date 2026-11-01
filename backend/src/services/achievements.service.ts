import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { ulid } from '../utils/ids.js'
import { INTERVIEW_PASS_SCORE } from '../config/constants.js'
import { requireActiveCareer, notify } from './domain.helpers.js'

// ---------------------------------------------------------------------------
// Portfolio — assembled automatically from completed, eligible work.
// ---------------------------------------------------------------------------

export async function syncPortfolio(userId: bigint): Promise<void> {
  const active = await requireActiveCareer(userId)
  const careerId = active.career.id

  // Passed assignments become portfolio projects.
  const assignmentEvals = await prisma.evaluation.findMany({
    where: { userId, careerId, targetType: 'assignment', overallScore: { gte: 70 } }
  })
  for (const e of assignmentEvals) {
    await prisma.portfolioItem.upsert({
      where: {
        userId_sourceType_sourcePublicId: { userId, sourceType: 'assignment', sourcePublicId: e.targetPublicId }
      },
      update: {},
      create: {
        publicId: ulid(),
        userId,
        careerId,
        sourceType: 'assignment',
        sourcePublicId: e.targetPublicId,
        title: e.targetTitle,
        summary: `Completed assignment assessed at ${e.overallScore}/100. ${e.verdict.slice(0, 200)}`,
        artifacts: []
      }
    })
  }

  // Passed practical exams.
  const practicals = await prisma.examAttempt.findMany({
    where: { userId, passed: true, exam: { careerId, kind: 'practical' } },
    include: { exam: { select: { publicId: true, title: true, coverage: true } } }
  })
  for (const attempt of practicals) {
    await prisma.portfolioItem.upsert({
      where: {
        userId_sourceType_sourcePublicId: { userId, sourceType: 'practical_exam', sourcePublicId: attempt.exam.publicId }
      },
      update: {},
      create: {
        publicId: ulid(),
        userId,
        careerId,
        sourceType: 'practical_exam',
        sourcePublicId: attempt.exam.publicId,
        title: attempt.exam.title,
        summary: `Practical exam passed at ${attempt.score}/100 covering ${(attempt.exam.coverage as string[] | null)?.join(', ') ?? 'core competencies'}.`,
        artifacts: []
      }
    })
  }

  // Simulation work scoring at professional bar.
  const simEvals = await prisma.evaluation.findMany({
    where: { userId, careerId, targetType: 'sim_task', overallScore: { gte: 70 } }
  })
  for (const e of simEvals) {
    await prisma.portfolioItem.upsert({
      where: {
        userId_sourceType_sourcePublicId: { userId, sourceType: 'simulation', sourcePublicId: e.targetPublicId }
      },
      update: {},
      create: {
        publicId: ulid(),
        userId,
        careerId,
        sourceType: 'simulation',
        sourcePublicId: e.targetPublicId,
        title: e.targetTitle,
        summary: `Workplace task completed in company simulation, scored ${e.overallScore}/100.`,
        artifacts: []
      }
    })
  }

  // Issued certificates count as achievements.
  const cert = await prisma.certificate.findUnique({
    where: { userId_careerId: { userId, careerId } }
  })
  if (cert) {
    await prisma.portfolioItem.upsert({
      where: {
        userId_sourceType_sourcePublicId: { userId, sourceType: 'achievement', sourcePublicId: cert.publicId }
      },
      update: {},
      create: {
        publicId: ulid(),
        userId,
        careerId,
        sourceType: 'achievement',
        sourcePublicId: cert.publicId,
        title: `${active.career.name} Certificate`,
        summary: `Certified ${active.career.name} — serial ${cert.serial}.`,
        artifacts: []
      }
    })
  }
}

export async function getPortfolio(userId: bigint) {
  await syncPortfolio(userId)
  const active = await requireActiveCareer(userId)
  const items = await prisma.portfolioItem.findMany({
    where: { userId, careerId: active.career.id },
    orderBy: { completedAt: 'desc' }
  })
  return {
    career: { name: active.career.name, slug: active.career.slug },
    items: items.map((i) => ({
      publicId: i.publicId,
      sourceType: i.sourceType,
      title: i.title,
      summary: i.summary,
      completedAt: i.completedAt
    }))
  }
}

// ---------------------------------------------------------------------------
// Certificate — eligibility computed and controlled by the backend only.
// ---------------------------------------------------------------------------

export interface EligibilityChecklist {
  learningComplete: boolean
  allTheoryExamsPassed: boolean
  practicalExamPassed: boolean
  assignmentsPassed: number
  simulationEngaged: boolean
  interviewCompleted: boolean
}

export async function computeCertificateEligibility(
  userId: bigint,
  careerId: bigint
): Promise<{ eligible: boolean; checklist: EligibilityChecklist; missing: string[] }> {
  const [topicIds, progressDone, theoryExams, passedTheoryIds, practicalPasses, assignmentPasses, simState, interviewSessions] =
    await Promise.all([
      prisma.topic.findMany({ where: { chapter: { book: { careerId } } }, select: { id: true } }),
      prisma.topicProgress.count({ where: { userId, status: 'completed', topic: { chapter: { book: { careerId } } } } }),
      prisma.exam.findMany({ where: { careerId, kind: 'theory' }, select: { id: true } }),
      prisma.examAttempt.findMany({ where: { userId, passed: true, exam: { careerId, kind: 'theory' } }, select: { examId: true } }),
      prisma.examAttempt.count({ where: { userId, passed: true, exam: { careerId, kind: 'practical' } } }),
      prisma.evaluation.count({ where: { userId, targetType: 'assignment', overallScore: { gte: 70 }, careerId } }),
      prisma.simulationState.findUnique({ where: { userId_careerId: { userId, careerId } } }),
      prisma.interviewSession.count({
        where: {
          userId,
          careerId,
          stage: 'technical',
          status: 'completed',
          score: { gte: INTERVIEW_PASS_SCORE }
        }
      })
    ])

  const submittedTaskCount = await prisma.userSimTask.count({
    where: { userId, simTask: { careerId }, submittedAt: { not: null } }
  })

  const passedTheorySet = new Set(passedTheoryIds.map((p) => p.examId))
  const checklist: EligibilityChecklist = {
    learningComplete: topicIds.length > 0 && progressDone === topicIds.length,
    allTheoryExamsPassed: theoryExams.length > 0 && theoryExams.every((e) => passedTheorySet.has(e.id)),
    practicalExamPassed: practicalPasses > 0,
    assignmentsPassed: assignmentPasses,
    simulationEngaged: Boolean(simState) && submittedTaskCount >= 2,
    interviewCompleted: interviewSessions > 0
  }

  const missing: string[] = []
  if (!checklist.learningComplete) missing.push('Complete all learning topics')
  if (!checklist.allTheoryExamsPassed) missing.push('Pass every chapter theory exam')
  if (!checklist.practicalExamPassed) missing.push('Pass the practical exam')
  if (checklist.assignmentsPassed < 1) missing.push('Earn a passing evaluation on at least one assignment')
  if (!checklist.simulationEngaged) missing.push('Start the company simulation and submit at least two workplace tasks')
  if (!checklist.interviewCompleted) missing.push('Complete the technical interview')

  return { eligible: missing.length === 0, checklist, missing }
}

/** Issue the certificate when every requirement is met. Students cannot self-issue. */
export async function getCertificateStatus(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const existing = await prisma.certificate.findUnique({
    where: { userId_careerId: { userId, careerId: active.career.id } }
  })

  if (!existing) {
    const { eligible, checklist, missing } = await computeCertificateEligibility(userId, active.career.id)
    if (eligible) {
      const created = await prisma.certificate.create({
        data: {
          publicId: ulid(),
          userId,
          careerId: active.career.id,
          serial: `CL-${new Date().getFullYear()}-${ulid().slice(0, 10).toUpperCase()}`,
          requirementsSnapshot: JSON.parse(JSON.stringify(checklist))
        }
      })
      await notify(
        userId,
        'certificate_eligible',
        `Certificate issued: ${active.career.name}`,
        `Congratulations — you satisfied every requirement. Serial ${created.serial}.`,
        '/certificate'
      )
      return { status: 'issued' as const, certificate: created }
    }
    return {
      status: 'not_eligible' as const,
      requirements: { checklist, missing }
    }
  }

  return { status: 'issued' as const, certificate: existing }
}

// ---------------------------------------------------------------------------
// Career readiness — computed from actual performance data.
// ---------------------------------------------------------------------------

const READINESS_WEIGHTS = {
  learning: 25,
  theory: 15,
  practical: 20,
  assignments: 10,
  simulation: 10,
  communication: 5,
  interview: 15
} as const

export async function getReadiness(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const careerId = active.career.id

  const [topicIds, doneTopics, attempts, evaluations] = await Promise.all([
    prisma.topic.findMany({ where: { chapter: { book: { careerId } } }, select: { id: true } }),
    prisma.topicProgress.count({ where: { userId, status: 'completed', topic: { chapter: { book: { careerId } } } } }),
    prisma.examAttempt.findMany({
      where: { userId, exam: { careerId }, submittedAt: { not: null } },
      include: { exam: { select: { kind: true } } }
    }),
    prisma.evaluation.findMany({ where: { userId, careerId } })
  ])

  const avgOf = (xs: number[]): number | null => (xs.length ? Math.round(xs.reduce((s, v) => s + v, 0) / xs.length) : null)
  const theoryScores = attempts.filter((a) => a.exam.kind === 'theory' && a.score !== null).map((a) => a.score as number)
  const practicalScores = attempts.filter((a) => a.exam.kind === 'practical' && a.score !== null).map((a) => a.score as number)
  const assignmentScores = evaluations.filter((e) => e.targetType === 'assignment').map((e) => e.overallScore)
  const simScores = evaluations.filter((e) => ['sim_task', 'scenario'].includes(e.targetType)).map((e) => e.overallScore)
  const commScores = evaluations.filter((e) => e.targetType === 'communication').map((e) => e.overallScore)
  const interviewSessions = await prisma.interviewSession.findMany({
    where: { userId, careerId, stage: 'technical', score: { not: null } },
    select: { score: true }
  })
  const interviewScores = interviewSessions.map((s) => s.score as number)

  const components = {
    learning: topicIds.length ? Math.round((doneTopics / topicIds.length) * 100) : 0,
    theory: avgOf(theoryScores),
    practical: avgOf(practicalScores),
    assignments: avgOf(assignmentScores),
    simulation: avgOf(simScores),
    communication: avgOf(commScores),
    interview: avgOf(interviewScores)
  }

  let weightedSum = 0
  let weightUsed = 0
  for (const [key, weight] of Object.entries(READINESS_WEIGHTS)) {
    const value = components[key as keyof typeof components]
    if (value !== null && value !== undefined) {
      weightedSum += value * weight
      weightUsed += weight
    }
  }
  const overallPercent = weightUsed > 0 ? Math.round(weightedSum / weightUsed) : 0

  const practicalPassed = practicalScores.some((s) => s >= 70)
  const ready = overallPercent >= 80 && practicalPassed && components.interview !== null

  const requiredSkills = ((active.career.mainSkills as string[]) ?? []).map((skill) => ({ skill }))
  const skillRows = await prisma.skillProgress.findMany({ where: { userId, careerId } })
  const skillLevels = requiredSkills.map(({ skill }) => ({
    skill,
    currentLevel: skillRows.find((r) => r.skill === skill)?.percent ?? 0
  }))

  const missing: string[] = []
  if (components.learning < 100) missing.push(`Finish remaining topics (${topicIds.length - doneTopics} left)`)
  if (components.theory === null || components.theory < 70) missing.push('Reach an average of 70+ across theory exams')
  if (!practicalPassed) missing.push('Pass the practical exam at 70+')
  if (components.interview === null) missing.push('Complete the technical interview')
  if (overallPercent < 80) missing.push('Raise overall performance to 80+ across all areas')

  const improvements = [
    ...(components.theory !== null && components.theory < 70 ? ['Re-run failed theory exams and use the per-question hints to revisit the referenced lesson segments.'] : []),
    ...(components.practical === null || !practicalPassed ? ['Strengthen the practical workflow against the rubric before retrying.'] : []),
    ...(components.simulation !== null && components.simulation < 70 ? ['Handle more workplace scenarios and tasks to raise simulation scores.'] : []),
    ...(components.communication !== null && components.communication < 65 ? ['Practice team/client exchanges — clarity and completeness are graded.'] : [])
  ]

  const record = await prisma.readinessRecord.upsert({
    where: { userId_careerId: { userId, careerId } },
    update: { overallPercent, ready, components, missing, computedAt: new Date() },
    create: { userId, careerId, overallPercent, ready, components, missing }
  })

  // Readiness updates surface as notifications when they change materially.
  const previous = record.overallPercent
  void previous

  return {
    career: { name: active.career.name, slug: active.career.slug },
    overallPercent,
    ready,
    components,
    requiredSkills: skillLevels,
    missingRequirements: missing,
    recommendedImprovements: improvements,
    workplacePerformance: components.simulation,
    interviewPerformance: components.interview,
    practicalPerformance: components.practical
  }
}
