import React, { useState } from 'react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import { FormField, FormSection, FormActions } from '../../../components/Form';
import { Toast } from '../../../components/Toast';
import Tabs from '../../../components/Tabs';
import Badge from '../../../components/Badge';

const AttributesAndCategories = () => {
  const [activeTab, setActiveTab] = useState('attributes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data - replace with actual API calls
  const [attributes, setAttributes] = useState([
    {
      id: 1,
      name: 'Size',
      type: 'select',
      options: ['S', 'M', 'L', 'XL'],
      required: true,
      appliesTo: ['ready-made', 'custom']
    },
    {
      id: 2,
      name: 'Color',
      type: 'color',
      options: ['Red', 'Blue', 'Green'],
      required: true,
      appliesTo: ['ready-made']
    },
    {
      id: 3,
      name: 'Material',
      type: 'select',
      options: ['Cotton', 'Silk', 'Polyester'],
      required: false,
      appliesTo: ['ready-made', 'custom']
    }
  ]);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Sarees',
      slug: 'sarees',
      parent: null,
      attributes: ['Size', 'Color', 'Material'],
      productCount: 150
    },
    {
      id: 2,
      name: 'Lehengas',
      slug: 'lehengas',
      parent: null,
      attributes: ['Size', 'Color'],
      productCount: 75
    }
  ]);

  const handleAdd = (type) => {
    setModalType(type);
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item, type) => {
    setModalType(type);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item, type) => {
    // Handle deletion - API call would go here
    if (type === 'attribute') {
      setAttributes(attributes.filter(attr => attr.id !== item.id));
    } else {
      setCategories(categories.filter(cat => cat.id !== item.id));
    }
    Toast.success(`${type === 'attribute' ? 'Attribute' : 'Category'} deleted successfully`);
  };

  const handleSubmit = (formData) => {
    // Handle form submission - API call would go here
    if (modalType === 'attribute') {
      if (selectedItem) {
        setAttributes(attributes.map(attr =>
          attr.id === selectedItem.id ? { ...attr, ...formData } : attr
        ));
      } else {
        setAttributes([...attributes, { id: Date.now(), ...formData }]);
      }
    } else {
      if (selectedItem) {
        setCategories(categories.map(cat =>
          cat.id === selectedItem.id ? { ...cat, ...formData } : cat
        ));
      } else {
        setCategories([...categories, { id: Date.now(), ...formData }]);
      }
    }
    setIsModalOpen(false);
    Toast.success(`${modalType === 'attribute' ? 'Attribute' : 'Category'} saved successfully`);
  };

  const attributeColumns = [
    { key: 'name', label: 'Name' },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <Badge variant="info">{value}</Badge>
      )
    },
    {
      key: 'options',
      label: 'Options',
      render: (options) => (
        <div className="flex flex-wrap gap-1">
          {options.map((option, index) => (
            <Badge key={index} variant="gray" className="text-xs">
              {option}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: 'required',
      label: 'Required',
      render: (value) => (
        <Badge variant={value ? 'success' : 'gray'}>
          {value ? 'Yes' : 'No'}
        </Badge>
      )
    },
    {
      key: 'appliesTo',
      label: 'Applies To',
      render: (values) => (
        <div className="flex gap-1">
          {values.map((value, index) => (
            <Badge key={index} variant="primary" className="text-xs">
              {value}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEdit(row, 'attribute')}
          >
            <i className="fas fa-edit"></i>
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row, 'attribute')}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      )
    }
  ];

  const categoryColumns = [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'parent',
      label: 'Parent',
      render: (value) => value || '-'
    },
    {
      key: 'attributes',
      label: 'Attributes',
      render: (attributes) => (
        <div className="flex flex-wrap gap-1">
          {attributes.map((attr, index) => (
            <Badge key={index} variant="info" className="text-xs">
              {attr}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: 'productCount',
      label: 'Products',
      render: (value) => (
        <Badge variant="gray">{value}</Badge>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEdit(row, 'category')}
          >
            <i className="fas fa-edit"></i>
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row, 'category')}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      )
    }
  ];

  const AttributeForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
      name: '',
      type: 'text',
      options: [],
      required: false,
      appliesTo: ['ready-made'],
      ...initialData
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    const handleOptionsChange = (e) => {
      setFormData(prev => ({
        ...prev,
        options: e.target.value.split(',').map(opt => opt.trim())
      }));
    };

    const handleAppliesToChange = (value) => {
      setFormData(prev => ({
        ...prev,
        appliesTo: prev.appliesTo.includes(value)
          ? prev.appliesTo.filter(v => v !== value)
          : [...prev.appliesTo, value]
      }));
    };

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <FormSection>
          <FormField
            label="Attribute Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormField
            type="select"
            label="Attribute Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={[
              { value: 'text', label: 'Text' },
              { value: 'select', label: 'Select' },
              { value: 'color', label: 'Color' },
              { value: 'number', label: 'Number' }
            ]}
          />
          {['select', 'color'].includes(formData.type) && (
            <FormField
              label="Options (comma-separated)"
              name="options"
              value={formData.options.join(', ')}
              onChange={handleOptionsChange}
            />
          )}
          <FormField
            type="checkbox"
            label="Required"
            name="required"
            checked={formData.required}
            onChange={handleChange}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Applies To
            </label>
            <div className="flex space-x-4">
              <FormField
                type="checkbox"
                label="Ready-made Products"
                checked={formData.appliesTo.includes('ready-made')}
                onChange={() => handleAppliesToChange('ready-made')}
              />
              <FormField
                type="checkbox"
                label="Custom Products"
                checked={formData.appliesTo.includes('custom')}
                onChange={() => handleAppliesToChange('custom')}
              />
            </div>
          </div>
        </FormSection>
        <FormActions>
          <Button type="submit" variant="primary">
            Save Attribute
          </Button>
        </FormActions>
      </form>
    );
  };

  const CategoryForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
      name: '',
      slug: '',
      parent: '',
      attributes: [],
      ...initialData
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleAttributeToggle = (attributeName) => {
      setFormData(prev => ({
        ...prev,
        attributes: prev.attributes.includes(attributeName)
          ? prev.attributes.filter(attr => attr !== attributeName)
          : [...prev.attributes, attributeName]
      }));
    };

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <FormSection>
          <FormField
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormField
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          <FormField
            type="select"
            label="Parent Category"
            name="parent"
            value={formData.parent || ''}
            onChange={handleChange}
            options={[
              { value: '', label: 'None' },
              ...categories
                .filter(cat => cat.id !== initialData?.id)
                .map(cat => ({
                  value: cat.name,
                  label: cat.name
                }))
            ]}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Attributes
            </label>
            <div className="space-y-2">
              {attributes.map(attr => (
                <FormField
                  key={attr.id}
                  type="checkbox"
                  label={attr.name}
                  checked={formData.attributes.includes(attr.name)}
                  onChange={() => handleAttributeToggle(attr.name)}
                />
              ))}
            </div>
          </div>
        </FormSection>
        <FormActions>
          <Button type="submit" variant="primary">
            Save Category
          </Button>
        </FormActions>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Attributes & Categories
        </h1>
      </div>

      {/* Tabs */}
      <Card>
        <Tabs
          tabs={[
            { id: 'attributes', label: 'Attributes' },
            { id: 'categories', label: 'Categories' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Card>

      {/* Content */}
      <Card>
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={() => handleAdd(activeTab === 'attributes' ? 'attribute' : 'category')}
            >
              <i className="fas fa-plus mr-2"></i>
              Add {activeTab === 'attributes' ? 'Attribute' : 'Category'}
            </Button>
          </div>

          <Table
            columns={activeTab === 'attributes' ? attributeColumns : categoryColumns}
            data={activeTab === 'attributes' ? attributes : categories}
            pagination
          />
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${selectedItem ? 'Edit' : 'Add'} ${
          modalType === 'attribute' ? 'Attribute' : 'Category'
        }`}
      >
        {modalType === 'attribute' ? (
          <AttributeForm
            onSubmit={handleSubmit}
            initialData={selectedItem}
          />
        ) : (
          <CategoryForm
            onSubmit={handleSubmit}
            initialData={selectedItem}
          />
        )}
      </Modal>
    </div>
  );
};

export default AttributesAndCategories;