import { db } from "@/config/db";
import { Actor, actorTable, NewActor } from "@/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { getSession } from "./session.repository";

export async function insertActor(actor: NewActor) {
  try {
    const newActor = await db.insert(actorTable).values(actor).returning();

    return newActor[0];
  } catch (error) {
    console.error("error at create actor", error);
    return null;
  }
}

type AnonIdCookieResult =
  | { type: "actor"; actor: Actor }
  | { type: "dbError" }
  | { type: "generalError" }
  | { type: "noAnonIdInCookie" }
  | { type: "noActor" };

//   gets the actor either from sessionToken (logged in user) or the anonId from cookie

export async function getActor(): Promise<AnonIdCookieResult> {
  try {
    const session = await getSession();

    if (session.type === "user") {
      const actor: Actor | undefined = await db.query.actorTable.findFirst({
        where: eq(actorTable.userId, session.user.id),
      });

      if (!actor) {
        return {
          type: "noActor",
        };
      }

      return {
        type: "actor",
        actor,
      };
    }

    const cookieStore = await cookies();
    const anonId = cookieStore.get("anonId")?.value;

    if (!anonId) {
      return {
        type: "noAnonIdInCookie",
      };
    }

    const actor: Actor | undefined = await db.query.actorTable.findFirst({
      where: eq(actorTable.anonId, anonId),
    });

    if (!actor) {
      return {
        type: "noActor",
      };
    }

    return {
      type: "actor",
      actor,
    };
  } catch (error: any) {
    if (error?.cause?.code === "ECONNREFUSED") {
      return {
        type: "dbError",
      };
    }
    console.error(error);
    return { type: "generalError" };
  }
}

export interface UpdateActorParams {
  actorId: string;
  lastMessagedAt: Date;
  abuseCount?: number;
}
export async function updateActor({
  actorId,
  lastMessagedAt,
  abuseCount,
}: UpdateActorParams) {
  try {
    await db
      .update(actorTable)
      .set({
        lastMessagedAt,
        ...(abuseCount !== undefined && { abuseCount }),
      })
      .where(eq(actorTable.id, actorId));

    return {
      success: true,
    };
  } catch (error) {
    console.error("error at update actor repository");
    return {
      success: false,
    };
  }
}
