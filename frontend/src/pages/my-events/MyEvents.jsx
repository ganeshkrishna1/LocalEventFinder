import React, { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { format, isBefore } from 'date-fns';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from 'axios'; // Import axios to make API requests

const MyEvents = () => {
  const [bookings, setBookings] = useState([]); // Initialize bookings as an array
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
        const user = JSON.parse(localStorage.getItem('user')); // Get user ID from localStorage
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${user._id}`); // Fetch bookings by user ID from API

        setBookings(response.data); // Set the actual bookings data from the API response
      } catch (error) {
        setError('Error fetching bookings'); // Handle error
      } finally {
        setLoading(false); // Turn off loading
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
    <div className="p-4 bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300 min-h-screen">
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
                className={`mt-4 text-white px-4 py-2 rounded ${booking.rating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                  }`}
                onClick={() => openModal(booking)}
                disabled={!!booking.rating} // Disable the button if a review is submitted
              >
                {booking.rating ? 'Review Submitted' : 'Review Event'}
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
