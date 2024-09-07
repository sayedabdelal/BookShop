import React, { useState } from 'react'
import './UserComponent.css'
import UserData from './UserData'

function UserComponent() {
    const [isCreatingUserData, setIsCreatingUserData] = useState(false);

    function handleChangeData() { 
        setIsCreatingUserData(true);
    }

    function handleDone() {
        console.log('exit');
        setIsCreatingUserData(false);
    }

    return (
        <>
            {isCreatingUserData && <UserData onDone={handleDone} />}
            <div className="contaainer">
                {/* User Info Section */}
                <div className="user-info-box">
                    <h2>User Information</h2>
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Email:</strong> john.doe@example.com</p>
                    <p><strong>Username:</strong> johndoe123</p>
                    <button className="btn update-btn" onClick={handleChangeData}>Update Data</button>
                </div>
                {/* Cart Section */}
                <div className="cart-box">
                    <h2>Your Cart</h2>
                    <div className="cart-item">
                        <p><strong>Product Name:</strong> Coffee Maker</p>
                        <p><strong>Price:</strong> $99.99</p>
                        <div className="cart-actions">
                            <button className="btn update-btn">Update</button>
                            <button className="btn delete-btn">Delete</button>
                        </div>
                    </div>
                    <div className="cart-item">
                        <p><strong>Product Name:</strong> Coffee Beans</p>
                        <p><strong>Price:</strong> $15.99</p>
                        <div className="cart-actions">
                            <button className="btn update-btn">Update</button>
                            <button className="btn delete-btn">Delete</button>
                        </div>
                    </div>
                </div>
                {/* Favorite Products Section */}
                <div className="favorites-box">
                    <h2>Favorite Products</h2>
                    <div className="favorite-item">
                        <p><strong>Product Name:</strong> Espresso Machine</p>
                        <button className="btn love-btn">❤️ Remove from Favorites</button>
                    </div>
                    <div className="favorite-item">
                        <p><strong>Product Name:</strong> French Press</p>
                        <button className="btn love-btn">❤️ Remove from Favorites</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserComponent;