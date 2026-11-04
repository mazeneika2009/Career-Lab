import type { PracticalEnvironment } from '../../../../../types/domain'
import { PracticalWorkbench } from '../PracticalWorkbench'
import { AIWorkbench } from './AIWorkbench'
import { BusinessWorkbench } from './BusinessWorkbench'
import { DatabaseWorkbench } from './DatabaseWorkbench'
import { DesignWorkbench } from './DesignWorkbench'
import { NetworkWorkbench } from './NetworkWorkbench'
import { WritingWorkbench } from './WritingWorkbench'
import type { EnvironmentMeta, PracticalWorkbenchProps } from './types'

const ENVIRONMENT_META: Record<PracticalEnvironment, EnvironmentMeta> = {
  code: { environment: 'code', label: 'Code editor', icon: 'terminal', blurb: 'Write and run production-style code.' },
  database: { environment: 'database', label: 'SQL workbench', icon: 'layers', blurb: 'Query a realistic schema.' },
  design: { environment: 'design', label: 'Design canvas', icon: 'layers', blurb: 'Compose and justify a screen.' },
  network: { environment: 'network', label: 'Network lab', icon: 'route', blurb: 'Build a topology and configuration.' },
  ai: { environment: 'ai', label: 'AI notebook', icon: 'zap', blurb: 'Build and evaluate a model pipeline.' },
  business: { environment: 'business', label: 'Campaign planner', icon: 'trending-up', blurb: 'Plan channels, budget and KPIs.' },
  writing: { environment: 'writing', label: 'Writing studio', icon: 'file-text', blurb: 'Draft and structure a document.' }
}

export function environmentMeta(environment: PracticalEnvironment | undefined): EnvironmentMeta {
  return ENVIRONMENT_META[environment ?? 'code']
}

export function isPracticalEnvironment(value: unknown): value is PracticalEnvironment {
  return typeof value === 'string' && value in ENVIRONMENT_META
}

export function DynamicPracticalWorkbench({
  environment,
  ...props
}: PracticalWorkbenchProps & { environment?: PracticalEnvironment }): React.JSX.Element {
  switch (environment) {
    case 'database':
      return <DatabaseWorkbench {...props} />
    case 'design':
      return <DesignWorkbench {...props} />
    case 'network':
      return <NetworkWorkbench {...props} />
    case 'ai':
      return <AIWorkbench {...props} />
    case 'business':
      return <BusinessWorkbench {...props} />
    case 'writing':
      return <WritingWorkbench {...props} />
    case 'code':
    default:
      return <PracticalWorkbench {...props} />
  }
}
