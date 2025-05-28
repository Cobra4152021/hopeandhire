'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { Users, MessageSquare, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function VolunteerDashboardClient() {
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

  // Fetch volunteer stats
  const { data: stats } = useQuery({
    queryKey: ['volunteer-stats'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get total job seekers assigned
      const { count: totalJobSeekers } = await supabase
        .from('job_seekers')
        .select('*', { count: 'exact', head: true })
        .eq('assigned_volunteer_id', user.id);

      // Get pending applications to review
      const { count: pendingApplications } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('reviewed_by_volunteer', false);

      // Get total resumes to review
      const { count: pendingResumes } = await supabase
        .from('resumes')
        .select('*', { count: 'exact', head: true })
        .eq('reviewed_by_volunteer', false);

      // Get unread messages (from both job seekers and employers)
      const { count: unreadMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', user.id)
        .eq('is_read', false);

      // Get upcoming meetings
      const { count: upcomingMeetings } = await supabase
        .from('meetings')
        .select('*', { count: 'exact', head: true })
        .eq('volunteer_id', user.id)
        .eq('status', 'scheduled')
        .gte('date', new Date().toISOString());

      return {
        totalJobSeekers: totalJobSeekers || 0,
        pendingApplications: pendingApplications || 0,
        pendingResumes: pendingResumes || 0,
        unreadMessages: unreadMessages || 0,
        upcomingMeetings: upcomingMeetings || 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Volunteer Recruiter Dashboard</h1>
        <div className="space-x-2">
          <Button onClick={() => router.push('/dashboard/volunteer/schedule')}>
            Schedule Meeting
          </Button>
          <Button onClick={() => router.push('/dashboard/volunteer/review-resumes')}>
            Review Resumes
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Seekers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalJobSeekers || 0}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingApplications || 0}</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resumes</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingResumes || 0}</div>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.unreadMessages || 0}</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="resumes">Resumes</TabsTrigger>
          <TabsTrigger value="jobseekers">Job Seekers</TabsTrigger>
          <TabsTrigger value="employers">Employers</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          {/* Applications list component will go here */}
          <div className="text-center text-gray-500 py-8">
            Applications to review will appear here
          </div>
          {/* Example: Applications list component */}
          <div className="border rounded p-4">
            <h3 className="font-bold">Example Applications to Review</h3>
            <ul className="list-disc ml-6">
              <li>Application 1: Software Engineer at Tech Corp</li>
              <li>Application 2: Data Analyst at Data Inc</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="resumes" className="space-y-4">
          {/* Resumes list component will go here */}
          <div className="text-center text-gray-500 py-8">
            Resumes to review and optimize will appear here
          </div>
        </TabsContent>
        <TabsContent value="jobseekers" className="space-y-4">
          {/* Job seekers list component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your assigned job seekers will appear here
          </div>
        </TabsContent>
        <TabsContent value="employers" className="space-y-4">
          {/* Employers list component will go here */}
          <div className="text-center text-gray-500 py-8">
            Employer profiles and job postings will appear here
          </div>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          {/* Messages component will go here */}
          <div className="text-center text-gray-500 py-8">
            Messages from job seekers and employers will appear here
          </div>
        </TabsContent>
        <TabsContent value="meetings" className="space-y-4">
          {/* Meetings component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your scheduled meetings will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
