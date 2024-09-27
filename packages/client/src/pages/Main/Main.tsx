import './Main.scss'
import { useEffect, useState } from 'react'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Button } from '@/components/ui/Button/Button'
import { EnemyTank } from './components/EnemyTanks/EnemyTank'

export const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className={'promo-page'}>
      <EnemyTank side="left" isLoaded={isLoaded} />
      <EnemyTank side="right" isLoaded={isLoaded} />

      <div className="container">
        <div className="promo-page__content">
          <PageTitle
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
              href="/game"
              text="Вход / Регистрация"
            />
            <Button
              className="promo-page__btn"
              useFixWidth
              href="/game"
              text="Играть"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
