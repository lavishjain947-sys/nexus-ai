import { useState, useRef, useEffect } from 'react'

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, 160) + 'px'
    }
  }, [input])

  const handleSend = () => {
    const text = input.trim()
    if (!text || disabled) return
    onSend(text)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{
      padding: '1rem 1.5rem 1.5rem',
      background: 'linear-gradient(180deg, transparent 0%, var(--black) 40%)',
      position: 'relative',
      zIndex: 10,
    }}
      className="chat-input-container"
    >
      <div style={{
        maxWidth: 720,
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '0.75rem',
          padding: '0.625rem 0.625rem 0.625rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface)',
          border: '1px solid rgba(255,255,255,0.08)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
        }}
          className="input-wrapper"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Nexus AI anything..."
            rows={1}
            disabled={disabled}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '0.9375rem',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.5,
              resize: 'none',
              padding: '0.25rem 0',
              maxHeight: 160,
            }}
            className="chat-textarea"
          />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            flexShrink: 0,
          }}>
            <button
              onClick={() => {}}
              style={{
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                transition: 'color 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#B0B0B0'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#666'
                e.currentTarget.style.background = 'transparent'
              }}
              aria-label="Attach file"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 5V13M5 9H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>

            <button
              onClick={handleSend}
              disabled={disabled || !input.trim()}
              style={{
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: input.trim() ? '#FFD60A' : 'rgba(255,255,255,0.06)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'background 0.2s ease, transform 0.2s ease',
                color: input.trim() ? '#050505' : '#555',
                transform: input.trim() ? 'scale(1)' : 'scale(1)',
              }}
              onMouseEnter={e => {
                if (input.trim()) {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L14 8M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '0.6875rem',
          color: '#555',
          marginTop: '0.75rem',
          letterSpacing: '0.02em',
        }}>
          Nexus AI can make mistakes. Verify important information.
        </p>
      </div>

      <style>{`
        .chat-textarea::placeholder { color: #555; }
        @media (max-width: 768px) {
          .chat-input-container { padding: 0.75rem 1rem 1rem !important; }
          .input-wrapper { padding: 0.5rem 0.5rem 0.5rem 1rem !important; }
        }
      `}</style>
    </div>
  )
}
