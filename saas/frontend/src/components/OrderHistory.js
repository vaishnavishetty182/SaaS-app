import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      // Fetch order history from the backend
      const orderData = await userService.getOrders(); // Assuming an API function is available
      setOrders(orderData);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Order History</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>{order.plan.name}</h3>
              <p>{order.status}</p>
              <p>Price: ${order.plan.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no previous orders.</p>
      )}
    </div>
  );
};

export default OrderHistory;
