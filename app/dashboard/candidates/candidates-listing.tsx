'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Briefcase, GraduationCap, Filter, Search, ArrowUpDown, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Sample candidate data
const sampleCandidates = [
  {
    id: 1,
    name: 'Michael Johnson',
    avatar: '/avatars/michael-johnson.jpg',
    role: 'Senior Frontend Developer',
    experience: '8 years',
    education: 'B.S. Computer Science, Stanford University',
    status: 'Available',
    matchScore: 95,
    lastActive: '2 days ago',
    featured: true,
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
  },
  {
    id: 2,
    name: 'Sarah Williams',
    avatar: '/avatars/sarah-williams.jpg',
    role: 'Full Stack Developer',
    experience: '6 years',
    education: 'M.S. Software Engineering, MIT',
    status: 'Available',
    matchScore: 88,
    lastActive: '1 day ago',
    featured: false,
    skills: ['Node.js', 'React', 'GraphQL', 'MongoDB'],
  },
  {
    id: 3,
    name: 'David Chen',
    avatar: '/avatars/david-chen.jpg',
    role: 'Backend Developer',
    experience: '5 years',
    education: 'B.S. Computer Engineering, UC Berkeley',
    status: 'Interviewing',
    matchScore: 82,
    lastActive: '3 days ago',
    featured: false,
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    avatar: '/avatars/emily-rodriguez.jpg',
    role: 'UI/UX Designer',
    experience: '4 years',
    education: 'B.A. Design, RISD',
    status: 'Available',
    matchScore: 90,
    lastActive: '1 week ago',
    featured: true,
    skills: ['Figma', 'Sketch', 'Adobe XD', 'CSS'],
  },
  {
    id: 5,
    name: 'James Wilson',
    avatar: '/avatars/james-wilson.jpg',
    role: 'DevOps Engineer',
    experience: '7 years',
    education: 'M.S. Computer Science, Georgia Tech',
    status: 'Placed',
    matchScore: 75,
    lastActive: '1 week ago',
    featured: false,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
  },
];

export default function CandidatesListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter and sort candidates
  const filteredCandidates = sampleCandidates
    .filter((candidate) => {
      // Search filter
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      // Status filter
      const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;

      // Featured filter
      const matchesFeatured = !showFeaturedOnly || candidate.featured;

      return matchesSearch && matchesStatus && matchesFeatured;
    })
    .sort((a, b) => {
      // Sort by match score, name, or experience
      if (sortBy === 'match') {
        return b.matchScore - a.matchScore;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'experience') {
        return (
          Number.parseInt(b.experience.split(' ')[0]) - Number.parseInt(a.experience.split(' ')[0])
        );
      }
      return 0;
    });

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="mt-1 text-sm text-gray-500">Browse and manage job seekers</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/dashboard/candidates/add">
            <Button className="bg-teal text-white hover:bg-teal-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Candidate
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-400" />
                  <span>
                    {filterStatus === 'all' ? 'All Statuses' : `${filterStatus} Candidates`}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Interviewing">Interviewing</SelectItem>
                <SelectItem value="Placed">Placed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4 text-gray-400" />
                  <span>
                    Sort by:{' '}
                    {sortBy === 'match' ? 'Match Score' : sortBy === 'name' ? 'Name' : 'Experience'}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Match Score</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="featured"
              checked={showFeaturedOnly}
              onCheckedChange={(checked) => setShowFeaturedOnly(!!checked)}
              className="mr-2 data-[state=checked]:bg-teal data-[state=checked]:border-teal"
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured candidates only
            </Label>
          </div>
        </div>
      </div>

      {/* Candidate Listings */}
      <div className="space-y-4">
        {filteredCandidates.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No candidates found matching your criteria.</p>
          </div>
        ) : (
          filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              className={`overflow-hidden transition-all hover:shadow-md ${
                candidate.featured ? 'border-l-4 border-l-yellow' : ''
              }`}
            >
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={candidate.avatar || '/placeholder.svg'}
                          alt={candidate.name}
                        />
                        <AvatarFallback className="bg-teal-light/20 text-teal">
                          {candidate.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                          {candidate.featured && (
                            <Badge className="ml-2 bg-yellow text-dark-text">Featured</Badge>
                          )}
                          <Badge
                            className={`ml-2 ${
                              candidate.status === 'Available'
                                ? 'bg-green-100 text-green-800'
                                : candidate.status === 'Interviewing'
                                  ? 'bg-yellow-light/50 text-yellow-dark'
                                  : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {candidate.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{candidate.role}</p>
                        <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-4">
                          <div className="flex items-center mr-4">
                            <Briefcase className="mr-1 h-4 w-4" />
                            {candidate.experience}
                          </div>
                            <div className="flex items-center mr-4">
                            <GraduationCap className="mr-1 h-4 w-4" />
                            {candidate.education}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">Match Score:</span>
                        <span
                          className={`font-medium ${
                            candidate.matchScore >= 90
                              ? 'text-green-600'
                              : candidate.matchScore >= 80
                                ? 'text-teal'
                                : 'text-yellow'
                          }`}
                        >
                          {candidate.matchScore}%
                        </span>
                      </div>
                      <div className="w-32 mb-3">
                        <Progress value={candidate.matchScore} className="h-2" />
                      </div>
                      <Link href={`/dashboard/candidates/${candidate.id}`}>
                        <Button className="bg-teal text-white hover:bg-teal-dark">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
