import React, { useState } from 'react';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helper,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  clearable = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClear = () => {
    onChange({ target: { name, value: '' } });
  };

  const getInputClasses = () => {
    return `
      block w-full rounded-md shadow-sm
      ${error
        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
      }
      ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
      ${icon && iconPosition === 'left' ? 'pl-10' : ''}
      ${icon && iconPosition === 'right' || type === 'password' || clearable ? 'pr-10' : ''}
      ${className}
    `;
  };

  return (
    <div>
      {/* Label */}
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative rounded-md shadow-sm">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className={`${icon} text-gray-400`}></i>
          </div>
        )}

        {/* Input Element */}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={getInputClasses()}
          {...props}
        />

        {/* Right Icon/Password Toggle/Clear Button */}
        {(icon && iconPosition === 'right' || type === 'password' || (clearable && value)) && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            {clearable && value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
            {type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            )}
            {icon && iconPosition === 'right' && (
              <div className="pr-3">
                <i className={`${icon} text-gray-400`}></i>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helper && !error && (
        <p className="mt-1 text-xs text-gray-500">
          {helper}
        </p>
      )}
    </div>
  );
};

// Textarea Component
export const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helper,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  ...props
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          block w-full rounded-md shadow-sm
          ${error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
          }
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {helper && !error && <p className="mt-1 text-xs text-gray-500">{helper}</p>}
    </div>
  );
};

// Checkbox Component
export const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-4 w-4 rounded
            ${error
              ? 'border-red-300 text-red-600 focus:ring-red-500'
              : 'border-gray-300 text-indigo-600 focus:ring-indigo-500'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
          {...props}
        />
      </div>
      {label && (
        <div className="ml-3">
          <label
            htmlFor={name}
            className={`
              text-sm
              ${disabled ? 'text-gray-400' : 'text-gray-700'}
              ${error ? 'text-red-600' : ''}
            `}
          >
            {label}
          </label>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
};

// Radio Component
export const Radio = ({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          type="radio"
          id={`${name}-${value}`}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-4 w-4
            ${error
              ? 'border-red-300 text-red-600 focus:ring-red-500'
              : 'border-gray-300 text-indigo-600 focus:ring-indigo-500'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
          {...props}
        />
      </div>
      {label && (
        <div className="ml-3">
          <label
            htmlFor={`${name}-${value}`}
            className={`
              text-sm
              ${disabled ? 'text-gray-400' : 'text-gray-700'}
              ${error ? 'text-red-600' : ''}
            `}
          >
            {label}
          </label>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
};

// Example usage:
/*
import Input, { Textarea, Checkbox, Radio } from './components/Input';

// Basic Input
<Input
  label="Username"
  name="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Enter your username"
  required
/>

// Input with Icon
<Input
  label="Email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  icon="fas fa-envelope"
  placeholder="Enter your email"
/>

// Password Input
<Input
  type="password"
  label="Password"
  name="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
/>

// Input with Error
<Input
  label="Email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Please enter a valid email address"
/>

// Textarea
<Textarea
  label="Description"
  name="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Enter a description"
  rows={6}
/>

// Checkbox
<Checkbox
  label="I agree to the terms and conditions"
  name="terms"
  checked={terms}
  onChange={(e) => setTerms(e.target.checked)}
/>

// Radio Group
<div className="space-y-2">
  <Radio
    label="Option 1"
    name="options"
    value="1"
    checked={selectedOption === '1'}
    onChange={(e) => setSelectedOption(e.target.value)}
  />
  <Radio
    label="Option 2"
    name="options"
    value="2"
    checked={selectedOption === '2'}
    onChange={(e) => setSelectedOption(e.target.value)}
  />
</div>
*/

export default Input;