-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS resumes_user_id_idx ON resumes(user_id);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own resumes"
  ON resumes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Job seekers can create their own resumes"
  ON resumes FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    auth.jwt() ->> 'role' = 'jobseeker'
  );

CREATE POLICY "Job seekers can update their own resumes"
  ON resumes FOR UPDATE
  USING (
    auth.uid() = user_id AND
    auth.jwt() ->> 'role' = 'jobseeker'
  );

CREATE POLICY "Job seekers can delete their own resumes"
  ON resumes FOR DELETE
  USING (
    auth.uid() = user_id AND
    auth.jwt() ->> 'role' = 'jobseeker'
  );

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Users can upload their own resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resumes' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );

CREATE POLICY "Users can view their own resumes"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'resumes' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );

CREATE POLICY "Users can delete their own resumes"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resumes' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  ); 