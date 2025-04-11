import React, { useState } from 'react';

const Cart = ({ 
  cartItems: externalCartItems = [], 
  removeFromCart: externalRemoveFromCart,
  proceedToCheckout: externalProceedToCheckout,
  availablePlans = [],
  onCheckout 
}) => {
  // Internal state management if not controlled from parent
  const [internalCartItems, setInternalCartItems] = useState([]);
  const isControlled = externalCartItems.length > 0 || externalRemoveFromCart;
  
  // Determine which cart items and functions to use
  const cartItems = isControlled ? externalCartItems : internalCartItems;
  const removeFromCart = isControlled ? externalRemoveFromCart : (itemId) => {
    setInternalCartItems(internalCartItems.filter(item => item._id !== itemId));
  };
  const proceedToCheckout = isControlled ? externalProceedToCheckout : () => {
    if (cartItems.length > 0) {
      if (onCheckout) {
        onCheckout(cartItems);
      }
      if (!isControlled) {
        setInternalCartItems([]);
      }
    }
  };

  // Add item to cart (only available in standalone mode)
  const addToCart = (plan) => {
    if (!isControlled) {
      setInternalCartItems([...internalCartItems, plan]);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    if (!isControlled) {
      setInternalCartItems([]);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (typeof item.price === 'string' ? 
      parseFloat(item.price.replace('$', '')) : item.price), 0).toFixed(2);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>Your Cart</h2>

      {/* Cart contents */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={item._id || index} style={{ 
                margin: '10px 0', 
                padding: '10px',
                border: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                  {item.description && <p style={{ margin: '0 0 5px 0' }}>{item.description}</p>}
                  <p style={{ margin: '0 0 5px 0' }}>Price: ${typeof item.price === 'string' ? 
                    item.price : item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(isControlled ? index : item._id)}
                  style={{ 
                    marginLeft: '10px', 
                    padding: '5px 10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none'
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '20px' }}>
            <h3>Total: ${calculateTotal()}</h3>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            {!isControlled && (
              <button 
                onClick={clearCart}
                style={{ 
                  padding: '10px',
                  backgroundColor: '#ffbb33',
                  color: 'white',
                  border: 'none'
                }}
              >
                Clear Cart
              </button>
            )}
            <button 
              onClick={proceedToCheckout}
              style={{ 
                padding: '10px',
                backgroundColor: '#00C851',
                color: 'white',
                border: 'none'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* Available plans selection (only in standalone mode) */}
      {!isControlled && availablePlans.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Available Plans</h3>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '15px',
            marginTop: '15px'
          }}>
            {availablePlans.map(plan => (
              <div key={plan._id} style={{ 
                border: '1px solid #ddd',
                padding: '15px',
                borderRadius: '5px'
              }}>
                <h4 style={{ margin: '0 0 10px 0' }}>{plan.name}</h4>
                {plan.description && <p style={{ margin: '0 0 10px 0' }}>{plan.description}</p>}
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                  ${typeof plan.price === 'string' ? plan.price : plan.price.toFixed(2)}
                </p>
                <button 
                  onClick={() => addToCart(plan)}
                  style={{ 
                    padding: '8px 15px',
                    backgroundColor: '#33b5e5',
                    color: 'white',
                    border: 'none',
                    width: '100%'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;