import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatSidebar from './ChatSidebar'
import ChatInput from './ChatInput'
import { listChats, createChat, deleteChat, listMessages, sendMessage, getStoredUser, setToken, setStoredUser } from '../services/api'

function WelcomeScreen({ onNewChat }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: 'rgba(255, 214, 10, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="3" width="22" height="22" rx="6" stroke="#FFD60A" strokeWidth="1.5" />
          <path d="M10 14L13 17L18 11" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        marginBottom: '0.75rem',
      }}>
        Welcome to Nexus AI
      </h2>
      <p style={{
        fontSize: '0.9375rem',
        color: '#8A8A8A',
        maxWidth: 360,
        lineHeight: 1.7,
        marginBottom: '2rem',
      }}>
        Start a conversation or explore what Nexus AI can do for you.
      </p>
      <button
        onClick={onNewChat}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          background: '#FFD60A',
          color: '#050505',
          fontWeight: 700,
          fontSize: '0.9375rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 214, 10, 0.3)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'none'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Start New Chat
      </button>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '1.25rem 1.5rem',
        background: isUser ? 'transparent' : 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
      }}
    >
      <div style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '0.75rem',
        background: isUser ? 'rgba(255, 214, 10, 0.15)' : 'rgba(255,255,255,0.06)',
        color: isUser ? '#FFD60A' : '#B0B0B0',
      }}>
        {isUser ? 'U' : 'N'}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: isUser ? '#FFD60A' : '#888',
          marginBottom: '0.25rem',
        }}>
          {isUser ? 'You' : 'Nexus AI'}
        </div>
        <div style={{
          fontSize: '0.9375rem',
          color: '#E0E0E0',
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {message.content}
        </div>
      </div>
    </motion.div>
  )
}

function ChatMessages({ messages, messagesEndRef }) {
  if (messages.length === 0) return null

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}
      className="chat-messages-scroll"
    >
      <div style={{ maxWidth: 720, margin: '0 auto', width: '100%' }}>
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}

export default function DashboardPage({ onNavigate }) {
  const [chats, setChats] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const user = getStoredUser()

  const activeChat = chats.find((c) => c._id === activeChatId) || null
  const messages = activeChat ? (activeChat.messages || []) : []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const token = localStorage.getItem('nexus_token')
    if (!token) {
      onNavigate('auth')
      return
    }
    loadChats()
  }, [])

  const loadChats = async () => {
    try {
      const data = await listChats()
      setChats(data.chats || [])
    } catch (err) {
      if (err.message.includes('401') || err.message.includes('token')) {
        setToken(null)
        setStoredUser(null)
        onNavigate('auth')
        return
      }
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (chatId) => {
    try {
      const data = await listMessages(chatId)
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === chatId ? { ...chat, messages: data.messages || [] } : chat
        )
      )
    } catch (err) {
      console.error('Failed to load messages:', err)
    }
  }

  const handleNewChat = async () => {
    try {
      const data = await createChat('New Conversation')
      setChats((prev) => [data.chat, ...prev])
      setActiveChatId(data.chat._id)
      setSidebarOpen(false)
    } catch (err) {
      console.error('Failed to create chat:', err)
    }
  }

  const handleNewProject = async () => {
    try {
      const data = await createChat('New Project', 'project')
      setChats((prev) => [data.chat, ...prev])
      setActiveChatId(data.chat._id)
      setSidebarOpen(false)
    } catch (err) {
      console.error('Failed to create project:', err)
    }
  }

  const handleSelectChat = (id) => {
    setActiveChatId(id)
    const chat = chats.find((c) => c._id === id)
    if (chat && (!chat.messages || chat.messages.length === 0)) {
      loadMessages(id)
    }
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }

  const handleDeleteChat = async (id) => {
    try {
      await deleteChat(id)
      setChats((prev) => prev.filter((c) => c._id !== id))
      if (activeChatId === id) {
        setActiveChatId(null)
      }
    } catch (err) {
      console.error('Failed to delete chat:', err)
    }
  }

  const handleSend = async (text) => {
    let chatId = activeChatId

    if (!chatId) {
      try {
        const data = await createChat(text.slice(0, 40) + (text.length > 40 ? '...' : ''))
        chatId = data.chat._id
        setChats((prev) => [{ ...data.chat, messages: [] }, ...prev])
        setActiveChatId(chatId)
        setSidebarOpen(false)
      } catch (err) {
        console.error('Failed to create chat:', err)
        return
      }
    }

    const userMsg = { role: 'user', content: text, _id: 'temp-' + Date.now() }

    setChats((prev) =>
      prev.map((chat) => {
        if (chat._id !== chatId) return chat
        const title =
          (!chat.messages || chat.messages.length === 0)
            ? text.slice(0, 40) + (text.length > 40 ? '...' : '')
            : chat.title
        return { ...chat, title, messages: [...(chat.messages || []), userMsg] }
      })
    )

    setSending(true)

    try {
      const data = await sendMessage(chatId, text)
      setChats((prev) =>
        prev.map((chat) => {
          if (chat._id !== chatId) return chat
          return { ...chat, messages: data.messages || [] }
        })
      )
    } catch (err) {
      console.error('Failed to send message:', err)
      setChats((prev) =>
        prev.map((chat) => {
          if (chat._id !== chatId) return chat
          return {
            ...chat,
            messages: [
              ...(chat.messages || []),
              { role: 'assistant', content: `Error: ${err.message}. Please try again.`, _id: 'error-' + Date.now() },
            ],
          }
        })
      )
    }

    setSending(false)
  }

  const activeChatTitle = activeChat ? activeChat.title : 'Nexus AI'

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - var(--nav-height))',
      paddingTop: 'var(--nav-height)',
      background: 'var(--black)',
      overflow: 'hidden',
    }}>
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onNewProject={handleNewProject}
        onDeleteChat={handleDeleteChat}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                color: '#888',
                transition: 'color 0.2s ease',
              }}
              className="sidebar-toggle"
              aria-label="Toggle sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <h2 style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: '#D0D0D0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 300,
            }}>
              {activeChatTitle}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('landing')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              color: '#666',
              fontSize: '0.8125rem',
              fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#B0B0B0'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#666'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6 1L1 7L6 13M1 7H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </button>
        </div>

        {!activeChat ? (
          <WelcomeScreen onNewChat={handleNewChat} />
        ) : (
          <>
            <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
            {sending && (
              <div style={{
                padding: '0.75rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                maxWidth: 720,
                margin: '0 auto',
                width: '100%',
              }}>
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#FFD60A',
                    animation: 'pulse-dot 1.2s ease-in-out infinite',
                  }} />
                </div>
                <span style={{ fontSize: '0.8125rem', color: '#666' }}>
                  Nexus AI is thinking...
                </span>
                <style>{`
                  @keyframes pulse-dot {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                  }
                `}</style>
              </div>
            )}
          </>
        )}

        {activeChat && (
          <ChatInput onSend={handleSend} disabled={sending} />
        )}
      </div>

      <style>{`
        .chat-messages-scroll::-webkit-scrollbar { width: 4px; }
        .chat-messages-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-messages-scroll::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        @media (max-width: 768px) {
          .sidebar-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .sidebar-toggle { display: none !important; }
        }
      `}</style>
    </div>
  )
}
