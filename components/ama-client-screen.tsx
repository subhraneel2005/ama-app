"use client";

import { User } from "@/schema";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import UserTopbar, { UserCardProps } from "@/components/ui/user-card";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { createAma } from "@/services/ama.service";

export default function AmaClientScreen({
  username,
  avatarUrl,
  email,
}: UserCardProps) {
  const [amaTitle, setAmaTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ceateAmaHandler = async () => {
    if (amaTitle.trim().length === 0) {
      setError("Ama title cannot be empty!");
      return;
    }
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/ama/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: amaTitle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create AMA");
        return;
      }

      console.log("new ama created: ", data.data);

      // redirect to the new AMA page
      // window.location.href = `/ama/${data.data.publicId}`
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <UserTopbar username={username} avatarUrl={avatarUrl} email={email} />

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-primary text-6xl tracking-tighter mb-1 font-bold">
          Create your AMA
        </h1>

        <p className="text-muted-foreground tracking-tighter text-xl mb-4">
          Start an anonymous AMA, share your link, and let people ask you
          anything.
        </p>

        {error && <p className="text-red-500 text-sm my-4">{error}</p>}

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
            <Button onClick={ceateAmaHandler} disabled={loading}>
              {loading ? "Creating..." : "Create!"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
