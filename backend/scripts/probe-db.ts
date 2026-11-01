import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

config()
const url = process.env.DATABASE_URL ?? ''

if (!url || url.includes('YOUR_MYSQL_PASSWORD')) {
  console.log('DATABASE_URL_NOT_CONFIGURED')
  process.exit(2)
}

const prisma = new PrismaClient({ datasources: { db: { url } } })
try {
  await prisma.$queryRaw`SELECT 1`
  console.log('DB_CONNECTION_OK')
} catch (error) {
  const err = error as {
    name?: string
    code?: string
    message?: string
    clientVersion?: string
  }
  console.log(
    'DB_FAIL ' +
      JSON.stringify({
        name: err.name,
        code: err.code,
        message: err.message?.slice(0, 300),
        clientVersion: err.clientVersion
      })
  )
} finally {
  await prisma.$disconnect()
}
