import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Mock data for featured sections
  const featuredProducts = [
    {
      id: 1,
      name: 'Designer Silk Saree',
      price: 15999,
      discountedPrice: 13999,
      image: 'https://via.placeholder.com/300',
      vendor: 'Ethnic Elegance',
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: 'Bridal Lehenga',
      price: 45999,
      discountedPrice: null,
      image: 'https://via.placeholder.com/300',
      vendor: 'Wedding Couture',
      rating: 4.8,
      reviews: 96
    },
    {
      id: 3,
      name: 'Kundan Necklace Set',
      price: 25999,
      discountedPrice: 23999,
      image: 'https://via.placeholder.com/300',
      vendor: 'Royal Jewels',
      rating: 4.6,
      reviews: 75
    },
    {
      id: 4,
      name: 'Designer Anarkali Suit',
      price: 18999,
      discountedPrice: 16999,
      image: 'https://via.placeholder.com/300',
      vendor: 'Fashion Hub',
      rating: 4.4,
      reviews: 64
    }
  ];

  const categories = [
    {
      name: 'Sarees',
      image: 'https://via.placeholder.com/200',
      count: 250
    },
    {
      name: 'Lehengas',
      image: 'https://via.placeholder.com/200',
      count: 180
    },
    {
      name: 'Jewelry',
      image: 'https://via.placeholder.com/200',
      count: 320
    },
    {
      name: 'Traditional Wear',
      image: 'https://via.placeholder.com/200',
      count: 150
    },
    {
      name: 'Kurtis',
      image: 'https://via.placeholder.com/200',
      count: 280
    },
    {
      name: 'Wedding Collection',
      image: 'https://via.placeholder.com/200',
      count: 120
    }
  ];

  const designers = [
    {
      id: 1,
      name: 'Ethnic Elegance',
      image: 'https://via.placeholder.com/150',
      rating: 4.8,
      products: 156
    },
    {
      id: 2,
      name: 'Wedding Couture',
      image: 'https://via.placeholder.com/150',
      rating: 4.7,
      products: 128
    },
    {
      id: 3,
      name: 'Royal Jewels',
      image: 'https://via.placeholder.com/150',
      rating: 4.9,
      products: 98
    },
    {
      id: 4,
      name: 'Fashion Hub',
      image: 'https://via.placeholder.com/150',
      rating: 4.6,
      products: 245
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative h-full flex items-center">
            <div className="px-8 sm:px-12 md:px-16 lg:px-24">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Discover Authentic<br />Ethnic Fashion
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
                Explore our curated collection of handcrafted ethnic wear and jewelry from India's finest designers.
              </p>
              <Link
                to="/customer/products"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Shop by Category</h2>
          <Link to="/customer/categories" className="text-indigo-600 hover:text-indigo-800">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/customer/products?category=${category.name}`}
              className="group relative rounded-lg overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold">{category.name}</h3>
                <p className="text-white/80 text-sm">{category.count} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Featured Products</h2>
          <Link to="/customer/products" className="text-indigo-600 hover:text-indigo-800">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Designers Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Featured Designers</h2>
          <Link to="/customer/designers" className="text-indigo-600 hover:text-indigo-800">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {designers.map((designer) => (
            <Link
              key={designer.id}
              to={`/customer/designers/${designer.id}`}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300"
            >
              <img
                src={designer.image}
                alt={designer.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{designer.name}</h3>
              <div className="flex justify-center items-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${
                      i < Math.floor(designer.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  ></i>
                ))}
                <span className="text-sm text-gray-500 ml-2">{designer.rating}</span>
              </div>
              <p className="text-sm text-gray-500">{designer.products} Products</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter for the latest trends, designs, and exclusive offers.
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 input-field"
          />
          <button className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;