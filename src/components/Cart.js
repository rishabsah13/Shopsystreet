import React ,{useState}from 'react';
import { loadStripe } from '@stripe/stripe-js';
import stripePromise from '../stripe'; // Path to your stripe.js or api.js
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import axios from '../api';

 const CheckoutForm = ({ toggleCart, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);

  const handleCheckout = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    try {
      const response = await axios.post('/api/payments/create-payment-intent', {
        amount: total * 100,
      });

      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        console.error('Payment failed:', result.error.message);
        setPaymentError(result.error.message);
      } else {
        console.log('Payment succeeded:', result.paymentIntent);
        toggleCart();
      }
    } catch (error) {
      console.error('Error during payment:', error.message);
      setPaymentError(error.message);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="mt-4">
      <CardElement className="p-2 border rounded-md" />
      {paymentError && <div className="text-red-500 mt-2">{paymentError}</div>}
      <button type="submit" disabled={!stripe} className="bg-blue-500 text-white p-2 rounded mt-4">
        Pay ₹{total.toFixed(2)}
      </button>
    </form>
  );
};

const Cart = ({ toggleCart, cart, total, resetCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        <ul className="mb-4">
          {cart.map((item, index) => (
            <li key={index} className="mb-2 flex justify-between">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
        <div className="mb-4">
          <h3 className="text-lg font-bold">Total: ₹{total.toFixed(2)}</h3>
        </div>
        <button 
          onClick={() => setShowCheckout(true)} 
          className="bg-green-500 text-white p-2 rounded mr-2">
          Checkout
        </button>
        <button 
          onClick={resetCart} 
          className="bg-red-500 text-white p-2 rounded mr-2">
          Reset
        </button>
        <button 
          onClick={toggleCart} 
          className="bg-gray-500 text-white p-2 rounded">
          Close
        </button>
        {showCheckout && (
          <Elements stripe={stripePromise}>
            <CheckoutForm toggleCart={toggleCart} total={total} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Cart;