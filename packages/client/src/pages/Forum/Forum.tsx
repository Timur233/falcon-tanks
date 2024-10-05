import PromoLogo from '@/assets/images/svg/FT-promo.svg'
import { Button } from '@/components/ui/Button/Button'
import { Card } from '@/components/ui/Card/Card'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Pagination } from '@/components/ui/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import './Forum.scss'
const THREADS_COUNT = 3

export const Forum = () => {
  const navigate = useNavigate()

  return (
    <div className="container forum-page">
      <img className="forum-page__logo" src={PromoLogo} alt="Tank wars" />
      <div className="forum-page__header header">
        <PageTitle
          text={'Форумы'}
          tagName="h1"
          className="header__title"></PageTitle>
        <Button
          text="Создать"
          onClick={() => navigate('/forum/new')}
          className="compact-button"
        />
      </div>
      <div className="forum-page__threads threads">
        <Card className="threads__item thread">
          <div className="thread__title">Новые игры</div>
          <div className="thread__views views">
            <span className="views__title">Просмотры:</span>
            <span className="views__count">222</span>
          </div>
          <div className="thread__answers answers">
            <span className="answers__title">Ответы:</span>
            <span className="answers__count">222</span>
          </div>
        </Card>

        <Card className="threads__item thread">
          <div className="thread__title">Новые игры</div>
          <div className="thread__views views">
            <span className="views__title">Просмотры:</span>
            <span className="views__count">222</span>
          </div>
          <div className="thread__answers answers">
            <span className="answers__title">Ответы:</span>
            <span className="answers__count">222</span>
          </div>
        </Card>

        <Card className="threads__item thread">
          <div className="thread__title">Новые игры</div>
          <div className="thread__views views">
            <span className="views__title">Просмотры:</span>
            <span className="views__count">222</span>
          </div>
          <div className="thread__answers answers">
            <span className="answers__title">Ответы:</span>
            <span className="answers__count">222</span>
          </div>
        </Card>
      </div>
      <Pagination total={6}></Pagination>
    </div>
  )
}
