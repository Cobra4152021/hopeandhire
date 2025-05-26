'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MessageSquare,
  Video,
} from 'lucide-react';

interface Volunteer {
  id: string;
  full_name: string;
  expertise: string[];
  availability: {
    days: string[];
    time_slots: string[];
  };
  rating: number;
  sessions_completed: number;
}

interface Meeting {
  id: string;
  volunteer_id: string;
  user_id: string;
  date: string;
  time: string;
  type: 'video' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export default function SchedulePage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>();
  const [meetingType, setMeetingType] = useState<'video' | 'chat'>('video');
  const [notes, setNotes] = useState('');

  // Fetch volunteers
  const { data: volunteers, isLoading: isLoadingVolunteers } = useQuery({
    queryKey: ['volunteers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .eq('is_available', true);

      if (error) throw error;
      return data as Volunteer[];
    },
  });

  // Fetch user's meetings
  const { data: meetings, isLoading: isLoadingMeetings } = useQuery({
    queryKey: ['meetings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;
      return data as Meeting[];
    },
  });

  // Schedule meeting mutation
  const scheduleMeeting = useMutation({
    mutationFn: async (meetingData: Partial<Meeting>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('meetings')
        .insert({
          ...meetingData,
          user_id: user.id,
          status: 'scheduled',
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Meeting scheduled successfully',
      });
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setSelectedVolunteer(undefined);
      setMeetingType('video');
      setNotes('');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to schedule meeting',
        variant: 'destructive',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedVolunteer) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    scheduleMeeting.mutate({
      volunteer_id: selectedVolunteer,
      date: selectedDate.toISOString(),
      time: selectedTime,
      type: meetingType,
      notes,
    });
  };

  if (isLoadingVolunteers || isLoadingMeetings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Meeting Form */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule a Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Volunteer Selection */}
              <div className="space-y-2">
                <Label>Select Volunteer</Label>
                <Select
                  value={selectedVolunteer}
                  onValueChange={setSelectedVolunteer}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a volunteer" />
                  </SelectTrigger>
                  <SelectContent>
                    {volunteers?.map((volunteer) => (
                      <SelectItem key={volunteer.id} value={volunteer.id}>
                        <div className="flex items-center gap-2">
                          <span>{volunteer.full_name}</span>
                          <span className="text-sm text-gray-500">
                            ({volunteer.expertise.join(', ')})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedVolunteer && volunteers
                      ?.find((v) => v.id === selectedVolunteer)
                      ?.availability.time_slots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Meeting Type */}
              <div className="space-y-2">
                <Label>Meeting Type</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={meetingType === 'video' ? 'default' : 'outline'}
                    onClick={() => setMeetingType('video')}
                    className="flex-1"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                  <Button
                    type="button"
                    variant={meetingType === 'chat' ? 'default' : 'outline'}
                    onClick={() => setMeetingType('chat')}
                    className="flex-1"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes or topics you'd like to discuss"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                Schedule Meeting
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings?.map((meeting) => {
                const volunteer = volunteers?.find(
                  (v) => v.id === meeting.volunteer_id
                );
                return (
                  <div
                    key={meeting.id}
                    className="p-4 border rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">
                          {volunteer?.full_name}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          meeting.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-700'
                            : meeting.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {meeting.status.charAt(0).toUpperCase() +
                          meeting.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(meeting.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meeting.time}
                      </div>
                      <div className="flex items-center gap-1">
                        {meeting.type === 'video' ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <MessageSquare className="w-4 h-4" />
                        )}
                        {meeting.type === 'video' ? 'Video Call' : 'Chat'}
                      </div>
                    </div>
                    {meeting.notes && (
                      <p className="text-sm text-gray-500">{meeting.notes}</p>
                    )}
                  </div>
                );
              })}
              {meetings?.length === 0 && (
                <p className="text-center text-gray-500">
                  No upcoming meetings scheduled
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
