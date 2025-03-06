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
                    <div className=" nav-item nav-btn"><a href="/login"><button>Login</button></a></div>
                </nav>

                <div className="cart-img">
                    <a href="/user/cart">  <img src="src/assets/cart.png" alt="cart" width={50} /></a>
                </div>
            </div>

        </>
    )
}

export default navbar
