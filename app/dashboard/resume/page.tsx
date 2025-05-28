'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { FileText, Download, Upload, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface Resume {
  id: string;
  title: string;
  content: string;
  ats_score: number;
  keyword_matches: {
    keyword: string;
    count: number;
    importance: 'high' | 'medium' | 'low';
  }[];
  suggestions: {
    type: 'addition' | 'improvement' | 'removal';
    content: string;
    impact: 'high' | 'medium' | 'low';
  }[];
}

export default function ResumePage() {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [_resumeText, _setResumeText] = useState('');
  const [_atsScore, _setAtsScore] = useState<number | null>(null);

  // Fetch resumes
  const { data: resumes } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Resume[];
    },
  });

  // Optimize resume
  const optimizeResume = useMutation({
    mutationFn: async (resumeId: string) => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single();

      if (error) throw error;
      setSelectedResume(data);
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>My Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumes?.map((resume) => (
                <div
                  key={resume.id}
                  className="p-4 border rounded-lg space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedResume(resume)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{resume.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        resume.ats_score >= 80
                          ? 'bg-green-100 text-green-800'
                          : resume.ats_score >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {resume.ats_score}% ATS Score
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {resume.keyword_matches.length} keywords matched
                    </span>
                  </div>
                </div>
              ))}
              <Button className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Resume
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resume Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedResume ? selectedResume.title : 'Select a Resume'}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedResume ? (
              <div className="space-y-6">
                <Tabs defaultValue="edit">
                  <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="optimize">Optimize</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>

                  <TabsContent value="edit" className="space-y-4">
                    <div className="space-y-4">
                      <Input
                        placeholder="Resume Title"
                        value={selectedResume.title}
                        onChange={(e) =>
                          setSelectedResume({
                            ...selectedResume,
                            title: e.target.value,
                          })
                        }
                      />
                      <Textarea
                        placeholder="Resume Content"
                        value={selectedResume.content}
                        onChange={(e) =>
                          setSelectedResume({
                            ...selectedResume,
                            content: e.target.value,
                          })
                        }
                        className="min-h-[400px]"
                      />
                      <div className="flex justify-end gap-4">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button onClick={() => optimizeResume.mutate(selectedResume.id)}>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Optimize
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="optimize" className="space-y-4">
                    {/* ATS Score */}
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">ATS Compatibility Score</h3>
                        <span
                          className={`font-medium ${
                            selectedResume.ats_score >= 80
                              ? 'text-green-600'
                              : selectedResume.ats_score >= 60
                                ? 'text-yellow-600'
                                : 'text-red-600'
                          }`}
                        >
                          {selectedResume.ats_score}%
                        </span>
                      </div>
                      <Progress value={selectedResume.ats_score} />
                    </div>

                    {/* Keyword Matches */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">Keyword Matches</h3>
                      <div className="space-y-2">
                        {selectedResume.keyword_matches.map((match) => (
                          <div key={match.keyword} className="flex items-center justify-between">
                            <span className="text-sm">{match.keyword}</span>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs ${
                                  match.importance === 'high'
                                    ? 'text-green-600'
                                    : match.importance === 'medium'
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                                }`}
                              >
                                {match.count}x
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  match.importance === 'high'
                                    ? 'bg-green-100 text-green-800'
                                    : match.importance === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {match.importance}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-4">AI Suggestions</h3>
                      <div className="space-y-4">
                        {selectedResume.suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            {suggestion.type === 'addition' ? (
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            ) : suggestion.type === 'improvement' ? (
                              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                            )}
                            <div>
                              <p className="text-sm">{suggestion.content}</p>
                              <span
                                className={`text-xs ${
                                  suggestion.impact === 'high'
                                    ? 'text-green-600'
                                    : suggestion.impact === 'medium'
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                                }`}
                              >
                                {suggestion.impact} impact
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview">
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="prose max-w-none">
                        <h1>{selectedResume.title}</h1>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedResume.content,
                          }}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a resume to edit or create a new one</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
