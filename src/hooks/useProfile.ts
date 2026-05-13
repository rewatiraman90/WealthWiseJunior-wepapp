"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface StudentProfile {
  name: string;
  age: string;
  grade: string;
  school: string;
  city: string;
  rollNumber: string;
  isSubscriber: boolean;
  hasScholarship?: boolean;
  joinedDate: string;
  avatar?: string;
  isAdmin?: boolean;
  id?: string;
  xp_total?: number;
  current_streak?: number;
  longest_streak?: number;
  attended_count?: number;
}

export function useProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const userEmail = session?.user?.email;
        const isAdmin = userEmail === 'rayraman90@gmail.com';

        let hasScholarship = false;
        let xp_total = 0;
        let current_streak = 0;
        let longest_streak = 0;
        let attended_count = 0;

        if (session?.user?.id) {
          const [scholarshipResult, progressResult] = await Promise.all([
            supabase
              .from('scholarship_access')
              .select('id')
              .eq('user_id', session.user.id)
              .is('revoked_at', null)
              .maybeSingle(),
            supabase
              .from('profiles')
              .select('xp_total, current_streak, longest_streak, attended_count')
              .eq('id', session.user.id)
              .maybeSingle(),
          ]);

          hasScholarship = !!scholarshipResult.data;

          if (progressResult.data) {
            xp_total = progressResult.data.xp_total ?? 0;
            current_streak = progressResult.data.current_streak ?? 0;
            longest_streak = progressResult.data.longest_streak ?? 0;
            attended_count = progressResult.data.attended_count ?? 0;
          }
        }

        const raw = localStorage.getItem('wwj_profile');
        if (raw) {
          const parsed = JSON.parse(raw);
          setProfile({
            ...parsed,
            joinedDate: parsed.joinedDate || parsed.created_at || new Date().toISOString(),
            isSubscriber: isAdmin || hasScholarship || parsed.isSubscriber,
            hasScholarship,
            isAdmin,
            id: session?.user?.id || parsed.id,
            xp_total,
            current_streak,
            longest_streak,
            attended_count,
          });
        } else if (isAdmin && session?.user) {
          setProfile({
            name: 'Admin',
            age: '25',
            grade: '12',
            school: 'WWJ Academy',
            city: 'Bangalore',
            rollNumber: 'ADMIN-001',
            isSubscriber: true,
            joinedDate: new Date().toISOString(),
            isAdmin: true,
            id: session?.user?.id,
            xp_total,
            current_streak,
            longest_streak,
            attended_count,
          });
        }
      } catch (e) {
        console.error("Failed to parse profile", e);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  return { profile, isLoading };
}
