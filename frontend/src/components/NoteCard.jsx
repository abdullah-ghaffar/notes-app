// src/components/NoteCard.jsx
export default function NoteCard({ note, onEdit, onDelete, isEditing }) {
  return (
    <div
      className={`border rounded-xl p-4 shadow-sm bg-white transition ${
        isEditing ? "ring-2 ring-yellow-300" : ""
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {note.title}
      </h3>
      <p className="text-gray-600 mb-3 whitespace-pre-line">{note.body}</p>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-sm rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
