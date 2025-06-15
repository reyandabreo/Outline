
import express from "express";
import { getNotes, createNotes, updateNotes, deleteNotes, getNoteById } from "../controllers/notesController.js";

const router = express.Router();

router.get("/",  getNotes);

router.get("/:id", getNoteById);

router.post("/", createNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);

/*
app.get("/api/notes", (req, res)=>{
    res.status(200).send("there are 10 notes available");
});

app.post("/api/notes",(req, res)=>{
    res.status(201).send("note created successfully");
});

app.put("/api/notes/:id", (req,res)=>{
    res.status(200).json({message:"note updated successfully"});
});

app.delete("/api/notes/:id", (req, res)=> {
    res.status(200).json({message:"note deleted successfully"});
});
*/

export default router;