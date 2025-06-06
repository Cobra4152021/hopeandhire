'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
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

interface Resume {
  id: string;
  user_id: string;
  title: string;
  content: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export default function ResumesPageClient() {
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

  const fetchResumes = useCallback(async () => {
    if (!user) {
      setResumes([]);
      return;
    }

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
      setResumes([]);
      return;
    }

    setResumes(data || []);
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user, fetchResumes]);

  const handleCreateResume = async () => {
    if (!user) return;

    const { error } = await supabase.from('resumes').insert({
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
    await fetchResumes();
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
    await fetchResumes();
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
    await fetchResumes();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('resumes').upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('resumes').getPublicUrl(fileName);

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

      await fetchResumes();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload resume',
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
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resumes</h1>
        {user?.role === 'jobseeker' && (
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
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <Card key={resume.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{resume.title}</span>
                {user?.role === 'jobseeker' && (
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(resume)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteResume(resume.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                Last updated: {new Date(resume.updated_at).toLocaleDateString()}
              </CardDescription>
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
                <ScrollArea className="h-[200px]">
                  <p className="text-sm text-gray-600">{resume.content}</p>
                </ScrollArea>
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
