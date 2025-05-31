'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@supabase/supabase-js';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          // Verify the session is still valid
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
          if (userError || !user) {
            // Session is invalid, clear it
            await supabase.auth.signOut();
            setUser(null);
            setUserRole('');
            return;
          }

          setUser(session.user);
          setUserRole(session.user.user_metadata.role || 'jobseeker');
        } else {
          setUser(null);
          setUserRole('');
        }
      } catch (error) {
        console.error('Session error:', error);
        setUser(null);
        setUserRole('');
      } finally {
        setIsLoading(false);
      }
    };
    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserRole('');
        router.push('/login');
      } else if (session?.user) {
        setUser(session.user);
        setUserRole(session.user.user_metadata.role || 'jobseeker');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: 'Job Seekers', href: '/job-seekers' },
    { name: 'Organizations', href: '/organizations' },
    { name: 'Volunteers', href: '/volunteers' },
    { name: 'Employers', href: '/employers' },
    { name: 'Resources', href: '/resources' },
    { name: 'FAQ', href: '/faq' },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear any local storage or cookies
      localStorage.removeItem('supabase.auth.token');

      toast({
        title: 'Success',
        description: "You've been signed out successfully.",
      });

      router.push('/login');
    } catch (error: unknown) {
      console.error('Sign out error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  const getDashboardPath = () => {
    if (!userRole) return '/login';
    return `/dashboard/${userRole}`;
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <header className="bg-white border-b">
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Hope & Hire"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-teal ${
                  isActive(item.href) ? 'text-teal' : 'text-gray-600 hover:text-teal'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu or Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="h-8 w-8 cursor-pointer">
                          <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
                          <AvatarFallback>{user?.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => router.push(getDashboardPath())}>
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/profile')}>
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/settings')}>
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                          Sign out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
            <Link href="/login">
                      <Button variant="ghost">Sign in</Button>
            </Link>
                    <Link href="/register">
                      <Button className="bg-teal text-white hover:bg-teal-dark">Sign up</Button>
            </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'bg-teal-light/10 text-teal'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-teal'
                  }`}
              >
                {item.name}
              </Link>
            ))}
              {!isLoading && !user && (
                <div className="mt-4 space-y-2">
              <Link href="/login" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign in
                </Button>
              </Link>
                  <Link href="/register" className="block">
                    <Button className="w-full bg-teal text-white hover:bg-teal-dark">
                      Sign up
                    </Button>
              </Link>
            </div>
              )}
          </div>
        </div>
      )}
      </nav>
    </header>
  );
}

// Export both as default and named export
export { Header };
