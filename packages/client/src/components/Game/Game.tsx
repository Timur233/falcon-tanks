import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Game.scss'
import { initializeEnemies } from '@/components/Game/enemy'
import { PLAYER_DEFAULT_PARAMS } from '@/components/Game/player'
import { gameLoop } from '@/components/Game/gameLoop'
import {
  handleKeyDown,
  handleKeyUp,
  updatePlayerMovement,
} from '@/components/Game/controls'
import { ControlsProps, Obstacle } from '@/components/Game/gameTypes'
import { initializeObstacle } from '@/components/Game/obstacle'
import { Modal } from '../common/Modal/Modal'

const livesUse = 3

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const playerRef = useRef(PLAYER_DEFAULT_PARAMS)
  const enemiesRef = useRef(initializeEnemies())
  const obstaclesRef = useRef<Obstacle[]>(initializeObstacle())
  const livesRef = useRef(livesUse)
  const [gameStarted, setGameStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev)
    isPausedRef.current = !isPausedRef.current // Обновляем ref для паузы
  }, [])

  const handleGameOver = useCallback(() => {
    setIsGameOver(true)
    setIsPaused(true)
    isPausedRef.current = true
  }, [])

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
          handleGameOver
        )
      }
      requestAnimationFrame(loop)
    }
  }, [isGameOver, handleGameOver, livesRef])

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
    isPausedRef.current = false
    setIsGameOver(false)
    livesRef.current = 3
    playerRef.current = { ...PLAYER_DEFAULT_PARAMS }
    enemiesRef.current = initializeEnemies()
  }

  return (
    <div className="game-container">
      <div className="lives">{`Жизни: ${livesRef.current.toString()}`}</div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>

      {!gameStarted ? (
        <button onClick={startGame}>Начать игру</button>
      ) : (
        <button onClick={togglePause}>
          {isPaused ? 'Продолжить' : 'Пауза'}
        </button>
      )}

      <Modal show={isGameOver} onClose={() => setIsGameOver(false)}>
        <h2>Игра окончена</h2>
        <button onClick={startGame}>Заново</button>
      </Modal>
    </div>
  )
}
