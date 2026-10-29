import { generateKeyPairSync } from 'node:crypto'
import { mkdirSync, writeFileSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const keysDir = process.env.KEYS_OUTPUT_DIR ?? join(__dirname, '..', 'keys')

if (!existsSync(keysDir)) {
  mkdirSync(keysDir, { recursive: true })
}

for (const file of readdirSync(keysDir)) {
  if (file.endsWith('.pem')) rmSync(join(keysDir, file))
}

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
})

writeFileSync(join(keysDir, 'jwt-private.pem'), privateKey, { mode: 0o600 })
writeFileSync(join(keysDir, 'jwt-public.pem'), publicKey)

process.stdout.write(`JWT keypair written to ${keysDir}\n`)
