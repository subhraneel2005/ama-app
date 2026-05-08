import AnonymousMockFeed from "@/components/mock-feed";
import { Button } from "@/components/ui/button";
import {
  ChatIcon,
  LeftToRightListBulletIcon,
  LockIcon,
  LockPasswordIcon,
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
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
     <h1 className="text-foreground md:text-7xl text-5xl mb-1 tracking-tighter font-bold leading-none text-center">
  Ask me anything
  <br />
  <span className="inline-block mt-3 px-4 py-2 bg-primary text-background rounded-3xl italic">
    anonymously !
  </span>
</h1>
      <p className="text-muted-foreground text-xl mb-4 mt-2">
        Create your AMA page. Get honest questions from your oomfs.
      </p>
      <div className="flex justify-center items-center w-full max-w-2xl gap-4 mt-8 px-4">
  <Link href={"/ama"} className="w-full">
    <Button className="w-full text-md">
      Start an Ama
      <HugeiconsIcon icon={ChatIcon} strokeWidth={2} />
    </Button>
  </Link>

  <Link href={"/myAmas"} className="w-full">
    <Button
      variant={"outline"}
      className="w-full text-md"
    >
      View my Amas
      <HugeiconsIcon
        icon={LeftToRightListBulletIcon}
        strokeWidth={2}
      />
    </Button>
  </Link>
</div>

     

<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-start text-sm text-center text-muted-foreground">
  <HugeiconsIcon
    icon={LockPasswordIcon}
    size={16}
    strokeWidth={2}
    className="mt-[3px] mr-1 shrink-0"
  />

  <p>
    Built-in moderation automatically blocks
    <br />
    spam, abusive, and harmful anonymous messages.
  </p>
</div>
    </div>
  );
}
