'use client';

import { useState, useEffect } from 'react'; // Added useEffect
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
// import { useMutation } from '@tanstack/react-query'; // Removed as we'll use direct calls

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
  const [isFetchingResumes, setIsFetchingResumes] = useState(false); // Added for loading state
  const [isDeleting, setIsDeleting] = useState(false); // Added for delete loading state

  const fetchResumes = async () => {
    if (!user) return;
    setIsFetchingResumes(true);
    try {
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
        setResumes([]); // Clear resumes on error
        return;
      }
      setResumes(data || []);
    } catch (err) {
        toast({
            title: 'Error',
            description: 'An unexpected error occurred while fetching resumes.',
            variant: 'destructive',
          });
        setResumes([]);
    } finally {
        setIsFetchingResumes(false);
    }
  };

  // Effect to fetch resumes when the user is available
  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Add toast to dependency array if it's used inside a callback that's memoized based on this. For now, assuming fetchResumes isn't memoized in a way that makes toast a dep.

  // Removed the useQuery line that was here:
  // const { isLoading } = useQuery({ queryKey: ["resumes"], queryFn: fetchResumes });


  const handleCreateResume = async () => {
    if (!user) return;
    // Add loading state if needed for create operation
    try {
        const { error } = await supabase.from('resumes').insert({
          user_id: user.id,
          title: newResume.title,
          content: newResume.content,
        }).select(); // .select() can be useful if you need the inserted data, otherwise optional

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Resume created successfully',
        });
        setIsCreateOpen(false);
        setNewResume({ title: '', content: '' });
        fetchResumes(); // Refetch resumes
    } catch (err: unknown) {
        toast({
            title: 'Error creating resume',
            description: err instanceof Error ? err.message : 'An unexpected error occurred.',
            variant: 'destructive',
        });
    }
  };

  const handleUpdateResume = async () => {
    if (!selectedResume) return;
    // Add loading state if needed for update operation
    try {
        const { error } = await supabase
          .from('resumes')
          .update({
            title: newResume.title,
            content: newResume.content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedResume.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Resume updated successfully',
        });
        setIsEditOpen(false);
        setSelectedResume(null);
        setNewResume({ title: '', content: '' });
        fetchResumes(); // Refetch resumes
    } catch (err: unknown) {
        toast({
            title: 'Error updating resume',
            description: err instanceof Error ? err.message : 'An unexpected error occurred.',
            variant: 'destructive',
        });
    }
  };

  const handleDeleteResume = async (id: string) => {
    setIsDeleting(true);
    try {
        const { error } = await supabase.from('resumes').delete().eq('id', id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Resume deleted successfully',
        });
        fetchResumes(); // Refetch resumes
    } catch (err: unknown) {
        toast({
            title: 'Error deleting resume',
            description: err instanceof Error ? err.message : 'An unexpected error occurred.',
            variant: 'destructive',
        });
    } finally {
        setIsDeleting(false);
    }
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
        title: file.name, // Or a custom title
        file_url: publicUrl,
        content: '', // Or parse content from file if possible
      });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'Resume uploaded successfully',
      });
      fetchResumes();
    } catch (err: unknown) { // Typed error
      toast({
        title: 'Error uploading resume',
        description: err instanceof Error ? err.message : 'An unexpected error occurred.',
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
      content: resume.content || '', // Ensure content is not null/undefined
    });
    setIsEditOpen(true);
  };

  // Removed the useMutation hook for deleteResume that was here.

  return (
    <></> // Your JSX for displaying resumes, create/edit dialogs, etc. will go here
    // You can use isFetchingResumes, uploading, isDeleting states for UI feedback
  );
}