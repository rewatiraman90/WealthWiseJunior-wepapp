import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Validates the Authorization Bearer token from the request header.
 * Returns the authenticated user, or null if unauthenticated.
 */
export async function getAuthenticatedUser(req: NextRequest | Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) return null;

  // Add isAdmin flag to the user object
  return {
    ...user,
    isAdmin: user.email === 'rayraman90@gmail.com'
  };
}
