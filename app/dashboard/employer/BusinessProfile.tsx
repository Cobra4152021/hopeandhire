'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface BusinessProfile {
  id: string;
  user_id: string;
  company_name: string;
  industry: string;
  website: string;
  location: string;
  description: string;
  logo_url: string;
  employee_count: string;
  founded_year: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export default function BusinessProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState<Partial<BusinessProfile>>({
    company_name: '',
    industry: '',
    website: '',
    location: '',
    description: '',
    employee_count: '',
    founded_year: '',
    social_links: {},
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile(data);
        if (data.logo_url) {
          setPreviewUrl(data.logo_url);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Logo size must be less than 2MB');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const platform = name.replace('social_', '');
      setProfile(prev => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [platform]: value,
        },
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let logoUrl = profile.logo_url;

      // Upload new logo if selected
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('business-logos')
          .upload(fileName, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('business-logos')
          .getPublicUrl(fileName);

        logoUrl = publicUrl;
      }

      // Update profile in database
      const { error } = await supabase
        .from('business_profiles')
        .upsert({
          user_id: user.id,
          ...profile,
          logo_url: logoUrl,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Profile updated successfully!');
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  name="company_name"
                  value={profile.company_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Input
                  name="industry"
                  value={profile.industry}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website</label>
                <Input
                  name="website"
                  type="url"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Employee Count</label>
                <Input
                  name="employee_count"
                  value={profile.employee_count}
                  onChange={handleChange}
                  placeholder="e.g., 50-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Founded Year</label>
                <Input
                  name="founded_year"
                  value={profile.founded_year}
                  onChange={handleChange}
                  placeholder="e.g., 2020"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company Description</label>
              <Textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company Logo</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">Maximum file size: 2MB</p>
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Company Logo Preview"
                    className="w-32 h-32 object-contain border rounded"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Social Media Links</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  <Input
                    name="social_linkedin"
                    value={profile.social_links?.linkedin || ''}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Twitter</label>
                  <Input
                    name="social_twitter"
                    value={profile.social_links?.twitter || ''}
                    onChange={handleChange}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Facebook</label>
                  <Input
                    name="social_facebook"
                    value={profile.social_links?.facebook || ''}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 