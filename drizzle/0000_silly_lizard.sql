CREATE TABLE "ama" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"link" varchar(255),
	"ownerId" uuid
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionContent" text,
	"isSpam" boolean DEFAULT false,
	"askedBy" uuid,
	"amaId" uuid
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255),
	"isShadowBanned" boolean DEFAULT false,
	"deviceId" text
);
--> statement-breakpoint
ALTER TABLE "ama" ADD CONSTRAINT "ama_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_askedBy_users_id_fk" FOREIGN KEY ("askedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_amaId_ama_id_fk" FOREIGN KEY ("amaId") REFERENCES "public"."ama"("id") ON DELETE no action ON UPDATE no action;