'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import {
  Briefcase,
  Building,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Mail,
  BarChart2 as BarChart,
} from 'lucide-react';

interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted';
  applied_date: string;
  last_updated: string;
  next_steps: {
    action: string;
    due_date: string;
    completed: boolean;
  }[];
  company_info: {
    website: string;
    industry: string;
    size: string;
    location: string;
  };
  interview_schedule: {
    date: string;
    type: string;
    interviewer: string;
    notes: string;
  }[];
  follow_ups: {
    date: string;
    type: string;
    status: 'pending' | 'sent' | 'responded';
    notes: string;
  }[];
  success_metrics: {
    response_time: number;
    interview_rate: number;
    offer_rate: number;
  };
}

export default function JobApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [_applications, _setApplications] = useState<JobApplication[]>([]);
  const [_isLoading, _setIsLoading] = useState(true);
  const [_searchTerm, _setSearchTerm] = useState('');
  const [_statusFilter, _setStatusFilter] = useState('all');
  const [_sortOrder, _setSortOrder] = useState('newest');

  // Fetch applications
  const { data: _fetchedApplications, isLoading: _isLoadingApplications } = useQuery<
    JobApplication[],
    Error
  >({
    queryKey: ['applications'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('applied_date', { ascending: false });

      if (error) throw error;
      return data as JobApplication[];
    },
  });

  // Update application status
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: JobApplication['status'] }) => {
      const { error } = await supabase.from('job_applications').update({ status }).eq('id', id);

      if (error) throw error;
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Job Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {_applications?.map((application) => (
                <div
                  key={application.id}
                  className="p-4 border rounded-lg space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{application.position}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        application.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : application.status === 'interviewing'
                            ? 'bg-blue-100 text-blue-800'
                            : application.status === 'offered'
                              ? 'bg-purple-100 text-purple-800'
                              : application.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{application.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Applied {new Date(application.applied_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              <Button className="w-full">
                <Briefcase className="h-4 w-4 mr-2" />
                Add New Application
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedApplication ? selectedApplication.position : 'Select an Application'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedApplication ? (
              <div className="space-y-6">
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="interviews">Interviews</TabsTrigger>
                    <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Company Info */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">Company Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <a
                            href={selectedApplication.company_info.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal hover:underline"
                          >
                            {selectedApplication.company_info.website}
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Industry</p>
                          <p className="text-sm">{selectedApplication.company_info.industry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Company Size</p>
                          <p className="text-sm">{selectedApplication.company_info.size}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="text-sm">{selectedApplication.company_info.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">Next Steps</h3>
                      <div className="space-y-4">
                        {selectedApplication.next_steps.map((step, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {step.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <Clock className="h-5 w-5 text-yellow-600" />
                              )}
                              <div>
                                <p className="text-sm">{step.action}</p>
                                <p className="text-xs text-gray-500">
                                  Due {new Date(step.due_date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateStatus.mutate({
                                  id: selectedApplication.id,
                                  status: 'interviewing',
                                })
                              }
                            >
                              Mark Complete
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Success Metrics */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">Success Metrics</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Response Time</p>
                          <p className="text-lg font-medium">
                            {selectedApplication.success_metrics.response_time} days
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Interview Rate</p>
                          <p className="text-lg font-medium">
                            {selectedApplication.success_metrics.interview_rate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Offer Rate</p>
                          <p className="text-lg font-medium">
                            {selectedApplication.success_metrics.offer_rate}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="interviews" className="space-y-6">
                    {selectedApplication.interview_schedule.map((interview, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{interview.type}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(interview.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Add to Calendar
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Interviewer:</span>{' '}
                            {interview.interviewer}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Notes:</span> {interview.notes}
                          </p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="follow-ups" className="space-y-6">
                    {selectedApplication.follow_ups.map((followUp, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{followUp.type}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(followUp.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              followUp.status === 'responded'
                                ? 'bg-green-100 text-green-800'
                                : followUp.status === 'sent'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {followUp.status}
                          </span>
                        </div>
                        <p className="text-sm">{followUp.notes}</p>
                        {followUp.status === 'pending' && (
                          <Button className="mt-4" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Follow-up
                          </Button>
                        )}
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="analytics">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">Application Analytics</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Application Status</h4>
                          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                            <BarChart className="h-12 w-12 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Response Timeline</h4>
                          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                            <BarChart className="h-12 w-12 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select an application to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
