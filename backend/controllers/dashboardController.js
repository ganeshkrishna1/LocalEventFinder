// controllers/dashboardController.js
import Booking from '../models/Booking.js';


export const getTicketSalesData = async (req, res) => {
  try {
    // Aggregate ticket sales by event category, considering only paid bookings
    const ticketSales = await Booking.aggregate([
      {
        $match: {
          paymentStatus: 'Paid', // Filter bookings to include only those with a 'Paid' status
        },
      },
      {
        $lookup: {
          from: 'events', // The name of the events collection in MongoDB
          localField: 'event',
          foreignField: '_id',
          as: 'eventDetails',
        },
      },
      { $unwind: '$eventDetails' }, // Unwind the array to get individual event documents
      {
        $group: {
          _id: '$eventDetails.category', // Group by event category
          totalTicketsSold: { $sum: '$numberOfTickets' }, // Sum the number of tickets sold
        },
      },
    ]);

    // Format the response
    const formattedSalesData = ticketSales.map(item => ({
      name: item._id,
      value: item.totalTicketsSold,
    }));

    res.status(200).json(formattedSalesData); // Respond with the formatted data
  } catch (error) {
    console.error('Error fetching ticket sales data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
