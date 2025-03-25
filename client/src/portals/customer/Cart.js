import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Designer Silk Saree',
      price: 15999,
      discountedPrice: 13999,
      image: 'https://via.placeholder.com/100',
      vendor: 'Ethnic Elegance',
      quantity: 1,
      color: 'Red',
      maxQuantity: 5
    },
    {
      id: 2,
      name: 'Kundan Necklace Set',
      price: 25999,
      discountedPrice: 23999,
      image: 'https://via.placeholder.com/100',
      vendor: 'Royal Jewels',
      quantity: 1,
      color: 'Gold',
      maxQuantity: 3
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = cartItems.reduce((total, item) => 
    total + (item.discountedPrice || item.price) * item.quantity, 0
  );
  const shipping = subtotal > 20000 ? 0 : 199;
  const discount = appliedCoupon ? (subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(Math.max(1, newQuantity), item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon({
        code: couponCode,
        discount: '10%'
      });
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl text-gray-300 mb-4">
          <i className="fas fa-shopping-cart"></i>
        </div>
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/customer/products"
          className="btn-primary inline-flex items-center"
        >
          <i className="fas fa-shopping-bag mr-2"></i>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-6 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Seller: {item.vendor}</p>
                      <p className="text-sm text-gray-500">Color: {item.color}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                        disabled={item.quantity >= item.maxQuantity}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ₹{((item.discountedPrice || item.price) * item.quantity).toLocaleString()}
                      </div>
                      {item.discountedPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/customer/products"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

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

            <button className="w-full btn-primary">
              Proceed to Checkout
            </button>

            <div className="text-center text-sm text-gray-500">
              <i className="fas fa-lock mr-2"></i>
              Secure Transaction
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">We Accept:</p>
              <div className="flex space-x-2 text-gray-400">
                <i className="fab fa-cc-visa text-2xl"></i>
                <i className="fab fa-cc-mastercard text-2xl"></i>
                <i className="fab fa-cc-amex text-2xl"></i>
                <i className="fas fa-money-bill-wave text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;