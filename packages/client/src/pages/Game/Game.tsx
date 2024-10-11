import GameInfo from '@/assets/images/game-info.jpg'
import { Game as GamePrototype } from '@/components/Game/Game'
import { Modal } from '@/components/common/Modal/Modal'
import { Button } from '@/components/ui/Button/Button'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { useEffect, useState } from 'react'
import { Arrows } from './components/Arrows/Arrows'
import { FireControll } from './components/FireControll/FireControll'
import { KillsCounter } from './components/KillsCounter/KillsCounter'
import { PauseHelp } from './components/PauseHelp/PauseHelp'
import './Game.scss'
import { Icon } from '@/components/ui/Icon/Icon'

const DEFAULT_LIVES_COUNT = 3

export const Game = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [buttonsState, setButtonsState] = useState({
    upButton: false,
    downButton: false,
    leftButton: false,
    rightButton: false,
    fireButton: false,
  })
  const [gameState, setGameState] = useState({
    lives: DEFAULT_LIVES_COUNT,
    isGameStarted: false,
    isGamePused: false,
    isGameOver: false,
  })

  const startGameHandler = () => {
    setGameState({
      lives: DEFAULT_LIVES_COUNT,
      isGameStarted: true,
      isGamePused: false,
      isGameOver: false,
    })
  }

  const pauseHandler = () => {
    setGameState(state => ({
      ...state,
      isGamePused: !gameState.isGamePused,
    }))
  }

  const deathHandler = (lives: number) => {
    setGameState(state => ({
      ...state,
      lives,
    }))
  }

  const gameOverHandler = () => {
    setGameState({
      lives: 0,
      isGameOver: true,
      isGameStarted: false,
      isGamePused: true,
    })
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

  // TODO: Заменить на финальное решение для отслеживания кнопок
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
              <GamePrototype
                lives={gameState.lives}
                isGameStarted={gameState.isGameStarted}
                isGamePused={gameState.isGamePused}
                onDeath={deathHandler}
                onGameOver={gameOverHandler}
              />

              <div
                data-is-started={gameState.isGameStarted}
                data-is-gameover={gameState.isGameOver}
                className={`start-screen${
                  !gameState.isGameStarted && !gameState.isGameOver
                    ? ' start-screen_show'
                    : ''
                }`}>
                <Button
                  text="Начать игру"
                  onClick={startGameHandler}
                  useFixWidth
                />
              </div>

              <div
                className={`game-over-screen${
                  gameState.isGameOver ? ' game-over-screen_show' : ''
                }`}>
                <span className="game-over-screen__title">Game Over</span>
                <Button
                  text="Начать заново"
                  onClick={startGameHandler}
                  useFixWidth
                />
              </div>
            </div>
          </div>
          <div className="column col-4">
            <div className="game-controll">
              <KillsCounter className="game-controll__kills" kills={0} />

              <CustomPageTitle
                className="game-controll__lives"
                text={gameState.lives.toString()}
                tagName="span"
              />

              <PauseHelp
                className="game-controll__pause-help-buttons"
                pauseIcon={
                  gameState.isGamePused && !gameState.isGameOver ? (
                    <Icon id="arrow-right" width={12} height={16}></Icon>
                  ) : (
                    <Icon id="pause-icon" width={16} height={17}></Icon>
                  )
                }
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
