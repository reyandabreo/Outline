import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from 'dotenv';

export const protect = async (req, res, next) => {

  dotenv.config();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
