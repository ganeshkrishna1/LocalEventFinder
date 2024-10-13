// controllers/bookingController.js
import Booking from '../models/Booking.js';

// Book tickets for an event
export const bookEvent = async (req, res) => {
  const { event, numberOfTickets, totalAmount } = req.body;

  try {
    const booking = new Booking({
      event,
      user: req.user._id, // User ID from JWT
      numberOfTickets,
      totalAmount,
      isPaid: false,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings (Admin only)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('event user');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status (Admin)
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { isPaid, paymentDate } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.isPaid = isPaid;
    booking.paymentDate = isPaid ? paymentDate : null;

    await booking.save();
    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete booking by ID (Admin)
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.remove();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
