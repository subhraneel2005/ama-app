import "dotenv/config";

import { checkIfStringIsUrl } from "./check-url";
import { scoreTextOnAllModerationCategories } from "./score-text";

interface UserTextProps {
  text: string;
  deviceId?: string;
}

export async function moderationHandler({ text, deviceId }: UserTextProps) {
  if (text === "" || deviceId === "") {
    return {
      message: "no data provided for moderation engine to run",
    };
  }

  const isTextUrl = checkIfStringIsUrl(text);

  if (isTextUrl)
    return {
      message: "this is a url. therefore question is invalid and spam.",
    };

  const res = await scoreTextOnAllModerationCategories({
    questionText: text,
  });

  if (res?.scores) {
    const flaggedCategories = Object.entries(res.scores)
      .filter(([, score]) => score >= 0.5)
      .map((category) => category);

    const finObj = {
      message: "moderation completed",
      flaggedCategories,
      scores: res.scores,
    };

    console.log(finObj);

    return finObj;
  }
}

moderationHandler({
  text: "Is it normal to feel angry at someone who insulted you publicly?",
});
