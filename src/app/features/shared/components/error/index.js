import React, { PureComponent, ReactChildren } from 'react';

type Props = {
  children: ReactChildren
};

export default class ErrorBoundary extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <div style={{ whiteSpace: 'pre-wrap', background: 'red', color: 'white' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
