// Domain types for the career learning platform API.

export interface CareerCard {
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

export interface DashboardData {
  studentName: string
  career: { name: string; slug: string; category: string }
  overallProgress: number
  completedTopics: number
  totalTopics: number
  currentStage: string | null
  currentChapter: string | null
  currentTopic: { publicId: string; title: string; chapterTitle: string | null } | null
  continueLearningTarget: string | null
  nextLesson: { title: string; chapter?: string } | null
  upcomingExam: { publicId: string; title: string } | null
  assignmentStatus: { submitted: number; total: number }
  latestEvaluation:
    | { publicId: string; targetTitle: string; targetType: string; overallScore: number; verdict: string; createdAt: string }
    | null
  skillSummary: Array<{ skill: string; percent: number }>
  careerReadiness: { overallPercent: number; ready: boolean } | null
  companySimulation:
    | { status: 'in_progress' | 'completed' | 'not_started'; companyName: string; roleTitle: string; startedAt?: string }
    | { status: 'not_started' }
  recentNotifications: Array<{
    publicId: string
    kind: string
    title: string
    body: string
    readAt: string | null
    createdAt: string
  }>
}

export interface PathTopic {
  publicId: string
  title: string
  minutes: number
  status: 'not_started' | 'in_progress' | 'completed'
  locked: boolean
}

export interface LearningPathStage {
  stage: string
  chapterPublicId: string
  title: string
  description: string
  progress: { completed: number; total: number }
  completedTopics: number
  currentTopic: string | null
  topics: PathTopic[]
}

export interface LearningPathData {
  career: { name: string; slug: string; pathSummary: string }
  stages: LearningPathStage[]
}

export interface BookChaptersData {
  book: { title: string; description: string }
  career: { name: string; slug: string }
  continueReading: string | null
  chapters: Array<{
    publicId: string
    title: string
    description: string
    stage: string
    order: number
    topicIds: string[]
    progress: { completed: number; total: number }
  }>
}

export interface ChapterTopicsData {
  chapter: { publicId: string; title: string; description: string; stage: string; order: number }
  bookTitle: string
  topics: Array<{
    publicId: string
    title: string
    minutes: number
    objectives: string[]
    status: 'not_started' | 'in_progress' | 'completed'
    order: number
  }>
}

export interface TopicResourceView {
  id: string
  kind: string
  title: string
  url: string
  platform: string | null
  creator: string | null
  durationSec: number | null
  relationship: string
}

export interface TopicContentData {
  topic: {
    publicId: string
    title: string
    minutes: number
    objectives: string[]
    sections: Array<{ heading: string; body: string }>
    status: string
  }
  chapter: { publicId: string; title: string; stage: string }
  navigation: {
    previous: string | null
    next: string | null
    position: number
    totalInChapter: number
  }
  resources: {
    links: TopicResourceView[]
    videos: TopicResourceView[]
    tools: TopicResourceView[]
    sources: TopicResourceView[]
  }
}

export interface VideoItem {
  publicId: string
  title: string
  url: string
  platform: string | null
  creator: string | null
  durationSec: number | null
  description: string
  topic: { publicId: string; title: string }
  chapter: string
  stage: string
}

export interface PracticeExerciseView {
  publicId: string
  title: string
  instructions: string
  topic: string
  chapter: string
  stage: string
  lastAttemptAt: string | null
}

export interface ExamListItem {
  publicId: string
  title: string
  coverage: unknown
  passScore: number
  durationMin: number | null
  chapter: { title: string; stage: string } | null
  attempts: Array<{ publicId: string; score: number | null; passed: boolean | null; startedAt: string; submittedAt: string | null }>
  bestScore: number
}

export interface TheoryExamDetail {
  publicId: string
  kind: 'theory'
  title: string
  coverage: unknown
  passScore: number
  durationMin: number | null
  chapterTitle: string
  lessonNumber: number
  questions: Array<{ prompt: string; options: string[] }>
}

export interface PracticalExamDetail {
  publicId: string
  kind: 'practical'
  title: string
  coverage: unknown
  passScore: number
  brief: string
  requirements: string[]
  expectedOutput: string
  rubric: Array<{ skill: string; weight: number; criteria: string }>
  language: string
  languageLabel: string
  starterCode: string
  lessonTitle: string
  lessonNumber: number
  chapterPublicId: string
  chapterTitle: string
}

export interface PracticalRequirementResult {
  requirement: string
  met: boolean
  note: string
}

export interface PracticalExamResult {
  attemptPublicId: string
  submissionPublicId: string
  evaluationPublicId: string
  score: number
  passed: boolean
  feedback: {
    summary: string
    strengths: string[]
    improvements: string[]
    missingRequirements: string[]
    requirementResults: PracticalRequirementResult[]
  }
  gradedBy: 'ai' | 'deterministic'
  model: string | null
  nextLessonUnlocked: boolean
  submittedAt: string
}

export type LearningStepKey = 'content' | 'theory' | 'practical' | 'assignment'
export type LessonCurrentStep = LearningStepKey | 'complete'

export interface LearningFlowStep {
  key: LearningStepKey
  label: string
  unlocked: boolean
  completed: boolean
  status: 'locked' | 'in_progress' | 'completed'
  score: number | null
  completedAt: string | null
  lockReason: string | null
}

export interface LearningFlowTopic {
  publicId: string
  title: string
  minutes: number
  status: 'not_started' | 'in_progress' | 'completed'
  locked: boolean
}

export interface LearningFlowExam {
  step: LearningFlowStep
  examPublicId: string
  title: string
  passScore: number
  bestScore: number | null
  passed: boolean
  attemptCount: number
}

export interface LearningFlowAssignment {
  step: LearningFlowStep
  assignmentPublicId: string
  title: string
  objective: string
  passScore: number
  bestScore: number | null
  passed: boolean
  submissionCount: number
  latestSubmittedAt: string | null
}

export interface LearningFlowLesson {
  chapterPublicId: string
  number: number
  title: string
  description: string
  stage: string
  topics: LearningFlowTopic[]
  content: LearningFlowStep
  theory: LearningFlowExam
  practical: LearningFlowExam
  assignment: LearningFlowAssignment
  unlocked: boolean
  completed: boolean
  status: 'locked' | 'in_progress' | 'completed'
  currentStep: LessonCurrentStep
}

export interface CourseFlow {
  career: { name: string; slug: string; pathSummary: string }
  lessons: LearningFlowLesson[]
  progress: { completed: number; total: number; percent: number }
  currentLesson: {
    chapterPublicId: string
    number: number
    title: string
    currentStep: LessonCurrentStep
  } | null
}

export interface TheoryLessonReference {
  chapterPublicId: string
  lessonNumber: number
  lessonTitle: string
  topicPublicId: string
  topicTitle: string
  /** Zero-based section index used for anchors and highlighting. */
  sectionIndex: number
  sectionHeading: string
  /** One-based paragraph number inside the section. */
  paragraphNumber: number
  sectionAnchor: string
}

export interface TheoryExamReviewRow {
  prompt: string
  yourAnswer: string
  correct: boolean
  /** Provided only for correct answers; never returned for a miss. */
  explanation?: string
  /** Teaching hint shown instead of the correct answer on a miss. */
  hint?: string
  hintSource?: 'ai' | 'deterministic'
  lessonRef?: TheoryLessonReference | null
}

export interface TheoryExamResult {
  attemptPublicId: string
  score: number
  passed: boolean
  correctCount: number
  total: number
  practicalUnlocked?: boolean
  review: TheoryExamReviewRow[]
  submittedAt: string
}

export interface AssignmentListItem {
  publicId: string
  title: string
  objective: string
  stage: string
  difficulty: string
  dueDays: number
  skillsEvaluated: string[]
  status: 'open' | 'submitted' | 'completed' | 'locked'
  locked: boolean
  lockReason: string | null
  passed: boolean
  score: number | null
  latestSubmissionAt: string | null
  lesson: { chapterPublicId: string; number: number; title: string } | null
}

export interface AssignmentDetail
  extends Omit<AssignmentListItem, 'status' | 'latestSubmissionAt'> {
  requirements: string[]
  submissionSpec: { instructions: string; textLabel: string; minTextLength: number; linkLabels?: string[] }
  previousSubmissions: Array<{ publicId: string; status: string; submittedAt: string }>
  evaluation: { publicId: string; overallScore: number; verdict: string } | null
}

export interface AssignmentSubmitResult {
  score: number
  passed: boolean
  nextLessonUnlocked: boolean
  evaluationPublicId: string
  submittedAt: string
}

export interface EvaluationView {
  publicId: string
  targetType: string
  targetTitle: string
  overallScore: number
  verdict: string
  strengths: string[]
  weaknesses: string[]
  errorNotes: string[]
  recommendations: string[]
  skillLevels: Array<{ skill: string; level: string; percent: number }>
  nextArea: string
  createdAt: string
}

export interface SkillProgressView {
  skill: string
  currentLevel: string
  percent: number
  learningDone: number
  learningTotal: number
  examPerformance: number | null
  assignmentPerformance: number | null
  practicalPerformance: number | null
  simulationPerformance: number | null
  communicationPerformance: number | null
  interviewPerformance: number | null
}

export interface RoadmapStageView {
  name: string
  kind: 'learning' | 'pipeline'
  chapters: string[]
  totalTopics: number
  completedTopics: number
  complete: boolean
  status?: string
}

export interface AssessmentHistoryItem {
  publicId: string
  sourceType: string
  title: string
  category: 'theory' | 'practical' | 'assignment' | 'communication' | 'simulation' | 'interview'
  score: number
  status: 'passed' | 'failed' | 'completed'
  skills: string[]
  occurredAt: string
}

export interface PerformanceReviewData {
  career: { name: string; slug: string }
  performance: Record<string, number | null>
  detail: {
    theoryExams: Array<{ title: string; score: number }>
    practicalExams: Array<{ title: string; score: number }>
    assignmentEvaluations: Array<{ title: string; score: number }>
    communicationEvaluations: Array<{ title: string; score: number }>
    simulationEvaluations: Array<{ title: string; score: number }>
    assessmentHistory: AssessmentHistoryItem[]
    communicationThreads: number
    workplaceScenarios: number
    simulationSubmissions: number
    interviews: number
  }
  strengths: string[]
  weaknesses: string[]
  improvementAreas: string[]
}

export interface CareerReportData {
  career: { name: string; slug: string; category: string }
  generatedAt: string
  learningCompletion: { completedTopics: number; totalTopics: number; percent: number }
  skillDevelopment: Array<{ skill: string; percent: number }>
  examResults: {
    theory: Array<{ title: string; score: number }>
    practical: Array<{ title: string; score: number }>
  }
  assignmentResults: Array<{ title: string; score: number }>
  simulationResults: {
    tasksSubmitted: number
    averageScore: number | null
    workplaceScenariosCompleted: number
    communicationThreads: number
  }
  interviewResults: { completedSessions: number; bestScore: number | null }
  strengths: string[]
  developmentAreas: string[]
  careerReadiness: { overallPercent: number; ready: boolean } | null
  certificate: { serial: string; issuedAt: string } | null
}

export type SimulationInterviewStatus = 'not_started' | 'in_progress' | 'passed' | 'failed'

export type InterviewStage = 'hr' | 'technical'

export interface InterviewStageGateView {
  status: SimulationInterviewStatus
  score: number | null
  sessionPublicId: string | null
  verified: boolean
}

export interface WorkplaceAccessView {
  companySimulation: boolean
  teamCommunication: boolean
  clientCommunication: boolean
  deadlines: boolean
  scenarios: boolean
}

export interface SimulationGateView {
  /** True once the technical interview has been passed. */
  unlocked: boolean
  hr: InterviewStageGateView
  technical: InterviewStageGateView
  workplace: WorkplaceAccessView
  companyName: string | null
  roleTitle: string | null
  simulationStarted: boolean
}

export interface SimOverview {
  status: 'interview_required' | 'not_started' | 'active'
  career: { name: string; slug: string }
  companyName: string | null
  roleTitle: string | null
  startedAt?: string
  currentTasks?: Array<{ publicId: string; title: string; priority: string; dueDayOffset: number; status: string }>
  currentPriorities?: Array<{ title: string; priority: string }>
  deadlines?: Array<{ title: string; dueInDays: number }>
  teamCommunicationStatus?: { total: number; open: number }
  clientCommunicationStatus?: { total: number; open: number }
  scenarioProgress?: { responded: number; totalScenarios?: number }
  interview?: SimulationGateView
}

export interface WorkplaceTaskView {
  publicId: string
  title: string
  context: string
  requirements: string[]
  priority: string
  dueDayOffset: number
  expectedOutput: string
  skillsEvaluated: string[]
  status: 'not_started' | 'in_progress' | 'completed'
  submittedAt: string | null
  score: number | null
}

export interface ThreadView {
  publicId: string
  personaName: string
  personaRole: string
  situation: string
  messages: Array<{ from: 'persona' | 'student'; body: string; at: string }>
  status: string
  awaitingStudentReply: boolean
  score: number | null
}

export interface DeadlineItem {
  publicId: string
  title: string
  context: string
  priority: string
  dueDayOffset: number
  daysRemaining: number
  overdue: boolean
  dependencies: Array<{ title: string; status: string }>
  status: 'not_started' | 'in_progress' | 'completed'
  requiredAction: string
}

export interface ScenarioView {
  publicId: string
  category: string
  situation: string
  actions: string[]
  status: 'open' | 'responded'
  score: number | null
}

export interface InterviewStudyTopic {
  topic: string
  why: string
  action: string
}

export interface InterviewAnswerReview {
  questionPublicId: string
  question: string
  dimension: string
  score: number
  passed: boolean
  verdict: string
  whyThisScore: string[]
  strengths: string[]
  mistakes: string[]
  feedback: string[]
  studyTopics: InterviewStudyTopic[]
  gradedBy: 'ai' | 'deterministic'
  model: string | null
}

export interface InterviewSessionView {
  publicId: string
  stage: InterviewStage
  status: 'in_progress' | 'completed' | 'not_started'
  startedAt: string
  completedAt: string | null
  score: number | null
  questions: Array<{ publicId: string; dimension: string; prompt: string }>
  answers: Array<{ questionPublicId: string; body: string }> | null
  answerReviews: InterviewAnswerReview[] | null
  evaluation:
    | {
        overallScore: number
        verdict: string
        strengths: unknown
        weaknesses: unknown
        errorNotes: unknown
        recommendations: unknown
        skillLevels: unknown
        nextArea: string
      }
    | null
}

export interface PortfolioData {
  career: { name: string; slug: string }
  items: Array<{ publicId: string; sourceType: string; title: string; summary: string; completedAt: string }>
}

export interface CertificateStatus {
  status: 'issued' | 'not_eligible'
  certificate?: { publicId: string; serial: string; issuedAt: string }
  requirements?: {
    checklist: Record<string, unknown>
    missing: string[]
  }
}

export interface ReadinessData {
  career: { name: string; slug: string }
  overallPercent: number
  ready: boolean
  components: Record<string, number | null>
  requiredSkills: Array<{ skill: string; currentLevel: number }>
  missingRequirements: string[]
  recommendedImprovements: string[]
  workplacePerformance: number | null
  interviewPerformance: number | null
  practicalPerformance: number | null
}
