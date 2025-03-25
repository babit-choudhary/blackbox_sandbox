import React, { useState, useRef, useEffect } from 'react';

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showTooltip = true,
  showInput = false,
  formatValue = (value) => value,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const sliderRef = useRef(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (event) => {
    if (!disabled) {
      setIsDragging(true);
      handleMouseMove(event);
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const newValue = Math.round((percentage * (max - min)) / 100 / step) * step + min;
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Slider */}
        <div
          ref={sliderRef}
          className="relative flex-1 h-2"
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => !isDragging && setTooltipVisible(false)}
        >
          {/* Track */}
          <div className={`
            absolute inset-y-0 w-full rounded-full
            ${disabled ? 'bg-gray-200' : 'bg-gray-200'}
          `}>
            {/* Filled Track */}
            <div
              className={`
                absolute inset-y-0 rounded-full
                ${disabled ? 'bg-gray-400' : 'bg-indigo-600'}
              `}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Thumb */}
          <div
            className={`
              absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full
              ${disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-indigo-600 cursor-grab shadow'
              }
              ${isDragging ? 'cursor-grabbing' : ''}
            `}
            style={{ left: `calc(${percentage}% - 0.5rem)` }}
          >
            {/* Tooltip */}
            {showTooltip && (tooltipVisible || isDragging) && !disabled && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                <div className="px-2 py-1 text-xs text-white bg-gray-900 rounded">
                  {formatValue(value)}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        {showInput && (
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue)) {
                onChange(Math.max(min, Math.min(max, newValue)));
              }
            }}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={`
              w-16 px-2 py-1 text-center rounded border
              ${disabled
                ? 'bg-gray-100 cursor-not-allowed'
                : 'focus:outline-none focus:ring-2 focus:ring-indigo-500'
              }
            `}
          />
        )}
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

// Range Slider
export const RangeSlider = ({
  value: [start, end],
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showTooltip = true,
  showInput = false,
  formatValue = (value) => value,
  className = ''
}) => {
  const [activeDragger, setActiveDragger] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState({ start: false, end: false });
  const sliderRef = useRef(null);

  const startPercentage = ((start - min) / (max - min)) * 100;
  const endPercentage = ((end - min) / (max - min)) * 100;

  const handleMouseDown = (dragger, event) => {
    if (!disabled) {
      setActiveDragger(dragger);
      handleMouseMove(event);
    }
  };

  const handleMouseMove = (event) => {
    if (activeDragger && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const newValue = Math.round((percentage * (max - min)) / 100 / step) * step + min;

      if (activeDragger === 'start') {
        onChange([Math.min(newValue, end), end]);
      } else {
        onChange([start, Math.max(newValue, start)]);
      }
    }
  };

  const handleMouseUp = () => {
    setActiveDragger(null);
  };

  useEffect(() => {
    if (activeDragger) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeDragger]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Start Input */}
        {showInput && (
          <input
            type="number"
            value={start}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue)) {
                onChange([Math.max(min, Math.min(end, newValue)), end]);
              }
            }}
            min={min}
            max={end}
            step={step}
            disabled={disabled}
            className="w-16 px-2 py-1 text-center rounded border"
          />
        )}

        {/* Slider */}
        <div
          ref={sliderRef}
          className="relative flex-1 h-2"
        >
          {/* Track */}
          <div className={`
            absolute inset-y-0 w-full rounded-full
            ${disabled ? 'bg-gray-200' : 'bg-gray-200'}
          `}>
            {/* Selected Range */}
            <div
              className={`
                absolute inset-y-0
                ${disabled ? 'bg-gray-400' : 'bg-indigo-600'}
              `}
              style={{
                left: `${startPercentage}%`,
                right: `${100 - endPercentage}%`
              }}
            />
          </div>

          {/* Start Thumb */}
          <div
            className={`
              absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full
              ${disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-indigo-600 cursor-grab shadow'
              }
              ${activeDragger === 'start' ? 'cursor-grabbing' : ''}
            `}
            style={{ left: `${startPercentage}%` }}
            onMouseDown={(e) => handleMouseDown('start', e)}
            onMouseEnter={() => setTooltipVisible({ ...tooltipVisible, start: true })}
            onMouseLeave={() => !activeDragger && setTooltipVisible({ ...tooltipVisible, start: false })}
          >
            {showTooltip && (tooltipVisible.start || activeDragger === 'start') && !disabled && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                <div className="px-2 py-1 text-xs text-white bg-gray-900 rounded">
                  {formatValue(start)}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>

          {/* End Thumb */}
          <div
            className={`
              absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full
              ${disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-indigo-600 cursor-grab shadow'
              }
              ${activeDragger === 'end' ? 'cursor-grabbing' : ''}
            `}
            style={{ left: `${endPercentage}%` }}
            onMouseDown={(e) => handleMouseDown('end', e)}
            onMouseEnter={() => setTooltipVisible({ ...tooltipVisible, end: true })}
            onMouseLeave={() => !activeDragger && setTooltipVisible({ ...tooltipVisible, end: false })}
          >
            {showTooltip && (tooltipVisible.end || activeDragger === 'end') && !disabled && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                <div className="px-2 py-1 text-xs text-white bg-gray-900 rounded">
                  {formatValue(end)}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        </div>

        {/* End Input */}
        {showInput && (
          <input
            type="number"
            value={end}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue)) {
                onChange([start, Math.min(max, Math.max(start, newValue))]);
              }
            }}
            min={start}
            max={max}
            step={step}
            disabled={disabled}
            className="w-16 px-2 py-1 text-center rounded border"
          />
        )}
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

// Example usage:
/*
import Slider, { RangeSlider } from './components/Slider';

// Basic Slider
const [value, setValue] = useState(50);

<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={1}
  showTooltip
  showInput
/>

// Range Slider
const [range, setRange] = useState([20, 80]);

<RangeSlider
  value={range}
  onChange={setRange}
  min={0}
  max={100}
  formatValue={(value) => `$${value}`}
  showTooltip
  showInput
/>

// Disabled Slider
<Slider
  value={50}
  onChange={() => {}}
  disabled
/>

// Custom Formatted Slider
<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={1000}
  step={100}
  formatValue={(value) => `${value}GB`}
/>
*/

export default Slider;