import { useCallback, useEffect, useRef, useState } from 'react'
import './Game.scss'
import { initializeEnemies } from '@/components/Game/enemy'
import { PLAYER_DEFAULT_PARAMS } from '@/components/Game/player'
import { gameLoop } from '@/components/Game/gameLoop'
import {
  handleKeyDownUp,
  updatePlayerMovement,
} from '@/components/Game/controls'
import { BtnStates, ControlsProps, Obstacle } from '@/components/Game/gameTypes'
import { initializeObstacle } from '@/components/Game/obstacle'

type GamePropsType = {
  lives: number
  isGameStarted: boolean
  isGamePused: boolean
  onDeath: (lives: number) => void
  onGameOver: () => void
  onKeyDownUp: (btnStates: BtnStates) => void
}

export const Game = (props: GamePropsType) => {
  const {
    lives,
    isGameStarted,
    isGamePused,
    onDeath,
    onGameOver,
    onKeyDownUp,
  } = props

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const playerRef = useRef(PLAYER_DEFAULT_PARAMS)
  const enemiesRef = useRef(initializeEnemies(5))
  const obstaclesRef = useRef<Obstacle[]>(initializeObstacle())
  const livesRef = useRef(0)
  const isPausedRef = useRef(false)
  const isStartedLoopRef = useRef(false)

  const [isGameRunning, setIsGameRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const handleGameOver = useCallback(() => {
    onGameOver()
    setIsGameOver(true)
    setIsGameRunning(false)

    isPausedRef.current = true
  }, [onGameOver])

  const loop = useCallback(() => {
    if (!isPausedRef.current && !isGameOver && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')

      if (context) {
        const moveProps: ControlsProps = {
          playerRef,
          obstacles: obstaclesRef.current,
          canvasWidth: canvasRef.current.width,
          canvasHeight: canvasRef.current.height,
        }

        updatePlayerMovement(moveProps)
        gameLoop(
          context,
          playerRef,
          enemiesRef,
          obstaclesRef.current,
          livesRef,
          onDeath,
          handleGameOver
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
    enemiesRef.current = initializeEnemies(5)
    isStartedLoopRef.current = false
  }, [lives])

  useEffect(() => {
    const handleKeyDownUpWrapper = (event: KeyboardEvent) => {
      handleKeyDownUp(event.type, event.key, onKeyDownUp)
    }

    window.addEventListener('keydown', handleKeyDownUpWrapper)
    window.addEventListener('keyup', handleKeyDownUpWrapper)

    return () => {
      window.removeEventListener('keydown', handleKeyDownUpWrapper)
      window.removeEventListener('keyup', handleKeyDownUpWrapper)
    }
  }, [onKeyDownUp])

  useEffect(() => {
    if (isGameRunning && !isGamePused && !isStartedLoopRef.current) {
      isStartedLoopRef.current = true

      requestAnimationFrame(loop)
    }
  }, [isGameRunning, isGamePused, loop])

  useEffect(() => {
    livesRef.current = lives
    isPausedRef.current = isGamePused

    if (!isGamePused) {
      isStartedLoopRef.current = false
    }

    if (isGameStarted && isGameRunning === false) startGame()
  }, [lives, isGameStarted, isGamePused, isGameRunning, startGame])

  return <canvas ref={canvasRef} width={800} height={600}></canvas>
}
