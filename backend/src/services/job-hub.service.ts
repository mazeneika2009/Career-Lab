import { Prisma } from '@prisma/client'
import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { ulid } from '../utils/ids.js'
import { buildJobCatalog, type JobCatalogSpec } from '../content/job-catalog.js'
import { getCertificateStatus } from './achievements.service.js'
import { requireActiveCareer } from './domain.helpers.js'
import { isLocalQaUnlocked } from '../config/local-qa.js'

export interface JobHubFilters {
  search?: string
  location?: string
  employmentType?: string
  experienceLevel?: string
  workMode?: string
}

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }
  return []
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+#.]/g, '')
}

function jobCareerSlugs(value: unknown): string[] {
  return stringArray(value)
}

function matchesFilters(
  job: {
    title: string
    location: string
    workMode: string
    employmentType: string
    experienceLevel: string
    skills: unknown
    description: string
  },
  filters: JobHubFilters
): boolean {
  if (filters.location && job.location !== filters.location) return false
  if (filters.employmentType && job.employmentType !== filters.employmentType) return false
  if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) return false
  if (filters.workMode && job.workMode !== filters.workMode) return false
  if (filters.search) {
    const needle = filters.search.trim().toLowerCase()
    if (needle) {
      const haystack = [
        job.title,
        job.location,
        job.description,
        ...stringArray(job.skills)
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(needle)) return false
    }
  }
  return true
}

function skillMatch(
  jobSkills: string[],
  userSkills: Array<{ skill: string; percent: number }>,
  mainSkills: string[]
): number {
  if (jobSkills.length === 0) return 0
  const scores = jobSkills.map((jobSkill) => {
    const target = normalize(jobSkill)
    const matched = userSkills.find((row) => {
      const current = normalize(row.skill)
      return current === target || current.includes(target) || target.includes(current)
    })
    if (matched) return Math.max(15, Math.min(100, matched.percent))
    const isCore = mainSkills.some((skill) => {
      const core = normalize(skill)
      return core === target || core.includes(target) || target.includes(core)
    })
    return isCore ? 55 : 20
  })
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
}

async function ensureJobCatalog(career: {
  slug: string
  name: string
  roleTitle: string
  companyName: string
  mainSkills: unknown
}) {
  const specs = buildJobCatalog({
    slug: career.slug,
    name: career.name,
    roleTitle: career.roleTitle,
    companyName: career.companyName,
    mainSkills: stringArray(career.mainSkills)
  })
  if (specs.length === 0) return
  const existing = await prisma.jobPosting.findMany({
    where: { companyName: { in: specs.map((spec) => spec.companyName) } },
    select: {
      id: true,
      companyName: true,
      externalUrl: true,
      careerSlugs: true,
      title: true,
      experienceLevel: true,
      description: true,
      location: true,
      workMode: true,
      employmentType: true,
      sourcePlatform: true,
      salaryRange: true,
      skills: true,
      active: true
    }
  })
  const existingForCareer = existing.filter((job) =>
    jobCareerSlugs(job.careerSlugs).includes(career.slug)
  )
  const missing: JobCatalogSpec[] = []
  for (const spec of specs) {
    const matches = existingForCareer.filter((job) => job.companyName === spec.companyName)
    const current =
      matches.find((job) => job.externalUrl === spec.externalUrl) ?? matches[0]
    if (!current) {
      missing.push(spec)
      continue
    }

    const duplicates = matches.filter((job) => job.id !== current.id && job.active)
    if (duplicates.length > 0) {
      await prisma.jobPosting.updateMany({
        where: { id: { in: duplicates.map((job) => job.id) } },
        data: { active: false }
      })
    }

    const existingSkills = stringArray(current.skills)
    const sameSkills =
      existingSkills.length === spec.skills.length &&
      existingSkills.every((skill, index) => skill === spec.skills[index])
    if (
      current.title !== spec.title ||
      current.experienceLevel !== spec.experienceLevel ||
      current.description !== spec.description ||
      current.location !== spec.location ||
      current.workMode !== spec.workMode ||
      current.employmentType !== spec.employmentType ||
      current.sourcePlatform !== spec.sourcePlatform ||
      current.salaryRange !== spec.salaryRange ||
      current.externalUrl !== spec.externalUrl ||
      !sameSkills ||
      !current.active
    ) {
      await prisma.jobPosting.update({
        where: { id: current.id },
        data: {
          title: spec.title,
          companyName: spec.companyName,
          location: spec.location,
          workMode: spec.workMode,
          employmentType: spec.employmentType,
          experienceLevel: spec.experienceLevel,
          sourcePlatform: spec.sourcePlatform,
          externalUrl: spec.externalUrl,
          salaryRange: spec.salaryRange,
          description: spec.description,
          skills: spec.skills as Prisma.InputJsonValue,
          careerSlugs: spec.careerSlugs as Prisma.InputJsonValue,
          active: true
        }
      })
    }
  }
  if (missing.length === 0) return
  const now = Date.now()
  try {
    await prisma.jobPosting.createMany({
      data: missing.map((spec: JobCatalogSpec) => ({
        publicId: ulid(),
        title: spec.title,
        companyName: spec.companyName,
        location: spec.location,
        workMode: spec.workMode,
        employmentType: spec.employmentType,
        experienceLevel: spec.experienceLevel,
        sourcePlatform: spec.sourcePlatform,
        externalUrl: spec.externalUrl,
        salaryRange: spec.salaryRange,
        description: spec.description,
        skills: spec.skills as Prisma.InputJsonValue,
        careerSlugs: spec.careerSlugs as Prisma.InputJsonValue,
        postedAt: new Date(now - spec.postedDaysAgo * 86_400_000)
      }))
    })
  } catch (error) {
    if (
      !(error instanceof Prisma.PrismaClientKnownRequestError) ||
      error.code !== 'P2002'
    ) {
      throw error
    }
  }
}

async function requireJobHubCertificate(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const certificate = await getCertificateStatus(userId)
  if (!isLocalQaUnlocked() && certificate.status !== 'issued') {
    throw new AppError(
      403,
      'CERTIFICATE_REQUIRED',
      'Earn your career certificate to unlock the Career Bridge.'
    )
  }
  return { active, certificate }
}

async function findCareerJob(userId: bigint, jobPublicId: string) {
  const { active } = await requireJobHubCertificate(userId)
  const job = await prisma.jobPosting.findUnique({ where: { publicId: jobPublicId } })
  if (
    !job ||
    !job.active ||
    !jobCareerSlugs(job.careerSlugs).includes(active.career.slug)
  ) {
    throw AppError.notFound('Job posting not found.')
  }
  return { active, job }
}

export async function getJobHub(userId: bigint, filters: JobHubFilters) {
  const active = await requireActiveCareer(userId)
  const certificate = await getCertificateStatus(userId)
  const career = active.career

  if (!isLocalQaUnlocked() && certificate.status !== 'issued') {
    return {
      locked: true,
      career: {
        slug: career.slug,
        name: career.name,
        roleTitle: career.roleTitle,
        category: career.category,
        mainSkills: stringArray(career.mainSkills)
      },
      certificate: null,
      jobs: [],
      savedCount: 0,
      appliedCount: 0,
      total: 0,
      filters: {
        locations: [],
        employmentTypes: [],
        experienceLevels: [],
        workModes: []
      }
    }
  }

  await ensureJobCatalog(career)

  const [allJobs, savedRows, applicationRows, skillRows] = await Promise.all([
    prisma.jobPosting.findMany({ where: { active: true }, orderBy: { postedAt: 'desc' } }),
    prisma.savedJob.findMany({ where: { userId } }),
    prisma.jobApplication.findMany({ where: { userId } }),
    prisma.skillProgress.findMany({
      where: { userId, careerId: career.id },
      select: { skill: true, percent: true }
    })
  ])

  const careerJobs = allJobs.filter((job) =>
    jobCareerSlugs(job.careerSlugs).includes(career.slug)
  )
  const savedIds = new Set(savedRows.map((row) => row.jobPostingId.toString()))
  const applicationByJob = new Map(
    applicationRows.map((row) => [row.jobPostingId.toString(), row.status])
  )
  const mainSkills = stringArray(career.mainSkills)

  const filtered = careerJobs.filter((job) => matchesFilters(job, filters))
  const jobs = filtered.map((job) => {
    const skills = stringArray(job.skills)
    return {
      publicId: job.publicId,
      title: job.title,
      location: job.location,
      workMode: job.workMode,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      sourcePlatform: job.sourcePlatform,
      externalUrl: job.externalUrl,
      salaryRange: job.salaryRange,
      description: job.description,
      skills,
      postedAt: job.postedAt,
      saved: savedIds.has(job.id.toString()),
      matchScore: skillMatch(skills, skillRows, mainSkills),
      applicationStatus: applicationByJob.get(job.id.toString()) ?? null
    }
  })

  const certificateView =
    certificate.status === 'issued'
      ? { serial: certificate.certificate.serial, issuedAt: certificate.certificate.issuedAt }
      : { serial: 'LOCAL-QA', issuedAt: new Date() }

  return {
    locked: false,
    career: {
      slug: career.slug,
      name: career.name,
      roleTitle: career.roleTitle,
      category: career.category,
      mainSkills
    },
    certificate: certificateView,
    jobs,
    total: jobs.length,
    savedCount: jobs.filter((job) => job.saved).length,
    appliedCount: jobs.filter((job) => job.applicationStatus !== null).length,
    filters: {
      locations: [...new Set(careerJobs.map((job) => job.location))].sort(),
      employmentTypes: [...new Set(careerJobs.map((job) => job.employmentType))].sort(),
      experienceLevels: [...new Set(careerJobs.map((job) => job.experienceLevel))].sort(),
      workModes: [...new Set(careerJobs.map((job) => job.workMode))].sort()
    }
  }
}

export async function setSavedJob(userId: bigint, jobPublicId: string, saved: boolean) {
  const { job } = await findCareerJob(userId, jobPublicId)
  if (saved) {
    await prisma.savedJob.upsert({
      where: { userId_jobPostingId: { userId, jobPostingId: job.id } },
      update: {},
      create: { userId, jobPostingId: job.id }
    })
  } else {
    await prisma.savedJob.deleteMany({ where: { userId, jobPostingId: job.id } })
  }
  return { jobPublicId, saved }
}

export async function trackJobApplication(userId: bigint, jobPublicId: string) {
  const { job } = await findCareerJob(userId, jobPublicId)
  const application = await prisma.jobApplication.upsert({
    where: { userId_jobPostingId: { userId, jobPostingId: job.id } },
    update: {},
    create: {
      publicId: ulid(),
      userId,
      jobPostingId: job.id,
      status: 'applied'
    }
  })
  return {
    jobPublicId,
    publicId: application.publicId,
    status: application.status,
    appliedAt: application.createdAt
  }
}
