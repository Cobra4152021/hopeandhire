"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function SchedulePageClient() {
  const [date, setDate] = useState<Date | undefined>()
  const [appointmentType, setAppointmentType] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [organization, setOrganization] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedVolunteer, setSelectedVolunteer] = useState("")

  const { toast } = useToast()

  // Sample volunteer recruiters
  const volunteers = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "HR Director",
      specialties: ["Resume Review", "Mock Interview", "Job Placement"],
      availability: ["Monday", "Wednesday", "Friday"],
      bio: "15+ years of HR experience with a focus on recruitment and talent acquisition.",
      image: "/diverse-person-portrait.png",
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Recruiter",
      specialties: ["Resume Review", "Job Placement"],
      availability: ["Tuesday", "Thursday"],
      bio: "Technical recruiter with expertise in matching candidates with the right opportunities.",
      image: "/diverse-person-portrait.png",
    },
    {
      id: "3",
      name: "David Rodriguez",
      title: "Career Coach",
      specialties: ["Mock Interview", "Career Coaching"],
      availability: ["Monday", "Tuesday", "Thursday"],
      bio: "Certified career coach specializing in interview preparation and career transitions.",
      image: "/diverse-person-portrait.png",
    },
  ]

  // Sample time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ]

  // Filter available time slots based on selected date
  // In a real app, this would come from an API call
  const availableTimeSlots = timeSlots.filter((slot) => {
    // For demo purposes, make some slots unavailable
    if (date && date.getDay() === 5 && (slot === "9:00 AM" || slot === "11:00 AM")) {
      return false
    }
    return true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !appointmentType || !timeSlot || !name || !email || !selectedVolunteer) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)

      toast({
        title: "Appointment scheduled",
        description: `Your ${appointmentType} appointment has been scheduled for ${format(date, "MMMM d, yyyy")} at ${timeSlot}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error scheduling your appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8faf9]">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-md mx-auto border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-[#26a69a]" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">Appointment Confirmed!</CardTitle>
                <CardDescription>Your appointment has been successfully scheduled.</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-[#e6f7f5] p-4 rounded-md">
                  <p className="font-medium text-gray-800">{appointmentType}</p>
                  <p className="text-[#26a69a]">
                    {format(date!, "MMMM d, yyyy")} at {timeSlot}
                  </p>
                  <p className="text-gray-600 mt-1">With {volunteers.find((v) => v.id === selectedVolunteer)?.name}</p>
                </div>
                <p className="text-gray-600">
                  We've sent a confirmation email to {email} with all the details of your appointment.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
                  <Link href="/schedule">Schedule Another Appointment</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Schedule an Appointment</h1>
            <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
              Book a session with one of our volunteer recruiters for resume review, interview preparation, or job
              placement assistance.
            </p>

            <Tabs defaultValue="calendar" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
                <TabsTrigger
                  value="calendar"
                  className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
                >
                  Calendar View
                </TabsTrigger>
                <TabsTrigger
                  value="volunteers"
                  className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
                >
                  Browse Volunteers
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calendar">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">Select Appointment Details</CardTitle>
                    <CardDescription>Choose your preferred date, time, and appointment type</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="appointmentType" className="text-gray-700">
                              Appointment Type
                            </Label>
                            <Select value={appointmentType} onValueChange={setAppointmentType} required>
                              <SelectTrigger id="appointmentType" className="border-gray-200 focus:ring-[#26a69a]">
                                <SelectValue placeholder="Select appointment type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="resume-review">Resume Review</SelectItem>
                                <SelectItem value="mock-interview">Mock Interview</SelectItem>
                                <SelectItem value="job-placement">Job Placement Assistance</SelectItem>
                                <SelectItem value="career-coaching">Career Coaching</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-700">Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal border-gray-200",
                                    !date && "text-gray-500",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                                  {date ? format(date, "PPP") : <span>Select date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  onSelect={setDate}
                                  initialFocus
                                  className="rounded-md border border-gray-200"
                                  disabled={(date) => {
                                    // Disable weekends and past dates
                                    const today = new Date()
                                    today.setHours(0, 0, 0, 0)
                                    return date < today || date.getDay() === 0 || date.getDay() === 6
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {date && (
                          <div className="space-y-2">
                            <Label htmlFor="timeSlot" className="text-gray-700">
                              Available Time Slots
                            </Label>
                            <Select value={timeSlot} onValueChange={setTimeSlot} required>
                              <SelectTrigger id="timeSlot" className="border-gray-200 focus:ring-[#26a69a]">
                                <SelectValue placeholder="Select time slot" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableTimeSlots.length > 0 ? (
                                  availableTimeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                      {slot}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="none" disabled>
                                    No available slots for this date
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {date && timeSlot && (
                          <div className="space-y-2">
                            <Label htmlFor="volunteer" className="text-gray-700">
                              Select Volunteer
                            </Label>
                            <Select value={selectedVolunteer} onValueChange={setSelectedVolunteer} required>
                              <SelectTrigger id="volunteer" className="border-gray-200 focus:ring-[#26a69a]">
                                <SelectValue placeholder="Choose a volunteer recruiter" />
                              </SelectTrigger>
                              <SelectContent>
                                {volunteers.map((volunteer) => (
                                  <SelectItem key={volunteer.id} value={volunteer.id}>
                                    {volunteer.name} - {volunteer.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Your Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="border-gray-200 focus:ring-[#26a69a]"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="border-gray-200 focus:ring-[#26a69a]"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-700">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="border-gray-200 focus:ring-[#26a69a]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="organization" className="text-gray-700">
                              Organization (if applicable)
                            </Label>
                            <Input
                              id="organization"
                              value={organization}
                              onChange={(e) => setOrganization(e.target.value)}
                              placeholder="Case management agency, nonprofit, etc."
                              className="border-gray-200 focus:ring-[#26a69a]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes" className="text-gray-700">
                            Additional Notes
                          </Label>
                          <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Please share any specific topics you'd like to discuss during your appointment..."
                            rows={4}
                            className="border-gray-200 focus:ring-[#26a69a]"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full bg-[#26a69a] hover:bg-[#1e8e82] text-white"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          "Schedule Appointment"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="volunteers">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {volunteers.map((volunteer) => (
                    <Card key={volunteer.id} className="border-0 shadow-md">
                      <CardHeader className="text-center pb-2">
                        <div className="mx-auto rounded-full overflow-hidden w-24 h-24 mb-4">
                          <img
                            src={volunteer.image || "/placeholder.svg"}
                            alt={volunteer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-800">{volunteer.name}</CardTitle>
                        <CardDescription>{volunteer.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center space-y-4">
                        <p className="text-gray-600">{volunteer.bio}</p>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">Specialties:</h4>
                          <div className="flex flex-wrap justify-center gap-1">
                            {volunteer.specialties.map((specialty) => (
                              <Badge key={specialty} className="bg-[#e6f7f5] text-[#26a69a] hover:bg-[#d4f0ed]">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">Available on:</h4>
                          <p className="text-gray-600">{volunteer.availability.join(", ")}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full bg-[#26a69a] hover:bg-[#1e8e82] text-white"
                          onClick={() => {
                            setSelectedVolunteer(volunteer.id)
                            document.querySelector('[data-state="inactive"][value="calendar"]')?.click()
                          }}
                        >
                          Schedule with {volunteer.name.split(" ")[0]}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
