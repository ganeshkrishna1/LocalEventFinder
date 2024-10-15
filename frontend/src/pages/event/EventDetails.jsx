import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loading/Loading';

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
      setEvent(response.data);
    };
    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div><Loading /></div>;
  }

  const handleBookNow = () => {
    navigate(`/booking-summary/${eventId}`); // Redirect to Booking Summary
  };

  return (
    <div className='h-screen bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300 p-2'>
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
        {/* Event Image */}
        <img className="w-full h-64 object-cover rounded-md mb-6" src={event.imageUrl || "https://via.placeholder.com/400x300"} alt={event.title} />

        {/* Event Details */}
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <p className="text-gray-700 mb-4"><strong>Category:</strong> {event.category}</p>
        <p className="text-gray-700 mb-4"><strong>Description:</strong> {event.description || 'No description available'}</p>
        <p className="text-gray-700 mb-4"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-4"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-700 mb-4"><strong>Price:</strong> ${event.price}</p>

        {/* Book Now Button */}
        <div className="bottom-4 left-4 right-4">
          <button
            onClick={handleBookNow}
            className="block w-full bg-blue-700 text-white text-center py-3 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
