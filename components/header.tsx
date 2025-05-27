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

function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const initials = user?.email?.slice(0, 2).toUpperCase() || 'U';
  const role = user?.user_metadata?.role || 'jobseeker';

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "You've been logged out successfully.",
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNavigation = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="focus:outline-none">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user?.user_metadata?.avatar_url || undefined}
            alt={user?.email}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <button
            onClick={() => handleNavigation(`/dashboard/${role}`)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavigation('/profile')}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={() => handleNavigation('/settings')}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          // Verify the session is still valid
          const { data: { user }, error: userError } = await supabase.auth.getUser();
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
        title: "Success",
        description: "You've been signed out successfully.",
      });
      
      router.push('/login');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  const getDashboardPath = () => {
    if (!userRole) return '/login';
    return `/dashboard/${userRole}`;
  };

  const getProfilePath = () => {
    if (!userRole) return '/login';
    return `/profile/${userRole}`;
  };

  const getSettingsPath = () => {
    if (!userRole) return '/login';
    return `/settings/${userRole}`;
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Hope and Hire Logo"
              width={120}
              height={48}
              className="h-auto"
              priority
            />
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-600 hover:text-teal ${
                  isActive(item.href) ? 'text-teal font-medium' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-teal flex items-center justify-center text-white">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardPath()}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={getProfilePath()}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={getSettingsPath()}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
            <Link href="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-teal text-white hover:bg-teal-dark">
                    Sign up
              </Button>
            </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-teal"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActive(item.href)
                    ? 'bg-teal-light/10 text-teal'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-teal'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 px-3 space-y-2">
              {user ? (
                <>
                  <Link href={`/dashboard/${userRole}`} className="block">
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href={`/profile/${userRole}`} className="block">
                    <Button variant="outline" className="w-full">
                      Profile
                    </Button>
                  </Link>
                  <Link href={`/settings/${userRole}`} className="block">
                    <Button variant="outline" className="w-full">
                      Settings
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full text-red-600"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
              <Link href="/login" className="block">
                    <Button variant="outline" className="w-full">
                      Sign in
                </Button>
              </Link>
                  <Link href="/register" className="block">
                    <Button className="w-full bg-teal text-white hover:bg-teal-dark">
                      Sign up
                    </Button>
              </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Export both as default and named export
export { Header };
