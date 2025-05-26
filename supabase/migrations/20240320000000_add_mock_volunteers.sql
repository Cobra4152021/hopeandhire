-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  expertise TEXT[] NOT NULL,
  avatar_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  availability JSONB NOT NULL,
  rating DECIMAL(3,1) DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_volunteers_updated_at
  BEFORE UPDATE ON volunteers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert mock volunteers
INSERT INTO volunteers (
  id,
  full_name,
  expertise,
  avatar_url,
  is_available,
  is_online,
  last_seen,
  availability,
  rating,
  sessions_completed
) VALUES
  (
    'vol_1',
    'Sarah Johnson',
    ARRAY['Career Counseling', 'Resume Review', 'Interview Preparation'],
    'https://i.pravatar.cc/150?img=1',
    true,
    true,
    NOW(),
    '{
      "days": ["Monday", "Wednesday", "Friday"],
      "time_slots": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
    }'::jsonb,
    4.8,
    127
  ),
  (
    'vol_2',
    'Michael Chen',
    ARRAY['Tech Industry', 'Software Engineering', 'Career Transition'],
    'https://i.pravatar.cc/150?img=2',
    true,
    false,
    NOW() - interval '1 hour',
    '{
      "days": ["Tuesday", "Thursday", "Saturday"],
      "time_slots": ["10:00", "11:00", "13:00", "14:00", "15:00"]
    }'::jsonb,
    4.9,
    156
  ),
  (
    'vol_3',
    'Emily Rodriguez',
    ARRAY['HR', 'Talent Acquisition', 'Job Search Strategy'],
    'https://i.pravatar.cc/150?img=3',
    true,
    true,
    NOW(),
    '{
      "days": ["Monday", "Tuesday", "Thursday", "Friday"],
      "time_slots": ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]
    }'::jsonb,
    4.7,
    98
  ),
  (
    'vol_4',
    'David Kim',
    ARRAY['Startup Mentoring', 'Business Development', 'Networking'],
    'https://i.pravatar.cc/150?img=4',
    true,
    false,
    NOW() - interval '30 minutes',
    '{
      "days": ["Wednesday", "Thursday", "Friday"],
      "time_slots": ["13:00", "14:00", "15:00", "16:00", "17:00"]
    }'::jsonb,
    4.6,
    112
  ),
  (
    'vol_5',
    'Lisa Patel',
    ARRAY['Career Change', 'Personal Branding', 'LinkedIn Optimization'],
    'https://i.pravatar.cc/150?img=5',
    true,
    true,
    NOW(),
    '{
      "days": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "time_slots": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]
    }'::jsonb,
    4.9,
    143
  );

-- Create a trigger to update last_seen when volunteer goes offline
CREATE OR REPLACE FUNCTION update_volunteer_last_seen()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_online = false AND OLD.is_online = true THEN
    NEW.last_seen = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_volunteer_last_seen_trigger
  BEFORE UPDATE ON volunteers
  FOR EACH ROW
  EXECUTE FUNCTION update_volunteer_last_seen(); 