import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Menu = ({
  trigger,
  items,
  position = 'bottom-left',
  width = 'w-48',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current && menuRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = 0;
      let left = 0;

      // Calculate position based on specified alignment
      switch (position) {
        case 'bottom-right':
          top = triggerRect.bottom + 8;
          left = triggerRect.right - menuRect.width;
          break;
        case 'bottom-center':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
          break;
        case 'top-left':
          top = triggerRect.top - menuRect.height - 8;
          left = triggerRect.left;
          break;
        case 'top-right':
          top = triggerRect.top - menuRect.height - 8;
          left = triggerRect.right - menuRect.width;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - menuRect.height) / 2;
          left = triggerRect.left - menuRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - menuRect.height) / 2;
          left = triggerRect.right + 8;
          break;
        default: // bottom-left
          top = triggerRect.bottom + 8;
          left = triggerRect.left;
      }

      // Adjust if menu would go outside viewport
      if (left + menuRect.width > viewportWidth - 8) {
        left = viewportWidth - menuRect.width - 8;
      }
      if (left < 8) {
        left = 8;
      }
      if (top + menuRect.height > viewportHeight - 8) {
        top = viewportHeight - menuRect.height - 8;
      }
      if (top < 8) {
        top = 8;
      }

      setMenuPosition({ top, left });
    }
  }, [isOpen, position]);

  return (
    <>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-block"
      >
        {trigger}
      </div>

      {/* Menu */}
      {isOpen && createPortal(
        <div
          ref={menuRef}
          className={`
            fixed z-50 ${width} bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5
            ${className}
          `}
          style={{
            top: menuPosition.top,
            left: menuPosition.left
          }}
        >
          <div className="py-1" role="menu">
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
                    {item.shortcut && (
                      <span className="ml-auto text-xs text-gray-400">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Context Menu
export const ContextMenu = ({
  items,
  children,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;

    // Adjust position if would render outside viewport
    const menuWidth = 192; // w-48 = 12rem = 192px
    const menuHeight = items.length * 36; // Approximate height per item
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    setPosition({
      x: x + menuWidth > viewportWidth ? viewportWidth - menuWidth - 8 : x,
      y: y + menuHeight > viewportHeight ? viewportHeight - menuHeight - 8 : y
    });
    setIsOpen(true);
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {isOpen && createPortal(
        <div
          ref={menuRef}
          className={`
            fixed z-50 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5
            ${className}
          `}
          style={{
            top: position.y,
            left: position.x
          }}
        >
          <div className="py-1" role="menu">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider ? (
                  <div className="border-t border-gray-100 my-1"></div>
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
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

// Example usage:
/*
import Menu, { ContextMenu } from './components/Menu';

// Basic Menu
const items = [
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
  }
];

<Menu
  trigger={
    <button className="btn-primary">
      Options <i className="fas fa-chevron-down ml-2"></i>
    </button>
  }
  items={items}
/>

// Menu with Headers and Dividers
const itemsWithHeaders = [
  { header: 'Actions' },
  {
    label: 'View Profile',
    icon: 'fas fa-user'
  },
  { divider: true },
  {
    label: 'Settings',
    icon: 'fas fa-cog',
    shortcut: '⌘S'
  }
];

<Menu
  trigger={<button>Menu</button>}
  items={itemsWithHeaders}
  position="bottom-right"
/>

// Context Menu
<ContextMenu
  items={[
    {
      label: 'Copy',
      icon: 'fas fa-copy'
    },
    {
      label: 'Paste',
      icon: 'fas fa-paste'
    }
  ]}
>
  <div className="p-4 border">
    Right click me!
  </div>
</ContextMenu>
*/

export default Menu;