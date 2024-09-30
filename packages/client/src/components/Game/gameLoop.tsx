import { handlePlayerHit, resetPlayerPosition } from './player'
import {
  updateEnemyPositions,
  respawnEnemies,
  detectEnemyCollision,
} from './enemy'
import { clearCanvas, drawPlayer, drawEnemies, drawObstacles } from './utils'
import { Enemy, Obstacle, Player } from '@/components/Game/gameTypes'

/**
 * Основной игровой цикл, который обновляет состояние игры и перерисовывает экран каждый кадр.
 * @param timestamp - Время, прошедшее с начала игры, используется для расчета обновлений.
 * @param context - Контекст рисования для Canvas.
 * @param player - Объект игрока.
 * @param setPlayer - Функция для обновления состояния игрока.
 * @param enemies - Массив врагов.
 * @param setEnemies - Функция для обновления состояния врагов.
 * @param obstacles - Массив препятствий.
 * @param lives - Текущее количество жизней игрока.
 * @param setLives - Функция для изменения количества жизней игрока.
 * @param speedFactor - Коэффициент скорости.
 * @param handleGameOver - Обработчик события окончания игры.
 * @param isPaused - Флаг паузы.
 * @param isGameOver - Флаг окончания игры.
 */
export const gameLoop = (
  timestamp: number,
  context: CanvasRenderingContext2D,
  player: Player,
  setPlayer: React.Dispatch<React.SetStateAction<Player>>,
  enemies: Enemy[],
  setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>,
  obstacles: Obstacle[],
  lives: number,
  setLives: React.Dispatch<React.SetStateAction<number>>,
  speedFactor: number,
  handleGameOver: () => void,
  isPaused: boolean,
  isGameOver: boolean
) => {
  clearCanvas(context)

  // Обновление позиций врагов
  updateEnemyPositions(player, enemies, setEnemies, speedFactor)
  // Отрисовка всех игровых объектов
  drawObstacles(context, obstacles)
  drawPlayer(context, player)
  drawEnemies(context, enemies)

  // Проверка на столкновения между игроком и врагами
  enemies.forEach(enemy => {
    if (detectEnemyCollision(player, enemy)) {
      // Обработка столкновения: уменьшаем жизни
      handlePlayerHit(
        setPlayer,
        setLives,
        () => resetPlayerPosition(setPlayer),
        respawnEnemies,
        setEnemies
      )

      // Проверка на конец игры
      if (lives - 1 <= 0) {
        handleGameOver() // Вызываем окончание игры, если жизни закончились
      }
    }
  })

  // Запуск следующего кадра (будет работать только если игра не на паузе)
  if (!isPaused && !isGameOver) {
    requestAnimationFrame(newTimestamp =>
      gameLoop(
        newTimestamp,
        context,
        player,
        setPlayer,
        enemies,
        setEnemies,
        obstacles,
        lives,
        setLives,
        speedFactor,
        handleGameOver,
        isPaused,
        isGameOver
      )
    )
  }
}
