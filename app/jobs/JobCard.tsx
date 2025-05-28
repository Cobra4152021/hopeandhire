'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  is_remote: boolean;
  created_at: string;
  company: {
    name: string;
    logo_url: string;
  };
}

interface JobCardProps {
  job: Job;
  onApply: () => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Image
                src={job.company.logo_url || '/placeholder.png'}
                alt={job.company.name}
                width={20}
                height={20}
                className="rounded-sm"
              />
              {job.company.name}
            </CardDescription>
          </div>
          <Badge variant="secondary">{job.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.is_remote ? 'Remote' : job.location}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {job.category}
            </div>
          </div>
          <p className={`text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'}`}>
            {job.description}
          </p>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Show less' : 'Show more'}
            </Button>
            <Button size="sm" onClick={onApply}>
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
