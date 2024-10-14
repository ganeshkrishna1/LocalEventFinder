import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {

  const navigate = useNavigate()
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-300 rounded-lg shadow overflow-hidden flex flex-col h-[500px]" style={{ backgroundColor: '#f3f4f6' }}>

      <img onClick={()=>navigate(`/event/${event._id}`)} className="rounded-t-lg w-full h-48 object-cover cursor-pointer" src={event.imgSource ? event.imgSource : "https://via.placeholder.com/400x200"} alt="Event Image" />
   
  
    {/* Card Content */}
    <div className="p-5 flex-grow overflow-hidden">
      
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
          {event.title}
        </h5>
      
  
      <p className="mb-3 font-normal text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
        <strong>Category:</strong> {event.category}
      </p>
      <p className="mb-3 font-normal text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
        <strong>Description:</strong> {event.description || 'No description available'}
      </p>
      <p className="mb-3 font-normal text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="mb-3 font-normal text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
        <strong>Location:</strong> {event.location}
      </p>
      <p className="mb-3 font-normal text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
        <strong>Tickets Available:</strong> {event.availableTickets}
      </p>
      <p className="mb-3 font-normal text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
        <strong>Price:</strong> ${event.price}
      </p>
    </div>
  
    {/* Card Button (Fixed at the bottom) */}
    <div className="p-4">
      <a href="" className="w-full inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        Book Now
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </a>
    </div>
  </div>
  


  );
};

export default EventCard;