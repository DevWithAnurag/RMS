import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/dashboard/dashboard';
import ProtectedRoute from '../components/protectRoute/protectRoute';
import Layout from "../pages/layout/layout";
import AdminAddMenu from '../pages/admin/AdminAddMenu';
import UserMenu from '../pages/user/userMenu/userMenu';
import Cart from "../pages/user/userCart/Cart";
import AdminMenuList from '../pages/admin/AdminMenuList';
import Login from '../pages/userLogin/Login';
const AppRoutes = () => {
    return (

        <Routes>
            <Route>
                <Route path="/" element={<Layout />} />
                <Route path="/login/admin" element={<AdminLogin />} />
                <Route path='/menu' element={<UserMenu />} />

                {/* ProtectedRoutes  */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/add-menu"
                    element={
                        <ProtectedRoute>
                            <AdminAddMenu />
                        </ProtectedRoute>
                    }
                />


                <Route path="/user/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />


            </Route>
        </Routes>
    );
};

export default AppRoutes;

