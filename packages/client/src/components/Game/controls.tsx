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
  const speed = props.playerRef.current.speed
  let newX = props.playerRef.current.x
  let newY = props.playerRef.current.y

  // Определение направления движения
  if (keyMap['ArrowUp'] || keyMap['w'] || keyMap['ц']) {
    props.playerRef.current.direction = { x: 0, y: 1 }
    newY -= speed
  }
  if (keyMap['ArrowDown'] || keyMap['s'] || keyMap['ы']) {
    props.playerRef.current.direction = { x: 0, y: -1 }
    newY += speed
  }
  if (keyMap['ArrowLeft'] || keyMap['a'] || keyMap['ф']) {
    props.playerRef.current.direction = { x: -1, y: 0 }
    newX -= speed
  }
  if (keyMap['ArrowRight'] || keyMap['d'] || keyMap['в']) {
    props.playerRef.current.direction = { x: 1, y: 0 }
    newX += speed
  }

  // Обработка столкновений с препятствиями
  const hasCollision = props.obstacles.some(obstacle => {
    return detectCollision(
      { ...props.playerRef.current, x: newX, y: newY },
      obstacle
    )
  })

  // Если есть столкновение, то оставить предыдущую позицию
  if (!hasCollision) {
    // Ограничение движения по краям canvas
    newX = Math.max(
      0,
      Math.min(newX, props.canvasWidth - props.playerRef.current.width)
    )
    newY = Math.max(
      0,
      Math.min(newY, props.canvasHeight - props.playerRef.current.height)
    )

    // Обновляем позицию игрока в референсе
    props.playerRef.current.x = newX
    props.playerRef.current.y = newY
  }
}
