import { Router } from 'express'
import { addReactionToComment } from '../controllers/sequelize/reaction'

const router = Router()

router.post('/comments/:commentId/reactions', addReactionToComment)

export default router
