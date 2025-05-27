import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Get the Supabase auth cookie
  const supabaseToken = req.cookies.get('sb-token')?.value;

  console.log('Middleware Debug:', {
    path: req.nextUrl.pathname,
    hasToken: !!supabaseToken,
  });

  // If trying to access protected routes without auth, redirect to login
  if (
    (req.nextUrl.pathname.startsWith('/dashboard') || 
     req.nextUrl.pathname.startsWith('/messages') ||
     req.nextUrl.pathname.startsWith('/meetings') ||
     req.nextUrl.pathname.startsWith('/applications') ||
     req.nextUrl.pathname.startsWith('/resumes')) && 
    !supabaseToken
  ) {
    console.log('No auth token, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow access to public pages
  if (['/volunteers', '/employers', '/jobseekers'].includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/messages/:path*',
    '/meetings/:path*',
    '/applications/:path*',
    '/resumes/:path*',
    '/volunteers',
    '/employers',
    '/jobseekers',
  ],
}; 