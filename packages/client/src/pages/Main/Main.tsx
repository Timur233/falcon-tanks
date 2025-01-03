import { Button } from '@/components/ui/Button/Button'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { userService } from '@/services/userService'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EnemyTank } from './components/EnemyTanks/EnemyTank'
import './Main.scss'
import { YandexOAuth } from '@/services/o-auth/YandexOAuth'
import { Loader } from '@/components/ui/Loader/Loader'

export const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const userIsLogged = useRef(false)
  const navigate = useNavigate()
  const showLoader = useRef(true)

  useEffect(() => {
    userIsLogged.current = userService.isLoggedIn()

    YandexOAuth.signIn(navigate).finally(() => {
      showLoader.current = false
      setIsLoaded(true)
    })
  }, [navigate])

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
            {userIsLogged.current ? (
              <Button
                className="promo-page__btn"
                useFixWidth
                onClick={() => navigate('/game')}
                text="Играть"
              />
            ) : (
              <Button
                className="promo-page__btn custom-button_blue"
                useFixWidth
                onClick={() => navigate('/sign-in')}
                text="Вход / Регистрация"
              />
            )}
          </div>
        </div>
      </div>

      <Loader show={showLoader.current} />
    </section>
  )
}
