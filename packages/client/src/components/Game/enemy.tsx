import React from 'react'
import { AbstractEntity, Enemy } from '@/components/Game/gameTypes'
import { createBullet } from '@/components/Game/bullet'
import {
  detectCollision,
  detectEnemyCollision,
} from '@/components/Game/collision'
import { DefaultEnemy } from '@/components/Game/constants'
import { GameMap } from '@/components/Game/gameMap'
import { enemyTankShootSound } from '@/components/Game/sound/shoot'
import { playShotSound } from '@/components/Game/sound/surround'

export const initializeCampanyEnemies = (): Enemy[] => {
  return [
    {
      ...DefaultEnemy,
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
      ...DefaultEnemy,
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
      ...DefaultEnemy,
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
  gameMap: React.MutableRefObject<GameMap>
) => {
  gameMap.current.enemies = gameMap.current.enemies.map(enemy => {
    // Определяем разницу по X и Y
    const directionX = gameMap.current.player.x - enemy.x
    const directionY = gameMap.current.player.y - enemy.y

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
    const hasEnemyCollision = gameMap.current.enemies.some(otherEnemy => {
      if (otherEnemy === enemy) return false
      return detectEnemyCollision({ ...enemy, x: newX, y: newY }, otherEnemy)
    })

    // Проверка коллизий с препятствиями
    const hasObstacleCollision = gameMap.current.obstacles.some(obstacle => {
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

export const killEnemy = (
  gameMap: React.MutableRefObject<GameMap>,
  enemy: AbstractEntity
) => {
  gameMap.current.enemies = gameMap.current.enemies.filter(e => e !== enemy)
}

export const handleEnemyShooting = (
  gameMap: React.MutableRefObject<GameMap>,
  bulletsRef: React.MutableRefObject<AbstractEntity[]>
) => {
  const currentTime = Date.now() // Текущее время в миллисекундах

  gameMap.current.enemies.forEach(enemy => {
    // Проверяем, если прошло больше 2 секунд (2000 миллисекунд) с последнего выстрела
    if (!enemy.lastShotTime || currentTime - enemy.lastShotTime >= 2000) {
      bulletsRef.current.push(createBullet(enemy, false)) // Создаём новую пулю для врага
      playShotSound(
        enemyTankShootSound,
        enemy,
        gameMap.current.window_width,
        gameMap.current.window_height
      )
      // Обновляем время последнего выстрела
      enemy.lastShotTime = currentTime
    }
  })
}
