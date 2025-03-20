import React from 'react';
import './navbar.css';

const Navbar = () => {
    const userName = localStorage.getItem("username"); // Check if user is logged in

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem("username");
            window.location.reload();
        }
    };

    return (
        <>
            <div className="nav-center">
                <nav>
                    <div className="nav-item home">Home</div>
                    <div className="nav-item contact-us">Contact Us</div>
                    <div className="nav-item gallery">Gallery</div>
                    <div className="nav-item about-us">About Us</div>

                    <div className="nav-item nav-btn">
                        {userName ? (
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        ) : (
                            <a href="/login"><button className="login-btn">Login</button></a>

                        )}
                    </div>
                </nav>

                <div className="cart-img">
                    <a href="/user/cart">
                        <img src="src/assets/cart.png" alt="cart" width={50} />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
