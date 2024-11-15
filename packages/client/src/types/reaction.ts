export interface Reaction {
  id: number
  topic_id: number
  user_id: number
  emoji_code: string
  created_at: Date
}

export interface ReactionCount {
  emoji_code: string
  count: string
  user_reacted: boolean
}

export interface ReactionResponse {
  success: boolean
  data: {
    reaction?: Reaction
    isAdded?: boolean
    reactions?: ReactionCount[]
  }
}

export interface ReactionProps {
  topicId: number
  className?: string
}
