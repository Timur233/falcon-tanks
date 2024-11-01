import { useCallback, useEffect, useRef, useState } from 'react'
import './Game.scss'
import {
  initializeCampanyEnemies,
  initializeRandomEnemies,
} from '@/components/Game/enemy'
import { GET_PLAYER_DEFAULT_PARAMS } from '@/components/Game/player'
import { gameLoop } from '@/components/Game/gameLoop'
import {
  AbstractEntity,
  Effect,
  Obstacle,
  BtnStates,
} from '@/components/Game/gameTypes'
import {
  initializeCompanyMapObstacle,
  initializeRandomObstacle,
} from '@/components/Game/obstacle'
import { handleKeyDownUp, resetButtonsStates } from '@/components/Game/controls'

let PLAYER_DEFAULT_PARAMS = GET_PLAYER_DEFAULT_PARAMS()

type GamePropsType = {
  lives: number
  onKill: (kills: number) => void
  isGameStarted: boolean
  isCompanyStarted: boolean
  isGamePaused: boolean
  onDeath: (lives: number) => void
  onGameOver: (isVictory: boolean) => void
  onKeyDownUp: (btnStates: BtnStates) => void
}

export const Game = (props: GamePropsType) => {
  const {
    lives,
    onKill,
    isGameStarted,
    isCompanyStarted,
    isGamePaused,
    onDeath,
    onGameOver,
    onKeyDownUp,
  } = props

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const playerRef = useRef(PLAYER_DEFAULT_PARAMS)
  const enemiesRef = useRef(initializeRandomEnemies(5))
  const bulletsRef = useRef<AbstractEntity[]>([])
  const obstaclesRef = useRef<Obstacle[]>(
    initializeRandomObstacle(20, playerRef, enemiesRef)
  )
  const effectsRef = useRef<Effect[]>([])
  const livesRef = useRef(lives)
  const isPausedRef = useRef(false)
  const isStartedLoopRef = useRef(false)

  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const killsRef = useRef(0)

  const handleEnemyKilled = () => {
    killsRef.current += 1

    if (enemiesRef.current.length === 0) {
      onGameOver(true)
      setIsGameOver(true)
      setIsGameRunning(false)

      PLAYER_DEFAULT_PARAMS = GET_PLAYER_DEFAULT_PARAMS()
    }

    onKill(killsRef.current)
  }

  const handleGameOver = useCallback(() => {
    onGameOver(false)
    setIsGameOver(true)
    setIsGameRunning(false)

    PLAYER_DEFAULT_PARAMS = GET_PLAYER_DEFAULT_PARAMS()

    isPausedRef.current = true
  }, [onGameOver])

  const loop = useCallback(() => {
    if (!isPausedRef.current && !isGameOver && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')

      if (context) {
        gameLoop(
          context,
          canvasRef,
          playerRef,
          enemiesRef,
          bulletsRef,
          obstaclesRef,
          effectsRef,
          livesRef,
          onDeath,
          handleGameOver,
          handleEnemyKilled
        )
      }

      requestAnimationFrame(loop)
    }
  }, [isGameOver, onDeath, handleGameOver])

  const startGame = useCallback(() => {
    setIsGameRunning(true)
    setIsGameOver(false)

    isPausedRef.current = false
    livesRef.current = lives
    playerRef.current = PLAYER_DEFAULT_PARAMS
    enemiesRef.current = initializeRandomEnemies(5)
    obstaclesRef.current = initializeRandomObstacle(20, playerRef, enemiesRef)
    isStartedLoopRef.current = false
  }, [lives])

  const startCompany = useCallback(() => {
    setIsGameRunning(true)
    setIsGameOver(false)

    isPausedRef.current = false
    livesRef.current = lives
    playerRef.current = PLAYER_DEFAULT_PARAMS
    enemiesRef.current = initializeCampanyEnemies()
    obstaclesRef.current = initializeCompanyMapObstacle()
    isStartedLoopRef.current = false
  }, [lives])

  useEffect(() => {
    const handleKeyDownUpWrapper = (event: KeyboardEvent) => {
      handleKeyDownUp(event.type, event.key, onKeyDownUp)
    }

    window.addEventListener('keydown', handleKeyDownUpWrapper)
    window.addEventListener('keyup', handleKeyDownUpWrapper)
    window.addEventListener('blur', resetButtonsStates)

    return () => {
      window.removeEventListener('keydown', handleKeyDownUpWrapper)
      window.removeEventListener('keyup', handleKeyDownUpWrapper)
      window.removeEventListener('blur', resetButtonsStates)
    }
  }, [onKeyDownUp])

  useEffect(() => {
    if (isGameRunning && !isGamePaused && !isStartedLoopRef.current) {
      isStartedLoopRef.current = true

      requestAnimationFrame(loop)
    }
  }, [isGameRunning, isGamePaused, loop])

  useEffect(() => {
    livesRef.current = lives
    isPausedRef.current = isGamePaused

    if (!isGamePaused) {
      isStartedLoopRef.current = false
    }

    if (isGameRunning === false) {
      if (isGameStarted) {
        startGame()
      } else if (isCompanyStarted) {
        startCompany()
      }
    }
  }, [
    lives,
    isGameStarted,
    isGamePaused,
    isGameRunning,
    startGame,
    isCompanyStarted,
    startCompany,
  ])

  return <canvas ref={canvasRef} width={800} height={600}></canvas>
}
