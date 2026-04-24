import { ModerartorAi, moderatorAi } from "@/types/moderator.types";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";

export function getModel(ai: ModerartorAi) {
  const config = moderatorAi[ai];

  if (config.name === "gemini") {
    return google(config.model);
  }

  if (config.name === "xai") {
    return xai(config.model);
  }

  if (config.name === "openai") {
    return openai(config.model);
  }

  throw new Error("Provider not supported yet");
}
