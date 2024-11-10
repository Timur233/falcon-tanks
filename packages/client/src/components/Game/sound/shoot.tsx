import { Howl } from 'howler'
import shootSound from '@/assets/sounds/tankovyiy-vyistrel.ogg'
import zvukVistrelaIzOrudiyaTanka from '@/assets/sounds/audio-editor-output.wav'

// Инициализируем звуковой эффект для выстрела
export const shootSoundHowl = new Howl({
  src: [shootSound], // укажите путь к файлу звука
  volume: 1,
})

export const enemyShootSound = new Howl({
  src: [zvukVistrelaIzOrudiyaTanka], // укажите путь к файлу звука
  volume: 1,
})
