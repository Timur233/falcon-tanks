import { RequestHandler } from 'express'
import { Reaction } from '../../models/sequelize/Reaction'

export const addReactionToComment: RequestHandler = async (req, res) => {
  const commentId = parseInt(req.params.commentId)
  const emojiCode = req.body.emojiCode
  const userId = parseInt(req.body.userId)

  try {
    const reaction = await Reaction.create({
      commentId,
      emojiCode,
      userId,
    })

    res.status(201).json(reaction)
  } catch (e) {
    res.status(500).json(e)
  }
}
