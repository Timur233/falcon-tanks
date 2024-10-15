import { Button } from '@/components/ui/Button/Button'
import './StatusScreen.scss'
import { ReactNode } from 'react'

type StatusScreenType = {
  isVisible: boolean
  title?: string
  type?: string
  children: ReactNode
}

export const StatusScreen = (props: StatusScreenType) => {
  const { isVisible, children, title = '', type = '' } = props

  return (
    <div
      className={`status-screen ${type ? 'status-screen_' + type : ''}${
        isVisible ? ' status-screen_show' : ''
      }`}>
      {title ? <span className="status-screen__title">{title}</span> : ''}
      {children}
    </div>
  )
}
