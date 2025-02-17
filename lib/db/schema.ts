import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const $notes = pgTable('notes', {
	id: serial('id').primaryKey(),
	prompt: text('prompt').notNull(),
	imageUrl: text('image_url'),
	editorState: text('editor_state'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	userId: text('user_id').notNull()
})

export type NoteType = typeof $notes.$inferInsert