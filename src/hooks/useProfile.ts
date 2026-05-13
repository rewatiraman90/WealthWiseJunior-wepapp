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

        // Check if user has scholarship access
        let hasScholarship = false;
        if (session?.user?.id) {
          const { data: scholarshipData } = await supabase
            .from('scholarship_access')
            .select('id')
            .eq('user_id', session.user.id)
            .is('revoked_at', null)
            .maybeSingle();
          hasScholarship = !!scholarshipData;
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
            id: session?.user?.id || parsed.id
          });
        } else if (isAdmin && session?.user) {
          // Fallback if local storage is cleared but user is admin
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
            id: session?.user?.id
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
