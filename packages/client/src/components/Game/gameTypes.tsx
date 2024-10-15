export interface AbstractEntity {
  x: number
  y: number
  width: number
  height: number
  speed: number
  direction: { x: number; y: number }
}

export interface Enemy extends AbstractEntity {
  id: number
  lastShotTime?: number
}

export interface Obstacle {
  x: number
  y: number
  width: number
  height: number
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
  bulletsRef: React.MutableRefObject<AbstractEntity[]>
  obstacles: Obstacle[]
  canvasWidth: number
  canvasHeight: number
}
