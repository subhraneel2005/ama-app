ALTER TABLE "ama" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "ama" ADD COLUMN "willExpireAt" timestamp with time zone;