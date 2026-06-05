import axios from 'axios'
import { env } from '../config/env.js'

function formatMessages(messages, systemPrompt) {
  const formatted = []

  if (systemPrompt) {
    formatted.push({ role: 'system', content: systemPrompt })
  }

  for (const msg of messages) {
    formatted.push({ role: msg.role, content: msg.content })
  }

  return formatted
}

export async function generateResponse(chatHistory, customSystemPrompt) {
  const systemPrompt = customSystemPrompt || env.SYSTEM_PROMPT
  const messages = formatMessages(chatHistory, systemPrompt)

  try {
    const response = await axios.post(
      `${env.OLLAMA_BASE_URL}/api/chat`,
      {
        model: env.OLLAMA_MODEL,
        messages,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(env.OLLAMA_API_KEY && { Authorization: `Bearer ${env.OLLAMA_API_KEY}` }),
        },
        timeout: 25000,
      }
    )

    if (!response.data?.message?.content) {
      throw new Error('Ollama returned an empty response')
    }

    return response.data.message.content
  } catch (error) {
    console.error('AI generation error:', error.message)

    if (error.code === 'ECONNREFUSED') {
      throw new Error(
        `Cannot connect to Ollama at ${env.OLLAMA_BASE_URL}. Make sure Ollama is running.`
      )
    }

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      throw new Error('AI request timed out. The Ollama model took too long to respond.')
    }

    if (error.response?.status === 401) {
      throw new Error('Ollama API authentication failed. Check your OLLAMA_API_KEY.')
    }

    throw new Error(`AI response failed: ${error.message}`)
  }
}
