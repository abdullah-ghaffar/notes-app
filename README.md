# Notes App

A calm, local-first note system built with **Node.js**, **React (Vite)**, and **SQLite**.
Designed for reliability, clarity, and speed.

---

## Quick Start

```bash
# Backend
cd backend
npm install
npm install sqlite3 sqlite nodemon
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

**Backend:** [http://localhost:5000](http://localhost:5000)


**Frontend:** [http://localhost:5173](http://localhost:5173)

---

## Overview

This project demonstrates a complete, local-first architecture.
Data is stored on disk through SQLite and served via a minimal Express API.
The frontend, built with React and Vite, offers instant feedback and a clean, predictable UI.
Each note records its own timeline — creation and last edit — ensuring temporal consistency across the stack.

---

## Architecture

```bash
notes-app/
├── backend/
│   ├── db.js              # SQLite initialization
│   ├── server.js          # Express API server
│   ├── routes/notes.js    # CRUD routes
│   └── data/app.db        # Local database
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/NoteCard.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

Each layer is independent but transparent to the one above it.
State flows in one direction: **disk → API → UI**.

---

## Stack

* **Frontend:** React + Vite + Tailwind CSS
* **Backend:** Node.js + Express
* **Database:** SQLite (local, durable, zero-config)

---

## Features

* Full CRUD operations
* Persistent local storage
* Automatic timestamps (“Last edited …”)
* Responsive, minimal layout
* Hot reload (Nodemon + Vite)
* Runs entirely offline

---

## API Reference

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/notes`     | Retrieve all notes      |
| POST   | `/api/notes`     | Create a new note       |
| PUT    | `/api/notes/:id` | Update an existing note |
| DELETE | `/api/notes/:id` | Remove a note           |