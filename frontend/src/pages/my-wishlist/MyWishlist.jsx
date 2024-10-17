import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import { format, isValid } from 'date-fns';

function MyWishlist() {
  const [wishlistedEvents, setWishlistedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/wishlist/user/${user._id}`);
          console.log("Wishlist data:", response.data); // Log the fetched wishlist data
          setWishlistedEvents(response.data);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Handle case where user is not logged in
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300 p-4'>
      <h2 className="text-3xl font-bold text-center mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistedEvents.length > 0 ? (
          wishlistedEvents.map((wishlistItem) => (
            <div key={wishlistItem._id} className="flex flex-col bg-white p-4 rounded-lg shadow">
              <img
                src={wishlistItem.event.imageUrl || "https://via.placeholder.com/400x300"}
                alt={wishlistItem.event.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900">{wishlistItem.event.title}</h3>
              <p className="text-gray-700">
                <strong>Category:</strong> {wishlistItem.event.category}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {wishlistItem.event.location}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {isValid(new Date(wishlistItem.event.date)) ? format(new Date(wishlistItem.event.date), 'PP') : 'Invalid date'}
              </p>
              
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">No events in your wishlist.</p>
        )}
      </div>
    </div>
  );
}

export default MyWishlist;
