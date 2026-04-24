import { Moderation } from "@/schema";

interface FunctionProps {
  text: string;
  moderationCat: Moderation;
}

export async function scoreTextOnAllModerationCategories({
  text,
  moderationCat,
}: FunctionProps) {
    // huh ?
}
