import React, { useState } from 'react';

const Orders = () => {
  // Mock data for vendor orders
  const mockOrders = [
    {
      id: 'ORD001',
      customer: {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98765 43210',
        address: '123, Park Street, Mumbai, Maharashtra - 400001'
      },
      items: [
        { name: 'Designer Silk Saree', quantity: 1, price: 15999, sku: 'SAR-001' },
        { name: 'Traditional Earrings', quantity: 1, price: 2999, sku: 'JWL-002' }
      ],
      total: 18998,
      status: 'pending',
      paymentStatus: 'paid',
      orderDate: '2024-01-24',
      deliveryDate: null,
      shippingMethod: 'Express Delivery',
      trackingNumber: null
    },
    {
      id: 'ORD002',
      customer: {
        name: 'Rahul Verma',
        email: 'rahul@example.com',
        phone: '+91 98765 43211',
        address: '456, MG Road, Bangalore, Karnataka - 560001'
      },
      items: [
        { name: 'Bridal Lehenga', quantity: 1, price: 45999, sku: 'LEH-001' }
      ],
      total: 45999,
      status: 'processing',
      paymentStatus: 'paid',
      orderDate: '2024-01-23',
      deliveryDate: null,
      shippingMethod: 'Standard Delivery',
      trackingNumber: 'TRK123456'
    },
    {
      id: 'ORD003',
      customer: {
        name: 'Anjali Patel',
        email: 'anjali@example.com',
        phone: '+91 98765 43212',
        address: '789, Ring Road, Ahmedabad, Gujarat - 380001'
      },
      items: [
        { name: 'Kundan Necklace Set', quantity: 1, price: 25999, sku: 'JWL-003' }
      ],
      total: 25999,
      status: 'delivered',
      paymentStatus: 'paid',
      orderDate: '2024-01-22',
      deliveryDate: '2024-01-24',
      shippingMethod: 'Express Delivery',
      trackingNumber: 'TRK123457'
    },
    {
      id: 'ORD004',
      customer: {
        name: 'Arjun Kumar',
        email: 'arjun@example.com',
        phone: '+91 98765 43213',
        address: '321, Civil Lines, Delhi - 110001'
      },
      items: [
        { name: 'Embroidered Kurti', quantity: 2, price: 2999, sku: 'KUR-001' },
        { name: 'Palazzo Pants', quantity: 2, price: 1999, sku: 'BTM-001' }
      ],
      total: 9996,
      status: 'cancelled',
      paymentStatus: 'refunded',
      orderDate: '2024-01-21',
      deliveryDate: null,
      shippingMethod: 'Standard Delivery',
      trackingNumber: null
    }
  ];

  const [orders] = useState(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPayment = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const orderDate = new Date(order.orderDate);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = orderDate >= startDate && orderDate <= endDate;
    }

    return matchesStatus && matchesPayment && matchesSearch && matchesDate;
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusBadgeColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Orders Management</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <i className="fas fa-download mr-2"></i>
            Export Orders
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Orders</label>
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search by order ID, customer name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Order Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
            <select
              className="input-field"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              className="input-field"
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="flex space-x-2">
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

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.length} items
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                    <div className="text-sm text-gray-500">{order.customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-gray-900">₹{order.total.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusBadgeColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-3">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => setSelectedOrder(order)}
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        title="Update Status"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="Print Invoice"
                      >
                        <i className="fas fa-print"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="btn-secondary">Previous</button>
              <button className="btn-secondary">Next</button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">{filteredOrders.length}</span> of{' '}
                  <span className="font-medium">{filteredOrders.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Order Details - {selectedOrder.id}</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Name: {selectedOrder.customer.name}</p>
                  <p className="text-sm text-gray-600">Email: {selectedOrder.customer.email}</p>
                  <p className="text-sm text-gray-600">Phone: {selectedOrder.customer.phone}</p>
                  <p className="text-sm text-gray-600">Address: {selectedOrder.customer.address}</p>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Order Status</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">
                    Order Status: 
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment Status:
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusBadgeColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">Shipping Method: {selectedOrder.shippingMethod}</p>
                  {selectedOrder.trackingNumber && (
                    <p className="text-sm text-gray-600">Tracking Number: {selectedOrder.trackingNumber}</p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th className="text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="py-2">
                            <div className="text-sm text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                          </td>
                          <td className="py-2 text-center text-sm text-gray-500">{item.quantity}</td>
                          <td className="py-2 text-right text-sm text-gray-500">₹{item.price.toLocaleString()}</td>
                          <td className="py-2 text-right text-sm text-gray-900">₹{(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="py-2 text-right text-sm font-medium text-gray-900">Total:</td>
                        <td className="py-2 text-right text-sm font-medium text-gray-900">₹{selectedOrder.total.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button className="btn-secondary" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
              <button className="btn-primary">
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;