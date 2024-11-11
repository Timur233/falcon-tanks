import { Howl } from 'howler'
import enemyExplosion from '@/assets/sounds/enemy-explosion.mp3'

export const enemyExplosionSound = new Howl({
  src: [enemyExplosion],
  volume: 0.5,
})
