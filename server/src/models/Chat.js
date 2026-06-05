import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'New Conversation',
      trim: true,
    },
    project: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
)

chatSchema.index({ user: 1, updatedAt: -1 })

export default mongoose.model('Chat', chatSchema)
