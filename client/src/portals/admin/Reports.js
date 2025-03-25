import React, { useState } from 'react';

const Reports = () => {
  // Mock data for reports
  const salesData = {
    daily: [
      { date: '2024-01-20', orders: 45, revenue: 125000 },
      { date: '2024-01-21', orders: 52, revenue: 145000 },
      { date: '2024-01-22', orders: 48, revenue: 135000 },
      { date: '2024-01-23', orders: 60, revenue: 165000 },
      { date: '2024-01-24', orders: 55, revenue: 155000 }
    ],
    topProducts: [
      { name: 'Designer Silk Saree', sales: 125, revenue: 1999875 },
      { name: 'Bridal Lehenga', sales: 45, revenue: 2069955 },
      { name: 'Kundan Necklace Set', sales: 78, revenue: 2027922 },
      { name: 'Wedding Sherwani', sales: 56, revenue: 2015944 },
      { name: 'Embroidered Kurti', sales: 180, revenue: 539820 }
    ],
    topVendors: [
      { name: 'Ethnic Elegance', orders: 245, revenue: 3675000 },
      { name: 'Wedding Couture', orders: 180, revenue: 5400000 },
      { name: 'Royal Jewels', orders: 156, revenue: 4680000 },
      { name: 'Fashion Hub', orders: 320, revenue: 960000 },
      { name: 'Traditional Treasures', orders: 210, revenue: 3150000 }
    ],
    categoryPerformance: [
      { category: 'Sarees', orders: 450, revenue: 6750000 },
      { category: 'Lehengas', orders: 280, revenue: 8400000 },
      { category: 'Jewelry', orders: 320, revenue: 9600000 },
      { category: 'Traditional Wear', orders: 380, revenue: 5700000 },
      { category: 'Kurtis', orders: 520, revenue: 1560000 }
    ]
  };

  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getGrowthIndicator = (value) => {
    const isPositive = value > 0;
    return (
      <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <i className={`fas fa-arrow-${isPositive ? 'up' : 'down'} mr-1`}></i>
        {Math.abs(value)}%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <i className="fas fa-download mr-2"></i>
            Export Report
          </button>
          <button className="btn-primary">
            <i className="fas fa-chart-line mr-2"></i>
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              className="input-field"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="sales">Sales Report</option>
              <option value="products">Product Performance</option>
              <option value="vendors">Vendor Performance</option>
              <option value="categories">Category Analysis</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="input-field"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
              <input
                type="date"
                className="input-field"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold text-gray-900">₹32.4L</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <i className="fas fa-rupee-sign text-green-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getGrowthIndicator(12.5)}
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">1,245</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <i className="fas fa-shopping-cart text-blue-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getGrowthIndicator(8.2)}
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <h3 className="text-2xl font-bold text-gray-900">₹2,600</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <i className="fas fa-chart-line text-purple-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getGrowthIndicator(5.8)}
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">3.2%</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <i className="fas fa-percentage text-yellow-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getGrowthIndicator(-1.5)}
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  {salesData.topProducts.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 text-sm text-gray-900">{product.name}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">{product.sales}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">₹{product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Vendors */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Vendors</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Orders</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.topVendors.map((vendor, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 text-sm text-gray-900">{vendor.name}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">{vendor.orders}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">₹{vendor.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow lg:col-span-2">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Orders</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">Avg. Order Value</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.categoryPerformance.map((category, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 text-sm text-gray-900">{category.category}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">{category.orders}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">₹{category.revenue.toLocaleString()}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">
                        ₹{Math.round(category.revenue / category.orders).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Sales Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales Trend</h2>
        <div className="h-64 flex items-end justify-between">
          {salesData.daily.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-12 bg-indigo-600 rounded-t"
                style={{ height: `${(day.orders / 60) * 100}%` }}
              ></div>
              <div className="mt-2 text-xs text-gray-500">
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;