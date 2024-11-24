import tankShoot from '@/assets/sounds/tank-shoot.ogg'
import enemyTankShoot from '@/assets/sounds/enemy-tank-shoot.wav'
import { createSound } from '@/components/Game/sound/createSound'

export const tankShootSound = createSound([tankShoot], 1)

export const enemyTankShootSound = createSound([enemyTankShoot], 1)
