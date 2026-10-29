import { Suspense, lazy } from 'react'
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import { AuthLayout, AppShellLayout } from './layouts/AppLayouts'
import { LandingPage } from './pages/LandingPage'
import { ProtectedRoute } from './layouts/ProtectedRoute'
import { ToastHost } from './components/ui/toast/ToastHost'
import { LoadingState } from './components/app/primitives'
import { SimulationGate } from './components/app/SimulationGate'
import { useUiStore } from './store/uiStore'

// Public landing stays in the initial bundle for the fastest first paint at
// "/". Auth, account and platform pages are split into small route chunks.
const LoginPage = lazy(async () => ({
  default: (await import('./pages/auth/LoginPage')).LoginPage
}))
const RegisterPage = lazy(async () => ({
  default: (await import('./pages/auth/RegisterPage')).RegisterPage
}))
const ForgotPasswordPage = lazy(async () => ({
  default: (await import('./pages/auth/ForgotPasswordPage')).ForgotPasswordPage
}))
const ResetPasswordPage = lazy(async () => ({
  default: (await import('./pages/auth/ResetPasswordPage')).ResetPasswordPage
}))
const VerifyEmailPage = lazy(async () => ({
  default: (await import('./pages/auth/VerifyEmailPage')).VerifyEmailPage
}))
const AccountOverviewPage = lazy(async () => ({
  default: (await import('./pages/account/AccountOverviewPage')).AccountOverviewPage
}))
const SecuritySettingsPage = lazy(async () => ({
  default: (await import('./pages/account/SecuritySettingsPage')).SecuritySettingsPage
}))
const NotFoundPage = lazy(async () => ({
  default: (await import('./pages/NotFoundPage')).NotFoundPage
}))

// Route-level code splitting: every platform page loads on demand.
const CareerSelectionPage = lazy(() => import('./pages/app/CareerSelectionPage'))
const DashboardPage = lazy(() => import('./pages/app/DashboardPage'))
const ProfilePage = lazy(() => import('./pages/app/ProfilePage'))
const LearningPathPage = lazy(() => import('./pages/app/LearningPathPage'))
const UnifiedLearningPage = lazy(() => import('./pages/app/UnifiedLearningPage'))
const AssignmentsPage = lazy(() => import('./pages/app/AssignmentsPage'))
const AssignmentSubmissionPage = lazy(() => import('./pages/app/AssignmentSubmissionPage'))
const EvaluationsPage = lazy(() => import('./pages/app/EvaluationsPage'))
const SkillProgressPage = lazy(() => import('./pages/app/SkillProgressPage'))
const RoadmapPage = lazy(() => import('./pages/app/RoadmapPage'))
const PerformanceReviewPage = lazy(() => import('./pages/app/PerformanceReviewPage'))
const CareerReportPage = lazy(() => import('./pages/app/CareerReportPage'))
const SimulationDashboardPage = lazy(() => import('./pages/app/SimulationDashboardPage'))
const WorkplaceTasksPage = lazy(() => import('./pages/app/WorkplaceTasksPage'))
const TeamCommunicationPage = lazy(() => import('./pages/app/TeamCommunicationPage'))
const ClientCommunicationPage = lazy(() => import('./pages/app/ClientCommunicationPage'))
const DeadlinesPage = lazy(() => import('./pages/app/DeadlinesPage'))
const ScenariosPage = lazy(() => import('./pages/app/ScenariosPage'))
const InterviewPage = lazy(() => import('./pages/app/InterviewPage'))
const PortfolioPage = lazy(() => import('./pages/app/PortfolioPage'))
const CertificatePage = lazy(() => import('./pages/app/CertificatePage'))
const ReadinessPage = lazy(() => import('./pages/app/ReadinessPage'))
const NotificationsPage = lazy(() => import('./pages/app/NotificationsPage'))

function lazyEl(node: React.ReactNode): React.JSX.Element {
  return <Suspense fallback={<LoadingState />}>{node}</Suspense>
}

const router = createBrowserRouter([
  { path: ROUTES.landing, element: <LandingPage /> },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.login, element: lazyEl(<LoginPage />) },
      { path: ROUTES.register, element: lazyEl(<RegisterPage />) },
      { path: ROUTES.forgotPassword, element: lazyEl(<ForgotPasswordPage />) },
      { path: ROUTES.resetPassword, element: lazyEl(<ResetPasswordPage />) },
      { path: ROUTES.verifyEmail, element: lazyEl(<VerifyEmailPage />) }
    ]
  },
  {
    element: (
      <ProtectedRouteLazy>
        <AppShellLayout />
      </ProtectedRouteLazy>
    ),
    children: [
      { path: ROUTES.account, element: lazyEl(<AccountOverviewPage />) },
      { path: ROUTES.security, element: lazyEl(<SecuritySettingsPage />) },
      { path: ROUTES.careers, element: lazyEl(<CareerSelectionPage />) },
      { path: ROUTES.dashboard, element: lazyEl(<DashboardPage />) },
      { path: ROUTES.profile, element: lazyEl(<ProfilePage />) },
      { path: ROUTES.learningPath, element: lazyEl(<LearningPathPage />) },
      { path: ROUTES.learn, element: lazyEl(<UnifiedLearningPage />) },
      { path: ROUTES.lessons, element: <Navigate to={ROUTES.learn} replace /> },
      { path: ROUTES.books, element: <Navigate to={ROUTES.learn} replace /> },
      { path: ROUTES.videos, element: <Navigate to={ROUTES.learn} replace /> },
      { path: ROUTES.theoryExams, element: <Navigate to={ROUTES.learn} replace /> },
      { path: ROUTES.practicalExams, element: <Navigate to={ROUTES.learn} replace /> },
      { path: ROUTES.assignments, element: lazyEl(<AssignmentsPage />) },
      { path: '/assignments/:assignmentId/submit', element: lazyEl(<AssignmentSubmissionPage />) },
      { path: ROUTES.evaluations, element: lazyEl(<EvaluationsPage />) },
      { path: ROUTES.skills, element: lazyEl(<SkillProgressPage />) },
      { path: ROUTES.roadmap, element: lazyEl(<RoadmapPage />) },
      { path: ROUTES.performanceReview, element: lazyEl(<PerformanceReviewPage />) },
      { path: ROUTES.careerReport, element: lazyEl(<CareerReportPage />) },
      { path: ROUTES.simulation, element: lazyEl(<SimulationDashboardPage />) },
      { path: ROUTES.simulationTasks, element: lazyEl(<SimulationGate module="company"><WorkplaceTasksPage /></SimulationGate>) },
      { path: ROUTES.teamCommunication, element: lazyEl(<SimulationGate module="team"><TeamCommunicationPage /></SimulationGate>) },
      { path: ROUTES.clientCommunication, element: lazyEl(<SimulationGate module="client"><ClientCommunicationPage /></SimulationGate>) },
      { path: ROUTES.deadlines, element: lazyEl(<SimulationGate module="deadlines"><DeadlinesPage /></SimulationGate>) },
      { path: ROUTES.scenarios, element: lazyEl(<SimulationGate module="scenarios"><ScenariosPage /></SimulationGate>) },
      { path: ROUTES.virtualInterview, element: lazyEl(<InterviewPage stage="hr" />) },
      { path: ROUTES.technicalInterview, element: lazyEl(<InterviewPage stage="technical" />) },
      { path: ROUTES.interview, element: <Navigate to={ROUTES.virtualInterview} replace /> },
      { path: ROUTES.portfolio, element: lazyEl(<PortfolioPage />) },
      { path: ROUTES.certificate, element: lazyEl(<CertificatePage />) },
      { path: ROUTES.readiness, element: lazyEl(<ReadinessPage />) },
      { path: ROUTES.notifications, element: lazyEl(<NotificationsPage />) }
    ]
  },
  { path: '*', element: lazyEl(<NotFoundPage />) }
])

function ProtectedRouteLazy({ children }: { children: React.ReactElement }): React.JSX.Element {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export function App(): React.JSX.Element {
  const toasts = useUiStore((s) => s.toasts)
  const dismissToast = useUiStore((s) => s.dismissToast)

  return (
    <>
      <RouterProvider router={router} />
      <ToastHost toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}
