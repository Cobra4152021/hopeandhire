"use client"

import type React from "react"
import { useState } from "react"

export default function EmployerProfileClientPage() {
  const [profile, setProfile] = useState({
    companyName: "Acme Corporation",
    industry: "Technology",
    website: "https://acmecorp.example.com",
    location: "San Francisco, CA",
    size: "50-200 employees",
    description:
      "Acme Corporation is a leading technology company specializing in innovative solutions for businesses of all sizes.",
    contactName: "Jane Smith",
    contactEmail: "jane.smith@acmecorp.example.com",
    contactPhone: "(555) 123-4567",
    logo: "/generic-company-logo.png",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      <h1 className="text-4xl font-bold text-center mb-12 text-teal-700">Employer Profile</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
        <div className="p-6 bg-teal-50 border-b border-teal-100 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-teal-800">Company Information</h2>
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
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="50-200 employees">50-200 employees</option>
                  <option value="201-500 employees">201-500 employees</option>
                  <option value="501-1000 employees">501-1000 employees</option>
                  <option value="1000+ employees">1000+ employees</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
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
                  src={profile.logo || "/placeholder.svg"}
                  alt={`${profile.companyName} logo`}
                  className="w-full h-auto rounded-lg border border-gray-200"
                />
              </div>

              <div className="md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                  <p className="text-lg text-gray-900">{profile.companyName}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                    <p className="text-gray-900">{profile.industry}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Website</h3>
                    <p className="text-gray-900">
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline"
                      >
                        {profile.website}
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="text-gray-900">{profile.location}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company Size</h3>
                    <p className="text-gray-900">{profile.size}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company Description</h3>
                  <p className="text-gray-900">{profile.description}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-teal-800 mb-4">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Name</h4>
                  <p className="text-gray-900">{profile.contactName}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Email</h4>
                  <p className="text-gray-900">
                    <a href={`mailto:${profile.contactEmail}`} className="text-teal-600 hover:underline">
                      {profile.contactEmail}
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Phone</h4>
                  <p className="text-gray-900">
                    <a href={`tel:${profile.contactPhone}`} className="text-teal-600 hover:underline">
                      {profile.contactPhone}
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
                  id="notifyApplications"
                  defaultChecked
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyApplications" className="ml-2 block text-gray-700">
                  Notify me when I receive new job applications
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
