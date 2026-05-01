import { db } from "@/config/db";
import { Ama, amaTable, NewAma } from "@/schema";
import { eq } from "drizzle-orm";

export async function insertAma(ama: NewAma) {
  try {
    const newAma = await db.insert(amaTable).values(ama).returning();
    return newAma[0];
  } catch (error) {
    console.error("error at create ama repository", error);
    return null;
  }
}

export async function getAmaByPublicId(publicId: string) {
  try {
    const ama: Ama | undefined = await db.query.amaTable.findFirst({
      where: eq(amaTable.publicId, publicId),
    });

    if (!ama) return null;

    return ama;
  } catch (error) {
    console.error("error at finding ama using publicId");
    return null;
  }
}

export async function getAmaWithQuestionsByPublicId(publicId: string) {
  try {
    const ama: Ama | undefined = await db.query.amaTable.findFirst({
      where: eq(amaTable.publicId, publicId),
      with: {
        questions: {
          orderBy: (q, { desc }) => [desc(q.createdAt)],
          where: (q, { eq }) => eq(q.isSpam, false)
        },
        
      }
    });

    if (!ama) return null;

    return ama;
  } catch (error) {
    console.error("error at finding ama using publicId");
    return null;
  }
}

export async function getAmaIdFromPublicId(publicId: string) {
  try {
    const ama = await db.query.amaTable.findFirst({
      where: eq(amaTable.publicId, publicId),
      columns: {
        id: true,
      },
    });

    return ama?.id ?? null;
  } catch (error) {
    console.error("error at finding amaId using publicId");
    return null;
  }
}

export async function getAllAmaByUserId(userId: string){
  try {
    const amas = await db.query.amaTable.findMany({
      where: eq(amaTable.ownerId, userId)
    })

    if(!amas) return null

    return amas
  } catch (error) {
    console.error("error at finding all amas using userId");
    return null;
  }
}
