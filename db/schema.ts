import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const discoveryRequests = sqliteTable("discovery_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  workEmail: text("work_email").notNull(),
  company: text("company").notNull(),
  workflow: text("workflow").notNull(),
  dataLandscape: text("data_landscape"),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
