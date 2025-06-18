import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import useSpeechToText from "../hooks/useSpeechToText";
import { MicIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { listening, transcript, startListening, stopListening, supported } = useSpeechToText();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Append speech-to-text live transcript to the note content
    if (listening && transcript) {
      setNote((prev) => ({ ...prev, content: prev.content + " " + transcript }));
    }
  }, [transcript]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleMicClick = () => {
    if (!supported) {
      alert("Your browser does not support voice recognition");
      return;
    }

    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add both title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 animate-fade-in-up">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost gap-2">
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Link>

          <button onClick={handleDelete} className="btn btn-outline btn-error gap-2">
            <Trash2Icon className="h-5 w-5" />
            Delete
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered input-lg"
                  value={note.title}
                  onFocus={() => setIsEditing(true)}
                  onBlur={() => setTimeout(() => setIsEditing(false), 200)}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              ) : (
                <div
                  className="p-3 text-xl font-semibold border rounded cursor-pointer hover:bg-base-200"
                  onClick={() => setIsEditing(true)}
                >
                  <ReactMarkdown>{note.title || "_No title_"}</ReactMarkdown>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Content</span>
              </label>
              {isEditing ? (
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-40"
                  value={note.content}
                  onFocus={() => setIsEditing(true)}
                  onBlur={() => setTimeout(() => setIsEditing(false), 200)}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              ) : (
                <div
                  className="p-3 border rounded cursor-pointer hover:bg-base-200 prose max-w-none"
                  onClick={() => setIsEditing(true)}
                >
                  <ReactMarkdown>{note.content || "_No content yet_"}</ReactMarkdown>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleMicClick}
                className={`btn btn-outline btn-secondary gap-2 ${listening ? "animate-pulse" : ""}`}
              >
                <MicIcon className="w-4 h-4" />
                {listening ? "Stop" : "Speak"}
              </button>

              <button
                onClick={handleSave}
                className={`btn btn-primary ${saving ? "btn-disabled loading" : ""}`}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
