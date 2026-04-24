"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/schema";
import { deleteSession } from "@/repositories/session.repository";
import { useState } from "react";
import { Button } from "./button";
import { logout } from "@/app/actions/session.action";
import { useRouter } from "next/navigation";

export default function UserCard(user: User) {
  const fallback = user.username?.slice(0, 2).toUpperCase() ?? "U";

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true);
    try {
      const deleted = await logout();

      if (!deleted) {
        setErrorMessage("Session not deleted.\nPlease try again");
      }
      router.push("/login")
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>

        {errorMessage?.length > 0 && (
          <span className="text-red-500 bg-red-200 px-4 py-2 rounded-lg">
            {errorMessage}
          </span>
        )}
        <div>
          {user.username && <CardTitle>{user.username}</CardTitle>}
          {user.email && (
            <p className="text-sm text-muted-foreground">{user.email}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 text-sm">
        {user.abuseCount !== undefined && (
          <p>
            <strong>Abuse Count:</strong> {user.abuseCount}
          </p>
        )}

        {user.isShadowBanned && (
          <p className="text-yellow-600">
            <strong>Shadow Banned</strong>
          </p>
        )}

        {user.IsBanned && (
          <p className="text-red-600">
            <strong>Banned</strong>
          </p>
        )}

        {user.createdAt && (
          <p>
            <strong>Joined:</strong> {user.createdAt.toDateString()}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant={"destructive"}
          disabled={loading}
          onClick={handleLogout}
        >
          {loading ? "Please wait..." : "Logout"}
        </Button>
      </CardFooter>
    </Card>
  );
}
