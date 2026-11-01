import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { ulid } from '../utils/ids.js'

export interface CareerCardView {
  publicId: string
  slug: string
  name: string
  category: string
  description: string
  difficulty: string
  pathSummary: string
  mainSkills: string[]
  sourcePlatforms: string[]
  published: boolean
}

export async function listCareers(query: { search?: string; category?: string }): Promise<{
  total: number
  categories: string[]
  careers: CareerCardView[]
}> {
  const all = await prisma.career.findMany({
    orderBy: { order: 'asc' }
  })
  const chapterCounts = await prisma.chapter.groupBy({
    by: ['bookId'],
    _count: true
  })
  const books = await prisma.book.findMany({ select: { id: true, careerId: true } })
  const publishedCareerIds = new Set(
    chapterCounts
      .filter((cc) => cc._count > 0)
      .map((cc) => books.find((b) => b.id === cc.bookId)?.careerId)
      .filter((id): id is bigint => typeof id === 'bigint')
  )

  const search = query.search?.trim().toLowerCase()
  const filtered = all.filter((c) => {
    if (query.category && c.category !== query.category) return false
    if (!search) return true
    const haystack = `${c.name} ${c.description} ${c.category} ${(c.mainSkills as string[]).join(' ')}`.toLowerCase()
    return haystack.includes(search)
  })

  return {
    total: filtered.length,
    categories: [...new Set(all.map((c) => c.category))],
    careers: filtered.map((c) => ({
      publicId: c.publicId,
      slug: c.slug,
      name: c.name,
      category: c.category,
      description: c.description,
      difficulty: c.difficulty,
      pathSummary: c.pathSummary,
      mainSkills: (c.mainSkills as string[]) ?? [],
      sourcePlatforms: (c.sourcePlatforms as string[]) ?? [],
      published: publishedCareerIds.has(c.id)
    }))
  }
}

export async function getCareerBySlug(slug: string): Promise<CareerCardView> {
  const career = await prisma.career.findUnique({ where: { slug } })
  if (!career) throw AppError.notFound('Career not found.')
  const chapterCount = await prisma.chapter.count({ where: { book: { careerId: career.id } } })
  return {
    publicId: career.publicId,
    slug: career.slug,
    name: career.name,
    category: career.category,
    description: career.description,
    difficulty: career.difficulty,
    pathSummary: career.pathSummary,
    mainSkills: (career.mainSkills as string[]) ?? [],
    sourcePlatforms: (career.sourcePlatforms as string[]) ?? [],
    published: chapterCount > 0
  }
}

/**
 * Select (or re-select) the student's single training career.
 * The selection seeds notifications for the career's assignments/exams.
 */
export async function selectCareer(userId: bigint, slug: string): Promise<{ selected: CareerCardView }> {
  const career = await prisma.career.findUnique({ where: { slug } })
  if (!career) throw AppError.notFound('Career not found.')
  if (!career.pathSummary || career.pathSummary.startsWith('Curriculum publishing')) {
    throw new AppError(409, 'CAREER_NOT_PUBLISHED', 'This career’s curriculum is not published yet.')
  }

  await prisma.$transaction(async (tx) => {
    await tx.studentCareer.updateMany({ where: { userId }, data: { active: false } })
    const existing = await tx.studentCareer.findUnique({
      where: { userId_careerId: { userId, careerId: career.id } }
    })
    if (existing) {
      await tx.studentCareer.update({ where: { id: existing.id }, data: { active: true, selectedAt: new Date() } })
    } else {
      await tx.studentCareer.create({ data: { userId, careerId: career.id, active: true } })
    }

    // Baseline notifications tied to this career's actual content.
    const assignments = await tx.assignment.findMany({
      where: { careerId: career.id },
      orderBy: { order: 'asc' },
      take: 3
    })
    const existingNotes = await tx.notification.count({
      where: { userId, kind: 'assignment_available', linkPath: '/assignments' }
    })
    if (existingNotes === 0) {
      for (const a of assignments) {
        await tx.notification.create({
          data: {
            publicId: ulid(),
            userId,
            kind: 'assignment_available',
            title: `New assignment: ${a.title}`,
            body: `An assignment for your ${career.name} track is available. Due in ${a.dueDays} days.`,
            linkPath: '/assignments'
          }
        })
      }
      await tx.notification.create({
        data: {
          publicId: ulid(),
          userId,
          kind: 'exam_available',
          title: 'Theory exams unlocked',
          body: `Chapter theory exams for the ${career.name} track are now available.`,
          linkPath: '/exams/theory'
        }
      })
    }
  })

  return { selected: await getCareerBySlug(slug) }
}
