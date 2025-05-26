'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Application {
  id: string;
  job_id: string;
  user_id: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  job: {
    title: string;
  };
  user: {
    email: string;
    full_name: string;
  };
}

export function ApplicationsList() {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['recruiter-applications'],
    queryFn: async () => {
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id')
        .eq('recruiter_id', (await supabase.auth.getUser()).data.user?.id);

      if (!jobs?.length) return [];

      const { data, error } = await supabase
        .from('job_applications')
        .select(
          `
          *,
          job:jobs (
            title
          ),
          user:users (
            email,
            full_name
          )
        `
        )
        .in(
          'job_id',
          jobs.map((job) => job.id)
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Application[];
    },
  });

  const updateApplicationStatus = useMutation({
    mutationFn: async ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: 'accepted' | 'rejected';
    }) => {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruiter-applications'] });
      queryClient.invalidateQueries({ queryKey: ['recruiter-stats'] });
      setSelectedApplication(null);
      toast({
        title: 'Application status updated',
        description: 'The application status has been updated successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update application status. Please try again.',
        variant: 'destructive',
      });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[100px] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  if (!applications?.length) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No applications yet</h3>
          <p className="text-sm text-muted-foreground">
            Applications will appear here when job seekers apply to your jobs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{application.job.title}</CardTitle>
                <CardDescription>
                  From {application.user.full_name} ({application.user.email})
                </CardDescription>
              </div>
              <Badge
                variant={
                  application.status === 'pending'
                    ? 'secondary'
                    : application.status === 'accepted'
                      ? 'default'
                      : 'destructive'
                }
              >
                {application.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {application.message}
            </p>
          </CardContent>
          <CardFooter>
            <Dialog
              open={selectedApplication?.id === application.id}
              onOpenChange={(open) =>
                setSelectedApplication(open ? application : null)
              }
            >
              <DialogTrigger asChild>
                <Button variant="outline">View Details</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Application Details</DialogTitle>
                  <DialogDescription>
                    Review the application for {application.job.title}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Applicant</h4>
                    <p className="text-sm text-muted-foreground">
                      {application.user.full_name} ({application.user.email})
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Message</h4>
                    <p className="text-sm text-muted-foreground">
                      {application.message}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  {application.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() =>
                          updateApplicationStatus.mutate({
                            applicationId: application.id,
                            status: 'rejected',
                          })
                        }
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={() =>
                          updateApplicationStatus.mutate({
                            applicationId: application.id,
                            status: 'accepted',
                          })
                        }
                      >
                        Accept
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
