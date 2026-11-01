import { randomBytes, createHash, timingSafeEqual } from 'node:crypto'

const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

export function ulid(): string {
  let time = Date.now()
  let out = ''
  for (let i = 0; i < 10; i++) {
    out = ENCODING[time % 32]! + out
    time = Math.floor(time / 32)
  }
  const bytes = randomBytes(16)
  for (let i = 0; i < 8; i++) {
    const b = bytes[i] as number
    out += ENCODING[(b & 0xf8) >> 3]! + ENCODING[b & 0x1f]!
  }
  return out
}

export function randomToken(): string {
  return randomBytes(32).toString('base64url')
}

export function sha256Hex(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA)
    return false
  }
  return timingSafeEqual(bufA, bufB)
}
