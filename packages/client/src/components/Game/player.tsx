import { respawnEnemies } from '@/components/Game/enemy'
import { Enemy, Obstacle, Player } from '@/components/Game/gameTypes'

export const initializePlayer = () => ({
  x: 400,
  y: 300,
  width: 30,
  height: 30,
  speed: 0.1,
  direction: { x: 0, y: 0 },
})

const detectCollision = (player: Player, obstacle: Obstacle): boolean => {
  return (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  )
}

export const updatePlayerPosition = (
  player: Player,
  setPlayer: React.Dispatch<React.SetStateAction<Player>>,
  obstacles: Obstacle[]
) => {
  const newX = player.x + player.direction.x * player.speed
  const newY = player.y + player.direction.y * player.speed

  let collisionDetected = false
  obstacles.forEach(obstacle => {
    if (detectCollision({ ...player, x: newX, y: newY }, obstacle)) {
      collisionDetected = true
    }
  })
  if (!collisionDetected) {
    setPlayer(prev => ({
      ...prev,
      x: newX,
      y: newY,
    }))
  }
}

export const resetPlayerPosition = (
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
) => {
  setPlayer(initializePlayer())
}

/**
 * Функция для обработки столкновения игрока с врагом.
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
      console.log('Game over!')
      window.location.reload()
    } else {
      resetPlayerPosition(setPlayer)
      respawnEnemies(setEnemies)
    }
    return newLives
  })
}
