import localApi from './localApi'

export interface EmojiData {
  code: string
  unicode: string
  name: string
}

interface EmojisResponse {
  success: boolean
  data: {
    emojis: EmojiData[]
  }
}

export const reactionApi = {
  async getReactions(topicId: number, userId: string | null) {
    return await localApi.get(
      `/api/topics/${topicId}/reactions?userId=${userId}`
    )
  },

  async toggleReaction(
    topicId: number,
    userId: string | null,
    emojiCode: string
  ) {
    return await localApi.post(`/api/topics/${topicId}/reactions`, {
      userId,
      emojiCode,
    })
  },

  async getAvailableEmojis() {
    return await localApi.get<EmojisResponse>('/api/emojis')
  },
}
