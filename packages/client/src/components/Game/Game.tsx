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

const maxFPS = 60
const livesUse = 3

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [lives, setLives] = useState<number>(livesUse)
  const [player, setPlayer] = useState(initializePlayer())
  const [enemies, setEnemies] = useState(initializeEnemies(5))
  const [obstacles] = useState<Obstacle[]>(initializeObstacle())
  const [isPaused, setIsPaused] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
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
    setIsGameOver(false)
    setLives(livesUse)
    setPlayer(initializePlayer())
    setEnemies(initializeEnemies(5))
  }

  const loop = useCallback(
    (timestamp: number) => {
      if (!isPaused && !isGameOver && canvasRef.current) {
        const deltaTime = timestamp - lastTimestamp

        if (deltaTime >= 1000 / maxFPS) {
          setLastTimestamp(timestamp)
          const context = canvasRef.current.getContext('2d')
          if (context) {
            const moveProps: ControlsProps = {
              player,
              setPlayer,
              obstacles,
              canvasWidth: canvasRef.current.width,
              canvasHeight: canvasRef.current.height,
            }
            updatePlayerMovement(moveProps)
            gameLoop(
              context,
              player,
              setPlayer,
              enemies,
              setEnemies,
              obstacles,
              lives,
              setLives,
              handleGameOver,
              isPaused,
              isGameOver
            )
          }
        }
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

  useEffect(() => {
    if (gameStarted && !isPaused) {
      requestAnimationFrame(loop)
    }
  }, [gameStarted, isPaused, loop])

  const startGame = () => {
    setGameStarted(true)
    setIsPaused(false)
    setIsGameOver(false)
    setLives(livesUse)
    setPlayer(initializePlayer())
    setEnemies(initializeEnemies(5))
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
