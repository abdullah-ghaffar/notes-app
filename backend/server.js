// backend/server.js
import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Notes API is running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
