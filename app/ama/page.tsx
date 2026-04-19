import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

export default function AMAScreen() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
        <Card>
            <CardTitle>Create your AMA</CardTitle>
            <CardContent>
                <Input placeholder="add ama title..."/>
                <Button>Create!</Button>
            </CardContent>
        </Card>
    </div>
  );
}
