import { Howl } from 'howler'
import startBattle from '@/assets/sounds/start-battle.ogg'

export const startBattleSound = new Howl({
  src: [startBattle],
  volume: 0.5,
  loop: true,
})
