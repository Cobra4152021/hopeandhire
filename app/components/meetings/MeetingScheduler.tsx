'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addHours, setHours, setMinutes } from 'date-fns';
import { toast } from 'sonner';

interface Meeting {
  id: string;
  volunteer_id: string;
  job_seeker_id?: string;
  employer_id?: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

interface MeetingSchedulerProps {
  recipientId: string;
  recipientRole: string;
  currentUserRole: string;
}

export default function MeetingScheduler({ recipientId, recipientRole, currentUserRole }: MeetingSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState('30');
  const [notes, setNotes] = useState('');

  const queryClient = useQueryClient();

  // Fetch existing meetings
  const { data: meetings } = useQuery({
    queryKey: ['meetings', recipientId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .or(`and(volunteer_id.eq.${user.id},${recipientRole}_id.eq.${recipientId}),and(volunteer_id.eq.${recipientId},${currentUserRole}_id.eq.${user.id})`)
        .order('date', { ascending: true });

      if (error) throw error;
      return data as Meeting[];
    },
  });

  // Schedule meeting mutation
  const scheduleMeeting = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      if (!selectedDate) throw new Error('Please select a date');

      const startDateTime = setMinutes(setHours(selectedDate, parseInt(startTime.split(':')[0])), parseInt(startTime.split(':')[1]));
      const endDateTime = addHours(startDateTime, parseInt(duration) / 60);

      const meetingData = {
        volunteer_id: currentUserRole === 'volunteer' ? user.id : recipientId,
        [recipientRole + '_id']: currentUserRole === 'volunteer' ? recipientId : user.id,
        date: selectedDate.toISOString(),
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        status: 'scheduled',
        notes: notes.trim() || undefined,
      };

      const { error } = await supabase
        .from('meetings')
        .insert(meetingData);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings', recipientId] });
      setSelectedDate(undefined);
      setStartTime('09:00');
      setDuration('30');
      setNotes('');
      toast.success('Meeting scheduled successfully');
    },
    onError: (error) => {
      toast.error('Failed to schedule meeting: ' + error.message);
    },
  });

  // Get booked time slots for the selected date
  const bookedSlots = meetings?.filter(meeting => 
    format(new Date(meeting.date), 'yyyy-MM-dd') === format(selectedDate || new Date(), 'yyyy-MM-dd')
  ).map(meeting => ({
    start: new Date(meeting.start_time),
    end: new Date(meeting.end_time),
  })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Meeting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              className="rounded-md border"
            />
          </div>
          <div className="space-y-4">
            <div>
              <Label>Start Time</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                min="09:00"
                max="17:00"
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any meeting notes..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => scheduleMeeting.mutate()}
            disabled={!selectedDate || scheduleMeeting.isPending}
          >
            Schedule Meeting
          </Button>
        </div>

        {bookedSlots.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Booked Time Slots</h3>
            <div className="space-y-2">
              {bookedSlots.map((slot, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {format(slot.start, 'h:mm a')} - {format(slot.end, 'h:mm a')}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 