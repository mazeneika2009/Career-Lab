import { config } from 'dotenv'
import { resolve } from 'node:path'

config({ path: resolve(process.cwd(), '.env'), quiet: true })

const base = process.env.DATABASE_URL ?? ''

if (!base) {
  throw new Error(
    'DATABASE_URL is missing. Copy backend/.env.example to backend/.env and set your MySQL credentials before running tests.'
  )
}

if (!/\/career_lab(\?|$)/.test(base)) {
  throw new Error(
    `Expected DATABASE_URL to point at the "career_lab" database, got: ${base.replace(/:\/\/[^@]*@/, '://***@')}`
  )
}

const testDatabaseUrl = base.replace(/\/career_lab(\?|$)/, '/career_lab_test$1')

process.env.NODE_ENV = 'test'
process.env.APP_ENV = 'test'
process.env.LOG_LEVEL = 'warn'
process.env.DATABASE_URL = testDatabaseUrl
process.env.COOKIE_SECURE = 'false'
process.env.APP_WEB_URL = process.env.APP_WEB_URL || 'http://localhost:5173'
process.env.CORS_ORIGINS = process.env.CORS_ORIGINS || 'http://localhost:5173'
process.env.JWT_PRIVATE_KEY_PATH = 'keys-test/jwt-private.pem'
process.env.JWT_PUBLIC_KEYS_DIR = 'keys-test'
