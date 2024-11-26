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

router.get('/', getTopics)
router.post('/', createTopic)

router.get('/:id', getTopicById)
router.get('/:topicId/comments', getCommentsByTopicId)

router.post('/:topicId/comments', createComment)
router.post('/:topicId/comments/:commentId', createComment)

export default router
