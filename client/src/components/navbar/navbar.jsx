import React from 'react'
import './navbar.css'
const navbar = () => {
    return (
        <>
            <div className="nav-center">
                <nav>
                    <div className=" nav-item home">Home</div>
                    <div className=" nav-item contact-us">Contact Us </div>
                    <div className=" nav-item gallery">Gallery</div>
                    <div className=" nav-item About-us">About Us </div>
                    <div className=" nav-item nav-btn"><button>Login</button></div>
                </nav>

                <div className="cart-img">
                    <img src="src/assets/cart.png" alt="cart" width={50} />
                </div>
            </div>

        </>
    )
}

export default navbar
