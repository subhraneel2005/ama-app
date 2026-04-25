"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import Link from "next/link";

interface AmaPageProps {
  username: string;
  avatarUrl?: string;
  amaTitle: string;
}

export default function AmaPage({ username, avatarUrl, amaTitle }: AmaPageProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");

  const shouldHideFooter = isFocused || message.length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4 transition-all">
      <Card className="w-full max-w-3xl rounded-4xloverflow-hidden border shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3 p-8 pb-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-bold text-lg">{username}</p>
            <p className="text-sm text-muted-foreground">
              {amaTitle}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-2">
          <Textarea
            placeholder="ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="min-h-[150px] resize-none shadow-none focus-visible:ring-0 text-2xl p-8 placeholder:text-muted-foreground/40 pr-20 border border-border/30"
          />

          <div className="flex items-center gap-3 mt-4 justify-between">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full h-12 w-12 text-xl shadow-sm border hover:bg-secondary/80 transition-colors"
            >
              🎲
            </Button>
            {message.length > 0 && (
              <Button className="rounded-full bg-primary hover:bg-primary/90 font-semibold animate-in fade-in zoom-in slide-in-from-right-2 duration-200">
                Send <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground mt-6">🔒 anonymous q&a</p>

      {!shouldHideFooter && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="font-semibold mt-10 text-center">
            👇 999 friends just tapped the button 👇
          </p>

          <Button
            asChild
            className="mt-6 w-full max-w-3xl h-16 rounded-full text-lg font-bold shadow-xl"
          >
            <Link href="/ama">Get your own messages!</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
