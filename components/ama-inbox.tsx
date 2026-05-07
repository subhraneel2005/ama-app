"use client";

import { Ama, Question } from "@/schema";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import QuestionCard from "./question-card";

export default function AmaInboxComp({
  ama,
  username,
}: {
  ama: Ama & { questions?: Question[] };
  username: string;
}) {

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 w-full">
      {/* header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{ama.title}</span>
            <Badge variant="secondary">
              {ama.questions?.length ?? 0} questions
            </Badge>
          </CardTitle>
          <p className="text-sm text-primary font-semibold">@{username}</p>
        </CardHeader>
      </Card>

      {/* questions */}
      <div className="space-y-4">
        {ama.questions?.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">
              no questions yet
            </CardContent>
          </Card>
        ) : (
          ama.questions?.map((q) => (
            <QuestionCard key={q.id} question={q} amaTitle={ama.title} />
          ))
        )}
      </div>
    </div>
  );
}
