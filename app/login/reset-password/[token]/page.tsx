import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import GlowingStroke from "@/components/GlowingStroke"
import { validateResetToken } from "@/actions/password-reset"
import ResetPasswordForm from "@/components/forms/login/ResetPasswordForm"

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const result = await validateResetToken(token)

  if (!result.valid) {
    return (
      <div className="w-full space-y-6 sm:max-w-sm">
        <Card className="relative">
          <GlowingStroke />
          <CardContent className="space-y-4 text-center">
            <h1 className="text-lg font-semibold">Link expired or invalid</h1>
            <p className="text-sm text-muted-foreground">
              This password reset link is no longer valid. Request a new one.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/login/forgot-password" className="w-full">
              <Button size="lg" className="w-full">
                Request a new link
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return <ResetPasswordForm token={token} />
}
