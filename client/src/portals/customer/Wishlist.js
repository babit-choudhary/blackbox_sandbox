import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  // Mock data for wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Designer Silk Saree',
      price: 15999,
      discountedPrice: 13999,
      image: 'https://via.placeholder.com/300',
      vendor: 'Ethnic Elegance',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      addedDate: '2024-01-20'
    },
    {
      id: 2,
      name: 'Bridal Lehenga',
      price: 45999,
      discountedPrice: null,
      image: 'https://via.placeholder.com/300',
      vendor: 'Wedding Couture',
      rating: 4.8,
      reviews: 96,
      inStock: true,
      addedDate: '2024-01-21'
    },
    {
      id: 3,
      name: 'Kundan Necklace Set',
      price: 25999,
      discountedPrice: 23999,
      image: 'https://via.placeholder.com/300',
      vendor: 'Royal Jewels',
      rating: 4.6,
      reviews: 75,
      inStock: false,
      addedDate: '2024-01-22'
    }
  ]);

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date-desc');

  // Sort wishlist items
  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
      case 'price-high':
        return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
      case 'date-asc':
        return new Date(a.addedDate) - new Date(b.addedDate);
      case 'date-desc':
        return new Date(b.addedDate) - new Date(a.addedDate);
      default:
        return 0;
    }
  });

  const removeFromWishlist = (itemId) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Wishlist</h1>
        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex space-x-2">
            <button
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-grid-2"></i>
            </button>
            <button
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            className="input-field"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/customer/products/${item.id}`} className="block">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.vendor}</p>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({item.reviews})</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{(item.discountedPrice || item.price).toLocaleString()}
                      </span>
                      {item.discountedPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{item.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </Link>
                  <button 
                    className={`mt-4 w-full py-2 rounded-md transition duration-300 ${
                      item.inStock
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!item.inStock}
                  >
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex">
                  <div className="w-48 h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.vendor}</p>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({item.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{(item.discountedPrice || item.price).toLocaleString()}
                        </span>
                        {item.discountedPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button 
                        className={`px-6 py-2 rounded-md transition duration-300 ${
                          item.inStock
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!item.inStock}
                      >
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        // Empty Wishlist
        <div className="text-center py-12">
          <div className="text-6xl text-gray-300 mb-4">
            <i className="far fa-heart"></i>
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link
            to="/customer/products"
            className="btn-primary inline-flex items-center"
          >
            <i className="fas fa-shopping-bag mr-2"></i>
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;