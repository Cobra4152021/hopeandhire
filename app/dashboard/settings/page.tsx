'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { User, Shield, Save, LogOut, Lock } from 'lucide-react';

interface Settings {
  id: string;
  user_id: string;
  email_notifications: boolean;
  job_alerts: boolean;
  marketing_emails: boolean;
  dark_mode: boolean;
  two_factor_auth: boolean;
  created_at: string;
  updated_at: string;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Settings>>({});

  // Define fetchUserSettings function
  const fetchUserSettings = async (): Promise<Settings> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('settings') // Assuming your table is named 'settings'
      .select('*')
      .eq('user_id', user.id)
      .single(); // Assuming one settings row per user

    if (error) {
      // If Supabase returns an error (e.g., network issue, RLS policy violation)
      console.error('Error fetching settings:', error.message);
      throw new Error(`Failed to fetch settings: ${error.message}`);
    }
    if (!data) {
      // If no row is found (which .single() can return as data:null, error:null if no RLS error)
      // This case implies settings for the user might not exist yet.
      // Depending on app logic, you might want to return default settings or throw.
      // For useQuery, throwing an error is generally preferred if data is considered mandatory.
      console.warn('No settings found for user, potentially create defaults or handle as error.');
      throw new Error('No settings found for user.');
    }
    return data as Settings;
  };

  // Fetch settings
  const { data: settings, isLoading /*, refetch*/ } = useQuery<Settings>({
    queryKey: ['userSettings'],
    queryFn: fetchUserSettings,
  });

  // Update settings mutation
  const updateSettings = useMutation({
    mutationFn: async (data: Partial<Settings>) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('settings')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(formData);
  };

  // Handle toggle changes
  const handleToggle = (key: keyof Settings, value: boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle sign out
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    } else {
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Settings */}
        <Card>
              <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Settings
            </CardTitle>
              </CardHeader>
              <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">
                      Receive notifications about your account activity
                      </p>
                  </div>
                  <Switch
                    checked={formData.email_notifications ?? settings?.email_notifications}
                    onCheckedChange={(checked) => handleToggle('email_notifications', checked)}
                  />
                    </div>

                  <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Job Alerts</Label>
                      <p className="text-sm text-gray-500">
                      Get notified about new job opportunities
                      </p>
                  </div>
                  <Switch
                    checked={formData.job_alerts ?? settings?.job_alerts}
                    onCheckedChange={(checked) => handleToggle('job_alerts', checked)}
                  />
              </div>

                  <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                      <p className="text-sm text-gray-500">
                      Receive updates about new features and promotions
                      </p>
                  </div>
                  <Switch
                    checked={formData.marketing_emails ?? settings?.marketing_emails}
                    onCheckedChange={(checked) => handleToggle('marketing_emails', checked)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>

        {/* Security Settings */}
            <Card>
              <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
              </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={formData.two_factor_auth ?? settings?.two_factor_auth}
                    onCheckedChange={(checked) => handleToggle('two_factor_auth', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                  </div>
                  <Switch
                    checked={formData.dark_mode ?? settings?.dark_mode}
                    onCheckedChange={(checked) => handleToggle('dark_mode', checked)}
                  />
                </div>
          </div>

              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input
                    id="current_password"
                    type="password"
                    placeholder="Enter current password"
                  />
                    </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input id="new_password" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input id="confirm_password" type="password" placeholder="Confirm new password" />
                </div>
                <Button className="w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
