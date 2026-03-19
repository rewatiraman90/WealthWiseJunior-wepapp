import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ical from 'ical-generator';
import { syllabusData } from '@/data/curriculum';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    // Fetch user profile
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      return new NextResponse('User not found', { status: 404 });
    }

    if (!profile.is_subscriber) {
      return new NextResponse('User is not a subscriber', { status: 403 });
    }

    const grade = profile.grade || 8;
    const syllabus = syllabusData[grade];

    if (!syllabus) {
      return new NextResponse('Syllabus not found for this grade', { status: 404 });
    }

    // Determine when classes should start.
    // If there is no specific subscription date, fallback to created_at or current date.
    let startDate = new Date(profile.updated_at || profile.created_at || Date.now());
    
    // Start classes from the next day at exactly 8:00 PM IST (14:30 UTC)
    startDate.setUTCHours(14, 30, 0, 0); 
    startDate.setDate(startDate.getDate() + 1);

    const cal = ical({ name: 'WealthWise Jr. Classes' });

    let daysOffset = 0;

    syllabus.modules.forEach((mod) => {
      // Add an event for each lesson step
      mod.steps.forEach((step) => {
        const eventDate = new Date(startDate);
        eventDate.setDate(eventDate.getDate() + daysOffset);

        cal.createEvent({
          start: eventDate,
          end: new Date(eventDate.getTime() + 60 * 60 * 1000), // 1 hour duration
          summary: `WWJ Class: ${step.title}`,
          description: `Topic: ${mod.topic}\n\nMake sure to log into the platform at 8 PM to view your lesson!`,
          location: 'WealthWise Jr. Campus',
          url: 'https://wealth-wise-junior.vercel.app/classes'
        });

        // Space out classes by a week
        daysOffset += 7; 
      });

      // Add an event for the module unit test if present
      if (mod.unitTest && mod.unitTest.length > 0) {
        const testDate = new Date(startDate);
        testDate.setDate(testDate.getDate() + daysOffset);

        cal.createEvent({
          start: testDate,
          end: new Date(testDate.getTime() + 60 * 60 * 1000),
          summary: `WWJ Unit Test: ${mod.month}`,
          description: `Time to test your knowledge on: ${mod.topic}`,
          location: 'WealthWise Jr. Campus',
          url: 'https://wealth-wise-junior.vercel.app/classes'
        });

        daysOffset += 7; 
      }
    });

    return new NextResponse(cal.toString(), {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="wwj_classes_${userId}.ics"`,
      },
    });
  } catch (error: any) {
    console.error("Calendar Generation Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
