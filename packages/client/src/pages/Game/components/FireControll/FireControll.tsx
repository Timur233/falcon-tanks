import { Icon } from '@/components/ui/Icon/Icon'
import { ControllBtn } from '../ControllBtn/ControllBtn'
import './FireControll.scss'

type FireControllPropsType = {
  className?: string
  buttonPressed: boolean
  fireHandler: () => void
}

export const FireControll = (props: FireControllPropsType) => {
  const { fireHandler, buttonPressed, className = '' } = props

  return (
    <div className={`fire-controll ${className}`}>
      <div className="fire-controll__buttons">
        <ControllBtn
          className={`controll-btn_middle controll-btn_red ${
            buttonPressed ? 'controll-btn_active' : ''
          }`}
          onClick={fireHandler}>
          <Icon id="fire-icon" width={18} height={17}></Icon>
        </ControllBtn>
      </div>
    </div>
  )
}
