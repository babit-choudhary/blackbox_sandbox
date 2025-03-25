import React, { useState } from 'react';

const Orders = () => {
  // Mock data for orders
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-24',
      total: 18998,
      status: 'delivered',
      paymentStatus: 'paid',
      deliveryDate: '2024-01-26',
      trackingNumber: 'TRK123456',
      items: [
        {
          name: 'Designer Silk Saree',
          price: 15999,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
          vendor: 'Ethnic Elegance'
        },
        {
          name: 'Traditional Earrings',
          price: 2999,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
          vendor: 'Royal Jewels'
        }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-01-23',
      total: 45999,
      status: 'shipped',
      paymentStatus: 'paid',
      deliveryDate: '2024-01-27',
      trackingNumber: 'TRK123457',
      items: [
        {
          name: 'Bridal Lehenga',
          price: 45999,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
          vendor: 'Wedding Couture'
        }
      ]
    },
    {
      id: 'ORD003',
      date: '2024-01-22',
      total: 25999,
      status: 'processing',
      paymentStatus: 'paid',
      deliveryDate: null,
      trackingNumber: null,
      items: [
        {
          name: 'Kundan Necklace Set',
          price: 25999,
          quantity: 1,
          image: 'https://via.placeholder.com/100',
          vendor: 'Royal Jewels'
        }
      ]
    }
  ];

  const [orders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Orders</label>
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search by order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              className="input-field"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Order Header */}
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Order {order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <i className={`fas fa-chevron-${selectedOrder?.id === order.id ? 'up' : 'down'}`}></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Details (Expandable) */}
            {selectedOrder?.id === order.id && (
              <div className="p-4 space-y-4">
                {/* Items */}
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Seller: {item.vendor}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h4>
                    <div className="text-sm text-gray-500">
                      <p>Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
                      {order.deliveryDate && (
                        <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                      )}
                      {order.trackingNumber && (
                        <p>Tracking Number: {order.trackingNumber}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h4>
                    <div className="text-sm text-gray-500">
                      <p>Status: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}</p>
                      <p>Total Amount: ₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 border-t pt-4">
                  {order.status === 'delivered' && (
                    <button className="btn-secondary">
                      <i className="fas fa-star mr-2"></i>
                      Write Review
                    </button>
                  )}
                  <button className="btn-secondary">
                    <i className="fas fa-download mr-2"></i>
                    Invoice
                  </button>
                  {order.status === 'processing' && (
                    <button className="btn-secondary text-red-600 hover:text-red-800">
                      <i className="fas fa-times mr-2"></i>
                      Cancel Order
                    </button>
                  )}
                  <button className="btn-primary">
                    <i className="fas fa-question-circle mr-2"></i>
                    Need Help
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl text-gray-300 mb-4">
            <i className="fas fa-box-open"></i>
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">No orders found</h2>
          <p className="text-gray-600 mb-8">
            {searchTerm || selectedStatus !== 'all'
              ? "Try adjusting your filters"
              : "You haven't placed any orders yet"}
          </p>
          {!searchTerm && selectedStatus === 'all' && (
            <button className="btn-primary">
              Start Shopping
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;