import React from 'react';
import Input, { Textarea, Checkbox, Radio } from './Input';

const Form = ({
  onSubmit,
  children,
  className = ''
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};

// Form Group
export const FormGroup = ({
  label,
  required,
  error,
  helper,
  className = '',
  children
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};

// Form Section
export const FormSection = ({
  title,
  description,
  className = '',
  children
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {(title || description) && (
        <div>
          {title && (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

// Form Row
export const FormRow = ({
  className = '',
  children
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {children}
    </div>
  );
};

// Form Actions
export const FormActions = ({
  className = '',
  children
}) => {
  return (
    <div className={`flex items-center justify-end space-x-3 ${className}`}>
      {children}
    </div>
  );
};

// Form Field (combines Input with FormGroup)
export const FormField = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  helper,
  className = '',
  ...props
}) => {
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            {...props}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            name={name}
            checked={value}
            onChange={onChange}
            error={error}
            {...props}
          />
        );
      case 'radio':
        return (
          <Radio
            name={name}
            checked={value}
            onChange={onChange}
            error={error}
            {...props}
          />
        );
      default:
        return (
          <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            {...props}
          />
        );
    }
  };

  return (
    <FormGroup
      label={label}
      required={required}
      error={error}
      helper={helper}
      className={className}
    >
      {renderField()}
    </FormGroup>
  );
};

// Example usage:
/*
import Form, {
  FormSection,
  FormRow,
  FormField,
  FormActions
} from './components/Form';

const MyForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    console.log('Form submitted:', formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-8">
      <FormSection
        title="Personal Information"
        description="Please provide your personal details."
      >
        <FormRow>
          <FormField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </FormRow>

        <FormField
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          helper="We'll never share your email."
        />

        <FormField
          type="textarea"
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
        />

        <FormField
          type="checkbox"
          label="Subscribe to newsletter"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
        />
      </FormSection>

      <FormActions>
        <button type="button" className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </FormActions>
    </Form>
  );
};

// Form with Validation
const ValidatedForm = () => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    const errors = validate(formData);
    if (Object.keys(errors).length === 0) {
      // Submit form
    } else {
      setErrors(errors);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
    </Form>
  );
};
*/

export default Form;