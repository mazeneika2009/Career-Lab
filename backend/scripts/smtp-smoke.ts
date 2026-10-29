import { env } from '../src/config/env.js'
import {
  isSmtpConfigured,
  sendVerificationEmail,
  verifySmtpConnection
} from '../src/services/email.service.js'

const recipient = process.argv[2] ?? env.SMTP_USER

if (!isSmtpConfigured()) {
  console.error('SMTP TEST FAILED: SMTP_HOST is not set in backend/.env — emails are only logged to console.')
  process.exit(1)
}

console.log(`Testing SMTP ${env.SMTP_HOST}:${env.SMTP_PORT} (secure=${env.SMTP_SECURE}) as ${env.SMTP_USER ?? 'anonymous'}...`)

try {
  await verifySmtpConnection()
  console.log('OK: SMTP connection and authentication succeeded.')
} catch (error) {
  console.error('SMTP TEST FAILED: could not connect/authenticate.')
  console.error(error)
  process.exit(1)
}

if (!recipient) {
  console.error('SMTP TEST FAILED: no recipient. Pass one: npm run smtp:test -- you@gmail.com')
  process.exit(1)
}

try {
  await sendVerificationEmail(recipient, `${env.APP_WEB_URL}/verify-email?token=smoke-test`)
  console.log(`OK: test email sent to ${recipient}. Check the inbox (and spam).`)
} catch (error) {
  console.error('SMTP TEST FAILED: sendMail rejected the message.')
  console.error(error)
  process.exit(1)
}
