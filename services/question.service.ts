import { moderationHandler } from "@/moderation/moderation";
import { getActor } from "@/repositories/actor.repository";
import { getAmaIdFromPublicId } from "@/repositories/ama.repository";
import { insertQuestion } from "@/repositories/question.repository";
import { Moderation, Question } from "@/schema";

interface QuestionServiceProps {
  questionContent: string;
  amaPublicId: string;
}

type CreateQuestionResult =
  | { success: true; reason: "question created"; newQuestion: Question }
  | { success: false; reason: "no question content provided" }
  | { success: false; reason: "no actorId" }
  | { success: false; reason: "no amaId" }
  | { success: false; reason: "failed to insert question" }
  | { success: false; reason: "error at create question service" }
  | { success: false; reason: "error at moderation run" };

export async function createQuestionService({
  questionContent,
  amaPublicId,
}: QuestionServiceProps): Promise<CreateQuestionResult> {
  try {
    if (!questionContent) {
      return {
        success: false,
        reason: "no question content provided",
      };
    }

    const actor = await getActor();

    if (actor.type !== "actor") {
      return {
        success: false,
        reason: "no actorId",
      };
    }

    const amaId = await getAmaIdFromPublicId(amaPublicId);

    if (!amaId) {
      return {
        success: false,
        reason: "no amaId",
      };
    }

   
  const moderation = await moderationHandler({
    text: questionContent
  })


  if (!("scores" in moderation)) {
    return {
      success: false,
      reason: "error at moderation run"
    }
  }


    const newQuestion = await insertQuestion({
      questionContent,
      isSpam: moderation.isSpam,
      isAbuse: moderation.isAbuse,
      actorId: actor.actor.id,
      amaId,
      scores: moderation.scores,
      moderationCat: moderation.moderationCat as Moderation,
      createdAt: new Date(),
    });

    if (!newQuestion) {
      return {
        success: false,
        reason: "failed to insert question",
      };
    }

    return {
      success: true,
      reason: "question created",
      newQuestion,
    };
  } catch (error) {
    console.error("error at create question service", error);
    return {
      success: false,
      reason: "error at create question service",
    };
  }
}
