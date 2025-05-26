'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  Award,
  Briefcase,
  GraduationCap,
  User,
} from 'lucide-react';

interface Resume {
  id: string;
  title: string;
  content: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
    description: string;
  }[];
  created_at: string;
  updated_at: string;
}

export default function ResumesPage() {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [formData, setFormData] = useState<Partial<Resume>>({});

  // Fetch resumes
  const { data: resumes, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
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

  // Create resume mutation
  const createResume = useMutation({
    mutationFn: async (data: Partial<Resume>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('resumes')
        .insert({
          ...data,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Resume created successfully',
      });
      setIsCreating(false);
      setFormData({});
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create resume',
        variant: 'destructive',
      });
    },
  });

  // Update resume mutation
  const updateResume = useMutation({
    mutationFn: async (data: Partial<Resume>) => {
      if (!editingResume) throw new Error('No resume selected');

      const { error } = await supabase
        .from('resumes')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingResume.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Resume updated successfully',
      });
      setEditingResume(null);
      setFormData({});
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update resume',
        variant: 'destructive',
      });
    },
  });

  // Delete resume mutation
  const deleteResume = useMutation({
    mutationFn: async (resumeId: string) => {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Resume deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete resume',
        variant: 'destructive',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingResume) {
      updateResume.mutate(formData);
    } else {
      createResume.mutate(formData);
    }
  };

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Resumes</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Resume
        </Button>
      </div>

      {/* Resume List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes?.map((resume) => (
          <Card key={resume.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {resume.title}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingResume(resume);
                      setFormData(resume);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteResume.mutate(resume.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Experience</h3>
                  <div className="space-y-3">
                    {resume.experience.map((exp, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="font-medium">{exp.position}</p>
                          <p className="text-sm text-gray-500">
                            {exp.company} • {exp.duration}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Education</h3>
                  <div className="space-y-3">
                    {resume.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-gray-500">
                            {edu.institution} • {edu.year}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-500">
                    Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Resume Modal */}
      {(isCreating || editingResume) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingResume ? 'Edit Resume' : 'Create New Resume'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer Resume"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills?.join(', ') || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        skills: e.target.value.split(',').map((s) => s.trim()),
                      }))
                    }
                    placeholder="Enter skills separated by commas"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Experience</Label>
                  {formData.experience?.map((exp, index) => (
                    <div key={index} className="space-y-4 p-4 border rounded-lg">
                      <Input
                        name={`experience[${index}].position`}
                        value={exp.position}
                        onChange={handleChange}
                        placeholder="Position"
                      />
                      <Input
                        name={`experience[${index}].company`}
                        value={exp.company}
                        onChange={handleChange}
                        placeholder="Company"
                      />
                      <Input
                        name={`experience[${index}].duration`}
                        value={exp.duration}
                        onChange={handleChange}
                        placeholder="Duration"
                      />
                      <Textarea
                        name={`experience[${index}].description`}
                        value={exp.description}
                        onChange={handleChange}
                        placeholder="Description"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        experience: [
                          ...(prev.experience || []),
                          {
                            company: '',
                            position: '',
                            duration: '',
                            description: '',
                          },
                        ],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Education</Label>
                  {formData.education?.map((edu, index) => (
                    <div key={index} className="space-y-4 p-4 border rounded-lg">
                      <Input
                        name={`education[${index}].degree`}
                        value={edu.degree}
                        onChange={handleChange}
                        placeholder="Degree"
                      />
                      <Input
                        name={`education[${index}].institution`}
                        value={edu.institution}
                        onChange={handleChange}
                        placeholder="Institution"
                      />
                      <Input
                        name={`education[${index}].year`}
                        value={edu.year}
                        onChange={handleChange}
                        placeholder="Year"
                      />
                      <Textarea
                        name={`education[${index}].description`}
                        value={edu.description}
                        onChange={handleChange}
                        placeholder="Description"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        education: [
                          ...(prev.education || []),
                          {
                            institution: '',
                            degree: '',
                            year: '',
                            description: '',
                          },
                        ],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingResume(null);
                      setFormData({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingResume ? 'Update Resume' : 'Create Resume'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
