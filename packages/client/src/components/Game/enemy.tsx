import { getRandomEdgePosition } from './utils'
import { AbstractEntity, Enemy } from '@/components/Game/gameTypes'

export const initializeEnemies = (numberOfEnemies: number) => {
  const initialEnemies: Enemy[] = []
  for (let i = 0; i < numberOfEnemies; i++) {
    // количество врагов
    const { x, y } = getRandomEdgePosition(800, 600)
    const enemy: Enemy = {
      id: i,
      x,
      y,
      width: 70,
      height: 70,
      speed: 1,
      direction: { x: 0, y: 0 },
    }
    initialEnemies.push(enemy)
  }
  return initialEnemies as Enemy[]
}

export const updateEnemyPositions = (
  player: AbstractEntity,
  enemiesRef: React.MutableRefObject<Enemy[]>
) => {
  enemiesRef.current = enemiesRef.current.map(enemy => {
    // Определяем разницу по X и Y
    const directionX = player.x - enemy.x
    const directionY = player.y - enemy.y

    // Выбираем ближайшую ось для начала движения
    const moveAlongX = Math.abs(directionX) > Math.abs(directionY)

    let stepX = 0
    let stepY = 0

    let newDirection: { x: number; y: number }

    if (moveAlongX) {
      // Если разница по X больше, двигаемся по X
      if (Math.abs(directionX) > enemy.speed) {
        stepX = Math.sign(directionX) * enemy.speed
        newDirection = { x: Math.sign(directionX), y: 0 } // направление по X
      } else {
        // Если по оси X выровнялись, двигаемся по Y
        stepY = Math.sign(directionY) * enemy.speed
        newDirection = { x: 0, y: Math.sign(directionY) } // направление по Y
      }
    } else {
      // Если разница по Y больше, двигаемся по Y
      if (Math.abs(directionY) > enemy.speed) {
        stepY = Math.sign(directionY) * enemy.speed
        newDirection = { x: 0, y: Math.sign(directionY) } // направление по Y
      } else {
        // Если по оси Y выровнялись, двигаемся по X
        stepX = Math.sign(directionX) * enemy.speed
        newDirection = { x: Math.sign(directionX), y: 0 } // направление по X
      }
    }

    const newX = enemy.x + stepX
    const newY = enemy.y + stepY

    // Обновляем направление врага
    enemy.direction = newDirection

    return { ...enemy, x: newX, y: newY, direction: newDirection }
  })
}

export const respawnEnemies = (enemiesRef: React.MutableRefObject<Enemy[]>) => {
  enemiesRef.current = initializeEnemies(5)
}

export const killEnemy = (
  enemiesRef: React.MutableRefObject<Enemy[]>,
  enemy: AbstractEntity
) => {
  enemiesRef.current = enemiesRef.current.filter(e => e !== enemy)
}
