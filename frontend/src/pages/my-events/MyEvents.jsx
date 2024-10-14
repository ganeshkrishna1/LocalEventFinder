import React, { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { format, isBefore } from 'date-fns';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';

const mockBookings = [
  {
    _id: '1',
    event: {
      _id: 'event1',
      title: 'Concert in the Park',
      description: 'Enjoy a night of classical music in the beautiful park.',
      category: 'Music',
      location: 'City Park',
      date: '2024-11-20T18:00:00Z',
      imageUrl: 'https://example.com/concert.jpg', // URL to an image
    },
    user: {
      _id: 'user1',
      name: 'John Doe',
    },
    totalAmount: 50,
    paymentStatus: 'Paid',
    numberOfTickets: 2,
    bookingDate: '2024-10-10T10:00:00Z',
    rating: 4,
    comment: 'Great event, enjoyed it!',
  },
  {
    _id: '2',
    event: {
      _id: 'event2',
      title: 'Art Exhibition',
      description: 'Explore the latest in modern art.',
      category: 'Art',
      location: 'Art Gallery',
      date: '2024-12-15T15:00:00Z',
      imageUrl: 'https://example.com/art-exhibition.jpg', // URL to an image
    },
    user: {
      _id: 'user2',
      name: 'Jane Smith',
    },
    totalAmount: 30,
    paymentStatus: 'Paid',
    numberOfTickets: 1,
    bookingDate: '2024-10-12T11:00:00Z',
    rating: null,
    comment: '',
  },
  {
    _id: '3',
    event: {
      _id: 'event3',
      title: 'Tech Conference',
      description: 'Join us for a day of talks and networking with industry leaders.',
      category: 'Conference',
      location: 'Convention Center',
      date: '2025-01-05T09:00:00Z',
      imageUrl: 'https://example.com/tech-conference.jpg', // URL to an image
    },
    user: {
      _id: 'user3',
      name: 'Alice Johnson',
    },
    totalAmount: 200,
    paymentStatus: 'Pending',
    numberOfTickets: 3,
    bookingDate: '2024-10-13T09:00:00Z',
    rating: null,
    comment: '',
  },
  {
    _id: '4',
    event: {
      _id: 'event4',
      title: 'Cooking Workshop',
      description: 'Learn to cook delicious Italian dishes.',
      category: 'Workshop',
      location: 'Culinary School',
      date: '2024-11-10T14:00:00Z',
      imageUrl: 'https://example.com/cooking-workshop.jpg', // URL to an image
    },
    user: {
      _id: 'user1',
      name: 'John Doe',
    },
    totalAmount: 75,
    paymentStatus: 'Paid',
    numberOfTickets: 2,
    bookingDate: '2024-10-09T10:00:00Z',
    rating: 5,
    comment: 'Amazing experience!',
  },
  {
    _id: '5',
    event: {
      _id: 'event5',
      title: 'Movie Night',
      description: 'Watch the latest blockbuster under the stars.',
      category: 'Cinema',
      location: 'Outdoor Theater',
      date: '2024-09-25T20:00:00Z',
      imageUrl: 'https://example.com/movie-night.jpg', // URL to an image
    },
    user: {
      _id: 'user2',
      name: 'Jane Smith',
    },
    totalAmount: 20,
    paymentStatus: 'Paid',
    numberOfTickets: 4,
    bookingDate: '2024-10-14T12:00:00Z',
    rating: null,
    comment: '',
  },
];


const MyEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Replace the mock data with your actual fetch call
        // const response = await fetch('/api/bookings'); 
        // const data = await response.json();
        setBookings(mockBookings);
      } catch (error) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const today = new Date();
  const bookedEvents = bookings.filter((booking) => isBefore(today, new Date(booking.event.date)));
  const visitedEvents = bookings.filter((booking) => isBefore(new Date(booking.event.date), today));

  const openModal = (booking) => {
    setSelectedEvent(booking);
    setRating(booking.rating || 0);
    setComment(booking.comment || '');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const submitReview = () => {
    const updatedBookings = bookings.map((booking) =>
      booking._id === selectedEvent._id
        ? { ...booking, rating, comment }
        : booking
    );
    setBookings(updatedBookings);
    setModalIsOpen(false);
  };

  return (
    <div className="p-4 bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <h2 className="text-2xl font-bold mb-4">My Booked Events</h2>

      {/* Booked Events Section */}
      {bookedEvents.length === 0 ? (
        <p className="text-gray-600">You have no upcoming bookings.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedEvents.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
              <img
                src={booking.event.imageUrl}
                alt={booking.event.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <div className="flex flex-col flex-grow justify-between">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.event.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{booking.event.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="text-gray-700"><strong>Category:</strong> {booking.event.category}</span>
                    <span className="text-gray-700"><strong>Location:</strong> {booking.event.location}</span>
                    <span className="text-gray-700"><strong>Date:</strong> {format(new Date(booking.event.date), 'PP')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-700"><strong>Tickets:</strong> {booking.numberOfTickets}</span>
                    <span className="text-gray-700 block"><strong>Total:</strong> ${booking.totalAmount}</span>
                    <span className="text-gray-700 block"><strong>Paid:</strong> {booking.paymentStatus}</span>
                  </div>
                </div>
              </div>

              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full"
                
              >
                View Event
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Visited Events Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Visited Events</h2>
      {visitedEvents.length === 0 ? (
        <p className="text-gray-600">You have no past events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visitedEvents.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={booking.event.imageUrl}
                alt={booking.event.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900">{booking.event.title}</h3>
              <p className="text-gray-700"><strong>Category:</strong> {booking.event.category}</p>
              <p className="text-gray-700"><strong>Location:</strong> {booking.event.location}</p>
              <p className="text-gray-700"><strong>Date:</strong> {format(new Date(booking.event.date), 'PP')}</p>
              <p className="text-gray-700"><strong>Tickets Booked:</strong> {booking.numberOfTickets}</p>
              <p className="text-gray-700"><strong>Total Amount:</strong> ${booking.totalAmount}</p>

              {/* Display the star rating */}
              <div className="flex">
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <FaStar
                      key={index}
                      className={index < booking.rating ? 'text-yellow-500' : 'text-gray-400'}
                    />
                  ))}
              </div>

              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => openModal(booking)}
              >
                {booking.rating ? 'Update Review' : 'Review Event'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedEvent && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Review Modal">
          <h2 className="text-xl font-bold mb-4">Review {selectedEvent.event.title}</h2>
          <div className="flex mb-4">
            {Array(5)
              .fill()
              .map((_, index) => (
                <FaStar
                  key={index}
                  className={index < rating ? 'text-yellow-500' : 'text-gray-400'}
                  onClick={() => handleRating(index + 1)}
                />
              ))}
          </div>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="4"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={submitReview}
            >
              Submit
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyEvents;
