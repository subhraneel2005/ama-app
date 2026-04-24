import { z } from "zod";

export const moderatorAi = {
  gemini: {
    name: "gemini",
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
  },
  xai: {
    name: "xai",
    model: "grok-4-1-fast-reasoning",
    apiKey: process.env.XAI_AI_API_KEY
  },
  openai: {
    name: "openai",
    model: "gpt-5-nano",
    apiKey: process.env.OPENAI_AI_API_KEY
  },
} as const;

export const moderatorCategorySchema = z.object({
   scores: z.object({
    TOXIC: z.number().min(0).max(1),
    HARASSMENT: z.number().min(0).max(1),
    HATE: z.number().min(0).max(1),
    SEXUAL: z.number().min(0).max(1),
    THREAT: z.number().min(0).max(1),
    VIOLENCE: z.number().min(0).max(1),
    SPAM: z.number().min(0).max(1),
    SELF_HARM: z.number().min(0).max(1),
    SAFE: z.number().min(0).max(1),
   })
})

export type ModerartorAi = keyof typeof moderatorAi;
