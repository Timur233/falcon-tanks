import { Enemy, Player } from '@/components/Game/gameTypes'
import { useNavigate } from 'react-router-dom'

export const PLAYER_DEFAULT_PARAMS = {
  x: 400,
  y: 300,
  width: 30,
  height: 30,
  speed: 0.1,
  direction: { x: 0, y: 0 },
}

export const resetPlayerPosition = (
  player: Player,
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
) => {
  setPlayer({
    ...player,
    x: PLAYER_DEFAULT_PARAMS.x,
    y: PLAYER_DEFAULT_PARAMS.y,
  })
}

/**
 * Функция для обработки столкновения игрока с врагом.
 * @param setPlayer - Функция для обновления состояния игрока.
 * @param setLives - Функция для изменения количества жизней игрока.
 * @param resetPlayerPosition - Функция для сброса позиции игрока.
 * @param respawnEnemies - Функция для респауна врагов.
 * @param setEnemies - Функция для обновления состояния врагов.
 */
export const HandlePlayerHit = (
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
  const navigate = useNavigate()
  setLives(prevLives => {
    const newLives = prevLives - 1
    if (newLives <= 0) {
      navigate('/game-over')
    } else {
      resetPlayerPosition(setPlayer)
      respawnEnemies(setEnemies)
    }
    return newLives
  })
}
