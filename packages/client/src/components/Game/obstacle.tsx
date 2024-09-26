import { Obstacle } from '@/components/Game/gameTypes'
import { getRandomEdgePosition } from '@/components/Game/utils'

export const initializeObstacle = (): Obstacle[] => {
  const obstacles: Obstacle[] = []
  for (let i = 0; i < 10; i++) {
    const { x, y } = getRandomEdgePosition(800, 600)
    const obstacle: Obstacle = { x, y, width: 50, height: 50 }
    obstacles.push(obstacle)
  }
  return obstacles
}
