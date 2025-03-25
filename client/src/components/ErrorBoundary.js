import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-lg p-6">
            <div className="text-6xl text-red-600 mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                <i className="fas fa-redo mr-2"></i>
                Refresh Page
              </button>
              <button
                onClick={() => window.history.back()}
                className="btn-secondary"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </div>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left">
                <details className="bg-gray-100 rounded-lg p-4">
                  <summary className="text-sm font-medium text-gray-900 cursor-pointer">
                    Error Details
                  </summary>
                  <div className="mt-4">
                    <p className="text-sm text-red-600 font-mono">
                      {this.state.error.toString()}
                    </p>
                    <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-48">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error boundary wrapper for async components
export const withErrorBoundary = (WrappedComponent, FallbackComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        error: null
      };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Error caught by withErrorBoundary:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return FallbackComponent ? <FallbackComponent error={this.state.error} /> : (
          <div className="text-center p-4">
            <p className="text-red-600">Failed to load component</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 text-indigo-600 hover:text-indigo-800"
            >
              Try again
            </button>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

// Custom error component for specific scenarios
export const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <i className="fas fa-exclamation-circle text-red-600"></i>
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">
          {message || 'An error occurred'}
        </h3>
        {onRetry && (
          <div className="mt-2">
            <button
              onClick={onRetry}
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ErrorBoundary;