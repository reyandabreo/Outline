import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

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
      aria-label={`View note titled ${note.title}`}
    >

      <div className="mx-2 sm:mx-auto w-[calc(100%-1rem)] sm:w-full sm:max-w-sm border border-base-300 bg-base-100 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 p-4 sm:p-5 md:p-6 flex flex-col justify-between relative overflow-hidden min-h-[12rem] sm:max-h-56 overflow-y-auto">
        {/* Decorative highlight */}
        <div className="absolute top-0 w-full left-0  h-1 bg-primary rounded-t-xl group-hover:h-1.5 transition-all duration-300"></div>

        <div className="flex-1">
          {/* Title with line clamping */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-base-content mb-2 break-words tracking-tight line-clamp-2">
            {note.title}
          </h3>
          {/* Content with Markdown rendering */}
          <div className="text-xs sm:text-sm md:text-base text-base-content/70 leading-relaxed line-clamp-3 prose prose-sm">
            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
              {note.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 flex items-center justify-between text-xs text-base-content/60">
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