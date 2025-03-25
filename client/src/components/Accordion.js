import React, { useState } from 'react';

const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'default',
  className = ''
}) => {
  const [openItems, setOpenItems] = useState(defaultOpen);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const isOpen = (index) => openItems.includes(index);

  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return {
          wrapper: 'border rounded-lg divide-y',
          item: 'border-gray-200',
          header: 'px-4 py-3 bg-white hover:bg-gray-50',
          content: 'px-4 py-3 bg-white'
        };
      case 'filled':
        return {
          wrapper: 'divide-y',
          item: 'border-gray-200',
          header: 'px-4 py-3 bg-gray-50 hover:bg-gray-100',
          content: 'px-4 py-3 bg-white'
        };
      default:
        return {
          wrapper: 'divide-y',
          item: 'border-gray-200',
          header: 'px-4 py-3',
          content: 'px-4 py-3'
        };
    }
  };

  const styles = getVariantClasses();

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.item}
        >
          {/* Header */}
          <button
            onClick={() => toggleItem(index)}
            className={`
              w-full flex justify-between items-center
              text-left focus:outline-none
              ${styles.header}
              ${isOpen(index) ? 'text-indigo-600' : 'text-gray-900'}
            `}
          >
            <div className="flex items-center">
              {item.icon && (
                <i className={`${item.icon} mr-3 text-gray-400`}></i>
              )}
              <span className="font-medium">{item.title}</span>
              {item.badge && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                  {item.badge}
                </span>
              )}
            </div>
            <i className={`
              fas fa-chevron-down transform transition-transform duration-200
              ${isOpen(index) ? 'rotate-180' : ''}
            `}></i>
          </button>

          {/* Content */}
          <div
            className={`
              overflow-hidden transition-all duration-200
              ${isOpen(index) ? 'max-h-96' : 'max-h-0'}
            `}
          >
            <div className={styles.content}>
              {typeof item.content === 'function'
                ? item.content(isOpen(index))
                : item.content
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// FAQ Accordion
export const FAQAccordion = ({
  items,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item, index) => (
        <details
          key={index}
          className="group rounded-lg bg-white shadow-sm"
        >
          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none">
            <span className="font-medium text-gray-900">{item.question}</span>
            <i className="fas fa-plus text-gray-400 group-open:hidden"></i>
            <i className="fas fa-minus text-gray-400 hidden group-open:block"></i>
          </summary>
          <div className="px-4 py-3 text-gray-600 border-t">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
};

// Example usage:
/*
import Accordion, { FAQAccordion } from './components/Accordion';

// Basic Accordion
const items = [
  {
    title: 'Section 1',
    content: 'Content for section 1'
  },
  {
    title: 'Section 2',
    content: 'Content for section 2'
  }
];

<Accordion items={items} />

// Accordion with Icons and Badges
const itemsWithIcons = [
  {
    title: 'Profile',
    icon: 'fas fa-user',
    badge: 'New',
    content: 'Profile content'
  },
  {
    title: 'Settings',
    icon: 'fas fa-cog',
    content: 'Settings content'
  }
];

<Accordion
  items={itemsWithIcons}
  variant="bordered"
  allowMultiple
/>

// Dynamic Content
const itemsWithDynamicContent = [
  {
    title: 'Dynamic Section',
    content: (isOpen) => (
      <div>
        {isOpen ? 'Content is now visible' : ''}
      </div>
    )
  }
];

<Accordion items={itemsWithDynamicContent} />

// FAQ Accordion
const faqItems = [
  {
    question: 'What is your return policy?',
    answer: 'Our return policy allows returns within 30 days of purchase.'
  },
  {
    question: 'How do I track my order?',
    answer: 'You can track your order using the tracking number provided in your shipping confirmation email.'
  }
];

<FAQAccordion items={faqItems} />

// Different Variants
<Accordion items={items} variant="default" />
<Accordion items={items} variant="bordered" />
<Accordion items={items} variant="filled" />

// Allow Multiple Open Sections
<Accordion
  items={items}
  allowMultiple
  defaultOpen={[0, 1]}
/>
*/

export default Accordion;