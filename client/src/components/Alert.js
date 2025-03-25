import React, { useState } from 'react';

const Alert = ({
  type = 'info',
  title,
  message,
  icon,
  dismissible = true,
  onDismiss,
  action,
  className = ''
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  if (isDismissed) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-400',
          icon: icon || 'fas fa-check-circle',
          iconColor: 'text-green-400',
          title: 'text-green-800',
          text: 'text-green-700',
          button: 'bg-green-50 text-green-500 hover:bg-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-400',
          icon: icon || 'fas fa-exclamation-circle',
          iconColor: 'text-red-400',
          title: 'text-red-800',
          text: 'text-red-700',
          button: 'bg-red-50 text-red-500 hover:bg-red-100'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-400',
          icon: icon || 'fas fa-exclamation-triangle',
          iconColor: 'text-yellow-400',
          title: 'text-yellow-800',
          text: 'text-yellow-700',
          button: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-400',
          icon: icon || 'fas fa-info-circle',
          iconColor: 'text-blue-400',
          title: 'text-blue-800',
          text: 'text-blue-700',
          button: 'bg-blue-50 text-blue-500 hover:bg-blue-100'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`
        rounded-md border ${styles.bg} ${styles.border} p-4
        ${className}
      `}
      role="alert"
    >
      <div className="flex">
        {/* Icon */}
        <div className="flex-shrink-0">
          <i className={`${styles.icon} ${styles.iconColor} text-lg`}></i>
        </div>

        {/* Content */}
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title}`}>
              {title}
            </h3>
          )}
          <div className={`${title ? 'mt-2' : ''} text-sm ${styles.text}`}>
            {message}
          </div>

          {/* Action Buttons */}
          {action && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className={`
                    px-2 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${styles.button}
                  `}
                  onClick={action.onClick}
                >
                  {action.text}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`
                  inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${styles.button}
                `}
                onClick={handleDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Banner Alert
export const BannerAlert = ({
  type = 'info',
  message,
  icon,
  dismissible = true,
  onDismiss,
  action,
  className = ''
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  if (isDismissed) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-600',
          icon: icon || 'fas fa-check-circle',
          text: 'text-green-50'
        };
      case 'error':
        return {
          bg: 'bg-red-600',
          icon: icon || 'fas fa-exclamation-circle',
          text: 'text-red-50'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-600',
          icon: icon || 'fas fa-exclamation-triangle',
          text: 'text-yellow-50'
        };
      default:
        return {
          bg: 'bg-blue-600',
          icon: icon || 'fas fa-info-circle',
          text: 'text-blue-50'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`${styles.bg} ${className}`}
      role="alert"
    >
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className={`flex p-2 rounded-lg ${styles.bg}`}>
              <i className={`${styles.icon} ${styles.text} text-lg`}></i>
            </span>
            <p className={`ml-3 font-medium ${styles.text} truncate`}>
              {message}
            </p>
          </div>
          <div className="flex-shrink-0 sm:ml-3">
            {action && (
              <button
                type="button"
                className={`
                  mr-2 flex items-center px-4 py-2 border border-transparent rounded-md
                  font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${styles.text} bg-opacity-20 hover:bg-opacity-30
                `}
                onClick={action.onClick}
              >
                {action.text}
              </button>
            )}
            {dismissible && (
              <button
                type="button"
                className={`
                  flex p-2 rounded-md hover:bg-opacity-20
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${styles.text}
                `}
                onClick={handleDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage:
/*
import Alert, { BannerAlert } from './components/Alert';

// Basic Alert
<Alert
  type="success"
  title="Success!"
  message="Your changes have been saved successfully."
/>

// Alert with Action
<Alert
  type="warning"
  title="Warning"
  message="Your subscription will expire soon."
  action={{
    text: "Renew Now",
    onClick: () => console.log("Renew clicked")
  }}
/>

// Non-dismissible Alert
<Alert
  type="error"
  message="An error occurred while processing your request."
  dismissible={false}
/>

// Banner Alert
<BannerAlert
  type="info"
  message="New features are available. Check them out!"
  action={{
    text: "Learn More",
    onClick: () => console.log("Learn more clicked")
  }}
/>

// Custom Icon Alert
<Alert
  type="info"
  title="Sync in Progress"
  message="Please wait while we sync your data."
  icon="fas fa-sync fa-spin"
/>
*/

export default Alert;