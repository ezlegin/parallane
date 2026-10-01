import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const resend = new Resend(resendApiKey)

const from = "Parallane <admin@parallane.com>"
export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const { error } = await resend.emails.send({
    from,
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

export async function sendContactEmail(
  to: string,
  subject: string,
  message: string
) {
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Response to "${subject}"`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #e4e4e7;">
              <h1 style="margin:0;font-size:18px;font-weight:600;color:#18181b;">
               Response to Contact Message.
              </h1>
              <p style="margin:4px 0 0;font-size:13px;color:#71717a;">
               Subject: ${escapeHtml(subject)}
              </p>
            </td>
          </tr>

          <!-- Sender info -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#71717a;">
                From
              </p>
              <p style="margin:0;font-size:15px;font-weight:600;color:#18181b;">
               Parallane
              </p>
              <p style="margin:2px 0 0;font-size:14px;color:#52525b;">
                <a href="mailto:parllane.com@gmail.com" style="color:#2563eb;text-decoration:none;">
                  parllane.com@gmail.com
                </a>
              </p>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="padding:16px 32px 32px;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#71717a;">
                Message
              </p>
              <div style="padding:12px;background-color:#fafafa;border:1px solid #e4e4e7;border-radius:8px;font-size:14px;line-height:1.6;color:#18181b;white-space:pre-wrap;">
${escapeHtml(message)}
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 32px;">
              <a href="https://parallane.com/panel"
                 style="display:inline-block;padding:10px 20px;background-color:#18181b;color:#ffffff;font-size:14px;font-weight:500;text-decoration:none;border-radius:8px;">
                Log into parallane panel
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #e4e4e7;background-color:#fafafa;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;text-align:center;">
                do not reply this email. for more contact, please send email to "parllane.com@gmail.com"
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  })

  if (error) throw new Error(error.message)
}

// Prevents HTML injection if a user types `<script>` or `<img onerror=...>`
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
