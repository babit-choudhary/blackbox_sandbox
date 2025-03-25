import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  // Mock data for order confirmation
  const order = {
    id: 'ORD001',
    date: '2024-01-24',
    total: 38997,
    paymentMethod: 'Credit Card',
    deliveryAddress: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      address: '123, Park Street',
      locality: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    items: [
      {
        id: 1,
        name: 'Designer Silk Saree',
        price: 15999,
        discountedPrice: 13999,
        image: 'https://via.placeholder.com/100',
        vendor: 'Ethnic Elegance',
        quantity: 1
      },
      {
        id: 2,
        name: 'Kundan Necklace Set',
        price: 25999,
        discountedPrice: 23999,
        image: 'https://via.placeholder.com/100',
        vendor: 'Royal Jewels',
        quantity: 1
      }
    ],
    estimatedDelivery: '2024-01-29'
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Success Message */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <i className="fas fa-check text-2xl text-green-600"></i>
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">Order Placed Successfully!</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Order Header */}
        <div className="border-b p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Placed on {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to={`/customer/orders/${order.id}`} className="btn-secondary">
                View Order Details
              </Link>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6 border-b">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.vendor}</p>
                  <div className="mt-1 flex justify-between">
                    <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                    <span className="text-sm font-medium text-gray-900">
                      ₹{((item.discountedPrice || item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="p-6 border-b">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Delivery Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase">Shipping Address</h4>
              <div className="mt-2 text-sm text-gray-900">
                <p>{order.deliveryAddress.name}</p>
                <p>{order.deliveryAddress.phone}</p>
                <p>{order.deliveryAddress.address}</p>
                <p>{order.deliveryAddress.locality}</p>
                <p>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase">Delivery Information</h4>
              <div className="mt-2">
                <div className="flex items-center text-sm text-gray-900">
                  <i className="fas fa-truck mr-2 text-gray-400"></i>
                  Estimated delivery by {new Date(order.estimatedDelivery).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase">Payment Method</h4>
              <p className="mt-2 text-sm text-gray-900">{order.paymentMethod}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase">Order Summary</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-medium text-gray-900">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to="/customer/products" className="btn-primary">
          Continue Shopping
        </Link>
        <button className="btn-secondary">
          <i className="fas fa-download mr-2"></i>
          Download Invoice
        </button>
      </div>

      {/* Need Help */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Need help? <button className="text-indigo-600 hover:text-indigo-800">Contact Support</button>
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;