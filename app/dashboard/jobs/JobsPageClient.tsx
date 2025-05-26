'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobCard } from './JobCard';
import { Job } from '@/types/job';

export default function JobsPageClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs', search, category, location],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select(
          `
          *,
          company:companies (
            name,
            logo_url,
            location
          )
        `
        )
        .eq('status', 'active');

      if (search) {
        query = query.or(
          `title.ilike.%${search}%,description.ilike.%${search}%`
        );
      }

      if (category !== 'all') {
        query = query.eq('category', category);
      }

      if (location !== 'all') {
        query = query.eq('location', location);
      }

      const { data, error } = await query.order('created_at', {
        ascending: false,
      });

      if (error) throw error;
      return data as Job[];
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Available Jobs</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:col-span-2"
        />
        <div className="flex gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : jobs?.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No jobs found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}
