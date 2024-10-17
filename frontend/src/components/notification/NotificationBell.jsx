import React, { useContext, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import Modal from 'react-modal';
import { NotificationContext } from '../../contexts/NotificationContext';
import { axiosInstance } from '../../services/BaseUrl';

const NotificationBell = () => {
  const { rsvpNotifications, loading, error, fetchNotifications, setRsvpNotifications } = useContext(NotificationContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const openModal = () => {
    setModalIsOpen(true);
    fetchNotifications(); // Fetch notifications when opening the modal
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRSVP = async (eventId, confirmation) => {
    try {
      await axiosInstance.post('/bookings/rsvp', { // Corrected line
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
    console.log(`RSVP confirmed for event ID: ${eventId}`);
    // Optional close modal after RSVP
  };

  const handleDecline = (eventId, confirmation) => {
    console.log(`RSVP declined for event ID: ${eventId}`);
    closeModal(); // Optionally close modal after declining
  };

  return (
    <>
      <div className="relative cursor-pointer" onClick={openModal}>
        <FaBell className="text-2xl text-gray-600" />
        {rsvpNotifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
            {rsvpNotifications.length}
          </span>
        )}
      </div>

      {/* RSVP Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">RSVP Notifications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : rsvpNotifications.length === 0 ? (
          <p>No pending RSVPs.</p>
        ) : (
          rsvpNotifications.map((rsvp) => (
            <div key={rsvp.event._id} className="mb-4">
              <p className="text-lg font-bold">{rsvp.event.title}</p>
              <p className="text-sm text-gray-600">Date: {new Date(rsvp.event.date).toLocaleDateString()}</p>
              <p>Are you attending this event?</p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleRSVP(rsvp.event._id, true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleDecline(rsvp.event._id, false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  No
                </button>
              </div>
            </div>
          ))
        )}
      </Modal>
    </>
  );
};

export default NotificationBell;
