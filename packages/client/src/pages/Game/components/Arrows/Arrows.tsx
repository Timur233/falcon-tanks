import { Icon } from '@/components/ui/Icon/Icon'
import { ControllBtn } from '../ControllBtn/ControllBtn'
import './Arrows.scss'

type ArrowsPropsType = {
  className?: string
  buttonsState: {
    up: boolean
    down: boolean
    left: boolean
    right: boolean
    fire: boolean
  }
  mouseDownUpHandler: (eventName: string, key: string, keyCode: number) => void
}

export const Arrows = (props: ArrowsPropsType) => {
  const { className, buttonsState, mouseDownUpHandler } = props

  return (
    <div className={`controll-arrows ${className}`}>
      <div className="controll-arrows__horizontal horizontal-arrows">
        <ControllBtn
          className={`controll-btn_big ${
            buttonsState.left ? 'controll-btn_active' : ''
          }`}
          onMouseDown={mouseDownUpHandler.bind({}, 'keydown', 'ArrowLeft', 37)}
          onMouseUp={mouseDownUpHandler.bind({}, 'keyup', 'ArrowLeft', 37)}>
          <Icon id="arrow-left" width={33} height={33}></Icon>
        </ControllBtn>

        <ControllBtn
          className={`controll-btn_big ${
            buttonsState.right ? 'controll-btn_active' : ''
          }`}
          onMouseDown={mouseDownUpHandler.bind({}, 'keydown', 'ArrowRight', 39)}
          onMouseUp={mouseDownUpHandler.bind({}, 'keyup', 'ArrowRight', 39)}>
          <Icon id="arrow-right" width={33} height={33}></Icon>
        </ControllBtn>
      </div>

      <div className="controll-arrows__vertical vertical-arrows">
        <ControllBtn
          className={`controll-btn_big ${
            buttonsState.up ? 'controll-btn_active' : ''
          }`}
          onMouseDown={mouseDownUpHandler.bind({}, 'keydown', 'ArrowUp', 38)}
          onMouseUp={mouseDownUpHandler.bind({}, 'keyup', 'ArrowUp', 38)}>
          <Icon id="arrow-up" width={33} height={33}></Icon>
        </ControllBtn>

        <ControllBtn
          className={`controll-btn_big ${
            buttonsState.down ? 'controll-btn_active' : ''
          }`}
          onMouseDown={mouseDownUpHandler.bind({}, 'keydown', 'ArrowDown', 40)}
          onMouseUp={mouseDownUpHandler.bind({}, 'keyup', 'ArrowDown', 40)}>
          <Icon id="arrow-down" width={33} height={33}></Icon>
        </ControllBtn>
      </div>
    </div>
  )
}
