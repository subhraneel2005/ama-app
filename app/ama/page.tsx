import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/ui/user-card";
import { getSession } from "@/repositories/session.repository";
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
    <div className="min-h-screen w-full justify-center items-center flex flex-col space-y-6">
      <UserCard {...user} />
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create your AMA</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Input placeholder="add ama title..." />
          <Button variant={"secondary"}>Preview</Button>
          <Button>Create!</Button>
        </CardContent>
      </Card>
    </div>
  );
}
