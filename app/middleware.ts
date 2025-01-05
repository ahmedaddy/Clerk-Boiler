import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function middleware(request: NextRequest) {
  // Get the user information from the Clerk auth API without passing the request
  const { userId } = await auth();

  // Check if user is not logged in
  if (!userId) {
    const loginUrl = new URL('/login', request.url); // request.url is guaranteed to be a string
    return NextResponse.redirect(loginUrl);
  }

  // Allow access if logged in
  return NextResponse.next();
}

export const config = {
  matcher: ['/userInfo', '/dashboard/:path*', '/settings'],
};
