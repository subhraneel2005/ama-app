import { db } from "@/config/db";
import { amaTable, NewAma } from "@/schema";

export async function insertAma(ama:NewAma){
    try {
        const newAma = await db.insert(amaTable).values(ama).returning()
        return newAma[0]
    } catch (error) {
        console.error("error at create repository", error)
        return null
    }
}