CREATE TABLE "lfg_posts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"game_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"region" text NOT NULL,
	"platform" text NOT NULL,
	"mode" text NOT NULL,
	"skill" text NOT NULL,
	"vibe" text NOT NULL,
	"mic" boolean DEFAULT false NOT NULL,
	"slots" integer NOT NULL,
	"gamer_tag" text NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lfg_posts_slots_check" CHECK ("lfg_posts"."slots" between 1 and 4)
);
--> statement-breakpoint
CREATE TABLE "lfg_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"post_id" text NOT NULL,
	"user_id" text NOT NULL,
	"gamer_tag" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lfg_posts" ADD CONSTRAINT "lfg_posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lfg_posts" ADD CONSTRAINT "lfg_posts_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lfg_requests" ADD CONSTRAINT "lfg_requests_post_id_lfg_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."lfg_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lfg_requests" ADD CONSTRAINT "lfg_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lfg_posts_browse_idx" ON "lfg_posts" USING btree ("status","expires_at","created_at");--> statement-breakpoint
CREATE INDEX "lfg_posts_game_idx" ON "lfg_posts" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "lfg_posts_owner_idx" ON "lfg_posts" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lfg_requests_post_user_unique" ON "lfg_requests" USING btree ("post_id","user_id");--> statement-breakpoint
CREATE INDEX "lfg_requests_owner_idx" ON "lfg_requests" USING btree ("user_id");