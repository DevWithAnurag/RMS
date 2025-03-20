import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/dashboard/dashboard';
import ProtectedRoute from '../components/protectRoute/protectRoute';
import Layout from "../pages/layout/layout";
import AdminAddMenu from '../pages/admin/AdminAddMenu';
import UserMenu from '../pages/user/userMenu/userMenu';
import Cart from "../pages/user/userCart/Cart";
import Login from '../pages/userLogin/Login';

import Payment from '../pages/Payment/Payment';
import OrderSucces from '../pages/order-success/orderSucces';

import Upi from '../pages/Upi/upi';
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

                <Route path="/payment" element={<Payment />} />


                <Route path="/order-success" element={<OrderSucces />} />
                <Route path='/upi' element={<Upi />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

