import { Request, Response } from 'express'
import { Comment } from '../../models/sequelize/Comment'
import { Reaction } from '../../models/sequelize/Reaction'

export const getCommentsByTopicId = async (req: Request, res: Response) => {
  const { topicId } = req.params

  try {
    const comments = await Comment.findAll({
      where: { topicId },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: Reaction,
          attributes: ['userId', 'emojiCode'],
        },
      ],
    })

    res.status(200).json({
      comments,
      total: comments.length,
    })
  } catch (e) {
    console.error('Error fetching comments:', e)
    res.status(500).json(e)
  }
}

export const createComment = async (req: Request, res: Response) => {
  const { topicId } = req.params
  const { author, text, parentCommentId } = req.body

  try {
    const newComment = await Comment.create({
      text,
      topicId: Number(topicId),
      parentCommentId: parentCommentId ? Number(parentCommentId) : null,
      author,
    })

    res.status(201).json(newComment)
  } catch (e) {
    console.error('Error creating comment:', e)
    res.status(500).json(e)
  }
}
