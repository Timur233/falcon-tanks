import { Howl } from 'howler'
import tankMoving from '@/assets/sounds/tank-moving.ogg'

export const tankMovingSound = new Howl({
  src: [tankMoving],
  volume: 1,
  loop: true,
})
