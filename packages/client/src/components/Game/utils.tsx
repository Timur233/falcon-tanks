import enemiesSpritePath from '@/assets/images/sprites/enemy.png'
import playerSpritePath from '@/assets/images/sprites/tank.png'
import bulletSpritePath from '@/assets/images/sprites/bullet.png'
import wallSpritePath from '@/assets/images/sprites/wall.png'
import steelSpritePath from '@/assets/images/sprites/steel.png'
import treeSpritePath from '@/assets/images/sprites/tree.png'
import bangSpritePath from '@/assets/images/sprites/bang.png'
import shotSpritePath from '@/assets/images/sprites/shot.png'
import {
  AbstractEntity,
  Bullet,
  Effect,
  Enemy,
  Obstacle,
} from '@/components/Game/gameTypes'
import { deleteEffect } from './effects'

export const clearCanvas = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

const drawTank = (
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
    sourceY: 0,
  }

  // Если смещение кратно 10 меняем кадр
  if (animation?.frameInterval && moovment % animation.frameInterval === 0) {
    animation.currentFrame =
      (animation.currentFrame + 1) % animation?.totalFrames
  }

  if (animation) {
    spriteSettings.width = sprite.width / animation.totalFrames
    spriteSettings.height = sprite.height
    spriteSettings.sourceX = animation.currentFrame * spriteSettings.width
    spriteSettings.sourceY = 0
  }

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
  drawTank(playerSprite, context, player)
}

const enemiesSprite = new Image()

enemiesSprite.src = enemiesSpritePath

export const drawEnemies = (
  context: CanvasRenderingContext2D,
  enemies: Enemy[]
) => {
  enemies.forEach(enemy => {
    drawTank(enemiesSprite, context, enemy)
  })
}

const wallSprite = new Image()
const steelSprite = new Image()
const treeSprite = new Image()

wallSprite.src = wallSpritePath
steelSprite.src = steelSpritePath
treeSprite.src = treeSpritePath

export const drawObstacles = (
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
) => {
  obstacles.forEach(obstacle => {
    let sprite: HTMLImageElement

    switch (obstacle.type) {
      case 'steel':
        sprite = steelSprite

        break
      case 'wall':
        sprite = wallSprite

        break
      case 'tree':
        sprite = treeSprite

        break

      default:
        sprite = treeSprite

        break
    }

    const spriteSize = sprite.width / obstacle.animation.totalFrames

    context.drawImage(
      sprite,
      obstacle.animation.currentFrame * spriteSize,
      0,
      spriteSize,
      spriteSize,
      obstacle.x,
      obstacle.y,
      spriteSize,
      spriteSize
    )
  })
}

const bulletSprite = new Image()

bulletSprite.src = bulletSpritePath

export const drawBullets = (
  context: CanvasRenderingContext2D,
  bullets: Bullet[]
) => {
  bullets.forEach(bullet => {
    context.save()
    context.translate(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2)
    context.rotate(Math.atan2(bullet.direction.x, -bullet.direction.y))

    context.drawImage(
      bulletSprite,
      0,
      0,
      bulletSprite.width,
      bulletSprite.height,
      -bulletSprite.width / 2,
      -bulletSprite.height / 2,
      bulletSprite.width,
      bulletSprite.height
    )

    context.restore()
  })
}

const bangSprite = new Image()
const shotSprite = new Image()

bangSprite.src = bangSpritePath
shotSprite.src = shotSpritePath

export const drawEffects = (
  context: CanvasRenderingContext2D,
  effects: Effect[]
) => {
  effects.forEach(effect => {
    const spriteSettings = {
      width: 0,
      height: 0,
      sourceX: 0,
      sourceY: 0,
    }
    let sprite: HTMLImageElement

    if (typeof effect.animation.frameCount === 'number') {
      effect.animation.frameCount++

      if (
        effect.animation?.frameInterval &&
        effect.animation.frameCount % effect.animation.frameInterval === 0
      ) {
        effect.animation.currentFrame = effect.animation.currentFrame + 1

        if (
          effect.animation.currentFrame ===
          effect.animation.totalFrames - 1
        ) {
          deleteEffect(effect)
        }
      }
    }

    switch (effect.type) {
      case 'shot':
        sprite = shotSprite

        break

      case 'bang':
        sprite = bangSprite

        break

      default:
        sprite = bangSprite
    }

    spriteSettings.width = sprite.width / effect.animation.totalFrames
    spriteSettings.height = sprite.height
    spriteSettings.sourceX =
      effect.animation.currentFrame * spriteSettings.width
    spriteSettings.sourceY = 0

    context.save()
    context.translate(effect.x + effect.width / 2, effect.y + effect.height / 2)

    if (effect.direction)
      context.rotate(Math.atan2(effect.direction.x, -effect.direction.y))

    context.drawImage(
      sprite,
      spriteSettings.sourceX,
      spriteSettings.sourceY,
      spriteSettings.width,
      spriteSettings.height,
      -effect.width / 2,
      -effect.height / 2,
      effect.width,
      effect.height
    )

    context.restore()
  })
}
