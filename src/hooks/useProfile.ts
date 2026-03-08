"use client";
import { useState, useEffect } from 'react';

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
}

export function useProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('wwj_profile');
      if (raw) {
        setProfile(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Failed to parse profile", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { profile, isLoading };
}
