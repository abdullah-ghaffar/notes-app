import { useState, useEffect } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "./api/notes";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import { toast } from "sonner";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  // Load notes from backend
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setBody("");
    toast.info("Edit cancelled");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 Notes App
        </h1>

        {/* Note Form */}
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
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No notes yet — add one above.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {notes.map((n) => (
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
