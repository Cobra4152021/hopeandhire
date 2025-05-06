"use client"

import type React from "react"
import { useState } from "react"

export const metadata = {
  title: "Schedule an Appointment - Hope and Hire",
  description: "Schedule an appointment with a volunteer recruiter",
}

// Sample volunteer data
const volunteers = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Recruiter",
    specialties: ["Technical Recruiting", "Resume Review", "Interview Coaching"],
    avatar: "/professional-woman-diverse.png",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "HR Specialist",
    specialties: ["Career Counseling", "Job Search Strategy", "Salary Negotiation"],
    avatar: "/professional-asian-man.png",
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    title: "Talent Acquisition Manager",
    specialties: ["Resume Review", "Interview Coaching", "Career Transitions"],
    avatar: "/professional-latino-man.png",
  },
]

// Sample available time slots
const generateTimeSlots = () => {
  const today = new Date()
  const slots = []

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    const dateStr = date.toISOString().split("T")[0]

    // Generate time slots for each day
    const daySlots = []
    for (let hour = 9; hour <= 16; hour++) {
      if (hour !== 12) {
        // Skip lunch hour
        daySlots.push({
          id: `${dateStr}-${hour}`,
          time: `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`,
          available: Math.random() > 0.3, // Randomly mark some as unavailable
        })
      }
    }

    slots.push({
      date: dateStr,
      dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
      month: date.toLocaleDateString("en-US", { month: "long" }),
      day: date.getDate(),
      slots: daySlots,
    })
  }

  return slots
}

const timeSlots = generateTimeSlots()

export default function SchedulePageClient() {
  const [selectedVolunteer, setSelectedVolunteer] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedVolunteer || !selectedDate || !selectedTime || !appointmentType) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError("There was an error scheduling your appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedDateObj = timeSlots.find((slot) => slot.date === selectedDate)

  if (isSubmitted) {
    const volunteer = volunteers.find((v) => v.id === selectedVolunteer)
    const dateObj = new Date(selectedDate)
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-teal-100">
          <div className="text-center">
            <div className="bg-teal-100 p-3 rounded-full inline-block mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-teal-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-teal-800 mb-2">Appointment Scheduled!</h1>
            <p className="text-gray-700 mb-6">Your appointment has been scheduled successfully.</p>

            <div className="bg-teal-50 p-6 rounded-lg border border-teal-100 mb-6 text-left">
              <h2 className="text-xl font-semibold text-teal-800 mb-4">Appointment Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Volunteer</h3>
                  <p className="text-gray-900">{volunteer?.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Appointment Type</h3>
                  <p className="text-gray-900">{appointmentType}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="text-gray-900">{formattedDate}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Time</h3>
                  <p className="text-gray-900">{selectedTime}</p>
                </div>
              </div>

              {notes && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="text-gray-900">{notes}</p>
                </div>
              )}
            </div>

            <p className="text-gray-700 mb-6">
              You will receive a confirmation email with these details. If you need to reschedule or cancel your
              appointment, please contact us at least 24 hours in advance.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/" className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                Return to Home
              </a>
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setSelectedVolunteer("")
                  setSelectedDate("")
                  setSelectedTime("")
                  setAppointmentType("")
                  setNotes("")
                }}
                className="px-6 py-3 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
              >
                Schedule Another Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-teal-700">Schedule an Appointment</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
        <div className="p-6 bg-teal-50 border-b border-teal-100">
          <h2 className="text-2xl font-semibold text-teal-800">Book a Session with a Volunteer Recruiter</h2>
          <p className="text-gray-600 mt-1">Select a volunteer, date, and time for your appointment</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-teal-800 mb-4">1. Select a Volunteer Recruiter</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {volunteers.map((volunteer) => (
                  <div
                    key={volunteer.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedVolunteer === volunteer.id
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50"
                    }`}
                    onClick={() => setSelectedVolunteer(volunteer.id)}
                  >
                    <div className="flex items-center mb-3">
                      <img
                        src={volunteer.avatar || "/placeholder.svg"}
                        alt={volunteer.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{volunteer.name}</h4>
                        <p className="text-sm text-gray-500">{volunteer.title}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {volunteer.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-teal-800 mb-4">2. Select Appointment Type</h3>

              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select appointment type</option>
                <option value="Resume Review">Resume Review</option>
                <option value="Mock Interview">Mock Interview</option>
                <option value="Career Counseling">Career Counseling</option>
                <option value="Job Search Strategy">Job Search Strategy</option>
                <option value="Salary Negotiation">Salary Negotiation</option>
              </select>
            </div>

            <div>
              <h3 className="text-lg font-medium text-teal-800 mb-4">3. Select a Date</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.slice(0, 10).map((slot) => (
                  <div
                    key={slot.date}
                    className={`border rounded-lg p-3 text-center cursor-pointer transition-colors ${
                      selectedDate === slot.date
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50"
                    }`}
                    onClick={() => {
                      setSelectedDate(slot.date)
                      setSelectedTime("")
                    }}
                  >
                    <p className="text-sm text-gray-500">{slot.dayOfWeek.slice(0, 3)}</p>
                    <p className="text-lg font-semibold text-gray-900">{slot.day}</p>
                    <p className="text-sm text-gray-500">{slot.month.slice(0, 3)}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div>
                <h3 className="text-lg font-medium text-teal-800 mb-4">4. Select a Time</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedDateObj?.slots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`border rounded-lg p-3 text-center transition-colors ${
                        !slot.available
                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : selectedTime === slot.time
                            ? "border-teal-500 bg-teal-50 cursor-pointer"
                            : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 cursor-pointer"
                      }`}
                      onClick={() => {
                        if (slot.available) {
                          setSelectedTime(slot.time)
                        }
                      }}
                    >
                      <p className="text-base font-medium">{slot.time}</p>
                      <p className="text-xs text-gray-500">{slot.available ? "Available" : "Unavailable"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium text-teal-800 mb-4">5. Additional Notes (Optional)</h3>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Please provide any additional information that might help the volunteer prepare for your appointment"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting || !selectedVolunteer || !selectedDate || !selectedTime || !appointmentType}
                className="w-full px-4 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
