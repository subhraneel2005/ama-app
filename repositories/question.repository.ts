import { db } from "@/config/db";
import { NewQuestion, questionTable } from "@/schema";

export async function insertQuestion(question: NewQuestion) {
  try {
    const newQuestion = await db
    .insert(questionTable)
    .values(question)
    .returning();

  if (!newQuestion) return null;

  return newQuestion[0];
  } catch (error) {
    console.error("error at create question repository", error)
    return null
  }
}
