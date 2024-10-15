import { AbstractEntity, Enemy } from '@/components/Game/gameTypes'
import { respawnEnemies } from '@/components/Game/enemy'

export const PLAYER_DEFAULT_PARAMS = {
  x: 400,
  y: 560,
  width: 70,
  height: 70,
  speed: 3,
  direction: { x: 0, y: 0 },
  animation: {
    currentFrame: 0, // Текущий кадр спрайта
    totalFrames: 4, // Общее количество кадров в спрайте
    frameInterval: 10, // Интервал для смены кадра (в циклах или миллисекундах)
    frameCount: 0, // Счетчик кадров для контроля интервала
  },
}

export const resetPlayerPosition = (
  playerRef: React.MutableRefObject<AbstractEntity>
) => {
  playerRef.current = {
    ...playerRef.current,
    x: PLAYER_DEFAULT_PARAMS.x,
    y: PLAYER_DEFAULT_PARAMS.y,
  }
}
/**
 * Функция для обработки столкновения игрока с врагом.
 * @param livesRef - Ссылка на текущее количество жизней игрока.
 * @param playerRef - Ссылка на игрока.
 * @param enemiesRef - Ссылка на массив врагов.
 * @param canvasRef - Ссылка на HTML-элемент canvas.
 * @param handleGameOver - Обработчик события окончания игры.
 */
export const HandlePlayerHit = (
  livesRef: React.MutableRefObject<number>,
  playerRef: React.MutableRefObject<AbstractEntity>,
  enemiesRef: React.MutableRefObject<Enemy[]>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  handleGameOver: () => void
) => {
  livesRef.current -= 1

  if (livesRef.current <= 0) {
    handleGameOver()
  } else {
    resetPlayerPosition(playerRef)
    respawnEnemies(enemiesRef, canvasRef)
  }
}
