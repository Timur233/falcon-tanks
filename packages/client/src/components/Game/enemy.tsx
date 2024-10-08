import { getRandomEdgePosition } from './utils'
import { Enemy, Player } from '@/components/Game/gameTypes'

export const initializeEnemies = (numberOfEnemies: number) => {
  const initialEnemies: Enemy[] = []
  for (let i = 0; i < numberOfEnemies; i++) {
    // количество врагов
    const { x, y } = getRandomEdgePosition(800, 600)
    const enemy: Enemy = {
      x,
      y,
      width: 30,
      height: 30,
      speed: 1,
      direction: { x: 0, y: 0 },
    }
    initialEnemies.push(enemy)
  }
  return initialEnemies as Enemy[]
}

export const updateEnemyPositions = (
  player: Player,
  enemiesRef: React.MutableRefObject<Enemy[]>
) => {
  enemiesRef.current = enemiesRef.current.map(enemy => {
    const directionX = player.x - enemy.x
    const directionY = player.y - enemy.y

    const magnitude = Math.sqrt(directionX ** 2 + directionY ** 2)
    const normalizedX = directionX / magnitude
    const normalizedY = directionY / magnitude

    const newX = enemy.x + normalizedX * enemy.speed
    const newY = enemy.y + normalizedY * enemy.speed

    return { ...enemy, x: newX, y: newY }
  })
}

export const respawnEnemies = (enemiesRef: React.MutableRefObject<Enemy[]>) => {
  enemiesRef.current = initializeEnemies(5)
}
