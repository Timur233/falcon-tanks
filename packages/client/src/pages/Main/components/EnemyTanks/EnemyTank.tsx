import './EnemyTank.scss'
import EnemyTankLeft from '@/assets/images/enemy-tank_left.png'
import EnemyTankRight from '@/assets/images/enemy-tank_right.png'
import SmokeBottom from '@/assets/images/smoke-bottom.png'
import SmokeMiddle from '@/assets/images/smoke-middle.png'
import SmokeTop from '@/assets/images/smoke-top.png'

type EnemyTanksPropsType = {
  side?: 'left' | 'right'
  title?: string
  isLoaded?: boolean
}

export const EnemyTank = (props: EnemyTanksPropsType) => {
  const { side = 'left', title = 'tank wars', isLoaded = false } = props
  const tankImage = side === 'right' ? EnemyTankRight : EnemyTankLeft

  return (
    <div className={`enemy-tank enemy-tank_${side}`}>
      <div className={`enemy-tank__smoke tank-smoke tank-smoke_${side}`}>
        <img
          className={`tank-smoke__top tank-smoke__top_${side} ${
            isLoaded ? 'tank-smoke__top_show' : ''
          }`}
          draggable="false"
          src={SmokeTop}
          aria-hidden="true"
          alt={title}
        />
        <img
          className={`tank-smoke__middle tank-smoke__middle_${side} ${
            isLoaded ? 'tank-smoke__middle_show' : ''
          }`}
          draggable="false"
          src={SmokeMiddle}
          aria-hidden="true"
          alt={title}
        />
        <img
          className={`tank-smoke__bottom tank-smoke__bottom_${side} ${
            isLoaded ? 'tank-smoke__bottom_show' : ''
          }`}
          draggable="false"
          src={SmokeBottom}
          aria-hidden="true"
          alt={title}
        />
      </div>
      <img
        src={tankImage}
        className={`enemy-tank__machine enemy-tank__machine_${side}`}
        draggable="false"
        aria-hidden="true"
        alt={title}
      />
    </div>
  )
}
