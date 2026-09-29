import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma/prisma"

export const {
  handlers: adminHandlers,
  signIn: adminSignIn,
  signOut: adminSignOut,
  auth: adminAuth,
} = NextAuth({
  basePath: "/api/admin-auth",
  cookies: {
    sessionToken: {
      name: "admin.session-token",
    },
  },
  pages: {
    signIn: "/login/admin",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "admin-login",
      name: "Admin Login",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const admin = await prisma.admin.findUnique({ where: { email } })
        if (!admin?.password) throw new Error("Invalid Credentials.")

        const ok = await bcrypt.compare(password, admin.password)
        if (!ok) throw new Error("Invalid Credentials.")

        return { id: admin.id, email: admin.email, name: admin.fullName }
      },
    }),
  ],
})
