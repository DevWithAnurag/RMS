import React, { useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import './payment.css'
const Payment = () => {
    const location = useLocation();
    const amount = location.state?.amount || 0;
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const handlePayment = async () => {
        try {
            const orderData = {
                amount: amount * 100,
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
                notes: {
                    username: localStorage.getItem("username"),
                    items: cart.map(item => ({
                        itemId: item.itemId,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                },
            };

            const { data } = await axios.post("http://localhost:5000/api/payment/create-order", orderData);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "RMS Project",
                description: "Your are in testing phase",
                order_id: data.id,
                contact: "3459837455",
                payment_capture: 1,
                handler: async (response) => {
                    await axios.post("http://localhost:5000/api/payment/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });
                    alert("Payment Successful and Verified!");
                    navigate("/")
                },
                prefill: {
                    name: localStorage.getItem("username") || "Guest",
                    email: localStorage.getItem("email") || "user@example.com",
                    contact: localStorage.getItem("contact") || "0000000000",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment initiation failed:", error.response?.data || error.message);
        }

    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="heading">
                    <h2>Pay Via Razorpay</h2>
                </div>
                <div className="amount">
                    <h3>Total Amount: <span>₹{amount}</span></h3>
                </div>
                <div className="btn">
                    <button onClick={handlePayment}>Pay with Razorpay</button>
                </div>
            </div>
        </div>
    );
};

export default Payment;