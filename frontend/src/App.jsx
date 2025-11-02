import { useState, useEffect, useMemo } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "./api/notes";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import { toast } from "sonner";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch {
      toast.error("Failed to load notes");
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return toast.warning("Title required");

    try {
      if (editId) {
        await updateNote(editId, { title, body });
        toast.success("Note updated!");
        setEditId(null);
      } else {
        await createNote({ title, body });
        toast.success("Note created!");
      }
      setTitle("");
      setBody("");
      loadNotes();
    } catch {
      toast.error("Failed to save note");
    }
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setBody(note.body);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      toast.error("Note deleted");
      if (id === editId) setEditId(null);
      loadNotes();
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setBody("");
    toast.info("Edit cancelled");
  };

  // 🔍 Smart, memoized filtering
  const filteredNotes = useMemo(() => {
    const term = search.toLowerCase();
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(term) ||
        n.body.toLowerCase().includes(term)
    );
  }, [search, notes]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 Notes App
        </h1>

        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Form */}
        <NoteForm
          title={title}
          body={body}
          editId={editId}
          setTitle={setTitle}
          setBody={setBody}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {/* Notes List */}
        {filteredNotes.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            {search ? "No results match your search." : "No notes yet — add one above."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredNotes.map((n) => (
              <NoteCard
                key={n.id}
                note={n}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEditing={editId === n.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
