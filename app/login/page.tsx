"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { checkActiveSession } from "../actions/session.action";
import { useState } from "react";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const googleLoginHandler = async () => {
    const activeSessionExists = await checkActiveSession();

    if (activeSessionExists) {
      setErrorMessage("You are already login");
      return;
    }
    const res = await fetch("/api/auth/google/login", { method: "POST" });

    if (!res.ok) {
      setErrorMessage("Failed to start login");
      return;
    }

    const { finalUrl } = await res.json();
    window.location.href = finalUrl;
  };
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col space-y-6">
       {errorMessage && (
        <div className="text-red-500 bg-red-200 px-4 py-2 rounded-lg">
          {errorMessage}
        </div>
      )}
      <Button onClick={googleLoginHandler}>Continue with Google</Button>
    </div>
  );
}
