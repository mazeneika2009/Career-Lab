import { prisma } from '../../src/utils/prisma.js'
import { ulid } from '../../src/utils/ids.js'
import { hashPassword } from '../../src/security/password.js'
import { assignRole } from '../../src/repositories/user.repository.js'

export async function resetDb(): Promise<void> {
  await prisma.$transaction([
    prisma.securityEvent.deleteMany(),
    prisma.auditLog.deleteMany(),
    prisma.emailToken.deleteMany(),
    prisma.session.deleteMany(),
    prisma.userRole.deleteMany(),
    prisma.userProfile.deleteMany(),
    prisma.user.deleteMany()
  ])
}

export interface FixtureUser {
  publicId: string
  internalId: bigint
  email: string
  password: string
}

export const VALID_PASSWORD = 'ValidPassword123!'
export const OTHER_PASSWORD = 'OtherPassword456!'

export async function createActiveUser(
  email: string,
  password: string = VALID_PASSWORD,
  displayName = 'Test User'
): Promise<FixtureUser> {
  const { hash, params } = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      publicId: ulid(),
      email,
      passwordHash: hash,
      argonParams: params as object,
      status: 'active',
      profile: { create: { displayName, timezone: 'UTC' } }
    }
  })
  await assignRole(prisma, user.id, 'student')
  return { publicId: user.publicId, internalId: user.id, email, password }
}

export function getCookie(
  setCookie: string | string[] | undefined,
  name: string
): string | null {
  const list = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : []
  const raw = list.find((c) => c.startsWith(`${name}=`))
  return raw ? raw.split(';')[0] ?? null : null
}
