'use client'

import GameInfo from '@/assets/images/game-info.jpg'
import { Modal } from '@/components/common/Modal/Modal'
import { Game as GamePrototype } from '@/components/Game/Game'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Arrows } from './components/Arrows/Arrows'
import { FireControll } from './components/FireControll/FireControll'
import { KillsCounter } from './components/KillsCounter/KillsCounter'
import { PauseHelpFullscreen } from './components/PauseHelp/PauseHelpFullscreen'
import './Game.scss'
import { Icon } from '@/components/ui/Icon/Icon'
import { BtnStates } from '@/components/Game/gameTypes'
import { StatusScreen } from './components/StatusScreen/StatusScreen'
import { Button } from '@/components/ui/Button/Button'
import { Suspense } from 'react'
import { Loader } from '@/components/ui/Loader/Loader'
import Pobeda from '@/assets/sounds/pobeda.mp3'
import Proigrish from '@/assets/sounds/retreat-battle.mp3'
import { showNotificationWithSound } from '@/components/Game/sound/showNotification'
import { startBattleSound } from '@/components/Game/sound/battle'

import { toast } from 'react-toastify'
import { leaderboardApi } from '@/store/reducers/leaderbord-reducer'

interface GameState {
  lives: number
  isGameStarted: boolean
  isCompanyStarted: boolean
  isGamePaused: boolean
  isGameOver: boolean
  isGameWinning: boolean
}

const DEFAULT_LIVES_COUNT = 3

export const Game = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [buttonsState, setButtonsState] = useState<BtnStates>({
    up: false,
    down: false,
    left: false,
    right: false,
    fire: false,
  })
  const [gameState, setGameState] = useState<GameState>({
    lives: DEFAULT_LIVES_COUNT,
    isGameStarted: false,
    isCompanyStarted: false,
    isGamePaused: false,
    isGameOver: false,
    isGameWinning: false,
  })

  const [kills, setKills] = useState(0)
  const user = useSelector((state: RootState) => state.authReducer.user)

  const startGameHandler = () => {
    setGameState({
      lives: DEFAULT_LIVES_COUNT,
      isGameStarted: true,
      isCompanyStarted: false,
      isGamePaused: false,
      isGameOver: false,
      isGameWinning: false,
    })
  }

  const startCompanyHandler = () => {
    setGameState({
      lives: DEFAULT_LIVES_COUNT,
      isGameStarted: false,
      isCompanyStarted: true,
      isGamePaused: false,
      isGameOver: false,
      isGameWinning: false,
    })
  }

  const saveScore = useCallback(async () => {
    if (user?.id && kills > 0) {
      try {
        await leaderboardApi.addScore({
          id: user.id,
          login: user.login || 'Неизвестный игрок',
          avatar: user.avatar || undefined,
          score: kills,
        })
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Ошибка сохранения результата'
        )
      }
    }
  }, [kills, user])

  const pauseHandler = useCallback(() => {
    setGameState(state => ({
      ...state,
      isGamePaused: !state.isGamePaused,
    }))
  }, [])

  const deathHandler = useCallback((lives: number) => {
    setGameState(state => ({
      ...state,
      lives,
    }))
  }, [])

  const onKill = useCallback((newKills: number) => {
    setKills(newKills)
  }, [])

  const gameOverHandler = useCallback(
    (isVictory: boolean) => {
      setGameState({
        lives: 0,
        isGameOver: !isVictory,
        isGameWinning: isVictory,
        isGameStarted: false,
        isCompanyStarted: false,
        isGamePaused: true,
      })
      startBattleSound.stop()
      if (isVictory) {
        showNotificationWithSound(
          'Победа!',
          { body: 'Вы уничтожили врагов!' },
          Pobeda
        )
      } else {
        showNotificationWithSound(
          'Поражение',
          { body: 'Вы потерпели поражение!' },
          Proigrish
        )
      }

      saveScore()
    },
    [saveScore]
  )

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

  const getPauseIcon = () => {
    if (
      gameState.isGamePaused &&
      gameState.isGameStarted &&
      !gameState.isGameOver &&
      !gameState.isGameWinning
    ) {
      return <Icon id="arrow-right" width={12} height={16} />
    }
    return <Icon id="pause-icon" width={16} height={17} />
  }

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
    <Suspense fallback={<Loader show={true} />}>
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
                  onKill={onKill}
                  isGameStarted={gameState.isGameStarted}
                  isCompanyStarted={gameState.isCompanyStarted}
                  isGamePaused={gameState.isGamePaused}
                  onDeath={deathHandler}
                  onGameOver={gameOverHandler}
                  onKeyDownUp={changeButtonsState}
                />

                <StatusScreen
                  isVisible={
                    !gameState.isGameStarted &&
                    !gameState.isCompanyStarted &&
                    !gameState.isGameOver &&
                    !gameState.isGameWinning
                  }>
                  <Button
                    text={'Начать игру'}
                    onClick={startGameHandler}
                    useFixWidth
                  />
                  <Button
                    className={'custom-button_blue'}
                    text={'Начать кампанию'}
                    onClick={startCompanyHandler}
                    useFixWidth
                  />
                </StatusScreen>

                <StatusScreen
                  isVisible={gameState.isGameOver}
                  title="Game Over"
                  type="game-over">
                  <Button
                    text={'Начать заново'}
                    onClick={startGameHandler}
                    useFixWidth
                  />
                  <Button
                    className={'custom-button_blue'}
                    text={'Начать кампанию'}
                    onClick={startCompanyHandler}
                    useFixWidth
                  />
                </StatusScreen>

                <StatusScreen
                  isVisible={gameState.isGameWinning}
                  title="Победа!"
                  type="victory">
                  <Button
                    text={'Начать заново'}
                    onClick={startGameHandler}
                    useFixWidth
                  />
                  <Button
                    className={'custom-button_blue'}
                    text={'Начать кампанию'}
                    onClick={startCompanyHandler}
                    useFixWidth
                  />
                </StatusScreen>
              </div>
            </div>
            <div className="column col-4">
              <div className="game-controll">
                <KillsCounter className="game-controll__kills" kills={kills} />

                <CustomPageTitle
                  className="game-controll__lives"
                  text={gameState.lives.toString()}
                  tagName="span"
                />

                <PauseHelpFullscreen
                  className="game-controll__pause-help-buttons"
                  pauseIcon={getPauseIcon()}
                  pauseHandler={pauseHandler}
                  helpHandler={() => setIsInfoModalOpen(true)}
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
    </Suspense>
  )
}
