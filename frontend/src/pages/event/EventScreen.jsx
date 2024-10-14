import React, { useState, useEffect } from 'react';
import EventCard from '../../components/event/EventCard';

// Mock data for events
const mockEvents = [
  {
    _id: '1',
    title: 'Rock Concert',
    category: 'concert',
    description: 'A night of rock and roll music.',
    date: '2024-11-20',
    location: 'Madison Square Garden, NY',
    availableTickets: 120,
    price: 50,
  },
  {
    _id: '2',
    title: 'Basketball Match',
    category: 'sport',
    description: 'Local teams battle it out on the court.',
    date: '2024-11-15',
    location: 'Staples Center, LA',
    availableTickets: 200,
    price: 35,
    imgSource:"https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg"
  },
  {
    _id: '3',
    title: 'Painting Workshop',
    category: 'workshop',
    description: 'Learn how to paint landscapes.',
    date: '2024-12-05',
    location: 'Art Studio, SF',
    availableTickets: 25,
    price: 60,
  },
  {
    _id: '4',
    title: 'Jazz Night',
    category: 'concert',
    description: 'Smooth jazz from the top musicians.',
    date: '2024-11-30',
    location: 'Jazz Club, NY',
    availableTickets: 80,
    price: 40,
  },
  {
    _id: '5',
    title: 'Football Championship',
    category: 'sport',
    description: 'Top teams competing for the championship.',
    date: '2024-12-10',
    location: 'Wembley Stadium, London',
    availableTickets: 150,
    price: 70,
  },
  {
    _id: '6',
    title: 'Photography Workshop',
    category: 'workshop',
    description: 'Learn the basics of DSLR photography.',
    date: '2024-11-25',
    location: 'Downtown Studio, LA',
    availableTickets: 30,
    price: 55,
  },
];

const EventScreen = () => {
  const [events, setEvents] = useState([]);  // Store all events
  const [filteredEvents, setFilteredEvents] = useState([]);  // Store filtered events
  const [filterCategory, setFilterCategory] = useState('');  // Current filter

  useEffect(() => {
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);  // Initially set filtered to all events
  }, []);

  // Handle filtering based on category
  const handleFilterChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);

    if (category === '') {
      setFilteredEvents(events);  // Show all events when no filter is selected
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="container mx-auto">
        {/* Filter Dropdown */}
        <div className="flex justify-center mb-8">
          <select
            className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none"
            value={filterCategory}
            onChange={handleFilterChange}
          >
            <option value="">All Events</option>
            <option value="concert">Concert</option>
            <option value="sport">Sport</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />  // Pass event data as props to EventCard
          ))}
        </div>

        {/* No Events Found */}
        {filteredEvents.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            No events found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventScreen;