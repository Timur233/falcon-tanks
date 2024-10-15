import { Obstacle } from '@/components/Game/gameTypes'

export const initializeObstacle = (): Obstacle[] => {
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
