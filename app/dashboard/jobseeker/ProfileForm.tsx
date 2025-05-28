'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  bio: string;
  location: string;
  skills: string[];
  experience: string;
  education: string;
}

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['jobseeker-profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('profiles').upsert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        ...formData,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobseeker-profile'] });
      setIsEditing(false);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-[400px] animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Your Profile</h3>
          <p className="text-sm text-muted-foreground">Manage your professional profile</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing && profile) {
              setFormData(profile);
            }
          }}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={isEditing ? formData.full_name : profile?.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={isEditing ? formData.bio : profile?.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={isEditing ? formData.location : profile?.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input
            id="skills"
            value={isEditing ? formData.skills?.join(', ') : profile?.skills?.join(', ')}
            onChange={(e) =>
              setFormData({
                ...formData,
                skills: e.target.value.split(',').map((s) => s.trim()),
              })
            }
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience</Label>
          <Textarea
            id="experience"
            value={isEditing ? formData.experience : profile?.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            disabled={!isEditing}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">Education</Label>
          <Textarea
            id="education"
            value={isEditing ? formData.education : profile?.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            disabled={!isEditing}
            rows={4}
          />
        </div>

        {isEditing && (
          <Button type="submit" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </form>
    </div>
  );
}
