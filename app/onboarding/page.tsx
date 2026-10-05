import { CountryOnboardingForm } from "@/components/forms/onboarding-form"
import { getSessionUser } from "@/lib/user"
import { Sparkles } from "lucide-react"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Onboarding",
}

export default async function OnboardingPage() {
  const user = await getSessionUser()
  if (!user) redirect("/login")
  if (user.isOnboardingCompleted) redirect("/panel")

  const firstName = user.name.split(" ")[0]

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-150 w-250 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[140px]"
      />

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-xl">
        {/* Welcome card */}
        <WelcomeCard firstName={firstName} />

        {/* Existing onboarding form */}
        <CountryOnboardingForm userId={user.id} />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Parallane. Learn. Build. Grow.
        </p>
      </div>
    </main>
  )
}

// ---------- Welcome card ----------

function WelcomeCard({ firstName }: { firstName: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl rounded-b-none border border-b-0 border-border/60 bg-linear-to-b from-muted/40 to-background px-6 py-6 shadow-xl sm:px-8">
      {/* Emerald halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="relative flex items-center gap-4">
        {/* Icon block */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/6">
          <Sparkles className="size-5 text-emerald-500" strokeWidth={1.75} />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <h1 className="text-xl leading-tight font-semibold tracking-[-0.02em] sm:text-2xl">
            {firstName ? (
              <>Hey {firstName}, </>
            ) : (
              <>
                Let's build{" "}
                <span className="text-muted-foreground">
                  something together.
                </span>
              </>
            )}
          </h1>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            We're glad you're here. Before you begin your learning journey, tell
            us which country you're from.
          </p>
        </div>
      </div>
    </div>
  )
}
