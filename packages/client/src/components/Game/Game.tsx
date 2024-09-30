import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Game.scss'
import { initializeEnemies } from '@/components/Game/enemy'
import { initializePlayer } from '@/components/Game/player'
import { gameLoop } from '@/components/Game/gameLoop'
import {
  handleKeyDown,
  handleKeyUp,
  updatePlayerMovement,
} from '@/components/Game/controls'
import { ControlsProps, Obstacle } from '@/components/Game/gameTypes'
import { initializeObstacle } from '@/components/Game/obstacle'

const speedFactor = 1
const livesUse = 3

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let context: CanvasRenderingContext2D | null | undefined
  const [lives, setLives] = useState<number>(livesUse)
  const [player, setPlayer] = useState(initializePlayer())
  const [enemies, setEnemies] = useState(initializeEnemies())
  const [obstacles, setObstacles] = useState<Obstacle[]>(initializeObstacle())
  const [isPaused, setIsPaused] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [delay, setDelay] = useState(0)
  const [lastTimestamp, setLastTimestamp] = useState(0)

  const togglePause = () => {
    setIsPaused(prev => !prev)
  }

  const handleGameOver = useCallback(() => {
    setIsGameOver(true)
    setIsPaused(true)
  }, [])

  const handleContinue = () => {
    setIsPaused(false)
    if (isGameOver) {
      setIsGameOver(false)
      setLives(livesUse)
      setGameStarted(false)
    }
  }

  const loop = useCallback(
    (timestamp: number) => {
      if (!isPaused && !isGameOver && context) {
        if (lastTimestamp) {
          const elapsed = timestamp - lastTimestamp
          setDelay(elapsed)
        }
        const canvas = getCanvas()
        if (!canvas) return
        const moveProps: ControlsProps = {
          player,
          setPlayer,
          speedFactor,
          obstacles,
          canvasWidth: canvas.width,
          canvasHeight: canvas.height,
        }
        updatePlayerMovement(moveProps)
        gameLoop(
          timestamp,
          context,
          player,
          setPlayer,
          enemies,
          setEnemies,
          obstacles,
          lives,
          setLives,
          speedFactor,
          handleGameOver,
          isPaused,
          isGameOver
        )
        requestAnimationFrame(loop)
      }
    },
    [
      isPaused,
      isGameOver,
      lastTimestamp,
      player,
      enemies,
      lives,
      handleGameOver,
    ]
  )

  useEffect(() => {
    const handleKeyDownWrapper = (event: KeyboardEvent) =>
      handleKeyDown(event.key)
    const handleKeyUpWrapper = (event: KeyboardEvent) => handleKeyUp(event.key)

    window.addEventListener('keydown', handleKeyDownWrapper)
    window.addEventListener('keyup', handleKeyUpWrapper)

    return () => {
      window.removeEventListener('keydown', handleKeyDownWrapper)
      window.removeEventListener('keyup', handleKeyUpWrapper)
    }
  }, [])

  const getCanvas = () => canvasRef.current

  const getContext = () => getCanvas()?.getContext('2d')

  useEffect(() => {
    if (gameStarted && !isPaused) {
      context = getContext()

      if (context) {
        requestAnimationFrame(loop)
      }
    }
  }, [isPaused, isGameOver, loop])

  const startGame = () => {
    setGameStarted(true)
    handleContinue()
  }

  return (
    <div className="game-container">
      <div className="lives">{`Жизни: ${lives}`}</div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>

      {!gameStarted ? (
        <button onClick={startGame}>Начать игру</button>
      ) : (
        <button onClick={togglePause}>
          {isPaused ? 'Продолжить' : 'Пауза'}
        </button>
      )}

      {/* Модальное окно при проигрыше */}
      {isGameOver && (
        <div className="modal">
          <h2>Игра окончена</h2>
          <button onClick={handleContinue}>Продолжить</button>
        </div>
      )}
    </div>
  )
}
