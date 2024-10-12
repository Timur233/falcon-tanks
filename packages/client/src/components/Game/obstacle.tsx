import { AbstractEntity, Obstacle } from '@/components/Game/gameTypes'
import { getRandomPosition } from '@/components/Game/utils'
import {
  detectCollision,
  detectObstacleCollision,
} from '@/components/Game/collision'

export const initializeCompanyMapObstacle = (): Obstacle[] => {
  return [
    { x: 0, y: 0, width: 120, height: 50 },
    { x: 200, y: 0, width: 70, height: 50 },
    { x: 350, y: 0, width: 70, height: 50 },
    { x: 500, y: 0, width: 120, height: 50 },
    { x: 700, y: 0, width: 100, height: 50 },

    { x: 0, y: 130, width: 50, height: 120 },
    { x: 130, y: 130, width: 50, height: 70 },
    { x: 260, y: 130, width: 50, height: 200 },
    { x: 390, y: 130, width: 50, height: 70 },
    { x: 520, y: 130, width: 50, height: 120 },
    { x: 650, y: 130, width: 50, height: 125 },

    { x: 0, y: 330, width: 120, height: 50 },
    { x: 200, y: 330, width: 150, height: 50 },
    { x: 350, y: 330, width: 70, height: 50 },
    { x: 500, y: 330, width: 120, height: 50 },
    { x: 700, y: 330, width: 100, height: 100 },

    { x: 0, y: 460, width: 50, height: 140 },
    { x: 130, y: 530, width: 50, height: 70 },
    { x: 260, y: 480, width: 50, height: 120 },
    { x: 390, y: 460, width: 50, height: 70 },
    { x: 520, y: 490, width: 50, height: 120 },
    { x: 650, y: 480, width: 50, height: 120 },
  ]
}

export const initializeRandomObstacle = (
  numberOfObstacles: number
): Obstacle[] => {
  const obstacles: Obstacle[] = []

  while (obstacles.length < numberOfObstacles) {
    const { x, y } = getRandomPosition(800, 600)
    const obstacle: Obstacle = { x, y, width: 50, height: 50 }

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
        bullets.splice(bullets.indexOf(bullet), 1) // Пример, удаляем пулю, если попала в препятствие
        killObstacle(obstacles, obstacle)
      }
    })
  })
}

const killObstacle = (obstacles: Obstacle[], obstacle: Obstacle) => {
  obstacles.splice(obstacles.indexOf(obstacle), 1)
}
