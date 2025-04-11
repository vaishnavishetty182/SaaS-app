import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [plans] = useState([
    { 
      _id: '1',
      name: 'Basic Plan', 
      price: 19.99,
      description: 'Essential features for getting started',
      features: ['Feature A', 'Feature B']
    },
    { 
      _id: '2',
      name: 'Standard Plan', 
      price: 29.99,
      description: 'More advanced features for growing businesses',
      features: ['Feature A', 'Feature B', 'Feature C']
    },
    { 
      _id: '3',
      name: 'Premium Plan', 
      price: 49.99,
      description: 'Complete solution with all features',
      features: ['Feature A-Z', 'Priority Support']
    }
  ]);

  const [cartItems, setCartItems] = useState([]);

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') || 
                          localStorage.getItem('authToken');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  // Add item to cart
  const addToCart = (plan) => {
    setCartItems([...cartItems, plan]);
  };

  // Remove item from cart by index
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cartItems.length > 0) {
      alert(`Proceeding to checkout with ${cartItems.length} items`);
      clearCart();
    } else {
      alert('Your cart is empty');
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '30px',
        alignItems: 'flex-start'
      }}>
        {/* Cart Section - Left Sidebar */}
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          position: 'sticky',
          top: '20px'
        }}>
          <h2 style={{ marginBottom: '20px' }}>Your Cart</h2>
          <Cart 
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            proceedToCheckout={proceedToCheckout}
            clearCart={clearCart}
            total={calculateTotal()}
          />
        </div>

        {/* Plans Section - Main Content */}
        <div>
          <h2 style={{ marginBottom: '20px' }}>Available Plans</h2>
          
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {plans.map((plan) => (
              <li key={plan._id} style={{ 
                margin: '10px 0', 
                padding: '15px',
                border: '1px solid #eee',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{ fontSize: '18px' }}>{plan.name}</strong>
                  <p style={{ margin: '5px 0', color: '#666' }}>{plan.description}</p>
                  <div style={{ marginTop: '10px' }}>
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${plan.price}</span>
                </div>
                <button
                  onClick={() => addToCart(plan)}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;