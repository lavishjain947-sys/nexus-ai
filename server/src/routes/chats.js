import { Router } from 'express'
import {
  listChats,
  createChat,
  updateChat,
  deleteChat,
} from '../controllers/chatController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/', listChats)
router.post('/', createChat)
router.patch('/:id', updateChat)
router.delete('/:id', deleteChat)

export default router
