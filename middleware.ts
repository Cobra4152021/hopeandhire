import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  // Get the Supabase auth cookie
  const supabaseToken = req.cookies.get('sb-auth-token')?.value;
  const supabaseRefreshToken = req.cookies.get('sb-refresh-token')?.value;

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    }
  );

  // Set the access token if it exists
  if (supabaseToken) {
    supabase.auth.setSession({
      access_token: supabaseToken,
      refresh_token: supabaseRefreshToken || '',
    });
  }

  // Check if trying to access protected routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // If no token, redirect to login
    if (!supabaseToken) {
      console.log('No auth token, redirecting to login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Verify the session and get user data
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(supabaseToken);

      console.log('[Middleware] User object from getUser:', user);
      console.log('[Middleware] Error from getUser:', error);

      if (error || !user) {
        console.log('[Middleware] Invalid session or no user, redirecting to login. Error:', error);
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Get the role from the URL (e.g., /dashboard/jobseeker -> jobseeker)
      const pathParts = req.nextUrl.pathname.split('/');
      const urlRole = pathParts.length > 2 ? pathParts[2] : null;
      console.log('[Middleware] URL role:', urlRole);

      // Get user's role from metadata
      const userRole = user.user_metadata?.role || 'jobseeker';
      console.log(
        '[Middleware] User metadata role:',
        user.user_metadata?.role,
        'Effective role:',
        userRole
      );

      // Only redirect if there's a role in the URL and it doesn't match the user's role
      if (
        urlRole &&
        ['jobseeker', 'volunteer', 'employer'].includes(urlRole) &&
        urlRole !== userRole
      ) {
        console.log(
          `[Middleware] Role mismatch: URL role "${urlRole}" !== User role "${userRole}". Redirecting to /dashboard/${userRole}`
        );
        return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
      }
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
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
