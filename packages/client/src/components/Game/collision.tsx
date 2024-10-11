import { Obstacle, AbstractEntity } from '@/components/Game/gameTypes'

export const detectCollision = (
  player: AbstractEntity,
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
  rect1: AbstractEntity,
  rect2: Obstacle | AbstractEntity
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

export const detectBulletCollision = (
  bullet: AbstractEntity,
  entity: AbstractEntity
): boolean => {
  return (
    bullet.x < entity.x + entity.width &&
    bullet.x + bullet.width > entity.x &&
    bullet.y < entity.y + entity.height &&
    bullet.y + bullet.height > entity.y
  )
}
