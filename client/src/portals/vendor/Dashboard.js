import React from 'react';

const Dashboard = () => {
  // Mock data for vendor dashboard
  const stats = {
    totalProducts: 85,
    activeProducts: 72,
    totalOrders: 156,
    pendingOrders: 12,
    totalRevenue: 245000,
    monthlyRevenue: 45000,
    averageRating: 4.5
  };

  const recentOrders = [
    { id: 'ORD123', customer: 'Priya Sharma', amount: 15999, status: 'pending', date: '2024-01-24' },
    { id: 'ORD122', customer: 'Rahul Verma', amount: 25999, status: 'processing', date: '2024-01-23' },
    { id: 'ORD121', customer: 'Anjali Patel', amount: 12999, status: 'delivered', date: '2024-01-22' },
    { id: 'ORD120', customer: 'Arjun Kumar', amount: 18999, status: 'shipped', date: '2024-01-21' }
  ];

  const topProducts = [
    { name: 'Designer Silk Saree', sales: 25, revenue: 399975 },
    { name: 'Bridal Lehenga', sales: 12, revenue: 551988 },
    { name: 'Traditional Necklace', sales: 18, revenue: 269982 },
    { name: 'Embroidered Kurti', sales: 30, revenue: 89970 }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Vendor Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Welcome back, Ethnic Elegance!</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <i className="fas fa-download mr-2"></i>
            Export Data
          </button>
          <button className="btn-primary">
            <i className="fas fa-plus mr-2"></i>
            Add Product
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <i className="fas fa-box text-blue-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              {Math.round((stats.activeProducts / stats.totalProducts) * 100)}%
            </span>
            <span className="text-gray-500 ml-2">Active products</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <i className="fas fa-shopping-cart text-purple-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-yellow-500 flex items-center">
              <i className="fas fa-clock mr-1"></i>
              {stats.pendingOrders}
            </span>
            <span className="text-gray-500 ml-2">Pending orders</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <i className="fas fa-rupee-sign text-green-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              18%
            </span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Average Rating */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.averageRating}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <i className="fas fa-star text-yellow-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`fas fa-star ${index + 1 > stats.averageRating ? 'text-gray-300' : ''}`}></i>
              ))}
            </div>
            <span className="text-gray-500 ml-2">Based on 120 reviews</span>
          </div>
        </div>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="py-3 text-sm text-gray-900">{order.id}</td>
                      <td className="py-3 text-sm text-gray-900">{order.customer}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">₹{order.amount.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
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

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Sales</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 text-sm text-gray-900">{product.name}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">{product.sales}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">₹{product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                View all products <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center justify-center space-x-2">
          <i className="fas fa-box text-indigo-600"></i>
          <span>Add New Product</span>
        </button>
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center justify-center space-x-2">
          <i className="fas fa-tags text-purple-600"></i>
          <span>Manage Discounts</span>
        </button>
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center justify-center space-x-2">
          <i className="fas fa-chart-bar text-blue-600"></i>
          <span>View Analytics</span>
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