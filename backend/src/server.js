
import express from 'express';
import notesRoutes  from './routes/notesRoutes.js';
import { dbConnect } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

const app = express();

dotenv.config();

// to give backend access to frontend
app.use(cors({
    origin: "http://localhost:5173",
}));
// middleware to access req.body
app.use(express.json());
// rate limiter middleware
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

// connect mongodb before starting server
dbConnect().then(()=>{
    app.listen(5001,()=>{
        console.log('Server is running on port 5001');
    });
});
