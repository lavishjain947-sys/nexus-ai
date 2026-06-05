import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: '#050505',
          color: '#fff',
          minHeight: '100vh',
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'rgba(255, 214, 10, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#FFD60A" strokeWidth="1.5" />
              <path d="M12 8V12M12 16H12.01" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#8A8A8A', maxWidth: 320, marginBottom: '1.5rem' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.reload() }}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: 8,
              background: '#FFD60A',
              color: '#050505',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
