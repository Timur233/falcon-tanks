import { AbstractEntity } from '@/components/Game/gameTypes'

export const createBullet = (player: AbstractEntity): AbstractEntity => {
  return {
    x: player.x + player.width / 2 - 2.5, // Пуля появляется в центре танка
    y: player.y + player.height / 2 - 2.5,
    width: 5,
    height: 5,
    speed: 5, // Скорость пули
    direction: player.direction, // Пуля летит в направлении танка
  }
}

export const updateBullets = (
  bullets: AbstractEntity[],
  canvasWidth: number,
  canvasHeight: number
) => {
  return bullets.filter(bullet => {
    bullet.x += bullet.direction.x * bullet.speed
    bullet.y += bullet.direction.y * bullet.speed

    // Удаляем пулю, если она выходит за пределы экрана
    return (
      bullet.x >= 0 &&
      bullet.x <= canvasWidth &&
      bullet.y >= 0 &&
      bullet.y <= canvasHeight
    )
  })
}
