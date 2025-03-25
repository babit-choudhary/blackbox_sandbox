import { VALIDATION, ERROR_MESSAGES, PRODUCT_TYPES } from '../config';

// Product Validation
export const validateProduct = (product) => {
  const errors = {};

  if (!product.name) {
    errors.name = ERROR_MESSAGES.REQUIRED;
  } else if (product.name.length < VALIDATION.PRODUCT.NAME.MIN_LENGTH) {
    errors.name = `Name must be at least ${VALIDATION.PRODUCT.NAME.MIN_LENGTH} characters`;
  }

  if (!product.sku) {
    errors.sku = ERROR_MESSAGES.REQUIRED;
  } else if (!VALIDATION.PRODUCT.SKU.PATTERN.test(product.sku)) {
    errors.sku = ERROR_MESSAGES.INVALID_SKU;
  }

  if (!product.price) {
    errors.price = ERROR_MESSAGES.REQUIRED;
  } else if (isNaN(product.price) || product.price < 0) {
    errors.price = ERROR_MESSAGES.INVALID_PRICE;
  }

  return errors;
};

// SKU Generation
export const generateSKU = (name, category, type = PRODUCT_TYPES.READY_MADE) => {
  const prefix = type === PRODUCT_TYPES.CUSTOM ? 'CST' : 'PRD';
  const categoryCode = category ? category.substring(0, 3).toUpperCase() : 'GEN';
  const nameCode = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  
  return `${prefix}-${categoryCode}-${nameCode}-${timestamp}`;
};

// Price Formatting
export const formatPrice = (price, currency = '₹') => {
  return `${currency}${Number(price).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

// Product Filtering
export const filterProducts = (products, filters = {}) => {
  return products.filter(product => {
    let matches = true;

    if (filters.category) {
      matches = matches && product.category === filters.category;
    }
    if (filters.status) {
      matches = matches && product.status === filters.status;
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      matches = matches && (
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search)
      );
    }

    return matches;
  });
};

// Product Sorting
export const sortProducts = (products, { field = 'name', direction = 'asc' }) => {
  return [...products].sort((a, b) => {
    let comparison = 0;
    
    switch (field) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'created':
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
      default:
        comparison = 0;
    }

    return direction === 'desc' ? -comparison : comparison;
  });
};

export default {
  validateProduct,
  generateSKU,
  formatPrice,
  filterProducts,
  sortProducts
};