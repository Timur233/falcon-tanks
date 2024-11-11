import { Howl } from 'howler'

export const createSound = (
  audioSrc: string[],
  volume?: number | undefined,
  loop?: boolean | undefined,
  sprite?: { [key: string]: [number, number] } | undefined
) =>
  new Howl({
    src: audioSrc,
    volume: volume,
    loop: loop,
    sprite: sprite,
  })
