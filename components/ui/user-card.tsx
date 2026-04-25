"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/schema";
import { useState } from "react";
import { Button } from "./button";
import { logout } from "@/app/actions/session.action";
import { useRouter } from "next/navigation";

export default function UserTopbar(user: User) {
  const fallback = user.username?.slice(0, 2).toUpperCase() ?? "U";

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
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>

        <div className="leading-tight">
          {user.username && (
            <p className="font-semibold tracking-tight">{user.username}</p>
          )}
          {user.email && (
            <p className="text-sm text-muted-foreground">{user.email}</p>
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