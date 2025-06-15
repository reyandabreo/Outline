import Note from '../model/Note.js';

// GET all notes for logged-in user
export async function getNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
}

// GET a specific note only if it belongs to the logged-in user
export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
}

// POST (create) a new note for the logged-in user
export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, user: req.user._id });

    const showNote = await newNote.save();
    res.status(201).json(showNote);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
}

// PUT (update) a note only if it belongs to the logged-in user
export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
}

// DELETE a note only if it belongs to the logged-in user
export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
}
