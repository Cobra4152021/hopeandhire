'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
  };
}

interface Resume {
  id: string;
  title: string;
}

interface ApplyJobDialogProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplyJobDialog({
  job,
  open,
  onOpenChange,
}: ApplyJobDialogProps) {
  const [message, setMessage] = useState('');
  const [selectedResume, setSelectedResume] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: resumes } = useQuery({
    queryKey: ['jobseeker-resumes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('id, title')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Resume[];
    },
  });

  const applyJob = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('job_applications').insert({
        job_id: job?.id,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        resume_id: selectedResume,
        message,
        status: 'pending',
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobseeker-applications'] });
      queryClient.invalidateQueries({ queryKey: ['jobseeker-stats'] });
      onOpenChange(false);
      setMessage('');
      setSelectedResume('');
      toast({
        title: 'Application submitted',
        description: 'Your application has been submitted successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyJob.mutate();
  };

  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>
            Submit your application for {job.company.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">Select Resume</Label>
            <Select
              value={selectedResume}
              onValueChange={setSelectedResume}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a resume" />
              </SelectTrigger>
              <SelectContent>
                {resumes?.map((resume) => (
                  <SelectItem key={resume.id} value={resume.id}>
                    {resume.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Cover Letter</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a brief message to the recruiter..."
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={applyJob.isPending}>
              {applyJob.isPending ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
