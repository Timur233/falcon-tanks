import { createClientAndConnect } from '../db'

const DEFAULT_THEME = 'standart'

export class UserThemeModel {
  static async initializeTables() {
    const client = await createClientAndConnect()

    if (!client) throw new Error('Failed to connect to database')

    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS user_theme (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL,
          theme_alias VARCHAR(50) DEFAULT '${DEFAULT_THEME}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `)
    } catch (error) {
      console.error('Error initializing tables:', error)

      throw error
    } finally {
      await client.end()
    }
  }

  static async addUserTheme(userId: number, themeAlias = DEFAULT_THEME) {
    const client = await createClientAndConnect()

    if (!client) throw new Error('Failed to connect to database')

    try {
      const result = await client.query(
        `
        INSERT INTO user_theme (user_id, theme_alias)
        VALUES ($1, $2)
        RETURNING user_id, theme_alias
      `,
        [userId, themeAlias]
      )

      return result.rows[0]
    } catch (error) {
      console.error('Database error:', error)

      throw error
    } finally {
      await client.end()
    }
  }

  static async updateUserTheme(userId: number, themeAlias = DEFAULT_THEME) {
    const client = await createClientAndConnect()

    if (!client) throw new Error('Failed to connect to database')

    try {
      const result = await client.query(
        `
        UPDATE user_theme SET theme_alias = $2
        WHERE user_id = $1
        RETURNING user_id, theme_alias
      `,
        [userId, themeAlias]
      )

      return result.rows[0]
    } catch (error) {
      console.error('Database error:', error)

      throw error
    } finally {
      await client.end()
    }
  }

  static async getUserTheme(userId: number) {
    const client = await createClientAndConnect()

    if (!client) throw new Error('Failed to connect to database')

    try {
      const result = await client.query(
        `
        SELECT user_id, theme_alias FROM user_theme
        WHERE user_id = $1
      `,
        [userId]
      )

      if (result.rowCount === 0) {
        return await UserThemeModel.addUserTheme(userId)
      }

      return result.rows[0]
    } catch (error) {
      console.error('Database error:', error)

      throw error
    } finally {
      await client.end()
    }
  }
}
