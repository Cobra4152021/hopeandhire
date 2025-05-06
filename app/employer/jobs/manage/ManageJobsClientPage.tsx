"use client"

import { useState } from "react"

// Sample job data
const initialJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "Acme Corporation",
    location: "San Francisco, CA",
    type: "Full-time",
    postedDate: "2023-04-15",
    status: "active",
    applicants: 12,
  },
  {
    id: "2",
    title: "Marketing Manager",
    company: "Acme Corporation",
    location: "Remote",
    type: "Full-time",
    postedDate: "2023-04-10",
    status: "active",
    applicants: 8,
  },
  {
    id: "3",
    title: "Customer Support Specialist",
    company: "Acme Corporation",
    location: "Chicago, IL",
    type: "Part-time",
    postedDate: "2023-04-05",
    status: "closed",
    applicants: 15,
  },
  {
    id: "4",
    title: "UX Designer",
    company: "Acme Corporation",
    location: "New York, NY",
    type: "Contract",
    postedDate: "2023-04-01",
    status: "draft",
    applicants: 0,
  },
]

export default function ManageJobsClientPage() {
  const [jobs, setJobs] = useState(initialJobs)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredJobs = jobs.filter((job) => {
    // Filter by status
    if (filter !== "all" && job.status !== filter) {
      return false
    }

    // Filter by search term
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    return true
  })

  const handleStatusChange = (jobId: string, newStatus: string) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job)))
  }

  const handleDeleteJob = (jobId: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      setJobs(jobs.filter((job) => job.id !== jobId))
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-teal-700">Manage Jobs</h1>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border border-teal-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto flex items-center">
              <a
                href="/employer/jobs/new"
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Post New Job
              </a>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
              <div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Jobs</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md border border-teal-100 text-center">
            <p className="text-gray-600">No job postings found matching your criteria.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-teal-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider"
                    >
                      Posted Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider"
                    >
                      Applicants
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-teal-800 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.location}</div>
                        <div className="text-sm text-gray-500">{job.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(job.postedDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === "active"
                              ? "bg-green-100 text-green-800"
                              : job.status === "closed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <a href={`/employer/jobs/${job.id}`} className="text-teal-600 hover:text-teal-900">
                            View
                          </a>
                          <a href={`/employer/jobs/${job.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                          {job.status === "active" ? (
                            <button
                              onClick={() => handleStatusChange(job.id, "closed")}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              Close
                            </button>
                          ) : job.status === "closed" ? (
                            <button
                              onClick={() => handleStatusChange(job.id, "active")}
                              className="text-green-600 hover:text-green-900"
                            >
                              Reopen
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(job.id, "active")}
                              className="text-green-600 hover:text-green-900"
                            >
                              Publish
                            </button>
                          )}
                          <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
