import React, { useState } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Tabs from '../../../components/Tabs';
import Modal from '../../../components/Modal';
import ProductForm from './ProductForm';
import { Toast } from '../../../components/Toast';
import Table from '../../../components/Table';
import Badge from '../../../components/Badge';
import Menu from '../../../components/Menu';
import Search from '../../../components/Search';

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('ready-made');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productType, setProductType] = useState('ready-made');

  // Mock data - replace with actual API calls
  const [products] = useState({
    'ready-made': [
      {
        id: 1,
        name: 'Designer Silk Saree',
        sku: 'SAR-001',
        category: 'Sarees',
        price: 15999,
        stock: 25,
        status: 'active',
        variants: [
          { sku: 'SAR-001-RED', color: 'Red', price: 15999, stock: 10 },
          { sku: 'SAR-001-BLUE', color: 'Blue', price: 15999, stock: 15 }
        ]
      }
    ],
    'custom': [
      {
        id: 2,
        name: 'Custom Bridal Lehenga',
        sku: 'LEH-001',
        category: 'Lehengas',
        basePrice: 45999,
        status: 'active',
        customizationOptions: [
          { name: 'Blouse Size', type: 'measurement', required: true },
          { name: 'Embroidery Color', type: 'color', required: true }
        ]
      }
    ]
  });

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductType(activeTab);
    setIsFormModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductType(activeTab);
    setIsFormModalOpen(true);
  };

  const handleProductSubmit = (formData) => {
    // Handle form submission - API call would go here
    console.log('Submitting product:', formData);
    Toast.success(`Product ${formData.name} saved successfully`);
    setIsFormModalOpen(false);
  };

  const handleDeleteProduct = (product) => {
    // Handle product deletion - API call would go here
    console.log('Deleting product:', product);
    Toast.success(`Product ${product.name} deleted successfully`);
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      inactive: 'danger',
      draft: 'warning'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const columns = {
    'ready-made': [
      {
        key: 'name',
        label: 'Product',
        render: (value, row) => (
          <div className="flex items-center">
            {row.image ? (
              <img src={row.image} alt={value} className="w-10 h-10 rounded-lg mr-3" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-100 mr-3 flex items-center justify-center">
                <i className="fas fa-box text-gray-400"></i>
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{row.sku}</div>
            </div>
          </div>
        )
      },
      { key: 'category', label: 'Category' },
      {
        key: 'price',
        label: 'Price',
        render: (value) => `₹${value.toLocaleString()}`
      },
      { key: 'stock', label: 'Stock' },
      {
        key: 'status',
        label: 'Status',
        render: (value) => getStatusBadge(value)
      },
      {
        key: 'actions',
        label: '',
        render: (_, row) => (
          <Menu
            trigger={
              <button className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            }
            items={[
              {
                label: 'Edit',
                icon: 'fas fa-edit',
                onClick: () => handleEditProduct(row)
              },
              {
                label: 'Delete',
                icon: 'fas fa-trash',
                className: 'text-red-600',
                onClick: () => handleDeleteProduct(row)
              }
            ]}
          />
        )
      }
    ],
    'custom': [
      {
        key: 'name',
        label: 'Product',
        render: (value, row) => (
          <div className="flex items-center">
            {row.image ? (
              <img src={row.image} alt={value} className="w-10 h-10 rounded-lg mr-3" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-100 mr-3 flex items-center justify-center">
                <i className="fas fa-box text-gray-400"></i>
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{row.sku}</div>
            </div>
          </div>
        )
      },
      { key: 'category', label: 'Category' },
      {
        key: 'basePrice',
        label: 'Base Price',
        render: (value) => `₹${value.toLocaleString()}`
      },
      {
        key: 'customizationOptions',
        label: 'Customization Options',
        render: (options) => (
          <div className="flex flex-wrap gap-1">
            {options.map((option, index) => (
              <Badge key={index} variant="info" className="text-xs">
                {option.name}
              </Badge>
            ))}
          </div>
        )
      },
      {
        key: 'status',
        label: 'Status',
        render: (value) => getStatusBadge(value)
      },
      {
        key: 'actions',
        label: '',
        render: (_, row) => (
          <Menu
            trigger={
              <button className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            }
            items={[
              {
                label: 'Edit',
                icon: 'fas fa-edit',
                onClick: () => handleEditProduct(row)
              },
              {
                label: 'Delete',
                icon: 'fas fa-trash',
                className: 'text-red-600',
                onClick: () => handleDeleteProduct(row)
              }
            ]}
          />
        )
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Product Information Management</h1>
        <Button variant="primary" onClick={handleAddProduct}>
          <i className="fas fa-plus mr-2"></i>
          Add New Product
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <Tabs
          tabs={[
            { id: 'ready-made', label: 'Ready-made Products' },
            { id: 'custom', label: 'Custom Products' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Card>

      {/* Search and Filters */}
      <Card>
        <div className="space-y-4">
          <Search
            placeholder="Search products..."
            filters={['Category', 'Status']}
            onSearch={(value, filters) => {
              console.log('Search:', value, filters);
            }}
          />
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <Table
          columns={columns[activeTab]}
          data={products[activeTab]}
          pagination
          sortable
          searchable
        />
      </Card>

      {/* Product Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={`${selectedProduct ? 'Edit' : 'Add'} ${
          productType === 'custom' ? 'Custom' : 'Ready-made'
        } Product`}
        size="xl"
      >
        <ProductForm
          initialData={selectedProduct}
          type={productType}
          onSubmit={handleProductSubmit}
          onCancel={() => setIsFormModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductManagement;