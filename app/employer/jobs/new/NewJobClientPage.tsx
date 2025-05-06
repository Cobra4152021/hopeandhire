"use client"

import type React from "react"
import { useState } from "react"

export default function NewJobClientPage() {
  const [formData, setFormData] = useState({
    title: "",
    company: "Acme Corporation",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    applicationDeadline: "",
    contactEmail: "jobs@acmecorp.example.com",
    isDraft: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError("There was an error submitting your job posting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
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
            <h1 className="text-3xl font-bold text-teal-800 mb-2">Job Posted Successfully!</h1>
            <p className="text-gray-700 mb-6">
              Your job posting has been {formData.isDraft ? "saved as a draft" : "published"} successfully.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/employer/jobs/manage"
                className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Manage Jobs
              </a>
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    title: "",
                    company: "Acme Corporation",
                    location: "",
                    type: "full-time",
                    salary: "",
                    description: "",
                    requirements: "",
                    benefits: "",
                    applicationDeadline: "",
                    contactEmail: "jobs@acmecorp.example.com",
                    isDraft: false,
                  })
                }}
                className="px-6 py-3 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
              >
                Post Another Job
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-teal-700">Post a New Job</h1>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
        <div className="p-6 bg-teal-50 border-b border-teal-100">
          <h2 className="text-2xl font-semibold text-teal-800">Job Details</h2>
          <p className="text-gray-600 mt-1">Fill out the form below to create a new job posting</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. San Francisco, CA or Remote"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type*
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. $80,000 - $100,000 per year"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Provide a detailed description of the job role and responsibilities"
              ></textarea>
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                Requirements*
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="List the skills, qualifications, and experience required for this position"
              ></textarea>
            </div>

            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                Benefits
              </label>
              <textarea
                id="benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="List the benefits and perks offered with this position"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="applicationDeadline"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email*
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
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={(e) => {
                setFormData((prev) => ({ ...prev, isDraft: true }))
                handleSubmit(e, true)
              }}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isSubmitting && formData.isDraft ? "Saving..." : "Save as Draft"}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting && !formData.isDraft ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
