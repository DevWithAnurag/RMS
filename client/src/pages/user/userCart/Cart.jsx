import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import './cart.css'
const Cart = () => {
    const { cart, fetchCart, deleteFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    // Calculate total price
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <div className="cart-container-main">
            <div className="heading"><h2>YOUR CART</h2></div>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-container">
                    <div className="cart-item">
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {cart.map((item) => (
                                <li key={item.itemId} >

                                    <div className="cart-card">
                                        <div className="cart-content">
                                            <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                                            <div>
                                                <p style={{ margin: "0", fontWeight: "bold" }}>{item.name}</p>
                                                <p style={{ margin: "0", color: "gray" }}>₹{item.price} (Qty: {item.quantity})</p>
                                            </div>
                                        </div>

                                        <div className="btn">
                                            <button
                                                onClick={() => deleteFromCart(item.itemId)}
                                                style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="payment-container-cart">
                        {/* Total Price */}
                        <div className="total-amount">
                            <h3>Total Amount: ₹{totalAmount} </h3>
                        </div>

                        {/* Proceed to Payment Button */}
                        <button
                            onClick={() => navigate("/payment", { state: { amount: totalAmount } })}
                            style={{
                                backgroundColor: "#007bff",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginTop: "10px",
                            }}
                        >
                            Proceed to Payment
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Cart;
