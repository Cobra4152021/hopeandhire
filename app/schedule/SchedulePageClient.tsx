'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Sample appointment types
const appointmentTypes = [
  {
    id: 1,
    name: 'Resume Review',
    duration: 30,
    color: 'bg-teal-light/20 border-teal',
  },
  {
    id: 2,
    name: 'Mock Interview',
    duration: 60,
    color: 'bg-yellow-light/20 border-yellow',
  },
  {
    id: 3,
    name: 'Career Counseling',
    duration: 45,
    color: 'bg-teal-light/20 border-teal',
  },
  {
    id: 4,
    name: 'Job Search Strategy',
    duration: 45,
    color: 'bg-yellow-light/20 border-yellow',
  },
  {
    id: 5,
    name: 'Salary Negotiation',
    duration: 30,
    color: 'bg-teal-light/20 border-teal',
  },
];

// Sample appointments
const sampleAppointments = [
  {
    id: 1,
    date: new Date(2023, 4, 15, 10, 0),
    typeId: 1,
    title: 'Resume Review - John Smith',
    description: 'Review resume for software developer position',
  },
  {
    id: 2,
    date: new Date(2023, 4, 15, 13, 0),
    typeId: 2,
    title: 'Mock Interview - Sarah Johnson',
    description: 'Prepare for interview with TechCorp',
  },
  {
    id: 3,
    date: new Date(2023, 4, 16, 11, 0),
    typeId: 3,
    title: 'Career Counseling - Michael Chen',
    description: 'Discuss career transition from finance to tech',
  },
  {
    id: 4,
    date: new Date(2023, 4, 17, 14, 0),
    typeId: 4,
    title: 'Job Search Strategy - Lisa Thompson',
    description: 'Create plan for job search after graduation',
  },
  {
    id: 5,
    date: new Date(2023, 4, 18, 9, 0),
    typeId: 5,
    title: 'Salary Negotiation - Robert Garcia',
    description: 'Prepare for salary negotiation with current employer',
  },
];

// Time slots
const timeSlots = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
];

export default function SchedulePageClient() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    typeId: 1,
    date: new Date(),
    time: '9:00 AM',
    description: '',
  });

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.date.getDate() === selectedDate?.getDate() &&
      appointment.date.getMonth() === selectedDate?.getMonth() &&
      appointment.date.getFullYear() === selectedDate?.getFullYear()
  );

  // Sort appointments by time
  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  const handleAddAppointment = () => {
    // Parse the time string
    const [hours, minutes] = newAppointment.time
      .replace(' AM', '')
      .replace(' PM', '')
      .split(':')
      .map(Number);

    let hour = hours;
    if (newAppointment.time.includes('PM') && hours !== 12) {
      hour += 12;
    } else if (newAppointment.time.includes('AM') && hours === 12) {
      hour = 0;
    }

    // Create a new date object with the selected date and time
    const appointmentDate = new Date(
      selectedDate!.getFullYear(),
      selectedDate!.getMonth(),
      selectedDate!.getDate(),
      hour,
      minutes
    );

    const newAppointmentObj = {
      id: appointments.length + 1,
      date: appointmentDate,
      typeId: newAppointment.typeId,
      title: newAppointment.title,
      description: newAppointment.description,
    };

    setAppointments([...appointments, newAppointmentObj]);
    setIsDialogOpen(false);

    // Reset form
    setNewAppointment({
      title: '',
      typeId: 1,
      date: new Date(),
      time: '9:00 AM',
      description: '',
    });
  };

  const getAppointmentType = (typeId: number) => {
    return appointmentTypes.find((type) => type.id === typeId);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal">Schedule</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select a date to view or schedule appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              styles={{
                day_selected: { backgroundColor: 'var(--teal-primary)' },
                day_today: { color: 'var(--teal-primary)' },
              }}
            />
            <div className="mt-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-teal text-white hover:bg-teal-dark">
                    Schedule New Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Schedule Appointment</DialogTitle>
                    <DialogDescription>
                      Fill in the details to schedule a new appointment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newAppointment.title}
                        onChange={(e) =>
                          setNewAppointment({
                            ...newAppointment,
                            title: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select
                        value={newAppointment.typeId.toString()}
                        onValueChange={(value) =>
                          setNewAppointment({
                            ...newAppointment,
                            typeId: Number.parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentTypes.map((type) => (
                            <SelectItem
                              key={type.id}
                              value={type.id.toString()}
                            >
                              {type.name} ({type.duration} min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Time
                      </Label>
                      <Select
                        value={newAppointment.time}
                        onValueChange={(value) =>
                          setNewAppointment({ ...newAppointment, time: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select time" />
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
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newAppointment.description}
                        onChange={(e) =>
                          setNewAppointment({
                            ...newAppointment,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleAddAppointment}
                      className="bg-teal text-white hover:bg-teal-dark"
                    >
                      Schedule
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Appointments for selected date */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              Appointments for{' '}
              {selectedDate?.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </CardTitle>
            <CardDescription>
              {sortedAppointments.length} appointments scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sortedAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No appointments scheduled for this date.
              </div>
            ) : (
              <div className="space-y-4">
                {sortedAppointments.map((appointment) => {
                  const appointmentType = getAppointmentType(
                    appointment.typeId
                  );
                  return (
                    <div
                      key={appointment.id}
                      className={`p-4 rounded-lg border ${appointmentType?.color} transition-all hover:shadow-md`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{appointment.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {appointment.date.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}{' '}
                            - {appointmentType?.name} (
                            {appointmentType?.duration} min)
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            {appointment.description}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-teal text-teal hover:bg-teal hover:text-white"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
