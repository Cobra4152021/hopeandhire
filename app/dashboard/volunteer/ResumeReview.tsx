'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Resume {
  id: string;
  user_id: string;
  resume_url: string;
  bio: string;
  skills: string;
  status: string;
  created_at: string;
}

export default function ResumeReviewPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [feedback, setFeedback] = useState('');

  const fetchResumes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('status', 'pending_review')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setResumes(data || []);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast({ title: 'Error', description: 'Failed to fetch resumes', variant: 'destructive' });
    }
  }, [toast]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleReview = async (resumeId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('resumes')
        .update({
          status: 'reviewed',
          volunteer_feedback: feedback,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', resumeId);

      if (error) throw error;

      toast({ title: 'Success', description: 'Resume reviewed successfully!' });
      setSelectedResume(null);
      setFeedback('');
      fetchResumes();
    } catch (error) {
      console.error('Error reviewing resume:', error);
      toast({ title: 'Error', description: 'Failed to submit review', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Resume List */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedResume?.id === resume.id ? 'border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedResume(resume)}
                >
                  <h3 className="font-medium">Resume from User {resume.user_id}</h3>
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(resume.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {resumes.length === 0 && (
                <p className="text-center text-gray-500">No resumes to review</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Review Form */}
        {selectedResume && (
          <Card>
            <CardHeader>
              <CardTitle>Review Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Resume Preview</h3>
                  <iframe
                    src={selectedResume.resume_url}
                    className="w-full h-96 border rounded"
                    title="Resume Preview"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <p className="text-sm text-gray-600">{selectedResume.bio}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Skills</label>
                  <p className="text-sm text-gray-600">{selectedResume.skills}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Feedback</label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on the resume..."
                    rows={4}
                    required
                  />
                </div>

                <Button
                  onClick={() => handleReview(selectedResume.id)}
                  disabled={loading || !feedback}
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
