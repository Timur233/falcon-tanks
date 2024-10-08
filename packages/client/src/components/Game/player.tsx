import { Player } from '@/components/Game/gameTypes'

export const PLAYER_DEFAULT_PARAMS = {
  x: 400,
  y: 300,
  width: 30,
  height: 30,
  speed: 1,
  direction: { x: 0, y: 0 },
}

export const resetPlayerPosition = (
  playerRef: React.MutableRefObject<Player>
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
 * @param resetPlayerPosition - Функция для сброса позиции игрока.
 * @param respawnEnemies - Функция для респауна врагов.
 */
export const HandlePlayerHit = (
  livesRef: React.MutableRefObject<number>,
  handleGameOver: () => void,
  resetPlayerPosition: () => void,
  respawnEnemies: () => void
) => {
  const newLives = livesRef.current - 1

  if (newLives <= 0) {
    handleGameOver()
  } else {
    livesRef.current = newLives
    resetPlayerPosition() // Сбрасываем позицию игрока
    respawnEnemies() // Респавн врагов
  }
}
