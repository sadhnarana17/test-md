import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect routes
export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token');

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/profile'];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};