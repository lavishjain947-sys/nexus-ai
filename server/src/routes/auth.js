import { Router } from 'express'
import {
  register,
  login,
  googleAuth,
  githubAuth,
  getMe,
} from '../controllers/authController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', googleAuth)
router.post('/github', githubAuth)
router.get('/me', requireAuth, getMe)

export default router
