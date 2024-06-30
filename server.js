const express = require('express');
const stripe = require('stripe')('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'); // Replace with your Stripe secret key
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Unlimited Usage Subscription',
          },
          unit_amount: 1999, // Amount in cents (e.g., $19.99)
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://daftplanet.github.io/youtubeseoapp/success.html', // Replace with your success URL
    cancel_url: 'https://daftplanet.github.io/youtubeseoapp/cancel.html', // Replace with your cancel URL
  });
  res.json({ id: session.id });
} catch (error) {
  console.error('Error creating checkout session:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

app.listen(4242, () => console.log('Server running on port 4242'));