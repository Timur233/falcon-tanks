import { BtnStates, ControlsProps } from '@/components/Game/gameTypes'
import { detectCollision } from '@/components/Game/collision'
import { createBullet } from '@/components/Game/bullet'

const btnStates: BtnStates = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire: false,
}
let pressedKeys: string[] = []
let shootPressed = false // Флаг для стрельбы
let lastShotTime = 0 // Время последнего выстрела
const SHOOT_DELAY = 500 // Задержка между выстрелами (в миллисекундах)

enum Action {
  MoveUp = 'MoveUp',
  MoveDown = 'MoveDown',
  MoveLeft = 'MoveLeft',
  MoveRight = 'MoveRight',
  Shoot = 'Shoot',
}

type Vector = {
  x: -1 | 0 | 1
  y: -1 | 0 | 1
}

const ACTION_CONTROLS: Record<Action, string[]> = {
  [Action.MoveUp]: ['ArrowUp', 'w', 'ц', 'W', 'Ц'],
  [Action.MoveDown]: ['ArrowDown', 's', 'ы', 'S', 'Ы'],
  [Action.MoveLeft]: ['ArrowLeft', 'a', 'ф', 'A', 'Ф'],
  [Action.MoveRight]: ['ArrowRight', 'd', 'в', 'D', 'В'],
  [Action.Shoot]: [' '],
}

const VECTORS: Record<Action, Vector> = {
  [Action.MoveUp]: { x: 0, y: -1 },
  [Action.MoveDown]: { x: 0, y: 1 },
  [Action.MoveLeft]: { x: -1, y: 0 },
  [Action.MoveRight]: { x: 1, y: 0 },
  [Action.Shoot]: { x: 0, y: 0 },
}

const checkPressedKeys = (keys: string[]): BtnStates => {
  keys.forEach((key: string) => {
    btnStates.up = ACTION_CONTROLS[Action.MoveUp].includes(key)
    btnStates.down = ACTION_CONTROLS[Action.MoveDown].includes(key)
    btnStates.left = ACTION_CONTROLS[Action.MoveLeft].includes(key)
    btnStates.right = ACTION_CONTROLS[Action.MoveRight].includes(key)
    btnStates.fire = ACTION_CONTROLS[Action.Shoot].includes(key)
  })

  return btnStates
}

export const handleKeyDownUp = (
  type: string,
  key: string,
  onKeyDownUp: (state: BtnStates) => void
) => {
  const isKeydown = type === 'keydown'

  if (isKeydown) {
    if (!pressedKeys.includes(key)) {
      pressedKeys.push(key)

      if (key === ' ') {
        shootPressed = true
      }
    }
  } else {
    pressedKeys = pressedKeys.filter(currentKey => currentKey !== key)

    if (key === ' ') {
      shootPressed = false
    }
  }

  onKeyDownUp(checkPressedKeys(pressedKeys))
}

export const resetButtonsStates = () => {
  pressedKeys = []
  shootPressed = false
}

const getActionControlByKey = (key: string): Action | null => {
  for (const [action, keys] of Object.entries(ACTION_CONTROLS)) {
    if (keys.includes(key)) {
      return action as Action
    }
  }

  return null
}

const getLastAction = (): Action | null => {
  for (let i = pressedKeys.length - 1; i >= 0; i--) {
    const action = getActionControlByKey(pressedKeys[i])

    if (action) {
      return action
    }
  }

  return null
}

export const updatePlayerAction = (props: ControlsProps) => {
  const speed = props.playerRef.current.speed
  let newX = props.playerRef.current.x
  let newY = props.playerRef.current.y

  const lastMovementAction = getLastAction()

  if (!lastMovementAction) return

  const vector = VECTORS[lastMovementAction]

  if (!vector) return

  const currentTime = Date.now() // Получаем текущее время

  if (lastMovementAction === Action.Shoot) {
    // Ограничение скорости стрельбы с помощью таймера
    if (shootPressed && currentTime - lastShotTime >= SHOOT_DELAY) {
      props.bulletsRef.current.push(createBullet(props.playerRef.current, true))
      lastShotTime = currentTime // Обновляем время последнего выстрела
    }
  } else {
    props.playerRef.current.direction = vector

    newX += vector.x * speed
    newY += vector.y * speed
  }

  const hasCollision = props.obstacles.some(obstacle => {
    return detectCollision(
      { ...props.playerRef.current, x: newX, y: newY },
      obstacle
    )
  })

  if (!hasCollision) {
    newX = Math.max(
      0,
      Math.min(newX, props.canvasWidth - props.playerRef.current.width)
    )
    newY = Math.max(
      0,
      Math.min(newY, props.canvasHeight - props.playerRef.current.height)
    )

    props.playerRef.current.x = newX
    props.playerRef.current.y = newY
  }
}
