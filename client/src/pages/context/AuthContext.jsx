import React, { createContext, useState } from "react";

export const AuthContext = createContext(); // ✅ Ensure export

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");

    const login = (userData) => {
        setUser(userData); // ✅ Store user after login
        localStorage.setItem("user", JSON.stringify(userData)); // Optional: Store in localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // Remove from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
