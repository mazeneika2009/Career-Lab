import { achievementsApi } from '../api/learning'
import { useAsync } from './useAsync'
import type { CertificateStatus } from '../types/domain'
import { isLocalQaMode } from '../utils/localQa'

export function useCertificateGate(refreshKey: unknown = null): {
  data: CertificateStatus | null
  issued: boolean
  loading: boolean
  error: unknown
  reload: () => void
} {
  const state = useAsync(() => achievementsApi.certificate(), [refreshKey])
  return {
    data: state.data,
    issued: isLocalQaMode() || state.data?.status === 'issued',
    loading: state.loading,
    error: state.error,
    reload: state.reload
  }
}
