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
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Edit,
  Save,
  X,
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
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
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});

  // Fetch profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (data: Partial<Profile>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData);
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Profile</CardTitle>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(!isEditing);
              if (!isEditing && profile) {
                setFormData(profile);
              }
            }}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  rows={4}
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

              <div className="space-y-4">
                <h3 className="font-medium">Experience</h3>
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
                  Add Experience
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Education</h3>
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
                  Add Education
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Certifications</h3>
                {formData.certifications?.map((cert, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <Input
                      name={`certifications[${index}].name`}
                      value={cert.name}
                      onChange={handleChange}
                      placeholder="Certification Name"
                    />
                    <Input
                      name={`certifications[${index}].issuer`}
                      value={cert.issuer}
                      onChange={handleChange}
                      placeholder="Issuing Organization"
                    />
                    <Input
                      name={`certifications[${index}].date`}
                      value={cert.date}
                      onChange={handleChange}
                      placeholder="Date Earned"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      certifications: [
                        ...(prev.certifications || []),
                        {
                          name: '',
                          issuer: '',
                          date: '',
                        },
                      ],
                    }))
                  }
                >
                  Add Certification
                </Button>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{profile?.full_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{profile?.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{profile?.location}</p>
                  </div>
                </div>
              </div>

              {profile?.bio && (
                <div>
                  <h3 className="font-medium mb-2">Bio</h3>
                  <p className="text-gray-600">{profile.bio}</p>
                </div>
              )}

              {profile?.skills && profile.skills.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile?.experience && profile.experience.length > 0 && (
                <div>
                  <h3 className="font-medium mb-4">Experience</h3>
                  <div className="space-y-4">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
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
              )}

              {profile?.education && profile.education.length > 0 && (
                <div>
                  <h3 className="font-medium mb-4">Education</h3>
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <GraduationCap className="w-5 h-5 text-gray-400 mt-1" />
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
              )}

              {profile?.certifications && profile.certifications.length > 0 && (
                <div>
                  <h3 className="font-medium mb-4">Certifications</h3>
                  <div className="space-y-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Award className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-500">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 