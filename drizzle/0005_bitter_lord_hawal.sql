CREATE TABLE "actor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"anonId" varchar(64),
	"ipHash" varchar(128),
	"deviceID" text,
	"abuseCount" integer DEFAULT 0,
	"reportCount" integer DEFAULT 0,
	"isBanned" boolean DEFAULT false,
	"lastMessagedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "question" RENAME COLUMN "askedBy" TO "actorId";--> statement-breakpoint
ALTER TABLE "question" DROP CONSTRAINT "question_askedBy_users_id_fk";
--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "actor" ADD CONSTRAINT "actor_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_actorId_actor_id_fk" FOREIGN KEY ("actorId") REFERENCES "public"."actor"("id") ON DELETE no action ON UPDATE no action;