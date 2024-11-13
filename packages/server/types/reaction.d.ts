export interface Reaction {
  id: number
  topic_id: number
  user_id: number
  emoji_code: string
  created_at: Date
}
export interface ReactionResponse {
  success: boolean
  data: {
    reactions?: any[]
    isAdded?: boolean
    count?: number
  }
  error?: string
}
