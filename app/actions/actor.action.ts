"use server";

import { getActor } from "@/repositories/actor.repository";
import { getSession } from "@/repositories/session.repository";
import { cookies } from "next/headers";

export async function checkActiveActor() {
  const res = await getActor();

  if (res.type === "actor") {
    return true;
  } else {
    return false;
  }
}


export async function getActorFromCookies(){
    const cookieStore = await cookies()

    const sessionToken = cookieStore.get("session")?.value;
    const anonId = cookieStore.get("anonId")?.value

    if(sessionToken){
        const session = await getSession()
        return {
            type: "user",
            session
        }
    }

    if(anonId){
        return {
            type: "anon",
            anonId
        }
    }

    return null
}