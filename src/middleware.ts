import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/authService";

export async function middleware(request: NextRequest) {
    const user = await getCurrentUser();
  const role = user?.role;

  // Check if request is to a protected route
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    // If not logged in or not admin
    if (role !== "ADMIN") {
      const loginUrl = new URL("/", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Protect only dashboard routes
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
