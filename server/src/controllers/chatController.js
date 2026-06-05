import Chat from '../models/Chat.js'

export async function listChats(req, res) {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select('-__v')

    res.json({ chats })
  } catch (error) {
    console.error('List chats error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export async function createChat(req, res) {
  try {
    const { title, project } = req.body

    const chat = await Chat.create({
      user: req.user._id,
      title: title || 'New Conversation',
      project: project || '',
    })

    res.status(201).json({ chat })
  } catch (error) {
    console.error('Create chat error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export async function updateChat(req, res) {
  try {
    const { id } = req.params
    const { title, project } = req.body

    const chat = await Chat.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $set: { ...(title && { title }), ...(project !== undefined && { project }) } },
      { new: true, runValidators: true }
    )

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' })
    }

    res.json({ chat })
  } catch (error) {
    console.error('Update chat error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export async function deleteChat(req, res) {
  try {
    const { id } = req.params

    const chat = await Chat.findOneAndDelete({ _id: id, user: req.user._id })
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' })
    }

    await chat.deleteOne()

    res.json({ message: 'Chat deleted' })
  } catch (error) {
    console.error('Delete chat error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
