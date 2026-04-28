import { createActorService } from "@/services/actor.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { deviceID, ipHash } = await req.json();
  try {

    const result = await createActorService({
        deviceID,
        ipHash
    })

    if (!result?.data) {
      return NextResponse.json(
        { success: false, message: "actor creation failed" },
        { status: 500 }
      );
    }

    const res = NextResponse.json({ success: true, actor: result.data }, { status: 201 });

   if(result.anonId){
    res.cookies.set("anonId", result.anonId, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1year
    })
   }

    return res;
  } catch (error) {
    console.error("create actor error", error);
    return NextResponse.json(
      { message: "failed to create actor" },
      { status: 500 },
    );
  }
}
