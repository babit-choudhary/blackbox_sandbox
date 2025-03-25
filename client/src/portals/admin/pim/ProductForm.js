import React, { useState } from 'react';
import Input from '../../../components/Input';
import utils from './utils'; // Import the aggregated utilities
import { FormField, FormSection, FormRow, FormActions } from '../../../components/Form';
import Button from '../../../components/Button';
import FileUpload from '../../../components/FileUpload';
import { Toast } from '../../../components/Toast';

const ProductForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  type = 'ready-made' // 'ready-made' or 'custom'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    images: [],
    attributes: [],
    variants: [],
    customizationOptions: [],
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleAttributeChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) =>
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  const addAttribute = () => {
    setFormData(prev => ({
      ...prev,
      attributes: [...prev.attributes, { name: '', value: '' }]
    }));
  };

  const removeAttribute = (index) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, {
        sku: '',
        attributes: {},
        price: '',
        stock: ''
      }]
    }));
  };

  const removeVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleCustomizationOptionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      customizationOptions: prev.customizationOptions.map((option, i) =>
        i === index ? { ...option, [field]: value } : option
      )
    }));
  };

  const addCustomizationOption = () => {
    setFormData(prev => ({
      ...prev,
      customizationOptions: [...prev.customizationOptions, {
        name: '',
        type: 'text',
        required: false,
        options: []
      }]
    }));
  };

  const removeCustomizationOption = (index) => {
    setFormData(prev => ({
      ...prev,
      customizationOptions: prev.customizationOptions.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Basic validation using utils
    const productErrors = utils.product.validateProduct(formData);
    Object.assign(newErrors, productErrors);

    // Variant validation using utils
    formData.variants.forEach((variant, index) => {
      const variantErrors = utils.variant.validateVariant(variant);
      Object.assign(newErrors, variantErrors);
    });

    // Custom product validation
    if (type === 'custom') {
      formData.customizationOptions.forEach((option, index) => {
        if (!option.name) newErrors[`customization_${index}_name`] = 'Option name is required';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Generate SKUs for variants
      const updatedVariants = formData.variants.map(variant => ({
        ...variant,
        sku: utils.variant.generateVariantSKU(variant.sku, formData.sku) // Generate SKU based on product SKU
      }));
      onSubmit({ ...formData, variants: updatedVariants });
    } else {
      Toast.error('Please fix the errors before submitting');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <FormSection
        title="Basic Information"
        description="Enter the basic product details"
      >
        <FormRow>
          <FormField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <FormField
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            error={errors.sku}
            required
          />
        </FormRow>

        <FormField
          type="textarea"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />

        <FormRow>
          <FormField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <FormField
            type="number"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
            required
          />
          <FormField
            type="number"
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            error={errors.stock}
          />
        </FormRow>
      </FormSection>

      {/* Images */}
      <FormSection
        title="Product Images"
        description="Upload product images (maximum 5 images)"
      >
        <FileUpload
          accept="image/*"
          multiple
          maxFiles={5}
          onUpload={handleImageUpload}
          preview
        />
      </FormSection>

      {/* Attributes */}
      <FormSection
        title="Product Attributes"
        description="Add additional product attributes"
      >
        {formData.attributes.map((attribute, index) => (
          <FormRow key={index}>
            <FormField
              label="Attribute Name"
              value={attribute.name}
              onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
            />
            <FormField
              label="Attribute Value"
              value={attribute.value}
              onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
            />
            <Button
              variant="danger"
              onClick={() => removeAttribute(index)}
              className="mt-8"
            >
              Remove
            </Button>
          </FormRow>
        ))}
        <Button variant="secondary" onClick={addAttribute}>
          Add Attribute
        </Button>
      </FormSection>

      {/* Variants */}
      <FormSection
        title="Product Variants"
        description="Add product variants with different attributes"
      >
        {formData.variants.map((variant, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <FormRow>
              <FormField
                label="Variant SKU"
                value={variant.sku}
                onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                error={errors[`variant_${index}_sku`]}
                required
              />
              <FormField
                type="number"
                label="Variant Price"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                error={errors[`variant_${index}_price`]}
                required
              />
              <FormField
                type="number"
                label="Variant Stock"
                value={variant.stock}
                onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
              />
            </FormRow>
            <Button
              variant="danger"
              onClick={() => removeVariant(index)}
            >
              Remove Variant
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={addVariant}>
          Add Variant
        </Button>
      </FormSection>

      {/* Customization Options (for custom products) */}
      {type === 'custom' && (
        <FormSection
          title="Customization Options"
          description="Define how customers can customize this product"
        >
          {formData.customizationOptions.map((option, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <FormRow>
                <FormField
                  label="Option Name"
                  value={option.name}
                  onChange={(e) => handleCustomizationOptionChange(index, 'name', e.target.value)}
                  error={errors[`customization_${index}_name`]}
                  required
                />
                <FormField
                  type="select"
                  label="Option Type"
                  value={option.type}
                  onChange={(e) => handleCustomizationOptionChange(index, 'type', e.target.value)}
                  options={[
                    { value: 'text', label: 'Text Input' },
                    { value: 'select', label: 'Selection' },
                    { value: 'color', label: 'Color Picker' },
                    { value: 'measurement', label: 'Measurements' }
                  ]}
                />
              </FormRow>
              <FormField
                type="checkbox"
                label="Required"
                checked={option.required}
                onChange={(e) => handleCustomizationOptionChange(index, 'required', e.target.checked)}
              />
              <Button
                variant="danger"
                onClick={() => removeCustomizationOption(index)}
              >
                Remove Option
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={addCustomizationOption}>
            Add Customization Option
          </Button>
        </FormSection>
      )}

      {/* Form Actions */}
      <FormActions>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Product
        </Button>
      </FormActions>
    </form>
  );
};

export default ProductForm;