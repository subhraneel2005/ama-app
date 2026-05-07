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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {amas.map((ama: any) => {
        const isExpired = new Date() > new Date(ama.willExpireAt);
        const questionCount = ama.questions?.length ?? 0;

        return (
          <Link key={ama.id} href={`/ask/${username.username.toLowerCase()}/${ama?.publicId}`}>
            <Card
              className={
                isExpired
                  ? "opacity-60 pointer-events-none"
                  : "cursor-pointer hover:shadow-md transition"
              }
            >
              <CardHeader>
                <CardTitle className="text-lg font-bold">{ama.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Public ID: {ama.publicId}
                </div>

                <div className="text-sm">
                  Expires: {format(new Date(ama.willExpireAt), "PPP p")}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Badge variant={isExpired ? "destructive" : "default"}>
                  {isExpired ? "Expired" : "Active"}
                </Badge>

                <Badge variant="secondary">{questionCount} Questions</Badge>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
