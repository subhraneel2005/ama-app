import { createAma } from "@/services/ama.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, link } = body;

    if (!title || !link) {
      return NextResponse.json(
        {
          message: "missing body",
        },
        {
          status: 400,
        },
      );
    }

    const newAma = await createAma({title, link})

    return NextResponse.json({
        data: newAma,
        message: "ama created successfully"
    }, {
        status: 201
    })
  } catch (error) {
    console.error("interal server error at ama route", error)
    return NextResponse.json({
        message: "interal server error at ama route"
    }, {
        status: 500
    })
  }
}
