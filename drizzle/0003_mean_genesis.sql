ALTER TABLE "question" ADD COLUMN "score" numeric;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "IsBanned" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "abuseCount" integer DEFAULT 0;