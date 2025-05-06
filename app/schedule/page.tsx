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
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>()
  const [appointmentType, setAppointmentType] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [organization, setOrganization] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()

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

    if (!date || !appointmentType || !timeSlot || !name || !email) {
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

      toast({
        title: "Appointment scheduled",
        description: `Your ${appointmentType} appointment has been scheduled for ${format(date, "MMMM d, yyyy")} at ${timeSlot}.`,
      })

      // Reset form
      setDate(undefined)
      setAppointmentType("")
      setTimeSlot("")
      setName("")
      setEmail("")
      setPhone("")
      setOrganization("")
      setNotes("")
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Schedule an Appointment</h1>
            <p className="text-muted-foreground mb-8">
              Book a session with one of our volunteer recruiters for resume review, interview preparation, or job
              placement assistance.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Select your preferred date, time, and appointment type</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentType">Appointment Type</Label>
                        <Select value={appointmentType} onValueChange={setAppointmentType} required>
                          <SelectTrigger id="appointmentType">
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
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
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
                        <Label htmlFor="timeSlot">Available Time Slots</Label>
                        <Select value={timeSlot} onValueChange={setTimeSlot} required>
                          <SelectTrigger id="timeSlot">
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
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization (if applicable)</Label>
                        <Input
                          id="organization"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="Case management agency, nonprofit, etc."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Please share any specific topics you'd like to discuss during your appointment..."
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
