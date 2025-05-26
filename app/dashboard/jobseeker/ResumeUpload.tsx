'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ResumeUpload() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size must be less than 5MB');
        return;
      }

      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }

      setResumeFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error('Please select a resume file');
      return;
    }

    if (!bio.trim()) {
      toast.error('Please provide a bio');
      return;
    }

    if (!skills.trim()) {
      toast.error('Please list your skills');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload file to Supabase Storage
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // Save resume record to database
      const { error: dbError } = await supabase
        .from('resumes')
        .upsert({
          user_id: user.id,
          resume_url: publicUrl,
          bio: bio.trim(),
          skills: skills.trim(),
          status: 'pending_review',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (dbError) throw dbError;

      toast.success('Resume uploaded successfully!');
      router.push('/dashboard/jobseeker');
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Resume File (PDF or Word)</label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
            </div>

            {previewUrl && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Preview</label>
                <iframe
                  src={previewUrl}
                  className="w-full h-96 border rounded"
                  title="Resume Preview"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <Textarea
                placeholder="List your skills (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={2}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Resume'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 