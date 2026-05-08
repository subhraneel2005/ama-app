import AnonymousMockFeed from "@/components/mock-feed";
import { Button } from "@/components/ui/button";
import {
  ChatIcon,
  LeftToRightListBulletIcon,
  LogoutSquare01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const sampleMessages = [
  {
    id: 1,
    text: "someone secretly likes your style 😎",
    timestamp: "now",
    image: "/cute-ghost-1.png",
  },
  {
    id: 2,
    text: "bro when do u sleep 👻",
    timestamp: "1m ago",
    image: "/cute-bear.png",
  },
  {
    id: 3,
    text: "you're lowkey everyone's fav person",
    timestamp: "2m ago",
    image: "/cute-explorer.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col pt-22">
      <h1 className="text-primary text-7xl tracking-tighter mb-1 font-bold flex items-center">
        Anonymous ama app
      </h1>
      <p className="text-muted-foreground tracking-tighter text-xl mb-4">
        Know what everyone thinks about you or secretly confess your crush!
      </p>
      <div className="flex justify-center items-center w-full gap-4 mt-6">
        <Link href={"/ama"}>
          <Button>
            Create AMA <HugeiconsIcon icon={ChatIcon} strokeWidth={2} />
          </Button>
        </Link>
        <Link href={"/myAmas"}>
          <Button>
            My Amas{" "}
            <HugeiconsIcon icon={LeftToRightListBulletIcon} strokeWidth={2} />
          </Button>
        </Link>
        <Link href={"/login"}>
          <Button>
            Login or Create an account{" "}
            <HugeiconsIcon icon={LogoutSquare01Icon} strokeWidth={2} />
          </Button>
        </Link>
      </div>

      <div className="mt-12">
      <AnonymousMockFeed messages={sampleMessages} />
      </div>
    </div>
  );
}
