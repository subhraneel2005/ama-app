import { insertActor } from "@/repositories/actor.repository";
import { getSession } from "@/repositories/session.repository";
import { User } from "@/schema";
import { NextResponse } from "next/server";

interface CreateActorProps {
    deviceID: string,
    ipHash: string
}

export async function createActor({ deviceID, ipHash }: CreateActorProps){
    try {
        const session = await getSession()
         let user: User | null;

        if(session.type === "user"){
            user = session.user
        } else{
            user = null
        }

        const anonId = session.type === "user" ? null :  crypto.randomUUID();

        const newActor = await insertActor({
            userId: user ? user.id : null,
            deviceID,
            ipHash,
            anonId,
        })

        if(!newActor) return {
            message: "no actor created, error at actor service"
        }

        return {
            data: newActor,
            anonId
        }

    } catch (error) {
        console.error("error at create actor service", error);
        return { message: "failed to create actor" };
    }
}