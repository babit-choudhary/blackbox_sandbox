import React, { useState } from 'react';

const Checkout = () => {
  // Mock data for checkout
  const [cartItems] = useState([
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
  ]);

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      address: '123, Park Street',
      locality: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      address: '456, Business Park',
      locality: 'Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400069',
      isDefault: false
    }
  ]);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => 
    total + (item.discountedPrice || item.price) * item.quantity, 0
  );
  const shipping = subtotal > 20000 ? 0 : 199;
  const discount = appliedCoupon ? (subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon({
        code: couponCode,
        discount: '10%'
      });
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedAddress === address.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-500'
                  }`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{address.type}</span>
                        {address.isDefault && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>{address.name}</p>
                        <p>{address.phone}</p>
                        <p>{address.address}</p>
                        <p>{address.locality}</p>
                        <p>{address.city}, {address.state} - {address.pincode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                <i className="fas fa-plus mr-2"></i>
                Add New Address
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-4">
              {/* Credit/Debit Card */}
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-500'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">Credit/Debit Card</span>
                    <div className="mt-1 flex space-x-2 text-gray-400">
                      <i className="fab fa-cc-visa text-2xl"></i>
                      <i className="fab fa-cc-mastercard text-2xl"></i>
                      <i className="fab fa-cc-amex text-2xl"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI */}
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-500'
                }`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">UPI</span>
                    <p className="text-sm text-gray-500">Pay using UPI apps</p>
                  </div>
                </div>
              </div>

              {/* Cash on Delivery */}
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-500'
                }`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">Cash on Delivery</span>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
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

            {/* Coupon */}
            {!appliedCoupon ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="input-field flex-1"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  onClick={applyCoupon}
                  className="btn-secondary whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Coupon Applied: {appliedCoupon.code}
                    </p>
                    <p className="text-xs text-green-600">
                      You saved {appliedCoupon.discount}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-green-800 hover:text-green-900"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Price Details */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {shipping === 0 ? 'Free' : `₹${shipping}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Including GST
                </p>
              </div>
            </div>

            {/* Place Order Button */}
            <button className="w-full btn-primary">
              Place Order
            </button>

            {/* Secure Transaction */}
            <div className="text-center text-sm text-gray-500">
              <i className="fas fa-lock mr-2"></i>
              Secure Transaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;