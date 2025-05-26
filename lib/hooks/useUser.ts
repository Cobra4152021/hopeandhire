import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export type UserRole = 'jobseeker' | 'volunteer' | 'employer' | null;

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  avatar_url?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          setUser({
            id: authUser.id,
            email: authUser.email!,
            role: authUser.user_metadata.role as UserRole,
            name: profile?.name,
            avatar_url: profile?.avatar_url,
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata.role as UserRole,
          name: profile?.name,
          avatar_url: profile?.avatar_url,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { user, loading };
}
