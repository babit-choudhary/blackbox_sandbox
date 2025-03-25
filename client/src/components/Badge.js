import React from 'react';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  dot = false,
  removable = false,
  onRemove,
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'gray':
        return 'bg-gray-100 text-gray-800';
      case 'purple':
        return 'bg-purple-100 text-purple-800';
      case 'indigo':
        return 'bg-indigo-100 text-indigo-800';
      case 'pink':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-indigo-100 text-indigo-800';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'lg':
        return 'text-base px-4 py-1.5';
      default:
        return 'text-sm px-3 py-1';
    }
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${rounded ? 'rounded-full' : 'rounded'}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`
            h-2 w-2 rounded-full mr-1.5
            ${variant === 'success' && 'bg-green-400'}
            ${variant === 'danger' && 'bg-red-400'}
            ${variant === 'warning' && 'bg-yellow-400'}
            ${variant === 'info' && 'bg-blue-400'}
            ${variant === 'gray' && 'bg-gray-400'}
            ${variant === 'purple' && 'bg-purple-400'}
            ${variant === 'indigo' && 'bg-indigo-400'}
            ${variant === 'pink' && 'bg-pink-400'}
          `}
        />
      )}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className={`
            ml-1 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${variant === 'success' && 'hover:bg-green-200 focus:ring-green-500'}
            ${variant === 'danger' && 'hover:bg-red-200 focus:ring-red-500'}
            ${variant === 'warning' && 'hover:bg-yellow-200 focus:ring-yellow-500'}
            ${variant === 'info' && 'hover:bg-blue-200 focus:ring-blue-500'}
            ${variant === 'gray' && 'hover:bg-gray-200 focus:ring-gray-500'}
            ${variant === 'purple' && 'hover:bg-purple-200 focus:ring-purple-500'}
            ${variant === 'indigo' && 'hover:bg-indigo-200 focus:ring-indigo-500'}
            ${variant === 'pink' && 'hover:bg-pink-200 focus:ring-pink-500'}
          `}
        >
          <span className="sr-only">Remove</span>
          <i className="fas fa-times text-xs"></i>
        </button>
      )}
    </span>
  );
};

// Status Badge
export const StatusBadge = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'success':
        return {
          variant: 'success',
          icon: 'fas fa-check'
        };
      case 'pending':
      case 'processing':
        return {
          variant: 'warning',
          icon: 'fas fa-clock'
        };
      case 'inactive':
      case 'failed':
      case 'error':
        return {
          variant: 'danger',
          icon: 'fas fa-times'
        };
      case 'draft':
        return {
          variant: 'gray',
          icon: 'fas fa-pencil-alt'
        };
      default:
        return {
          variant: 'info',
          icon: 'fas fa-info'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} size={size} rounded>
      <i className={`${config.icon} mr-1`}></i>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// Counter Badge
export const CounterBadge = ({ count, variant = 'danger', max = 99 }) => {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <Badge variant={variant} size="sm" rounded>
      {displayCount}
    </Badge>
  );
};

// Tag Badge
export const TagBadge = ({ label, onRemove }) => {
  return (
    <Badge variant="gray" removable onRemove={onRemove}>
      {label}
    </Badge>
  );
};

// Example usage:
/*
import Badge, { StatusBadge, CounterBadge, TagBadge } from './components/Badge';

// Basic Badge
<Badge variant="success">
  Completed
</Badge>

// Badge with dot
<Badge variant="warning" dot>
  Pending
</Badge>

// Removable Badge
<Badge variant="gray" removable onRemove={() => console.log('removed')}>
  Remove me
</Badge>

// Status Badge
<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="inactive" />

// Counter Badge
<CounterBadge count={5} />
<CounterBadge count={150} max={99} />

// Tag Badge
<TagBadge
  label="React"
  onRemove={() => console.log('tag removed')}
/>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// Different variants
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="gray">Gray</Badge>
<Badge variant="purple">Purple</Badge>
<Badge variant="indigo">Indigo</Badge>
<Badge variant="pink">Pink</Badge>

// Rounded badges
<Badge rounded>Rounded</Badge>
*/

export default Badge;