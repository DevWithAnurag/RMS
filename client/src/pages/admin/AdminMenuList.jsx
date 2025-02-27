import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMenuList = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [message, setMessage] = useState("");

    const fetchMenuItems = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/menu");
            setMenuItems(res.data);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Get the token from localStorage
            const token = localStorage.getItem("adminToken");
            if (!token) {
                setMessage("No admin token found.");
                return;
            }

            // Include the Bearer prefix if your backend expects it
            await axios.delete(`http://localhost:5000/api/menu/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("Menu item deleted successfully!");
            fetchMenuItems();
        } catch (error) {
            console.error("Error deleting menu item:", error.response?.data || error.message);
            setMessage("Error deleting menu item: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <h2>Admin Menu List</h2>
            {message && <p>{message}</p>}
            {menuItems.map((item) => (
                <div
                    key={item._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        margin: "10px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <div>
                        <h3>{item.name}</h3>
                        <p>Price:  ₹ {item.price} /-Only</p>
                        <p>Ready in: {item.readyTime} minutes</p>
                    </div>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default AdminMenuList;
