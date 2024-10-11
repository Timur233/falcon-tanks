import { ControlsProps } from '@/components/Game/gameTypes'

import { detectCollision } from '@/components/Game/collision'

let pressedKeys: string[] = []

enum Action {
  MoveUp = 'MoveUp',
  MoveDown = 'MoveDown',
  MoveLeft = 'MoveLeft',
  MoveRight = 'MoveRight',
}

type Vector = {
  x: -1 | 0 | 1
  y: -1 | 0 | 1
}

const MOVEMENT_CONTROLS: Record<Action, string[]> = {
  [Action.MoveUp]: ['ArrowUp', 'w', 'ц'],
  [Action.MoveDown]: ['ArrowDown', 's', 'ы'],
  [Action.MoveLeft]: ['ArrowLeft', 'a', 'ф'],
  [Action.MoveRight]: ['ArrowRight', 'd', 'в'],
}

const VECTORS: Record<Action, Vector> = {
  [Action.MoveUp]: { x: 0, y: -1 },
  [Action.MoveDown]: { x: 0, y: 1 },
  [Action.MoveLeft]: { x: -1, y: 0 },
  [Action.MoveRight]: { x: 1, y: 0 },
}

export const handleKeyDown = (key: string) => {
  if (!pressedKeys.includes(key)) {
    pressedKeys.push(key)
  }
}

export const handleKeyUp = (key: string) => {
  pressedKeys = pressedKeys.filter(currentKey => currentKey !== key)
}

const getMovementControlByKey = (key: string): Action | null => {
  for (const [action, keys] of Object.entries(MOVEMENT_CONTROLS)) {
    if (keys.includes(key)) {
      return action as Action
    }
  }

  return null
}

const getLastMovementAction = (): Action | null => {
  for (let i = pressedKeys.length - 1; i >= 0; i--) {
    const action = getMovementControlByKey(pressedKeys[i])

    if (action) {
      return action
    }
  }

  return null
}

export const updatePlayerMovement = (props: ControlsProps) => {
  const speed = props.playerRef.current.speed
  let newX = props.playerRef.current.x
  let newY = props.playerRef.current.y

  const lastMovementAction = getLastMovementAction()

  if (!lastMovementAction) return

  const vector = VECTORS[lastMovementAction]
  if (vector) props.playerRef.current.direction = vector

  newX += vector.x * speed
  newY += vector.y * speed

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
