import './Main.scss'
import { useEffect, useState } from 'react'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { Button } from '@/components/ui/Button/Button'
import { EnemyTank } from './components/EnemyTanks/EnemyTank'
import { useNavigate } from 'react-router-dom'

export const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className={'promo-page'}>
      <EnemyTank side="left" isLoaded={isLoaded} />
      <EnemyTank side="right" isLoaded={isLoaded} />

      <div className="container">
        <div className="promo-page__content">
          <CustomPageTitle
            className="promo-page__title"
            tagName="h1"
            text="Вернись на поле битвы!"
          />

          <div className="promo-page__desc">
            Испытай ностальгию и разрушай врагов! <br />
            Прокачай танк, сразись с боссами и стань героем эпохи. <br />
            Вступай в бой прямо сейчас!
          </div>

          <div className="promo-page__actions">
            <Button
              className="promo-page__btn custom-button_blue"
              useFixWidth
              onClick={() => navigate('/sign-in')}
              text="Вход / Регистрация"
            />
            <Button
              className="promo-page__btn"
              useFixWidth
              onClick={() => navigate('/game')}
              text="Играть"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
