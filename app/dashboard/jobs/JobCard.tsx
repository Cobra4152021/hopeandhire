'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface JobCardProps {
  job: Job;
}

async function applyForJob(jobId: number): Promise<void> {
  const { error } = await supabase
    .from('job_applications')
    .insert([{ job_id: jobId, user_id: (await supabase.auth.getUser()).data.user?.id, status: 'pending' }]);
  if (error) throw error;
}

export function JobCard({ job }: JobCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: recruiter } = useQuery({
    queryKey: ['recruiter', job.recruiter_id],
    queryFn: async () => {
      const { data } = await supabase
        .from('recruiters')
        .select('*, company:companies(name)')
        .eq('id', job.recruiter_id)
        .single();

      return data;
    },
  });

  const {
    mutate: applyToJob,
  } = useMutation<void, Error, number>({ // Ensures useMutation expects a number
    mutationFn: applyForJob,
    onSuccess: () => {
      toast({
        title: 'Application sent',
        description: 'The recruiter will review your application soon.',
      });
      setIsOpen(false);
      setMessage('');
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send application. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      applyToJob(Number(job.id)); // Ensures job.id is passed as a number
    } catch (error) {
      console.error('Error submitting application:', error);
      if (error instanceof Error) {
        toast({
            title: 'Submission Error',
            description: error.message || 'An unexpected error occurred during submission.',
            variant: 'destructive',
        });
      } else {
        toast({
            title: 'Submission Error',
            description: 'An unexpected error occurred during submission.',
            variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.company?.name}</CardDescription>
          </div>
          {job.company?.logo_url && (
            <img
              src={job.company.logo_url}
              alt={job.company.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{job.category}</Badge>
          <Badge variant="secondary">{job.location}</Badge>
          {job.is_remote && <Badge variant="secondary">Remote</Badge>}
        </div>
        <p className="line-clamp-3 text-sm text-muted-foreground">{job.description}</p>
      </CardContent>
      <CardFooter>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Apply Now</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for {job.title}</DialogTitle>
              <DialogDescription>
                Send a message to the recruiter at {recruiter?.company?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Tell the recruiter why you're interested in this position..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Application'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}