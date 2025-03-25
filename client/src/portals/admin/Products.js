import React, { useState } from 'react';
import { Tabs } from '../../components/Tabs';
import Card from '../../components/Card';
import {
  ProductManagement,
  AttributesAndCategories,
  VariantsAndCustomizations
} from './pim';

const Products = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Product Information Management (PIM)</h1>
      </div>

      {/* Navigation Tabs */}
      <Card>
        <Tabs
          tabs={[
            {
              id: 'products',
              label: 'Products',
              icon: 'fas fa-box'
            },
            {
              id: 'attributes',
              label: 'Attributes & Categories',
              icon: 'fas fa-tags'
            },
            {
              id: 'variants',
              label: 'Variants & Customizations',
              icon: 'fas fa-layer-group'
            }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Card>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'attributes' && <AttributesAndCategories />}
        {activeTab === 'variants' && <VariantsAndCustomizations />}
      </div>

      {/* Quick Help */}
      <Card className="bg-blue-50 border-blue-100">
        <div className="p-4">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            <i className="fas fa-info-circle mr-2"></i>
            Quick Guide
          </h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p>
              <strong>Products:</strong> Manage your product catalog, including both ready-made and custom products.
            </p>
            <p>
              <strong>Attributes & Categories:</strong> Define product attributes and organize your catalog structure.
            </p>
            <p>
              <strong>Variants & Customizations:</strong> Set up product variations and customization options.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Products;