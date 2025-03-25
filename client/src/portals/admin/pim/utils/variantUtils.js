import { VALIDATION, ERROR_MESSAGES, PRODUCT_TYPES } from '../config';

// Variant Validation
export const validateVariant = (variant) => {
  const errors = {};

  if (!variant.name) {
    errors.name = ERROR_MESSAGES.REQUIRED;
  } else if (variant.name.length < VALIDATION.VARIANT.NAME.MIN_LENGTH) {
    errors.name = `Name must be at least ${VALIDATION.VARIANT.NAME.MIN_LENGTH} characters`;
  }

  if (!variant.option) {
    errors.option = ERROR_MESSAGES.REQUIRED;
  }

  if (variant.additionalPrice !== undefined && (isNaN(variant.additionalPrice) || variant.additionalPrice < 0)) {
    errors.additionalPrice = ERROR_MESSAGES.INVALID_PRICE;
  }

  return errors;
};

// SKU Generation for Variants
export const generateVariantSKU = (variantName, baseSKU) => {
  const variantCode = variantName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
  return `${baseSKU}-VAR-${variantCode}`;
};

// Price Formatting for Variants
export const formatVariantPrice = (variantPrice, currency = '₹') => {
  return `${currency}${Number(variantPrice).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export default {
  validateVariant,
  generateVariantSKU,
  formatVariantPrice
};