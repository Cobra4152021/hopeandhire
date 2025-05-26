'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function JobPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('jobs')
        .insert({
          employer_id: user.id,
          ...jobData,
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Job posted successfully!');
      router.push('/dashboard/employer');
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <Input
                name="title"
                value={jobData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="e.g., Remote, New York, NY"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Salary Range</label>
              <Input
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                placeholder="e.g., $80,000 - $120,000"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <Textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                placeholder="Describe the role and responsibilities..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Requirements</label>
              <Textarea
                name="requirements"
                value={jobData.requirements}
                onChange={handleChange}
                placeholder="List the required skills and qualifications..."
                rows={4}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 