import { Howl } from 'howler'
import StartBattle from '@/assets/sounds/marching-on-20240607-022753.ogg'

export const startBattleSound = new Howl({
  src: [StartBattle], // укажите путь к файлу звука
  volume: 0.5,
  loop: true,
})
