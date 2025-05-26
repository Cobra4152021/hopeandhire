'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Users,
  ChevronLeft,
  Edit,
  Trash2,
  Share2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Sample job data
const jobData = {
  id: 1,
  title: 'Software Developer',
  company: 'TechCorp Solutions',
  location: 'San Francisco, CA',
  type: 'Full-time',
  salary: '$90,000 - $120,000',
  posted: '2 days ago',
  description:
    'We are looking for a skilled software developer to join our growing team. The ideal candidate will have experience with modern web technologies and a passion for building high-quality applications.',
  responsibilities: [
    'Develop and maintain web applications using React, Node.js, and other modern technologies',
    'Collaborate with cross-functional teams to define, design, and ship new features',
    'Ensure the technical feasibility of UI/UX designs',
    'Optimize applications for maximum speed and scalability',
    'Participate in code reviews and mentor junior developers',
  ],
  requirements: [
    '3+ years of experience with React',
    'Experience with Node.js and Express',
    'Familiarity with AWS or Azure',
    'Strong understanding of web fundamentals (HTML, CSS, JavaScript)',
    'Experience with RESTful APIs and GraphQL',
    "Bachelor's degree in Computer Science or related field",
  ],
  benefits: [
    'Competitive salary and equity package',
    'Health, dental, and vision insurance',
    '401(k) matching',
    'Flexible work hours and remote work options',
    'Professional development budget',
    'Paid time off and parental leave',
  ],
  applications: 12,
  featured: true,
  applicants: [
    {
      id: 1,
      name: 'Michael Johnson',
      role: 'Senior Frontend Developer',
      avatar: '/avatars/michael-johnson.jpg',
      status: 'Reviewed',
      applied: '1 day ago',
      match: 92,
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Full Stack Developer',
      avatar: '/avatars/sarah-williams.jpg',
      status: 'Interviewing',
      applied: '2 days ago',
      match: 88,
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Software Engineer',
      avatar: '/avatars/david-chen.jpg',
      status: 'New',
      applied: '12 hours ago',
      match: 85,
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Frontend Developer',
      avatar: '/avatars/emily-rodriguez.jpg',
      status: 'New',
      applied: '1 day ago',
      match: 78,
    },
  ],
};

export default function JobDetailPage() {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    // In a real app, this would call an API to delete the job
    setIsDeleteDialogOpen(false);
    router.push('/dashboard/jobs');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/jobs')}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {jobData.title}
            </h1>
            <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mt-2">
              <div className="flex items-center mr-4">
                <Building className="mr-1 h-4 w-4" />
                {jobData.company}
              </div>
              <div className="flex items-center mr-4">
                <MapPin className="mr-1 h-4 w-4" />
                {jobData.location}
              </div>
              <div className="flex items-center mr-4">
                <Briefcase className="mr-1 h-4 w-4" />
                {jobData.type}
              </div>
              <div className="flex items-center mr-4">
                <DollarSign className="mr-1 h-4 w-4" />
                {jobData.salary}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                Posted {jobData.posted}
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="border-teal text-teal hover:bg-teal hover:text-white"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Job Listing</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this job listing? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="applicants">
                Applicants ({jobData.applicants.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Job Description
                      </h3>
                      <p className="text-gray-700">{jobData.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Responsibilities
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {jobData.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Requirements
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {jobData.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Benefits
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {jobData.benefits.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="applicants">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {jobData.applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={applicant.avatar || '/placeholder.svg'}
                              alt={applicant.name}
                            />
                            <AvatarFallback className="bg-teal-light/20 text-teal">
                              {applicant.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">
                              {applicant.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {applicant.role}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
                          <Badge
                            className={`${
                              applicant.status === 'New'
                                ? 'bg-blue-100 text-blue-800'
                                : applicant.status === 'Reviewed'
                                  ? 'bg-yellow-light/50 text-yellow-dark'
                                  : 'bg-teal-light/50 text-teal-dark'
                            }`}
                          >
                            {applicant.status}
                          </Badge>
                          <div className="text-sm text-gray-500">
                            Applied {applicant.applied}
                          </div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal-light/20 text-teal font-medium text-sm">
                              {applicant.match}%
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              Match
                            </span>
                          </div>
                          <Link href={`/dashboard/candidates/${applicant.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-teal text-teal hover:bg-teal hover:text-white"
                            >
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-light/20 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Applicants</p>
                    <p className="font-semibold text-gray-900">
                      {jobData.applications}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-light/20 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="font-semibold text-gray-900">
                      {jobData.posted}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-light/20 flex items-center justify-center mr-3">
                    <Briefcase className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="font-semibold text-gray-900">
                      {jobData.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-light/20 flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">
                      {jobData.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-light/20 flex items-center justify-center mr-3">
                    <DollarSign className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="font-semibold text-gray-900">
                      {jobData.salary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <Button className="w-full bg-teal text-white hover:bg-teal-dark">
                    Find Matching Candidates
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Applicants CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
