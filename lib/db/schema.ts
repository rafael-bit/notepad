import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content"),
	photoUrl: text("photo_url"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
