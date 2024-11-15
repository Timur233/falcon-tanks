import { useState, useEffect } from 'react'
import { reactionApi } from '@/api/reactionApi'

interface ReactionProps {
  topicId: number
  className?: string
}

export const Reaction = ({ topicId, className = '' }: ReactionProps) => {
  const [isActive, setIsActive] = useState(false)
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadReactions = async () => {
      try {
        const response = await reactionApi.getReactions(topicId)
        if (response.data.success) {
          const thumbsUpReaction = response.data.data.reactions?.find(
            (r: any) => r.emoji_code === 'thumbs_up'
          )
          if (thumbsUpReaction) {
            setCount(Number(thumbsUpReaction.count))
            setIsActive(thumbsUpReaction.user_reacted)
          }
        }
      } catch (error) {
        console.error('Error loading reactions:', error)
      }
    }

    loadReactions()
  }, [topicId])

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await reactionApi.toggleReaction(topicId, 'thumbs_up')

      if (response.data.success) {
        const { isAdded, count: newCount } = response.data.data
        setCount(newCount)
        setIsActive(isAdded)
      }
    } catch (error) {
      console.error('Error toggling reaction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`controlls__item ${
        isActive ? 'controlls__item--active' : ''
      } ${className}`}
      title={
        isLoading ? 'Loading...' : isActive ? 'Remove reaction' : 'Add reaction'
      }>
      👍 {count > 0 ? count : ''}
    </button>
  )
}
