import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import './UserMenu.css';


const UserMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const { addToCart } = useContext(CartContext);


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

    const handleAddToCart = (item) => {
        if (!addToCart) {
            console.error("addToCart is not defined");
            return;
        }
        addToCart(item);
        alert(`${item.name} added to cart`);
    };

    // Filter menu items based on search query
    const filteredMenu = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="UserMenu">
            <div className="header">

                <div className="heading">
                    <h1>OUR MENU</h1>
                </div>

                <div className="search-bar">
                    <img src="src\assets\search.png" alt=" Search Here" width={"20px"} />
                    <input
                        type="text"
                        placeholder="Search for a dish..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="clear-btn" onClick={() => setSearchQuery("")}>✖</button>
                    )}
                </div>

            </div>


            <div className="UserMenu-con">
                {filteredMenu.length > 0 ? (
                    filteredMenu.map((item) => (
                        <div key={item._id} className="userMenu-item">
                            <div className="img">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: "311px", height: "203px", objectFit: "cover" }}
                                />
                            </div>
                            <h3>{item.name}</h3>
                            <p>Price: ₹ {item.price} /-Only </p>
                            <p>Ready in: {item.readyTime} minutes</p>
                            <div className="btn">
                                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No matching dishes found...</p>
                )}
            </div>
        </div>
    );
};

export default UserMenu;
