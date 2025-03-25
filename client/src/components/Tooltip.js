import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 0,
  className = '',
  dark = false,
  maxWidth = '200px',
  arrow = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timerRef = useRef(null);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollX + 8;
        break;
    }

    // Keep tooltip within viewport
    const padding = 10;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontal bounds
    if (left < padding) {
      left = padding;
    } else if (left + tooltipRect.width > viewportWidth - padding) {
      left = viewportWidth - tooltipRect.width - padding;
    }

    // Vertical bounds
    if (top < padding) {
      top = padding;
    } else if (top + tooltipRect.height > viewportHeight - padding) {
      top = viewportHeight - tooltipRect.height - padding;
    }

    setTooltipPosition({ top, left });
  };

  const showTooltip = () => {
    if (delay > 0) {
      timerRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isVisible]);

  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderBottom: dark ? '4px solid #1F2937' : '4px solid white',
          borderRight: dark ? '4px solid #1F2937' : '4px solid white'
        };
      case 'bottom':
        return {
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderTop: dark ? '4px solid #1F2937' : '4px solid white',
          borderLeft: dark ? '4px solid #1F2937' : '4px solid white'
        };
      case 'left':
        return {
          right: '-4px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderTop: dark ? '4px solid #1F2937' : '4px solid white',
          borderRight: dark ? '4px solid #1F2937' : '4px solid white'
        };
      case 'right':
        return {
          left: '-4px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderBottom: dark ? '4px solid #1F2937' : '4px solid white',
          borderLeft: dark ? '4px solid #1F2937' : '4px solid white'
        };
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 px-3 py-2 text-sm rounded-lg shadow-lg
            ${dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
            ${className}
          `}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth
          }}
        >
          {content}
          {arrow && (
            <div
              className={`
                absolute w-2 h-2
                ${dark ? 'bg-gray-800' : 'bg-white'}
              `}
              style={getArrowStyles()}
            />
          )}
        </div>
      )}
    </>
  );
};

// Tooltip with HTML Content
export const HTMLTooltip = ({ content, ...props }) => (
  <Tooltip
    content={
      <div dangerouslySetInnerHTML={{ __html: content }} />
    }
    {...props}
  />
);

// Example usage:
/*
import Tooltip, { HTMLTooltip } from './components/Tooltip';

// Basic Tooltip
<Tooltip content="This is a tooltip">
  <button className="btn-primary">
    Hover me
  </button>
</Tooltip>

// Dark Theme Tooltip
<Tooltip
  content="Dark themed tooltip"
  dark
  position="bottom"
>
  <span className="text-blue-600 underline">
    Hover for info
  </span>
</Tooltip>

// Tooltip with Delay
<Tooltip
  content="Delayed tooltip"
  delay={500}
  position="right"
>
  <i className="fas fa-info-circle"></i>
</Tooltip>

// HTML Content Tooltip
<HTMLTooltip
  content="<strong>Bold</strong> and <em>italic</em> text"
  position="left"
>
  <button className="btn-secondary">
    HTML Tooltip
  </button>
</HTMLTooltip>

// Different Positions
<div className="space-x-4">
  <Tooltip content="Top tooltip" position="top">
    <button>Top</button>
  </Tooltip>
  <Tooltip content="Bottom tooltip" position="bottom">
    <button>Bottom</button>
  </Tooltip>
  <Tooltip content="Left tooltip" position="left">
    <button>Left</button>
  </Tooltip>
  <Tooltip content="Right tooltip" position="right">
    <button>Right</button>
  </Tooltip>
</div>
*/

export default Tooltip;