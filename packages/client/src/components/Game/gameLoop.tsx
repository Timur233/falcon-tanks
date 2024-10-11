import { HandlePlayerHit, resetPlayerPosition } from './player'
import { updateEnemyPositions, respawnEnemies, killEnemy } from './enemy'
import {
  clearCanvas,
  drawPlayer,
  drawEnemies,
  drawObstacles,
  drawBullets,
} from './utils'
import {
  ControlsProps,
  AbstractEntity,
  Obstacle,
} from '@/components/Game/gameTypes'
import {
  detectBulletCollision,
  detectEnemyCollision,
} from '@/components/Game/collision'
import { updatePlayerAction } from '@/components/Game/controls'
import { updateBullets } from '@/components/Game/bullet'

/**
 * Основной игровой цикл, который обновляет состояние игры и перерисовывает экран каждый кадр.
 * @param context - Контекст рисования для Canvas.
 * @param canvasRef - Ссылка на Canvas.
 * @param playerRef - Ссылка на текущего игрока.
 * @param enemiesRef - Ссылка на массив врагов.
 * @param bulletsRef - Ссылка на массив пуль.
 * @param obstaclesRef - Ссылка на массив препятствий.
 * @param livesRef - Ссылка на текущее количество жизней игрока.
 * @param handleGameOver - Обработчик события окончания игры.
 */
export const gameLoop = (
  context: CanvasRenderingContext2D,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  playerRef: React.MutableRefObject<AbstractEntity>,
  enemiesRef: React.MutableRefObject<AbstractEntity[]>,
  bulletsRef: React.MutableRefObject<AbstractEntity[]>,
  obstaclesRef: React.MutableRefObject<Obstacle[]>,
  livesRef: React.MutableRefObject<number>,
  handleGameOver: () => void
) => {
  clearCanvas(context)

  // Обновление позиций врагов
  updateEnemyPositions(playerRef.current, enemiesRef)
  if (!canvasRef.current) return
  const moveProps: ControlsProps = {
    playerRef,
    bulletsRef,
    obstacles: obstaclesRef.current,
    canvasWidth: canvasRef.current.width,
    canvasHeight: canvasRef.current.height,
  }
  updatePlayerAction(moveProps)

  bulletsRef.current = updateBullets(
    bulletsRef.current,
    canvasRef.current.width,
    canvasRef.current.height
  )

  // Отрисовка всех игровых объектов
  drawObstacles(context, obstaclesRef.current)
  drawPlayer(context, playerRef.current)
  drawEnemies(context, enemiesRef.current)
  drawBullets(context, bulletsRef.current) // Отрисовка пуль

  // Проверка на столкновения пуль с врагами
  bulletsRef.current.forEach(bullet => {
    enemiesRef.current = enemiesRef.current.filter(enemy => {
      const hit = detectBulletCollision(bullet, enemy)
      if (hit) {
        // Убираем врага, если попали
        killEnemy(enemiesRef, enemy)
        return false
      }
      return true
    })
  })

  // Проверка на столкновения между игроком и врагами
  enemiesRef.current.forEach(enemy => {
    if (detectEnemyCollision(playerRef.current, enemy)) {
      // Обработка столкновения: уменьшаем жизни
      HandlePlayerHit(
        livesRef,
        handleGameOver,
        () => resetPlayerPosition(playerRef),
        () => respawnEnemies(enemiesRef)
      )
    }
  })
}
