import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Initialize SQLite database
let db: Database | null = null;

export async function getDb() {
  if (db) return db;

  db = await open({
    filename: process.env.DATABASE_URL || "./feedbacks.db",
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
