"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Plus, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

// Sample events data
const initialEvents = [
  {
    id: 1,
    title: "Interview with Michael Johnson",
    date: "2023-05-15",
    time: "10:00 AM - 11:00 AM",
    type: "Interview",
    location: "Virtual (Zoom)",
    description: "Initial interview for the Software Developer position",
    attendees: [
      {
        name: "Michael Johnson",
        avatar: "/stylized-letters-mj.png",
        role: "Candidate",
      },
      {
        name: "Sarah Thompson",
        avatar: "/team-member-1.jpg",
        role: "HR Manager",
      },
    ],
  },
  {
    id: 2,
    title: "Resume Review Session",
    date: "2023-05-17",
    time: "2:00 PM - 3:00 PM",
    type: "Resume Review",
    location: "Office - Room 203",
    description: "Review resumes for the Marketing Specialist position",
    attendees: [
      {
        name: "David Chen",
        avatar: "/stylized-letters-dc.png",
        role: "Hiring Manager",
      },
      {
        name: "Emily Rodriguez",
        avatar: "/stylized-letters-er.png",
        role: "Marketing Director",
      },
    ],
  },
  {
    id: 3,
    title: "Team Hiring Meeting",
    date: "2023-05-20",
    time: "11:00 AM - 12:00 PM",
    type: "Meeting",
    location: "Conference Room A",
    description: "Discuss hiring strategy for Q3",
    attendees: [
      {
        name: "Sarah Thompson",
        avatar: "/team-member-1.jpg",
        role: "HR Manager",
      },
      {
        name: "David Chen",
        avatar: "/stylized-letters-dc.png",
        role: "Hiring Manager",
      },
      {
        name: "Emily Rodriguez",
        avatar: "/stylized-letters-er.png",
        role: "Marketing Director",
      },
    ],
  },
]

export default function SchedulePageClient() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")
  const [events, setEvents] = useState(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
    location: "",
    description: "",
  })

  // Get current month and year for the header
  const currentMonth = date ? date.toLocaleString("default", { month: "long" }) : ""
  const currentYear = date ? date.getFullYear() : ""

  // Filter events for the selected date
  const selectedDateStr = date ? date.toISOString().split("T")[0] : ""
  const eventsForSelectedDate = events.filter((event) => event.date === selectedDateStr)

  // Get events for the current week
  const getWeekDates = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    const monday = new Date(date)
    monday.setDate(diff)

    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(monday)
      nextDate.setDate(monday.getDate() + i)
      weekDates.push(nextDate)
    }
    return weekDates
  }

  const weekDates = date ? getWeekDates(date) : []

  const handlePrevious = () => {
    if (date) {
      const newDate = new Date(date)
      if (view === "day") {
        newDate.setDate(date.getDate() - 1)
      } else if (view === "week") {
        newDate.setDate(date.getDate() - 7)
      } else {
        newDate.setMonth(date.getMonth() - 1)
      }
      setDate(newDate)
    }
  }

  const handleNext = () => {
    if (date) {
      const newDate = new Date(date)
      if (view === "day") {
        newDate.setDate(date.getDate() + 1)
      } else if (view === "week") {
        newDate.setDate(date.getDate() + 7)
      } else {
        newDate.setMonth(date.getMonth() + 1)
      }
      setDate(newDate)
    }
  }

  const handleAddEvent = () => {
    const newEventObj = {
      id: events.length + 1,
      ...newEvent,
      attendees: [
        {
          name: "You",
          avatar: "",
          role: "Organizer",
        },
      ],
    }

    setEvents([...events, newEventObj])
    setIsAddEventOpen(false)
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "",
      location: "",
      description: "",
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Interview":
        return "bg-teal text-white"
      case "Resume Review":
        return "bg-yellow text-dark-text"
      case "Meeting":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your interviews and meetings</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal text-white hover:bg-teal-dark">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Fill in the details to create a new event.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input
                    id="time"
                    placeholder="e.g. 10:00 AM - 11:00 AM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Resume Review">Resume Review</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddEvent} className="bg-teal text-white hover:bg-teal-dark">
                  Add Event
                </Button>
              </DialogFooter>
            </DialogContent>
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
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" initialFocus />

            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Upcoming Events</h3>
              <div className="space-y-3">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        event.type === "Interview"
                          ? "bg-teal"
                          : event.type === "Resume Review"
                            ? "bg-yellow"
                            : "bg-blue-500"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {event.date} • {event.time}
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
            <div>
              <CardTitle>Schedule</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <TabsList>
                <TabsTrigger value="day" onClick={() => setView("day")}>
                  Day
                </TabsTrigger>
                <TabsTrigger value="week" onClick={() => setView("week")}>
                  Week
                </TabsTrigger>
                <TabsTrigger value="month" onClick={() => setView("month")}>
                  Month
                </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {view === "day"
                  ? date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                  : view === "week"
                    ? `${weekDates[0]?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })} - ${weekDates[6]?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                    : `${currentMonth} ${currentYear}`}
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {view === "day" && (
              <div>
                <div className="space-y-4">
                  {eventsForSelectedDate.length > 0 ? (
                    eventsForSelectedDate.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                        </div>
                        <div className="mt-3 flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="flex -space-x-2">
                            {event.attendees.map((attendee: any, index: number) => (
                              <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                                <AvatarFallback className="bg-teal-light/20 text-teal text-xs">
                                  {attendee.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">No events scheduled for this day.</div>
                  )}
                </div>
              </div>
            )}

            {view === "week" && (
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 gap-2 min-w-[700px]">
                  {weekDates.map((weekDate, index) => {
                    const dateStr = weekDate.toISOString().split("T")[0]
                    const dayEvents = events.filter((event) => event.date === dateStr)
                    const isToday =
                      weekDate.getDate() === new Date().getDate() &&
                      weekDate.getMonth() === new Date().getMonth() &&
                      weekDate.getFullYear() === new Date().getFullYear()

                    return (
                      <div key={index} className="min-h-[200px]">
                        <div
                          className={`text-center p-2 mb-2 rounded-t-md ${
                            isToday ? "bg-teal-light/20 font-bold" : "bg-gray-100"
                          }`}
                        >
                          <div className="text-xs text-gray-500">
                            {weekDate.toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                          <div className={`${isToday ? "text-teal" : "text-gray-900"}`}>{weekDate.getDate()}</div>
                        </div>
                        <div className="space-y-2">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`p-2 rounded-md text-xs cursor-pointer ${getEventTypeColor(event.type)}`}
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="truncate">{event.time}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {view === "month" && (
              <div className="text-center py-8 text-gray-500">
                Month view is under development. Please use Day or Week view.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <Badge className={`mt-2 ${getEventTypeColor(selectedEvent.type)}`}>{selectedEvent.type}</Badge>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>
                  {selectedEvent.date} • {selectedEvent.time}
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
                  {selectedEvent.attendees.map((attendee: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                        <AvatarFallback className="bg-teal-light/20 text-teal">
                          {attendee.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{attendee.name}</p>
                        <p className="text-xs text-gray-500">{attendee.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button className="bg-teal text-white hover:bg-teal-dark">Edit Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
