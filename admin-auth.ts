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
  callbacks: {
    authorized: async ({ request: req, auth }) => {
      const privateRoutes = ["/admin"]
      const isLoginRoute = req.nextUrl.pathname.startsWith("/login/admin")
      const isPrivateRoute = privateRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
      )

      if (!!auth) {
        if (isLoginRoute)
          return Response.redirect(
            new URL("/admin/dashboard", req.nextUrl.origin)
          )
        return true
      } else {
        if (isPrivateRoute && !isLoginRoute) return false
        return true
      }
    },
    async jwt({ token, user }) {
      if (user) return token

      if (token.sub) {
        const exists = await prisma.admin.findUnique({
          where: { id: token.sub },
          select: { id: true },
        })
        if (!exists) {
          return null
        }
        token.id = exists.id
      }

      return token
    },
  },
  basePath: "/api/admin-auth",
  cookies: {
    sessionToken: {
      name: "admin.session-token",
    },
  },
  pages: {
    signIn: "/admin/login",
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
