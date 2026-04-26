CREATE TYPE "public"."moderationCategory" AS ENUM('TOXIC', 'HARASSMENT', 'HATE', 'SEXUAL', 'THREAT', 'VIOLENCE', 'SPAM', 'SELF_HARM', 'SAFE');--> statement-breakpoint
ALTER TABLE "question" RENAME COLUMN "score" TO "scores";--> statement-breakpoint
ALTER TABLE "ama" ADD COLUMN "publicId" varchar(8) NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "moderationCat" "moderationCategory" DEFAULT 'SAFE';--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "deviceId";--> statement-breakpoint
ALTER TABLE "ama" ADD CONSTRAINT "ama_publicId_unique" UNIQUE("publicId");