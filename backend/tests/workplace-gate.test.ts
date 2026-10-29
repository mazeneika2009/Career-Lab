import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '../src/utils/prisma.js'
import { ulid } from '../src/utils/ids.js'
import { INTERVIEW_PASS_SCORE } from '../src/config/constants.js'
import { computeSimulationGate } from '../src/services/interview-gate.service.js'
import { createActiveUser, resetDb } from './helpers/db.js'

let sessionSequence = 0

async function completedSession(input: {
  userId: bigint
  careerId: bigint
  stage: 'hr' | 'technical'
  score: number
}) {
  // Guarantee a stable "latest attempt" ordering regardless of clock
  // resolution on the test database.
  sessionSequence += 1
  const at = new Date(Date.now() + sessionSequence)

  return prisma.interviewSession.create({
    data: {
      publicId: ulid(),
      userId: input.userId,
      careerId: input.careerId,
      stage: input.stage,
      questions: [],
      status: 'completed',
      score: input.score,
      startedAt: at,
      completedAt: at
    }
  })
}

describe('workplace unlock progression', () => {
  let userId: bigint
  let careerId: bigint
  let careerSlug: string

  beforeAll(async () => {
    await resetDb()
    const user = await createActiveUser('workplace-gate@example.com')
    userId = user.internalId

    const career = await prisma.career.findUniqueOrThrow({
      where: { slug: 'frontend-developer' }
    })
    careerId = career.id
    careerSlug = career.slug
    await prisma.studentCareer.create({ data: { userId, careerId, active: true } })
  })

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } }).catch(() => undefined)
  })

  it('keeps the technical interview and every workplace module locked initially', async () => {
    const gate = await computeSimulationGate(userId, careerId, careerSlug)

    expect(gate.hr.status).toBe('not_started')
    expect(gate.technical.status).toBe('not_started')
    expect(gate.unlocked).toBe(false)
    expect(gate.workplace.companySimulation).toBe(false)
    expect(gate.workplace.teamCommunication).toBe(false)
    expect(gate.workplace.clientCommunication).toBe(false)
    expect(gate.workplace.deadlines).toBe(false)
    expect(gate.workplace.scenarios).toBe(false)
  })

  it('unlocks the technical interview after the virtual interview passes without opening the workplace', async () => {
    await completedSession({
      userId,
      careerId,
      stage: 'hr',
      score: INTERVIEW_PASS_SCORE
    })

    const gate = await computeSimulationGate(userId, careerId, careerSlug)

    expect(gate.hr.status).toBe('passed')
    expect(gate.technical.status).toBe('not_started')
    expect(gate.unlocked).toBe(false)
    expect(gate.workplace.companySimulation).toBe(false)
    expect(gate.workplace.teamCommunication).toBe(false)
  })

  it('unlocks Company Simulation and Team Communication together when the technical interview passes', async () => {
    await completedSession({
      userId,
      careerId,
      stage: 'technical',
      score: INTERVIEW_PASS_SCORE
    })

    const gate = await computeSimulationGate(userId, careerId, careerSlug)

    expect(gate.technical.status).toBe('passed')
    expect(gate.unlocked).toBe(true)
    expect(gate.workplace.companySimulation).toBe(true)
    expect(gate.workplace.teamCommunication).toBe(true)

    // Subsequent steps wait for the student to enter the simulated company.
    expect(gate.simulationStarted).toBe(false)
    expect(gate.workplace.clientCommunication).toBe(false)
    expect(gate.workplace.deadlines).toBe(false)
    expect(gate.workplace.scenarios).toBe(false)
  })

  it('opens client communication, deadlines and scenarios once the simulation starts', async () => {
    await prisma.simulationState.create({
      data: {
        publicId: ulid(),
        userId,
        careerId,
        companyName: 'Career Lab Test Company',
        roleTitle: 'Frontend Developer'
      }
    })

    const gate = await computeSimulationGate(userId, careerId, careerSlug)

    expect(gate.simulationStarted).toBe(true)
    expect(gate.workplace.companySimulation).toBe(true)
    expect(gate.workplace.teamCommunication).toBe(true)
    expect(gate.workplace.clientCommunication).toBe(true)
    expect(gate.workplace.deadlines).toBe(true)
    expect(gate.workplace.scenarios).toBe(true)
  })

  it('keeps the workplace locked when the latest technical attempt fails', async () => {
    await completedSession({
      userId,
      careerId,
      stage: 'technical',
      score: INTERVIEW_PASS_SCORE - 1
    })

    const gate = await computeSimulationGate(userId, careerId, careerSlug)

    expect(gate.technical.status).toBe('failed')
    expect(gate.unlocked).toBe(false)
    expect(gate.workplace.companySimulation).toBe(false)
    expect(gate.workplace.teamCommunication).toBe(false)
  })
})
