export default function NoteCard({ note, onEdit, onDelete, isEditing }) {
  // Format the date in local time, human-readable
  const date = new Date(note.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-300 ${
        isEditing ? "ring-2 ring-yellow-400" : ""
      }`}
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2 break-words">
        {note.title}
      </h3>

      {/* Body */}
      <p className="text-gray-700 mb-6 whitespace-pre-line leading-relaxed break-words">
        {note.body}
      </p>

      {/* Timestamp at bottom right */}
      <div className="flex justify-end mb-3">
        <span className="text-xs text-gray-500 italic">
          {formattedDate}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(note)}
          className="px-4 py-1.5 bg-yellow-300 hover:bg-yellow-400 text-gray-900 text-sm font-medium rounded-full shadow-sm transition-all"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-full shadow-sm transition-all"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
