import "dotenv/config";

import { checkIfStringIsUrl } from "./check-url";
import { scoreTextOnAllModerationCategories } from "./score-text";

interface UserTextProps {
  text: string;
  deviceId?: string;
}

type ModerationResult =
  | { message: string }
  | {
      message: string;
      userText: string;
      flaggedCategories: { category: string; score: number }[];
      moderationCat: string;
      scores: {
        TOXIC: number;
        HARASSMENT: number;
        HATE: number;
        SEXUAL: number;
        THREAT: number;
        VIOLENCE: number;
        SPAM: number;
        SELF_HARM: number;
        SAFE: number;
      };
    };

export async function moderationHandler({ text }: UserTextProps): Promise<ModerationResult & {
  isSpam: boolean;
  isAbuse: boolean;
}> {
  if (!text) {
    return {
      message: "no text provided for moderation engine to run",
      isSpam: false,
      isAbuse: false
    };
  }

  const isTextUrl = checkIfStringIsUrl(text);

  if (isTextUrl)
    return {
      message: "this is a url. therefore question is invalid and spam.",
      isSpam: true,
      isAbuse: false,
      userText: text,
      flaggedCategories: [],
      moderationCat: "SPAM",
      scores: {
        TOXIC: 0,
        HARASSMENT: 0,
        HATE: 0,
        SEXUAL: 0,
        THREAT: 0,
        VIOLENCE: 0,
        SPAM: 1,
        SELF_HARM: 0,
        SAFE: 0,
      },
    };

  const res = await scoreTextOnAllModerationCategories({
    questionText: text,
  });

  if (res?.scores) {
    const flaggedCategories = Object.entries(res.scores)
  .filter(([, score]) => score >= 0.5)
  .map(([category, score]) => ({
    category,
    score
  }));

  const moderationCat =
  flaggedCategories.sort((a, b) => b.score - a.score)[0]?.category ?? "SAFE";

  const isAbuse = flaggedCategories.some(
    (c) => c.category !== "SAFE"
  );

    const finObj = {
      message: "moderation completed",
      userText: text,
      flaggedCategories,
      moderationCat,
      isSpam: false,
      isAbuse,
      scores: res.scores,
    };

    console.log(finObj);

    return finObj;
  }

  return {
    message: "moderation failed",
    isSpam: false,
    isAbuse: false,
  };
}
