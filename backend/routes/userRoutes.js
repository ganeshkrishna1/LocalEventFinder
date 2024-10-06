// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);

// Login user and get a JWT token
router.post('/login', loginUser);

// Get all users (protected route)
router.get('/', protect, getUsers);

export default router;
