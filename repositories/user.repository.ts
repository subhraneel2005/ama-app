import { db } from "@/config/db";
import { NewUser, User, userTable } from "@/schema";
import { eq } from "drizzle-orm";

export const insertUser = async (user: NewUser) => {
  if (!user.email) return null;

  try {
    const existingUser: User | undefined = await db.query.userTable.findFirst({
      where: eq(userTable.email, user.email),
    });

    if (existingUser) return existingUser;

    const newUser = await db.insert(userTable).values(user).returning();
    return newUser[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
