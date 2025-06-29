import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-radio-darker text-white p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-2">Algo deu errado</h1>
            <p className="text-sm text-gray-400 mb-4">{this.state.error?.message}</p>
            {this.state.error?.stack && (
              <pre className="bg-radio-dark p-2 text-left text-xs whitespace-pre-wrap overflow-auto rounded mb-4">
                {this.state.error.stack}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-radio-purple rounded hover:bg-radio-purple/80"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
