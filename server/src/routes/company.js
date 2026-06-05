import { Router } from 'express'
import {
  getCompanyConfig,
  updateCompanyConfig,
} from '../controllers/companyController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/', getCompanyConfig)
router.put('/', updateCompanyConfig)

export default router
