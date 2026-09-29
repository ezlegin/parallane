import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const { error } = await resend.emails.send({
    from: "Parallane <admin@parallane.com>",
    to,
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>Click the link below to set a new password. This link expires in 1 hour.</p>
        <p>
          <a href="${resetUrl}" style="display:inline-block;background:#111;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;">
            Reset password
          </a>
        </p>
        <p style="color:#666;font-size:13px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  })

  if (error) throw new Error(error.message)
}
