import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: 'Designer Silk Saree',
      category: 'Sarees',
      price: 15999,
      discountedPrice: 13999,
      image: 'https://via.placeholder.com/300',
      vendor: 'Ethnic Elegance',
      rating: 4.5,
      reviews: 128,
      description: 'Handwoven silk saree with traditional designs',
      colors: ['Red', 'Blue', 'Green'],
      inStock: true
    },
    {
      id: 2,
      name: 'Bridal Lehenga',
      category: 'Lehengas',
      price: 45999,
      discountedPrice: null,
      image: 'https://via.placeholder.com/300',
      vendor: 'Wedding Couture',
      rating: 4.8,
      reviews: 96,
      description: 'Heavy embroidered bridal lehenga',
      colors: ['Pink', 'Maroon'],
      inStock: true
    },
    {
      id: 3,
      name: 'Kundan Necklace Set',
      category: 'Jewelry',
      price: 25999,
      discountedPrice: 23999,
      image: 'https://via.placeholder.com/300',
      vendor: 'Royal Jewels',
      rating: 4.6,
      reviews: 75,
      description: 'Traditional kundan necklace set with earrings',
      colors: ['Gold', 'Rose Gold'],
      inStock: true
    },
    {
      id: 4,
      name: 'Designer Anarkali Suit',
      category: 'Traditional Wear',
      price: 18999,
      discountedPrice: 16999,
      image: 'https://via.placeholder.com/300',
      vendor: 'Fashion Hub',
      rating: 4.4,
      reviews: 64,
      description: 'Elegant anarkali suit with detailed embroidery',
      colors: ['Blue', 'Black', 'Maroon'],
      inStock: false
    }
  ];

  const categories = [
    'All Categories',
    'Sarees',
    'Lehengas',
    'Jewelry',
    'Traditional Wear',
    'Kurtis',
    'Wedding Collection'
  ];

  const [products] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
      case 'price-high':
        return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
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
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Search</h3>
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    selectedCategory === category
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="lg:col-span-3">
          {viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
                    />
                    <button className="absolute top-4 right-4 text-gray-600 hover:text-red-500">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <div className="p-4">
                    <Link to={`/customer/products/${product.id}`} className="block">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.vendor}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${
                                i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            ></i>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{(product.discountedPrice || product.price).toLocaleString()}
                        </span>
                        {product.discountedPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </Link>
                    <button 
                      className={`mt-4 w-full py-2 rounded-md transition duration-300 ${
                        product.inStock
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex">
                    <div className="w-48 h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{product.vendor}</p>
                        </div>
                        <button className="text-gray-600 hover:text-red-500">
                          <i className="far fa-heart"></i>
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${
                                i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            ></i>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{(product.discountedPrice || product.price).toLocaleString()}
                          </span>
                          {product.discountedPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button 
                          className={`px-6 py-2 rounded-md transition duration-300 ${
                            product.inStock
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;