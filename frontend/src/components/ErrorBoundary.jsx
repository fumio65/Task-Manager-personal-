import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false}
  }

  static getDerivedStateFromError() {
    return { hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return(
        <div className='min-h-screen flex items-center justify-center bg-red-50 text-red-700'>
          <h1>Something went wrong. Please try again later.</h1>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary