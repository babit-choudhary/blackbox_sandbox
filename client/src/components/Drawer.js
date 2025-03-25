import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  title,
  children,
  showClose = true,
  overlay = true,
  className = ''
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-64';
      case 'lg':
        return 'w-96';
      case 'xl':
        return 'w-[36rem]';
      case 'full':
        return 'w-screen';
      default:
        return 'w-80';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return `left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
      case 'right':
        return `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;
      case 'top':
        return `top-0 inset-x-0 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`;
      case 'bottom':
        return `bottom-0 inset-x-0 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`;
      default:
        return `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      {overlay && (
        <div
          className={`
            absolute inset-0 bg-black bg-opacity-50
            transition-opacity duration-300 ease-in-out
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          absolute ${getPositionClasses()}
          ${['top', 'bottom'].includes(position) ? 'h-96' : 'h-full'}
          ${['top', 'bottom'].includes(position) ? 'w-full' : getSizeClass()}
          bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${className}
        `}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-4 py-3 border-b">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

// Navigation Drawer
export const NavigationDrawer = ({
  isOpen,
  onClose,
  items,
  position = 'left',
  header,
  footer,
  className = ''
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position={position}
      className={className}
    >
      {/* Header */}
      {header && (
        <div className="px-4 py-6 bg-gray-50 border-b">
          {header}
        </div>
      )}

      {/* Navigation Items */}
      <nav className="px-2 py-4">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.header ? (
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {item.header}
              </h3>
            ) : item.divider ? (
              <hr className="my-2 border-gray-200" />
            ) : (
              <button
                onClick={() => {
                  item.onClick?.();
                  if (item.closeOnClick) onClose();
                }}
                className={`
                  w-full flex items-center px-3 py-2 text-sm rounded-md
                  ${item.active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                disabled={item.disabled}
              >
                {item.icon && <i className={`${item.icon} mr-3`}></i>}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {item.badge}
                  </span>
                )}
              </button>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="absolute bottom-0 left-0 right-0 px-4 py-6 bg-gray-50 border-t">
          {footer}
        </div>
      )}
    </Drawer>
  );
};

// Example usage:
/*
import Drawer, { NavigationDrawer } from './components/Drawer';

// Basic Drawer
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>
  Open Drawer
</button>

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Drawer Title"
>
  <div className="p-4">
    Drawer content goes here
  </div>
</Drawer>

// Navigation Drawer
const navigationItems = [
  {
    header: 'Main Menu'
  },
  {
    icon: 'fas fa-home',
    label: 'Home',
    onClick: () => console.log('Home clicked'),
    active: true
  },
  {
    icon: 'fas fa-user',
    label: 'Profile',
    badge: 'New'
  },
  {
    divider: true
  },
  {
    icon: 'fas fa-cog',
    label: 'Settings'
  }
];

<NavigationDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  items={navigationItems}
  header={
    <div className="flex items-center">
      <img src="logo.png" alt="Logo" className="h-8 w-8" />
      <span className="ml-3 text-xl font-bold">App Name</span>
    </div>
  }
  footer={
    <button className="w-full btn-primary">
      Sign Out
    </button>
  }
/>

// Different Positions
<Drawer position="left" />
<Drawer position="right" />
<Drawer position="top" />
<Drawer position="bottom" />

// Different Sizes
<Drawer size="sm" />
<Drawer size="md" />
<Drawer size="lg" />
<Drawer size="xl" />
<Drawer size="full" />
*/

export default Drawer;