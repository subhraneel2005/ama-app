import { updateActorService } from "@/services/actor.service";
import { NextResponse } from "next/server";

export async function POST() {
  const result = await updateActorService();

  return NextResponse.json(result);
}