// src/components/ErrorBoundary.jsx
import { Component } from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

// Error fallback component
/**
 * ErrorFallback is a React component that displays a user-friendly error message
 * when an error is caught by an error boundary. It provides an option to reset
 * the error state and navigate the user to a safe route (e.g., home page).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Error} props.error - The error object caught by the error boundary.
 * @param {Function} props.resetError - Function to reset the error boundary state.
 * @returns {JSX.Element} A styled error message UI with a button to reset and navigate home.
 */
const ErrorFallback = ({ error, resetError }) => {
  const navigate = useNavigate();

  const handleReset = () => {
    resetError();
    navigate("/"); // Navigate to home or another safe route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-700 mb-2">{error.message}</p>
        <p className="text-sm text-gray-500 mb-6">
          We're sorry for the inconvenience. Please try refreshing the page or
          contact support if the problem persists.
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

// Hook-based wrapper for easier usage
export const withErrorBoundary = (WrappedComponent) => (props) =>
  (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

export default ErrorBoundary;
