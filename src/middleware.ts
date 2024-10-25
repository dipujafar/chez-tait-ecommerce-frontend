/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { authRoutes } from "./utils/authRoutes";
export default function middleware(req: any) {
  const { nextUrl } = req;

  const isLoggedIn = req.cookies.get("chez-tati-access-token")?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If user exists redirect to `/home`
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // // If user not found, redirect to `/login`
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: [
    "/favorites",
    "/user/:path*",
    "/checkout",
    "/review",
    "/favorite-products",
  ],
};
