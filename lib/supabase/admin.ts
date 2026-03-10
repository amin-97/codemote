import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use this in API routes — bypasses RLS since Clerk handles auth
export const supabaseAdmin = createSupabaseClient(
  supabaseUrl,
  supabaseServiceKey,
);
