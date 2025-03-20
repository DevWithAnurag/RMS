import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            // Store username in local storage
            localStorage.setItem("username", res.data.user.username);
            console.log("Login successful, Username:", res.data.user.username);
            alert("Login successful!");

            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Check your email and password.");
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="heading">
                    <h2>Login</h2>
                </div>
                <div className="email-container">
                    <label htmlFor="email">Enter Your Email</label>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
                </div>
                <div className="password-container">
                    <label htmlFor="password">Enter Your Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                </div>
                <div className="btn">
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    );
};

export default Login;
