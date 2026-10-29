import { execSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from 'dotenv'

export default function globalSetup(): void {
  rmSync('keys-test', { recursive: true, force: true })
  mkdirSync('keys-test', { recursive: true })

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

  const testEnv = {
    ...process.env,
    DATABASE_URL: testDatabaseUrl,
    KEYS_OUTPUT_DIR: 'keys-test',
    JWT_PRIVATE_KEY_PATH: 'keys-test/jwt-private.pem',
    JWT_PUBLIC_KEYS_DIR: 'keys-test',
    APP_ENV: 'test'
  }

  execSync('npx tsx scripts/generate-keys.ts', { stdio: 'inherit', env: testEnv })
  execSync('npx prisma db push --force-reset --skip-generate', {
    stdio: 'inherit',
    env: testEnv
  })
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit', env: testEnv })
}
