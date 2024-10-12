import enemiesSpritePath from '@/assets/images/sprites/enemy.png'
import playerSpritePath from '@/assets/images/sprites/tank.png'
import bulletSpritePath from '@/assets/images/sprites/bullet.png'
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

export const getRandomPosition = (
  canvasWidth: number,
  canvasHeight: number,
  obstacleWidth = 50, // Ширина препятствия
  obstacleHeight = 50 // Высота препятствия
): { x: number; y: number } => {
  const x = Math.random() * (canvasWidth - obstacleWidth) // Генерируем случайное X
  const y = Math.random() * (canvasHeight - obstacleHeight) // Генерируем случайное Y
  return { x, y }
}

export const clearCanvas = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

const darawTank = (
  sprite: HTMLImageElement, 
  context: CanvasRenderingContext2D, 
  data: AbstractEntity
) => {
  const { animation } = data
  const { direction } = data
  const moovment = direction.x !== 0 ? data.x : data.y
  const spriteSettings = {
    width: 0,
    height: 0,
    sourceX: 0,
    sourceY: 0
  }

  // Если смещение кратно 10 меняем кадр
  if (moovment % animation.frameInterval === 0) { 
    animation.currentFrame = (animation.currentFrame + 1) % 
      animation?.totalFrames; 
  }

  spriteSettings.width = sprite.width / animation.totalFrames;
  spriteSettings.height = sprite.height;
  spriteSettings.sourceX = animation.currentFrame * spriteSettings.width; 
  spriteSettings.sourceY = 0;

  context.save()
  context.translate(data.x + data.width / 2, data.y + data.height / 2)
  context.rotate(Math.atan2(direction.x, -direction.y))
  context.drawImage(
    sprite,       
    spriteSettings.sourceX,          
    spriteSettings.sourceY,          
    spriteSettings.width,      
    spriteSettings.height,     
    -data.width / 2,
    -data.height / 2,
    data.width,     
    data.height     
  ) 

  context.restore()
}

const playerSprite = new Image()

playerSprite.src = playerSpritePath

export const drawPlayer = (
  context: CanvasRenderingContext2D,
  player: AbstractEntity
) => {
  darawTank(playerSprite, context, player)
}

const enemiesSprite = new Image()
enemiesSprite.src = enemiesSpritePath

const lastEnemyDirection: Record<number, { x: number; y: number }> = {}

export const drawEnemies = (
  context: CanvasRenderingContext2D,
  enemies: Enemy[]
) => {
  enemies.forEach(enemy => {
    darawTank(enemiesSprite, context, enemy)
  })
}

const wallSprite = new Image()
wallSprite.src = wallSpritePath

export const drawObstacles = (
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
) => {
  const SPRITE_SIZE = 50

  obstacles.forEach(obstacle => {
    const horizontalCount = Math.ceil(obstacle.width / SPRITE_SIZE)
    const verticalCount = Math.ceil(obstacle.height / SPRITE_SIZE)

    Array.from({ length: horizontalCount }).forEach((_, i) => {
      Array.from({ length: verticalCount }).forEach((_, j) => {
        const x = obstacle.x + i * SPRITE_SIZE
        const y = obstacle.y + j * SPRITE_SIZE

        const width = Math.min(SPRITE_SIZE, obstacle.width - i * SPRITE_SIZE)
        const height = Math.min(SPRITE_SIZE, obstacle.height - j * SPRITE_SIZE)

        context.drawImage(wallSprite, 0, 0, width, height, x, y, width, height)
      })
    })
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
