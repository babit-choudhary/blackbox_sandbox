import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
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
    { path: '/admin', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { path: '/admin/users', icon: 'fas fa-users', label: 'Users' },
    { path: '/admin/products', icon: 'fas fa-box', label: 'Products' },
    { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { path: '/admin/reports', icon: 'fas fa-chart-bar', label: 'Reports' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-indigo-600">
          <Link to="/admin" className="text-white text-xl font-bold">
            Admin Portal
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <i className="fas fa-times"></i>
          </button>
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

            {/* Admin Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="text-gray-600 hover:text-gray-800 relative">
                <i className="fas fa-bell"></i>
                <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>

              {/* Admin Profile Dropdown */}
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Admin</span>
                </button>
              </div>

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
      </div>
    </div>
  );
};

export default AdminLayout;