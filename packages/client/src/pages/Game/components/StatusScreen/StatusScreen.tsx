import { Button } from '@/components/ui/Button/Button'
import './StatusScreen.scss'

type StatusScreenType = {
  isVisible: boolean
  buttonTitle: string
  onButtonClick: () => void
  title?: string
  type?: string
}

export const StatusScreen = (props: StatusScreenType) => {
  const { isVisible, buttonTitle, onButtonClick, title = '', type = '' } = props

  return (
    <div
      className={`status-screen ${type ? 'status-screen_' + type : ''}${
        isVisible ? ' status-screen_show' : ''
      }`}>
      {title ? <span className="status-screen__title">{title}</span> : ''}
      <Button text={buttonTitle} onClick={onButtonClick} useFixWidth />
    </div>
  )
}
