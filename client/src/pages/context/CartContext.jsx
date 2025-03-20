import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useContext(AuthContext);

    // Fetch username from localStorage
    const getUsername = () => localStorage.getItem("username");

    // Fetch cart items
    const fetchCart = async () => {
        try {
            const username = getUsername();
            if (!username) return;

            const response = await axios.get(`http://localhost:5000/api/cart/${username}`);
            setCart(response.data.items || []);
        } catch (error) {
            console.error("Error fetching cart:", error.response?.data || error);
        }
    };

    // Add item to cart
    const addToCart = async (item) => {
        try {
            const username = getUsername();
            if (!username) {
                alert("Please login to add items to the cart");
                return;
            }

            const response = await axios.post(`http://localhost:5000/api/cart/`, {
                username,
                item: {
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    image: item.image,
                },
            });

            setCart(response.data.items);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Delete item from cart
    const deleteFromCart = async (itemId) => {
        try {
            const username = getUsername();
            if (!username) return;

            await axios.delete(`http://localhost:5000/api/cart/${username}/${itemId}`);
            setCart(cart.filter((item) => item.itemId !== itemId));
        } catch (error) {
            console.error("Error deleting item from cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    return (
        <CartContext.Provider value={{ cart, fetchCart, addToCart, deleteFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
