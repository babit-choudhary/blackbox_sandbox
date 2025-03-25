import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import VendorLayout from './layouts/VendorLayout';
import CustomerLayout from './layouts/CustomerLayout';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Portal Components
import AdminDashboard from './portals/admin/Dashboard';
import AdminUsers from './portals/admin/Users';
import AdminProducts from './portals/admin/Products';
import AdminOrders from './portals/admin/Orders';
import AdminReports from './portals/admin/Reports';

import VendorDashboard from './portals/vendor/Dashboard';
import VendorProducts from './portals/vendor/Products';
import VendorOrders from './portals/vendor/Orders';
import VendorProfile from './portals/vendor/Profile';

import CustomerHome from './portals/customer/Home';
import CustomerProducts from './portals/customer/Products';
import CustomerCart from './portals/customer/Cart';
import CustomerOrders from './portals/customer/Orders';
import CustomerProfile from './portals/customer/Profile';

const App = () => {
  // Simple auth check - replace with your actual auth logic
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  const userRole = () => {
    return localStorage.getItem('userRole') || 'customer';
  };

  const PrivateRoute = ({ children, roles }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(userRole())) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Navigate to="/customer/home" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* Vendor Routes */}
        <Route
          path="/vendor"
          element={
            <PrivateRoute roles={['vendor']}>
              <VendorLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="profile" element={<VendorProfile />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={
            <PrivateRoute roles={['customer']}>
              <CustomerLayout />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<CustomerHome />} />
          <Route path="products" element={<CustomerProducts />} />
          <Route path="cart" element={<CustomerCart />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;