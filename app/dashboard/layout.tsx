'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  BarChart,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { supabase } from '@/lib/supabase';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'My Applications',
    href: '/dashboard/applications',
    icon: FileText,
  },
  {
    name: 'My Resumes',
    href: '/dashboard/resumes',
    icon: FileText,
  },
  {
    name: 'Job Search',
    href: '/dashboard/jobs',
    icon: Briefcase,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    name: 'Schedule Meeting',
    href: '/dashboard/schedule',
    icon: Calendar,
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

const volunteerNavigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Candidates',
    href: '/dashboard/candidates',
    icon: Users,
  },
  {
    name: 'Jobs',
    href: '/dashboard/jobs',
    icon: Briefcase,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: BarChart,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) => setUserRole(data?.user?.user_metadata?.role || null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserRole(session?.user?.user_metadata?.role || null);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const filteredNavigation = userRole === 'volunteer' ? volunteerNavigation : navigation;

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar>
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
                <span>Hope & Hire</span>
              </Link>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/';
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </Sidebar>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
