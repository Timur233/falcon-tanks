import { Icon } from '@/components/ui/Icon/Icon'
import { ControllBtn } from '../ControllBtn/ControllBtn'
import './PauseHelp.scss'
import { ReactElement } from 'react'

type PauseHelpPropsType = {
  className?: string
  pauseIcon: ReactElement
  pauseHandler: () => void
  helpHandler: () => void
}

export const PauseHelp = (props: PauseHelpPropsType) => {
  const { pauseHandler, helpHandler, pauseIcon, className = '' } = props

  return (
    <div className={`pause-help ${className}`}>
      <div className="pause-help__buttons">
        <ControllBtn
          className="controll-btn_small controll-btn_blue help-button"
          onClick={helpHandler}>
          <Icon id="help-icon" width={16} height={17}></Icon>
        </ControllBtn>

        <ControllBtn
          className="controll-btn_small pause-button"
          onClick={pauseHandler}>
          {pauseIcon}
        </ControllBtn>
      </div>
    </div>
  )
}
