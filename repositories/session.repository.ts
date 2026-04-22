import { db } from "@/config/db";
import { Session, User, userSessionTable } from "@/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const insertSession = async (userId: string) => {
  try {
    const sessionToken = crypto.randomUUID();

    const [session] = await db
      .insert(userSessionTable)
      .values({
        sessionToken,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //7days
      })
      .returning();

    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if(!sessionToken) return;

const session = await db.query.userSessionTable.findFirst({
    where: eq(userSessionTable.sessionToken, sessionToken),
    with: {
        user: true
    }
})

if(!session) return null;

if(session.expiresAt < new Date()) return null

return session.user
};
