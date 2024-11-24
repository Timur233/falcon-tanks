import { AbstractEntity } from '@/components/Game/gameTypes'
import { MAX_DISTANCE } from '@/components/Game/constants'

const distanceMath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x1 - x2
  const dy = y1 - y2
  return Math.hypot(dx, dy)
}

const mathVolumeByDistance = (distance: number) => {
  return Math.max(0, 1 - distance / MAX_DISTANCE)
}

const mathPanByDistance = (distance: number) => {
  // Рассчитываем панорамирование (-1 — левый край, 1 — правый)
  return Math.max(-1, Math.min(1, distance / MAX_DISTANCE))
}

export const playShotSound = (
  sound: Howl,
  sourcePosition: AbstractEntity,
  canvasWidth: number,
  canvasHeight: number
) => {
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const distance = distanceMath(
    centerX,
    centerY,
    sourcePosition.x,
    sourcePosition.y
  )

  const volume = mathVolumeByDistance(distance)
  const pan = mathPanByDistance(distance)

  sound.volume(volume) // Устанавливаем громкость
  sound.stereo(pan) // Устанавливаем панорамирование
  sound.play() // Проигрываем звук
}
