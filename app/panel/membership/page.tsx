import { Check, Crown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { membershipPrice } from "@/lib/membership"
import { getActiveMembership, getSessionUser } from "@/lib/user"
import { Membership } from "@/prisma/generated/prisma/client"
import { prisma } from "@/prisma/prisma"
import { format } from "date-fns"
import Link from "next/link"
import { redirect } from "next/navigation"

const benefits = [
  "Access to all courses",
  "New courses as they're released",
  "Course completion certificates",
  "Access to Ask Tutor",
]

export default async function MembershipPage() {
  const user = await getSessionUser()
  if (!user) redirect("/login")
  const activeMembership = await getActiveMembership(user.id)

  const memberships = await prisma.membership.findMany({
    where: { userId: user.id },
  })
  const history = memberships.filter((m) => m.id !== activeMembership?.id)

  return (
    <div className="space-y-8">
      {activeMembership ? (
        <ActiveMembershipCard membership={activeMembership} />
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <Crown className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-4 font-medium">No active membership</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Get a membership to unlock every course on Parallane.
            </p>
            <Link href="/pricing">
              <Button className="mt-6">Get membership</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <div>
          <h2 className="font-semibold">Membership history</h2>
          <p className="text-sm text-muted-foreground">
            Your previous memberships.
          </p>
        </div>

        {history.length > 0 ? (
          <section className="space-y-4">
            <Card className="overflow-hidden py-0">
              <CardContent className="p-0">
                <div className="divide-y">
                  {history.map((m) => (
                    <div
                      key={m.id}
                      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium capitalize">
                            {m.period}
                          </p>
                          <Badge
                            variant={
                              m.status === "active" ? "success" : "secondary"
                            }
                            className="text-[10px] capitalize"
                          >
                            {m.status}
                          </Badge>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {format(m.startsAt, "MMM d, yyyy")} —{" "}
                          {format(m.expiresAt, "MMM d, yyyy")}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-4">
                        {m.price !== null && (
                          <span className="text-sm font-medium">
                            €{m.price}
                          </span>
                        )}

                        {m.createdAt && (
                          <span className="text-xs text-muted-foreground">
                            Paid {format(m.createdAt, "PP")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        ) : (
          <Card className="bg-none">
            <CardContent className="text-center text-muted-foreground">
              There is no membership hisroty.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

const ActiveMembershipCard = ({ membership }: { membership: Membership }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border">
              <Crown className="size-5" />
            </div>

            <div>
              <CardTitle>Parallane Membership</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Full access to the learning platform.
              </p>
            </div>
          </div>

          <Badge variant={"success"}>Active</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground capitalize">
              Plan:{" "}
              <span className="font-semibold text-foreground">
                {membership.period}
              </span>
            </p>

            <p className="mt-2 text-3xl font-semibold">
              €{membershipPrice[membership.period]}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / month
              </span>
            </p>

            <div className="mt-3">
              <p className="text-sm text-muted-foreground">
                Started From:{" "}
                <span className="text-foreground">
                  {format(membership.startsAt, "PPP")}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Next payment:{" "}
                <span className="text-foreground">
                  {format(membership.expiresAt, "PPP")}
                </span>
              </p>
            </div>

            {membership.period === "monthly" && (
              <div className="mt-6 flex gap-2">
                <Link href={"/checkout?plan=annual"} target="_blank">
                  <Button variant="outline">Upgrade to Annual</Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <p className="font-medium">Your membership includes</p>

            <div className="mt-4 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-sm">
                  <Check className="size-4" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
