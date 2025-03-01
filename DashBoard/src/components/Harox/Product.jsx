// src/components/Product.js
import React from 'react';

const Product = ({ product, onAddToCart }) => {
  return (
    <div style={{
      flex: '1 0 21%',
      minWidth: '150px',
      padding: '10px',
      border: '1px solid #ccc',
      margin: '5px',
      borderRadius: '5px',
      background: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around' // Ensures space distribution
    }}>
      <h4>{product.name}</h4>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)} style={{
        padding: '8px 16px',
        borderRadius: '4px',
        background: 'blue',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      }}>Add to Cart</button>
    </div>
  );
};

export default Product;
