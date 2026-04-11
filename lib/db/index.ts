import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "notepad.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL DEFAULT '',
        updatedAt INTEGER NOT NULL
      );
    `);
  }
  return db;
}

export type NoteRow = {
  id: string;
  content: string;
  updatedAt: number;
};

export function getNote(id: string): NoteRow | undefined {
  const row = getDb()
    .prepare("SELECT id, content, updatedAt FROM notes WHERE id = ?")
    .get(id) as NoteRow | undefined;
  return row;
}

export function upsertNote(id: string, content: string): NoteRow {
  const now = Date.now();
  getDb()
    .prepare(
      `INSERT INTO notes (id, content, updatedAt) VALUES (?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         content = excluded.content,
         updatedAt = excluded.updatedAt`
    )
    .run(id, content, now);
  return { id, content, updatedAt: now };
}

/** Slugs das subpáginas diretas: ids `parent/slug` sem mais `/`. */
export function listChildSlugs(parentId: string): string[] {
  const prefix = `${parentId}/`;
  const plen = prefix.length;
  const rows = getDb()
    .prepare(
      `SELECT id FROM notes
       WHERE substr(id, 1, ?) = ?
         AND instr(substr(id, ? + 1), '/') = 0
         AND length(id) > ?`
    )
    .all(plen, prefix, plen, plen) as { id: string }[];

  return rows.map((r) => r.id.slice(plen));
}
