import express from 'express';
import { registerUser, loginUser, getUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers); 
router.put('/:id', protect, admin, updateUser); // Admin can update a user
router.delete('/:id', protect, admin, deleteUser); // Admin can delete a user

export default router;
