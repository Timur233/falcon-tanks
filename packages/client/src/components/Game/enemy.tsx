import React from 'react'
import { getRandomEdgePosition } from './utils'
import { AbstractEntity, Enemy, Obstacle } from '@/components/Game/gameTypes'
import { createBullet } from '@/components/Game/bullet'
import {
  detectCollision,
  detectEnemyCollision,
} from '@/components/Game/collision'

const enemyParams = {
  width: 70,
  height: 70,
  speed: 1,
  direction: { x: 0, y: 0 },
}

export const initializeRandomEnemies = (numberOfEnemies: number) => {
  const initialEnemies: Enemy[] = []
  for (let i = 0; i < numberOfEnemies; i++) {
    // количество врагов
    const { x, y } = getRandomEdgePosition(800, 600)
    const enemy: Enemy = {
      ...enemyParams,
      id: i,
      x,
      y,
      animation: {
        currentFrame: 0,
        totalFrames: 4,
        frameInterval: 10,
        frameCount: 0,
      },
    }
    initialEnemies.push(enemy)
  }
  return initialEnemies as Enemy[]
}

export const initializeCampanyEnemies = (): Enemy[] => {
  return [
    {
      ...enemyParams,
      id: 0,
      x: 360,
      y: 0,
      animation: {
        currentFrame: 0,
        totalFrames: 4,
        frameInterval: 10,
        frameCount: 0,
      },
    },
    {
      ...enemyParams,
      id: 1,
      x: 0,
      y: 108,
      animation: {
        currentFrame: 0,
        totalFrames: 4,
        frameInterval: 10,
        frameCount: 0,
      },
    },
    {
      ...enemyParams,
      id: 2,
      x: 720,
      y: 108,
      animation: {
        currentFrame: 0,
        totalFrames: 4,
        frameInterval: 10,
        frameCount: 0,
      },
    },
  ]
}

export const updateEnemyPositions = (
  player: AbstractEntity,
  enemiesRef: React.MutableRefObject<Enemy[]>,
  obstacles: Obstacle[]
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

    // Проверка столкновений с другими врагами
    const hasEnemyCollision = enemiesRef.current.some(otherEnemy => {
      if (otherEnemy === enemy) return false
      return detectEnemyCollision({ ...enemy, x: newX, y: newY }, otherEnemy)
    })

    // Проверка коллизий с препятствиями
    const hasObstacleCollision = obstacles.some(obstacle => {
      return detectCollision({ ...enemy, x: newX, y: newY }, obstacle)
    })

    // Если нет коллизии, обновляем позицию врага
    if (!hasEnemyCollision && !hasObstacleCollision) {
      enemy.direction = newDirection
      return { ...enemy, x: newX, y: newY, direction: newDirection }
    }

    // Если есть коллизия, возвращаем текущую позицию
    return enemy
  })
}

const isPositionOccupied = (
  position: { x: number; y: number },
  enemies: AbstractEntity[]
) => {
  return enemies.some(enemy =>
    detectEnemyCollision({ ...enemy, x: position.x, y: position.y }, enemy)
  )
}

const respawnEnemy = (
  enemy: Enemy,
  enemies: Enemy[],
  canvasWidth: number,
  canvasHeight: number
) => {
  let newPosition
  do {
    newPosition = {
      x: Math.random() * canvasWidth, // Предполагается, что canvasWidth доступен
      y: Math.random() * canvasHeight, // Предполагается, что canvasHeight доступен
    }
  } while (isPositionOccupied(newPosition, enemies))

  return { ...enemy, ...newPosition } // Возвращаем врага с новой позицией
}

// Пример использования respawnEnemy в вашем коде
export const respawnEnemies = (
  enemiesRef: React.MutableRefObject<Enemy[]>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  if (!canvasRef.current) {
    return
  }
  const { width: canvasWidth, height: canvasHeight } =
    canvasRef.current.getBoundingClientRect()
  enemiesRef.current = enemiesRef.current.map(enemy =>
    respawnEnemy(enemy, enemiesRef.current, canvasWidth, canvasHeight)
  )
}

export const killEnemy = (
  enemiesRef: React.MutableRefObject<AbstractEntity[]>,
  enemy: AbstractEntity
) => {
  enemiesRef.current = enemiesRef.current.filter(e => e !== enemy)
}

export const handleEnemyShooting = (
  enemies: Enemy[],
  bulletsRef: React.MutableRefObject<AbstractEntity[]>
) => {
  const currentTime = Date.now() // Текущее время в миллисекундах

  enemies.forEach(enemy => {
    // Проверяем, если прошло больше 2 секунд (2000 миллисекунд) с последнего выстрела
    if (!enemy.lastShotTime || currentTime - enemy.lastShotTime >= 2000) {
      bulletsRef.current.push(createBullet(enemy)) // Создаём новую пулю для врага

      // Обновляем время последнего выстрела
      enemy.lastShotTime = currentTime
    }
  })
}
