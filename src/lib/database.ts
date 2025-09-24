// lib/database.ts
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

// Initialize SQLite database
let db: Database | null = null;

export async function getDb() {
  if (db) return db;

  const dbPath =
    process.env.NODE_ENV === "production"
      ? "/tmp/feedbacks.db"
      : path.join(process.cwd(), "feedbacks.db");

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Create the feedbacks table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      feedback TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  return db;
}
