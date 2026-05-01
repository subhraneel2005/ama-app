"use client";

import { Ama, Question } from "@/schema";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

export default function AmaInboxComp({
  ama,
  username,
}: {
  ama: Ama & { questions?: Question[] };
  username: string;
}) {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 w-full">
    {/* header */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{ama.title}</span>
          <Badge variant="secondary">
            {ama.questions?.length ?? 0} questions
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">@{username}</p>
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
        ama.questions?.map((q, i) => (
          <Card
            key={q.id}
            className={cn(
              "transition-all",
              "hover:shadow-md hover:-translate-y-px"
            )}
          >
            <CardContent className="py-4 space-y-3">
              <p className="text-sm leading-relaxed">
                {q.questionContent}
              </p>

              <Separator />

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {new Date(q.createdAt!).toLocaleString()}
                </span>

                {q.isSpam && (
                  <Badge variant="destructive">spam</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  </div>
  );
}