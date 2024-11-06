import {
  AbstractEntity,
  Obstacle,
  ObstacleParams,
  obstacleTypes,
} from '@/components/Game/gameTypes'
import { detectCollision } from '@/components/Game/collision'
import { createBangEffect } from './effects'
import { OBSTACLE_SIZE, ObstacleSettings } from '@/components/Game/constants'
import { GameMap } from '@/components/Game/gameMap'

export const initializeCompany1MapObstacle = (): ObstacleParams[] => {
  return [
    { type: obstacleTypes.Steel, x: 72, y: 108, width: 72, height: 72 },
    { type: obstacleTypes.Steel, x: 648, y: 108, width: 72, height: 72 },

    { type: obstacleTypes.Steel, x: 144, y: 360, width: 72, height: 72 },
    { type: obstacleTypes.Steel, x: 576, y: 360, width: 72, height: 72 },
    { type: obstacleTypes.Steel, x: 360, y: 360, width: 72, height: 72 },

    { type: obstacleTypes.Wall, x: 252, y: 72, width: 108, height: 36 },
    { type: obstacleTypes.Wall, x: 324, y: 108, width: 36, height: 144 },
    { type: obstacleTypes.Wall, x: 252, y: 216, width: 72, height: 36 },
    { type: obstacleTypes.Wall, x: 252, y: 144, width: 72, height: 36 },
    { type: obstacleTypes.Wall, x: 252, y: 108, width: 36, height: 36 },

    { type: obstacleTypes.Wall, x: 432, y: 72, width: 108, height: 36 },
    { type: obstacleTypes.Wall, x: 504, y: 108, width: 36, height: 108 },
    { type: obstacleTypes.Wall, x: 432, y: 108, width: 36, height: 108 },
    { type: obstacleTypes.Wall, x: 432, y: 216, width: 108, height: 36 },

    { type: obstacleTypes.Wall, x: 72, y: 324, width: 72, height: 180 },
    { type: obstacleTypes.Wall, x: 216, y: 324, width: 72, height: 180 },
    { type: obstacleTypes.Wall, x: 504, y: 324, width: 72, height: 180 },
    { type: obstacleTypes.Wall, x: 648, y: 324, width: 72, height: 180 },

    { type: obstacleTypes.Tree, x: 0, y: 324, width: 72, height: 180 },
    { type: obstacleTypes.Tree, x: 720, y: 324, width: 72, height: 180 },
    { type: obstacleTypes.Tree, x: 0, y: 504, width: 180, height: 72 },
    { type: obstacleTypes.Tree, x: 612, y: 504, width: 180, height: 72 },
  ]
}

export const createObstacle = (
  type: obstacleTypes,
  x: number,
  y: number,
  width: number,
  height: number
): Obstacle[] => {
  const obstacles: Obstacle[] = []
  const horizontalCount = Math.ceil(width / OBSTACLE_SIZE)
  const verticalCount = Math.ceil(height / OBSTACLE_SIZE)

  Array.from({ length: horizontalCount }).forEach((_, i) => {
    Array.from({ length: verticalCount }).forEach((_, j) => {
      const obstacleX = x + i * OBSTACLE_SIZE
      const obstacleY = y + j * OBSTACLE_SIZE

      obstacles.push({
        type,
        x: obstacleX,
        y: obstacleY,
        width: OBSTACLE_SIZE,
        height: OBSTACLE_SIZE,
        hp: ObstacleSettings[type].hp,
        isCollide: ObstacleSettings[type].isCollide,
        animation: {
          currentFrame: 0,
          totalFrames: ObstacleSettings[type].frames.length,
        },
      })
    })
  })

  return obstacles
}

export const handleBulletObstacleCollisions = (
  bullets: AbstractEntity[],
  gameMap: React.MutableRefObject<GameMap>
) => {
  bullets.forEach(bullet => {
    // Проверка коллизий с препятствиями
    gameMap.current.obstacles.forEach(obstacle => {
      if (detectCollision(bullet, obstacle)) {
        // Логика для уничтожения пули, если она попала в препятствие
        bullets.splice(bullets.indexOf(bullet), 1) // Пример, удаляем пулю, если попала в препятствие
        createBangEffect(
          bullet.x + bullet.width / 2,
          bullet.y + bullet.height / 2
        )
        killObstacle(gameMap, obstacle)
      }
    })
  })
}

const killObstacle = (
  gameMap: React.MutableRefObject<GameMap>,
  obstacle: Obstacle
) => {
  const settings = ObstacleSettings[obstacle.type as obstacleTypes]
  const { frames } = settings

  obstacle.hp = obstacle.hp - 1

  const currentFrame = frames.find(
    (frame: { hp: number; index: number }) => obstacle.hp <= frame.hp
  )

  if (currentFrame) {
    obstacle.animation.currentFrame = currentFrame.index
  }

  if (obstacle.hp === 0) {
    gameMap.current.obstacles.splice(
      gameMap.current.obstacles.indexOf(obstacle),
      1
    )
  }
}
