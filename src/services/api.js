const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getToken() {
  return localStorage.getItem('nexus_token')
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('nexus_token', token)
  } else {
    localStorage.removeItem('nexus_token')
  }
}

export function getStoredUser() {
  try {
    const data = localStorage.getItem('nexus_user')
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem('nexus_user', JSON.stringify(user))
  } else {
    localStorage.removeItem('nexus_user')
  }
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }

  return data
}

export async function register(name, email, password) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  setToken(data.token)
  setStoredUser(data.user)
  return data
}

export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setToken(data.token)
  setStoredUser(data.user)
  return data
}

export async function googleAuth(credential) {
  const data = await request('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ credential }),
  })
  setToken(data.token)
  setStoredUser(data.user)
  return data
}

export async function githubAuth(code) {
  const data = await request('/auth/github', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
  setToken(data.token)
  setStoredUser(data.user)
  return data
}

export async function getMe() {
  return request('/auth/me')
}

export async function listChats() {
  return request('/chats')
}

export async function createChat(title = 'New Conversation', project = '') {
  return request('/chats', {
    method: 'POST',
    body: JSON.stringify({ title, project }),
  })
}

export async function updateChat(id, updates) {
  return request(`/chats/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })
}

export async function deleteChat(id) {
  return request(`/chats/${id}`, {
    method: 'DELETE',
  })
}

export async function listMessages(chatId) {
  return request(`/messages/${chatId}`)
}

export async function sendMessage(chatId, content) {
  return request(`/messages/${chatId}`, {
    method: 'POST',
    body: JSON.stringify({ content, role: 'user' }),
  })
}

export async function getCompanyConfig() {
  return request('/company')
}

export async function updateCompanyConfig(systemPrompt) {
  return request('/company', {
    method: 'PUT',
    body: JSON.stringify({ systemPrompt }),
  })
}

export async function checkHealth() {
  return request('/health')
}
