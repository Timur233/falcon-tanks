import {
  Obstacle,
  AbstractEntity,
  Bullet,
  Enemy,
} from '@/components/Game/gameTypes'
import { killEnemy } from '@/components/Game/enemy'

export const detectCollision = (
  player: AbstractEntity,
  obstacle: Obstacle
): boolean => {
  return (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y &&
    obstacle.isCollide
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
  bullet: Bullet,
  entity: AbstractEntity
): boolean => {
  return (
    bullet.x < entity.x + entity.width &&
    bullet.x + bullet.width > entity.x &&
    bullet.y < entity.y + entity.height &&
    bullet.y + bullet.height > entity.y
  )
}

export const detectObstacleCollision = (
  obstacle1: Obstacle,
  obstacle2: Obstacle
): boolean => {
  return (
    obstacle1.x < obstacle2.x + obstacle2.width &&
    obstacle1.x + obstacle1.width > obstacle2.x &&
    obstacle1.y < obstacle2.y + obstacle2.height &&
    obstacle1.y + obstacle1.height > obstacle2.y
  )
}

export const bulletsCollisions = (
  bulletsRef: React.MutableRefObject<Bullet[]>,
  playerRef: React.MutableRefObject<AbstractEntity>,
  enemiesRef: React.MutableRefObject<AbstractEntity[]>,
  livesRef: React.MutableRefObject<number>,
  handleEnemyKilled: () => void,
  createBangEffect: (x: number, y: number) => void,
  handleGameOver: () => void,
  handleDeath: (lives: number) => void
) => {
  // Проверка на столкновения пуль с врагами
  bulletsRef.current.forEach(bullet => {
    enemiesRef.current = enemiesRef.current.filter(enemy => {
      const hit = detectBulletCollision(bullet, enemy)
      if (hit) {
        // Убираем врага, если попали
        killEnemy(enemiesRef, enemy)
        if (bullet.isPlayer) {
          handleEnemyKilled()
        }
        // Эффект попадания
        createBangEffect(
          bullet.x + bullet.width / 2,
          bullet.y + bullet.height / 2
        )
        // Убираем пулю, если попали
        bulletsRef.current = bulletsRef.current.filter(b => b !== bullet)
        return false
      }
      return true
    })
    bulletsRef.current.forEach(bullet2 => {
      if (bullet === bullet2) return
      const hit = detectBulletCollision(bullet, bullet2)
      if (hit) {
        // Эффект попадания
        createBangEffect(
          bullet.x + bullet.width / 2,
          bullet.y + bullet.height / 2
        )
        // Убираем пулю, если попали
        bulletsRef.current = bulletsRef.current.filter(b => b !== bullet)
        bulletsRef.current = bulletsRef.current.filter(b => b !== bullet2)
      }
    })
    if (detectBulletCollision(bullet, playerRef.current)) {
      // Уменьшаем жизни игрока
      livesRef.current -= 1
      // Эффект поподания
      createBangEffect(
        bullet.x + bullet.width / 2,
        bullet.y + bullet.height / 2
      )
      // Удаляем пулю после попадания
      bulletsRef.current = bulletsRef.current.filter(b => b !== bullet)
      // Проверка на окончание игры
      if (livesRef.current <= 0) {
        handleGameOver()
      } else {
        handleDeath(livesRef.current)
      }
    }
  })
}

// Проверка столкновений с игроком
export const detectPlayerCollision = (
  obstacle: Obstacle,
  player: AbstractEntity
): boolean => {
  return (
    obstacle.x < player.x + player.width &&
    obstacle.x + obstacle.width > player.x &&
    obstacle.y < player.y + player.height &&
    obstacle.y + obstacle.height > player.y
  )
}

// Проверка столкновений с врагами
export const detectEnemiesCollision = (
  obstacle: Obstacle,
  enemies: Enemy[]
): boolean => {
  return enemies.some(
    enemy =>
      obstacle.x < enemy.x + enemy.width &&
      obstacle.x + obstacle.width > enemy.x &&
      obstacle.y < enemy.y + enemy.height &&
      obstacle.y + obstacle.height > enemy.y
  )
}
