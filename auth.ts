import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, //todo
  callbacks: {
    authorized: async ({ request: req, auth }) => {
      const privateRoutes = ["/panel", "/checkout", "/onboarding", "/classroom"]
      const isLoginRoute = req.nextUrl.pathname.startsWith("/login")
      const isPrivateRoute = privateRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
      )

      if (!!auth) {
        if (isLoginRoute)
          return Response.redirect(new URL("/panel", req.nextUrl.origin))
        return true
      } else {
        if (isPrivateRoute && !isLoginRoute) return false
        return true
      }
    },
    async jwt({ token, user }) {
      if (user) return token

      if (token.sub) {
        const exists = await prisma.user.findUnique({
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
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
  basePath: "/api/auth",
  cookies: {
    sessionToken: {
      name: "user.session-token",
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      id: "user-login",
      name: "User Login",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user?.password) throw new Error("Invalid Credentials.")

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) throw new Error("Invalid Credentials.")

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
})
