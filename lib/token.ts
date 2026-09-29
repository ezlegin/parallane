import crypto from "crypto"

const TOKEN_BYTES = 32
const TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

export function generateResetToken() {
  const raw = crypto.randomBytes(TOKEN_BYTES).toString("hex")
  const tokenHash = hashToken(raw)
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS)

  return { raw, tokenHash, expiresAt }
}

export function hashToken(raw: string) {
  return crypto.createHash("sha256").update(raw).digest("hex")
}
