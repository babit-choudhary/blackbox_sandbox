import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ items, customSeparator }) => {
  const location = useLocation();

  // If no items are provided, generate from current path
  if (!items) {
    const paths = location.pathname.split('/').filter(Boolean);
    items = paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        url
      };
    });
  }

  // Default separator icon
  const Separator = () => (
    <span className="text-gray-400 mx-2">
      {customSeparator || <i className="fas fa-chevron-right text-xs"></i>}
    </span>
  );

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {/* Home */}
        <li>
          <div>
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-500"
              title="Home"
            >
              <i className="fas fa-home"></i>
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>

        {/* Separator after Home */}
        <li>
          <Separator />
        </li>

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              {index > 0 && <Separator />}
              {index === items.length - 1 ? (
                // Current page (not clickable)
                <span className="text-gray-700 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                // Clickable link
                <Link
                  to={item.url}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Enhanced Breadcrumb with dropdown for mobile
export const ResponsiveBreadcrumb = ({ items, customSeparator }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show only first and last items on mobile
  const getMobileItems = () => {
    if (items.length <= 2) return items;
    return [items[0], items[items.length - 1]];
  };

  return (
    <div className="relative">
      {/* Desktop Breadcrumb */}
      <div className="hidden md:block">
        <Breadcrumb items={items} customSeparator={customSeparator} />
      </div>

      {/* Mobile Breadcrumb */}
      <div className="md:hidden">
        {items.length > 2 ? (
          <div className="flex items-center" ref={dropdownRef}>
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <i className="fas fa-home"></i>
            </Link>
            <span className="text-gray-400 mx-2">
              <i className="fas fa-chevron-right text-xs"></i>
            </span>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <span className="text-gray-400 mx-2">
              <i className="fas fa-chevron-right text-xs"></i>
            </span>
            <span className="text-gray-700 font-medium">
              {items[items.length - 1].label}
            </span>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu">
                  {items.slice(1, -1).map((item, index) => (
                    <Link
                      key={index}
                      to={item.url}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Breadcrumb 
            items={getMobileItems()} 
            customSeparator={customSeparator} 
          />
        )}
      </div>
    </div>
  );
};

// Example usage:
/*
import Breadcrumb from './components/Breadcrumb';

// Basic usage with auto-generated items from current path
<Breadcrumb />

// Custom items
<Breadcrumb
  items={[
    { label: 'Products', url: '/products' },
    { label: 'Categories', url: '/products/categories' },
    { label: 'Electronics', url: '/products/categories/electronics' }
  ]}
/>

// Custom separator
<Breadcrumb
  items={items}
  customSeparator={<span className="mx-2">/</span>}
/>

// Responsive breadcrumb
<ResponsiveBreadcrumb
  items={[
    { label: 'Products', url: '/products' },
    { label: 'Categories', url: '/products/categories' },
    { label: 'Electronics', url: '/products/categories/electronics' },
    { label: 'Smartphones', url: '/products/categories/electronics/smartphones' }
  ]}
/>
*/

export default Breadcrumb;