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
}

export interface Obstacle {
  x: number
  y: number
  width: number
  height: number
}

export interface ControlsProps {
  playerRef: React.MutableRefObject<AbstractEntity>
  bulletsRef: React.MutableRefObject<AbstractEntity[]>
  obstacles: Obstacle[]
  canvasWidth: number
  canvasHeight: number
}
