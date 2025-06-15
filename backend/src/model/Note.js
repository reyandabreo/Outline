
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        }
        
    },
    {
        timestamps:true
    }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;