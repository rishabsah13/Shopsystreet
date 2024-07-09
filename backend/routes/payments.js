const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51MH45uSCnhOlwfSWQhGrCEmDqMFztFUWtwRJalVSWHQxyDLOju6uRlILmnxfOuDXsYf68jY2yPVTkUzHqKDr37B500zSn7vQ58');
const Order = require('../models/Order');

router.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  const amount = items.reduce((total, item) => total + item.price, 0);
  const amountInCents = Math.round(amount * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'inr', 
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

router.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    if (paymentIntent.status === 'succeeded') {
      await Order.update({ status: 'Paid' }, { where: { id: orderId } });
      res.json({ message: 'Payment successful' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

module.exports = router;

