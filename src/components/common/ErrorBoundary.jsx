import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="text-white bg-richblack-800 p-6 rounded-lg border border-richblack-700">
          <h2 className="text-xl font-bold text-red-400 mb-4">Something went wrong</h2>
          <details className="text-sm text-richblack-300">
            <summary className="cursor-pointer mb-2">Error details (click to expand)</summary>
            <pre className="whitespace-pre-wrap text-xs bg-richblack-900 p-4 rounded overflow-x-auto">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
