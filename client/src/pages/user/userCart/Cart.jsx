import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
    const { cart, fetchCart } = useContext(CartContext);
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                            {item.name} - ₹{item.price} (Qty: {item.quantity})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
