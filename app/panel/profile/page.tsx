"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/toast"

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState("Alex Morgan")
  const [password, setPassword] = useState("")

  function updateProfile() {
    // Save name through your API/server action.

    toast.add({ title: "Profile updated" })
  }

  function updatePassword() {
    // Save password through your API/server action.
    toast.add({ title: "Password updated" })
    setPassword("")
  }

  return (
    <div className="max-w-3xl space-y-8">
      <section>
        <p className="text-sm text-muted-foreground">Account</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your personal information and password.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>

          <CardDescription>
            Update the information associated with your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>

            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input id="email" type="email" value="alex@example.com" disabled />

            <p className="text-xs text-muted-foreground">
              Your email address cannot be changed.
            </p>
          </div>

          <Button onClick={updateProfile}>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>

          <CardDescription>
            Choose a new password for your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="pr-10"
                placeholder="Enter a new password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <Separator />

          <Button onClick={updatePassword} disabled={!password}>
            Update password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
