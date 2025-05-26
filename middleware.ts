import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is not logged in and trying to access dashboard, redirect to login
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If user is logged in and trying to access dashboard
  if (session && req.nextUrl.pathname === '/dashboard') {
    const userRole = session.user.user_metadata.role;

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

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
}; 