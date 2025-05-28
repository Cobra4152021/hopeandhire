'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';

interface Resume {
  id: string;
  user_id: string;
  title: string;
  content: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export default function ResumesPage() {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Resume>>({});

  // Fetch resumes
  const { data: resumes } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Resume[];
    },
  });

  // Create resume mutation
  const createResume = useMutation({
    mutationFn: async (data: Partial<Resume>) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase.from('resumes').insert({
        ...data,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setFormData({});
    },
  });

  // Update resume mutation
  const updateResume = useMutation({
    mutationFn: async (data: Partial<Resume>) => {
      if (!selectedResume) throw new Error('No resume selected');
      const { error } = await supabase
        .from('resumes')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedResume.id);
      if (error) throw error;
    },
    onSuccess: () => {
      setSelectedResume(null);
      setFormData({});
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedResume) {
      updateResume.mutate(formData);
    } else {
      createResume.mutate(formData);
    }
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Resumes</h1>
        <Button
          onClick={() => {
            setSelectedResume(null);
            setIsEditing(true);
          }}
        >
          Upload New Resume
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>My Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumes?.map((resume) => (
                <div
                  key={resume.id}
                  className="p-4 border rounded-lg space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSelectedResume(resume);
                    setIsEditing(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{resume.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Uploaded: {new Date(resume.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {resume.file_url && (
                    <a
                      href={resume.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-xs"
                    >
                      View File
                    </a>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Resume Editor */}
        {isEditing && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{selectedResume ? 'Edit Resume' : 'Upload Resume'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="title"
                  placeholder="Resume Title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  name="content"
                  placeholder="Resume Content"
                  value={formData.content || ''}
                  onChange={handleChange}
                  className="min-h-[200px]"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedResume(null);
                      setFormData({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {selectedResume ? 'Update Resume' : 'Create Resume'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
