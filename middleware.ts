import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Get the auth cookie and user role
  const authCookie = req.cookies.get('sb-access-token');
  const userRole = req.cookies.get('user-role')?.value;

  console.log('Middleware Debug:', {
    path: req.nextUrl.pathname,
    hasAuthCookie: !!authCookie,
    userRole,
  });

  // If trying to access protected routes without auth, redirect to login
  if (
    (req.nextUrl.pathname.startsWith('/dashboard') || 
     req.nextUrl.pathname.startsWith('/messages') ||
     req.nextUrl.pathname.startsWith('/meetings') ||
     req.nextUrl.pathname.startsWith('/applications') ||
     req.nextUrl.pathname.startsWith('/resumes')) && 
    !authCookie
  ) {
    console.log('No auth cookie, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If trying to access dashboard with auth
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // If at root dashboard, redirect to role-specific dashboard
    if (req.nextUrl.pathname === '/dashboard') {
      if (userRole) {
        console.log('Redirecting to role-specific dashboard:', userRole);
        return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
      } else {
        console.log('No role found, redirecting to role selection');
        return NextResponse.redirect(new URL('/select-role', req.url));
      }
    }

    // Role-specific access control
    const pathRole = req.nextUrl.pathname.split('/')[2];
    if (pathRole && userRole && pathRole !== userRole) {
      console.log('Role mismatch, redirecting to correct dashboard');
      return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
    }

    // Additional role-specific route restrictions
    if (userRole === 'jobseeker') {
      // Job seekers can only access their own dashboard and communicate with volunteers
      if (req.nextUrl.pathname.includes('/employer') || 
          req.nextUrl.pathname.includes('/volunteer')) {
        return NextResponse.redirect(new URL('/dashboard/jobseeker', req.url));
      }
    } else if (userRole === 'volunteer') {
      // Volunteers can access all dashboards but with different permissions
      // This is handled in the individual components
    } else if (userRole === 'employer') {
      // Employers can only access their dashboard and communicate with volunteers
      if (req.nextUrl.pathname.includes('/jobseeker') || 
          req.nextUrl.pathname.includes('/volunteer')) {
        return NextResponse.redirect(new URL('/dashboard/employer', req.url));
      }
    }
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