import { apiRequest } from '../services/api-client'
import type {
  AssignmentDetail,
  AssignmentListItem,
  AssignmentSubmitResult,
  BookChaptersData,
  CareerCard,
  CareerReportData,
  CertificateStatus,
  ChapterTopicsData,
  CourseFlow,
  DashboardData,
  DeadlineItem,
  EvaluationView,
  InterviewSessionView,
  InterviewStage,
  LearningPathData,
  PerformanceReviewData,
  PortfolioData,
  PracticalExamDetail,
  PracticalExamResult,
  ReadinessData,
  ScenarioView,
  SimOverview,
  SimulationGateView,
  SkillProgressView,
  ThreadView,
  TopicContentData,
  TheoryExamDetail,
  TheoryExamResult,
  VideoItem,
  WorkplaceTaskView
} from '../types/domain'

export const careersApi = {
  list: (params?: { search?: string; category?: string }) => {
    const qs = new URLSearchParams()
    if (params?.search) qs.set('search', params.search)
    if (params?.category) qs.set('category', params.category)
    const suffix = qs.toString() ? `?${qs.toString()}` : ''
    return apiRequest<{ total: number; categories: string[]; careers: CareerCard[] }>(`/careers${suffix}`)
  },
  select: (slug: string) =>
    apiRequest<{ selected: CareerCard }>('/careers/select', { method: 'POST', body: { slug } })
}

export const learningApi = {
  dashboard: () => apiRequest<DashboardData>('/me/dashboard'),
  skills: () => progressApiSkills(),
  courseFlow: () => apiRequest<CourseFlow>('/me/course-flow'),
  learningPath: () => apiRequest<LearningPathData>('/me/learning-path'),
  bookChapters: () => apiRequest<BookChaptersData>('/me/books/chapters'),
  chapterTopics: (chapterPublicId: string) =>
    apiRequest<ChapterTopicsData>(`/me/chapters/${chapterPublicId}/topics`),
  topicContent: (topicPublicId: string) => apiRequest<TopicContentData>(`/me/topics/${topicPublicId}`),
  completeTopic: (topicPublicId: string) =>
    apiRequest<{ completed: boolean; remainingTopics: number; lessonContentComplete: boolean }>(
      `/me/topics/${topicPublicId}/complete`,
      { method: 'POST' }
    ),
  videos: (params?: { chapter?: string; topic?: string }) => {
    const qs = new URLSearchParams()
    if (params?.chapter) qs.set('chapter', params.chapter)
    if (params?.topic) qs.set('topic', params.topic)
    const suffix = qs.toString() ? `?${qs.toString()}` : ''
    return apiRequest<{ career: { name: string }; videos: VideoItem[] }>(`/me/videos${suffix}`)
  },
  practice: (topic?: string) =>
    apiRequest<{ career: { name: string }; exercises: PracticeExerciseView[] }>(
      `/me/practice${topic ? `?topic=${topic}` : ''}`
    ),
  submitPractice: (exercisePublicId: string, response: string) =>
    apiRequest<{ publicId: string; submittedAt: string }>(`/me/practice/${exercisePublicId}/attempts`, {
      method: 'POST',
      body: { response }
    })
}

function progressApiSkills(): Promise<{ career: { name: string }; skills: SkillProgressView[] }> {
  return apiRequest<{ career: { name: string }; skills: SkillProgressView[] }>('/progress/skills')
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

export const examsApi = {
  theoryList: () => apiRequest<{ career: { name: string }; exams: ExamListItem[] }>('/exams/theory'),
  practicalList: () => apiRequest<{ career: { name: string }; exams: ExamListItem[] }>('/exams/practical'),
  detail: (publicId: string) =>
    apiRequest<TheoryExamDetail | PracticalExamDetail>(`/exams/${publicId}`),
  start: (publicId: string) =>
    apiRequest<{ attemptPublicId: string; startedAt: string }>(`/exams/${publicId}/attempts`, { method: 'POST' }),
  submitTheory: (publicId: string, answers: number[]) =>
    apiRequest<TheoryExamResult>(`/exams/${publicId}/theory/submit`, {
      method: 'POST',
      body: { answers }
    }),
  submitPractical: (publicId: string, code: string, language?: string) =>
    apiRequest<PracticalExamResult>(`/exams/${publicId}/practical/submit`, {
      method: 'POST',
      body: { code, ...(language ? { language } : {}) }
    })
}

export interface ExamListItem {
  publicId: string
  title: string
  coverage: unknown
  passScore: number
  durationMin: number | null
  chapter: { title: string; stage: string } | null
  attempts: Array<{
    publicId: string
    score: number | null
    passed: boolean | null
    startedAt: string
    submittedAt: string | null
  }>
  bestScore: number
}

export const assignmentsApi = {
  list: () => apiRequest<{ career: { name: string }; assignments: AssignmentListItem[] }>('/assignments'),
  detail: (publicId: string) => apiRequest<AssignmentDetail>(`/assignments/${publicId}`),
  submit: (publicId: string, payload: string, links: string[]) =>
    apiRequest<AssignmentSubmitResult>(`/assignments/${publicId}/submissions`, {
      method: 'POST',
      body: { payload, links }
    })
}

export const evaluationsApi = {
  list: () => apiRequest<{ career: { name: string }; evaluations: EvaluationView[] }>('/evaluations')
}

export const progressApi = {
  skills: () => apiRequest<{ career: { name: string }; skills: SkillProgressView[] }>('/progress/skills'),
  roadmap: () => apiRequest<{ career: { name: string }; stages: RoadmapStage[] }>('/progress/roadmap'),
  performanceReview: () => apiRequest<PerformanceReviewData>('/progress/performance-review'),
  careerReport: () => apiRequest<CareerReportData>('/progress/career-report')
}

interface RoadmapStage {
  name: string
  kind: 'learning' | 'pipeline'
  chapters: string[]
  totalTopics: number
  completedTopics: number
  complete: boolean
  status?: string
}

export const simulationApi = {
  overview: () => apiRequest<SimOverview>('/simulation'),
  gate: () => apiRequest<SimulationGateView>('/simulation/gate'),
  start: () => apiRequest<unknown>('/simulation/start', { method: 'POST' }),
  tasks: () =>
    apiRequest<{ career: { name: string }; companyName: string | null; tasks: WorkplaceTaskView[] }>(
      '/simulation/tasks'
    ),
  submitTask: (taskPublicId: string, response: string) =>
    apiRequest<{ score: number; evaluationPublicId: string }>(`/simulation/tasks/${taskPublicId}/submit`, {
      method: 'POST',
      body: { response }
    }),
  teamThreads: () => apiRequest<{ threads: ThreadView[] }>('/simulation/threads/team'),
  clientThreads: () => apiRequest<{ threads: ThreadView[] }>('/simulation/threads/client'),
  reply: (threadPublicId: string, message: string) =>
    apiRequest<{
      studentTurns: number
      score: number | null
      closed: boolean
      messages: ThreadView['messages']
      awaitingStudentReply: boolean
    }>(`/simulation/threads/${threadPublicId}/reply`, { method: 'POST', body: { message } }),
  deadlines: () => apiRequest<{ items: DeadlineItem[] }>('/simulation/deadlines'),
  scenarios: () => apiRequest<{ scenarios: ScenarioView[] }>('/simulation/scenarios'),
  respondScenario: (scenarioPublicId: string, actions: number[]) =>
    apiRequest<{ score: number; feedback: Array<{ action?: string; assessment: string }>; missed: Array<{ action?: string; note?: string }> }>(
      `/simulation/scenarios/${scenarioPublicId}/respond`,
      { method: 'POST', body: { actions } }
    )
}

export const interviewApi = {
  getCurrent: async (stage: InterviewStage): Promise<InterviewSessionView | null> => {
    return apiRequest<InterviewSessionView | null>(`/interview/current?stage=${stage}`)
  },
  start: (stage: InterviewStage) =>
    apiRequest<InterviewSessionView>('/interview/start', { method: 'POST', body: { stage } }),
  get: (sessionPublicId: string) => apiRequest<InterviewSessionView>(`/interview/${sessionPublicId}`),
  submit: (
    sessionPublicId: string,
    answers: Array<{ questionPublicId: string; body: string }>
  ) =>
    apiRequest<{
      score: number
      evaluationPublicId: string
      stage: InterviewStage
      passed: boolean
      perAnswer: Array<{
        questionPublicId: string
        score: number
        passed: boolean
        verdict: string
        gradedBy: 'ai' | 'deterministic'
      }>
      studyTopics: string[]
    }>(
      `/interview/${sessionPublicId}/submit`,
      {
        method: 'POST',
        body: { answers }
      }
    )
}

export const achievementsApi = {
  portfolio: () => apiRequest<PortfolioData>('/achievements/portfolio'),
  certificate: () => apiRequest<CertificateStatus>('/achievements/certificate'),
  readiness: () => apiRequest<ReadinessData>('/achievements/readiness')
}

export const notificationsApi = {
  list: () =>
    apiRequest<{
      unreadCount: number
      notifications: Array<{
        publicId: string
        kind: string
        title: string
        body: string
        linkPath: string | null
        readAt: string | null
        createdAt: string
      }>
    }>('/notifications'),
  markRead: (publicId: string) =>
    apiRequest<null>(`/notifications/${publicId}/read`, { method: 'POST' }),
  markAllRead: () => apiRequest<null>('/notifications/read-all', { method: 'POST' })
}
