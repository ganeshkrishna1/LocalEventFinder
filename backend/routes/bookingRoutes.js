import express from 'express';
import { createBooking, updateBookingStatus } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking); // Create a new booking
router.put('/:id', updateBookingStatus); // Update booking status

export default router;
