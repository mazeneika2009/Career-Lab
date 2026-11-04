import { env } from './env.js'

export function isLocalQaUnlocked(): boolean {
  return (
    env.LOCAL_QA_UNLOCK_ALL &&
    env.NODE_ENV !== 'test' &&
    env.APP_ENV !== 'test'
  )
}
