import { Enemy, Obstacle, Player } from '@/components/Game/gameTypes'

export const getRandomEdgePosition = (
  canvasWidth: number,
  canvasHeight: number
): { x: number; y: number } => {
  const edge = Math.floor(Math.random() * 4)
  switch (edge) {
    case 0:
      return { x: Math.random() * canvasWidth, y: 0 }
    case 1:
      return { x: canvasWidth, y: Math.random() * canvasHeight }
    case 2:
      return { x: Math.random() * canvasWidth, y: canvasHeight }
    case 3:
      return { x: 0, y: Math.random() * canvasHeight }
    default:
      return { x: 0, y: 0 }
  }
}

export const clearCanvas = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

export const drawPlayer = (
  context: CanvasRenderingContext2D,
  player: Player
) => {
  context.fillStyle = 'gray'
  context.fillRect(player.x, player.y, player.width, player.height)
}

export const drawEnemies = (
  context: CanvasRenderingContext2D,
  enemies: Enemy[]
) => {
  context.fillStyle = 'red'
  enemies.forEach(enemy => {
    context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
  })
}

export const drawObstacles = (
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
) => {
  context.fillStyle = 'black'
  obstacles.forEach(obstacle => {
    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
  })
}
