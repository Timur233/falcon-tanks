import { Request, Response } from 'express'
import { ReactionModel } from '../models/reaction-sql'

export class ReactionController {
  static async getReactions(req: Request, res: Response) {
    try {
      const topicId = parseInt(req.params.topicId)
      const userId = parseInt(req.query.userId as string)
      if (isNaN(topicId) || isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid topic ID or user ID' })
      }

      const reactions = await ReactionModel.getReactions(topicId, userId)
      return res.json({ success: true, data: { reactions } })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  static async toggleReaction(req: Request, res: Response) {
    try {
      const topicId = parseInt(req.params.topicId)
      const userId = parseInt(req.body.userId)
      const { emojiCode } = req.body

      if (isNaN(topicId) || isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid topic ID or user ID' })
      }

      if (!emojiCode) {
        return res.status(400).json({ error: 'Emoji code is required' })
      }

      const result = await ReactionModel.toggleReaction(
        topicId,
        userId,
        emojiCode
      )
      return res.json(result)
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  static async getAvailableEmojis(_req: Request, res: Response) {
    try {
      const emojis = await ReactionModel.getAvailableEmojis()
      return res.json({
        success: true,
        data: { emojis },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}
