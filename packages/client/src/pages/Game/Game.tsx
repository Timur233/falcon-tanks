import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { Arrows } from './components/Arrows/Arrows'
import { KillsCounter } from './components/KillsCounter/KillsCounter'
import './Game.scss'
import { PauseHelp } from './components/PauseHelp/PauseHelp'
import { FireControll } from './components/FireControll/FireControll'
import { useEffect, useState } from 'react'
import { Modal } from '@/components/common/Modal/Modal'
import GameInfo from '@/assets/images/game-info.jpg'
import { Button } from '@/components/ui/Button/Button'

export const Game = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [buttonsState, setButtonsState] = useState({
    upButton: false,
    downButton: false,
    leftButton: false,
    rightButton: false,
    fireButton: false,
  })

  const pauseHandler = () => {
    console.log('pauseHandler')
  }

  const helpHandler = () => {
    setIsInfoModalOpen(true)
  }

  const arrowClickHandler = () => {
    return
  }

  const toggleButton = (event: Event, buttonName: string, state: boolean) => {
    event.preventDefault()

    setButtonsState({ ...buttonsState, [buttonName]: state })
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const isKeydown = event.type === 'keydown'

      switch (event.key) {
        case 'ArrowUp':
          toggleButton(event, 'upButton', isKeydown)
          break
        case 'ArrowDown':
          toggleButton(event, 'downButton', isKeydown)
          break
        case 'ArrowLeft':
          toggleButton(event, 'leftButton', isKeydown)
          break
        case 'ArrowRight':
          toggleButton(event, 'rightButton', isKeydown)
          break
        case ' ':
          toggleButton(event, 'fireButton', isKeydown)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    window.addEventListener('keyup', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('keyup', handleKey)
    }
  })

  return (
    <section className="game-page">
      <Modal show={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <img src={GameInfo} alt="Инструкция к игре" />
      </Modal>

      <div className="container-fluid game-page__container">
        <div className="row">
          <div className="column col-8">
            <div className="game-page__wrapper game-wrapper">
              <div className="game-wrapper__decor-hr"></div>
              <div className="game-wrapper__decor-vr"></div>
              Воот тут игра
              <div className="start-screen">
                <Button text="Начать игру" useFixWidth />
              </div>
            </div>
          </div>
          <div className="column col-4">
            <div className="game-controll">
              <KillsCounter className="game-controll__kills" kills={0} />

              <CustomPageTitle
                className="game-controll__lives"
                text="3"
                tagName="span"
              />

              <PauseHelp
                className="game-controll__pause-help-buttons"
                pauseHandler={pauseHandler}
                helpHandler={helpHandler}
              />

              <Arrows
                buttonsState={buttonsState}
                className="game-controll__arrows"
                clickHandler={arrowClickHandler}
              />

              <FireControll
                className="game-controll__fire"
                buttonPressed={buttonsState.fireButton}
                fireHandler={pauseHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
