import { HandlePlayerHit, resetPlayerPosition } from './player'
import { updateEnemyPositions, respawnEnemies } from './enemy'
import { clearCanvas, drawPlayer, drawEnemies, drawObstacles } from './utils'
import { Enemy, Obstacle, Player } from '@/components/Game/gameTypes'
import { detectEnemyCollision } from '@/components/Game/collision'

/**
 * Основной игровой цикл, который обновляет состояние игры и перерисовывает экран каждый кадр.
 * @param context - Контекст рисования для Canvas.
 * @param playerRef - Ссылка на текущего игрока.
 * @param enemiesRef - Ссылка на массив врагов.
 * @param obstacles - Массив препятствий.
 * @param livesRef - Ссылка на текущее количество жизней игрока.
 * @param handleGameOver - Обработчик события окончания игры.
 */
export const gameLoop = (
  context: CanvasRenderingContext2D,
  playerRef: React.MutableRefObject<Player>,
  enemiesRef: React.MutableRefObject<Enemy[]>,
  obstacles: Obstacle[],
  livesRef: React.MutableRefObject<number>,
  handleDeath: (lives: number) => void,
  handleGameOver: () => void
) => {
  clearCanvas(context)

  // Обновление позиций врагов
  updateEnemyPositions(playerRef.current, enemiesRef)

  // Отрисовка всех игровых объектов
  drawObstacles(context, obstacles)
  drawPlayer(context, playerRef.current)
  drawEnemies(context, enemiesRef.current)

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

      handleDeath(livesRef.current)
    }
  })
}
