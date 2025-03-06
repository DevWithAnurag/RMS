import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // ✅ Hook for navigation

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            // Store username in local storage
            localStorage.setItem("username", res.data.user.username);
            console.log("Login successful, Username:", res.data.user.username);
            alert("Login successful!");

            navigate("/menu");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Check your email and password.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
