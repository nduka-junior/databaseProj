import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Create a new response object for setting cookies
  const supabaseResponse = NextResponse.next({
    request,
  });

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Read cookies from the request and extract the string value
  const accessToken = request.cookies.get("supabase-access-token")?.value || "";
  const refreshToken =
    request.cookies.get("supabase-refresh-token")?.value || "";

  if (accessToken && refreshToken) {
    // If tokens are available, set the session
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  // Get the current user from Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // If no user is found, redirect to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Return the response with cookies set
  return supabaseResponse;
}

