// Content authoring framework.
//
// Every career is defined through this structure. Career-specific data lives
// in `src/content/careers/*`; the seeder compiles these definitions into the
// normalized relational schema (books -> chapters -> topics -> resources).

export type ResourceTypeName =
  | 'documentation'
  | 'guide'
  | 'reference'
  | 'article'
  | 'tutorial'
  | 'course'
  | 'specification'
  | 'checklist'
  | 'tool'
  | 'resource'
  | 'marketplace'
  | 'certification'

export interface LinkDef {
  /** Display title of the external resource. */
  title: string
  url: string
  /** Name of the source platform, e.g. "MDN Web Docs". */
  sourceName: string
  resourceType: ResourceTypeName
  /** How this resource relates to the topic. */
  relationship: string
}

export interface ToolDef {
  title: string
  url: string
  note: string
}

/** A verified video resource. Only include entries whose URLs are known-stable. */
export interface VideoDef {
  title: string
  url: string
  platform: string
  creator?: string
  description: string
  durationSec?: number
}

export interface QuizItem {
  prompt: string
  options: [string, string, string, string]
  answerIndex: number
  explanation: string
}

export interface TopicSection {
  heading: string
  body: string
  /** Legacy alias tolerated from authored content; `body` remains canonical. */
  description?: string
}

export interface TopicDef {
  slug: string
  /** Optional display alias used by some authored topics; `title` remains canonical. */
  trigger?: string
  title: string
  minutes?: number
  objectives: string[]
  /** Authored lesson text displayed inside the platform. */
  sections: TopicSection[]
  links: LinkDef[]
  tools?: ToolDef[]
  videos?: VideoDef[]
  /** One question per topic feeds its chapter's theory exam. Graded server-side. */
  quiz: QuizItem
}

export type StageName = 'Beginner' | 'Foundation' | 'Intermediate' | 'Advanced'

export interface ChapterDef {
  slug: string
  stage: StageName
  title: string
  description: string
  topics: TopicDef[]
}

export interface AssignmentDef {
  title: string
  stage: StageName
  objective: string
  requirements: string[]
  skillsEvaluated: string[]
  dueDays: number
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced'
  submissionSpec: {
    instructions: string
    textLabel: string
    minTextLength: number
    linkLabels?: string[]
  }
}

export interface RubricRow {
  skill: string
  weight: number
  criteria: string
}

export interface PracticalExamDef {
  title: string
  coverage: string[]
  brief: string
  requirements: string[]
  expectedOutput: string
  rubric: RubricRow[]
  passScore: number
}

export interface SimTaskDef {
  title: string
  context: string
  requirements: string[]
  priority: 'low' | 'normal' | 'high' | 'critical'
  dueDayOffset: number
  expectedOutput: string
  skills: string[]
}

export interface CommScenarioDef {
  kind: 'team' | 'client'
  personaName: string
  personaRole: string
  situation: string
  openingMessage: string
  expectedPoints: string[]
}

export interface ScenarioActionDef {
  action: string
  good: boolean
  note: string
}

export interface WorkplaceScenarioDef {
  category: string
  situation: string
  requiredActions: ScenarioActionDef[]
}

export interface InterviewQuestionDef {
  /** Defaults to "technical" for authored role questions. */
  stage?: 'hr' | 'technical'
  dimension: 'technical_knowledge' | 'problem_solving' | 'professional_reasoning' | 'communication'
  prompt: string
  guidancePoints: string[]
}

export interface CareerDef {
  slug: string
  name: string
  category: string
  order: number
  description: string
  difficulty: 'Beginner-friendly' | 'Intermediate' | 'Advanced'
  pathSummary: string
  mainSkills: string[]
  sourcePlatforms: string[]
  /** Company simulation identity for this career. */
  companyName: string
  roleTitle: string
  chapters: ChapterDef[]
  practicalExam: PracticalExamDef
  assignments: AssignmentDef[]
  simTasks: SimTaskDef[]
  commScenarios: CommScenarioDef[]
  workplaceScenarios: WorkplaceScenarioDef[]
  interviewQuestions: InterviewQuestionDef[]
}

const ROADMAP_STAGES: StageName[] = ['Beginner', 'Foundation', 'Intermediate', 'Advanced']

/**
 * Video URLs must be authored in the topic's `videos` block so the UI can
 * embed them. A video URL inside `links` would render as a raw external link,
 * which the platform never allows.
 */
export function isVideoResourceUrl(url: string): boolean {
  if (/youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|loom\.com/i.test(url)) return true
  return /\.(mp4|webm|m3u8|mov)(?:[?#]|$)/i.test(url)
}

export function validateCareer(career: CareerDef): void {
  if (!career.slug || !career.name || !career.description) throw new Error(`Bad career meta: ${career.slug}`)
  if (!career.mainSkills.length) throw new Error(`${career.slug}: no main skills`)
  if (!career.sourcePlatforms.length) throw new Error(`${career.slug}: no source platforms`)
  const seenChapters = new Set<string>()
  for (const ch of career.chapters) {
    if (seenChapters.has(ch.slug)) throw new Error(`${career.slug}: duplicate chapter ${ch.slug}`)
    seenChapters.add(ch.slug)
    if (!ROADMAP_STAGES.includes(ch.stage)) throw new Error(`${career.slug}: bad stage ${ch.stage}`)
    const seenTopics = new Set<string>()
    for (const t of ch.topics) {
      if (seenTopics.has(t.slug)) throw new Error(`${career.slug}/${ch.slug}: duplicate topic ${t.slug}`)
      seenTopics.add(t.slug)
      if (t.sections.length === 0) throw new Error(`${career.slug}/${t.slug}: no text`)
      if (t.links.length === 0) throw new Error(`${career.slug}/${t.slug}: no links`)
      const videoLink = t.links.find((link) => isVideoResourceUrl(link.url))
      if (videoLink) {
        throw new Error(
          `${career.slug}/${t.slug}: video URL in links — author it in videos[] so it embeds: ${videoLink.url}`
        )
      }
      if (!t.quiz || t.quiz.options.length !== 4) throw new Error(`${career.slug}/${t.slug}: bad quiz`)
    }
    if (ch.topics.length !== 3)
      throw new Error(`${career.slug}/${ch.slug}: expected exactly 3 lesson parts, found ${ch.topics.length}`)
  }
  if (career.chapters.length === 0) throw new Error(`${career.slug}: no chapters`)
}
