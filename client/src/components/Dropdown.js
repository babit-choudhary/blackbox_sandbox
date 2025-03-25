import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  trigger,
  items,
  align = 'left',
  width = 'w-48',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getAlignmentClasses = () => {
    switch (align) {
      case 'right':
        return 'right-0';
      case 'center':
        return 'left-1/2 transform -translate-x-1/2';
      default:
        return 'left-0';
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 mt-2 ${width} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
            ${getAlignmentClasses()}
            ${className}
          `}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider ? (
                  <div className="border-t border-gray-100 my-1"></div>
                ) : item.header ? (
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.header}
                  </div>
                ) : (
                  <button
                    className={`
                      ${item.className || ''}
                      ${item.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}
                      group flex items-center w-full px-4 py-2 text-sm text-gray-700
                    `}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onClick?.();
                        setIsOpen(false);
                      }
                    }}
                    disabled={item.disabled}
                    role="menuitem"
                  >
                    {item.icon && (
                      <i className={`${item.icon} mr-3 text-gray-400 group-hover:text-gray-500`}></i>
                    )}
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto">{item.badge}</span>
                    )}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Select Dropdown
export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left
          focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer'}
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
        disabled={disabled}
      >
        <span className={`block truncate ${!selectedOption && 'text-gray-500'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <i className="fas fa-chevron-down text-gray-400"></i>
        </span>
      </button>

      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul
            className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`
                  ${value === option.value ? 'bg-indigo-50 text-indigo-900' : 'text-gray-900'}
                  cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50
                `}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
              >
                <div className="flex items-center">
                  {option.icon && (
                    <i className={`${option.icon} mr-3 text-gray-400`}></i>
                  )}
                  <span className={`block truncate ${value === option.value ? 'font-semibold' : 'font-normal'}`}>
                    {option.label}
                  </span>
                </div>

                {value === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Example usage:
/*
import Dropdown, { Select } from './components/Dropdown';

// Basic Dropdown
<Dropdown
  trigger={
    <button className="btn-primary">
      Options <i className="fas fa-chevron-down ml-2"></i>
    </button>
  }
  items={[
    {
      label: 'Edit',
      icon: 'fas fa-edit',
      onClick: () => console.log('Edit clicked')
    },
    {
      label: 'Delete',
      icon: 'fas fa-trash',
      onClick: () => console.log('Delete clicked'),
      className: 'text-red-600 hover:text-red-700'
    },
    { divider: true },
    {
      label: 'Archive',
      icon: 'fas fa-archive',
      onClick: () => console.log('Archive clicked')
    }
  ]}
/>

// Dropdown with Headers and Badges
<Dropdown
  trigger={
    <button className="btn-secondary">
      More Actions
    </button>
  }
  items={[
    { header: 'Actions' },
    {
      label: 'Notifications',
      icon: 'fas fa-bell',
      badge: <span className="bg-red-100 text-red-800 text-xs px-2 rounded-full">5</span>
    },
    { divider: true },
    {
      label: 'Settings',
      icon: 'fas fa-cog'
    }
  ]}
  align="right"
/>

// Select Dropdown
const [selectedValue, setSelectedValue] = useState('');

<Select
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', icon: 'fas fa-star' }
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>

// Disabled Select with Error
<Select
  options={[...]}
  value={selectedValue}
  onChange={setSelectedValue}
  disabled
  error="This field is required"
/>
*/

export default Dropdown;