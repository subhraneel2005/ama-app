import { insertAma } from "@/repositories/ama.repository";
import { getSession } from "@/repositories/session.repository";
import { nanoid } from "nanoid"

interface NewAmaProps {
  title: string;
}

const baseUrl = process.env.BASE_URL

export async function createAma({ title }: NewAmaProps) {
  try {

    if(!baseUrl){
        return {
            message: "no base url found, cannot continue ama creation process."
        }
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

    const publicId = nanoid(8)

    const link = `${baseUrl}/ask/${user.username?.toLowerCase()}/${publicId}`

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
