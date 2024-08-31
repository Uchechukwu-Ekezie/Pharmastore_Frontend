// ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>Something went wrong!</h1>
          <p>The page you're looking for cannot be found.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
