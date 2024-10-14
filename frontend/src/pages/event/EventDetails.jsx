import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

const sampleEvents = [
  { id: 1, title: "Tech Conference", description: "A conference about the latest in tech.", category: "Technology", date: "2024-10-20", location: "New York", availableTickets: 100, price: 200 },
  { id: 2, title: "Music Festival", description: "A fun music festival.", category: "Music", date: "2024-11-05", location: "Los Angeles", availableTickets: 150, price: 150 },
];

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Simulate fetching event data based on eventId
    const eventData = sampleEvents.find(e => e.id === parseInt(eventId));
    setEvent(eventData);
  }, [eventId]);

  if (!event) {
    return <div><Loading/></div>;
  }

  return (
    <div className='bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300'>

    
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg ">
      {/* Event Image */}
      <img className="w-full h-64 object-cover rounded-md mb-6" src="https://via.placeholder.com/400x300" alt={event.title} />

      {/* Event Details */}
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <p className="text-gray-700 mb-4"><strong>Category:</strong> {event.category}</p>
      <p className="text-gray-700 mb-4"><strong>Description:</strong> {event.description || 'No description available'}</p>
      <p className="text-gray-700 mb-4"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-4"><strong>Location:</strong> {event.location}</p>
      <p className="text-gray-700 mb-4"><strong>Tickets Available:</strong> {event.availableTickets}</p>
      <p className="text-gray-700 mb-4"><strong>Price:</strong> ${event.price}</p>

      {/* Book Now Button */}
      <div className=" bottom-4 left-4 right-4">
        <a href="" className="block w-full bg-blue-700 text-white text-center py-3 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Book Now
        </a>
      </div>
    </div>
    </div>
  );
}

export default EventDetail;
