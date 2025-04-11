import React, { useState } from 'react';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    // Call the checkout API and process the order
    alert('Checkout completed!');
  };

  return (
    <form onSubmit={handleCheckout}>
      <h2>Checkout</h2>
      <label>
        Shipping Address:
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </label>
      <label>
        Payment Details:
        <input
          type="text"
          value={paymentDetails}
          onChange={(e) => setPaymentDetails(e.target.value)}
          required
        />
      </label>
      <button type="submit">Complete Checkout</button>
    </form>
  );
};

export default Checkout;
