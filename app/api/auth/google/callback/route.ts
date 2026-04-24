import { insertSession } from "@/repositories/session.repository";
import { insertUser } from "@/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          error: "missing code",
        },
        {
          status: 400,
        },
      );
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.BASE_URL}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    const { access_token, id_token } = tokenData;

    if (!access_token) {
      return NextResponse.json(
        { error: "failed to get access token" },
        { status: 400 },
      );
    }

    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const googleUser = await userRes.json();
    

    const dbUser = await insertUser({
      username: googleUser.name,
      avatarUrl: googleUser.picture,
      email: googleUser.email,
      googleOauthId: googleUser.id,
    })

    const session = await insertSession(dbUser?.id!)

    const res = NextResponse.redirect(`${process.env.BASE_URL}/ama`);

    res.cookies.set("session", session.sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })
   
    return res;

  } catch (error) {
    console.error("error at callback router", error);
    NextResponse.json({
      success: false,
      error: "server error at callback router",
    });
  }
}
