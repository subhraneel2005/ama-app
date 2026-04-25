import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
      <h1 className="text-primary text-6xl tracking-tighter mb-1 font-bold">Anonymous ama app</h1>
      <p className="text-muted-foreground tracking-tighter text-xl mb-4">Know what everyone thinks about you or secretly confess your crush!</p>
      <div className="flex justify-center items-center w-full gap-4 mt-6">
      <Link href={"/ama"}>
        <Button>Create AMA</Button>
      </Link>
      <Link href={"/login"}>
        <Button>Login or Create an account</Button>
      </Link>
      </div>
    </div>
  );
}
