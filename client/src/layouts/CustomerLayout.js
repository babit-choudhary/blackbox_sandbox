import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const CustomerLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // TODO: Implement logout logic
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const categories = [
    'Sarees',
    'Lehengas',
    'Kurtis',
    'Jewelry',
    'Traditional Wear',
    'Wedding Collection'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-md">
        {/* Upper Header */}
        <div className="bg-indigo-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-200">Track Order</a>
                <a href="#" className="hover:text-gray-200">Customer Care</a>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-200">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-gray-200">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-gray-200">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/customer/home" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">EthnicMart</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, designers..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="absolute right-3 top-2 text-gray-400 hover:text-gray-600">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-6">
              {/* Mobile Search */}
              <button 
                className="md:hidden text-gray-600 hover:text-gray-800"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <i className="fas fa-search"></i>
              </button>

              {/* Wishlist */}
              <Link to="/customer/wishlist" className="text-gray-600 hover:text-gray-800 relative">
                <i className="fas fa-heart"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Cart */}
              <Link to="/customer/cart" className="text-gray-600 hover:text-gray-800 relative">
                <i className="fas fa-shopping-cart"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                  <i className="fas fa-user"></i>
                  <span className="hidden md:inline">My Account</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <Link to="/customer/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/customer/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden py-4">
              <input
                type="text"
                placeholder="Search for products, designers..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Categories Navigation */}
          <nav className="hidden md:flex space-x-8 py-4">
            {categories.map((category) => (
              <a
                key={category}
                href="#"
                className="text-gray-600 hover:text-indigo-600 text-sm font-medium"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About EthnicMart</h3>
              <p className="mt-4 text-base text-gray-500">
                Your one-stop destination for authentic ethnic wear and jewelry from local designers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">FAQs</a>
                </li>
              </ul>
            </div>

            {/* Policy */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Policy</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Return Policy</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Subscribe to our newsletter</h3>
              <p className="mt-4 text-base text-gray-500">
                Get the latest updates on new products and upcoming sales.
              </p>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              © 2024 EthnicMart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;