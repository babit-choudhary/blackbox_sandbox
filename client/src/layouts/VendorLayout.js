import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const VendorLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const menuItems = [
    { path: '/vendor', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { path: '/vendor/products', icon: 'fas fa-box', label: 'My Products' },
    { path: '/vendor/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { path: '/vendor/profile', icon: 'fas fa-user', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-blue-600">
          <Link to="/vendor" className="text-white text-xl font-bold">
            Vendor Portal
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Vendor Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <img
              src="https://via.placeholder.com/50"
              alt="Vendor"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-sm font-semibold">Vendor Name</h3>
              <p className="text-xs text-gray-500">Ethnic Wear Designer</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-5 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActiveRoute(item.path) ? 'active' : ''} mb-2`}
            >
              <i className={`${item.icon} w-6`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="absolute bottom-0 w-full p-4 border-t bg-gray-50">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-lg font-semibold">₹45,000</p>
            </div>
            <div className="p-2">
              <p className="text-sm text-gray-500">Orders</p>
              <p className="text-lg font-semibold">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-margin duration-300 ease-in-out`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-md">
          <div className="h-16 flex items-center justify-between px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-800"
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* Vendor Actions */}
            <div className="flex items-center space-x-4">
              {/* Messages */}
              <button className="text-gray-600 hover:text-gray-800 relative">
                <i className="fas fa-envelope"></i>
                <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs text-white bg-red-500 rounded-full">
                  2
                </span>
              </button>

              {/* Notifications */}
              <button className="text-gray-600 hover:text-gray-800 relative">
                <i className="fas fa-bell"></i>
                <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs text-white bg-red-500 rounded-full">
                  5
                </span>
              </button>

              {/* Help */}
              <button className="text-gray-600 hover:text-gray-800">
                <i className="fas fa-question-circle"></i>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              Need help? Contact vendor support at support@ethnicmart.com
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VendorLayout;