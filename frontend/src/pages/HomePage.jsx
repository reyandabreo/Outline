import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import { StickyNote, Lightbulb, Smile,Sparkles } from "lucide-react";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
          {/* Icon */}
          <div className="bg-primary/20 rounded-full p-5 shadow-md mb-5 w-fit">
            <StickyNote className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary mb-3 flex items-center gap-3">
            <Lightbulb className="w-7 h-7 sm:w-10 sm:h-10 text-yellow-400 animate-pulse" />
            Notes that Inspire
          </h1>

          {/* Subtext */}
          <p className="text-base-content/70 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
            Capture your best ideas and keep them at your fingertips — 
            <span className="font-semibold text-primary"> smart, simple, and stylish.</span> 
            Get organized and stay inspired every day.
          </p>

          {/* Quote Box */}
          <div className="bg-primary/10 border border-primary/40 rounded-lg px-6 py-5 sm:px-8 sm:py-6 shadow-inner select-none max-w-2xl">
            <Lightbulb className="mx-auto mb-4 w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 animate-pulse" />
            <p className="italic text-base-content/70 text-base sm:text-lg leading-relaxed mb-5 text-center">
              “Great ideas often start with a single note. 
              <span className='font-semibold text-primary'> Write yours down today and watch inspiration flow.</span>”
            </p>
            <div className="text-primary flex items-center justify-center gap-3 sm:gap-4 text-xl animate-bounce">
              <Sparkles className="w-6 h-6" />
              <Sparkles className="w-5 h-5" />
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>


        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        )}

        {/* No Notes */}
        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {/* Notes Grid */}
        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
