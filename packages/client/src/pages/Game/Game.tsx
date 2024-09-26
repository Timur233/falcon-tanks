import React, { useEffect, useRef, useState } from 'react'
import './Game.scss'

interface Player {
  x: number
  y: number
  width: number
  height: number
  speed: number
  direction: { x: number; y: number }
}

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
}

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [player, setPlayer] = useState<Player>({
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    speed: 5,
    direction: { x: 0, y: 0 },
  })

  const obstacles: Obstacle[] = [
    { x: 200, y: 200, width: 50, height: 50 },
    { x: 400, y: 100, width: 50, height: 50 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setPlayer(prev => ({ ...prev, direction: { x: 0, y: -1 } }))
          break
        case 'ArrowDown':
          setPlayer(prev => ({ ...prev, direction: { x: 0, y: 1 } }))
          break
        case 'ArrowLeft':
          setPlayer(prev => ({ ...prev, direction: { x: -1, y: 0 } }))
          break
        case 'ArrowRight':
          setPlayer(prev => ({ ...prev, direction: { x: 1, y: 0 } }))
          break
        default:
          break
      }
    }

    const handleKeyUp = () => {
      setPlayer(prev => ({ ...prev, direction: { x: 0, y: 0 } }))
    }

    const detectCollision = (player: Player, obstacle: Obstacle): boolean => {
      return (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      )
    }

    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime
      if (deltaTime > 1000 / 60) {
        updatePlayerPosition()
        clearCanvas()
        drawPlayer()
        drawObstacles(context)
        lastTime = timestamp
      }
      requestAnimationFrame(gameLoop)
    }

    let lastTime = 0
    const updatePlayerPosition = () => {
      const newX = player.x + player.direction.x * player.speed
      const newY = player.y + player.direction.y * player.speed

      let collisionDetected = false
      obstacles.forEach(obstacle => {
        if (detectCollision({ ...player, x: newX, y: newY }, obstacle)) {
          collisionDetected = true
        }
      })

      if (!collisionDetected) {
        setPlayer(prev => ({
          ...prev,
          x: newX,
          y: newY,
        }))
      }
    }

    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const drawPlayer = () => {
      context.fillStyle = 'gray'
      context.fillRect(player.x, player.y, player.width, player.height)
    }

    const drawObstacles = (context: CanvasRenderingContext2D) => {
      context.fillStyle = 'black'
      obstacles.forEach(obstacle => {
        context.fillRect(
          obstacle.x,
          obstacle.y,
          obstacle.width,
          obstacle.height
        )
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    gameLoop(0)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [player, obstacles])

  return <canvas ref={canvasRef} width={800} height={600} />
}
