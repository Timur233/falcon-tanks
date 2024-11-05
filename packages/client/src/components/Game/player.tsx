import { PLAYER_DEFAULT_PARAMS } from '@/components/Game/constants'

export const GET_PLAYER_DEFAULT_PARAMS = () => {
  return Object.assign({}, PLAYER_DEFAULT_PARAMS)
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
