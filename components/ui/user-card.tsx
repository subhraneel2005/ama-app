"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/schema";
import { useState } from "react";
import { Button } from "./button";
import { logout } from "@/app/actions/session.action";
import { useRouter } from "next/navigation";

 export interface UserCardProps {
  username: string,
  avatarUrl: string,
  email: string,
}

export default function UserTopbar({ username, avatarUrl, email }: UserCardProps) {
  const fallback = username?.slice(0, 2).toUpperCase() ?? "U";

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    try {
      const deleted = await logout();

      if (!deleted) {
        setErrorMessage("Session not deleted. Please try again");
      }

      router.push("/login");
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full border-b px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          {avatarUrl && <AvatarImage src={avatarUrl} />}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>

        <div className="leading-tight">
          {username && (
            <p className="font-semibold tracking-tight">{username}</p>
          )}
          {email && (
            <p className="text-sm text-muted-foreground">{email}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}

        <Button
          variant="destructive"
          size="sm"
          disabled={loading}
          onClick={handleLogout}
        >
          {loading ? "Please wait..." : "Logout"}
        </Button>
      </div>
    </nav>
  );
}