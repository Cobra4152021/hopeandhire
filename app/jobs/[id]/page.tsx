import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

type JobWithCompany = Database['public']['Tables']['job_listings']['Row'] & {
  companies: Pick<Database['public']['Tables']['companies']['Row'], 'id' | 'name'> | null;
};

export default async function JobPage({ params }: Props) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('job_listings')
    .select(`
      id,
      title,
      location,
      description,
      job_type,
      created_at,
      companies!job_listings_company_id_fkey(id, name)
    `)
    .eq('id', params.id)
    .single();

  if (error || !data) {
    console.error('Job not found or error:', error);
    notFound();
  }

  const job = data as JobWithCompany;

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{job.companies?.name || "N/A"}</h2>
          <p className="text-gray-600">{job.location}</p>
        </div>
        <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
          {job.job_type}
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{job.description}</p>

      <p className="mt-6 text-sm text-gray-500">
        Posted on {new Date(job.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}