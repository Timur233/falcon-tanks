import { AbstractEntity } from '@/components/Game/gameTypes'
import { createShotEffect } from './effects'
import { bulletSize } from '@/components/Game/constants'

export const createBullet = (enemy: AbstractEntity): AbstractEntity => {
  const bulletSpeed = 5 // Задайте скорость пули
  const bulletDirection = { x: enemy.direction.x, y: enemy.direction.y }

  // Начальная позиция пули в зависимости от направления врага
  let bulletX, bulletY

  if (enemy.direction.y < 0) {
    // Вверх
    bulletX = enemy.x + enemy.width / 2 // Центр по X
    bulletY = enemy.y - bulletSize.height // Верхняя часть врага
  } else if (enemy.direction.y > 0) {
    // Вниз
    bulletX = enemy.x + enemy.width / 2 // Центр по X
    bulletY = enemy.y + enemy.height + bulletSize.height // Нижняя часть врага
  } else if (enemy.direction.x < 0) {
    // Влево
    bulletX = enemy.x - bulletSize.height // Левый край врага
    bulletY = enemy.y + enemy.height / 2 // Центр по Y
  } else if (enemy.direction.x > 0) {
    // Вправо
    bulletX = enemy.x + enemy.width + bulletSize.height // Правый край врага
    bulletY = enemy.y + enemy.height / 2 // Центр по Y
  } else {
    bulletX = enemy.x + enemy.width / 2 // По умолчанию - центр
    bulletY = enemy.y + enemy.height / 2 // По умолчанию - центр
  }

  createShotEffect(bulletX, bulletY, bulletDirection)

  return {
    x: bulletX - bulletSize.width / 2,
    y: bulletY - bulletSize.height / 2,
    width: bulletSize.width, // Ширина пули
    height: bulletSize.height, // Высота пули
    speed: bulletSpeed,
    direction: bulletDirection,
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
