'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Resume {
  id: string;
  job_seeker_id: string;
  content: string;
  status: 'pending' | 'reviewed' | 'optimized';
  feedback?: string;
  optimized_content?: string;
  created_at: string;
  updated_at: string;
}

interface ResumeReviewProps {
  resumeId: string;
}

export default function ResumeReview({ resumeId }: ResumeReviewProps) {
  const [feedback, setFeedback] = useState('');
  const [optimizedContent, setOptimizedContent] = useState('');
  const queryClient = useQueryClient();

  // Fetch resume
  const { data: resume } = useQuery({
    queryKey: ['resume', resumeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single();

      if (error) throw error;
      return data as Resume;
    },
  });

  // Update resume mutation
  const updateResume = useMutation({
    mutationFn: async (status: 'reviewed' | 'optimized') => {
      const { error } = await supabase
        .from('resumes')
        .update({
          status,
          feedback: status === 'reviewed' ? feedback : undefined,
          optimized_content: status === 'optimized' ? optimizedContent : undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', resumeId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume', resumeId] });
    },
  });

  if (!resume) return null;

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Resume Review</CardTitle>
          <Badge variant={resume.status === 'optimized' ? 'default' : 'secondary'}>
            {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <Tabs defaultValue="original" className="flex-1 flex flex-col">
          <TabsList>
            <TabsTrigger value="original">Original Resume</TabsTrigger>
            <TabsTrigger value="optimized">Optimized Version</TabsTrigger>
          </TabsList>
          <TabsContent value="original" className="flex-1">
            <ScrollArea className="h-[600px] pr-4">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap">{resume.content}</pre>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="optimized" className="flex-1">
            <ScrollArea className="h-[600px] pr-4">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap">
                  {resume.optimized_content || optimizedContent}
                </pre>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Feedback</h3>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add your feedback here..."
              className="h-24"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Optimized Content</h3>
            <Textarea
              value={optimizedContent}
              onChange={(e) => setOptimizedContent(e.target.value)}
              placeholder="Add optimized resume content here..."
              className="h-32"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => updateResume.mutate('reviewed')}
              disabled={!feedback.trim() || updateResume.isPending}
            >
              Submit Review
            </Button>
            <Button
              onClick={() => updateResume.mutate('optimized')}
              disabled={!optimizedContent.trim() || updateResume.isPending}
            >
              Submit Optimization
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
