"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";

export default function AmasPageClient(username: { username: string }) {
  const [amas, setAmas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmas = async () => {
      try {
        const res = await fetch("/api/ama/all");
        const data = await res.json();
        setAmas(data?.allAmas ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAmas();
  }, []);

  if (loading) {
    return <div className="p-4 text-sm">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col">
      <div className="mb-6">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight flex items-center gap-4">
          <span>Your</span>

          <span className="inline-block p-2 bg-primary text-background rounded-xl italic">
            ama(s)
          </span>
        </h2>

        <p className="text-muted-foreground text-xl mt-4">
          Manage and view all your ama sessions.
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-6xl px-4 md:grid-cols-2 grid-cols-1 mt-4">
        {amas.map((ama: any) => {
          const isExpired = new Date() > new Date(ama.willExpireAt);
          const questionCount = ama.questions?.length ?? 0;

          return (
            <Link
  key={ama.id}
  href={`/ask/${username.username.toLowerCase()}/${ama?.publicId}`}
  className="relative w-full"
>
  <Card className="w-full rounded-2xl overflow-hidden shadow-sm border pt-0 gap-0">

    <div className="bg-primary text-black text-center py-3 text-xl font-medium tracking-tight">
      {ama.title}
    </div>

    {/* bottom */}
    <CardContent className="px-6 py-6 space-y-3">
      <div className="text-sm text-muted-foreground">
        Public ID: {ama.publicId}
      </div>

      <div className="text-sm">
        Expires: {format(new Date(ama.willExpireAt), "PPP p")}
      </div>
    </CardContent>

    <CardFooter className="flex gap-2 px-6 pb-6 pt-0">
      <Badge variant={isExpired ? "destructive" : "default"}>
        {isExpired ? "Expired" : "Active"}
      </Badge>

      <Badge variant="secondary">
        {questionCount} Questions
      </Badge>
    </CardFooter>
  </Card>
</Link>
          );
        })}
      </div>
    </div>
  );
}
