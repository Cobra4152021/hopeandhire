'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { Calendar, Users, MessageSquare, Clock } from 'lucide-react';

export default function VolunteerDashboardClient() {
  const [activeTab, setActiveTab] = useState('sessions');

  // Fetch volunteer stats
  const { data: stats } = useQuery({
    queryKey: ['volunteer-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get total sessions
      const { count: totalSessions } = await supabase
        .from('meetings')
        .select('*', { count: 'exact', head: true })
        .eq('volunteer_id', user.id);

      // Get upcoming sessions
      const { count: upcomingSessions } = await supabase
        .from('meetings')
        .select('*', { count: 'exact', head: true })
        .eq('volunteer_id', user.id)
        .eq('status', 'scheduled')
        .gte('date', new Date().toISOString());

      // Get total messages
      const { count: totalMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('sender_id', user.id);

      // Get unread messages
      const { count: unreadMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', user.id)
        .eq('is_read', false);

      return {
        totalSessions: totalSessions || 0,
        upcomingSessions: upcomingSessions || 0,
        totalMessages: totalMessages || 0,
        unreadMessages: unreadMessages || 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Volunteer Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalSessions || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.upcomingSessions || 0} upcoming sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalMessages || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.unreadMessages || 0} unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sessions">My Sessions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="sessions" className="space-y-4">
          {/* Sessions list component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your upcoming and past sessions will appear here
          </div>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          {/* Messages component will go here */}
          <div className="text-center text-gray-500 py-8">
            Your conversations will appear here
          </div>
        </TabsContent>
        <TabsContent value="availability" className="space-y-4">
          {/* Availability settings component will go here */}
          <div className="text-center text-gray-500 py-8">
            Set your availability for sessions
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 