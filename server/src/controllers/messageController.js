import Chat from '../models/Chat.js'
import Message from '../models/Message.js'
import { generateResponse } from '../services/ai.js'

export async function listMessages(req, res) {
  try {
    const { chatId } = req.params

    const chat = await Chat.findOne({ _id: chatId, user: req.user._id })
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' })
    }

    const messages = await Message.find({ chat: chatId })
      .sort({ createdAt: 1 })
      .select('-__v')

    res.json({ messages })
  } catch (error) {
    console.error('List messages error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export async function createMessage(req, res) {
  try {
    const { chatId } = req.params
    const { content } = req.body

    if (!content) {
      return res.status(400).json({ error: 'Content is required' })
    }

    const chat = await Chat.findOne({ _id: chatId, user: req.user._id })
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' })
    }

    const userMessage = await Message.create({
      chat: chatId,
      role: 'user',
      content,
    })

    if (chat.title === 'New Conversation') {
      const title = content.slice(0, 50) + (content.length > 50 ? '...' : '')
      await Chat.findByIdAndUpdate(chatId, { title })
    } else {
      await Chat.findByIdAndUpdate(chatId, { updatedAt: new Date() })
    }

    const history = await Message.find({ chat: chatId })
      .sort({ createdAt: 1 })
      .lean()

    const aiContent = await generateResponse(history)

    const aiMessage = await Message.create({
      chat: chatId,
      role: 'assistant',
      content: aiContent,
    })

    await Chat.findByIdAndUpdate(chatId, { updatedAt: new Date() })

    const allMessages = await Message.find({ chat: chatId })
      .sort({ createdAt: 1 })
      .select('-__v')

    res.status(201).json({ messages: allMessages })
  } catch (error) {
    console.error('Create message error:', error)

    await Chat.findByIdAndUpdate(chatId, { updatedAt: new Date() })

    res.status(500).json({ error: error.message || 'Server error' })
  }
}
