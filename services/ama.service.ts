import { insertAma } from "@/repositories/ama.repository";
import { getSession } from "@/repositories/session.repository";

interface NewAmaProps {
  title: string;
  link: string;
}

export async function createAma({ title, link }: NewAmaProps) {
  try {
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

    const newAma = await insertAma({
      title,
      link,
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
