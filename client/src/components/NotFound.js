import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl text-indigo-600 mb-4">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Go Back
          </button>
          <Link to="/" className="btn-primary">
            <i className="fas fa-home mr-2"></i>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;