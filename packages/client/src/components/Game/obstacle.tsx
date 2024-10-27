import { AbstractEntity, Obstacle } from '@/components/Game/gameTypes'
import { getRandomPosition } from '@/components/Game/utils'
import {
  detectCollision,
  detectObstacleCollision,
} from '@/components/Game/collision'
import { createBangEffect } from './effects'

enum Types {
  Wall = 'wall',
  Steel = 'steel',
  Tree = 'tree',
}

export const OBSTACLE_SIZE = 36

const ObstacleSettings = {
  [Types.Wall]: {
    hp: 2,
    isCollide: true,
    frames: [
      {
        hp: 1,
        index: 1,
      },
      {
        hp: 2,
        index: 0,
      },
    ],
  },
  [Types.Steel]: {
    hp: 1000,
    isCollide: true,
    frames: [
      {
        hp: 1000,
        index: 0,
      },
    ],
  },
  [Types.Tree]: {
    hp: 1000,
    isCollide: false,
    frames: [
      {
        hp: 1000,
        index: 0,
      },
    ],
  },
}

export const initializeCompanyMapObstacle = (): Obstacle[] => {
  return createMap([
    { type: Types.Steel, x: 72, y: 108, width: 72, height: 72 },
    { type: Types.Steel, x: 648, y: 108, width: 72, height: 72 },

    { type: Types.Steel, x: 144, y: 360, width: 72, height: 72 },
    { type: Types.Steel, x: 576, y: 360, width: 72, height: 72 },
    { type: Types.Steel, x: 360, y: 360, width: 72, height: 72 },

    { type: Types.Wall, x: 252, y: 72, width: 108, height: 36 },
    { type: Types.Wall, x: 324, y: 108, width: 36, height: 144 },
    { type: Types.Wall, x: 252, y: 216, width: 72, height: 36 },
    { type: Types.Wall, x: 252, y: 144, width: 72, height: 36 },
    { type: Types.Wall, x: 252, y: 108, width: 36, height: 36 },

    { type: Types.Wall, x: 432, y: 72, width: 108, height: 36 },
    { type: Types.Wall, x: 504, y: 108, width: 36, height: 108 },
    { type: Types.Wall, x: 432, y: 108, width: 36, height: 108 },
    { type: Types.Wall, x: 432, y: 216, width: 108, height: 36 },

    { type: Types.Wall, x: 72, y: 324, width: 72, height: 180 },
    { type: Types.Wall, x: 216, y: 324, width: 72, height: 180 },
    { type: Types.Wall, x: 504, y: 324, width: 72, height: 180 },
    { type: Types.Wall, x: 648, y: 324, width: 72, height: 180 },

    { type: Types.Tree, x: 0, y: 324, width: 72, height: 180 },
    { type: Types.Tree, x: 720, y: 324, width: 72, height: 180 },
    { type: Types.Tree, x: 0, y: 504, width: 180, height: 72 },
    { type: Types.Tree, x: 612, y: 504, width: 180, height: 72 },
  ])
}

export const createMap = (
  params: {
    type: Types
    x: number
    y: number
    width: number
    height: number
  }[]
) => {
  let obstacles: Obstacle[] = []

  params.forEach(obstacle => {
    const { type, x, y, width, height } = obstacle
    obstacles = [...obstacles, ...createObstacle(type, x, y, width, height)]
  })

  return obstacles
}

export const createObstacle = (
  type: Types,
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

export const initializeRandomObstacle = (
  numberOfObstacles: number
): Obstacle[] => {
  const obstacles: Obstacle[] = []

  while (obstacles.length < numberOfObstacles) {
    const { x, y } = getRandomPosition(800, 600)
    const obstacle: Obstacle = createObstacle(
      Types.Wall,
      x,
      y,
      OBSTACLE_SIZE,
      OBSTACLE_SIZE
    )[0]

    // Проверяем, нет ли коллизий с существующими препятствиями
    const hasCollision = obstacles.some(existingObstacle =>
      detectObstacleCollision(obstacle, existingObstacle)
    )

    if (!hasCollision) {
      obstacles.push(obstacle) // Добавляем препятствие, если нет коллизий
    }
  }

  return obstacles
}

export const handleBulletObstacleCollisions = (
  bullets: AbstractEntity[],
  obstacles: Obstacle[]
) => {
  bullets.forEach(bullet => {
    // Проверка коллизий с препятствиями
    obstacles.forEach(obstacle => {
      if (detectCollision(bullet, obstacle)) {
        // Логика для уничтожения пули, если она попала в препятствие

        bullets = bullets.filter(i => i !== bullet)
        createBangEffect(
          bullet.x + bullet.width / 2,
          bullet.y + bullet.height / 2
        )
        killObstacle(obstacles, obstacle)
      }
    })
  })

  return bullets
}

const killObstacle = (obstacles: Obstacle[], obstacle: Obstacle) => {
  const settings = ObstacleSettings[obstacle.type as Types]
  const { frames } = settings

  obstacle.hp = obstacle.hp - 1

  const currentFrame = frames.find(
    (frame: { hp: number; index: number }) => obstacle.hp <= frame.hp
  )

  if (currentFrame) {
    obstacle.animation.currentFrame = currentFrame.index
  }

  if (obstacle.hp === 0) {
    obstacles.splice(obstacles.indexOf(obstacle), 1)
  }
}
