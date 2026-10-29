export const ROLE_NAMES = ['student', 'instructor', 'admin'] as const

export type RoleName = (typeof ROLE_NAMES)[number]

const STUDENT_CONTENT_READ = ['courses.read', 'lessons.read'] as const

export const STUDENT_PERMISSIONS = [
  ...STUDENT_CONTENT_READ,
  'practice.play',
  'assignments.read:self',
  'submissions.create',
  'submissions.update:self',
  'exams.take',
  'attempts.read:self',
  'simulations.play',
  'progress.read:self',
  'portfolio.manage:self',
  'certificates.read:self',
  'mentor.use'
] as const

export const INSTRUCTOR_PERMISSIONS = [
  ...STUDENT_PERMISSIONS,
  'courses.create:own',
  'courses.update:own',
  'lessons.write:own',
  'questions.manage:own',
  'exams.create:own',
  'exams.grade:own',
  'assignments.review:own',
  'analytics.read:students:own',
  'reviews.override:own'
] as const

const ADMIN_FAMILY = [
  'admin.users.manage',
  'admin.careers.manage',
  'admin.courses.manage',
  'admin.exams.manage',
  'admin.simulations.manage',
  'admin.ai.config',
  'admin.analytics.read',
  'admin.audit.read',
  'admin.security.read',
  'admin.settings.manage',
  'admin.featureflags.manage'
] as const

export const ADMIN_PERMISSIONS = Array.from(
  new Set<string>([...INSTRUCTOR_PERMISSIONS, ...ADMIN_FAMILY])
)

export const ROLE_DESCRIPTIONS: Record<RoleName, string> = {
  student: 'Learner progressing through career tracks',
  instructor: 'Content author and reviewer for assigned courses',
  admin: 'Platform administrator with enumerated management permissions'
}

export const ROLE_PERMISSIONS: Record<RoleName, readonly string[]> = {
  student: STUDENT_PERMISSIONS,
  instructor: INSTRUCTOR_PERMISSIONS,
  admin: ADMIN_PERMISSIONS
}
