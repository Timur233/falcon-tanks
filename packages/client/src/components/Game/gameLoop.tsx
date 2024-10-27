import { HandlePlayerHit } from './player'
import { updateEnemyPositions, killEnemy, handleEnemyShooting } from './enemy'
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
} from '@/components/Game/gameTypes'
import {
  detectBulletCollision,
  detectEnemyCollision,
} from '@/components/Game/collision'
import { updatePlayerAction } from '@/components/Game/controls'
import { updateBullets } from '@/components/Game/bullet'
import { handleBulletObstacleCollisions } from '@/components/Game/obstacle'
import { createBangEffect, initEffects } from './effects'

/**
 * Основной игровой цикл, который обновляет состояние игры и перерисовывает экран каждый кадр.
 * @param context - Контекст рисования для Canvas.
 * @param canvasRef - Ссылка на Canvas.
 * @param playerRef - Ссылка на текущего игрока.
 * @param enemiesRef - Ссылка на массив врагов.
 * @param bulletsRef - Ссылка на массив пуль.
 * @param obstaclesRef - Ссылка на массив препятствий.
 * @param livesRef - Ссылка на текущее количество жизней игрока.
 * @param effectsRef - Ссылка на массив эффектов.
 * @param handleDeath - Обработчик события смерти игрока.
 * @param handleGameOver - Обработчик события окончания игры.
 * @param handleEnemyKilled - Обработчик события уничтожения врага.
 */
export const gameLoop = (
  context: CanvasRenderingContext2D,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  playerRef: React.MutableRefObject<AbstractEntity>,
  enemiesRef: React.MutableRefObject<Enemy[]>,
  bulletsRef: React.MutableRefObject<AbstractEntity[]>,
  obstaclesRef: React.MutableRefObject<Obstacle[]>,
  effectsRef: React.MutableRefObject<Effect[]>,
  livesRef: React.MutableRefObject<number>,
  handleDeath: (lives: number) => void,
  handleGameOver: () => void,
  handleEnemyKilled: () => void
) => {
  clearCanvas(context)

  // Обновление позиций врагов
  updateEnemyPositions(playerRef.current, enemiesRef, obstaclesRef.current)
  if (!canvasRef.current) return
  const moveProps: ControlsProps = {
    playerRef,
    bulletsRef,
    obstacles: obstaclesRef.current,
    canvasWidth: canvasRef.current.width,
    canvasHeight: canvasRef.current.height,
  }
  updatePlayerAction(moveProps)

  // Стрельба врагов каждые 2 секунды
  handleEnemyShooting(enemiesRef.current, bulletsRef)

  // Обработка столкновений с препятствиями
  bulletsRef.current = handleBulletObstacleCollisions(
    bulletsRef.current,
    obstaclesRef.current
  )

  initEffects(effectsRef)

  bulletsRef.current = updateBullets(
    bulletsRef.current,
    canvasRef.current.width,
    canvasRef.current.height
  )

  // Отрисовка всех игровых объектов
  drawPlayer(context, playerRef.current)
  drawEnemies(context, enemiesRef.current)
  drawObstacles(context, obstaclesRef.current)
  drawEffects(context, effectsRef.current)
  drawBullets(context, bulletsRef.current) // Отрисовка пуль

  // Проверка на столкновения пуль с врагами
  bulletsRef.current.forEach(bullet => {
    enemiesRef.current = enemiesRef.current.filter(enemy => {
      const hit = detectBulletCollision(bullet, enemy)
      if (hit) {
        // Убираем врага, если попали
        killEnemy(enemiesRef, enemy)
        handleEnemyKilled()
        // Эффект поподания
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

  const collidedEnemy = enemiesRef.current.find(enemy =>
    detectEnemyCollision(playerRef.current, enemy)
  )

  if (collidedEnemy) {
    HandlePlayerHit(
      livesRef,
      playerRef,
      enemiesRef,
      canvasRef,
      handleGameOver,
      handleDeath
    )
  }
}
