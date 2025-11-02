// backend/db.js
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Make sure the data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Connect to (or create) the SQLite database file
const dbPath = path.join(dataDir, "app.db");
const db = new Database(dbPath);

// Create the notes table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("✅ SQLite database ready at:", dbPath);

export default db;
