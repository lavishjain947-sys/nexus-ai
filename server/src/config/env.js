import 'dotenv/config'

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/nexus-ai',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  OLLAMA_API_KEY: process.env.OLLAMA_API_KEY || '',
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || 'llama3.2',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  SYSTEM_PROMPT:
    process.env.SYSTEM_PROMPT ||
    'You are Nexus AI, a flagship AI product built by Lavion Tech & Innovations, founded by Lavish Jain. You are helpful, intelligent, and concise.',
}
