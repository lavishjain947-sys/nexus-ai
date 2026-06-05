import { Router } from 'express'
import { listMessages, createMessage } from '../controllers/messageController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/:chatId', listMessages)
router.post('/:chatId', createMessage)

export default router
