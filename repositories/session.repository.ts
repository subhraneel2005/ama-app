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

type SessionResult =
  | { type: "user"; user: User }
  | { type: "dbError" }
  | { type: "generalError" }
  | { type: "noSession" };

export const getSession = async (): Promise<SessionResult> => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) return { type: "noSession" };

    const session = await db.query.userSessionTable.findFirst({
      where: eq(userSessionTable.sessionToken, sessionToken),
      with: {
        user: true,
      },
    });

    if (!session) return { type: "noSession" };

    if (session.expiresAt < new Date()) return { type: "noSession" };

    return { type: "user", user: session.user };
  } catch (error: any) {
    if (error?.cause?.code === "ECONNREFUSED") {
      return {
        type: "dbError",
      };
    }
    console.error(error);
    return { type: "generalError" };
  }
};

export const deleteSession = async () => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) return false;

    await db
      .delete(userSessionTable)
      .where(eq(userSessionTable.sessionToken, sessionToken));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
