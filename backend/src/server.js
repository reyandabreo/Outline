
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import notesRoutes  from './routes/notesRoutes.js';
import { dbConnect } from './config/db.js';
import authRoutes from './routes/auth.js';
import rateLimiter from './middleware/rateLimiter.js';
import { protect } from './middleware/authMiddleware.js';

const app = express();
const __dirname = path.resolve();
dotenv.config();

// to give backend access to frontend
if(process.env.NODE_ENV!=="production"){
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}
// middleware to access req.body
app.use(express.json());
// rate limiter middleware
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/notes', protect, notesRoutes);


app.use(express.static(path.join(__dirname,"../frontend/dist")));

if(process.env.NODE_ENV==="production"){
    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// connect mongodb before starting server
dbConnect().then(()=>{
    app.listen(5001,()=>{
        console.log('Server is running on port 5001');
    });
});
