import enemiesSpritePath from '@/assets/images/sprites/enemy.svg'
import tankSpritePath from '@/assets/images/sprites/tank.svg'
import wallSpritePath from '@/assets/images/sprites/wall.svg'
import { AbstractEntity, Enemy, Obstacle } from '@/components/Game/gameTypes'

export const getRandomEdgePosition = (
  canvasWidth: number,
  canvasHeight: number
): { x: number; y: number } => {
  const edge: 0 | 1 | 2 | 3 = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3

  switch (edge) {
    case 0: // Верхний край
      return { x: Math.random() * canvasWidth, y: 0 }
    case 1: // Правый край
      return { x: canvasWidth, y: Math.random() * canvasHeight }
    case 2: // Нижний край
      return { x: Math.random() * canvasWidth, y: canvasHeight }
    case 3: // Левый край
      return { x: 0, y: Math.random() * canvasHeight }
  }
}

export const clearCanvas = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

const tankSprite = new Image()
tankSprite.src = tankSpritePath

let lastPlayerDirection = { x: 0, y: 0 }

export const drawPlayer = (
  context: CanvasRenderingContext2D,
  player: AbstractEntity
) => {
  let direction = { ...player.direction }

  const isPlayerIdle = direction.x === 0 && direction.y === 0

  if (isPlayerIdle) {
    direction = lastPlayerDirection
  } else {
    lastPlayerDirection = direction
  }

  context.save()

  context.translate(player.x + player.width / 2, player.y + player.height / 2)

  const angle = Math.atan2(direction.x, -direction.y)
  context.rotate(angle)

  context.drawImage(
    tankSprite,
    -player.width / 2,
    -player.height / 2,
    player.width,
    player.height
  )

  context.restore()
}

const enemiesSprite = new Image()
enemiesSprite.src = enemiesSpritePath

const lastEnemyDirection: Record<number, { x: number; y: number }> = {}

export const drawEnemies = (
  context: CanvasRenderingContext2D,
  enemies: Enemy[]
) => {
  enemies.forEach(enemy => {
    let direction = { ...enemy.direction }

    // Если враг не двигается, используем последнее направление
    const isEnemyIdle = direction.x === 0 && direction.y === 0
    if (isEnemyIdle) {
      direction = lastEnemyDirection[enemy.id] || { x: 1, y: 0 } // по умолчанию вправо
    } else {
      lastEnemyDirection[enemy.id] = direction // сохраняем последнее направление для врага
    }

    context.save()

    // Перемещаем контекст на позицию врага
    context.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2)

    // Вычисляем угол поворота на основе направления
    const angle = Math.atan2(direction.x, -direction.y)
    context.rotate(angle)

    // Отрисовываем спрайт врага с учётом его ширины и высоты
    context.drawImage(
      enemiesSprite,
      -enemy.width / 2,
      -enemy.height / 2,
      enemy.width,
      enemy.height
    )

    context.restore()
  })
}

const wallSprite = new Image()
wallSprite.src = wallSpritePath

export const drawObstacles = (
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
) => {
  obstacles.forEach(obstacle => {
    context.drawImage(wallSprite, obstacle.x, obstacle.y)
  })
}

export const drawBullets = (
  context: CanvasRenderingContext2D,
  bullets: AbstractEntity[]
) => {
  context.fillStyle = 'yellow'
  bullets.forEach(bullet => {
    context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
  })
}
