-- Create tables for the Hope and Hire platform

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  size TEXT,
  description TEXT,
  mission TEXT,
  location TEXT,
  hiring_policy TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  is_remote BOOLEAN DEFAULT FALSE,
  employment_type TEXT NOT NULL,
  salary_min INTEGER NOT NULL,
  salary_max INTEGER NOT NULL,
  benefits TEXT,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Companies policies
CREATE POLICY "Employers can view their own companies"
  ON companies FOR SELECT
  USING (auth.uid() = employer_id);

CREATE POLICY "Employers can insert their own companies"
  ON companies FOR INSERT
  WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can update their own companies"
  ON companies FOR UPDATE
  USING (auth.uid() = employer_id);

CREATE POLICY "Employers can delete their own companies"
  ON companies FOR DELETE
  USING (auth.uid() = employer_id);

-- Jobs policies
CREATE POLICY "Employers can view their own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = employer_id);

CREATE POLICY "Employers can insert their own jobs"
  ON jobs FOR INSERT
  WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can update their own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = employer_id);

CREATE POLICY "Employers can delete their own jobs"
  ON jobs FOR DELETE
  USING (auth.uid() = employer_id);

-- Allow volunteers to view active jobs
CREATE POLICY "Volunteers can view active jobs"
  ON jobs FOR SELECT
  USING (status = 'active');
