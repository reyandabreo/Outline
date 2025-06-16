import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }
  };

  return (
<Link
      to={`/note/${note._id}`}
      className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)]"
    >
      <div className="mx-auto h-44 w-full max-w-xs border border-base-300 bg-base-100 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 p-5 flex flex-col justify-between relative">
        
        {/* Decorative highlight */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-xl group-hover:h-1.5 transition-all duration-300"></div>

        <div>
          <h3 className="text-lg font-bold text-base-content mb-2 break-words tracking-tight">
            {note.title}
          </h3>
          <p className="text-sm text-base-content/70 line-clamp-3 leading-relaxed">
            {note.content}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-base-content/60">
          <span>{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4 text-success" />
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent navigating to the note page
                handleDelete(e, note._id);
              }}
              className="btn btn-ghost btn-xs text-error"
              aria-label="Delete note"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>

  );
};

export default NoteCard;
