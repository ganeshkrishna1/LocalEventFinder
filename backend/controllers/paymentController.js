import Stripe from 'stripe';

// Replace 'your-stripe-secret-key' with your actual Stripe secret key
const stripe = new Stripe('sk_test_51Q9klwP55WWgq7Omzvp5GyfGoKoErRLQzs43EHLFQBu9Kof1UV5knnwxe4tlIyzj0qg6p3SJyQTska46qOTcd5AC00mpxpLpdJ');

export const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (e.g., 1000 = $10)
      currency, // Currency, e.g., 'usd'
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};
