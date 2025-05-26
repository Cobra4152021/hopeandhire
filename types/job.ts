export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  is_remote: boolean;
  status: 'active' | 'closed';
  recruiter_id: string;
  created_at: string;
  updated_at: string;
  company?: {
    name: string;
    logo_url: string | null;
    location: string;
  };
}
