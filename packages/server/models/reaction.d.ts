export declare class ReactionModel {
  static initializeTables(): Promise<void>
  static getReactions(topicId: number): Promise<any[]>
  static toggleReaction(
    topicId: number,
    userId: number,
    emojiCode: string
  ): Promise<{
    success: boolean
    data: {
      isAdded: boolean
      count: number
    }
  }>
  static getAvailableEmojis(): Promise<any[]>
}
