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

// Fetch event stats including purchased tickets and accepted RSVPs
export const getEventStats = async (req, res) => {
  try {
    // Fetch the event data along with purchased tickets and RSVP status
    const stats = await Booking.aggregate([
      {
        // Join with Event to fetch event details
        $lookup: {
          from: 'events', // The 'events' collection name in MongoDB
          localField: 'event',
          foreignField: '_id',
          as: 'eventDetails',
        },
      },
      {
        // Unwind the eventDetails array to extract single event object
        $unwind: '$eventDetails',
      },
      {
        // Group bookings by event and count the number of tickets sold and RSVP accepted
        $group: {
          _id: '$event',
          eventName: { $first: '$eventDetails.title' }, // Get event name
          totalPurchasedTickets: { $sum: '$numberOfTickets' }, // Sum of tickets sold
          acceptedRSVPs: { $sum: { $cond: ['$rsvp', '$numberOfTickets', 0] } }, // Sum if RSVP is true
        },
      },
      {
        // Sort the data by total purchased tickets (optional)
        $sort: { totalPurchasedTickets: -1 },
      },
    ]);

    // Send the result
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
