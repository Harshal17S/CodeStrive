import React from 'react';

const Product = ({ product, image, onAddToCart }) => {
  return (
    <div style={{
      flex: '1 0 21%',
      minWidth: '350px',
      padding: '10px',
      border: '1px solid #ccc',
      margin: '5px',
      borderRadius: '5px',
      background: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around', // Ensures space distribution
    
    }}>
      {/* Image Section */}
      <img 
        src={image || product.image}  // Uses `image` prop if provided, otherwise falls back to `product.image`
        alt={product.name} 
        style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '5px' }} 
      />
      
      <h4>{product.name}</h4>
      <p>Price: ${product.price.toFixed(2)}</p>

      <button onClick={() => onAddToCart(product)} style={{
        padding: '8px 16px',
        borderRadius: '4px',
        background: 'blue',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      }}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
