import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import './AdminLoing.css'

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // ✅ Use `login` from AuthContext

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/admin/login", { email, password });

            const { admin, token } = response.data; // ✅ Extract admin and token

            const adminData = {
                ...admin,
                role: "admin",
                adminToken: token, // ✅ Store admin token
            };

            login(adminData); // ✅ Store in AuthContext
            localStorage.setItem("adminToken", token); // ✅ Store token separately

            navigate("/dashboard"); // Redirect after successful login
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="admin-container">
                <h2 className="">Admin Login</h2>
                {error && <p className="">{error}</p>}

                <form onSubmit={handleLogin}>


                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>


                </form>


            </div>
        </>
    );
};

export default AdminLogin;
