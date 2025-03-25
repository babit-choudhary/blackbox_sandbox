import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  rounded = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400`;
      case 'secondary':
        return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-gray-100`;
      case 'success':
        return `${baseClasses} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400`;
      case 'danger':
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400`;
      case 'warning':
        return `${baseClasses} bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 disabled:bg-yellow-400`;
      case 'info':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400`;
      case 'light':
        return `${baseClasses} bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 disabled:bg-gray-50`;
      case 'dark':
        return `${baseClasses} bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500 disabled:bg-gray-600`;
      case 'link':
        return `${baseClasses} bg-transparent text-indigo-600 hover:text-indigo-800 focus:ring-0 disabled:text-indigo-400`;
      case 'outline-primary':
        return `${baseClasses} border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 disabled:border-indigo-400 disabled:text-indigo-400`;
      case 'outline-danger':
        return `${baseClasses} border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500 disabled:border-red-400 disabled:text-red-400`;
      default:
        return baseClasses;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'px-2.5 py-1.5 text-xs';
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      case 'xl':
        return 'px-8 py-4 text-xl';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'xs':
        return 'text-xs';
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${rounded ? 'rounded-full' : 'rounded-md'}
        ${disabled ? 'cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <i className={`${icon} ${getIconSize()} mr-2`}></i>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <i className={`${icon} ${getIconSize()} ml-2`}></i>
          )}
        </>
      )}
    </button>
  );
};

// Button Group
export const ButtonGroup = ({ children, vertical = false, className = '' }) => {
  return (
    <div
      className={`
        inline-flex ${vertical ? 'flex-col' : ''}
        ${className}
      `}
      role="group"
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        return React.cloneElement(child, {
          className: `
            ${child.props.className || ''}
            ${vertical
              ? index === 0
                ? 'rounded-b-none'
                : index === children.length - 1
                ? 'rounded-t-none'
                : 'rounded-none'
              : index === 0
              ? 'rounded-r-none'
              : index === children.length - 1
              ? 'rounded-l-none'
              : 'rounded-none'
            }
            ${vertical
              ? index !== children.length - 1
                ? 'border-b-0'
                : ''
              : index !== children.length - 1
              ? 'border-r-0'
              : ''
            }
          `
        });
      })}
    </div>
  );
};

// Icon Button
export const IconButton = ({
  icon,
  variant = 'primary',
  size = 'md',
  rounded = true,
  ...props
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'p-1 text-xs';
      case 'sm':
        return 'p-1.5 text-sm';
      case 'lg':
        return 'p-3 text-lg';
      case 'xl':
        return 'p-4 text-xl';
      default:
        return 'p-2 text-base';
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      rounded={rounded}
      className={getSizeClasses()}
      {...props}
    >
      <i className={icon}></i>
    </Button>
  );
};

// Example usage:
/*
import Button, { ButtonGroup, IconButton } from './components/Button';

// Basic Button
<Button variant="primary">
  Click Me
</Button>

// Button with Icon
<Button
  variant="primary"
  icon="fas fa-save"
  iconPosition="left"
>
  Save
</Button>

// Loading Button
<Button loading>
  Processing...
</Button>

// Button Group
<ButtonGroup>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>

// Vertical Button Group
<ButtonGroup vertical>
  <Button variant="secondary">Top</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="secondary">Bottom</Button>
</ButtonGroup>

// Icon Button
<IconButton
  icon="fas fa-heart"
  variant="danger"
  size="lg"
/>

// Different Variants
<div className="space-x-2">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="success">Success</Button>
  <Button variant="danger">Danger</Button>
  <Button variant="warning">Warning</Button>
  <Button variant="info">Info</Button>
  <Button variant="light">Light</Button>
  <Button variant="dark">Dark</Button>
  <Button variant="link">Link</Button>
  <Button variant="outline-primary">Outline Primary</Button>
  <Button variant="outline-danger">Outline Danger</Button>
</div>

// Different Sizes
<div className="space-x-2">
  <Button size="xs">Extra Small</Button>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra Large</Button>
</div>
*/

export default Button;