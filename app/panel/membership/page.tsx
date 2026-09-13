import { Check, Crown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  "Access to all courses",
  "New courses as they're released",
  "Course completion certificates",
  "Access to Ask Tutor",
]

export default function MembershipPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-muted-foreground">Account</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          Membership
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your Parallane membership.
        </p>
      </section>

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
              <p className="text-sm text-muted-foreground">Current plan</p>

              <p className="mt-2 text-3xl font-semibold">
                $19
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Next payment: October 12, 2026
              </p>

              <div className="mt-6 flex gap-2">
                <Button variant="outline">Change plan</Button>

                <Button variant="ghost">Cancel membership</Button>
              </div>
            </div>

            <div>
              <p className="font-medium">Your membership includes</p>

              <div className="mt-4 space-y-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Check className="size-4" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
