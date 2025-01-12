// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase URL or ANON KEY is missing from environment variables"
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Await the cookies promise to access cookies
  const cookieStore = await cookies();

  // Retrieve both access and refresh tokens from cookies
  const accessToken = cookieStore.get("supabase-access-token");
  const refreshToken = cookieStore.get("supabase-refresh-token");

  if (accessToken && refreshToken) {
    // Use the setSession method with the required tokens
    await supabase.auth.setSession({
      access_token: accessToken.value,
      refresh_token: refreshToken.value,
    });
  }

  return supabase;
}
