import React, { useState } from 'react';
import utils from './utils'; // Import the aggregated utilities
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import { FormField, FormSection, FormRow, FormActions } from '../../../components/Form';
import { Toast } from '../../../components/Toast';
import Tabs from '../../../components/Tabs';
import Badge from '../../../components/Badge';
import Input from '../../../components/Input';

const VariantsAndCustomizations = () => {
  const [activeTab, setActiveTab] = useState('variants');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data - replace with actual API calls
  const [variantTemplates, setVariantTemplates] = useState([
    {
      id: 1,
      name: 'Size and Color',
      attributes: ['Size', 'Color'],
      combinations: [
        { Size: 'S', Color: 'Red', price_modifier: 0, stock: 10 },
        { Size: 'M', Color: 'Red', price_modifier: 0, stock: 15 },
        { Size: 'L', Color: 'Blue', price_modifier: 50, stock: 20 }
      ],
      appliesTo: ['Sarees', 'Lehengas']
    }
  ]);

  const [customizationTemplates, setCustomizationTemplates] = useState([
    {
      id: 1,
      name: 'Blouse Customization',
      options: [
        {
          name: 'Blouse Size',
          type: 'measurement',
          required: true,
          fields: ['Length', 'Bust', 'Waist', 'Shoulder']
        },
        {
          name: 'Sleeve Style',
          type: 'select',
          required: true,
          options: ['Short', 'Long', 'Three-Quarter'],
          price_modifiers: {
            'Short': 0,
            'Long': 200,
            'Three-Quarter': 150
          }
        },
        {
          name: 'Embroidery Design',
          type: 'select',
          required: false,
          options: ['Basic', 'Premium', 'Luxury'],
          price_modifiers: {
            'Basic': 0,
            'Premium': 500,
            'Luxury': 1000
          }
        }
      ],
      appliesTo: ['Sarees', 'Blouses']
    }
  ]);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item) => {
    if (activeTab === 'variants') {
      setVariantTemplates(templates => templates.filter(t => t.id !== item.id));
    } else {
      setCustomizationTemplates(templates => templates.filter(t => t.id !== item.id));
    }
    Toast.success(`${activeTab === 'variants' ? 'Variant' : 'Customization'} template deleted`);
  };

  const handleSubmit = (formData) => {
    if (activeTab === 'variants') {
      if (selectedItem) {
        setVariantTemplates(templates =>
          templates.map(t => t.id === selectedItem.id ? { ...t, ...formData } : t)
        );
      } else {
        setVariantTemplates(templates => [...templates, { id: Date.now(), ...formData }]);
      }
    } else {
      if (selectedItem) {
        setCustomizationTemplates(templates =>
          templates.map(t => t.id === selectedItem.id ? { ...t, ...formData } : t)
        );
      } else {
        setCustomizationTemplates(templates => [...templates, { id: Date.now(), ...formData }]);
      }
    }
    setIsModalOpen(false);
    Toast.success(`${activeTab === 'variants' ? 'Variant' : 'Customization'} template saved`);
  };

  const VariantTemplateForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
      name: '',
      attributes: [],
      combinations: [],
      appliesTo: [],
      ...initialData
    });

    const [newCombination, setNewCombination] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleAttributeToggle = (attribute) => {
      setFormData(prev => ({
        ...prev,
        attributes: prev.attributes.includes(attribute)
          ? prev.attributes.filter(a => a !== attribute)
          : [...prev.attributes, attribute]
      }));
    };

    const handleAddCombination = () => {
      if (Object.keys(newCombination).length === formData.attributes.length) {
        setFormData(prev => ({
          ...prev,
          combinations: [...prev.combinations, { ...newCombination, price_modifier: 0, stock: 0 }]
        }));
        setNewCombination({});
      }
    };

    const handleRemoveCombination = (index) => {
      setFormData(prev => ({
        ...prev,
        combinations: prev.combinations.filter((_, i) => i !== index)
      }));
    };

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <FormSection>
          <FormField
            label="Template Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Attributes
            </label>
            <div className="space-y-2">
              {['Size', 'Color', 'Material'].map(attr => (
                <FormField
                  key={attr}
                  type="checkbox"
                  label={attr}
                  checked={formData.attributes.includes(attr)}
                  onChange={() => handleAttributeToggle(attr)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Combinations
            </label>
            
            {/* Add new combination */}
            <div className="flex space-x-2">
              {formData.attributes.map(attr => (
                <Input
                  key={attr}
                  placeholder={attr}
                  value={newCombination[attr] || ''}
                  onChange={(e) => setNewCombination(prev => ({
                    ...prev,
                    [attr]: e.target.value
                  }))}
                />
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddCombination}
              >
                Add
              </Button>
            </div>

            {/* Combinations table */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {formData.attributes.map(attr => (
                    <th key={attr} className="px-4 py-2">{attr}</th>
                  ))}
                  <th className="px-4 py-2">Price Modifier</th>
                  <th className="px-4 py-2">Stock</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.combinations.map((combo, index) => (
                  <tr key={index}>
                    {formData.attributes.map(attr => (
                      <td key={attr} className="px-4 py-2">
                        {combo[attr]}
                      </td>
                    ))}
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={combo.price_modifier}
                        onChange={(e) => {
                          const combinations = [...formData.combinations];
                          combinations[index].price_modifier = Number(e.target.value);
                          setFormData(prev => ({ ...prev, combinations }));
                        }}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={combo.stock}
                        onChange={(e) => {
                          const combinations = [...formData.combinations];
                          combinations[index].stock = Number(e.target.value);
                          setFormData(prev => ({ ...prev, combinations }));
                        }}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveCombination(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FormSection>

        <FormActions>
          <Button type="submit" variant="primary">
            Save Template
          </Button>
        </FormActions>
      </form>
    );
  };

  const CustomizationTemplateForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
      name: '',
      options: [],
      appliesTo: [],
      ...initialData
    });

    const handleAddOption = () => {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, {
          name: '',
          type: 'text',
          required: false,
          options: [],
          price_modifiers: {}
        }]
      }));
    };

    const handleOptionChange = (index, field, value) => {
      const options = [...formData.options];
      options[index] = { ...options[index], [field]: value };
      setFormData(prev => ({ ...prev, options }));
    };

    const handleRemoveOption = (index) => {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    };

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <FormSection>
          <FormField
            label="Template Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Customization Options
              </label>
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddOption}
              >
                Add Option
              </Button>
            </div>

            {formData.options.map((option, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      Option {index + 1}
                    </h4>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>

                  <FormRow>
                    <FormField
                      label="Option Name"
                      value={option.name}
                      onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                      required
                    />
                    <FormField
                      type="select"
                      label="Option Type"
                      value={option.type}
                      onChange={(e) => handleOptionChange(index, 'type', e.target.value)}
                      options={[
                        { value: 'text', label: 'Text Input' },
                        { value: 'select', label: 'Selection' },
                        { value: 'measurement', label: 'Measurements' },
                        { value: 'color', label: 'Color Picker' }
                      ]}
                    />
                  </FormRow>

                  <FormField
                    type="checkbox"
                    label="Required"
                    checked={option.required}
                    onChange={(e) => handleOptionChange(index, 'required', e.target.checked)}
                  />

                  {option.type === 'select' && (
                    <div className="space-y-2">
                      <FormField
                        label="Options (comma-separated)"
                        value={option.options.join(', ')}
                        onChange={(e) => handleOptionChange(
                          index,
                          'options',
                          e.target.value.split(',').map(o => o.trim())
                        )}
                      />
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Price Modifiers
                        </label>
                        {option.options.map((opt, optIndex) => (
                          <FormField
                            key={optIndex}
                            type="number"
                            label={opt}
                            value={option.price_modifiers[opt] || 0}
                            onChange={(e) => {
                              const price_modifiers = {
                                ...option.price_modifiers,
                                [opt]: Number(e.target.value)
                              };
                              handleOptionChange(index, 'price_modifiers', price_modifiers);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {option.type === 'measurement' && (
                    <FormField
                      label="Measurement Fields (comma-separated)"
                      value={option.fields ? option.fields.join(', ') : ''}
                      onChange={(e) => handleOptionChange(
                        index,
                        'fields',
                        e.target.value.split(',').map(f => f.trim())
                      )}
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </FormSection>

        <FormActions>
          <Button type="submit" variant="primary">
            Save Template
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
          Variants & Customizations
        </h1>
        <Button variant="primary" onClick={handleAdd}>
          <i className="fas fa-plus mr-2"></i>
          Add Template
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <Tabs
          tabs={[
            { id: 'variants', label: 'Variant Templates' },
            { id: 'customizations', label: 'Customization Templates' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Card>

      {/* Content */}
      <Card>
        <Table
          columns={[
            { key: 'name', label: 'Name' },
            {
              key: activeTab === 'variants' ? 'attributes' : 'options',
              label: activeTab === 'variants' ? 'Attributes' : 'Options',
              render: (value) => (
                <div className="flex flex-wrap gap-1">
                  {(activeTab === 'variants' ? value : value.map(o => o.name)).map((item, index) => (
                    <Badge key={index} variant="info" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              )
            },
            {
              key: 'appliesTo',
              label: 'Applies To',
              render: (value) => (
                <div className="flex flex-wrap gap-1">
                  {value.map((item, index) => (
                    <Badge key={index} variant="gray" className="text-xs">
                      {item}
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
                    onClick={() => handleEdit(row)}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(row)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              )
            }
          ]}
          data={activeTab === 'variants' ? variantTemplates : customizationTemplates}
        />
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${selectedItem ? 'Edit' : 'Add'} ${
          activeTab === 'variants' ? 'Variant' : 'Customization'
        } Template`}
        size="xl"
      >
        {activeTab === 'variants' ? (
          <VariantTemplateForm
            onSubmit={handleSubmit}
            initialData={selectedItem}
          />
        ) : (
          <CustomizationTemplateForm
            onSubmit={handleSubmit}
            initialData={selectedItem}
          />
        )}
      </Modal>
    </div>
  );
};

export default VariantsAndCustomizations;