import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Card Header */}
      <div className="p-4 bg-blue-500 text-white font-bold">
        {event.title}
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-700">
          <strong>Category:</strong> {event.category}
        </p>
        <p className="text-gray-700">
          <strong>Description:</strong> {event.description || 'No description available'}
        </p>
        <p className="text-gray-700">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="text-gray-700">
          <strong>Tickets Available:</strong> {event.availableTickets}
        </p>
        <p className="text-gray-700">
          <strong>Price:</strong> ${event.price}
        </p>
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-gray-100">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;