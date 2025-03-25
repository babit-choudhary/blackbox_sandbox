import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  // Mock data for product details
  const product = {
    id: 1,
    name: 'Designer Silk Saree',
    category: 'Sarees',
    price: 15999,
    discountedPrice: 13999,
    images: [
      'https://via.placeholder.com/600',
      'https://via.placeholder.com/600',
      'https://via.placeholder.com/600',
      'https://via.placeholder.com/600'
    ],
    vendor: {
      name: 'Ethnic Elegance',
      rating: 4.8,
      products: 156,
      joinedDate: '2020'
    },
    rating: 4.5,
    reviews: 128,
    description: 'Handwoven pure silk saree with traditional zari work and intricate border design. Perfect for special occasions and festivals.',
    specifications: {
      material: 'Pure Silk',
      color: 'Red',
      length: '6.3 meters',
      blousePiece: 'Included (0.8 meters)',
      style: 'Traditional',
      occasion: 'Wedding, Festival, Party',
      care: 'Dry Clean Only'
    },
    variants: {
      colors: ['Red', 'Blue', 'Green', 'Pink'],
      sizes: ['Free Size']
    },
    stock: 25,
    deliveryTime: '5-7 days',
    returnPolicy: '10 days easy return',
    reviews: [
      {
        id: 1,
        user: 'Anjali P.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Beautiful saree with excellent craftsmanship. The color is vibrant and the material is premium quality.',
        images: ['https://via.placeholder.com/100']
      },
      {
        id: 2,
        user: 'Priya S.',
        rating: 4,
        date: '2024-01-10',
        comment: 'Good quality saree. The zari work is beautiful. Slight delay in delivery but worth the wait.',
        images: []
      }
    ]
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const updateQuantity = (newQuantity) => {
    setQuantity(Math.min(Math.max(1, newQuantity), product.stock));
  };

  const getStarRating = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fas fa-star ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      ></i>
    ));
  };

  return (
    <div className="space-y-8">
      {/* Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex text-yellow-400">
              {getStarRating(product.rating)}
            </div>
            <span className="text-sm text-gray-500">{product.reviews.length} reviews</span>
          </div>

          <div className="flex items-baseline space-x-4">
            <span className="text-2xl font-bold text-gray-900">
              ₹{(product.discountedPrice || product.price).toLocaleString()}
            </span>
            {product.discountedPrice && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-green-600">
                  {Math.round((1 - product.discountedPrice / product.price) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 flex space-x-2">
              {product.variants.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? 'border-indigo-500'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="mt-2 flex items-center space-x-3">
              <button
                className="p-2 border rounded-md hover:bg-gray-50"
                onClick={() => updateQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                className="p-2 border rounded-md hover:bg-gray-50"
                onClick={() => updateQuantity(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <i className="fas fa-plus"></i>
              </button>
              <span className="text-sm text-gray-500">
                {product.stock} units available
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 btn-primary">
              Add to Cart
            </button>
            <button
              className={`p-4 rounded-md border ${
                isWishlisted
                  ? 'text-red-600 border-red-600'
                  : 'text-gray-400 border-gray-300 hover:text-red-600 hover:border-red-600'
              }`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}></i>
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="fas fa-truck"></i>
              <span>Delivery in {product.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="fas fa-undo"></i>
              <span>{product.returnPolicy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{product.vendor.name}</h2>
            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <i className="fas fa-star text-yellow-400 mr-1"></i>
                {product.vendor.rating} Rating
              </div>
              <div>{product.vendor.products} Products</div>
              <div>Since {product.vendor.joinedDate}</div>
            </div>
          </div>
          <Link to={`/customer/vendors/${product.vendor.id}`} className="btn-secondary">
            View Store
          </Link>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Description */}
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          )}

          {/* Specifications */}
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border-b pb-4">
                  <dt className="text-sm font-medium text-gray-500">{key}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Review Summary */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                  <div className="mt-1 flex text-yellow-400">
                    {getStarRating(product.rating)}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Based on {product.reviews.length} reviews
                  </div>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{review.user}</div>
                        <div className="mt-1 flex items-center space-x-2">
                          <div className="flex text-yellow-400">
                            {getStarRating(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600">{review.comment}</p>
                    {review.images.length > 0 && (
                      <div className="mt-4 flex space-x-2">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review ${index + 1}`}
                            className="h-20 w-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;