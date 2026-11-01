import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import { ulid } from '../utils/ids.js'
import { getAuthoredCareers } from './index.js'
import type { CareerDef, InterviewQuestionDef } from './framework.js'
import { CAREER_CATALOG, CAREER_SOURCE_PLATFORMS } from './catalog.js'
import { resolveChapterVideos } from './curated-videos.js'
import { pickChapterForAssignment } from './assignment-routing.js'

function json(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue
}

/**
 * Generic virtual/HR screening questions generated from each career's
 * metadata. They test motivation, communication and self-awareness rather than
 * role-specific technical depth, so every authored career gets a fair first
 * interview without duplicating hand-written questions in 50 files.
 */
function genericHrInterviewQuestions(def: CareerDef): InterviewQuestionDef[] {
  const role = def.roleTitle || def.name
  const company = def.companyName || 'the company'
  const skills = def.mainSkills.slice(0, 3)
  const skillFocus = skills.length > 0 ? skills.join(', ') : 'the core skills for this role'

  return [
    {
      stage: 'hr',
      dimension: 'professional_reasoning',
      prompt: `Tell me about yourself and why you are pursuing the ${role} role at ${company}.`,
      guidancePoints: [
        'Connects background, learning and motivation to the role',
        'Keeps the answer structured and concise',
        'Shows genuine interest in the company and the career path',
        'Avoids unsupported claims or generic clichés'
      ]
    },
    {
      stage: 'hr',
      dimension: 'communication',
      prompt: 'Walk me through a project or piece of work you are proud of. What was your specific contribution and what did you learn?',
      guidancePoints: [
        'Describes the situation, the student’s own actions and the outcome',
        'Names a concrete contribution rather than only the team result',
        'Reflects on what they would do differently next time',
        'Communicates clearly and stays within a reasonable length'
      ]
    },
    {
      stage: 'hr',
      dimension: 'professional_reasoning',
      prompt: 'Describe a time you received feedback you disagreed with. How did you handle it?',
      guidancePoints: [
        'Shows listening and emotional control under feedback',
        'Separates the feedback from personal defensiveness',
        'Explains how they verified the concern and responded',
        'Ends with a constructive outcome or changed behaviour'
      ]
    },
    {
      stage: 'hr',
      dimension: 'communication',
      prompt: `How do you approach learning a new skill such as ${skillFocus}? Give a concrete example.`,
      guidancePoints: [
        'Describes a repeatable learning approach, not just enthusiasm',
        'Uses a specific example with a visible result',
        'Mentions practice, feedback or verification of understanding',
        'Connects the learning method to the demands of the role'
      ]
    },
    {
      stage: 'hr',
      dimension: 'professional_reasoning',
      prompt: `Why do you want to work at ${company}, and what would you want to accomplish in your first 90 days as a ${role}?`,
      guidancePoints: [
        'Ties the company choice to credible research or values',
        'Sets realistic first-90-day goals rather than overpromising',
        'Focuses on contribution, learning and building trust',
        'Shows awareness of how the role supports the wider team'
      ]
    }
  ]
}

/**
 * Compiles authored career definitions into the normalized relational schema.
 * Idempotent: catalog rows are upserted; authored content for a career is
 * replaced atomically on each run.
 */
export async function seedContentLibrary(prisma: PrismaClient): Promise<{ careers: number; authored: number }> {
  // 1. Catalog metadata for all 50 careers (career selection screen).
  for (const entry of CAREER_CATALOG) {
    const platforms = CAREER_SOURCE_PLATFORMS[entry.slug] ?? []
    await prisma.career.upsert({
      where: { slug: entry.slug },
      update: {
        name: entry.name,
        category: entry.category,
        description: entry.description,
        difficulty: entry.difficulty,
        order: entry.order
      },
      create: {
        publicId: ulid(),
        slug: entry.slug,
        name: entry.name,
        category: entry.category,
        description: entry.description,
        difficulty: entry.difficulty,
        pathSummary: 'Curriculum publishing in progress.',
        mainSkills: [],
        sourcePlatforms: platforms,
        order: entry.order
      }
    })
  }

  // 2. Full authored content per career.
  const careers = getAuthoredCareers()
  let authored = 0

  for (const def of careers) {
    const careerRow = await prisma.career.upsert({
      where: { slug: def.slug },
      update: {},
      create: {
        publicId: ulid(),
        slug: def.slug,
        name: def.name,
        category: def.category,
        description: def.description,
        difficulty: def.difficulty,
        pathSummary: def.pathSummary,
        mainSkills: json(def.mainSkills),
        sourcePlatforms: json(def.sourcePlatforms),
        order: def.order
      }
    })

    await prisma.$transaction(async (tx) => {
      // Replace derived assessment content for this career.
      await tx.exam.deleteMany({ where: { careerId: careerRow.id } })
      await tx.assignment.deleteMany({ where: { careerId: careerRow.id } })
      await tx.practiceExercise.deleteMany({ where: { careerId: careerRow.id } })
      await tx.simTask.deleteMany({ where: { careerId: careerRow.id } })
      await tx.commScenario.deleteMany({ where: { careerId: careerRow.id } })
      await tx.workplaceScenario.deleteMany({ where: { careerId: careerRow.id } })
      await tx.interviewQuestion.deleteMany({ where: { careerId: careerRow.id } })

      // Book + chapters + topics + resources.
      const book = await tx.book.upsert({
        where: { careerId: careerRow.id },
        update: { title: `${def.name}: The Complete Program`, description: `The digital book accompanying the ${def.name} career track.` },
        create: {
          careerId: careerRow.id,
          title: `${def.name}: The Complete Program`,
          description: `The digital book accompanying the ${def.name} career track — every chapter, topic and resource for this profession.`
        }
      })
      // Keep chapter and topic public IDs stable across reseeds. Learning-step
      // progress in Supabase is keyed by chapter public ID, and topic progress
      // is keyed by topic ID, so deleting chapters here would orphan every
      // student's completed parts. Only content removed from the authored
      // curriculum is deleted.
      const existingChapters = await tx.chapter.findMany({
        where: { bookId: book.id },
        include: { topics: true }
      })
      const existingChaptersBySlug = new Map(existingChapters.map((chapter) => [chapter.slug, chapter]))
      const authoredChapterSlugs = new Set(def.chapters.map((chapter) => chapter.slug))
      const staleChapterIds = existingChapters
        .filter((chapter) => !authoredChapterSlugs.has(chapter.slug))
        .map((chapter) => chapter.id)
      if (staleChapterIds.length > 0) {
        await tx.chapter.deleteMany({ where: { id: { in: staleChapterIds } } })
      }

      let practiceOrder = 0
      const chapterRows: Array<{ id: bigint; stage: string; order: number }> = []
      for (const [ci, ch] of def.chapters.entries()) {
        const existingChapter = existingChaptersBySlug.get(ch.slug)
        const chapter = existingChapter
          ? await tx.chapter.update({
              where: { id: existingChapter.id },
              data: {
                stage: ch.stage,
                order: ci + 1,
                title: ch.title,
                description: ch.description
              }
            })
          : await tx.chapter.create({
              data: {
                publicId: ulid(),
                bookId: book.id,
                stage: ch.stage,
                order: ci + 1,
                slug: ch.slug,
                title: ch.title,
                description: ch.description
              }
            })
        chapterRows.push({
          id: chapter.id,
          stage: ch.stage,
          order: chapter.order
        })

        const existingTopicsBySlug = new Map(
          (existingChapter?.topics ?? []).map((topic) => [topic.slug, topic])
        )
        const authoredTopicSlugs = new Set(ch.topics.map((topic) => topic.slug))
        const staleTopicIds = (existingChapter?.topics ?? [])
          .filter((topic) => !authoredTopicSlugs.has(topic.slug))
          .map((topic) => topic.id)
        if (staleTopicIds.length > 0) {
          await tx.topic.deleteMany({ where: { id: { in: staleTopicIds } } })
        }

        const quizBank: Array<Record<string, unknown>> = []
        // Authored videos win; topics without them get a real curated video
        // so every lesson part fetches playable content through /me/videos.
        const videoFallback = resolveChapterVideos(def, ch, ch.topics)
        for (const [ti, t] of ch.topics.entries()) {
          const topicVideos = t.videos && t.videos.length > 0 ? t.videos : (videoFallback[ti] ?? [])
          const existingTopic = existingTopicsBySlug.get(t.slug)
          const topic = existingTopic
            ? await tx.topic.update({
                where: { id: existingTopic.id },
                data: {
                  order: ti + 1,
                  title: t.title,
                  minutes: t.minutes ?? 25,
                  objectives: json(t.objectives),
                  sections: json(t.sections),
                  quiz: [] as Prisma.InputJsonValue
                }
              })
            : await tx.topic.create({
                data: {
                  publicId: ulid(),
                  chapterId: chapter.id,
                  order: ti + 1,
                  slug: t.slug,
                  title: t.title,
                  minutes: t.minutes ?? 25,
                  objectives: json(t.objectives),
                  sections: json(t.sections),
                  quiz: [] as Prisma.InputJsonValue
                }
              })

          // Resources are derived content, so replacing them is safe.
          await tx.topicResource.deleteMany({ where: { topicId: topic.id } })

          const resourceRows = [
            ...t.links.map((l) => ({
              kind: 'link' as const,
              title: l.title,
              url: l.url,
              platform: l.sourceName,
              creator: null,
              durationSec: null,
              relationship: l.relationship
            })),
            ...(t.tools ?? []).map((tl) => ({
              kind: 'tool' as const,
              title: tl.title,
              url: tl.url,
              platform: null,
              creator: null,
              durationSec: null,
              relationship: tl.note
            })),
            ...topicVideos.map((v) => ({
              kind: 'video' as const,
              title: v.title,
              url: v.url,
              platform: v.platform,
              creator: v.creator ?? null,
              durationSec: v.durationSec ?? null,
              relationship: v.description
            }))
          ]
          if (resourceRows.length > 0) {
            await tx.topicResource.createMany({ data: resourceRows.map((r) => ({ ...r, topicId: topic.id })) })
          }

          // Practice exercise owned by the platform for this topic.
          await tx.practiceExercise.create({
            data: {
              publicId: ulid(),
              careerId: careerRow.id,
              topicId: topic.id,
              order: ++practiceOrder,
              title: `Practice: ${t.title}`,
              instructions:
                `Apply "${t.title}" immediately. Work through the topic objectives hands-on using the linked ` +
                `documentation above, produce a concrete artifact or written solution, and record what you did, ` +
                `what confused you, and how you verified your result. Practice is performed inside this platform — ` +
                `external links are reference material, not the exercise itself.`
            }
          })

          // Chapter theory-exam bank grows one question per topic.
          quizBank.push({
            topicSlug: t.slug,
            prompt: t.quiz.prompt,
            options: t.quiz.options,
            answerIndex: t.quiz.answerIndex,
            explanation: t.quiz.explanation
          })

          // Source attribution rows mirror the links explicitly.
          if (t.links.length > 0) {
            await tx.topicResource.createMany({
              data: t.links.map((l) => ({
                topicId: topic.id,
                kind: 'source' as const,
                title: l.sourceName,
                url: l.url,
                platform: l.sourceName,
                creator: null,
                durationSec: null,
                relationship: `${l.resourceType} · ${l.relationship}`
              }))
            })
          }
        }

        // Theory exam for the chapter.
        await tx.exam.create({
          data: {
            publicId: ulid(),
            careerId: careerRow.id,
            chapterId: chapter.id,
            kind: 'theory',
            title: `Theory Exam — ${ch.title}`,
            coverage: json(ch.topics.map((t) => t.title)),
            passScore: 70,
            questions: json(quizBank)
          }
        })
      }

      // Practical exam.
      await tx.exam.create({
        data: {
          publicId: ulid(),
          careerId: careerRow.id,
          chapterId: null,
          kind: 'practical',
          title: def.practicalExam.title,
          coverage: def.practicalExam.coverage,
          passScore: def.practicalExam.passScore,
          questions: json({
            brief: def.practicalExam.brief,
            requirements: def.practicalExam.requirements,
            expectedOutput: def.practicalExam.expectedOutput,
            rubric: def.practicalExam.rubric
          })
        }
      })

      // Assignments. Every authored assignment is attached to its lesson; any
      // chapter left without one receives a generated project at runtime.
      const claimedChapterIds = new Set<bigint>()
      for (const [i, a] of def.assignments.entries()) {
        const chapter = pickChapterForAssignment(
          { stage: a.stage, order: i + 1 },
          chapterRows,
          claimedChapterIds
        )
        if (chapter) claimedChapterIds.add(chapter.id)
        await tx.assignment.create({
          data: {
            publicId: ulid(),
            careerId: careerRow.id,
            chapterId: chapter?.id ?? null,
            order: i + 1,
            stage: a.stage,
            title: a.title,
            objective: a.objective,
            requirements: json(a.requirements),
            skillsEvaluated: json(a.skillsEvaluated),
            dueDays: a.dueDays,
            difficulty: a.difficulty,
            submissionSpec: json(a.submissionSpec)
          }
        })
      }

      // Simulation tasks.
      for (const [i, st] of def.simTasks.entries()) {
        await tx.simTask.create({
          data: {
            publicId: ulid(),
            careerId: careerRow.id,
            order: i + 1,
            title: st.title,
            context: st.context,
            requirements: json(st.requirements),
            priority: st.priority,
            dueDayOffset: st.dueDayOffset,
            expectedOutput: st.expectedOutput,
            skills: json(st.skills)
          }
        })
      }

      // Communication scenarios.
      for (const cs of def.commScenarios) {
        await tx.commScenario.create({
          data: {
            publicId: ulid(),
            careerId: careerRow.id,
            kind: cs.kind,
            personaName: cs.personaName,
            personaRole: cs.personaRole,
            situation: cs.situation,
            openingMessage: cs.openingMessage,
            expectedPoints: json(cs.expectedPoints)
          }
        })
      }

      // Workplace scenarios.
      for (const ws of def.workplaceScenarios) {
        await tx.workplaceScenario.create({
          data: {
            publicId: ulid(),
            careerId: careerRow.id,
            category: ws.category,
            situation: ws.situation,
            requiredActions: json(ws.requiredActions)
          }
        })
      }

      // Interview questions: authored role questions are technical; the
      // virtual/HR screening is generated generically per career.
      const authoredHr = def.interviewQuestions.filter((question) => question.stage === 'hr')
      const interviewQuestions: InterviewQuestionDef[] = [
        ...def.interviewQuestions.map((question) => ({
          ...question,
          stage: question.stage ?? ('technical' as const)
        })),
        ...(authoredHr.length > 0 ? [] : genericHrInterviewQuestions(def))
      ]
      for (const [i, iq] of interviewQuestions.entries()) {
        await tx.interviewQuestion.create({
          data: {
            publicId: ulid(),
            careerId: careerRow.id,
            stage: iq.stage ?? 'technical',
            order: i + 1,
            dimension: iq.dimension,
            prompt: iq.prompt,
            guidance: json(iq.guidancePoints)
          }
        })
      }

      // Keep career row authoritative after full authoring.
      await tx.career.update({
        where: { id: careerRow.id },
        data: {
          pathSummary: def.pathSummary,
          mainSkills: json(def.mainSkills),
          sourcePlatforms: json(def.sourcePlatforms),
          companyName: def.companyName,
          roleTitle: def.roleTitle
        }
      })
    })
    authored += 1
    process.stdout.write(`Seeded career content: ${def.name}\n`)
  }

  return { careers: CAREER_CATALOG.length, authored }
}
