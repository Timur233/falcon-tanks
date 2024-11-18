import { Request, Response } from 'express'
import { UserThemeModel } from '../models/user_theme'

export class UserThemeController {
  static async getTheme(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId)

      if (isNaN(userId))
        return res.status(400).json({ error: 'Invalid user ID' })

      const userTheme = await UserThemeModel.getUserTheme(userId)

      return res.json({
        success: true,
        data: {
          theme: userTheme,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  static async updateTheme(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId)
      const themeAlias = req.body.themeAlias || undefined

      if (isNaN(userId))
        return res.status(400).json({ error: 'Invalid user ID' })

      const userTheme = await UserThemeModel.updateUserTheme(userId, themeAlias)

      return res.json({
        success: true,
        data: {
          theme: userTheme,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}
