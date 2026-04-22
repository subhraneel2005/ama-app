import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/ui/user-card";
import { getSession } from "@/repositories/session.repository";
import { redirect } from "next/navigation";
import React from "react";

export default async function AMAScreen() {
  const user = await getSession()
  if(!user) redirect("/login")

  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col space-y-6">

      <UserCard {...user}/>
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
