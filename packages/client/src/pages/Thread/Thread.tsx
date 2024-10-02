import UserAvatar from '@/assets/images/player-avatar.png'
import { BreadCrumbs } from '@/components/ui/BreadCrumbs/BreadCrumbs'
import { Button } from '@/components/ui/Button/Button'
import { Card } from '@/components/ui/Card/Card'
import { File } from '@/components/ui/File/File'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Pagination } from '@/components/ui/Pagination/Pagination'
import './Thread.scss'

const breadCrumbs = [
  { title: 'Главная', href: '/' },
  { title: 'Формумы', href: '/forum' },
  { title: 'Новые игры', href: '/forum' },
]

export const Thread = () => {
  return (
    <div className="thread-page container">
      <PageTitle tagName="h1" text="Новые игры"></PageTitle>
      {/* TODO: add here svg after */}
      {/* https://github.com/Timur233/falcon-tanks/pull/11 */}
      {/* will be delivered to develop branch */}
      <div className="thread-page__info thread-info">
        <div className="thread-info__author">Timur233</div>
        <div className="thread-info__date">22.03.2025</div>
      </div>
      <BreadCrumbs
        className="thread-page__bread-crumbs"
        breadCrumbs={breadCrumbs}></BreadCrumbs>
      <div className="thread-page__comments">
        <Card className="comment">
          <div className="comment__author author">
            <img className="author__avatar" src={UserAvatar} alt="Avatar" />
            <span className="author__login">Timur233</span>
            <span className="author__date">22.03.2025</span>
            <div className="author__controlls controlls">
              <button className="controlls__item">Comment</button>
              <button className="controlls__item">Share</button>
            </div>
          </div>
          <div className="comment__text">
            В данной теме игроки сервера LIME могут оставить отзыв / пожелания о
            работе наших агентов поддержки, а те
          </div>
        </Card>
        <Card className="comment">
          <div className="comment__author author">
            <img className="author__avatar" src={UserAvatar} alt="Avatar" />
            <span className="author__login">Timur233</span>
            <span className="author__date">22.03.2025</span>
            <div className="author__controlls controlls">
              <button className="controlls__item">Comment</button>
              <button className="controlls__item">Share</button>
            </div>
          </div>
          <div className="comment__text">
            В данной теме игроки сервера LIME могут оставить отзыв / пожелания о
            работе наших агентов поддержки, а те
          </div>
        </Card>
        <Card className="comment">
          <div className="comment__author author">
            <img className="author__avatar" src={UserAvatar} alt="Avatar" />
            <span className="author__login">Timur233</span>
            <span className="author__date">22.03.2025</span>
            <div className="author__controlls controlls">
              <button className="controlls__item">Comment</button>
              <button className="controlls__item">Share</button>
            </div>
          </div>
          <div className="comment__text">
            В данной теме игроки сервера LIME могут оставить отзыв / пожелания о
            работе наших агентов поддержки, а те
          </div>
        </Card>
      </div>
      <Pagination className={'thread-page__pagination'} total={3}></Pagination>
      <div className="thread-page__answer answer">
        <form className="answer__form form" action="#">
          <label className="form__label" htmlFor="answer-message">
            <span>Ответить:</span>
            <div>|</div>
            <span>Ответить Timur233:</span>
          </label>
          <textarea
            className="form__textarea"
            name="answer-message"
            id="answer-message"
            placeholder="Сообщение"></textarea>
          <File></File>
          <Button
            text="Отправить"
            className="form__submit"
            useFixWidth></Button>
        </form>
      </div>
    </div>
  )
}
