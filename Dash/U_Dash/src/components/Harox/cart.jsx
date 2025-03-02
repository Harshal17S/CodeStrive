import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart, userPoints, onPay }) => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div style={{ padding: '20px', borderTop: '2px solid #000' }}>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>{item.name} - ${item.price.toFixed(2)} (x{item.quantity})</span>
                                
                                <button 
                                    onClick={() => onRemoveFromCart(item.id)} 
                                    style={{
                                        padding: '5px 10px',
                                        marginLeft: '10px',
                                        background: 'red',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h3>Total: ${totalAmount.toFixed(2)}</h3>

                    {/* ✅ Pay Button (Disabled if not enough points) */}
                    <button 
                        onClick={() => onPay(totalAmount)}
                        disabled={userPoints < totalAmount}
                        style={{
                            padding: '10px 20px',
                            background: userPoints >= totalAmount ? 'green' : 'gray',
                            color: 'white',
                            border: 'none',
                            cursor: userPoints >= totalAmount ? 'pointer' : 'not-allowed',
                            marginTop: '10px'
                        }}>
                        Pay
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
