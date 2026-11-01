import type { Prisma, User, UserProfile } from '@prisma/client'
import { prisma } from '../utils/prisma.js'

type Db = Prisma.TransactionClient | typeof prisma

export interface CreateUserWithProfileInput {
  publicId: string
  email: string
  passwordHash: string
  argonParams: object
  displayName: string
}

export async function findByEmail(db: Db, email: string): Promise<User | null> {
  return db.user.findUnique({ where: { email } })
}

export async function findByPublicId(db: Db, publicId: string): Promise<User | null> {
  return db.user.findUnique({ where: { publicId } })
}

export async function createUserWithProfile(
  db: Db,
  input: CreateUserWithProfileInput
): Promise<{ user: User; profile: UserProfile }> {
  const user = await db.user.create({
    data: {
      publicId: input.publicId,
      email: input.email,
      passwordHash: input.passwordHash,
      argonParams: input.argonParams as Prisma.InputJsonValue,
      status: 'pending_verification',
      profile: {
        create: {
          displayName: input.displayName,
          timezone: 'UTC'
        }
      }
    }
  })
  const profile = (await db.userProfile.findUnique({ where: { userId: user.id } }))!
  return { user, profile }
}

export async function assignRole(
  db: Db,
  userId: bigint,
  roleName: string,
  assignedBy?: string
): Promise<void> {
  const role = await db.role.findUnique({ where: { name: roleName } })
  if (!role) throw new Error(`Role "${roleName}" is not seeded.`)
  await db.userRole.create({
    data: { userId, roleId: role.id, assignedBy: assignedBy ?? null }
  })
}

export async function recordFailedLogin(
  db: Db,
  userId: bigint,
  failedLoginCount: number,
  lockedUntil: Date | null
): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { failedLoginCount, lockedUntil }
  })
}

export async function recordLoginSuccess(db: Db, user: User): Promise<void> {
  await db.user.update({
    where: { id: user.id },
    data: {
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: new Date()
    }
  })
}

export async function updatePasswordHash(
  db: Db,
  userId: bigint,
  passwordHash: string,
  argonParams: object
): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { passwordHash, argonParams: argonParams as Prisma.InputJsonValue }
  })
}

export async function setStatusActive(db: Db, userId: bigint): Promise<void> {
  await db.user.update({ where: { id: userId }, data: { status: 'active' } })
}

export interface ProfilePatch {
  displayName?: string
  timezone?: string
}

export async function updateProfile(
  db: Db,
  userId: bigint,
  patch: ProfilePatch
): Promise<UserProfile> {
  return db.userProfile.update({
    where: { userId },
    data: patch
  })
}

export async function findProfileByUserId(db: Db, userId: bigint): Promise<UserProfile | null> {
  return db.userProfile.findUnique({ where: { userId } })
}
