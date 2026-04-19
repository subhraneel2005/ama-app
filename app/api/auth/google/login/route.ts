import { NextRequest, NextResponse } from "next/server";

interface RedirectResponse {
    success: boolean,
    finalUrl? : string,
    error?: string
}

const BASE_URL = process.env.BASE_URL;

export async function POST(req: NextRequest) {
  const GOOGLE_CALLABACK_URL = "https://accounts.google.com/o/oauth2/v2/auth";
  const GOOGLE_LOGIN_REDIRECT_URL =
    `${BASE_URL}/api/auth/google/callback`;

  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: GOOGLE_LOGIN_REDIRECT_URL,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });

    const finalUrl = `${GOOGLE_CALLABACK_URL}?${params.toString()}`;

    return NextResponse.json<RedirectResponse>({
      success: true,
      finalUrl,
    });
  } catch (error) {
    console.error("server error at login router", error);
    return NextResponse.json<RedirectResponse>({
      success: false,
      error: "server error at login router",
    });
  }
}
