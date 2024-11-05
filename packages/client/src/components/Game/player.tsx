import { AbstractEntity, Enemy } from '@/components/Game/gameTypes'

export const PLAYER_DEFAULT_PARAMS = {
  x: 400,
  y: 500,
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

export const GET_PLAYER_DEFAULT_PARAMS = () => {
  return Object.assign({}, PLAYER_DEFAULT_PARAMS)
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
  handleGameOver: () => void,
  handleDeath: (lives: number) => void
) => {
  livesRef.current -= 1

  if (livesRef.current <= 0) {
    handleGameOver()
  } else {
    handleDeath(livesRef.current)
  }
}
