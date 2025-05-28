'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { ArrowRight, DollarSign, TrendingUp, Users, Award, BookOpen } from 'lucide-react';

interface CareerPath {
  id: string;
  title: string;
  industry: string;
  levels: {
    level: string;
    title: string;
    salary_range: {
      min: number;
      max: number;
    };
    required_skills: string[];
    certifications: string[];
    time_to_achieve: number;
  }[];
  transitions: {
    from: string;
    to: string;
    difficulty: 'easy' | 'medium' | 'hard';
    required_skills: string[];
    time_to_transition: number;
  }[];
  success_stories: {
    name: string;
    title: string;
    company: string;
    journey: string;
    advice: string;
  }[];
}

export default function CareerPathPage() {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  // Fetch career paths
  const { data: careerPaths } = useQuery({
    queryKey: ['career-paths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('career_paths')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as CareerPath[];
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career Path List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Career Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerPaths?.map((path) => (
                <div
                  key={path.id}
                  className="p-4 border rounded-lg space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedPath(path)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{path.title}</h3>
                    <span className="text-sm text-gray-500">{path.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {path.levels.length} career levels
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Path Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedPath ? selectedPath.title : 'Select a Career Path'}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPath ? (
              <div className="space-y-6">
                <Tabs defaultValue="progression">
                  <TabsList>
                    <TabsTrigger value="progression">Progression</TabsTrigger>
                    <TabsTrigger value="transitions">Transitions</TabsTrigger>
                    <TabsTrigger value="stories">Success Stories</TabsTrigger>
                  </TabsList>

                  <TabsContent value="progression" className="space-y-6">
                    {selectedPath.levels.map((level, index) => (
                      <div key={level.level} className="relative p-4 border rounded-lg">
                        {index < selectedPath.levels.length - 1 && (
                          <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200" />
                        )}
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center">
                            <Award className="h-8 w-8 text-teal" />
                          </div>
                          <div className="flex-grow space-y-4">
                            <div>
                              <h3 className="font-medium">{level.title}</h3>
                              <p className="text-sm text-gray-500">Level {level.level}</p>
                            </div>

                            {/* Salary Range */}
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">
                                ${level.salary_range.min.toLocaleString()} - $
                                {level.salary_range.max.toLocaleString()}
                              </span>
                            </div>

                            {/* Required Skills */}
                            <div>
                              <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {level.required_skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Certifications */}
                            <div>
                              <h4 className="text-sm font-medium mb-2">Certifications</h4>
                              <div className="flex flex-wrap gap-2">
                                {level.certifications.map((cert) => (
                                  <span
                                    key={cert}
                                    className="px-2 py-1 bg-teal/10 text-teal rounded-full text-xs"
                                  >
                                    {cert}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Time to Achieve */}
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">
                                {level.time_to_achieve} months to achieve
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="transitions" className="space-y-6">
                    {selectedPath.transitions.map((transition) => (
                      <div
                        key={`${transition.from}-${transition.to}`}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{transition.from}</span>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{transition.to}</span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              transition.difficulty === 'easy'
                                ? 'bg-green-100 text-green-800'
                                : transition.difficulty === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transition.difficulty}
                          </span>
                        </div>

                        {/* Required Skills */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {transition.required_skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Time to Transition */}
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {transition.time_to_transition} months to transition
                          </span>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="stories" className="space-y-6">
                    {selectedPath.success_stories.map((story) => (
                      <div key={story.name} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-teal" />
                          </div>
                          <div className="flex-grow space-y-4">
                            <div>
                              <h3 className="font-medium">{story.name}</h3>
                              <p className="text-sm text-gray-500">
                                {story.title} at {story.company}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Journey</h4>
                              <p className="text-sm text-gray-600">{story.journey}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Advice</h4>
                              <p className="text-sm text-gray-600">{story.advice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a career path to explore</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
