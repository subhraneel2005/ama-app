import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
      <div className="flex justify-center items-center w-full gap-4">
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
