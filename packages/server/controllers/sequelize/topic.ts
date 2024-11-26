import { Request, Response } from 'express'
import { Topic } from '../../models/sequelize/Topic'
import { Comment } from '../../models/sequelize/Comment'
import { sequelize } from '../../instances/sequelize'

export const getTopics = async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comment,
          as: 'comments',
          limit: 1,
          order: [['id', 'ASC']],
        },
      ],
    })

    const topicsWithCommentCounts = await Promise.all(
      topics.map(async topic => {
        const commentCount = await Comment.count({
          where: { topicId: topic.id },
        })

        return {
          id: topic.id,
          title: topic.title,
          message: topic.comments?.[0]?.text || '',
          author: topic.author || 'Anonymous',
          createdAt: topic.createdAt,
          updatedAt: topic.updatedAt,
          commentsCount: commentCount,
        }
      })
    )

    res.status(200).json({
      threads: topicsWithCommentCounts,
      totalPages: Math.ceil(topics.length / 10),
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findByPk(parseInt(req.params.id), {
      include: [
        {
          model: Comment,
          as: 'comments',
          limit: 1,
          order: [['id', 'ASC']],
        },
      ],
    })

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' })
    }

    const result = {
      ...topic.toJSON(),
      message: topic.comments?.[0]?.text || '',
    }

    return res.status(200).json(result)
  } catch (e) {
    return res.status(500).json(e)
  }
}

export const createTopic = async (req: Request, res: Response) => {
  let transaction
  try {
    const { title, message, author } = req.body
    transaction = await sequelize.transaction()

    const topic = await Topic.create(
      {
        title,
        author,
      },
      { transaction }
    )

    const comment = await Comment.create(
      {
        text: message,
        topicId: topic.id,
        parentCommentId: null,
        author,
      },
      { transaction }
    )

    await transaction.commit()
    res.status(201).json({ ...topic.toJSON(), firstComment: comment })
  } catch (e) {
    if (transaction) await transaction.rollback()
    console.error('Error creating topic:', e)
    res.status(500).json(e)
  }
}
