import React, { useState } from 'react';

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  fullWidth = false,
  centered = false,
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return {
          nav: 'space-x-2',
          tab: `
            px-3 py-2 rounded-md text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          `,
          active: 'bg-indigo-100 text-indigo-700',
          inactive: 'text-gray-500 hover:text-gray-700'
        };
      case 'underline':
        return {
          nav: 'border-b border-gray-200',
          tab: 'px-1 py-4 text-sm font-medium border-b-2 border-transparent',
          active: 'border-indigo-500 text-indigo-600',
          inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
        };
      default:
        return {
          nav: 'bg-gray-100 p-1 rounded-lg',
          tab: `
            px-3 py-2 text-sm font-medium rounded-md
            focus:outline-none
          `,
          active: 'bg-white shadow text-gray-800',
          inactive: 'text-gray-500 hover:text-gray-700'
        };
    }
  };

  const styles = getVariantClasses();

  return (
    <div className={className}>
      <nav
        className={`
          ${styles.nav}
          ${fullWidth ? 'w-full' : ''}
          ${centered ? 'flex justify-center' : ''}
        `}
      >
        <div className={`${fullWidth ? 'flex w-full' : 'inline-flex'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                ${styles.tab}
                ${activeTab === tab.id ? styles.active : styles.inactive}
                ${fullWidth ? 'flex-1 text-center' : ''}
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={tab.disabled}
            >
              {tab.icon && (
                <i className={`${tab.icon} ${tab.label ? 'mr-2' : ''}`}></i>
              )}
              {tab.label}
              {tab.badge && (
                <span className="ml-2 bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

// Tabs with Content
export const TabsWithContent = ({
  tabs,
  defaultTab,
  variant = 'default',
  fullWidth = false,
  centered = false,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={className}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant={variant}
        fullWidth={fullWidth}
        centered={centered}
      />
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

// Vertical Tabs
export const VerticalTabs = ({
  tabs,
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={`flex ${className}`}>
      {/* Tabs Navigation */}
      <div className="w-48 pr-4 border-r border-gray-200">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                w-full flex items-center px-3 py-2 text-sm font-medium rounded-md
                ${activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={tab.disabled}
            >
              {tab.icon && <i className={`${tab.icon} mr-3`}></i>}
              <span className="truncate">{tab.label}</span>
              {tab.badge && (
                <span className={`
                  ml-auto inline-block py-0.5 px-2 text-xs rounded-full
                  ${activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 pl-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

// Example usage:
/*
import Tabs, { TabsWithContent, VerticalTabs } from './components/Tabs';

// Basic Tabs
const tabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3', disabled: true }
];

<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="pills"
/>

// Tabs with Icons and Badges
const tabsWithIcons = [
  {
    id: 'profile',
    label: 'Profile',
    icon: 'fas fa-user'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'fas fa-bell',
    badge: '5'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'fas fa-cog'
  }
];

<Tabs
  tabs={tabsWithIcons}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>

// Tabs with Content
const tabsWithContent = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div>Content for Tab 1</div>
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <div>Content for Tab 2</div>
  }
];

<TabsWithContent
  tabs={tabsWithContent}
  defaultTab="tab1"
  variant="pills"
/>

// Vertical Tabs
const verticalTabs = [
  {
    id: 'general',
    label: 'General',
    icon: 'fas fa-cog',
    content: <div>General Settings</div>
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'fas fa-shield-alt',
    badge: 'New',
    content: <div>Security Settings</div>
  }
];

<VerticalTabs
  tabs={verticalTabs}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
*/

export default Tabs;