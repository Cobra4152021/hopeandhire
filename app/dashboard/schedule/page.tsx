'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface Meeting {
  id: string;
  job_seeker_id: string;
  volunteer_id: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
  notes: string;
  volunteer: {
    email: string;
  };
}

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>('');
  const [meetingNotes, setMeetingNotes] = useState('');
  const queryClient = useQueryClient();

  // Fetch volunteers
  const { data: volunteers } = useQuery({
    queryKey: ['volunteers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'volunteer');

      if (error) throw error;
      return data;
    },
  });

  // Fetch scheduled meetings
  const { data: meetings } = useQuery({
    queryKey: ['meetings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('meetings')
        .select(`
          *,
          volunteer:volunteer_id (email)
        `)
        .eq('job_seeker_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;
      return data as Meeting[];
    },
  });

  // Schedule meeting mutation
  const scheduleMeeting = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !selectedDate || !selectedTime || !selectedVolunteer) {
        throw new Error('Missing required fields');
      }

      const { error } = await supabase.from('meetings').insert({
        job_seeker_id: user.id,
        volunteer_id: selectedVolunteer,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        status: 'pending',
        notes: meetingNotes,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setSelectedTime('');
      setMeetingNotes('');
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule Meeting */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule a Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Select Volunteer
                </label>
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
                        {volunteer.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Select Date
                </label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Select Time
                </label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Meeting Notes
                </label>
                <Textarea
                  placeholder="Add any notes or topics you'd like to discuss..."
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                onClick={() => scheduleMeeting.mutate()}
                disabled={!selectedDate || !selectedTime || !selectedVolunteer}
              >
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Scheduled Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings?.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span>{new Date(meeting.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{meeting.time}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">With: </span>
                    <span>{meeting.volunteer.email}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Status: </span>
                    <span
                      className={`capitalize ${
                        meeting.status === 'accepted'
                          ? 'text-green-600'
                          : meeting.status === 'rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {meeting.status}
                    </span>
                  </div>
                  {meeting.notes && (
                    <div>
                      <span className="text-sm font-medium">Notes: </span>
                      <p className="text-sm text-gray-600">{meeting.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
