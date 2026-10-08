CREATE TABLE "business_inquiries" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"company" text NOT NULL,
	"email" text NOT NULL,
	"website" text DEFAULT '' NOT NULL,
	"kind" text NOT NULL,
	"budget" text NOT NULL,
	"message" text NOT NULL,
	"fingerprint" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "business_inquiries_email_idx" ON "business_inquiries" USING btree ("email");--> statement-breakpoint
CREATE INDEX "business_inquiries_created_at_idx" ON "business_inquiries" USING btree ("created_at");