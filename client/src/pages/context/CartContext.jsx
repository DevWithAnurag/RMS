import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // ✅ Import AuthContext

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useContext(AuthContext);
    const userName = localStorage.getItem("username"); // ✅ Fetch username from localStorage


    //fetching cart Item
    const fetchCart = async () => {
        try {
            const username = localStorage.getItem("username"); // ✅ Fetch ObjectId
            console.log("Fetching cart for username:", username);

            const response = await axios.get(`http://localhost:5000/api/cart/${username}`);
            setCart(response.data.items || []);
        } catch (error) {
            console.error("Error fetching cart:", error.response?.data || error);
        }
    };

    //  Fetch cart when `userName` changes
    useEffect(() => {
        fetchCart();
    }, [userName]);

    //  Add Item to Cart
    const addToCart = async (item) => {
        try {
            const username = localStorage.getItem("username");
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
                    image: item.image, // ✅ Ensure image is sent
                },
            });
            setCart(response.data.items);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
