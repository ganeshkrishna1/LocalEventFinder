import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const BookingForm = ({ event }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create payment intent on your backend
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: event.id,
        numberOfTickets,
      }),
    });

    const { clientSecret, totalAmount } = await response.json();

    // Confirm payment with Stripe
    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        // Send booking details to your backend
        await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: event.id,
            numberOfTickets,
            totalAmount,
          }),
        });
        alert('Booking successful!');
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleBooking} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Book Tickets</h2>
      <div>
        <label htmlFor="tickets" className="block mb-2">Number of Tickets</label>
        <input
          type="number"
          id="tickets"
          value={numberOfTickets}
          onChange={(e) => setNumberOfTickets(e.target.value)}
          min="1"
          className="border p-2 rounded w-full"
        />
      </div>
      <CardElement className="my-4 border p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`bg-blue-600 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Processing...' : 'Book Now'}
      </button>
    </form>
  );
};

export default BookingForm;
