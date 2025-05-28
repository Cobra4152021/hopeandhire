import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function getServerSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Auth error:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Server session error:', error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return session;
}

export async function getUserRole() {
  const session = await getServerSession();
  return session?.user?.user_metadata?.role || 'jobseeker';
}
