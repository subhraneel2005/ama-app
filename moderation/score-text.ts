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
    prompt: `You are a content moderation system.

Analyze the following text and score it for each moderation category.

TEXT:
"""
${questionText}
"""

CATEGORIES:
${moderationCat}

INSTRUCTIONS:
- For each category return a score between 0 and 1.
- 0 = not present
- 1 = extremely strong presence
- Base the score only on the given text.
    - Do not explain your reasoning.`,

    output: Output.object({
      name: "scores",
      description:
        "text gets a score against all moderation categories from 0-1 to check if the text is safe or not.",
      schema: moderatorCategorySchema,
    }),
  });

  return output
}
