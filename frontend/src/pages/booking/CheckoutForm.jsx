import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ bookingId, totalCost, setError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Get payment intent from backend
      const { data: { clientSecret } } = await axios.post('http://localhost:5000/api/payments/create-payment-intent', {
        amount: totalCost * 100, // Convert to cents
        currency: 'usd', // Currency code (e.g., 'usd')
      });

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
        setError(result.error.message); // Pass error to parent component
      } else if (result.paymentIntent.status === 'succeeded') {
        setMessage('Payment succeeded!');

        // Update the booking status to 'Paid'
        await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
          paymentStatus: 'Paid', // Update payment status
        });

        // Optionally navigate to a confirmation page
        window.location.href = '/confirmation'; // Redirect to confirmation page
      }
    } catch (error) {
      console.error(error);
      setMessage('Payment failed. Please try again.');
      setError('Payment failed. Please try again.'); // Pass error to parent component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <button disabled={isLoading} className="bg-blue-500 text-white p-2 rounded mt-4" type="submit">
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <div className="text-red-500 mt-2">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
