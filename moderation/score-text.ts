import { getModel } from "@/config/ai";
import { Moderation, moderationEnum } from "@/schema";
import { moderatorCategorySchema } from "@/types/moderator.types";
import { generateText, Output } from "ai";
import { z } from "zod";

interface FunctionProps {
  questionText: string;
}

export async function scoreTextOnAllModerationCategories({
  questionText,
}: FunctionProps) {
  const moderationCat = moderationEnum.enumValues;
  const model = getModel("gemini");

  const { output } = await generateText({
    model,
    prompt: `You are a strict but context-aware content moderation system.

Your task is to analyze a piece of text and score how strongly it violates each moderation category.

TEXT:
"""
${questionText}
"""

CATEGORIES:
${moderationCat}

SCORING RULES:
- Return a score between 0 and 1 for each category.
- 0 = not present
- 1 = extremely strong presence.

IMPORTANT CONTEXT RULES:
- If toxic words appear but are used in an educational, analytical, or quoted context (for example discussing harassment or giving examples), score them LOW.
- Only give high scores if the text is directly attacking, insulting, threatening, or harassing someone.
- Do not penalize text that is discussing toxicity, studying it, or quoting it as an example.
- Consider the overall intent of the message, not just individual words.

INSTRUCTIONS:
- Base the score only on the provided text.
- Evaluate intent, tone, and context.
- Do not explain reasoning.

Return only the structured result.`,

    output: Output.object({
      name: "scores",
      description:
        "text gets a score against all moderation categories from 0-1 to check if the text is safe or not.",
      schema: moderatorCategorySchema,
    }),
  });

  return output;
}
