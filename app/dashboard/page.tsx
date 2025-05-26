'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/lib/supabase';
import {
  Briefcase,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
} from 'lucide-react';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
}

interface SkillGap {
  skill: string;
  demand: number;
  relevance: number;
  learning_resources: string[];
}

export default function DashboardPage() {
  // Fetch user profile and stats
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Fetch AI-matched jobs
  const { data: matchedJobs } = useQuery({
    queryKey: ['matched-jobs'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('job_matches')
        .select('*')
        .eq('user_id', user.id)
        .order('match_score', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as JobMatch[];
    },
  });

  // Fetch skill gaps analysis
  const { data: skillGaps } = useQuery({
    queryKey: ['skill-gaps'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('skill_gaps')
        .select('*')
        .eq('user_id', user.id)
        .order('demand', { ascending: false });

      if (error) throw error;
      return data as SkillGap[];
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={profile?.completion_percentage || 0} />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Resume</span>
                  <span className="text-sm font-medium">
                    {profile?.has_resume ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Skills</span>
                  <span className="text-sm font-medium">
                    {profile?.skills?.length || 0} skills
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Experience</span>
                  <span className="text-sm font-medium">
                    {profile?.has_experience ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Job Matches */}
        <Card>
          <CardHeader>
            <CardTitle>AI Job Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matchedJobs?.map((job) => (
                <div key={job.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{job.title}</h3>
                    <span className="text-sm text-teal">
                      {job.match_score}% match
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{job.company}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.matching_skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-teal/10 text-teal rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGaps?.map((gap) => (
                <div key={gap.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{gap.skill}</h3>
                    <span className="text-sm text-gray-500">
                      {gap.demand}% demand
                    </span>
                  </div>
                  <Progress value={gap.relevance} />
                  <div className="flex flex-wrap gap-2">
                    {gap.learning_resources.map((resource) => (
                      <a
                        key={resource}
                        href={resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-teal hover:underline"
                      >
                        Learn {gap.skill}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <Briefcase className="h-6 w-6" />
                  <span>Find Jobs</span>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span>Learning</span>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Messages</span>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Career Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Career Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-8 w-8 text-teal" />
                <div>
                  <h3 className="font-medium">Industry Trends</h3>
                  <p className="text-sm text-gray-500">
                    Top growing skills in your field
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-teal" />
                <div>
                  <h3 className="font-medium">Career Goals</h3>
                  <p className="text-sm text-gray-500">
                    Track your progress
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="h-8 w-8 text-teal" />
                <div>
                  <h3 className="font-medium">Achievements</h3>
                  <p className="text-sm text-gray-500">
                    Your milestones and badges
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Network Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-teal" />
                <div>
                  <h3 className="font-medium">Connections</h3>
                  <p className="text-sm text-gray-500">
                    {profile?.connections_count || 0} professional connections
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-teal" />
                <div>
                  <h3 className="font-medium">Messages</h3>
                  <p className="text-sm text-gray-500">
                    {profile?.unread_messages || 0} unread messages
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-teal" />
                <div>
                  <h3 className="font-medium">Upcoming Meetings</h3>
                  <p className="text-sm text-gray-500">
                    {profile?.upcoming_meetings || 0} scheduled meetings
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
