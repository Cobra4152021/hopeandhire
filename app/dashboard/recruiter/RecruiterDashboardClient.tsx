'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobList } from './JobList';
import { ApplicationsList } from './ApplicationsList';
import { CreateJobDialog } from './CreateJobDialog';
import { supabase } from '@/lib/supabase';

export default function RecruiterDashboardClient() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: stats } = useQuery({
    queryKey: ['recruiter-stats'],
    queryFn: async () => {
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('id, status')
        .eq('recruiter_id', (await supabase.auth.getUser()).data.user?.id);

      if (jobsError) throw jobsError;

      const { data: applications, error: applicationsError } = await supabase
        .from('job_applications')
        .select('id, status')
        .in(
          'job_id',
          jobs.map((job) => job.id)
        );

      if (applicationsError) throw applicationsError;

      return {
        totalJobs: jobs.length,
        activeJobs: jobs.filter((job) => job.status === 'active').length,
        totalApplications: applications.length,
        pendingApplications: applications.filter(
          (app) => app.status === 'pending'
        ).length,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          Post New Job
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
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
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          <JobList />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <ApplicationsList />
        </TabsContent>
      </Tabs>

      <CreateJobDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
