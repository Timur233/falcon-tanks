import GameInfo from '@/assets/images/game-info.jpg'
import { Game as GamePrototype } from '@/components/Game/Game'
import { Modal } from '@/components/common/Modal/Modal'
import { Button } from '@/components/ui/Button/Button'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { useCallback, useEffect, useState } from 'react'
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
    up: false,
    down: false,
    left: false,
    right: false,
    fire: false,
  })
  const [gameState, setGameState] = useState({
    lives: DEFAULT_LIVES_COUNT,
    isGameStarted: false,
    isGamePused: false,
    isGameOver: false,
    isGameWinning: false,
  })

  const startGameHandler = () => {
    setGameState({
      lives: DEFAULT_LIVES_COUNT,
      isGameStarted: true,
      isGamePused: false,
      isGameOver: false,
      isGameWinning: false,
    })
  }

  const pauseHandler = useCallback(() => {
    setGameState(state => ({
      ...state,
      isGamePused: !state.isGamePused,
    }))
  }, [])

  const deathHandler = useCallback((lives: number) => {
    setGameState(state => ({
      ...state,
      lives,
    }))
  }, [])

  const gameOverHandler = useCallback(() => {
    setGameState({
      lives: 0,
      isGameOver: true,
      isGameWinning: false,
      isGameStarted: false,
      isGamePused: true,
    })
  }, [])

  const gameWiningHandler = useCallback(() => {
    setGameState({
      lives: 0,
      isGameOver: false,
      isGameWinning: true,
      isGameStarted: false,
      isGamePused: true,
    })
  }, [])

  const helpHandler = () => {
    setIsInfoModalOpen(true)
  }

  const arrowClickHandler = (
    eventName: string,
    key: string,
    keyCode: number
  ) => {
    const event = new KeyboardEvent(eventName, {
      key,
      code: key,
      keyCode,
      which: keyCode,
      bubbles: true,
      cancelable: true,
    })

    window.dispatchEvent(event)
  }

  const changeButtonsState = useCallback(
    (state: typeof buttonsState) => {
      setButtonsState({ ...state })
    },
    [setButtonsState]
  )

  useEffect(() => {
    const escapeKeyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        pauseHandler()
      }
    }

    window.addEventListener('keydown', escapeKeyDownHandler)

    return () => {
      window.removeEventListener('keydown', escapeKeyDownHandler)
    }
  }, [pauseHandler])

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
                onGameWining={gameWiningHandler}
                onKeyDownUp={changeButtonsState}
              />

              <div
                className={`start-screen${
                  !gameState.isGameStarted &&
                  !gameState.isGameOver &&
                  !gameState.isGameWinning
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

              <div
                className={`win-screen${
                  gameState.isGameWinning ? ' win-screen_show' : ''
                }`}>
                <span className="win-screen__title">Победа!</span>
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
                  gameState.isGamePused &&
                  gameState.isGameStarted &&
                  !gameState.isGameOver &&
                  !gameState.isGameWinning ? (
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
                mouseDownUpHandler={arrowClickHandler}
              />

              <FireControll
                className="game-controll__fire"
                buttonPressed={buttonsState.fire}
                mouseDownUpHandler={arrowClickHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
