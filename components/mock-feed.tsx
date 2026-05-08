import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Message {
  id: string | number;
  text: string;
  timestamp: string;
  image: string;
}

interface AnonymousFeedProps {
  messages: Message[];
  className?: string;
}

const AnonymousFeed = ({ messages, className }: AnonymousFeedProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-xl rounded-2xl border border-border bg-background px-6 py-4 shadow-2xl",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-2.5 px-1">
        <div className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
          Live
        </span>
        <span className="text-sm font-medium text-zinc-400">
          Anonymous messages are flying in
        </span>
      </div>

      {/* Message List */}
      <div className="flex flex-col gap-3">
        {messages.map((msg) => (
         <div
         key={msg.id}
         className="group flex w-full justify-start rounded-xl border border-border p-4 bg-background"
       >
           <div className="flex w-full items-center gap-4">
              {/* Image */}
              <div className="flex shrink-0 bg-secondary border-primary border rounded-2xl">
                <Image
                  src={msg.image}
                  alt="pixel character"
                  width={50}
                  height={70}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Text + Timestamp */}
              <div className="flex flex-col items-start">
                <span className="text-[15px] font-medium tracking-tight text-zinc-200">
                  {msg.text}
                </span>

                <span className="mt-1 text-xs font-medium text-zinc-500">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnonymousFeed;
