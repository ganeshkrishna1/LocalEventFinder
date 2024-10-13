// controllers/dashboardController.js
import Event from '../models/Event.js';
import Booking from '../models/Booking.js';

// Get event stats for admin dashboard
export const getEventStats = async (req, res) => {
  try {
    const eventCount = await Event.countDocuments({});
    const bookingCount = await Booking.countDocuments({});
    const totalRevenue = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({
      eventCount,
      bookingCount,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
