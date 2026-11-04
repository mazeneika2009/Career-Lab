import { useState } from 'react'
import { achievementsApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { LoadingState, PageHeader, Panel, StatusText } from '../../components/app/primitives'
import { Button } from '../../components/ui/button/Button'
import { Icon } from '../../components/ui/icon/Icon'
import { useTranslation } from '../../i18n'
import type { CertificateStatus } from '../../types/domain'

const CHECKLIST_KEYS: Array<[key: string, labelKey: string]> = [
  ['learningComplete', 'certificate.requirementLearning'],
  ['allTheoryExamsPassed', 'certificate.requirementTheory'],
  ['practicalExamPassed', 'certificate.requirementPractical'],
  ['assignmentsPassed', 'certificate.requirementAssignments'],
  ['simulationEngaged', 'certificate.requirementSimulation'],
  ['interviewCompleted', 'certificate.requirementInterview']
]

type IssuedCertificate = NonNullable<CertificateStatus['certificate']>

function formatDate(value: string, language: string): string {
  return new Date(value).toLocaleDateString(language === 'ar' ? 'ar' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function CertificateSeal(): React.JSX.Element {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-accent/30" />
      <span className="absolute inset-1.5 rounded-full border border-dashed border-accent/25" />
      <span className="absolute inset-3 rounded-full bg-accent/[0.06]" />
      <Icon name="award" className="relative h-7 w-7 text-accent" />
    </div>
  )
}

function CertificateSheet({ certificate }: { certificate: IssuedCertificate }): React.JSX.Element {
  const { t, language } = useTranslation()
  const issued = formatDate(certificate.issuedAt, language)

  return (
    <div
      data-certificate
      className="certificate-sheet relative overflow-hidden rounded-xl border border-border bg-[#fbf9f4] p-2 shadow-[0_18px_60px_-30px_rgba(20,32,27,0.45)] sm:p-3"
    >
      <div className="relative overflow-hidden rounded-lg border border-[#c9b892]/60 bg-[radial-gradient(circle_at_12%_8%,rgba(181,101,29,0.08),transparent_38%),radial-gradient(circle_at_88%_92%,rgba(20,32,27,0.07),transparent_42%)] px-6 py-10 sm:px-12 sm:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-4 rounded border border-[#c9b892]/35" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#c9b892_0.6px,transparent_0.6px)] [background-size:16px_16px]" />

        <div className="relative">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold tracking-tight text-surface">
                CL
              </span>
              <div>
                <p className="font-display text-sm font-bold tracking-[0.18em] text-primary">CAREER LAB</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary/45">{t('certificate.brandTagline')}</p>
              </div>
            </div>
            <div className="text-end">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/40">{t('certificate.serial')}</p>
              <p className="mt-0.5 font-mono text-xs text-primary/70">{certificate.serial}</p>
            </div>
          </header>

          <div className="mt-10 text-center sm:mt-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              {t('certificate.title')}
            </p>
            <p className="mt-4 font-display text-lg text-primary/60">{t('certificate.awardedTo')}</p>
            <h1 className="mx-auto mt-3 max-w-2xl text-balance font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-primary sm:text-[2.6rem]">
              {certificate.studentName}
            </h1>
            <div aria-hidden className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <p className="mt-5 text-sm text-primary/60">{t('certificate.hasCompleted')}</p>
            <p className="mx-auto mt-2 max-w-2xl text-balance font-display text-xl font-semibold text-primary sm:text-2xl">
              {certificate.careerName}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-primary/45">
              {t('certificate.careerProgram')}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 sm:mt-12">
            <div className="min-w-[150px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/40">{t('certificate.issuedOn')}</p>
              <p className="mt-1 text-sm font-medium text-primary">{issued}</p>
              <div aria-hidden className="mt-1.5 h-px w-32 bg-primary/15" />
            </div>

            <CertificateSeal />

            <div className="min-w-[150px] text-end">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/40">{t('certificate.status')}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-info">
                <Icon name="shield-check" className="h-4 w-4" />
                {t('certificate.valid')}
              </p>
              <div aria-hidden className="ms-auto mt-1.5 h-px w-32 bg-primary/15" />
            </div>
          </div>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#c9b892]/40 pt-4 text-[10px] uppercase tracking-[0.14em] text-primary/40">
            <span>{t('certificate.verify')}</span>
            <span className="font-mono normal-case tracking-normal">{certificate.publicId}</span>
          </footer>
        </div>
      </div>
    </div>
  )
}

async function downloadCertificatePdf(
  certificate: IssuedCertificate,
  language: string,
  labels: { title: string; awardedTo: string; completed: string; program: string; issued: string; serial: string; valid: string }
): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()
  const center = width / 2

  doc.setFillColor(251, 249, 244)
  doc.rect(0, 0, width, height, 'F')
  doc.setDrawColor(201, 184, 146)
  doc.setLineWidth(0.8)
  doc.rect(8, 8, width - 16, height - 16)
  doc.setLineWidth(0.3)
  doc.rect(11, 11, width - 22, height - 22)

  doc.setFillColor(20, 32, 27)
  doc.roundedRect(22, 20, 13, 13, 2, 2, 'F')
  doc.setTextColor(245, 239, 228)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('CL', 28.5, 28.4, { align: 'center' })

  doc.setTextColor(20, 32, 27)
  doc.setFontSize(12)
  doc.text('CAREER LAB', 39, 26)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(120, 120, 110)
  doc.text('LEARN THE WORK. PROVE THE SKILL.', 39, 30.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(181, 101, 29)
  doc.text(labels.title.toUpperCase(), center, 53, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(90, 95, 88)
  doc.text(labels.awardedTo, center, 64, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(20, 32, 27)
  doc.text(certificate.studentName, center, 80, { align: 'center', maxWidth: width - 60 })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(90, 95, 88)
  doc.text(labels.completed, center, 93, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(17)
  doc.setTextColor(20, 32, 27)
  doc.text(certificate.careerName, center, 104, { align: 'center', maxWidth: width - 60 })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 110)
  doc.text(labels.program.toUpperCase(), center, 112, { align: 'center' })

  const issued = formatDate(certificate.issuedAt, language)
  doc.setDrawColor(20, 32, 27)
  doc.setLineWidth(0.2)
  doc.line(32, 140, 72, 140)
  doc.line(width - 72, 140, width - 32, 140)

  doc.setFontSize(8)
  doc.setTextColor(120, 120, 110)
  doc.text(labels.issued.toUpperCase(), 32, 145)
  doc.text(labels.valid.toUpperCase(), width - 32, 145, { align: 'right' })

  doc.setFontSize(10)
  doc.setTextColor(20, 32, 27)
  doc.text(issued, 32, 151)
  doc.text(labels.valid, width - 32, 151, { align: 'right' })

  doc.setFontSize(7)
  doc.setTextColor(150, 145, 132)
  doc.text(`${labels.serial}: ${certificate.serial}`, 32, height - 18)
  doc.text(certificate.publicId, width - 32, height - 18, { align: 'right' })

  doc.save(`${certificate.studentName.replace(/\s+/g, '-').toLowerCase()}-career-lab-certificate.pdf`)
}

export default function CertificatePage(): React.JSX.Element {
  const state = useAsync(() => achievementsApi.certificate(), [])
  const { t, language } = useTranslation()
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  if (data.status === 'issued' && data.certificate) {
    const certificate = data.certificate
    const download = async (): Promise<void> => {
      setDownloading(true)
      setDownloadError(null)
      try {
        await downloadCertificatePdf(certificate, language, {
          title: t('certificate.title'),
          awardedTo: t('certificate.awardedTo'),
          completed: t('certificate.hasCompleted'),
          program: t('certificate.careerProgram'),
          issued: t('certificate.issuedOn'),
          serial: t('certificate.serial'),
          valid: t('certificate.valid')
        })
      } catch {
        setDownloadError(t('certificate.pdfFailed'))
      } finally {
        setDownloading(false)
      }
    }

    return (
      <div>
        <PageHeader
          eyebrow={t('certificate.eyebrow')}
          title={t('certificate.title')}
          description={t('certificate.subtitle')}
          actions={
            <>
              <Button variant="secondary" size="sm" onClick={() => window.print()}>
                <Icon name="file-text" className="h-3.5 w-3.5" />
                {t('certificate.print')}
              </Button>
              <Button size="sm" onClick={() => void download()} loading={downloading}>
                <Icon name="award" className="h-3.5 w-3.5" />
                {downloading ? t('certificate.downloading') : t('certificate.downloadPdf')}
              </Button>
            </>
          }
        />

        {downloadError ? (
          <p className="mb-4 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{downloadError}</p>
        ) : null}

        <div className="mx-auto max-w-4xl">
          <CertificateSheet certificate={certificate} />
        </div>
      </div>
    )
  }

  const missing = data.requirements?.missing ?? []

  return (
    <div>
      <PageHeader
        eyebrow={t('certificate.eyebrow')}
        title={t('certificate.title')}
        description={t('certificate.missingBody')}
      />

      <Panel title={t('certificate.outstanding', { count: missing.length })} icon="shield-check">
        <ul className="space-y-2.5">
          {CHECKLIST_KEYS.map(([key, labelKey]) => {
            const done = data.requirements ? Boolean(data.requirements.checklist[key]) : false
            return (
              <li key={key} className="flex items-center gap-3 text-sm">
                <StatusText tone={done ? 'completed' : 'not_started'} />
                <span className={done ? 'text-primary/60 line-through' : 'font-medium text-primary'}>
                  {t(labelKey)}
                </span>
              </li>
            )
          })}
        </ul>
        <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-primary/55">
          {t('certificate.eligibilityNote')}
        </p>
      </Panel>
    </div>
  )
}
