interface AnimationParams {
  currentFrame: number
  totalFrames: number
  frameInterval?: number
  frameCount?: number
}

export interface Direction {
  x: number
  y: number
}

export interface AbstractEntity {
  x: number
  y: number
  width: number
  height: number
  speed: number
  direction: Direction
  animation?: AnimationParams
}

export interface Bullet extends AbstractEntity {
  isPlayer: boolean
}

export interface Enemy extends AbstractEntity {
  id: number
  lastShotTime?: number
}

export interface Obstacle {
  type: string
  x: number
  y: number
  width: number
  height: number
  hp: number
  isCollide: boolean
  animation: AnimationParams
}

export interface Effect {
  type: string
  x: number
  y: number
  width: number
  height: number
  direction?: Direction
  animation: AnimationParams
}

export interface BtnStates {
  [key: string]: boolean
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  fire: boolean
}

export interface ControlsProps {
  playerRef: React.MutableRefObject<AbstractEntity>
  bulletsRef: React.MutableRefObject<Bullet[]>
  obstacles: Obstacle[]
  canvasWidth: number
  canvasHeight: number
}
