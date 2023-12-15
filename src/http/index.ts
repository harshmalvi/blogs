import { Router } from 'express'

// route files
import article from './routes/article'

const router = Router()

// article API
router.use('/articles', article)

export default router
