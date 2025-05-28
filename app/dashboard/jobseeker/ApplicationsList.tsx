'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Application {
  id: string;
  job_id: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  job: {
    title: string;
    company: {
      name: string;
    };
  };
}

export function ApplicationsList() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ['jobseeker-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select(
          `
          *,
          job:jobs (
            title,
            company:companies (
              name
            )
          )
        `
        )
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Application[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[100px] animate-pulse rounded-lg bg-muted" />
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
            Start applying to jobs to see your applications here
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
                <CardDescription>{application.job.company.name}</CardDescription>
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
            <p className="line-clamp-2 text-sm text-muted-foreground">{application.message}</p>
          </CardContent>
          <Dialog
            open={selectedApplication?.id === application.id}
            onOpenChange={(open) => setSelectedApplication(open ? application : null)}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="ml-4 mb-4">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>Your application for {application.job.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Company</h4>
                  <p className="text-sm text-muted-foreground">{application.job.company.name}</p>
                </div>
                <div>
                  <h4 className="font-medium">Your Message</h4>
                  <p className="text-sm text-muted-foreground">{application.message}</p>
                </div>
                <div>
                  <h4 className="font-medium">Status</h4>
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
                <div>
                  <h4 className="font-medium">Applied On</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(application.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Card>
      ))}
    </div>
  );
}
