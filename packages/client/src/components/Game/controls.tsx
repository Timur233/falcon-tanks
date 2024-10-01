import { ControlsProps, KeyMap } from '@/components/Game/gameTypes'

import { detectCollision } from '@/components/Game/collision'

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
export const updatePlayerMovement = (props: ControlsProps) => {
  const speed = props.player.speed

  props.setPlayer(prevPlayer => {
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

    // Обработка столкновений с препятствиями
    const hasCollision = props.obstacles.find(obstacle => {
      return detectCollision({ ...prevPlayer, x: newX, y: newY }, obstacle)
    })

    // Если есть столкновение, то вернуть предыдущую позицию
    if (hasCollision) {
      newX = prevPlayer.x
      newY = prevPlayer.y
    } else {
      // Ограничение движения по краям canvas
      newX = Math.max(0, Math.min(newX, props.canvasWidth - prevPlayer.width))
      newY = Math.max(0, Math.min(newY, props.canvasHeight - prevPlayer.height))
    }

    return { ...prevPlayer, x: newX, y: newY }
  })
}
