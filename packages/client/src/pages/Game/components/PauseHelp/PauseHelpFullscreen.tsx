import { Icon } from '@/components/ui/Icon/Icon'
import { ControllBtn } from '../ControllBtn/ControllBtn'
import './PauseHelpFullscreen.scss'
import { ReactNode } from 'react'

type PauseHelpPropsType = {
  className?: string
  pauseIcon: ReactNode
  pauseHandler: () => void
  helpHandler: () => void
}

export const PauseHelpFullscreen = (props: PauseHelpPropsType) => {
  const { pauseHandler, helpHandler, pauseIcon, className = '' } = props

  const toggleFullscreen = () => {
    const isFullscreenMode = document.fullscreenElement

    if (isFullscreenMode) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

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

        <ControllBtn
          className="controll-btn_small controll-btn_blue fullscreen-button"
          onClick={toggleFullscreen}>
          <Icon id="fullscreen-icon" width={16} height={17}></Icon>
        </ControllBtn>
      </div>
    </div>
  )
}
