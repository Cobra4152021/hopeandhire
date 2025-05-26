'use client';

import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Plus,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  duration: number;
  type: string;
  location: string;
  attendees: any[];
}

// Sample events data
const initialEvents = [
  {
    id: 1,
    title: 'Interview with Michael Johnson',
    date: new Date('2023-05-15'),
    time: '10:00 AM - 11:00 AM',
    type: 'Interview',
    location: 'Virtual (Zoom)',
    description: 'Initial interview for the Software Developer position',
    attendees: [
      {
        name: 'Michael Johnson',
        avatar: '/stylized-letters-mj.png',
        role: 'Candidate',
      },
      {
        name: 'Sarah Thompson',
        avatar: '/team-member-1.jpg',
        role: 'HR Manager',
      },
    ],
  },
  {
    id: 2,
    title: 'Resume Review Session',
    date: new Date('2023-05-17'),
    time: '2:00 PM - 3:00 PM',
    type: 'Resume Review',
    location: 'Office - Room 203',
    description: 'Review resumes for the Marketing Specialist position',
    attendees: [
      {
        name: 'David Chen',
        avatar: '/stylized-letters-dc.png',
        role: 'Hiring Manager',
      },
      {
        name: 'Emily Rodriguez',
        avatar: '/stylized-letters-er.png',
        role: 'Marketing Director',
      },
    ],
  },
  {
    id: 3,
    title: 'Team Hiring Meeting',
    date: new Date('2023-05-20'),
    time: '11:00 AM - 12:00 PM',
    type: 'Meeting',
    location: 'Conference Room A',
    description: 'Discuss hiring strategy for Q3',
    attendees: [
      {
        name: 'Sarah Thompson',
        avatar: '/team-member-1.jpg',
        role: 'HR Manager',
      },
      {
        name: 'David Chen',
        avatar: '/stylized-letters-dc.png',
        role: 'Hiring Manager',
      },
      {
        name: 'Emily Rodriguez',
        avatar: '/stylized-letters-er.png',
        role: 'Marketing Director',
      },
    ],
  },
];

export default function SchedulePageClient() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    time: '09:00',
    duration: 60,
    type: 'interview',
    location: '',
    description: '',
    attendees: [],
  });

  const handleAddEvent = () => {
    const [hours, minutes] = newEvent.time.split(':').map(Number);
    const eventDate = new Date(newEvent.date);
    eventDate.setHours(hours, minutes);

    const newEventWithId = {
      ...newEvent,
      id: events.length + 1,
      date: eventDate,
      description: newEvent.description || '',
      attendees: newEvent.attendees || [],
    };

    setEvents([...events, newEventWithId]);
    setIsAddEventOpen(false);
    setNewEvent({
      title: '',
      date: new Date(),
      time: '09:00',
      duration: 60,
      type: 'interview',
      location: '',
      description: '',
      attendees: [],
    });
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Interview':
        return 'bg-teal text-white';
      case 'Resume Review':
        return 'bg-yellow text-dark-text';
      case 'Meeting':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your interviews and meetings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Tabs
            value={view}
            onValueChange={(val) => setView(val as 'day' | 'week' | 'month')}
          >
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal text-white hover:bg-teal-dark">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              className="rounded-md border"
              initialFocus
            />

            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        event.type === 'Interview'
                          ? 'bg-teal'
                          : event.type === 'Resume Review'
                            ? 'bg-yellow'
                            : 'bg-blue-500'
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {event.date.toLocaleDateString()} • {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule View */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleToday}>
                Today
              </Button>
              <h2 className="text-lg font-semibold">
                {currentDate.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                  ...(view === 'day' && { day: 'numeric' }),
                })}
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] overflow-y-auto">
              {view === 'day' && (
                <div className="space-y-4">
                  {events
                    .filter(
                      (event: Event) =>
                        event.date.toDateString() === currentDate.toDateString()
                    )
                    .map((event: Event) => (
                      <Card key={event.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-500">
                              {event.date.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                              })}
                            </p>
                            <p className="text-sm text-gray-500">
                              Duration: {event.duration} minutes
                            </p>
                            <p className="text-sm text-gray-500">
                              Location: {event.location}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
              {view === 'week' && (
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 7 }, (_, i) => {
                    const date = new Date(currentDate);
                    date.setDate(date.getDate() - date.getDay() + i);
                    return (
                      <div key={i} className="space-y-2">
                        <div className="text-center font-semibold">
                          {date.toLocaleDateString('en-US', {
                            weekday: 'short',
                          })}
                        </div>
                        <div className="text-center text-sm text-gray-500">
                          {date.toLocaleDateString('en-US', { day: 'numeric' })}
                        </div>
                        {events
                          .filter(
                            (event: Event) =>
                              event.date.toDateString() === date.toDateString()
                          )
                          .map((event: Event) => (
                            <Card key={event.id} className="p-2">
                              <h3 className="font-semibold text-sm">
                                {event.title}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {event.date.toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                })}
                              </p>
                            </Card>
                          ))}
                      </div>
                    );
                  })}
                </div>
              )}
              {view === 'month' && (
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      1
                    );
                    date.setDate(date.getDate() + i);
                    return (
                      <div
                        key={i}
                        className={`p-2 ${
                          date.getMonth() === currentDate.getMonth()
                            ? 'bg-white'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="text-center font-semibold">
                          {date.toLocaleDateString('en-US', { day: 'numeric' })}
                        </div>
                        {events
                          .filter(
                            (event: Event) =>
                              event.date.toDateString() === date.toDateString()
                          )
                          .map((event: Event) => (
                            <div
                              key={event.id}
                              className="text-xs text-gray-500 truncate"
                            >
                              {event.title}
                            </div>
                          ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <Dialog
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
        >
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <Badge
                className={`mt-2 ${getEventTypeColor(selectedEvent.type)}`}
              >
                {selectedEvent.type}
              </Badge>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>
                  {selectedEvent.date.toLocaleDateString()} •{' '}
                  {selectedEvent.time}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span>{selectedEvent.location}</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{selectedEvent.description}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Attendees</h4>
                <div className="space-y-2">
                  {selectedEvent.attendees.map(
                    (attendee: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={attendee.avatar || '/placeholder.svg'}
                            alt={attendee.name}
                          />
                          <AvatarFallback className="bg-teal-light/20 text-teal">
                            {attendee.name
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-xs text-gray-500">
                            {attendee.role}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button className="bg-teal text-white hover:bg-teal-dark">
                Edit Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date.toISOString().split('T')[0]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent({
                    ...newEvent,
                    date: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newEvent.time}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={newEvent.duration}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent({
                    ...newEvent,
                    duration: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={newEvent.type}
                onValueChange={(value: string) =>
                  setNewEvent({ ...newEvent, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent} className="bg-teal text-white">
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
