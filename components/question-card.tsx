"use client";

import { Question, Ama } from "@/schema";
import { cn } from "@/lib/utils";

export default function QuestionCard({
  question,
  amaTitle,
}: {
  question: Question;
  amaTitle?: string | null;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl overflow-hidden shadow-sm border",
        "bg-neutral-200"
      )}
    >
      {/* top (black strip) */}
      <div className="bg-primary text-black text-center py-3 text-sm font-bold tracking-tight">
        {amaTitle || "Ask me a question"}
      </div>

      {/* bottom (question) */}
      <div className="px-6 py-8 text-center">
        <p className="text-lg md:text-xl font-semibold text-black leading-snug">
          {question.questionContent}
        </p>
      </div>
    </div>
  );
}