import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "data", "app.db");

// open SQLite database
const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
});

// Create table with local time timestamps
await db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT,
    createdAt TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

console.log("✅ SQLite database ready at:", dbPath);
export default db;
