import { sha256Hex } from '../utils/ids.js'
import {
  mintOpaqueToken,
  signAccessToken
} from '../security/tokens.js'

export function permissionSetHash(permissions: string[]): string {
  return sha256Hex([...permissions].sort().join('\u0000')).slice(0, 16)
}

export async function issueAccessToken(input: {
  subjectPublicId: string
  sessionPublicId: string
  roles: string[]
  permissions: string[]
}): Promise<string> {
  return signAccessToken({
    subjectPublicId: input.subjectPublicId,
    sessionPublicId: input.sessionPublicId,
    roles: input.roles,
    permissionSetHash: permissionSetHash(input.permissions)
  })
}

export { mintOpaqueToken }
