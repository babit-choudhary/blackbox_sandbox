import React from 'react';

const Loading = ({ fullScreen = false }) => {
  const loadingContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-indigo-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-600 rounded-full animate-spin-fast border-t-transparent"></div>
      </div>
      <p className="text-gray-600">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        {loadingContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {loadingContent}
    </div>
  );
};

// Overlay version for use during API calls
export const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-8 h-8 border-4 border-indigo-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-4 border-indigo-600 rounded-full animate-spin-fast border-t-transparent"></div>
        </div>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </div>
  </div>
);

// Skeleton loading for products
export const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200"></div>
    <div className="p-4 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
        ))}
      </div>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// Skeleton loading for table rows
export const TableRowSkeleton = ({ columns = 4 }) => (
  <tr className="animate-pulse">
    {[...Array(columns)].map((_, i) => (
      <td key={i} className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
    ))}
  </tr>
);

// Skeleton loading for cards
export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

// Add this to your tailwind.config.js:
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'spin-fast': 'spin 0.5s linear infinite',
//       },
//     },
//   },
// }

export default Loading;