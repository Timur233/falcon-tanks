import PlayerAvatar from '@/assets/images/player-avatar.png'
import StarColor from '@/assets/images/stars/star-color.png'
import PromoLogo from '@/assets/images/svg/FT-promo.svg'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import './Leaderboard.scss'

const RECORD_ITEMS_COUNT = 6

export const Leaderboard = () => {
  return (
    <div className="container leaderboard-page">
      <img className="leaderboard-page__logo" src={PromoLogo} alt="Tank wars" />
      <PageTitle
        text={'Рекорды'}
        tagName="h1"
        className="leaderboard-page__title"></PageTitle>
      <div className="records">
        {Array.from({ length: RECORD_ITEMS_COUNT }).map(_ => {
          return (
            <div className="records__item-wrapper">
              <div className="records__item record-item">
                <div className="record-item__user-info user-info">
                  <img
                    className="user-info__avatar"
                    src={PlayerAvatar}
                    alt="Avatar"
                  />
                  <div className="user-info__login">
                    <span className="record-item__title">Логин</span>
                    <h2 className="record-item__value">Gamer 1235r124</h2>
                  </div>
                </div>
                <div className="record-item__user-result user-result">
                  <div className="user-result__score">
                    <span className="record-item__title">Рекорд</span>
                    <h2 className="record-item__value">999</h2>
                  </div>
                  <img
                    className="user-result__star"
                    src={StarColor}
                    alt="Медаль"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
