'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import {
  Video,
  Mic,
  FileText,
  BarChart,
  Play,
  Pause,
  StopCircle,
  Download,
} from 'lucide-react';

interface MockInterview {
  id: string;
  title: string;
  industry: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: string[];
  feedback: {
    strengths: string[];
    improvements: string[];
    score: number;
  };
}

export default function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<MockInterview | null>(null);

  // Fetch mock interviews
  const { data: mockInterviews } = useQuery({
    queryKey: ['mock-interviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mock_interviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MockInterview[];
    },
  });

  // Start mock interview
  const startInterview = useMutation({
    mutationFn: async (interviewId: string) => {
      const { data, error } = await supabase
        .from('mock_interviews')
        .select('*')
        .eq('id', interviewId)
        .single();

      if (error) throw error;
      setSelectedInterview(data);
      setIsRecording(true);
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interview Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Mock Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInterviews?.map((interview) => (
                <div
                  key={interview.id}
                  className="p-4 border rounded-lg space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => startInterview.mutate(interview.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{interview.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        interview.difficulty === 'beginner'
                          ? 'bg-green-100 text-green-800'
                          : interview.difficulty === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {interview.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{interview.industry}</p>
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {interview.questions.length} questions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interview Session */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedInterview ? selectedInterview.title : 'Select an Interview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedInterview ? (
              <div className="space-y-6">
                {/* Video Recording */}
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  {isRecording ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 animate-pulse" />
                      <p className="text-red-500 font-medium">Recording...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Video className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Camera Ready</p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  {!isRecording ? (
                    <Button
                      onClick={() => setIsRecording(true)}
                      className="bg-teal text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsRecording(false)}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsRecording(false)}
                      >
                        <StopCircle className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                    </>
                  )}
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  <h3 className="font-medium">Interview Questions</h3>
                  <div className="space-y-2">
                    {selectedInterview.questions.map((question, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg bg-gray-50"
                      >
                        <p className="text-sm">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                {selectedInterview.feedback && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Feedback</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Strengths</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {selectedInterview.feedback.strengths.map(
                            (strength, index) => (
                              <li key={index}>{strength}</li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Areas for Improvement</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {selectedInterview.feedback.improvements.map(
                            (improvement, index) => (
                              <li key={index}>{improvement}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Overall Score</h4>
                        <span className="text-teal font-medium">
                          {selectedInterview.feedback.score}%
                        </span>
                      </div>
                      <Progress value={selectedInterview.feedback.score} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Select a mock interview to begin
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 