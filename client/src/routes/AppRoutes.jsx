import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/dashboard/dashboard';
import ProtectedRoute from '../components/protectRoute/protectRoute';
import Layout from "../pages/layout/layout";
import AdminAddMenu from '../pages/admin/AdminAddMenu';
import UserMenu from '../pages/user/userMenu/userMenu';

import AdminMenuList from '../pages/admin/AdminMenuList';
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/login/admin" element={<AdminLogin />} />
                <Route path='/menu' element={<UserMenu />} />
                {/* <Route path="/admin/menu" element={<AdminMenuList />} /> */}
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




            </Routes>
        </Router>
    );
};

export default AppRoutes;

