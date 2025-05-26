'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApplicationsList } from './ApplicationsList';
import { ProfileForm } from './ProfileForm';
import { ResumesList } from './ResumesList';

interface Application {
  id: number;
  status: string;
}

export default function JobSeekerDashboardClient() {
  const [activeTab, setActiveTab] = useState('applications');

  const { data: stats } = useQuery({
    queryKey: ['jobseeker-stats'],
    queryFn: async () => {
      const { data: applications, error: applicationsError } = await supabase
        .from('job_applications')
        .select('id, status')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (applicationsError) throw applicationsError;

      const { data: resumes, error: resumesError } = await supabase
        .from('resumes')
        .select('id')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (resumesError) throw resumesError;

      return {
        totalApplications: applications.length,
        pendingApplications: applications.filter(
          (app: Application) => app.status === 'pending'
        ).length,
        acceptedApplications: applications.filter(
          (app: Application) => app.status === 'accepted'
        ).length,
        totalResumes: resumes.length,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Seeker Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalApplications || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.pendingApplications || 0} pending applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Accepted Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.acceptedApplications || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalResumes || 0} resumes uploaded
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="resumes">My Resumes</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          <ApplicationsList />
        </TabsContent>
        <TabsContent value="resumes" className="space-y-4">
          <ResumesList />
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <ProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
