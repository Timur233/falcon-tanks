import { Icon } from '@/components/ui/Icon/Icon'
import { ControllBtn } from '../ControllBtn/ControllBtn'
import './FireControll.scss'

type FireControllPropsType = {
  className?: string
  buttonPressed: boolean
  mouseDownUpHandler: (eventName: string, key: string, code: number) => void
}

export const FireControll = (props: FireControllPropsType) => {
  const { mouseDownUpHandler, buttonPressed, className = '' } = props

  return (
    <div className={`fire-controll ${className}`}>
      <div className="fire-controll__buttons">
        <ControllBtn
          className={`controll-btn_middle controll-btn_red ${
            buttonPressed ? 'controll-btn_active' : ''
          }`}
          onMouseDown={mouseDownUpHandler.bind({}, 'keydown', ' ', 32)}
          onMouseUp={mouseDownUpHandler.bind({}, 'keyup', ' ', 32)}>
          <Icon id="fire-icon" width={18} height={17}></Icon>
        </ControllBtn>
      </div>
    </div>
  )
}
