import { AbstractEntity } from '@/components/Game/gameTypes'

// Функция для проигрывания звука с учётом центра карты
export const playShotSound = (
  sound: Howl,
  sourcePosition: AbstractEntity,
  canvasWidth: number,
  canvasHeight: number
) => {
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const distance = Math.hypot(
    sourcePosition.x - centerX,
    sourcePosition.y - centerY
  )

  const maxDistance = 300 // Максимальное расстояние для громкости
  const volume = Math.max(0, 1 - distance / maxDistance)

  // Рассчитываем панорамирование (-1 — левый край, 1 — правый)
  const pan = Math.max(
    -1,
    Math.min(1, (sourcePosition.x - centerX) / (canvasWidth / 2))
  )

  sound.volume(volume) // Устанавливаем громкость
  sound.stereo(pan) // Устанавливаем панорамирование
  sound.play() // Проигрываем звук
}
