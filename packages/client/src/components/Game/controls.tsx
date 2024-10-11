import { ControlsProps, BtnStates } from '@/components/Game/gameTypes'
import { detectCollision } from '@/components/Game/collision'

const btnStates: BtnStates = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire: false,
}

export const handleKeyDownUp = (
  type: string,
  key: string,
  onKeyDownUp: (state: BtnStates) => void
) => {
  const checkBtnState = (
    aliases: string[],
    type: string,
    prevState: boolean
  ) => {
    if (aliases.includes(key)) {
      return type === 'keydown'
    }

    return prevState
  }

  btnStates.up = checkBtnState(['ArrowUp', 'w', 'ц'], type, btnStates.up)
  btnStates.down = checkBtnState(['ArrowDown', 's', 'ы'], type, btnStates.down)
  btnStates.left = checkBtnState(['ArrowLeft', 'a', 'ф'], type, btnStates.left)
  btnStates.right = checkBtnState(
    ['ArrowRight', 'd', 'в'],
    type,
    btnStates.right
  )
  btnStates.fire = checkBtnState([' '], type, btnStates.fire)

  onKeyDownUp(btnStates)
}

// Функция для обновления позиции игрока на основе нажатых клавиш
export const updatePlayerMovement = (props: ControlsProps) => {
  const speed = props.playerRef.current.speed
  let newX = props.playerRef.current.x
  let newY = props.playerRef.current.y

  // Определение направления движения
  if (btnStates.up) {
    newY -= speed
  }
  if (btnStates.down) {
    newY += speed
  }
  if (btnStates.left) {
    newX -= speed
  }
  if (btnStates.right) {
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
