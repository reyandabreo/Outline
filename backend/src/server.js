import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import notesRoutes from './routes/notesRoutes.js';
import { dbConnect } from './config/db.js';
import authRoutes from './routes/auth.js';
import rateLimiter from './middleware/rateLimiter.js';
import { protect } from './middleware/authMiddleware.js';

const app = express();
const __dirname = path.resolve();
dotenv.config();

// In development, allow Vite frontend
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}

// Middleware
app.use(express.json());
app.use(rateLimiter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', protect, notesRoutes);

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server after DB connect
const PORT = process.env.PORT || 5001;
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
