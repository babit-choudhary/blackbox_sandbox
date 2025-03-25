// Product Types
export const PRODUCT_TYPES = {
  READY_MADE: 'ready-made',
  CUSTOM: 'custom'
};

// Product Statuses
export const PRODUCT_STATUSES = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived'
};

// Attribute Types
export const ATTRIBUTE_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  COLOR: 'color',
  NUMBER: 'number',
  MEASUREMENT: 'measurement',
  DATE: 'date',
  BOOLEAN: 'boolean'
};

// Customization Types
export const CUSTOMIZATION_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  COLOR: 'color',
  MEASUREMENT: 'measurement',
  FILE: 'file'
};

// Measurement Fields
export const MEASUREMENT_FIELDS = {
  BLOUSE: ['Length', 'Bust', 'Waist', 'Shoulder', 'Sleeve Length', 'Armhole'],
  LEHENGA: ['Length', 'Waist', 'Hip'],
  SAREE: ['Length', 'Blouse Size'],
  GENERAL: ['Length', 'Width', 'Height']
};

// Price Modifier Types
export const PRICE_MODIFIER_TYPES = {
  FIXED: 'fixed',
  PERCENTAGE: 'percentage'
};

// Default Values
export const DEFAULTS = {
  PAGINATION: {
    PAGE_SIZE: 10,
    PAGE_SIZES: [10, 20, 50, 100]
  },
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_FILES: 5,
    ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    DIMENSIONS: {
      THUMBNAIL: { width: 150, height: 150 },
      PREVIEW: { width: 300, height: 300 },
      FULL: { width: 1200, height: 1200 }
    }
  },
  VARIANTS: {
    MAX_COMBINATIONS: 100
  }
};

// Validation Rules
export const VALIDATION = {
  PRODUCT: {
    NAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 100
    },
    SKU: {
      PATTERN: /^[A-Za-z0-9-_]+$/,
      MIN_LENGTH: 3,
      MAX_LENGTH: 50
    },
    DESCRIPTION: {
      MAX_LENGTH: 2000
    },
    PRICE: {
      MIN: 0,
      MAX: 1000000
    }
  },
  ATTRIBUTE: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50
    },
    OPTIONS: {
      MAX_COUNT: 50
    }
  }
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_SKU: 'SKU can only contain letters, numbers, hyphens, and underscores',
  INVALID_PRICE: 'Please enter a valid price',
  INVALID_STOCK: 'Please enter a valid stock quantity',
  INVALID_IMAGE: 'Please upload a valid image file (JPG, PNG, or WebP)',
  IMAGE_TOO_LARGE: 'Image size cannot exceed 5MB',
  TOO_MANY_IMAGES: 'You can upload a maximum of 5 images',
  TOO_MANY_VARIANTS: 'The number of variant combinations exceeds the maximum limit of 100',
  DUPLICATE_SKU: 'This SKU is already in use',
  INVALID_MEASUREMENT: 'Please enter valid measurements'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  ATTRIBUTE_CREATED: 'Attribute created successfully',
  ATTRIBUTE_UPDATED: 'Attribute updated successfully',
  ATTRIBUTE_DELETED: 'Attribute deleted successfully',
  CATEGORY_CREATED: 'Category created successfully',
  CATEGORY_UPDATED: 'Category updated successfully',
  CATEGORY_DELETED: 'Category deleted successfully',
  VARIANT_CREATED: 'Variant template created successfully',
  VARIANT_UPDATED: 'Variant template updated successfully',
  VARIANT_DELETED: 'Variant template deleted successfully',
  CUSTOMIZATION_CREATED: 'Customization template created successfully',
  CUSTOMIZATION_UPDATED: 'Customization template updated successfully',
  CUSTOMIZATION_DELETED: 'Customization template deleted successfully'
};

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  ATTRIBUTES: '/api/attributes',
  CATEGORIES: '/api/categories',
  VARIANTS: '/api/variants',
  CUSTOMIZATIONS: '/api/customizations',
  IMAGES: '/api/images'
};

// Table Columns Configuration
export const TABLE_COLUMNS = {
  PRODUCTS: [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'stock', label: 'Stock', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ],
  ATTRIBUTES: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'required', label: 'Required', sortable: true },
    { key: 'options', label: 'Options' }
  ],
  VARIANTS: [
    { key: 'name', label: 'Template Name', sortable: true },
    { key: 'attributes', label: 'Attributes' },
    { key: 'combinations', label: 'Combinations', sortable: true },
    { key: 'appliesTo', label: 'Applies To' }
  ]
};

// Filter Options
export const FILTER_OPTIONS = {
  PRODUCT_STATUS: [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ],
  PRODUCT_TYPE: [
    { value: 'all', label: 'All Types' },
    { value: 'ready-made', label: 'Ready Made' },
    { value: 'custom', label: 'Custom' }
  ],
  SORT_BY: [
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
    { value: 'created_at_desc', label: 'Newest First' },
    { value: 'created_at_asc', label: 'Oldest First' }
  ]
};

export default {
  PRODUCT_TYPES,
  PRODUCT_STATUSES,
  ATTRIBUTE_TYPES,
  CUSTOMIZATION_TYPES,
  MEASUREMENT_FIELDS,
  PRICE_MODIFIER_TYPES,
  DEFAULTS,
  VALIDATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  API_ENDPOINTS,
  TABLE_COLUMNS,
  FILTER_OPTIONS
};