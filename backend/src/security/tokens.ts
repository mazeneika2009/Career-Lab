import { readFileSync, readdirSync } from 'node:fs'
import { createHash, createPrivateKey, createPublicKey, type KeyObject } from 'node:crypto'
import { join } from 'node:path'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { env } from '../config/env.js'
import { AUDIENCE, ISSUER } from '../config/constants.js'
import { randomToken } from '../utils/ids.js'

const ALG = 'RS256'

interface LoadedKeys {
  private: KeyObject
  kid: string
  publicByKeyId: Map<string, KeyObject>
}

let loadedKeys: LoadedKeys | null = null

function fingerprint(pem: string): string {
  return createHash('sha256').update(pem).digest('hex').slice(0, 8)
}

/** Decode a base64-encoded PEM and fail early on a malformed value. */
function decodeBase64Pem(value: string, variable: string): string {
  const pem = Buffer.from(value, 'base64').toString('utf8').trim()
  if (!pem.includes('-----BEGIN')) {
    throw new Error(`${variable} must contain a base64-encoded PEM key.`)
  }
  return `${pem}\n`
}

function loadPrivatePem(): string {
  if (env.JWT_PRIVATE_KEY_BASE64) {
    return decodeBase64Pem(env.JWT_PRIVATE_KEY_BASE64, 'JWT_PRIVATE_KEY_BASE64')
  }
  if (env.JWT_PRIVATE_KEY_PATH) {
    return readFileSync(env.JWT_PRIVATE_KEY_PATH, 'utf8')
  }
  throw new Error(
    'No JWT private key configured. Set JWT_PRIVATE_KEY_BASE64 (deployed) or JWT_PRIVATE_KEY_PATH (local).'
  )
}

function loadPublicPems(): string[] {
  if (env.JWT_PUBLIC_KEYS_BASE64) {
    // Comma-separated values support key rotation without bundling files.
    return env.JWT_PUBLIC_KEYS_BASE64.split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => decodeBase64Pem(value, 'JWT_PUBLIC_KEYS_BASE64'))
  }
  if (env.JWT_PUBLIC_KEYS_DIR) {
    const dir = env.JWT_PUBLIC_KEYS_DIR
    return readdirSync(dir)
      .filter((file) => /^jwt-public.*\.pem$/.test(file))
      .map((file) => readFileSync(join(dir, file), 'utf8'))
  }
  throw new Error(
    'No JWT public keys configured. Set JWT_PUBLIC_KEYS_BASE64 (deployed) or JWT_PUBLIC_KEYS_DIR (local).'
  )
}

function loadKeys(): LoadedKeys {
  if (loadedKeys) return loadedKeys
  const privatePem = loadPrivatePem()
  const privateKey = createPrivateKey(privatePem)
  const kid = fingerprint(createPublicKey(privateKey).export({ type: 'spki', format: 'pem' }).toString())

  const publicByKeyId = new Map<string, KeyObject>()
  for (const pem of loadPublicPems()) {
    publicByKeyId.set(fingerprint(pem), createPublicKey(pem))
  }
  if (publicByKeyId.size === 0) {
    throw new Error('No JWT public keys found. Run "npm run generate-keys" first.')
  }
  loadedKeys = { private: privateKey, kid, publicByKeyId }
  return loadedKeys
}

export interface AccessTokenClaims extends JWTPayload {
  sub: string
  sid: string
  roles: string[]
  phash: string
  jti: string
}

export async function signAccessToken(input: {
  subjectPublicId: string
  sessionPublicId: string
  roles: string[]
  permissionSetHash: string
}): Promise<string> {
  const keys = loadKeys()
  return new SignJWT({
    sid: input.sessionPublicId,
    roles: input.roles,
    phash: input.permissionSetHash
  })
    .setProtectedHeader({ alg: ALG, kid: keys.kid })
    .setSubject(input.subjectPublicId)
    .setIssuedAt()
    .setJti(randomToken())
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(`${env.ACCESS_TOKEN_TTL_MINUTES}m`)
    .sign(keys.private)
}

export async function verifyAccessToken(token: string): Promise<AccessTokenClaims> {
  const keys = loadKeys()
  let headerKid: string | undefined
  try {
    const protectedHeader = decodeProtectedHeaderSafe(token)
    headerKid = protectedHeader?.kid
  } catch {
    headerKid = undefined
  }
  const key = headerKid ? keys.publicByKeyId.get(headerKid) : undefined
  if (!key) {
    throw new Error('unknown_kid')
  }
  const { payload } = await jwtVerify(token, key, {
    algorithms: [ALG],
    issuer: ISSUER,
    audience: AUDIENCE
  })
  if (
    typeof payload.sub !== 'string' ||
    typeof payload.sid !== 'string' ||
    !Array.isArray(payload.roles) ||
    typeof payload.phash !== 'string'
  ) {
    throw new Error('malformed_claims')
  }
  return payload as AccessTokenClaims
}

function decodeProtectedHeaderSafe(token: string): { kid?: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3 || !parts[0]) return null
    const json = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'))
    return typeof json?.kid === 'string' ? { kid: json.kid } : {}
  } catch {
    return null
  }
}

export function mintOpaqueToken(): string {
  return randomToken()
}
