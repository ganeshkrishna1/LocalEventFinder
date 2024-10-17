import React, { useState, useEffect, useContext } from "react";
import EventCard from "../../components/event/EventCard";
import { UserContext } from "../../contexts/UserContext";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/BaseUrl";
import { Config } from "../../services/Config";

const EventScreen = () => {
  const [events, setEvents] = useState([]); // Store all events
  const [filteredEvents, setFilteredEvents] = useState([]); // Store filtered events
  const [filterCategory, setFilterCategory] = useState(""); // Current filter
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await axiosInstance.get("/events");

        const today = new Date();
        
        // Filter events to show only future or present events
        const futureEvents = res.data.filter(event => new Date(event.date) >= today);
        
        setEvents(futureEvents); // Set both events and filteredEvents initially
        setFilteredEvents(futureEvents);
      } catch (err) {
        console.log(err);
      }
    };
    getAllEvents(); // Only call this once when the component mounts
  }, []);

  // Handle filtering based on category
  const handleFilterChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);

    if (category === "") {
      setFilteredEvents(events); // Show all future events when no filter is selected
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered); // Update filtered events based on category
    }
  };

  // Delete event handler
  const handleDeleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(`/events/${eventId}`, Config());
      // Remove the event from the events state
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      setFilteredEvents((prevFilteredEvents) =>
        prevFilteredEvents.filter((event) => event._id !== eventId)
      );
      console.log("Event deleted successfully");
    } catch (err) {
      console.log("Error deleting event:", err);
    }
  };

  const handleAddEvent = () => {
    navigate("/addEvent");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="container mx-auto">
        {/* Filter Dropdown */}
        <div className="flex justify-around mb-8">
          {user && user.isAdmin && (
            <div
              onClick={handleAddEvent}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <IoIosAddCircle className="text-4xl" />
              <span>Add Event</span>
            </div>
          )}

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
        <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDeleteEvent} // Pass delete handler to EventCard
            />
          ))}
        </div>
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
