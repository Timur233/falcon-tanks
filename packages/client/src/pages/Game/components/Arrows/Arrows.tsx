import { ControllBtn } from '../ControllBtn/ControllBtn'
import './Arrows.scss'
import { Icon } from '@/components/ui/Icon/Icon'

type ArrowsPropsType = {
  className?: string
  buttonsState: {
    upButton: boolean
    downButton: boolean
    leftButton: boolean
    rightButton: boolean
    fireButton: boolean
  },
  clickHandler: () => void,
}

export const Arrows = (props: ArrowsPropsType) => {
  const { className, buttonsState, clickHandler } = props

  return (
    <div className={`controll-arrows ${className}`}>
      <div className="controll-arrows__horizontal horizontal-arrows">
        <ControllBtn
          className={`controll-btn_big ${
            buttonsState.leftButton ? 'controll-btn_active' : ''
          }`}
          onClick={clickHandler}>
          <Icon id="arrow-left" width={33} height={33}></Icon>
        </ControllBtn>

        <ControllBtn
          className={`controll-btn_big ${
            buttonsState.rightButton ? 'controll-btn_active' : ''
          }`}
          onClick={clickHandler}>
          <Icon id="arrow-right" width={33} height={33}></Icon>
        </ControllBtn>
      </div>

      <div className="controll-arrows__vertical vertical-arrows">
        <ControllBtn
          className={`controll-btn_big ${
            buttonsState.upButton ? 'controll-btn_active' : ''
          }`}
          onClick={clickHandler}>
          <Icon id="arrow-up" width={33} height={33}></Icon>
        </ControllBtn>

        <ControllBtn
          className={`controll-btn_big ${
            buttonsState.downButton ? 'controll-btn_active' : ''
          }`}
          onClick={clickHandler}>
          <Icon id="arrow-down" width={33} height={33}></Icon>
        </ControllBtn>
      </div>
    </div>
  )
}
