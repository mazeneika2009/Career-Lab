import type { PracticalEnvironment } from '../../../../../types/domain'
import type { IconName } from '../../../../ui/icon/Icon'

export interface PracticalWorkbenchProps {
  examPublicId: string
  starterCode: string
  restoreCode: string | null
  title: string
  brief?: string
  requirements: string[]
  language: string
  languageLabel: string
  submitting: boolean
  error: string | null
  submitLabel: string
  meta?: string
  onSubmit: (submission: string) => void
  onReset: () => void
  className?: string
}

export interface EnvironmentMeta {
  environment: PracticalEnvironment
  label: string
  icon: IconName
  blurb: string
}
