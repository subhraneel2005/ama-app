import { NextResponse } from "next/server";
import { authMiddleware } from "./lib/auth-middleware";

export const config = {
  matcher: ["/ama/:path*"],
};

export async function proxy(req: Request) {
  const isAuthenticated = await authMiddleware();
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated) return NextResponse.next();
}
