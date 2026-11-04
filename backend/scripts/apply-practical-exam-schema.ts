/**
 * Apply and verify Prisma columns required to persist practical exam reviews.
 *
 * Usage:
 *   npm run apply:practical-exam-schema
 *
 * Uses DATABASE_URL (or the configured MYSQL_* variables through Prisma).
 * Safe to rerun: only missing nullable columns are added.
 */
import { config as loadEnv } from 'dotenv'
import { PrismaClient } from '@prisma/client'

loadEnv()

const prisma = new PrismaClient()
const REQUIRED_COLUMNS = {
  feedback: 'JSON NULL',
  language: 'VARCHAR(40) NULL'
} as const

async function main(): Promise<void> {
  try {
    const tables = await prisma.$queryRaw<Array<{ tableName: string }>>`
      SELECT TABLE_NAME AS tableName
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'exam_attempts'
    `
    if (tables.length === 0) {
      throw new Error('The exam_attempts table was not found in the configured MySQL database.')
    }

    const columns = await prisma.$queryRaw<Array<{ columnName: string }>>`
      SELECT COLUMN_NAME AS columnName
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'exam_attempts'
        AND COLUMN_NAME IN ('feedback', 'language')
    `
    const present = new Set(columns.map((column) => column.columnName))

    for (const [column, definition] of Object.entries(REQUIRED_COLUMNS)) {
      if (present.has(column)) continue
      await prisma.$executeRawUnsafe(
        `ALTER TABLE \`exam_attempts\` ADD COLUMN \`${column}\` ${definition}`
      )
      console.log(`Added exam_attempts.${column}.`)
    }

    const verified = await prisma.$queryRaw<Array<{ columnName: string }>>`
      SELECT COLUMN_NAME AS columnName
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'exam_attempts'
        AND COLUMN_NAME IN ('feedback', 'language')
    `
    const verifiedColumns = new Set(verified.map((column) => column.columnName))
    const missing = Object.keys(REQUIRED_COLUMNS).filter((column) => !verifiedColumns.has(column))
    if (missing.length > 0) {
      throw new Error(`Practical exam schema verification failed; missing: ${missing.join(', ')}.`)
    }
    console.log('Practical exam schema verification passed.')
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
