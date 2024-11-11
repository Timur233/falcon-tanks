import startBattle from '@/assets/sounds/start-battle.ogg'
import { createSound } from '@/components/Game/sound/createSound'

export const startBattleSound = createSound([startBattle], 0.5, true)
