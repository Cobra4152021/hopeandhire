import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // If user is not logged in and trying to access dashboard, redirect to login
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const authCookie = req.cookies.get('sb-access-token');
    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // If user is logged in and trying to access dashboard
  if (req.nextUrl.pathname === '/dashboard') {
    const authCookie = req.cookies.get('sb-access-token');
    if (authCookie) {
      // Get the user role from the cookie
      const userRole = req.cookies.get('user-role')?.value;

      // Redirect to role-specific dashboard
      switch (userRole) {
        case 'jobseeker':
          return NextResponse.redirect(new URL('/dashboard/jobseeker', req.url));
        case 'volunteer':
          return NextResponse.redirect(new URL('/dashboard/volunteer', req.url));
        case 'employer':
          return NextResponse.redirect(new URL('/dashboard/employer', req.url));
        default:
          // If no role is set, redirect to role selection
          return NextResponse.redirect(new URL('/select-role', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}; 