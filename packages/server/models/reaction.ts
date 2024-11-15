import { DEFAULT_EMOJIS } from '../data/emoji'
import { createClientAndConnect } from '../db'

export class ReactionModel {
  static async initializeTables() {
    const client = await createClientAndConnect()
    if (!client) {
      throw new Error('Failed to connect to database')
    }

    try {
      await client.query(`
                CREATE TABLE IF NOT EXISTS emoji_reference (
                    code VARCHAR(50) PRIMARY KEY,
                    unicode VARCHAR(10) NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            `)

      await client.query(`
                CREATE TABLE IF NOT EXISTS reactions (
                    id SERIAL PRIMARY KEY,
                    topic_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    emoji_code VARCHAR(50) REFERENCES emoji_reference(code),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(topic_id, user_id, emoji_code)
                )
            `)

      for (const emoji of DEFAULT_EMOJIS) {
        await client.query(
          `
                    INSERT INTO emoji_reference (code, unicode, name)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (code) DO UPDATE SET
                        unicode = EXCLUDED.unicode,
                        name = EXCLUDED.name
                `,
          [emoji.code, emoji.unicode, emoji.name]
        )
      }
    } catch (error) {
      console.error('Error initializing tables:', error)
      throw error
    } finally {
      await client.end()
    }
  }

  static async getReactions(topicId: number) {
    const client = await createClientAndConnect()
    if (!client) {
      throw new Error('Failed to connect to database')
    }

    try {
      const result = await client.query(
        `
                SELECT 
                    r.emoji_code,
                    COUNT(*)::integer as count,
                    bool_or(r.user_id = $2) as user_reacted
                FROM reactions r
                WHERE r.topic_id = $1
                GROUP BY r.emoji_code
            `,
        [topicId, 1]
      ) // TODO: Заменить на реального пользователя

      return result.rows
    } catch (error) {
      console.error('Database error:', error)
      throw error
    } finally {
      await client.end()
    }
  }

  static async toggleReaction(
    topicId: number,
    userId: number,
    emojiCode: string
  ) {
    const client = await createClientAndConnect()
    if (!client) {
      throw new Error('Failed to connect to database')
    }

    try {
      await client.query('BEGIN')

      const existingReaction = await client.query(
        `SELECT id FROM reactions 
                WHERE topic_id = $1 AND user_id = $2 AND emoji_code = $3`,
        [topicId, userId, emojiCode]
      )

      let isAdded = false
      if (existingReaction.rows.length > 0) {
        await client.query(
          `DELETE FROM reactions 
                    WHERE topic_id = $1 AND user_id = $2 AND emoji_code = $3`,
          [topicId, userId, emojiCode]
        )
      } else {
        await client.query(
          `INSERT INTO reactions (topic_id, user_id, emoji_code)
                    VALUES ($1, $2, $3)`,
          [topicId, userId, emojiCode]
        )
        isAdded = true
      }

      const countResult = await client.query(
        `SELECT COUNT(*) as count
                FROM reactions
                WHERE topic_id = $1 AND emoji_code = $2`,
        [topicId, emojiCode]
      )

      await client.query('COMMIT')

      return {
        success: true,
        data: {
          isAdded,
          count: parseInt(countResult.rows[0].count),
        },
      }
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  static async getAvailableEmojis() {
    const client = await createClientAndConnect()
    if (!client) {
      throw new Error('Failed to connect to database')
    }

    try {
      const result = await client.query(`
                SELECT code, unicode, name 
                FROM emoji_reference 
                ORDER BY created_at ASC
            `)

      return result.rows
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error
    } finally {
      await client.end()
    }
  }
}
