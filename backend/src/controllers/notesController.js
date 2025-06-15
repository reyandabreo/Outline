
import Note from '../model/Note.js'

export async function getNotes(_, res){
    try{
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);

    }catch(error){
        res.status(500).json({message:"internel server error"});
        console.error(error);
    }
}

export async function getNoteById(req, res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.status(200).json(note);
        
    }catch(error){
        res.status(500).json({message:"internel server error"});
        console.error(error);
    }
}


export async function createNotes(req, res){
    try{
        const{title, content} = req.body;
        const newNote = new Note({title, content});

        const showNote = await newNote.save();
        res.status(201).json(showNote);

    }catch(error){
        res.status(500).json({message:"internel server error"});
        console.error(error);
    }
}

export async function updateNotes(req, res){
    try{
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});
        if(!updatedNote){
            res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(updatedNote);
    }catch(error){
        res.status(500).json({message:"internel server error"});
        console.error(error);
    }
}

export async function deleteNotes(req, res){
    try{
        const {title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id,{title, content}, {new:true});
        if(!deletedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note Successfully deleted"});
    }catch(error){
        res.status(500).json({message:"internel server error"});
        console.error(error);
    }
}
