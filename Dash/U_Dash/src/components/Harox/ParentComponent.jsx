// src/components/ParentComponent.js
import React, { useState } from 'react';
import Cart from './cart';
import Product from './Product'; // Import the new Product component

const ParentComponent = () => {
    const [cartItems, setCartItems] = useState([]);

    // Sample product data
    const products = [
        { id: 1, name: "Apple", price: 1.99 },
        { id: 2, name: "Banana", price: 0.99 },
        { id: 3, name: "Orange", price: 1.29 },
        { id: 4, name: "Mango", price: 1.49 }
    ];

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                padding: '20px'
            }}>
                {products.map(product => (
                    <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
            <Cart cartItems={cartItems} />
        </div>
    );
};

export default ParentComponent;
