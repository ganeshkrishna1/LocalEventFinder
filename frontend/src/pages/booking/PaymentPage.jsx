import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load the Stripe publishable key
const stripePromise = loadStripe('pk_test_51Q9klwP55WWgq7OmEsGbXvuiHM1TRpFn7tQsIlO6HvnPpxyqa9DjEilJQcmdJBBeled9XA398T6ajlRUgMueKMBj00Herl3wg0');

// Component for the payment form
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Get payment intent from backend
    const { data: { clientSecret } } = await axios.post('http://localhost:5000/api/payments/create-payment-intent', {
      amount: 2000, // The amount in cents (e.g., 2000 = $20)
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
    } else if (result.paymentIntent.status === 'succeeded') {
      setMessage('Payment succeeded!');
    }

    setIsLoading(false);
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

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="max-w-md w-full p-5 border border-gray-300 rounded-md bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center mb-5">Complete Your Payment</h2>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
};

export default PaymentPage;
