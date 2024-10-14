import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Q9klwP55WWgq7Omzvp5GyfGoKoErRLQzs43EHLFQBu9Kof1UV5knnwxe4tlIyzj0qg6p3SJyQTska46qOTcd5AC00mpxpLpdJ'); // Replace with your actual secret key

export const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body; // Extract amount and currency from the request body

  try {
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret }); // Return the client secret
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating payment intent', error: error.message });
  }
};
