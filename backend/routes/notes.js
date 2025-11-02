// backend/routes/notes.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// CREATE  (POST /api/notes)
router.post("/", (req, res) => {
  const { title, body } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const stmt = db.prepare(
    "INSERT INTO notes (title, body) VALUES (?, ?)"
  );
  const result = stmt.run(title, body);

  const newNote = db
    .prepare("SELECT * FROM notes WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newNote);
});

// READ ALL  (GET /api/notes)
router.get("/", (req, res) => {
  const notes = db.prepare("SELECT * FROM notes ORDER BY id DESC").all();
  res.json(notes);
});

// READ ONE  (GET /api/notes/:id)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(note);
});

// UPDATE (PUT /api/notes/:id)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  const stmt = db.prepare(
    "UPDATE notes SET title = ?, body = ? WHERE id = ?"
  );
  stmt.run(title || note.title, body || note.body, id);

  const updated = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
  res.json(updated);
});

// DELETE (DELETE /api/notes/:id)
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
  res.json({ message: `Note ${id} deleted successfully.` });
});

export default router;
