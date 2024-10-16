import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from 'axios';

const NotificationBell = () => {
  const [rsvpNotifications, setRsvpNotifications] = useState([]); // Initialize as an empty array
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRsvpNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`/api/bookings/rsvp-notifications/${user._id}`);
        
        console.log('RSVP Response:', response.data); // Log the full response
  
        // Check if response contains pendingRsvps and log it
        const pendingRsvps = response.data.pendingRsvps || [];
        console.log('Pending RSVPs:', pendingRsvps); // Log the pending RSVPs
  
        // Ensure it sets an array
        setRsvpNotifications(pendingRsvps);
      } catch (error) {
        setError('Error fetching RSVP notifications');
        console.error('Fetch error:', error); // Log the error
      } finally {
        setLoading(false);
      }
    };
  
    fetchRsvpNotifications();
  }, []);
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRsvpConfirmation = async (eventId, confirmation) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      // Submit RSVP confirmation to the backend
      await axios.post(`/api/bookings/rsvp`, {
        user: user._id,
        event: eventId,
        rsvp: confirmation,
      });

      // Update the notifications state to remove the RSVP that was confirmed
      setRsvpNotifications((prev) => prev.filter((rsvp) => rsvp.event._id !== eventId));
      closeModal();
    } catch (error) {
      console.error('Error confirming RSVP:', error);
    }
  };

  return (
    <>
      <div className="relative cursor-pointer" onClick={openModal}>
        <FaBell className="text-2xl text-gray-600" />
        {/* Show notification badge only if there are RSVP notifications */}
        {rsvpNotifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
            {rsvpNotifications.length}
          </span>
        )}
      </div>

      {/* RSVP Modal */}
      {modalIsOpen && (
  <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
    <h2 className="text-xl font-bold mb-4">RSVP Notifications</h2>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : rsvpNotifications.length === 0 ? (
      <p>No pending RSVPs.</p>
    ) : (
      rsvpNotifications.map((rsvp) => (
        <div key={rsvp.event._id} className="mb-4">
          <p className="text-lg font-bold">{rsvp.event.title}</p>
          <p className="text-sm text-gray-600">Date: {new Date(rsvp.event.date).toLocaleDateString()}</p>
          <p>Would you like to RSVP for this event?</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
            onClick={() => handleRsvpConfirmation(rsvp.event._id, true)}
          >
            Yes, RSVP
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => handleRsvpConfirmation(rsvp.event._id, false)}
          >
            No, Cancel
          </button>
        </div>
      ))
    )}
  </Modal>
)}

    </>
  );
};

export default NotificationBell;
