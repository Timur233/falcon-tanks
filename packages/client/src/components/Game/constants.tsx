import { EffectSettings, obstacleTypes } from '@/components/Game/gameTypes'

export const bulletSize = {
  width: 12,
  height: 18,
}
export const SHOOT_DELAY = 500 // Задержка между выстрелами (в миллисекундах)
export const effectSettings: EffectSettings = {
  bang: {
    width: 60,
    height: 60,
    animation: {
      frameInterval: 5,
      frameCount: 0,
      totalFrames: 8,
      currentFrame: 0,
    },
  },
  shot: {
    width: 40,
    height: 40,
    animation: {
      frameInterval: 5,
      frameCount: 0,
      totalFrames: 4,
      currentFrame: 0,
    },
  },
}
export const DefaultEnemy = {
  width: 70,
  height: 70,
  speed: 1,
  direction: { x: 0, y: 0 },
  animation: {
    currentFrame: 0,
    totalFrames: 4,
    frameInterval: 10,
    frameCount: 0,
  },
}
export const WINDOW_WIDTH = 800
export const WINDOW_HEIGHT = 600
export const GRID_SIZE = 36
export const OBSTACLE_SIZE = 36
export const ObstacleSettings = {
  [obstacleTypes.Wall]: {
    hp: 2,
    isCollide: true,
    frames: [
      {
        hp: 1,
        index: 1,
      },
      {
        hp: 2,
        index: 0,
      },
    ],
  },
  [obstacleTypes.Steel]: {
    hp: 1000,
    isCollide: true,
    frames: [
      {
        hp: 1000,
        index: 0,
      },
    ],
  },
  [obstacleTypes.Tree]: {
    hp: 1000,
    isCollide: false,
    frames: [
      {
        hp: 1000,
        index: 0,
      },
    ],
  },
}
