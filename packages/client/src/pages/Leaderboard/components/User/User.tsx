import './User.scss'
import { AVATAR_SRC } from '@/components/ui/Avatar/Avatar'
import GoldMedal from '@/assets/images/stars/gold.png'
import SilverMedal from '@/assets/images/stars/silver.png'
import BronzeMedal from '@/assets/images/stars/bronze.png'
import DefaultMedal from '@/assets/images/stars/default-star.png'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'

export interface LeaderboardUser {
  id: string
  login: string
  avatar?: string
  score: number
}

export interface LeaderboardData {
  data: {
    id: string
    login: string
    avatar: string
    score: number
  }
  ratingFieldName: string
  teamName: string
}

interface UserProps {
  user: LeaderboardUser
  rank: number
}

export const User = ({ user, rank }: UserProps) => {
  const getMedalIcon = (rank: number): string => {
    switch (rank) {
      case 1:
        return GoldMedal
      case 2:
        return SilverMedal
      case 3:
        return BronzeMedal
      default:
        return DefaultMedal
    }
  }

  const getMedalAlt = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'Золотая медаль'
      case 2:
        return 'Серебряная медаль'
      case 3:
        return 'Бронзовая медаль'
      default:
        return 'Медаль участника'
    }
  }

  const medalIcon = getMedalIcon(rank)
  const medalAlt = getMedalAlt(rank)

  return (
    <div
      className={`records__item-wrapper ${
        rank <= 3 ? `records__item-wrapper--rank-${rank}` : ''
      }`}>
      <div className="records__item">
        <div className="records__item-info">
          <img
            className="records__item-avatar"
            src={
              user.avatar ? `${AVATAR_SRC}/${user.avatar}` : AvatarPlaceholder
            }
            alt="Avatar"
          />
          <div className="records__item-login">
            <span className="records__item-rank">#{rank}</span>
            <h2 className="records__item-name">{user.login}</h2>
          </div>
        </div>

        <div className="records__item-result">
          <div className="records__item-score">
            <span className="records__item-label">Рекорд</span>
            <h2 className="records__item-value">{user.score}</h2>
          </div>
          <img className="records__item-medal" src={medalIcon} alt={medalAlt} />
        </div>
      </div>
    </div>
  )
}
