'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { Briefcase, FileText, MessageSquare, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function JobSeekerDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('applications');

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.log('No user found, redirecting to login');
        router.push('/login');
        return;
      }
      console.log('User found:', user);
    };
    checkAuth();
  }, [router]);

  // Fetch job seeker stats
  const { data: stats } = useQuery({
    queryKey: ['jobseeker-stats'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get total applications
      const { count: totalApplications } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('job_seeker_id', user.id);

      // Get active applications
      const { count: activeApplications } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('job_seeker_id', user.id)
        .eq('status', 'active');

      // Get resume status
      const { data: resume } = await supabase
        .from('resumes')
        .select('*')
        .eq('job_seeker_id', user.id)
        .single();

      // Get unread messages (only from volunteers)
      const { count: unreadMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', user.id)
        .eq('is_read', false)
        .eq('sender_role', 'volunteer');

      // Get upcoming meetings with volunteer
      const { count: upcomingMeetings } = await supabase
        .from('meetings')
        .select('*', { count: 'exact', head: true })
        .eq('job_seeker_id', user.id)
        .eq('status', 'scheduled')
        .gte('date', new Date().toISOString());

      return {
        totalApplications: totalApplications || 0,
        activeApplications: activeApplications || 0,
        resumeStatus: resume?.status || 'not_uploaded',
        unreadMessages: unreadMessages || 0,
        upcomingMeetings: upcomingMeetings || 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Seeker Dashboard</h1>
        <div className="space-x-2">
          <Button onClick={() => router.push('/dashboard/jobseeker/upload-resume')}>
            Upload Resume
          </Button>
          <Button onClick={() => router.push('/dashboard/jobseeker/schedule')}>
            Schedule Meeting
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalApplications || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.activeApplications || 0} active applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resume</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {stats?.resumeStatus.replace('_', ' ')}
            </div>
            <p className="text-xs text-muted-foreground">Current status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.unreadMessages || 0}</div>
            <p className="text-xs text-muted-foreground">From volunteer recruiters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.upcomingMeetings || 0}</div>
            <p className="text-xs text-muted-foreground">With volunteer recruiters</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          {/* Applications list component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your job applications will appear here
          </div>
          {/* Example: Applications list component */}
          <div className="border rounded p-4">
            <h3 className="font-bold">Example Applications</h3>
            <ul className="list-disc ml-6">
              <li>Application 1: Software Engineer at Tech Corp</li>
              <li>Application 2: Data Analyst at Data Inc</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="resume" className="space-y-4">
          {/* Resume component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your resume and optimization suggestions will appear here
          </div>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          {/* Messages component will go here */}
          <div className="text-center text-gray-500 py-8">
            Messages from volunteer recruiters will appear here
          </div>
        </TabsContent>
        <TabsContent value="meetings" className="space-y-4">
          {/* Meetings component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your scheduled meetings with volunteer recruiters will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
