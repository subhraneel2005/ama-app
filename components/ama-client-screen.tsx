"use client";

import { User } from "@/schema";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import UserTopbar from "@/components/ui/user-card";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function AmaClientScreen(user: User) {
  const [amaTitle, setAmaTitle] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  
  return (
    <div className="min-h-screen w-full flex flex-col">
      <UserTopbar {...user} />

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-primary text-6xl tracking-tighter mb-1 font-bold">
          Create your AMA
        </h1>

        <p className="text-muted-foreground tracking-tighter text-xl mb-4">
          Start an anonymous AMA, share your link, and let people ask you
          anything.
        </p>

        <Card className="w-[500px] py-12 mt-6">
          <CardContent className="flex flex-col gap-3">
            <Input
              placeholder="add ama title..."
              className="border border-primary"
              value={amaTitle}
              onChange={(e) => setAmaTitle(e.target.value)}
            />
            <Link href="/ama/preview" className="w-full mt-6">
              <Button className="w-full">Preview</Button>
            </Link>
            <Button>Create!</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
