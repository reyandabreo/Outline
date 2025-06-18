import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent parent click
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

  const handleCardClick = () => {
      navigate(`/note/${note._id}`); // open read-only
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer mx-2 sm:mx-auto w-[calc(100%-1rem)] sm:w-full sm:max-w-sm border border-base-300 bg-base-100 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 p-4 sm:p-5 md:p-6 flex flex-col justify-between relative overflow-hidden min-h-[14rem] max-h-[14rem]"
    >
      {/* Decorative highlight */}
      <div className="absolute top-0 w-full left-0 h-1 bg-primary rounded-t-xl group-hover:h-1.5 transition-all duration-300"></div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-base-content mb-2 break-words tracking-tight line-clamp-2">
          {note.title}
        </h3>
        <div className="text-xs sm:text-sm md:text-base text-base-content/70 leading-relaxed overflow-hidden line-clamp-3 prose prose-sm max-h-[4.5rem]">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Footer: Date + Buttons */}
      <div className="mt-4 sm:mt-5 flex items-center justify-between text-xs text-base-content/60">
        <span>{formatDate(new Date(note.createdAt))}</span>
        <div className="flex items-center gap-2">
          {/* ✅ Edit icon with stopPropagation */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // don't trigger card click
              navigate(`/note/${note._id}`);
            }}
            className="btn btn-ghost btn-xs text-success"
            aria-label="Edit note"
          >
            <PenSquareIcon className="size-4" />
          </button>

          {/* 🗑 Delete icon */}
          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="btn btn-ghost btn-xs text-error"
            aria-label="Delete note"
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
