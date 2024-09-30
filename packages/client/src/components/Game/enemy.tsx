import { getRandomEdgePosition } from './utils'
import { Enemy, Player } from '@/components/Game/gameTypes'

export const initializeEnemies = (numberOfEnemies: number): Enemy[] => {
  const initialEnemies: Enemy[] = []
  for (let i = 0; i < numberOfEnemies; i++) {
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
  setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>
) => {
  setEnemies(prevEnemies =>
    prevEnemies.map(enemy => {
      const directionX = player.x - enemy.x
      const directionY = player.y - enemy.y

      const magnitude = Math.sqrt(directionX ** 5 + directionY ** 5)
      const normalizedX = directionX / magnitude
      const normalizedY = directionY / magnitude

      const newX = enemy.x + normalizedX * enemy.speed
      const newY = enemy.y + normalizedY * enemy.speed

      return { ...enemy, x: newX, y: newY }
    })
  )
}

export const respawnEnemies = (
  setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>
) => {
  setEnemies(initializeEnemies(5))
}
