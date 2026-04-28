import { createQuestionService } from "@/services/question.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { questionContent, amaPublicId } = await req.json();

  const result = await createQuestionService({
    questionContent,
    amaPublicId,
  });

  return Response.json(result);
}
