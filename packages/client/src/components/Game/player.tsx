import { Enemy, Player } from '@/components/Game/gameTypes'

export const initializePlayer = () => ({
  x: 400,
  y: 300,
  width: 30,
  height: 30,
  speed: 0.5,
  direction: { x: 0, y: 0 },
})

export const resetPlayerPosition = (
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
) => {
  setPlayer(initializePlayer())
}

/**
 * Функция для обработки столкновения игрока с врагом.
 * @param setPlayer - Функция для обновления состояния игрока.
 * @param setLives - Функция для изменения количества жизней игрока.
 * @param resetPlayerPosition - Функция для сброса позиции игрока.
 * @param respawnEnemies - Функция для респауна врагов.
 * @param setEnemies - Функция для обновления состояния врагов.
 */
export const handlePlayerHit = (
  setPlayer: React.Dispatch<React.SetStateAction<Player>>,
  setLives: React.Dispatch<React.SetStateAction<number>>,
  resetPlayerPosition: (
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
  ) => void,
  respawnEnemies: (
    setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>
  ) => void,
  setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>
) => {
  setLives(prevLives => {
    const newLives = prevLives - 1
    if (newLives <= 0) {
      window.location.reload()
    } else {
      resetPlayerPosition(setPlayer)
      respawnEnemies(setEnemies)
    }
    return newLives
  })
}
