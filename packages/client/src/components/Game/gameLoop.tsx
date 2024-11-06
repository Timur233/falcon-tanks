import { HandlePlayerHit } from './player'
import { updateEnemyPositions, handleEnemyShooting } from './enemy'
import {
  clearCanvas,
  drawPlayer,
  drawEnemies,
  drawObstacles,
  drawBullets,
  drawEffects,
} from './utils'
import {
  ControlsProps,
  AbstractEntity,
  Obstacle,
  Enemy,
  Effect,
  Bullet,
} from '@/components/Game/gameTypes'
import {
  bulletsCollisions,
  detectEnemyCollision,
} from '@/components/Game/collision'
import { updatePlayerAction } from '@/components/Game/controls'
import { updateBullets } from '@/components/Game/bullet'
import { handleBulletObstacleCollisions } from '@/components/Game/obstacle'
import { createBangEffect, initEffects } from './effects'
import { GameMap } from '@/components/Game/gameMap'

const MAX_FPS = 60
const FRAME_DURATION = 1000 / MAX_FPS
let lastFrameTime = 0

/**
 * Основной игровой цикл, который обновляет состояние игры и перерисовывает экран каждый кадр.
 * @param context - Контекст рисования для Canvas.
 * @param canvasRef - Ссылка на Canvas.
 * @param gameMap - Объект GameMap.
 * @param bulletsRef - Ссылка на массив пуль.
 * @param livesRef - Ссылка на текущее количество жизней игрока.
 * @param effectsRef - Ссылка на массив эффектов.
 * @param handleDeath - Обработчик события смерти игрока.
 * @param handleGameOver - Обработчик события окончания игры.
 * @param handleEnemyKilled - Обработчик события уничтожения врага.
 */
export const gameLoop = (
  context: CanvasRenderingContext2D,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  gameMap: React.MutableRefObject<GameMap>,
  bulletsRef: React.MutableRefObject<AbstractEntity[]>,
  effectsRef: React.MutableRefObject<Effect[]>,
  livesRef: React.MutableRefObject<number>,
  handleDeath: (lives: number) => void,
  handleGameOver: () => void,
  handleEnemyKilled: () => void
) => {
  const now = performance.now()
  const deltaTime = now - lastFrameTime

  if (deltaTime < FRAME_DURATION) {
    requestAnimationFrame(() =>
      gameLoop(
        context,
        canvasRef,
        playerRef,
        enemiesRef,
        bulletsRef,
        obstaclesRef,
        effectsRef,
        livesRef,
        handleDeath,
        handleGameOver,
        handleEnemyKilled
      )
    )
    return
  }

  lastFrameTime = now

  clearCanvas(context)

  // Обновление позиций врагов
  updateEnemyPositions(gameMap)
  if (!canvasRef.current) return
  const moveProps: ControlsProps = {
    gameMap,
    bulletsRef,
    canvasWidth: canvasRef.current.width,
    canvasHeight: canvasRef.current.height,
  }
  updatePlayerAction(moveProps)

  // Стрельба врагов каждые 2 секунды
  handleEnemyShooting(gameMap, bulletsRef)

  // Обработка столкновений с препятствиями
  handleBulletObstacleCollisions(bulletsRef.current, gameMap)

  initEffects(effectsRef)

  bulletsRef.current = updateBullets(
    bulletsRef.current,
    canvasRef.current.width,
    canvasRef.current.height
  )

  // Отрисовка всех игровых объектов
  drawPlayer(context, gameMap.current.player)
  drawEnemies(context, gameMap.current.enemies)
  drawObstacles(context, gameMap.current.obstacles)
  drawEffects(context, effectsRef.current)
  drawBullets(context, bulletsRef.current) // Отрисовка пуль

  bulletsCollisions(
    bulletsRef,
    playerRef,
    enemiesRef,
    livesRef,
    handleEnemyKilled,
    createBangEffect,
    handleGameOver,
    handleDeath
  )

  const collidedEnemy = enemiesRef.current.find(enemy =>
    detectEnemyCollision(playerRef.current, enemy)
  )

  if (collidedEnemy) {
    HandlePlayerHit(livesRef, handleGameOver, handleDeath)
  }
}
