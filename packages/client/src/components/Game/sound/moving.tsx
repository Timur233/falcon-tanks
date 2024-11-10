import { Howl } from 'howler'
import tankMoving from '@/assets/sounds/tyajelyiy-tank-leopard.ogg'

// Инициализируем звуковой эффект для выстрела
export const tankMovingHowl = new Howl({
  src: [tankMoving], // укажите путь к файлу звука
  volume: 1,
  loop: true,
})
