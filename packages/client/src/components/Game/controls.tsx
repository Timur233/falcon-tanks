import { KeyMap, Player } from '@/components/Game/gameTypes'

const keyMap: KeyMap = {}

// Обработчик нажатия клавиш
export const handleKeyDown = (key: string) => {
  keyMap[key] = true
}

// Обработчик отпускания клавиш
export const handleKeyUp = (key: string) => {
  delete keyMap[key]
}

// Функция для обновления позиции игрока на основе нажатых клавиш
export const updatePlayerMovement = (
  player: Player,
  setPlayer: React.Dispatch<React.SetStateAction<Player>>,
  speedFactor: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  const speed = player.speed * speedFactor

  setPlayer(prevPlayer => {
    let newX = prevPlayer.x
    let newY = prevPlayer.y

    // Определение направления движения
    if (keyMap['ArrowUp'] || keyMap['w'] || keyMap['ц']) {
      newY -= speed
    }
    if (keyMap['ArrowDown'] || keyMap['s'] || keyMap['ы']) {
      newY += speed
    }
    if (keyMap['ArrowLeft'] || keyMap['a'] || keyMap['ф']) {
      newX -= speed
    }
    if (keyMap['ArrowRight'] || keyMap['d'] || keyMap['в']) {
      newX += speed
    }

    // Ограничение движения по краям canvas
    newX = Math.max(0, Math.min(newX, canvasWidth - prevPlayer.width))
    newY = Math.max(0, Math.min(newY, canvasHeight - prevPlayer.height))

    return { ...prevPlayer, x: newX, y: newY }
  })
}
