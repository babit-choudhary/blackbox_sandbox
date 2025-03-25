import React, { useState } from 'react';

const Products = () => {
  // Mock data for vendor products
  const mockProducts = [
    {
      id: 1,
      name: 'Designer Silk Saree',
      category: 'Sarees',
      price: 15999,
      discountedPrice: 13999,
      stock: 25,
      status: 'active',
      featured: true,
      image: 'https://via.placeholder.com/150',
      description: 'Handwoven silk saree with traditional designs',
      sku: 'SAR-001',
      variations: ['Red', 'Blue', 'Green']
    },
    {
      id: 2,
      name: 'Bridal Lehenga',
      category: 'Lehengas',
      price: 45999,
      discountedPrice: null,
      stock: 10,
      status: 'active',
      featured: true,
      image: 'https://via.placeholder.com/150',
      description: 'Heavy embroidered bridal lehenga',
      sku: 'LEH-001',
      variations: ['Pink', 'Maroon']
    },
    {
      id: 3,
      name: 'Traditional Kundan Necklace',
      category: 'Jewelry',
      price: 25999,
      discountedPrice: 23999,
      stock: 5,
      status: 'low_stock',
      featured: false,
      image: 'https://via.placeholder.com/150',
      description: 'Handcrafted kundan necklace set',
      sku: 'JWL-001',
      variations: ['Gold', 'Rose Gold']
    },
    {
      id: 4,
      name: 'Embroidered Kurti',
      category: 'Kurtis',
      price: 2999,
      discountedPrice: null,
      stock: 0,
      status: 'out_of_stock',
      featured: false,
      image: 'https://via.placeholder.com/150',
      description: 'Cotton kurti with traditional embroidery',
      sku: 'KUR-001',
      variations: ['S', 'M', 'L', 'XL']
    }
  ];

  const [products] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Products</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Products</label>
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Sarees">Sarees</option>
              <option value="Lehengas">Lehengas</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Kurtis">Kurtis</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="input-field"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="mt-4 flex justify-end">
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
        </div>
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.featured && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-3">
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
                  <div className="mt-1 text-sm text-gray-500">
                    Stock: {product.stock} units
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900" title="Edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-900" title="Manage Stock">
                    <i className="fas fa-box"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-900" title="Delete">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{(product.discountedPrice || product.price).toLocaleString()}
                    </div>
                    {product.discountedPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ₹{product.price.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {product.stock} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900" title="Manage Stock">
                        <i className="fas fa-box"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="btn-secondary">Previous</button>
            <button className="btn-secondary">Next</button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredProducts.length}</span> of{' '}
                <span className="font-medium">{filteredProducts.length}</span> results
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
  );
};

export default Products;