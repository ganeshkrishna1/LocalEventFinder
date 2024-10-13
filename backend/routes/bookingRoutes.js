import express from 'express';
import { bookEvent, getBookings, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, bookEvent); // Book an event
router.get('/', protect, getBookings); // Get all bookings (admin only)
router.put('/:id', protect, updateBooking); // Update booking (admin)
router.delete('/:id', protect, deleteBooking); // Delete booking (admin)

export default router;
