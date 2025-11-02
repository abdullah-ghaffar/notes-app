import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all notes (sorted by newest first)
router.get("/", async (req, res) => {
  try {
    const notes = await db.all(
      "SELECT * FROM notes ORDER BY datetime(createdAt) DESC"
    );
    res.json(notes);
  } catch (err) {
    console.error("❌ Error in GET /api/notes:", err.message);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Create new note
router.post("/", async (req, res) => {
  try {
    const { title, body } = req.body;
    const result = await db.run(
      "INSERT INTO notes (title, body) VALUES (?, ?)",
      [title, body]
    );
    const newNote = await db.get("SELECT * FROM notes WHERE id = ?", [
      result.lastID,
    ]);
    res.status(201).json(newNote);
  } catch (err) {
    console.error("❌ Error in POST /api/notes:", err.message);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// Update existing note
router.put("/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    await db.run(
      "UPDATE notes SET title = ?, body = ?, createdAt = datetime('now', 'localtime') WHERE id = ?",
      [title, body, req.params.id]
    );
    const updated = await db.get("SELECT * FROM notes WHERE id = ?", [
      req.params.id,
    ]);
    res.json(updated);
  } catch (err) {
    console.error("❌ Error in PUT /api/notes:", err.message);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete note
router.delete("/:id", async (req, res) => {
  try {
    await db.run("DELETE FROM notes WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error in DELETE /api/notes:", err.message);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;
