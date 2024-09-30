export interface Player {
  x: number
  y: number
  width: number
  height: number
  speed: number
  direction: { x: number; y: number }
}

export interface Enemy {
  x: number
  y: number
  width: number
  height: number
  speed: number
  direction: { x: number; y: number }
}

export interface Obstacle {
  x: number
  y: number
  width: number
  height: number
}

export interface KeyMap {
  [key: string]: boolean
}

export interface ControlsProps {
  player: Player
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  obstacles: Obstacle[]
  canvasWidth: number
  canvasHeight: number
}
