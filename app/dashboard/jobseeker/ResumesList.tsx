'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Upload, FileText, Trash2, Edit2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/lib/hooks/useUser';
import { useQuery } from '@tanstack/react-query';

interface Resume {
  id: string;
  user_id: string;
  title: string;
  content: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export function ResumesList() {
  const { user } = useUser();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [newResume, setNewResume] = useState({
    title: '',
    content: '',
  });
  const [uploading, setUploading] = useState(false);

  const fetchResumes = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch resumes',
        variant: 'destructive',
      });
      return;
    }

    setResumes(data || []);
  };

  const handleCreateResume = async () => {
    if (!user) return;

    const { data, error } = await supabase.from('resumes').insert({
      user_id: user.id,
      title: newResume.title,
      content: newResume.content,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create resume',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Resume created successfully',
    });

    setIsCreateOpen(false);
    setNewResume({ title: '', content: '' });
    fetchResumes();
  };

  const handleUpdateResume = async () => {
    if (!selectedResume) return;

    const { error } = await supabase
      .from('resumes')
      .update({
        title: newResume.title,
        content: newResume.content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', selectedResume.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update resume',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Resume updated successfully',
    });

    setIsEditOpen(false);
    setSelectedResume(null);
    setNewResume({ title: '', content: '' });
    fetchResumes();
  };

  const handleDeleteResume = async (id: string) => {
    const { error } = await supabase.from('resumes').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete resume',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Resume deleted successfully',
    });

    fetchResumes();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('resumes').upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('resumes').getPublicUrl(fileName);

      // Create resume record
      const { error: dbError } = await supabase.from('resumes').insert({
        user_id: user.id,
        title: file.name,
        file_url: publicUrl,
      });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'Resume uploaded successfully',
      });

      fetchResumes();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload resume',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (resume: Resume) => {
    setSelectedResume(resume);
    setNewResume({
      title: resume.title,
      content: resume.content || '',
    });
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Resumes</h2>
        <div className="flex space-x-2">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create Resume
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Resume Title"
                  value={newResume.title}
                  onChange={(e) => setNewResume({ ...newResume, title: e.target.value })}
                />
                <Textarea
                  placeholder="Resume Content"
                  value={newResume.content}
                  onChange={(e) => setNewResume({ ...newResume, content: e.target.value })}
                  rows={10}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleCreateResume} className="bg-teal text-white">
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="relative">
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
              disabled={uploading}
            />
            <label htmlFor="resume-upload">
              <Button className="bg-teal text-white cursor-pointer" disabled={uploading}>
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? 'Uploading...' : 'Upload Resume'}
              </Button>
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <Card key={resume.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{resume.title}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(resume)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteResume(resume.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {resume.file_url ? (
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <a
                    href={resume.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:underline"
                  >
                    View Resume
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-600">{resume.content}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Resume</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Resume Title"
              value={newResume.title}
              onChange={(e) => setNewResume({ ...newResume, title: e.target.value })}
            />
            <Textarea
              placeholder="Resume Content"
              value={newResume.content}
              onChange={(e) => setNewResume({ ...newResume, content: e.target.value })}
              rows={10}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateResume} className="bg-teal text-white">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
