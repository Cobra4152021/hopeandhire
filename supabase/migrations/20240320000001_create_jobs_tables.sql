-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  is_remote BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active',
  recruiter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(job_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS jobs_recruiter_id_idx ON jobs(recruiter_id);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs(status);
CREATE INDEX IF NOT EXISTS job_applications_job_id_idx ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS job_applications_user_id_idx ON job_applications(user_id);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs
CREATE POLICY "Anyone can view active jobs"
  ON jobs FOR SELECT
  USING (status = 'active');

CREATE POLICY "Recruiters can view their own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = recruiter_id);

CREATE POLICY "Recruiters can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (
    auth.uid() = recruiter_id AND
    auth.jwt() ->> 'role' = 'recruiter'
  );

CREATE POLICY "Recruiters can update their own jobs"
  ON jobs FOR UPDATE
  USING (
    auth.uid() = recruiter_id AND
    auth.jwt() ->> 'role' = 'recruiter'
  );

CREATE POLICY "Recruiters can delete their own jobs"
  ON jobs FOR DELETE
  USING (
    auth.uid() = recruiter_id AND
    auth.jwt() ->> 'role' = 'recruiter'
  );

-- Create policies for job_applications
CREATE POLICY "Users can view their own applications"
  ON job_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Recruiters can view applications for their jobs"
  ON job_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = job_applications.job_id
      AND jobs.recruiter_id = auth.uid()
    )
  );

CREATE POLICY "Job seekers can create applications"
  ON job_applications FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    auth.jwt() ->> 'role' = 'jobseeker'
  );

CREATE POLICY "Recruiters can update applications for their jobs"
  ON job_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = job_applications.job_id
      AND jobs.recruiter_id = auth.uid()
    )
  ); 