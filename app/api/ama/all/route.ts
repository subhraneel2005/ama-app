import { getSession } from "@/repositories/session.repository";
import { getAllAmasByUserIdService } from "@/services/ama.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (session.type !== "user") {
      return NextResponse.json(
        {
          message: "no session and no user found",
        },
        { status: 400 },
      );
    }

    const res = await getAllAmasByUserIdService(session.user?.id);

    if (res.reason === "dbError") {
      return NextResponse.json(
        {
          message: res.reason,
        },
        { status: 400 },
      );
    }

    if (res.reason === "no userId provided") {
      return NextResponse.json(
        {
          message: res.reason,
        },
        { status: 400 },
      );
    }

    if (res.reason === "general code error") {
      return NextResponse.json(
        {
          message: res.reason,
        },
        { status: 400 },
      );
    }

    if (res.reason === "no amas found") {
      return NextResponse.json(
        {
          message: res.reason,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        allAmas: res.allAmas,
        success: res.success,
      },
      { status: 200 },
    );
  } catch (error) {
    let errMsg = "internal server error ar myAmas router";
    console.error(errMsg + error);
    return NextResponse.json({
      message: errMsg,
    });
  }
}
