import { motion, AnimatePresence } from 'framer-motion'

function ChatItem({ chat, active, onClick, onDelete }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      <button
        onClick={() => onClick(chat._id)}
        style={{
          flex: 1,
          padding: '0.625rem 0.5rem',
          borderRadius: 'var(--radius-md)',
          background: active ? 'rgba(255, 214, 10, 0.06)' : 'transparent',
          border: active ? '1px solid rgba(255, 214, 10, 0.12)' : '1px solid transparent',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflow: 'hidden',
        }}
        onMouseEnter={e => {
          if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        }}
        onMouseLeave={e => {
          if (!active) e.currentTarget.style.background = 'transparent'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M5 1L5 15M11 1L11 15M1 9H4M12 9H15M1 5H3M13 5H15" stroke={active ? '#FFD60A' : '#666'} strokeWidth="1.2" strokeLinecap="round" />
          <rect x="1" y="3" width="14" height="10" rx="2" stroke={active ? '#FFD60A' : '#666'} strokeWidth="1.2" />
        </svg>
        <span style={{
          fontSize: '0.8125rem',
          fontWeight: active ? 600 : 500,
          color: active ? '#E0E0E0' : '#8A8A8A',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {chat.title}
        </span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(chat._id) }}
        style={{
          width: 22,
          height: 22,
          borderRadius: 4,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#555',
          opacity: 0,
          transition: 'opacity 0.2s ease, color 0.2s ease',
          flexShrink: 0,
        }}
        className="chat-delete-btn"
        onMouseEnter={e => e.currentTarget.style.color = '#FF6B6B'}
        onMouseLeave={e => e.currentTarget.style.color = '#555'}
        aria-label="Delete chat"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 3H10M4 3V2C4 1.44772 4.44772 1 5 1H7C7.55228 1 8 1.44772 8 2V3M9 3V10C9 10.5523 8.55228 11 8 11H4C3.44772 11 3 10.5523 3 10V3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </button>
      <style>{`
        .chat-delete-btn { display: none; }
        .sidebar-panel:hover .chat-delete-btn { display: flex; }
        @media (max-width: 768px) {
          .chat-delete-btn { display: flex; }
        }
      `}</style>
    </div>
  )
}

export default function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onNewProject,
  onDeleteChat,
  sidebarOpen,
  onClose,
  user,
}) {
  return (
    <AnimatePresence>
      {(sidebarOpen || true) && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 280,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--surface)',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            height: '100%',
            position: 'relative',
          }}
          className="sidebar-panel"
        >
          <div style={{
            padding: '1.25rem 1rem',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                background: '#FFD60A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#050505',
                fontWeight: 900,
                fontSize: '0.75rem',
              }}>
                N
              </div>
              <span style={{
                fontWeight: 700,
                fontSize: '0.9375rem',
                letterSpacing: '-0.02em',
                color: '#fff',
              }}>
                Nexus AI
              </span>
            </div>
            <button
              onClick={onClose}
              className="sidebar-close"
              style={{
                display: 'none',
                width: 28,
                height: 28,
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Close sidebar"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3L11 11M11 3L3 11" stroke="#888" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={onNewChat}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: '#FFD60A',
                color: '#050505',
                fontWeight: 700,
                fontSize: '0.8125rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 8px rgba(255, 214, 10, 0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 214, 10, 0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 214, 10, 0.2)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              New Chat
            </button>

            <button
              onClick={onNewProject}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: '#B0B0B0',
                fontWeight: 600,
                fontSize: '0.8125rem',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 214, 10, 0.25)'
                e.currentTarget.style.color = '#FFD60A'
                e.currentTarget.style.background = 'rgba(255, 214, 10, 0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = '#B0B0B0'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              New Project
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.125rem',
          }}>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#555',
              padding: '0.5rem 0.5rem 0.25rem',
            }}>
              Chat History
            </span>
            {chats.length === 0 ? (
              <div style={{
                padding: '1.5rem 0.5rem',
                textAlign: 'center',
                color: '#555',
                fontSize: '0.8125rem',
              }}>
                No conversations yet
              </div>
            ) : (
              chats.map((chat) => (
                <ChatItem
                  key={chat._id}
                  chat={chat}
                  active={chat._id === activeChatId}
                  onClick={onSelectChat}
                  onDelete={onDeleteChat}
                />
              ))
            )}
          </div>

          <div style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255, 214, 10, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFD60A',
              fontWeight: 700,
              fontSize: '0.8125rem',
              flexShrink: 0,
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#D0D0D0',
              }}>
                {user?.name || 'User'}
              </div>
              <div style={{
                fontSize: '0.6875rem',
                color: '#666',
              }}>
                {user?.plan ? `${user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan` : 'Free Plan'}
              </div>
            </div>
          </div>

          <style>{`
            .sidebar-close { display: none !important; }
            @media (max-width: 768px) {
              .sidebar-panel {
                position: fixed !important;
                left: 0;
                top: var(--nav-height);
                bottom: 0;
                z-index: 50;
                box-shadow: 4px 0 30px rgba(0,0,0,0.5);
              }
              .sidebar-close { display: flex !important; }
            }
          `}</style>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
