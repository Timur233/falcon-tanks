import localApi from './localApi'

export const reactionApi = {
  async getReactions(topicId: number) {
    return await localApi.get(`/api/topics/${topicId}/reactions`)
  },

  async toggleReaction(topicId: number, emojiCode: string) {
    return await localApi.post(`/api/topics/${topicId}/reactions`, {
      emojiCode,
    })
  },

  async getAvailableEmojis() {
    return await localApi.get('/api/emojis')
  },
}
