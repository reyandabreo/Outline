import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 429) {
        toast.error("Slow down flash! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6 flex items-center gap-2">
            <ArrowLeftIcon className="size-5" />
            <span>Back to Notes</span>
          </Link>

          <div className="card bg-base-100 shadow-2xl border border-base-300 transition-all duration-300 hover:shadow-primary hover:scale-[1.01]">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-4 text-primary font-bold">
                Create a New Note
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered focus:outline-none focus:ring focus:ring-primary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-40 focus:outline-none focus:ring focus:ring-primary"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary transition-transform duration-200 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner text-white" />
                    ) : (
                      "Create Note"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
