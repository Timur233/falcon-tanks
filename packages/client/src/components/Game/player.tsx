import { AbstractEntity } from '@/components/Game/gameTypes'

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

export const GET_PLAYER_DEFAULT_PARAMS = () => {
  return Object.assign({}, PLAYER_DEFAULT_PARAMS)
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
 * @param handleGameOver - Обработчик события окончания игры.
 * @param handleDeath - Обработчик события смерти игрока.
 */
export const HandlePlayerHit = (
  livesRef: React.MutableRefObject<number>,
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
