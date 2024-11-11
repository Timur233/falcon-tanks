import { Howl } from 'howler'
import tankShoot from '@/assets/sounds/tank-shoot.ogg'
import enemyTankShoot from '@/assets/sounds/enemy-tank-shoot.wav'

export const tankShootSound = new Howl({
  src: [tankShoot],
  volume: 1,
})

export const enemyTankShootSound = new Howl({
  src: [enemyTankShoot],
  volume: 1,
})
