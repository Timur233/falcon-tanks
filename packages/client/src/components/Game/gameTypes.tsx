import { GameMap } from '@/components/Game/gameMap'

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
  gameMap: React.MutableRefObject<GameMap>
  bulletsRef: React.MutableRefObject<AbstractEntity[]>
  canvasWidth: number
  canvasHeight: number
}

export enum PositionType {
  Player = 'player',
  Enemy = 'enemy',
  Obstacle = 'obstacle',
  Ground = 'ground',
  Shadow = 'shadow',
}

export interface Position {
  x: number
  y: number
}

export interface ObjectPosition extends Position {
  type: PositionType
}

export interface RandomPosition {
  playerPosition: Position
  enemyCount: number
  obstacleCount: number
}

export interface GameMapParams {
  window_width: number
  window_height: number
  grid_size: number
  player: AbstractEntity
  enemies: Enemy[]
  obstacles: Obstacle[]
}

export type GamePropsType = {
  lives: number
  onKill: (kills: number) => void
  isGameStarted: boolean
  isCompanyStarted: boolean
  isGamePaused: boolean
  onDeath: (lives: number) => void
  onGameOver: (isVictory: boolean) => void
  onKeyDownUp: (btnStates: BtnStates) => void
}

export enum Action {
  MoveUp = 'MoveUp',
  MoveDown = 'MoveDown',
  MoveLeft = 'MoveLeft',
  MoveRight = 'MoveRight',
  Shoot = 'Shoot',
}

export type Vector = {
  x: -1 | 0 | 1
  y: -1 | 0 | 1
}

export interface EffectSettings {
  [key: string]: {
    width: number
    height: number
    animation: Effect['animation']
  }
}

export enum obstacleTypes {
  Wall = 'wall',
  Steel = 'steel',
  Tree = 'tree',
}

export interface ObstacleParams {
  type: obstacleTypes
  x: number
  y: number
  width: number
  height: number
}
