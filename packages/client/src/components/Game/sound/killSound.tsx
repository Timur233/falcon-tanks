import { Howl } from 'howler'
import killSound from '@/assets/sounds/kill.mp3'

export const killEnemySound = new Howl({
  src: [killSound], // укажите путь к файлу звука
  volume: 0.5,
})
