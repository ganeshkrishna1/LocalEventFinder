import React, { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { format, isBefore } from 'date-fns';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import { axiosInstance } from '../../services/BaseUrl';
import {config} from '../../services/EventService'

// Set the app element for react-modal
Modal.setAppElement('#root'); // Change '#root' to the appropriate selector for your main app element

const MyEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchBookingsWithReviews = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));

        // Optimized API call to fetch bookings and reviews together
        const response = await axiosInstance.get(`/bookings/bookings-reviews/user/${user._id}`);
        
        // Extract bookings and reviews from the response
        const { bookings, reviews } = response.data;

        setBookings(bookings);

        // Map reviews by event ID
        const reviewsData = {};
        reviews.forEach(review => {
          reviewsData[review.event] = review;
        });
        setReviews(reviewsData);
      } catch (error) {
        setError('Error fetching bookings and reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsWithReviews();
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

  const submitReview = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));

        // Post the review to the API
        await axiosInstance.post('/reviews', {
            user: user._id,
            event: selectedEvent.event._id,
            rating,
            comment,
        }, config);

        // Update the bookings and reviews state
        const updatedBookings = bookings.map((booking) =>
            booking._id === selectedEvent._id ? { ...booking, rating, comment } : booking
        );

        // Update the reviews state to include the new review
        setReviews((prevReviews) => ({
            ...prevReviews,
            [selectedEvent.event._id]: { rating, comment }, // add or update the review for the specific event
        }));

        setBookings(updatedBookings);
        setModalIsOpen(false);
    } catch (error) {
        console.error('Error submitting review:', error);
    }
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
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={booking.event.imageUrl}
                alt={booking.event.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900">{booking.event.title}</h3>
              <p className="text-gray-700">
                <strong>Category:</strong> {booking.event.category}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {booking.event.location}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {format(new Date(booking.event.date), 'PP')}
              </p>
              <p className="text-gray-700">
                <strong>Tickets Booked:</strong> {booking.numberOfTickets}
              </p>
              <p className="text-gray-700">
                <strong>Total Amount:</strong> ${booking.totalAmount}
              </p>
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
          {visitedEvents.map((booking) => {
            const hasReviewed = !!reviews[booking.event._id]; // Check if review exists
            return (
              <div key={booking._id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={booking.event.imageUrl}
                  alt={booking.event.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{booking.event.title}</h3>
                <p className="text-gray-700">
                  <strong>Category:</strong> {booking.event.category}
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> {booking.event.location}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {format(new Date(booking.event.date), 'PP')}
                </p>
                <p className="text-gray-700">
                  <strong>Tickets Booked:</strong> {booking.numberOfTickets}
                </p>
                <p className="text-gray-700">
                  <strong>Total Amount:</strong> ${booking.totalAmount}
                </p>

                {/* Display the star rating */}
                <div className="flex">
                  {Array(5)
                    .fill()
                    .map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < (reviews[booking.event._id]?.rating || 0) ? 'text-yellow-500' : 'text-gray-400'}
                      />
                    ))}
                </div>

                {/* Conditionally render button */}
                <button
                  className={`mt-4 text-white px-4 py-2 rounded ${
                    hasReviewed
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={() => openModal(booking)}
                  disabled={hasReviewed}
                >
                  {hasReviewed ? 'Review Submitted' : 'Submit Review'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Submit Review for {selectedEvent?.event.title}</h2>
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
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={submitReview}
          >
            Submit Review
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-600"
            onClick={closeModal}
          >
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
};

export default MyEvents;
