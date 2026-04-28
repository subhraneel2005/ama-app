import {
  getActor,
  insertActor,
  updateActor,
} from "@/repositories/actor.repository";
import { getSession } from "@/repositories/session.repository";
import { User } from "@/schema";

interface CreateActorProps {
  deviceID: string;
  ipHash: string;
}

export async function createActorService({ deviceID, ipHash }: CreateActorProps) {
  try {
    const session = await getSession();
    let user: User | null;

    if (session.type === "user") {
      user = session.user;
    } else {
      user = null;
    }

    const anonId = session.type === "user" ? null : crypto.randomUUID();

    const newActor = await insertActor({
      userId: user ? user.id : null,
      deviceID,
      ipHash,
      anonId,
      lastMessagedAt: new Date()
    });

    if (!newActor)
      return {
        message: "no actor created, error at actor service",
      };

    return {
      data: newActor,
      anonId,
    };
  } catch (error) {
    console.error("error at create actor service", error);
    return { message: "failed to create actor" };
  }
}

type UpdateActorResult =
  | { success: true; reason: "actor updated" }
  | { success: false; reason: "update actor failed" }
  | { success: false; reason: "no actor found" };

export async function updateActorService(): Promise<UpdateActorResult> {
  const actor = await getActor();

  if (actor.type !== "actor") {
    return {
      success: false,
      reason: "no actor found",
    };
  }

  const actorId = actor.actor.id;

  const updatedRes = await updateActor({
    actorId,
    lastMessagedAt: new Date(),
  });

  if (!updatedRes.success) {
    return {
      success: false,
      reason: "update actor failed",
    };
  }

  return {
    success: true,
    reason: "actor updated"
  };
}
