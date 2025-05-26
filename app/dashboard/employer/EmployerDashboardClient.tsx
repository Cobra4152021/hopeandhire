'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { Calendar, Users, MessageSquare, Briefcase, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function EmployerDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('jobs');

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No user found, redirecting to login');
        router.push('/login');
        return;
      }
      console.log('User found:', user);
    };
    checkAuth();
  }, [router]);

  // Fetch employer stats
  const { data: stats } = useQuery({
    queryKey: ['employer-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get total jobs posted
      const { count: totalJobs } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('employer_id', user.id);

      // Get active jobs
      const { count: activeJobs } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('employer_id', user.id)
        .eq('status', 'active');

      // Get total applications (filtered by volunteer recruiter)
      const { count: totalApplications } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('employer_id', user.id)
        .eq('reviewed_by_volunteer', true);

      // Get unread messages (only from volunteers)
      const { count: unreadMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', user.id)
        .eq('is_read', false)
        .eq('sender_role', 'volunteer');

      return {
        totalJobs: totalJobs || 0,
        activeJobs: activeJobs || 0,
        totalApplications: totalApplications || 0,
        unreadMessages: unreadMessages || 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employer Dashboard</h1>
        <Button onClick={() => router.push('/dashboard/employer/post-job')}>
          Post New Job
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalJobs || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.activeJobs || 0} active jobs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalApplications || 0}</div>
            <p className="text-xs text-muted-foreground">
              Reviewed by volunteer recruiters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.unreadMessages || 0}</div>
            <p className="text-xs text-muted-foreground">
              From volunteer recruiters
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profile">Business Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          {/* Jobs list component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your posted jobs will appear here
          </div>
          {/* Example: Jobs list component */}
          <div className="border rounded p-4">
            <h3 className="font-bold">Example Posted Jobs</h3>
            <ul className="list-disc ml-6">
              <li>Job 1: Software Engineer</li>
              <li>Job 2: Data Analyst</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          {/* Applications component will go here */}
          <div className="text-center text-gray-500 py-8">
            Applications reviewed by volunteer recruiters will appear here
          </div>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          {/* Messages component will go here */}
          <div className="text-center text-gray-500 py-8">
            Messages from volunteer recruiters will appear here
          </div>
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          {/* Business profile component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your business profile will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 