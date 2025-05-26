'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import {
  Users,
  MessageSquare,
  Calendar,
  Star,
  Award,
  ChevronRight,
  UserPlus,
  Video,
  Mail,
  Bookmark,
  Share2,
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  availability: {
    days: string[];
    time_slots: string[];
  };
  rating: number;
  reviews: number;
  bio: string;
  sessions: {
    id: string;
    date: string;
    type: 'video' | 'chat';
    status: 'scheduled' | 'completed' | 'cancelled';
    notes: string;
  }[];
}

interface Event {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'networking';
  date: string;
  duration: number;
  host: string;
  attendees: number;
  description: string;
  topics: string[];
  registration_status: 'open' | 'closed' | 'full';
}

interface Discussion {
  id: string;
  title: string;
  category: string;
  author: string;
  content: string;
  replies: number;
  views: number;
  created_at: string;
  tags: string[];
}

export default function NetworkPage() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Fetch mentors
  const { data: mentors } = useQuery({
    queryKey: ['mentors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      return data as Mentor[];
    },
  });

  // Fetch events
  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });

  // Fetch discussions
  const { data: discussions } = useQuery({
    queryKey: ['discussions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('discussions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Discussion[];
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mentors List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Find a Mentor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mentors?.map((mentor) => (
                <div
                  key={mentor.id}
                  className="p-4 border rounded-lg space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedMentor(mentor)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{mentor.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">{mentor.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {mentor.title} at {mentor.company}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <Button className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Become a Mentor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Network & Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="events">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-6">
                {events?.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()} •{' '}
                          {event.duration} minutes
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          event.registration_status === 'open'
                            ? 'bg-green-100 text-green-800'
                            : event.registration_status === 'full'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {event.registration_status}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm">{event.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {event.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 bg-teal/10 text-teal rounded-full text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {event.attendees} attendees
                          </span>
                        </div>
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="discussions" className="space-y-6">
                {discussions?.map((discussion) => (
                  <div key={discussion.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{discussion.title}</h3>
                        <p className="text-sm text-gray-500">
                          Posted by {discussion.author} •{' '}
                          {new Date(discussion.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {discussion.replies}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {discussion.views}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm mb-4">{discussion.content}</p>

                    <div className="flex flex-wrap gap-2">
                      {discussion.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="mentorship" className="space-y-6">
                {selectedMentor ? (
                  <div className="space-y-6">
                    {/* Mentor Profile */}
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center">
                          <Users className="h-8 w-8 text-teal" />
                        </div>
                        <div className="flex-grow space-y-4">
                          <div>
                            <h3 className="font-medium">{selectedMentor.name}</h3>
                            <p className="text-sm text-gray-500">
                              {selectedMentor.title} at {selectedMentor.company}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm">
                                {selectedMentor.rating} ({selectedMentor.reviews}{' '}
                                reviews)
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">
                                {selectedMentor.availability.days.length} days
                                available
                              </span>
                            </div>
                          </div>

                          <p className="text-sm">{selectedMentor.bio}</p>

                          <div className="flex flex-wrap gap-2">
                            {selectedMentor.expertise.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sessions */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">Scheduled Sessions</h3>
                      <div className="space-y-4">
                        {selectedMentor.sessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {new Date(session.date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {session.type} session
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                session.status === 'scheduled'
                                  ? 'bg-blue-100 text-blue-800'
                                  : session.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {session.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule Session */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">Schedule a Session</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Button>
                          <Video className="h-4 w-4 mr-2" />
                          Video Call
                        </Button>
                        <Button>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat Session
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Select a mentor to view their profile
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 