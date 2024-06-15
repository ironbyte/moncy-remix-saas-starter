CREATE TABLE IF NOT EXISTS "user_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
