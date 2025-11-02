// src/components/NoteForm.jsx
export default function NoteForm({
  title,
  body,
  editId,
  setTitle,
  setBody,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 h-28 mb-3 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <div className="flex gap-2">
        <button
          onClick={onSubmit}
          className={`px-4 py-2 rounded-lg text-white ${
            editId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editId ? "Update Note" : "Add Note"}
        </button>
        {editId && (
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
