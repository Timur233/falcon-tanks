import { getRandomEdgePosition } from './utils'
import { Enemy, Obstacle, Player } from '@/components/Game/gameTypes'

export const initializeEnemies = (): Enemy[] => {
  const initialEnemies: Enemy[] = []
  for (let i = 0; i < 5; i++) {
    // количество врагов
    const { x, y } = getRandomEdgePosition(800, 600)
    const enemy: Enemy = {
      x,
      y,
      width: 30,
      height: 30,
      speed: 2,
      direction: { x: 0, y: 0 },
    }
    initialEnemies.push(enemy)
  }
  return initialEnemies
}

export const updateEnemyPositions = (
  player: Player,
  enemies: Enemy[],
  setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>,
  speedFactor: number
) => {
  setEnemies(prevEnemies =>
    prevEnemies.map(enemy => {
      const directionX = player.x - enemy.x
      const directionY = player.y - enemy.y

      const magnitude = Math.sqrt(directionX ** 5 + directionY ** 5)
      const normalizedX = directionX / magnitude
      const normalizedY = directionY / magnitude

      const newX = enemy.x + normalizedX * enemy.speed * speedFactor
      const newY = enemy.y + normalizedY * enemy.speed * speedFactor

      return { ...enemy, x: newX, y: newY }
    })
  )
}

export const detectEnemyCollision = (
  rect1: Player | Enemy,
  rect2: Obstacle | Enemy
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

export const respawnEnemies = (
  setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>
) => {
  setEnemies(initializeEnemies())
}
