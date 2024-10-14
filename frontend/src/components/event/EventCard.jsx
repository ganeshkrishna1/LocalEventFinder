import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const EventCard = ({ event, onDelete }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEditEvent = () => {
    navigate(`/editEvent/${event._id}`); // Navigate to edit page
  };

  const handleViewEvent = () =>{
    navigate(`/event/${event._id}`);
  }

  return (
    <div
      className="max-w-sm mx-auto bg-white border border-gray-300 rounded-lg shadow overflow-hidden flex flex-col h-full"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <img
        onClick={() => navigate(`/event/${event._id}`)}
        className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
        src={
          event.imageUrl
            ? event.imageUrl
            : "https://via.placeholder.com/400x200"
        }
        alt="Event Image"
      />

      {/* Card Content */}
      <div className="p-5 flex-grow overflow-hidden">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
          {event.title}
        </h5>
        <p className="mb-3 font-normal text-gray-800">
          <strong>Category:</strong> {event.category}
        </p>
        <p className="mb-3 font-normal text-gray-800">
          <strong>Description:</strong> {event.description || "No description available"}
        </p>
        <p className="mb-3 font-normal text-gray-800">
          <strong>Price:</strong> ${event.price}
        </p>
      </div>

      {/* Admin Controls */}
      {user && user.isAdmin ? (
        <div className="flex justify-end gap-4 items-center p-4">
          <FaRegEdit 
            className="text-5xl text-orange-500 p-2 cursor-pointer"
            onClick={handleEditEvent}
          />
          <MdDelete 
            className="text-5xl text-red-700 p-2 cursor-pointer"
            onClick={() => onDelete(event._id)} // Use the delete handler passed from EventScreen
          />
        </div>
      ) : (
        <div className="bottom-4 left-4 right-4 p-4">
          <button
          onClick={handleViewEvent}
            className="block w-full bg-blue-700 text-white text-center py-3 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            View
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
