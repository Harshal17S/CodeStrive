// src/components/Item.js
import React from 'react';

const Item = ({ item, onAddToCart }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>${item.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default Item;
