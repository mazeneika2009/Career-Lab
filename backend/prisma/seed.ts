import { PrismaClient } from '@prisma/client'
import { ROLE_DESCRIPTIONS, ROLE_NAMES, ROLE_PERMISSIONS } from '../src/config/rbac-catalog.js'

const prisma = new PrismaClient()

async function seedRbac(): Promise<void> {
  for (const name of ROLE_NAMES) {
    await prisma.role.upsert({
      where: { name },
      update: { description: ROLE_DESCRIPTIONS[name] },
      create: { name, description: ROLE_DESCRIPTIONS[name] }
    })
  }

  const allCodenames = Array.from(
    new Set(ROLE_NAMES.flatMap((role) => [...ROLE_PERMISSIONS[role]]))
  )

  for (const codename of allCodenames) {
    await prisma.permission.upsert({
      where: { codename },
      update: {},
      create: { codename }
    })
  }

  for (const roleName of ROLE_NAMES) {
    const role = (await prisma.role.findUnique({ where: { name: roleName } }))!
    for (const codename of ROLE_PERMISSIONS[roleName]) {
      const permission = (await prisma.permission.findUnique({ where: { codename } }))!
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {},
        create: { roleId: role.id, permissionId: permission.id }
      })
    }
  }

  process.stdout.write(`RBAC seeded: ${ROLE_NAMES.length} roles, ${allCodenames.length} permissions\n`)
}

async function main(): Promise<void> {
  await seedRbac()

  const { seedContentLibrary } = await import('../src/content/seed-content.js')
  const counts = await seedContentLibrary(prisma)
  process.stdout.write(`Career library seeded: ${counts.careers} careers in catalog, ${counts.authored} fully authored\n`)

  if (process.env.APP_ENV === 'production') {
    process.stdout.write('Production environment: skipping dev users.\n')
    return
  }

  const { hashPassword } = await import('../src/security/password.js')
  const { ulid } = await import('../src/utils/ids.js')

  const devUsers = [
    { email: 'student@careerlab.local', name: 'Dev Student', role: 'student' as const },
    { email: 'instructor@careerlab.local', name: 'Dev Instructor', role: 'instructor' as const },
    { email: 'admin@careerlab.local', name: 'Dev Admin', role: 'admin' as const }
  ]

  for (const spec of devUsers) {
    const existing = await prisma.user.findUnique({ where: { email: spec.email } })
    if (existing) continue

    const { hash, params } = await hashPassword('ChangeMe#2026lab')
    const user = await prisma.user.create({
      data: {
        publicId: ulid(),
        email: spec.email,
        passwordHash: hash,
        argonParams: params as object,
        status: 'active',
        profile: { create: { displayName: spec.name, timezone: 'UTC' } }
      }
    })
    const role = (await prisma.role.findUnique({ where: { name: spec.role } }))!
    await prisma.userRole.create({ data: { userId: user.id, roleId: role.id } })
  }

  process.stdout.write('Dev users seeded (password: ChangeMe#2026lab)\n')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
