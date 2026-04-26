import { db } from "@/config/db";
import { Actor, actorTable, NewActor } from "@/schema";
import { eq } from "drizzle-orm";

export async function insertActor(actor: NewActor){
    try {
        const newActor = await db.insert(actorTable).values(actor).returning()

        return newActor[0]
    } catch (error) {
        console.error("error at create actor", error)
        return null
    }
}

export async function getActor(anonId: string){
    try {
        const actor: Actor | undefined = await db.query.actorTable.findFirst({
            where: eq(actorTable.anonId, anonId)
        })

        return actor
    } catch (error) {
        console.error("no actor found with this anonId", error)
        return null
    }
}