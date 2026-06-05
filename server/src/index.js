import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chats.js'
import messageRoutes from './routes/messages.js'
import companyRoutes from './routes/company.js'

const app = express()

app.use(helmet())
const allowedOrigins = [
  env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://nexus-ai-lavion.netlify.app',
]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(null, true)
  },
  credentials: true,
}))
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '5mb' }))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', provider: env.AI_PROVIDER, model: env.OLLAMA_MODEL })
})

app.use('/api/auth', authRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/company', companyRoutes)

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

async function start() {
  await connectDB()

  app.listen(env.PORT, () => {
    console.log(`\n  Nexus AI Server running on http://localhost:${env.PORT}`)
    console.log(`  AI Provider: ${env.AI_PROVIDER}`)
    console.log(`  Ollama: ${env.OLLAMA_BASE_URL}/api/chat (model: ${env.OLLAMA_MODEL})`)
    console.log()
  })
}

start()
