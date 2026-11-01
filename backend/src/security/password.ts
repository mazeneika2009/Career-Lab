import argon2 from 'argon2'
import { randomBytes } from 'node:crypto'
import { env } from '../config/env.js'

export interface ArgonParams {
  memoryKib: number
  timeCost: number
  parallelism: number
}

const ARGON_OPTS = {
  type: argon2.argon2id
} as const

export function currentArgonParams(): ArgonParams {
  return {
    memoryKib: env.ARGON2_MEMORY_KIB,
    timeCost: env.ARGON2_TIME_COST,
    parallelism: env.ARGON2_PARALLELISM
  }
}

export async function hashPassword(password: string): Promise<{
  hash: string
  params: ArgonParams
}> {
  const params = currentArgonParams()
  const hash = await argon2.hash(password, {
    ...ARGON_OPTS,
    memoryCost: params.memoryKib,
    timeCost: params.timeCost,
    parallelism: params.parallelism
  })
  return { hash, params }
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password)
  } catch {
    return false
  }
}

export function paramsDrift(stored: unknown): boolean {
  const current = currentArgonParams()
  const storedParams = (stored ?? {}) as Partial<ArgonParams>
  return (
    storedParams.memoryKib !== current.memoryKib ||
    storedParams.timeCost !== current.timeCost ||
    storedParams.parallelism !== current.parallelism
  )
}

let dummyHashPromise: Promise<string> | null = null

export function dummyVerify(password: string): Promise<boolean> {
  dummyHashPromise ??= argon2.hash(randomBytes(32).toString('base64url'), {
    ...ARGON_OPTS,
    memoryCost: env.ARGON2_MEMORY_KIB,
    timeCost: env.ARGON2_TIME_COST,
    parallelism: env.ARGON2_PARALLELISM
  })
  return dummyHashPromise.then((hash) => verifyPassword(hash, password))
}
