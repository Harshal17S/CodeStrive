// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart, onDecreaseQuantity, totalCoins, onPay }) => {
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const totalCost = calculateTotal(cartItems);

  const handlePayment = () => {
    if (totalCost > totalCoins) {
      alert("You do not have enough coins to place this order.");
    } else {
      onPay(totalCost);
      alert("Order placed successfully!");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cart</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '10px' }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} style={{
              flex: '1 0 21%', minWidth: '150px', padding: '10px',
              border: '1px solid #ccc', margin: '5px', borderRadius: '5px', background: '#f9f9f9'
            }}>
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
              <button onClick={() => onDecreaseQuantity(item.id)}>-</button>
              <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <h3>Total: ${totalCost.toFixed(2)}</h3>
      <button onClick={handlePayment} disabled={cartItems.length === 0}>Pay</button>
    </div>
  );
};

export default Cart;
