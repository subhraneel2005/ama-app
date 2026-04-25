import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UserTopbar from "@/components/ui/user-card";
import { getSession } from "@/repositories/session.repository";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function AMAScreen() {
  const result = await getSession();

  if (result.type === "dbError") {
    return (
      <div className="min-h-screen w-full justify-center items-center flex">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>Database Offline</CardTitle>
          </CardHeader>
          <CardContent>Cannot connect to database.</CardContent>
        </Card>
      </div>
    );
  }

  if (result.type === "generalError") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>Server Error</CardTitle>
          </CardHeader>
          <CardContent>Something went wrong.</CardContent>
        </Card>
      </div>
    );
  }

  if (result.type === "noSession") redirect("/login");

  const user = result.user;
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
            />
            <Link href="/ama/ama-1/preview" className="w-full mt-6">
              <Button className="w-full">Preview</Button>
            </Link>
            <Button>Create!</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
