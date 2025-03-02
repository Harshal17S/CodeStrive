// import React, { useState } from 'react';
// import Cart from './Cart';
// import Product from './Product';

// // Import local images correctly
// import bag from './bag.jpg';
// import cap from './Cap.jpg';
// import tshirt from './tshirt.jpg';
// import bottle from './bottle.jpg';

// const ParentComponent = () => {
//     const [cartItems, setCartItems] = useState([]);

//     // Sample product data
//     const products = [
//         { id: 1, name: "Bag", price: 1.99, image: cap },
//         { id: 2, name: "Bottle", price: 0.99, image: bottle }, 
//         { id: 3, name: "T-Shirt", price: 1.29, image: tshirt },
//         { id: 4, name: "Cap", price: 1.49, image: bag}
//     ];
    
//     const handleAddToCart = (product) => {
//         setCartItems(prevCartItems => {
//             const existingItem = prevCartItems.find(item => item.id === product.id);
//             if (existingItem) {
//                 return prevCartItems.map(item => 
//                     item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//                 );
//             } else {
//                 return [...prevCartItems, { ...product, quantity: 1 }];
//             }
//         });
//     };

//     // ✅ Function to Remove Item from Cart
//     const handleRemoveFromCart = (productId) => {
//         setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId));
//     };

//     return (
//         <div>
//             <div style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 justifyContent: 'space-around',
//                 padding: '100px'
//             }}>
//                 {products.map(product => (
//                     <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
//                 ))}
//             </div>
//             {/* ✅ Pass `handleRemoveFromCart` to Cart */}
//             <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
//         </div>
//     );
// };

// export default ParentComponent;
import React, { useState } from 'react';
import Cart from './Cart';
import Product from './Product';
import Navbar from '../Navbar/Navbar'; // Import Navbar

// Import local images correctly
import bag from './bag.jpg';
import cap from './Cap.jpg';
import tshirt from './tshirt.jpg';
import bottle from './bottle.jpg';

const ParentComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [userPoints, setUserPoints] = useState(100); // ✅ Track user points (initially 100)

    // Sample product data
    const products = [
        { id: 1, name: "Bag", price: 400, image: cap },
        { id: 2, name: "Bottle", price: 80, image: bottle }, 
        { id: 3, name: "T-Shirt", price: 220, image: tshirt },
        { id: 4, name: "Cap", price: 100, image: bag}
    ];
    
    const handleAddToCart = (product) => {
        setCartItems(prevCartItems => {
            const existingItem = prevCartItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevCartItems.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCartItems, { ...product, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId));
    };

    // ✅ Function to handle payment
    const handlePayment = (totalAmount) => {
        if (userPoints >= totalAmount) {
            setUserPoints(prevPoints => prevPoints - totalAmount); // Deduct points
            setCartItems([]); // Clear cart after payment
            alert("Your order is successful! 🎉");
        } else {
            alert("Not enough points! ❌");
        }
    };

    return (
        <div>
            {/* ✅ Pass userPoints to Navbar */}
            <Navbar userPoints={userPoints} />  

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                padding: '100px'
            }}>
                {products.map(product => (
                    <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>

            {/* ✅ Pass userPoints & handlePayment to Cart */}
            <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} userPoints={userPoints} onPay={handlePayment} />
        </div>
    );
};

export default ParentComponent;

