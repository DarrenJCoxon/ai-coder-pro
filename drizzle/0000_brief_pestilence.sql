CREATE TABLE "analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"user_id" varchar(255),
	"resource_id" integer,
	"prompt_id" integer,
	"metadata" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "educational_resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"resource_type" varchar(100) NOT NULL,
	"subject" varchar(100),
	"year_group" varchar(50),
	"features" text,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_prompts" (
	"id" serial PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"generated_resource_id" integer,
	"user_agent" varchar(500),
	"ip_address" varchar(45),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_resource_id_educational_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."educational_resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_prompt_id_user_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."user_prompts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_prompts" ADD CONSTRAINT "user_prompts_generated_resource_id_educational_resources_id_fk" FOREIGN KEY ("generated_resource_id") REFERENCES "public"."educational_resources"("id") ON DELETE no action ON UPDATE no action;