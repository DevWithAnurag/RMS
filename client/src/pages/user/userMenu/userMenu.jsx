import React, { useEffect, useState } from "react";
import axios from "axios";
import './UserMenu.css'
const UserMenu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/menu");
                setMenuItems(res.data);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };
        fetchMenu();
    }, []);

    const handleOrder = (item) => {
        alert(`Ordering ${item.name}`);
    };

    const handleAddToCart = (item) => {
        alert(`${item.name} added to cart`);
    };

    return (
        <div>
            <h2>Our Menu</h2>
            <div className="UserMenu-con">
                {menuItems.map((item) => (
                    <div
                        key={item._id}
                        className="userMenu-item"
                    >
                        <div className="img">
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: "311px",
                                    height: "203px",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                        <h3>{item.name}</h3>
                        <p>Price: ₹ {item.price} /-Only </p>
                        <p>Ready in: {item.readyTime} minutes</p>
                        <div className="btn">
                            <button onClick={() => handleOrder(item)}>Order Now</button>
                            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserMenu;
