import { Direction, Effect } from '@/components/Game/gameTypes'
import { MutableRefObject } from 'react'
import { effectSettings } from '@/components/Game/constants'

let effectsRef: MutableRefObject<Effect[]>

export const initEffects = (effects: MutableRefObject<Effect[]>) => {
  effectsRef = effects
}

export const createEffect = (
  type: string,
  x: number,
  y: number,
  direction?: Direction
) => {
  if (effectsRef) {
    effectsRef.current.push({
      type,
      x: x - effectSettings[type].width / 2,
      y: y - effectSettings[type].height / 2,
      width: effectSettings[type].width,
      height: effectSettings[type].height,
      direction,
      animation: { ...effectSettings[type].animation },
    })
  }
}

export const createBangEffect = (x: number, y: number) => {
  createEffect('bang', x, y)
}

export const createShotEffect = (
  x: number,
  y: number,
  direction: Direction
) => {
  createEffect('shot', x, y, direction)
}

export const deleteEffect = (effect: Effect) => {
  effectsRef.current = effectsRef.current.filter(i => i !== effect)
}
