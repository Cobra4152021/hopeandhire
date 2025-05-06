"use client"

import type React from "react"
import { useState } from "react"

export default function VolunteerProfileClientPage() {
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    title: "Senior Recruiter",
    company: "TechRecruit Inc.",
    yearsExperience: "8",
    specialties: ["Technical Recruiting", "Resume Review", "Interview Coaching"],
    bio: "Experienced recruiter with a passion for helping job seekers find their dream roles in the tech industry. I specialize in matching candidates with opportunities that align with their skills and career goals.",
    email: "sarah.johnson@example.com",
    phone: "(555) 987-6543",
    linkedin: "linkedin.com/in/sarahjohnson",
    availability: "Evenings and weekends",
    avatar: "/professional-woman-diverse.png",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSpecialtiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isChecked = e.target.checked

    setFormData((prev) => {
      if (isChecked) {
        return { ...prev, specialties: [...prev.specialties, value] }
      } else {
        return { ...prev, specialties: prev.specialties.filter((item) => item !== value) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setProfile(formData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      setIsEditing(false)
    } catch (err) {
      console.error("Error saving profile:", err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-teal-700">Volunteer Profile</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
        <div className="p-6 bg-teal-50 border-b border-teal-100 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-teal-800">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="yearsExperience"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Technical Recruiting",
                    "Resume Review",
                    "Interview Coaching",
                    "Career Counseling",
                    "Job Search Strategy",
                    "Salary Negotiation",
                  ].map((specialty) => (
                    <div key={specialty} className="flex items-center">
                      <input
                        type="checkbox"
                        id={specialty.replace(/\s+/g, "-").toLowerCase()}
                        name="specialties"
                        value={specialty}
                        checked={formData.specialties.includes(specialty)}
                        onChange={handleSpecialtiesChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={specialty.replace(/\s+/g, "-").toLowerCase()}
                        className="ml-2 block text-gray-700"
                      >
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setFormData(profile)
                }}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {saveSuccess && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                Profile updated successfully!
              </div>
            )}
          </form>
        ) : (
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt={`${profile.name}`}
                  className="w-full h-auto rounded-lg border border-gray-200"
                />
              </div>

              <div className="md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="text-lg text-gray-900">{profile.name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Professional Title</h3>
                    <p className="text-gray-900">{profile.title}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company</h3>
                    <p className="text-gray-900">{profile.company}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Years of Experience</h3>
                    <p className="text-gray-900">{profile.yearsExperience}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                    <p className="text-gray-900">{profile.availability}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Specialties</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="text-gray-900">{profile.bio}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-teal-800 mb-4">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="text-gray-900">
                    <a href={`mailto:${profile.email}`} className="text-teal-600 hover:underline">
                      {profile.email}
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-gray-900">
                    <a href={`tel:${profile.phone}`} className="text-teal-600 hover:underline">
                      {profile.phone}
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">LinkedIn</h4>
                  <p className="text-gray-900">
                    <a
                      href={`https://${profile.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline"
                    >
                      {profile.linkedin}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
        <div className="p-6 bg-teal-50 border-b border-teal-100">
          <h2 className="text-2xl font-semibold text-teal-800">Account Settings</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold text-teal-800 mb-4">Email Notifications</h3>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyAppointments"
                  defaultChecked
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyAppointments" className="ml-2 block text-gray-700">
                  Notify me about new appointment requests
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyMessages"
                  defaultChecked
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyMessages" className="ml-2 block text-gray-700">
                  Notify me when I receive new messages
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyUpdates"
                  defaultChecked
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyUpdates" className="ml-2 block text-gray-700">
                  Notify me about platform updates and new features
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-teal-800 mb-4">Password</h3>

            <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
