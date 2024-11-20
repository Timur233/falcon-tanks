import { Request, Response } from 'express'
import { Comment } from '../../models/sequelize/Comment'
import { Reaction } from '../../models/sequelize/Reaction'
import { buildCommentTree } from '../../utils/buildComponentTree'

export const getCommentsByTopicId = async (req: Request, res: Response) => {
  const { topicId } = req.params

  try {
    const comments = await Comment.findAll({
      where: { topicId },
      order: [['id', 'ASC']],
      include: [
        {
          model: Reaction,
          attributes: ['userId', 'emojiCode'],
        },
      ],
    })

    const commentsTree = buildCommentTree(comments)

    res.status(200).json(commentsTree)
  } catch (e) {
    res.status(500).json(e)
  }
}

export const createComment = async (req: Request, res: Response) => {
  const { text } = req.body
  const { topicId, commentId } = req.params
  try {
    const newComment = await Comment.create({
      text,
      topicId: parseInt(topicId),
      parentCommentId: commentId ? parseInt(commentId) : null,
    })
    res.status(201).json(newComment)
  } catch (e) {
    res.status(500).json(e)
  }
}
