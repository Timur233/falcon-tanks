'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import './Game.scss'
import { initializeCampanyEnemies } from '@/components/Game/enemy'
import { GET_PLAYER_DEFAULT_PARAMS } from '@/components/Game/player'
import { gameLoop } from '@/components/Game/gameLoop'
import {
  AbstractEntity,
  Effect,
  Obstacle,
  BtnStates,
  Bullet,
  GamePropsType,
  RandomPosition,
} from '@/components/Game/gameTypes'
import { initializeCompany1MapObstacle } from '@/components/Game/obstacle'
import { handleKeyDownUp, resetButtonsStates } from '@/components/Game/controls'
import { GameMap } from '@/components/Game/gameMap'
import {
  GRID_SIZE,
  PLAYER_DEFAULT_PARAMS,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/components/Game/constants'

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
  const gameMap = useRef<GameMap>(
    new GameMap({
      window_width: WINDOW_WIDTH,
      window_height: WINDOW_HEIGHT,
      grid_size: GRID_SIZE,
      player: GET_PLAYER_DEFAULT_PARAMS(),
      enemies: [],
      obstacles: [],
    })
  )
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const bulletsRef = useRef<AbstractEntity[]>([])
  const effectsRef = useRef<Effect[]>([])
  const livesRef = useRef(lives)
  const isPausedRef = useRef(false)
  const isStartedLoopRef = useRef(false)

  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const killsRef = useRef(0)

  const handleEnemyKilled = () => {
    killsRef.current += 1

    if (gameMap.current.enemies.length === 0) {
      onGameOver(true)
      setIsGameOver(true)
      setIsGameRunning(false)
    }

    onKill(killsRef.current)
  }

  const handleGameOver = useCallback(() => {
    onGameOver(false)
    setIsGameOver(true)
    setIsGameRunning(false)

    isPausedRef.current = true
  }, [onGameOver])

  const loop = useCallback(() => {
    if (!isPausedRef.current && !isGameOver && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')

      if (context) {
        gameLoop(
          context,
          canvasRef,
          gameMap,
          bulletsRef,
          effectsRef,
          livesRef,
          onDeath,
          handleGameOver,
          handleEnemyKilled
        )
      }

      requestAnimationFrame(loop)
    }
  }, [])

  const startGame = useCallback(() => {
    setIsGameRunning(true)
    setIsGameOver(false)
    gameMap.current.clearMap()
    const randomPositions: RandomPosition = {
      playerPosition: {
        x: PLAYER_DEFAULT_PARAMS.x,
        y: PLAYER_DEFAULT_PARAMS.y,
      },
      enemyCount: 5,
      obstacleCount: 80,
    }

    gameMap.current.getRandomPositions(randomPositions)

    isPausedRef.current = false
    livesRef.current = lives
    isStartedLoopRef.current = false
  }, [lives, gameMap])

  const startCompany = useCallback(() => {
    setIsGameRunning(true)
    setIsGameOver(false)
    gameMap.current.clearMap()
    gameMap.current.initializeCompanyMap(
      PLAYER_DEFAULT_PARAMS,
      initializeCampanyEnemies(),
      initializeCompany1MapObstacle()
    )

    isPausedRef.current = false
    livesRef.current = lives
    isStartedLoopRef.current = false
  }, [lives, gameMap])

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

    if (!isGameRunning) {
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

  return (
    <canvas
      ref={canvasRef}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT}></canvas>
  )
}
