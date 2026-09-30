import { adminAuth } from "@/admin-auth"
import { auth } from "@/auth"

export default function proxy(req: Request) {
  const pathname = new URL(req.url).pathname

  if (pathname.startsWith("/admin")) {
    return adminAuth(req as any)
  }

  return auth(req as any)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
