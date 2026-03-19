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

        const raw = localStorage.getItem('wwj_profile');
        if (raw) {
          const parsed = JSON.parse(raw);
          // Admin bypass logic: if is admin, always force isSubscriber to true
          setProfile({
            ...parsed,
            isSubscriber: isAdmin ? true : parsed.isSubscriber,
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
