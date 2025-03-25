import React, { useState, useRef, useEffect } from 'react';

const DatePicker = ({
  value,
  onChange,
  min,
  max,
  format = 'yyyy-MM-dd',
  placeholder = 'Select date',
  disabled = false,
  clearable = true,
  className = '',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    
    const d = new Date(date);
    return format
      .replace('yyyy', d.getFullYear())
      .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
      .replace('dd', String(d.getDate()).padStart(2, '0'));
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const isDateDisabled = (date) => {
    if (min && date < new Date(min)) return true;
    if (max && date > new Date(max)) return true;
    return false;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (!isDateDisabled(newDate)) {
      onChange(formatDate(newDate));
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const weeks = [];
    let days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="p-0"></td>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = value === formatDate(date);
      const isDisabled = isDateDisabled(date);
      const isHovered = hoveredDate === formatDate(date);

      days.push(
        <td key={day} className="p-0">
          <button
            type="button"
            onClick={() => handleDateSelect(day)}
            onMouseEnter={() => setHoveredDate(formatDate(date))}
            onMouseLeave={() => setHoveredDate(null)}
            disabled={isDisabled}
            className={`
              w-full h-8 text-sm rounded-full
              ${isSelected
                ? 'bg-indigo-600 text-white'
                : isHovered && !isDisabled
                ? 'bg-indigo-50'
                : 'hover:bg-gray-100'
              }
              ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}
            `}
          >
            {day}
          </button>
        </td>
      );

      if (days.length === 7) {
        weeks.push(<tr key={day}>{days}</tr>);
        days = [];
      }
    }

    // Add remaining empty cells
    while (days.length > 0 && days.length < 7) {
      days.push(<td key={`empty-end-${days.length}`} className="p-0"></td>);
    }
    if (days.length > 0) {
      weeks.push(<tr key="last">{days}</tr>);
    }

    return weeks;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={formatDate(value)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(true)}
          className={`
            w-full px-3 py-2 rounded-md border
            ${error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
            ${className}
          `}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-500 p-1"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          <i className="fas fa-calendar text-gray-400 ml-1"></i>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 bg-white rounded-lg shadow-lg border">
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="text-sm font-medium">
              {viewDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {/* Calendar Grid */}
          <table className="w-full">
            <thead>
              <tr>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <th
                    key={day}
                    className="p-1 text-xs font-medium text-gray-500"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderCalendar()}</tbody>
          </table>

          {/* Footer */}
          <div className="border-t p-2">
            <button
              type="button"
              onClick={() => {
                setViewDate(new Date());
                handleDateSelect(new Date().getDate());
              }}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Today
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

// Date Range Picker
export const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  min,
  max,
  className = ''
}) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDateChange = (date) => {
    if (!focusedInput) return;

    if (focusedInput === 'start') {
      onChange({
        startDate: date,
        endDate: endDate && new Date(date) > new Date(endDate) ? date : endDate
      });
      setFocusedInput('end');
    } else {
      onChange({
        startDate,
        endDate: date
      });
      setFocusedInput(null);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <DatePicker
        value={startDate}
        onChange={(date) => handleDateChange(date)}
        min={min}
        max={max}
        placeholder="Start date"
        className={focusedInput === 'start' ? 'ring-2 ring-indigo-500' : ''}
        onClick={() => setFocusedInput('start')}
      />
      <span className="text-gray-500">to</span>
      <DatePicker
        value={endDate}
        onChange={(date) => handleDateChange(date)}
        min={startDate || min}
        max={max}
        placeholder="End date"
        className={focusedInput === 'end' ? 'ring-2 ring-indigo-500' : ''}
        onClick={() => setFocusedInput('end')}
      />
    </div>
  );
};

// Example usage:
/*
import DatePicker, { DateRangePicker } from './components/DatePicker';

// Basic Date Picker
const [selectedDate, setSelectedDate] = useState('');

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  min="2023-01-01"
  max="2024-12-31"
/>

// Date Range Picker
const [dateRange, setDateRange] = useState({
  startDate: '',
  endDate: ''
});

<DateRangePicker
  startDate={dateRange.startDate}
  endDate={dateRange.endDate}
  onChange={setDateRange}
  min="2023-01-01"
  max="2024-12-31"
/>

// Disabled Date Picker
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  disabled
/>

// Date Picker with Error
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  error="Please select a valid date"
/>
*/

export default DatePicker;