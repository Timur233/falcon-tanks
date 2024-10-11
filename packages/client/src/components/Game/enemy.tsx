import React from 'react'
import { Enemy, Player } from '@/components/Game/gameTypes'

const enemyParams = {
  width: 70,
  height: 70,
  speed: 0,
  direction: { x: 0, y: 0 },
}

export const initializeEnemies = (): Enemy[] => {
  return [
    { ...enemyParams, x: 50, y: 55 },
    { ...enemyParams, x: 320, y: 250 },
    { ...enemyParams, x: 715, y: 60 },
  ]
}

export const updateEnemyPositions = (
  player: Player,
  enemiesRef: React.MutableRefObject<Enemy[]>
) => {
  enemiesRef.current = enemiesRef.current.map(enemy => {
    const directionX = player.x - enemy.x
    const directionY = player.y - enemy.y

    const magnitude = Math.sqrt(directionX ** 2 + directionY ** 2)
    const normalizedX = directionX / magnitude
    const normalizedY = directionY / magnitude

    const newX = enemy.x + normalizedX * enemy.speed
    const newY = enemy.y + normalizedY * enemy.speed

    return { ...enemy, x: newX, y: newY }
  })
}

export const respawnEnemies = (enemiesRef: React.MutableRefObject<Enemy[]>) => {
  enemiesRef.current = initializeEnemies()
}
