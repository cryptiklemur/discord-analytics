import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback`,
      scopes: "identify guilds",
    },
  });

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(
    `${requestUrl.origin}?error=Could not authenticate`,
  );
}
