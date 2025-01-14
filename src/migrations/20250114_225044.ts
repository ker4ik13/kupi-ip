import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "accordion_preset_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "accordion_preset" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "page_blocks_accordion" ADD COLUMN "type" varchar DEFAULT 'manual';
  ALTER TABLE "page_blocks_accordion" ADD COLUMN "preset_id" uuid;
  ALTER TABLE "_page_v_blocks_accordion" ADD COLUMN "type" varchar DEFAULT 'manual';
  ALTER TABLE "_page_v_blocks_accordion" ADD COLUMN "preset_id" uuid;
  ALTER TABLE "post_blocks_accordion" ADD COLUMN "type" varchar DEFAULT 'manual';
  ALTER TABLE "post_blocks_accordion" ADD COLUMN "preset_id" uuid;
  ALTER TABLE "_post_v_blocks_accordion" ADD COLUMN "type" varchar DEFAULT 'manual';
  ALTER TABLE "_post_v_blocks_accordion" ADD COLUMN "preset_id" uuid;
  ALTER TABLE "guide_blocks_accordion" ADD COLUMN "type" varchar DEFAULT 'manual';
  ALTER TABLE "guide_blocks_accordion" ADD COLUMN "preset_id" uuid;
  ALTER TABLE "_guide_v_blocks_accordion" ADD COLUMN "type" varchar DEFAULT 'manual';
  ALTER TABLE "_guide_v_blocks_accordion" ADD COLUMN "preset_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "accordion_preset_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "accordion_preset_items" ADD CONSTRAINT "accordion_preset_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accordion_preset"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "accordion_preset_items_order_idx" ON "accordion_preset_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "accordion_preset_items_parent_id_idx" ON "accordion_preset_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "accordion_preset_updated_at_idx" ON "accordion_preset" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "accordion_preset_created_at_idx" ON "accordion_preset" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "page_blocks_accordion" ADD CONSTRAINT "page_blocks_accordion_preset_id_accordion_preset_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."accordion_preset"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_accordion" ADD CONSTRAINT "_page_v_blocks_accordion_preset_id_accordion_preset_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."accordion_preset"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_blocks_accordion" ADD CONSTRAINT "post_blocks_accordion_preset_id_accordion_preset_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."accordion_preset"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_post_v_blocks_accordion" ADD CONSTRAINT "_post_v_blocks_accordion_preset_id_accordion_preset_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."accordion_preset"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "guide_blocks_accordion" ADD CONSTRAINT "guide_blocks_accordion_preset_id_accordion_preset_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."accordion_preset"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_guide_v_blocks_accordion" ADD CONSTRAINT "_guide_v_blocks_accordion_preset_id_accordion_preset_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."accordion_preset"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accordion_preset_fk" FOREIGN KEY ("accordion_preset_id") REFERENCES "public"."accordion_preset"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_blocks_accordion_preset_idx" ON "page_blocks_accordion" USING btree ("preset_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_accordion_preset_idx" ON "_page_v_blocks_accordion" USING btree ("preset_id");
  CREATE INDEX IF NOT EXISTS "post_blocks_accordion_preset_idx" ON "post_blocks_accordion" USING btree ("preset_id");
  CREATE INDEX IF NOT EXISTS "_post_v_blocks_accordion_preset_idx" ON "_post_v_blocks_accordion" USING btree ("preset_id");
  CREATE INDEX IF NOT EXISTS "guide_blocks_accordion_preset_idx" ON "guide_blocks_accordion" USING btree ("preset_id");
  CREATE INDEX IF NOT EXISTS "_guide_v_blocks_accordion_preset_idx" ON "_guide_v_blocks_accordion" USING btree ("preset_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_accordion_preset_id_idx" ON "payload_locked_documents_rels" USING btree ("accordion_preset_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accordion_preset_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accordion_preset" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "accordion_preset_items" CASCADE;
  DROP TABLE "accordion_preset" CASCADE;
  ALTER TABLE "page_blocks_accordion" DROP CONSTRAINT "page_blocks_accordion_preset_id_accordion_preset_id_fk";
  
  ALTER TABLE "_page_v_blocks_accordion" DROP CONSTRAINT "_page_v_blocks_accordion_preset_id_accordion_preset_id_fk";
  
  ALTER TABLE "post_blocks_accordion" DROP CONSTRAINT "post_blocks_accordion_preset_id_accordion_preset_id_fk";
  
  ALTER TABLE "_post_v_blocks_accordion" DROP CONSTRAINT "_post_v_blocks_accordion_preset_id_accordion_preset_id_fk";
  
  ALTER TABLE "guide_blocks_accordion" DROP CONSTRAINT "guide_blocks_accordion_preset_id_accordion_preset_id_fk";
  
  ALTER TABLE "_guide_v_blocks_accordion" DROP CONSTRAINT "_guide_v_blocks_accordion_preset_id_accordion_preset_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_accordion_preset_fk";
  
  DROP INDEX IF EXISTS "page_blocks_accordion_preset_idx";
  DROP INDEX IF EXISTS "_page_v_blocks_accordion_preset_idx";
  DROP INDEX IF EXISTS "post_blocks_accordion_preset_idx";
  DROP INDEX IF EXISTS "_post_v_blocks_accordion_preset_idx";
  DROP INDEX IF EXISTS "guide_blocks_accordion_preset_idx";
  DROP INDEX IF EXISTS "_guide_v_blocks_accordion_preset_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_accordion_preset_id_idx";
  ALTER TABLE "page_blocks_accordion" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "page_blocks_accordion" DROP COLUMN IF EXISTS "preset_id";
  ALTER TABLE "_page_v_blocks_accordion" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_page_v_blocks_accordion" DROP COLUMN IF EXISTS "preset_id";
  ALTER TABLE "post_blocks_accordion" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "post_blocks_accordion" DROP COLUMN IF EXISTS "preset_id";
  ALTER TABLE "_post_v_blocks_accordion" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_post_v_blocks_accordion" DROP COLUMN IF EXISTS "preset_id";
  ALTER TABLE "guide_blocks_accordion" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "guide_blocks_accordion" DROP COLUMN IF EXISTS "preset_id";
  ALTER TABLE "_guide_v_blocks_accordion" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_guide_v_blocks_accordion" DROP COLUMN IF EXISTS "preset_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "accordion_preset_id";`)
}
