import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  showTotal = true,
  showSizeChanger = true,
  pageSizeOptions = [10, 20, 50, 100]
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // If current page is near the start
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // If current page is near the end
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // If current page is in the middle
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  // Handle page size change
  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    const newTotalPages = Math.ceil(totalItems / newSize);
    const newCurrentPage = Math.min(currentPage, newTotalPages);
    onPageChange(newCurrentPage, newSize);
  };

  // Get current range of items being displayed
  const getItemRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    return `${start}-${end}`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      {/* Page Size Selector and Total Items */}
      <div className="flex items-center space-x-4">
        {showSizeChanger && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show</span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="input-field py-1 pl-2 pr-8"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>
        )}
        
        {showTotal && (
          <div className="text-sm text-gray-700">
            Showing {getItemRange()} of {totalItems} items
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-2">
        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(currentPage - 1, pageSize)}
          disabled={currentPage === 1}
          className={`
            px-3 py-1 rounded-md text-sm font-medium
            ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border'}
          `}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Page Numbers */}
        <div className="hidden sm:flex space-x-2">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page, pageSize)}
              disabled={page === '...'}
              className={`
                px-3 py-1 rounded-md text-sm font-medium
                ${page === currentPage
                  ? 'bg-indigo-600 text-white'
                  : page === '...'
                  ? 'text-gray-700 cursor-default'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border'}
              `}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Mobile Page Indicator */}
        <div className="sm:hidden">
          <select
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value), pageSize)}
            className="input-field py-1 pl-2 pr-8"
          >
            {[...Array(totalPages)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Page {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(currentPage + 1, pageSize)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-1 rounded-md text-sm font-medium
            ${currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border'}
          `}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

// Simple Pagination (just prev/next buttons)
export const SimplePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium
          ${currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:text-gray-900'}
        `}
      >
        <i className="fas fa-arrow-left"></i>
        <span>Previous</span>
      </button>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium
          ${currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:text-gray-900'}
        `}
      >
        <span>Next</span>
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

// Example usage:
/*
import Pagination, { SimplePagination } from './components/Pagination';

// Full featured pagination
const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
    // Fetch data for the new page...
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
    />
  );
};

// Simple pagination
const MySimpleComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <SimplePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
};
*/

export default Pagination;