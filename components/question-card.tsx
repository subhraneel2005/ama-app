"use client";

import { Question, Ama } from "@/schema";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

export default function QuestionCard({
  question,
  amaTitle,
}: {
  question: Question;
  amaTitle?: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (!ref.current) return;

    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const blob = await (await fetch(dataUrl)).blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  return (
    <div className="relative w-full">
      <Button
        size="icon-sm"
        variant="ghost"
        className="absolute right-2 top-2 z-10 p-2"
        onClick={handleCopy}
      >
        <Copy className="w-4 h-4" color="black"/>
      </Button>

      <div
        ref={ref}
        className={cn(
          "w-full rounded-2xl overflow-hidden shadow-sm border bg-muted",
        )}
      >
        {/* top */}
        <div className="bg-primary text-background text-center py-3 text-md font-medium">
          {amaTitle || "Ask me a question"}
        </div>

        {/* bottom */}
        <div className="px-6 py-8 text-center">
          <p className="text-lg md:text-xl font-medium text-foreground leading-snug">
            {question.questionContent}
          </p>
        </div>
      </div>
    </div>
  );
}
