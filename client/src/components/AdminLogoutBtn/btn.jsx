import React from 'react';
import { useNavigate } from 'react-router-dom';

const btn = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove authentication data from storage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminName');
        // Redirect to admin login page
        navigate('/login/admin');
    };

    return (
        <button onClick={handleLogout} style={buttonStyle}>
            Logout
        </button>
    );
};

const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#ff4d4f',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
};

export default btn;
