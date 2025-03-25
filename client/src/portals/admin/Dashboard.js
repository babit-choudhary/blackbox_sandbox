import React from 'react';

const Dashboard = () => {
  // Mock data for dashboard statistics
  const stats = {
    totalUsers: 1250,
    totalVendors: 85,
    totalProducts: 3420,
    totalOrders: 750,
    revenue: 458600,
    pendingApprovals: 12
  };

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', amount: 2500, status: 'Delivered' },
    { id: '#ORD002', customer: 'Jane Smith', amount: 3200, status: 'Processing' },
    { id: '#ORD003', customer: 'Mike Johnson', amount: 1800, status: 'Pending' },
    { id: '#ORD004', customer: 'Sarah Williams', amount: 4200, status: 'Shipped' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <i className="fas fa-download mr-2"></i>
            Export Report
          </button>
          <button className="btn-primary">
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <i className="fas fa-users text-blue-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              12%
            </span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Total Vendors */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Vendors</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalVendors}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <i className="fas fa-store text-purple-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              8%
            </span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Total Products */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <i className="fas fa-box text-yellow-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              15%
            </span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <i className="fas fa-shopping-cart text-green-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              20%
            </span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <i className="fas fa-rupee-sign text-indigo-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              25%
            </span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <i className="fas fa-clock text-red-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-indigo-600 hover:text-indigo-800">
              View pending items <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <button className="text-sm text-indigo-600 hover:text-indigo-800">
              View all orders <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center justify-center space-x-2">
          <i className="fas fa-user-plus text-indigo-600"></i>
          <span>Add New User</span>
        </button>
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center justify-center space-x-2">
          <i className="fas fa-store text-purple-600"></i>
          <span>Add New Vendor</span>
        </button>
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center justify-center space-x-2">
          <i className="fas fa-box text-yellow-600"></i>
          <span>Add New Product</span>
        </button>
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center justify-center space-x-2">
          <i className="fas fa-cog text-gray-600"></i>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;