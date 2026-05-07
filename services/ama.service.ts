import {
  getAllAmasByUserId,
  getAmaByPublicId,
  getAmaWithQuestionsByPublicId,
  insertAma,
} from "@/repositories/ama.repository";
import { getSession } from "@/repositories/session.repository";
import { Ama } from "@/schema";
import { nanoid } from "nanoid";
import { success } from "zod";
import { fa } from "zod/locales";

interface NewAmaProps {
  title: string;
}

const baseUrl = process.env.BASE_URL;

export async function createAma({ title }: NewAmaProps) {
  try {
    if (!baseUrl) {
      return {
        message: "no base url found, cannot continue ama creation process.",
      };
    }
    if (!title.trim()) {
      return {
        message: "no title provided",
      };
    }
    const result = await getSession();
    if (result.type !== "user") {
      return {
        message: "no session found",
      };
    }

    const user = result.user;

    const publicId = nanoid(8);

    const link = `${baseUrl}/ask/${user.username?.toLowerCase()}/${publicId}`;

    const newAma = await insertAma({
      title,
      link,
      publicId,
      ownerId: user.id,
    });

    if (!newAma) {
      return { message: "failed to create ama" };
    }

    return {
      data: newAma,
    };
  } catch (error) {
    console.error("error at createAma service", error);
    return { message: "failed to create ama" };
  }
}

type GetAmaByPublicIdResult =
  | { success: false; reason: "no publicId provided" }
  | { success: false; reason: "dbError" }
  | { success: false; reason: "general code error" }
  | { success: false; reason: "ama not found" }
  | { success: true; reason: "ama found"; ama: Ama };

export async function getAmaWithQuestionsByPublicIdService(
  publicId: string,
): Promise<GetAmaByPublicIdResult> {
  try {
    if (!publicId || typeof publicId !== "string") {
      return {
        success: false,
        reason: "no publicId provided",
      };
    }

    const ama = await getAmaWithQuestionsByPublicId(publicId);

    if (!ama) {
      return {
        success: false,
        reason: "ama not found",
      };
    }

    return {
      success: true,
      reason: "ama found",
      ama,
    };
  } catch (error: any) {
    if (error?.cause?.code === "ECONNREFUSED") {
      return {
        success: false,
        reason: "dbError",
      };
    }
    console.error(error);
    return {
      success: false,
      reason: "general code error",
    };
  }
}

type GetAllAmasByUserIdResult =
  | { success: false; reason: "no userId provided" }
  | { success: false; reason: "dbError" }
  | { success: false; reason: "no amas found" }
  | { success: false; reason: "general code error" }
  | { success: true; reason: "all amas found"; allAmas: AmaMetadata[] | null };

interface AmaMetadata {
  id: string;
  title: string | null;
  publicId: string;
  willExpireAt: Date | null;
  questions: {
    id: string;
  }[];
}

export async function getAllAmasByUserIdService(
  userId: string,
): Promise<GetAllAmasByUserIdResult> {
  try {
    if (!userId)
      return {
        success: false,
        reason: "no userId provided",
      };

    const allAmas = await getAllAmasByUserId(userId);

    console.log("all amas result: ", allAmas)

    if (allAmas?.length === 0)
      return {
        success: false,
        reason: "no amas found",
      };

    return {
      success: true,
      allAmas,
      reason: "all amas found",
    };
  } catch (error: any) {
    if (error?.cause?.code === "ECONNREFUSED") {
      return {
        success: false,
        reason: "dbError",
      };
    }
    console.error(error);
    return {
      success: false,
      reason: "general code error",
    };
  }
}
