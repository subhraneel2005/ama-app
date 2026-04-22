"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const googleLoginHandler = async() => {
    const res = await fetch("/api/auth/google/login", { method: "POST"})

    if(!res.ok) return

    const { finalUrl } = await res.json()

    window.location.href = finalUrl
  }
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
      <Button onClick={googleLoginHandler}>Continue with Google</Button>
    </div>
  );
}
