import UserAvatar from '@/assets/images/player-avatar.png'
import { BreadCrumbs } from '@/components/ui/BreadCrumbs/BreadCrumbs'
import { Button } from '@/components/ui/Button/Button'
import { Card } from '@/components/ui/Card/Card'
import { File } from '@/components/ui/File/File'
import { Icon } from '@/components/ui/Icon/Icon'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Pagination } from '@/components/ui/Pagination/Pagination'
import './Thread.scss'

const breadCrumbs = [
  { title: 'Главная', href: '/' },
  { title: 'Формумы', href: '/forum' },
  { title: 'Новые игры', href: '/forum' },
]

const COMMENT_COUNT = 3

export const Thread = () => (
  <div className="thread-page container">
    <PageTitle tagName="h1" text="Новые игры"></PageTitle>
    <div className="thread-page__info thread-info">
      <div className="thread-info__label">
        <Icon id="profile-icon" width={10} height={12}></Icon>
        <span>Timur233</span>
      </div>
      <div className="thread-info__label">
        <Icon id="time-icon" width={13} height={12}></Icon>
        <span>22.03.2025</span>
      </div>
    </div>
    <BreadCrumbs
      className="thread-page__bread-crumbs"
      breadCrumbs={breadCrumbs}></BreadCrumbs>
    <div className="thread-page__comments">
      {Array.from({ length: COMMENT_COUNT }).map((_, index) => {
        return (
          <Card key={index} className="comment">
            <div className="comment__author author">
              <img className="author__avatar" src={UserAvatar} alt="Avatar" />
              <span className="author__login">Timur233</span>
              <span className="author__date">22.03.2025</span>
              <div className="author__controlls controlls">
                <button className="controlls__item">
                  <Icon id="message-icon" width={12} height={12}></Icon>
                </button>
                <button className="controlls__item">
                  <Icon id="share-icon" width={12} height={12}></Icon>
                </button>
              </div>
            </div>
            <div className="comment__text">
              В данной теме игроки сервера LIME могут оставить отзыв / пожелания
              о работе наших агентов поддержки, а те
            </div>
          </Card>
        )
      })}
    </div>
    <Pagination className={'thread-page__pagination'} total={3}></Pagination>
    <div className="thread-page__answer answer">
      <form className="answer__form form" action="#">
        <label className="form__label" htmlFor="answer-message">
          <span>Ответить:</span>
        </label>
        <textarea
          className="form__textarea"
          name="answer-message"
          id="answer-message"
          placeholder="Сообщение"></textarea>
        <File></File>
        <Button text="Отправить" className="form__submit" useFixWidth></Button>
      </form>
    </div>
  </div>
)
