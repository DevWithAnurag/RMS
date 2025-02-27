import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenuList from './AdminMenuList'
const AdminAddMenu = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [readyTime, setReadyTime] = useState("");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [menuItems, setMenuItems] = useState([]);


    const fetchMenuItems = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/menu");
            setMenuItems(res.data);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.post(
                "http://localhost:5000/api/menu/add",
                { name, price: Number(price), readyTime: Number(readyTime), image },
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );
            fetchMenuItems();
            setMessage("Menu item added successfully!");
            setName("");
            setPrice("");
            setReadyTime("");
            setImage("");
        } catch (error) {
            fetchMenuItems();
            setMessage("Error adding menu item.");
            console.error(error);
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
        <>
            <div className="add-menu">
                <h2>Add Menu Item</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name of the item"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    /><br />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    /><br />
                    <input
                        type="number"
                        placeholder="Ready Time (in minutes)"
                        value={readyTime}
                        onChange={(e) => setReadyTime(e.target.value)}
                        required
                    /><br />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    /><br />
                    <button type="submit">Add Menu Item</button>
                </form>

            </div>

            <div className="show-Menu">
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
                            <p>Price: Rs. {item.price}</p>
                            <p>Ready in: {item.readyTime} minutes</p>
                        </div>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </>

    );
};

export default AdminAddMenu;
