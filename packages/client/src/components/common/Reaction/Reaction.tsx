import { useState, useEffect } from 'react'
import { Icon } from '@/components/ui/Icon/Icon'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { reactionApi, EmojiData } from '@/api/reactionApi'
import './Reaction.scss'

interface ReactionProps {
  topicId: number
  userId: string | null
  className?: string
}

export const Reaction = ({
  topicId,
  userId,
  className = '',
}: ReactionProps) => {
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false)
  const [availableEmojis, setAvailableEmojis] = useState<EmojiData[]>([])
  const [reactions, setReactions] = useState<{ [key: string]: number }>({})
  const [userReactions, setUserReactions] = useState<{
    [key: string]: boolean
  }>({})
  const user = useSelector((state: RootState) => state.authReducer.user)

  useEffect(() => {
    const loadEmojis = async () => {
      try {
        const response = await reactionApi.getAvailableEmojis()
        if (response.data.success) {
          setAvailableEmojis(response.data.data.emojis)
        }
      } catch (error) {
        console.error('Error loading emojis:', error)
      }
    }

    const loadReactions = async () => {
      try {
        const response = await reactionApi.getReactions(topicId, user.id)
        if (response.data.success) {
          const reactionsData = response.data.data.reactions
          const reactionCounts: { [key: string]: number } = {}
          const userReacted: { [key: string]: boolean } = {}

          reactionsData.forEach(
            (reaction: {
              emoji_code: string | number
              count: number
              user_reacted: boolean
            }) => {
              reactionCounts[reaction.emoji_code] = reaction.count
              userReacted[reaction.emoji_code] = reaction.user_reacted
            }
          )

          setReactions(reactionCounts)
          setUserReactions(userReacted)
        }
      } catch (error) {
        console.error('Error loading reactions:', error)
      }
    }

    loadEmojis()
    loadReactions()
  }, [topicId, user, userId])

  const handleReactionClick = async (emojiCode: string) => {
    if (!user) return

    try {
      const response = await reactionApi.toggleReaction(
        topicId,
        user.id,
        emojiCode
      )
      if (response.data.success) {
        const { isAdded, count } = response.data.data
        setReactions(prev => ({
          ...prev,
          [emojiCode]: count,
        }))
        setUserReactions(prev => ({
          ...prev,
          [emojiCode]: isAdded,
        }))
      }
    } catch (error) {
      console.error('Error toggling reaction:', error)
    }
    setEmojiPickerVisible(false)
  }

  return (
    <div className="reactions">
      <div className="reactions__list">
        {Object.entries(reactions).map(
          ([code, count]) =>
            count > 0 && (
              <button
                key={code}
                className={`reactions__item ${
                  userReactions[code] ? 'reactions__item--active' : ''
                }`}
                onClick={() => handleReactionClick(code)}
                disabled={!user}>
                {availableEmojis.find(e => e.code === code)?.unicode} {count}
              </button>
            )
        )}
      </div>

      <button
        className="reactions__add"
        onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
        title={user ? 'Add reaction' : 'Please login to react'}
        disabled={!user}>
        <Icon id="emoji-picker" width={24} height={24} />
      </button>

      {isEmojiPickerVisible && (
        <div className="reactions__picker">
          {availableEmojis.map(emoji => (
            <button
              key={emoji.code}
              className={`reactions__picker-item ${
                userReactions[emoji.code]
                  ? 'reactions__picker-item--active'
                  : ''
              }`}
              onClick={() => handleReactionClick(emoji.code)}
              title={emoji.name}>
              {emoji.unicode}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
