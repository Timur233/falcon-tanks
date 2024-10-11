import { AbstractEntity, Obstacle } from '@/components/Game/gameTypes'
import { getRandomPosition } from '@/components/Game/utils'
import {
  detectCollision,
  detectObstacleCollision,
} from '@/components/Game/collision'

export const initializeObstacle = (): Obstacle[] => {
  const obstacles: Obstacle[] = []

  while (obstacles.length < 20) {
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
