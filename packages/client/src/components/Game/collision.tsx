import { Enemy, Obstacle, Player } from '@/components/Game/gameTypes'

export const detectCollision = (
  player: Player,
  obstacle: Obstacle
): boolean => {
  return (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  )
}
export const detectEnemyCollision = (
  rect1: Player | Enemy,
  rect2: Obstacle | Enemy
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}
