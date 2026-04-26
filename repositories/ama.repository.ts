import { db } from "@/config/db";
import { Ama, amaTable, NewAma } from "@/schema";
import { eq } from "drizzle-orm";

export async function insertAma(ama:NewAma){
    try {
        const newAma = await db.insert(amaTable).values(ama).returning()
        return newAma[0]
    } catch (error) {
        console.error("error at create repository", error)
        return null
    }
}

export async function getAmaByPublicId(publicId: string){
    try {
        const ama: Ama | undefined = await db.query.amaTable.findFirst({
            where: eq(amaTable.publicId, publicId)
        })

        if(!ama) return null

        return ama
    } catch (error) {
        console.error("error at finding ama using publicId")
        return null
    }
}