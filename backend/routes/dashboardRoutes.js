import express from 'express';
import { getEventStats } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getEventStats); // Get event stats (admin only)

export default router;
