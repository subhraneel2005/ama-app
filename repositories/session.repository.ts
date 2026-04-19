import { db } from "@/config/db";
import { Session, User, userSessionTable } from "@/schema";

export const insertSession = async(userId: string) => {
    try {
        const sessionToken = crypto.randomUUID()

        const [session] = await db.insert(userSessionTable).values({
            sessionToken,
            userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) //7days
        }).returning()

        return session
    } catch (error) {
        console.error(error)
        throw error
    }
}