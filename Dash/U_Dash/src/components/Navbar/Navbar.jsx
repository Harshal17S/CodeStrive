import React from 'react';

const Navbar = ({ userPoints }) => {
    return (
        <nav style={{ 
            background: '#333', 
            color: 'white', 
            padding: '10px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
        }}>
            <h2>CodeStrive Shopping Store</h2>
            <h3>💰 Points: {userPoints}</h3> {/* ✅ Show user points */}
        </nav>
    );
};

export default Navbar;
