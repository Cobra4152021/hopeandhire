'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import {
  BookOpen,
  Award,
  Users,
  BarChart,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Star,
  Target,
  Bookmark,
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  modules: {
    id: string;
    title: string;
    type: 'video' | 'article' | 'quiz' | 'project';
    duration: number;
    completed: boolean;
    resources: {
      title: string;
      url: string;
      type: string;
    }[];
  }[];
  skills: {
    name: string;
    level: number;
    target_level: number;
  }[];
  badges: {
    name: string;
    description: string;
    earned: boolean;
    progress: number;
  }[];
  community: {
    members: number;
    discussions: number;
    recent_activity: {
      user: string;
      action: string;
      timestamp: string;
    }[];
  };
}

export default function LearningPage() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  // Fetch learning paths
  const { data: learningPaths } = useQuery({
    queryKey: ['learning-paths'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as LearningPath[];
    },
  });

  // Update module completion
  const updateModule = useMutation({
    mutationFn: async ({
      pathId,
      moduleId,
      completed,
    }: {
      pathId: string;
      moduleId: string;
      completed: boolean;
    }) => {
      const { error } = await supabase
        .from('learning_modules')
        .update({ completed })
        .eq('id', moduleId)
        .eq('path_id', pathId);

      if (error) throw error;
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Paths List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Learning Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningPaths?.map((path) => (
                <div
                  key={path.id}
                  className="p-4 border rounded-lg space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedPath(path)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{path.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        path.level === 'beginner'
                          ? 'bg-green-100 text-green-800'
                          : path.level === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {path.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{path.description}</p>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {path.modules.length} modules
                    </span>
                  </div>
                  <Progress value={path.progress} />
                </div>
              ))}
              <Button className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Explore More Paths
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Path Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedPath ? selectedPath.title : 'Select a Learning Path'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPath ? (
              <div className="space-y-6">
                <Tabs defaultValue="modules">
                  <TabsList>
                    <TabsTrigger value="modules">Modules</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="badges">Badges</TabsTrigger>
                    <TabsTrigger value="community">Community</TabsTrigger>
                  </TabsList>

                  <TabsContent value="modules" className="space-y-6">
                    {selectedPath.modules.map((module) => (
                      <div key={module.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-gray-500">
                              {module.type} • {module.duration} minutes
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateModule.mutate({
                                pathId: selectedPath.id,
                                moduleId: module.id,
                                completed: !module.completed,
                              })
                            }
                          >
                            {module.completed ? (
                              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                            )}
                            {module.completed ? 'Completed' : 'Mark Complete'}
                          </Button>
                        </div>

                        {/* Resources */}
                        <div className="space-y-2">
                          {module.resources.map((resource) => (
                            <a
                              key={resource.url}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100"
                            >
                              <Bookmark className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{resource.title}</span>
                              <span className="text-xs text-gray-500">
                                ({resource.type})
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6">
                    {selectedPath.skills.map((skill) => (
                      <div key={skill.name} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{skill.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              Level {skill.level}
                            </span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">
                              Level {skill.target_level}
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={(skill.level / skill.target_level) * 100}
                        />
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="badges" className="space-y-6">
                    {selectedPath.badges.map((badge) => (
                      <div key={badge.name} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center">
                              <Award className="h-6 w-6 text-teal" />
                            </div>
                            <div>
                              <h3 className="font-medium">{badge.name}</h3>
                              <p className="text-sm text-gray-500">
                                {badge.description}
                              </p>
                            </div>
                          </div>
                          {badge.earned ? (
                            <Star className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <Progress value={badge.progress} />
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="community" className="space-y-6">
                    {/* Community Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Members</p>
                            <p className="text-lg font-medium">
                              {selectedPath.community.members}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <BarChart className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Discussions</p>
                            <p className="text-lg font-medium">
                              {selectedPath.community.discussions}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {selectedPath.community.recent_activity.map(
                          (activity, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                  <Users className="h-4 w-4 text-gray-400" />
                                </div>
                                <div>
                                  <p className="text-sm">
                                    <span className="font-medium">
                                      {activity.user}
                                    </span>{' '}
                                    {activity.action}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      activity.timestamp
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Select a learning path to begin
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 