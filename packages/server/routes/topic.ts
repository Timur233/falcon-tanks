import { Router } from 'express'
import {
  createComment,
  getCommentsByTopicId,
} from '../controllers/sequelize/comment'
import {
  createTopic,
  getTopicById,
  getTopics,
} from '../controllers/sequelize/topic'

const router = Router()

router.get('/topics', getTopics)
router.post('/topics', createTopic)

router.get('/topics/:id', getTopicById)
router.get('/topics/:topicId/comments', getCommentsByTopicId)

router.post('/topics/:topicId/comments', createComment)
router.post('/topics/:topicId/comments/:commentId', createComment)

export default router
